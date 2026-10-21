// Garde-fous du lore (audit du 2026-10-19, lore/GRIMDOKU_AUDIT_LORE_2026-10-19.md) : empêchent le retour des
// contradictions déjà corrigées. Lit les énigmes construites (puzzles/) et les données du lore ; rapide.
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const J = (f) => JSON.parse(fs.readFileSync(path.join(ROOT, f), 'utf8'));
const PUZZLES = fs.readdirSync(path.join(ROOT, 'puzzles')).filter(f => f.endsWith('.json')).map(f => J('puzzles/' + f));
const CAST = J('cast.json');
const LETTRES = J('lore/lettres.json');
const TESTAMENT = J('scenes/testament.json');
const ACTIVES = new Set(Object.entries(J('lore/actives.json')).filter(([k]) => k !== '_doc').flatMap(([, ids]) => ids));
const victimOf = (p) => p.characters.find(c => c.role === 'victim');

test('aucune variable de gabarit oubliée dans les textes générés', () => {
  for (const p of PUZZLES) assert.doesNotMatch(p.title + p.intro + (p.introBody || '') + p.epilogue, /\{[A-Za-z]+\}/, p.id);
});

test('élision devant un nom qui commence par une voyelle (« Parlons d\'Ostentine », pas « de Ostentine »)', () => {
  for (const p of PUZZLES) assert.doesNotMatch(p.intro + (p.introBody || '') + p.epilogue,
    /(^|[^\p{L}])(de|que|jusque) [AEIOUYÀÂÉÈÊËÎÏÔÛ][a-zàâéèêëîïôûç]/u, p.id);
});

test('le titre et le nom de la victime ne se répètent pas (« la baronne de Grisemotte Grisemotte »)', () => {
  for (const p of PUZZLES) {
    const v = victimOf(p).name;
    assert.doesNotMatch(p.intro, new RegExp(`${v}\\s+${v}`), p.id);
    if (victimOf(p).guest) assert.ok(!CAST[victimOf(p).archetype].title.includes(v), `${p.id} : le titre contient déjà le nom`);
  }
});

test('victimes : un nom différent par affaire ; personne ne meurt deux fois dans les grilles actives', () => {
  const byType = {}, dead = {};
  for (const p of PUZZLES) {
    const v = victimOf(p);
    if (!v.guest) continue;
    (byType[v.archetype] = byType[v.archetype] || []).push(v.name);
    if (ACTIVES.has(p.id)) dead[v.name] = (dead[v.name] || 0) + 1;
  }
  for (const [t, names] of Object.entries(byType)) assert.equal(new Set(names).size, names.length, `${t} : nom en double`);
  for (const [n, k] of Object.entries(dead)) assert.equal(k, 1, `${n} meurt ${k} fois`);
});

test('les textes historiques (scenes/legacy) ne servent à aucune énigme', () => {
  const legacy = fs.readdirSync(path.join(ROOT, 'scenes/legacy')).filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''));
  for (const p of PUZZLES) for (const l of legacy) assert.ok(!p.id.startsWith(l + '--') && p.id !== l, `${p.id} vient de ${l}`);
  for (const f of fs.readdirSync(path.join(ROOT, 'scenes')).filter(n => n.endsWith('.json'))) {
    const s = J('scenes/' + f);
    assert.ok(!s.extends, `${f} : variante à archiver dans scenes/legacy`);
    if (!s.final) assert.ok(!s.epilogue && !s.epilogues, `${f} : épilogue inutilisé (les épilogues viennent de cast.json)`);
  }
});

test('documents de référence : la lettre arrive à la dernière enquête du lieu, pas à la première', () => {
  for (const f of ['lore/lettres.json', 'lore/carte.json']) assert.doesNotMatch(J(f)._doc, /première enquête/, f);
  for (const f of ['lore/GRIMDOKU_MATRICE_CONTINUITE.md', 'lore/LORE.md']) assert.doesNotMatch(fs.readFileSync(path.join(ROOT, f), 'utf8'), /première (enquête|affaire) (résolue|a été résolue)/, f);
});

test('affaire finale : toutes les lettres ; personne parmi les suspects ne reçoit la garde', () => {
  assert.equal(LETTRES.need, Object.keys(LETTRES.letters).length, 'il faut toutes les lettres');
  const fin = PUZZLES.find(p => p.final);
  assert.ok(fin, 'affaire finale construite');
  const apres = TESTAMENT.revelation.apres;
  for (const c of fin.characters.filter(c => c.role !== 'victim')) assert.ok(!apres.includes(c.name), `${c.name} ne doit pas recevoir la garde`);
});

test('fiches et textes conformes au canon (Augure, âge de Fizzlebarbe, main de Fernand)', () => {
  assert.doesNotMatch(CAST.corbeau.desc, /sait tout/, 'Augure n\'est pas omniscient');
  assert.match(CAST.archimage.desc, /412 ans/);
  assert.doesNotMatch(TESTAMENT.revelation.lettre, /quatre cent douze/, 'le Nœud a environ quatre siècles, Fizzlebarbe 412 ans');
  assert.doesNotMatch(CAST.zombie.epilogue + TESTAMENT.epilogues.zombie, /perdu un bras/, 'Fernand a perdu sa main il y a vingt ans');
  assert.doesNotMatch(Object.values(LETTRES.letters).join(' '), /main manquante/);
});
