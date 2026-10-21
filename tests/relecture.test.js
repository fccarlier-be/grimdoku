// Relecture en ligne (tools/relecture.js, mode serveur) : épilogue ET mise en situation modifiables, rangées dans le
// dossier de données ; la mise en situation est gardée en gabarit ({victime}) et réaffichée remplie.
'use strict';
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.join(__dirname, '..');

test('relecture : la mise en situation se modifie comme l\'épilogue', async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'grimdoku-relecture-'));
  const { context } = require(path.join(ROOT, 'tools/relecture.js'));
  const id = 'taverne--inspecteur';
  fs.writeFileSync(path.join(tmp, 'bundle.json'), JSON.stringify(context([id])));
  fs.mkdirSync(path.join(tmp, 'seed'));
  fs.writeFileSync(path.join(tmp, 'noms.json'), JSON.stringify({ gobelin: 'Bakchich', roi: 'Dagobert' }));
  for (const f of ['epilogues.json', 'epilogues-relecture.json', 'intros.json', 'carnet-decouvertes.json']) fs.copyFileSync(path.join(ROOT, 'lore', f), path.join(tmp, 'seed', f));
  const port = 20000 + Math.floor(Math.random() * 20000);
  const srv = spawn(process.execPath, [path.join(ROOT, 'tools/relecture.js')], {
    env: { ...process.env, EPI_BUNDLE: path.join(tmp, 'bundle.json'), EPI_SEED: path.join(tmp, 'seed'), EPI_DATA: path.join(tmp, 'data'), PORT: String(port) },
  });
  try {
    const url = `http://127.0.0.1:${port}/`;
    let items;
    for (let i = 0; i < 50 && !items; i++) { try { items = await (await fetch(url + 'data')).json(); } catch (e) { await new Promise(r => setTimeout(r, 100)); } }
    const it = items.find(x => x.id === id);
    assert.ok(it.intro.includes(it.victim.name), 'la mise en situation s\'affiche remplie');
    const intro = it.intro + ' Un détail de plus.';
    const out = await (await fetch(url + 'save', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, text: it.text, note: '', status: 'relire', intro }) })).json();
    assert.equal(out.intro, intro, 'réaffichée telle que saisie');
    const saved = JSON.parse(fs.readFileSync(path.join(tmp, 'data', 'intros.json'), 'utf8')).grilles[id];
    assert.ok(saved.includes('{victime}') && !saved.includes(it.victim.name), 'rangée en gabarit');
    const exp = await (await fetch(url + 'export')).json();
    assert.equal(exp.intros.grilles[id], saved, 'exportée pour epi-sync');
    assert.ok((await (await fetch(url)).text()).includes('intro-ed'), 'champ modifiable dans la page');
    // carnet des habitués : seul le texte des découvertes se modifie
    const carnet = await (await fetch(url + 'carnet')).json();
    const bak = carnet.find(h => h.t === 'gobelin');
    assert.equal(bak.nom, 'Bakchich');
    const textes = bak.l.map((d, i) => i === 0 ? d.texte + ' Retouché.' : d.texte);
    assert.ok((await (await fetch(url + 'carnet-save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ t: 'gobelin', textes }) })).json()).ok);
    const exp2 = await (await fetch(url + 'export')).json();
    assert.ok(exp2.carnet.gobelin[0].texte.endsWith('Retouché.') && exp2.carnet.gobelin[0].seuil === 3, 'enregistré, seuil inchangé');
  } finally {
    srv.kill();
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
