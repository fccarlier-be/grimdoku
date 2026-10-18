// Tests de l'appli (dist/grimdoku.html) dans jsdom : npm test (reconstruit d'abord)
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const HTML = fs.readFileSync(path.join(__dirname, '..', 'dist', 'grimdoku.html'), 'utf8');
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const sigOf = (p) => p.characters.map(c => c.id + ':' + c.name).join('|') + '#' + p.clues.length;

const opened = [];
test.after(() => opened.forEach(w => w.close()));

// ouvre l'appli ; settings / saves : contenu du localStorage avant le chargement
function open({ settings, saves = {} } = {}) {
  const dom = new JSDOM(HTML, {
    runScripts: 'dangerously', url: 'http://localhost/', pretendToBeVisual: true,
    beforeParse(w) {
      w.scrollTo = () => {};
      w.HTMLElement.prototype.scrollIntoView = () => {};
      if (settings) w.localStorage.setItem('grimdoku:settings', JSON.stringify(settings));
      for (const [id, s] of Object.entries(saves)) w.localStorage.setItem('grimdoku:p:' + id, JSON.stringify(s));
    }
  });
  const w = dom.window, d = w.document;
  const errors = [];
  w.addEventListener('error', e => errors.push(e.message));
  const cell = (r, c) => d.querySelector(`[data-r="${r}"][data-c="${c}"]`);
  const fire = (el, type) => el.dispatchEvent(new w.Event(type, { bubbles: true }));
  const pick = (id) => d.querySelector(`.chip[data-id="${id}"]`).click();
  // appui long simulé : la roue s'ouvre (WHEEL_MS = 450 ms, marge large : la série complète charge la machine),
  // puis on y touche le personnage `who` (par défaut : celui qui est choisi)
  const hold = async (r, c, who, ms = 900) => {
    fire(cell(r, c), 'pointerdown'); await sleep(ms); fire(cell(r, c), 'pointerup'); cell(r, c).click();
    const it = d.querySelector(who ? `.wheel-item[data-wid="${who}"]` : '.wheel-item.sel');
    if (it) it.click();
  };
  // une affaire s'ouvre depuis la page de sa taille
  const openCase = (id) => {
    w.grimGo('taille/' + w.eval('PUZZLES').find(p => p.id === id).size);
    d.querySelector(`.case[data-id="${id}"]`).click();
  };
  opened.push(w);
  return { w, d, errors, cell, fire, pick, hold, openCase, PUZZLES: w.eval('PUZZLES') };
}

test('accueil → Jouer → tailles → une page par taille : toutes les affaires, triées par taille puis difficulté, sans crânes', () => {
  const { d, PUZZLES, errors } = open();
  assert.equal(d.querySelectorAll('.case, .lvl').length, 0, 'accueil : seulement l\'affiche, le titre et Jouer');
  d.getElementById('playBtn').click();
  assert.match(d.querySelector('.pagetitle').textContent, /taille/);
  const sizes = [...d.querySelectorAll('.lvl[data-size]')].map(b => +b.dataset.size);
  assert.deepEqual(sizes, [...new Set(PUZZLES.map(p => p.size))].sort((a, b) => a - b), 'un parchemin par taille');
  const shown = [];
  for (const n of sizes) {
    d.querySelector(`.lvl[data-size="${n}"]`).click();
    const ids = [...d.querySelectorAll('.case')].map(b => b.dataset.id);
    assert.ok(ids.every(id => PUZZLES.find(p => p.id === id).size === n), `${n}×${n} : seulement ses affaires`);
    const diff = ids.map(id => PUZZLES.find(p => p.id === id).difficulty);
    assert.deepEqual(diff, [...diff].sort((a, b) => a - b), 'de la plus facile à la plus dure');
    shown.push(...ids);
    d.getElementById('back').click();
  }
  assert.equal(shown.length, PUZZLES.filter(p => !p.final).length, 'toutes les affaires, sauf la finale (débloquée par les lettres)');
  assert.equal(d.body.textContent.includes('💀'), false, 'pas de crânes affichés');
  assert.deepEqual(errors, []);
});

test('chaque affaire : la bonne carte mène à la victoire', () => {
  // une seule page pour toutes les affaires (une page jsdom par affaire épuiserait la mémoire)
  const { w, d, openCase, errors, PUZZLES } = open();
  // l'affaire finale ne s'ouvre qu'avec assez de lettres d'Augure
  w.localStorage.setItem('grimdoku:lettres', JSON.stringify(Object.keys(w.eval('LORE').letters)));
  for (const p of PUZZLES) {
    const save = { pos: p.solution.positions, pencil: {}, marks: [], done: [], solved: false, sig: sigOf(p) };
    w.localStorage.setItem('grimdoku:p:' + p.id, JSON.stringify(save));
    if (p.final) w.grimGo('affaire/' + p.id); else openCase(p.id);
    d.getElementById('accuse').click();
    assert.ok(d.querySelector('.stamp'), `${p.id} : tampon « Affaire résolue »`);
    assert.ok(d.querySelector('.verdictcard'), `${p.id} : verdict`);
    d.getElementById('back').click();
  }
  assert.deepEqual(errors, []);
  w.close();
});

test('mauvaise carte : pas de victoire', () => {
  const { PUZZLES } = open();
  const p = PUZZLES[0];
  const ids = Object.keys(p.solution.positions);
  const pos = { ...p.solution.positions, [ids[0]]: p.solution.positions[ids[1]], [ids[1]]: p.solution.positions[ids[0]] };
  const { d, openCase } = open({ saves: { [p.id]: { pos, pencil: {}, marks: [], done: [], solved: false, sig: sigOf(p) } } });
  openCase(p.id);
  d.getElementById('accuse').click();
  assert.equal(d.querySelector('.stamp'), null);
});

test('gestes : lettre au crayon, appui abandonné, appui long, retour au crayon', async () => {
  const { d, cell, fire, pick, hold, openCase, errors, PUZZLES } = open();
  const p = PUZZLES[0];
  openCase(p.id);
  const [id, [r, c]] = Object.entries(p.solution.positions)[0];
  pick(id);
  cell(r, c).click();
  assert.ok(cell(r, c).querySelector('.pencil'), 'toucher court : lettre au crayon');
  assert.equal(d.querySelectorAll('.cell .mark').length, 0, 'une lettre au crayon ne pose pas de croix');

  fire(cell(r, c), 'pointerdown'); await sleep(200); fire(cell(r, c), 'pointerup');
  assert.equal(d.querySelector('.wheel'), null, 'appui trop court : pas de roue');
  assert.ok(cell(r, c).querySelector('.pencil'), 'la lettre reste');

  await hold(r, c);
  assert.ok(cell(r, c).querySelector('.token'), 'appui long : personnage placé');
  assert.ok(d.querySelectorAll('.cell .mark').length > 0, 'croix automatiques sur sa ligne et sa colonne');
  assert.equal(d.querySelectorAll('.cell .mark.manual').length, 0, 'croix automatiques à l\'encre, pas au crayon');

  cell(r, c).click(); cell(r, c).click();
  assert.ok(!cell(r, c).querySelector('.token') && cell(r, c).querySelector('.pencil'), 'touché deux fois : retour au crayon');
  assert.deepEqual(errors, []);
});

test('régression : vérification en direct d\'un indice relatif dont l\'autre personnage n\'est pas placé', async () => {
  const { PUZZLES } = open();
  const p = PUZZLES.find(q => q.clues.some(cl => cl.logic.other));
  const cl = p.clues.find(x => x.logic.other);
  const { cell, pick, hold, openCase, errors } = open({ settings: { shade: true, live: true } });
  openCase(p.id);
  const [r, c] = p.solution.positions[cl.who];
  pick(cl.who);
  await hold(r, c);
  assert.ok(cell(r, c).querySelector('.token'));
  assert.deepEqual(errors, [], 'pas d\'erreur JavaScript');
});

test('✏️ Crayon : toucher une case la barre, encore une fois efface la croix ; choisir un personnage l\'éteint', () => {
  const { w, d, cell, pick, openCase, PUZZLES } = open();
  const p = PUZZLES[0];
  openCase(p.id);
  const pen = () => d.getElementById('penBtn').getAttribute('aria-pressed');
  assert.equal(pen(), 'false', 'Crayon éteint par défaut');
  const free = [...d.querySelectorAll('.cell')].find(el => !el.querySelector('.obj'));
  const [r, c] = [+free.dataset.r, +free.dataset.c];
  cell(r, c).click();
  assert.equal(cell(r, c).querySelector('.mark'), null, 'sans crayon ni personnage : rien');
  assert.match(d.querySelector('.toast').textContent, /Crayon/);
  d.getElementById('penBtn').click();
  assert.equal(pen(), 'true');
  assert.equal(JSON.parse(w.localStorage.getItem('grimdoku:settings')).cross, true, 'outil retenu');
  cell(r, c).click();
  assert.ok(cell(r, c).querySelector('.mark.manual'), 'croix posée, au crayon (hypothèse du joueur)');
  assert.equal(cell(r, c).querySelector('.pencil'), null, 'pas de lettre');
  cell(r, c).click();
  assert.equal(cell(r, c).querySelector('.mark'), null, 'croix effacée');
  pick(p.characters[0].id);
  assert.equal(pen(), 'false', 'choisir un personnage éteint le crayon');
  cell(r, c).click();
  assert.ok(cell(r, c).querySelector('.pencil') && !cell(r, c).querySelector('.mark'), 'personnage choisi : sa lettre');
  d.getElementById('penBtn').click();
  assert.equal(d.querySelector('.chip[aria-pressed="true"]'), null, 'allumer le crayon désélectionne le personnage');
});

test('indice : désigne le prochain personnage à déduire, ou signale une erreur', () => {
  const { PUZZLES } = open();
  const p = PUZZLES[0];
  {
    const { d, openCase } = open();
    openCase(p.id);
    d.getElementById('hintBtn').click();
    const sel = d.querySelector('.chip[aria-pressed="true"]');
    assert.ok(sel, 'un personnage est sélectionné');
    assert.match(d.querySelector('.toast').textContent, /💡/);
    // l'indice ne donne pas la case : aucun pion ni lettre posés
    assert.equal(d.querySelectorAll('.token, .pencil').length, 0);
  }
  {
    const ids = Object.keys(p.solution.positions);
    const pos = { [ids[0]]: p.solution.positions[ids[1]] };
    const { d, openCase } = open({ saves: { [p.id]: { pos, pencil: {}, marks: [], done: [], solved: false, sig: sigOf(p) } } });
    openCase(p.id);
    d.getElementById('hintBtn').click();
    assert.match(d.querySelector('.toast').textContent, /pas à sa place/);
  }
});

test('grand personnage : lettres au crayon sur ses cases, puis appui long ; forme incomplète refusée', async () => {
  const { PUZZLES } = open();
  const p = PUZZLES.find(q => q.characters.some(c => c.shape) && !q.hiddenShapes);
  const big = p.characters.find(c => c.shape);
  const cells = p.solution.positions[big.id];
  const { d, cell, pick, hold, openCase, errors } = open();
  openCase(p.id);
  pick(big.id);
  cell(...cells[0]).click();
  await hold(...cells[0]);
  assert.equal(cell(...cells[0]).querySelector('.token'), null, 'une seule case : pas placé');
  assert.match(d.querySelector('.toast').textContent, /occupe/);
  for (const rc of cells.slice(1)) cell(...rc).click();
  await hold(...cells[1]);
  assert.ok(cells.every(rc => cell(...rc).querySelector('.token')), 'son portrait sur chacune de ses cases');
  assert.equal(d.querySelectorAll('.body').length, cells.length, 'un corps sur chacune de ses cases');
  cell(...cells[1]).click(); cell(...cells[1]).click();
  assert.equal(d.querySelectorAll('.body').length, 0, 'touché : retour au crayon');
  assert.equal(d.querySelectorAll('.pencil').length, cells.length);
  assert.deepEqual(errors, []);
});

test('son : 🔊 ouvre la barre de volume, le réglage est retenu ; barre à zéro = 🔇', () => {
  const { w, d, errors } = open();
  const btn = d.querySelector('.soundbtn');
  if (!btn) return; // pas de musique dans ce build
  btn.click();
  const range = d.querySelector('.soundpop input[type=range]');
  assert.ok(range, 'panneau de volume ouvert');
  range.value = '25'; range.dispatchEvent(new w.Event('input', { bubbles: true }));
  assert.equal(JSON.parse(w.localStorage.getItem('grimdoku:settings')).volume, 0.25, 'volume retenu');
  range.value = '0'; range.dispatchEvent(new w.Event('input', { bubbles: true }));
  assert.equal(d.querySelector('.soundbtn').textContent, '🔇');
  d.body.click();
  assert.equal(d.querySelector('.soundpop'), null, 'fermé en touchant ailleurs');
  assert.deepEqual(errors, []);
});

test('notation de la difficulté ressentie : 0 à 5 sous la carte, retenue, identifiant anonyme', () => {
  const { w, d, openCase, errors, PUZZLES } = open();
  const p = PUZZLES[0];
  openCase(p.id);
  assert.equal(d.querySelectorAll('.rate [data-rate]').length, 6, 'six choix, de 0 à 5');
  d.querySelector('[data-rate="3"]').click();
  assert.equal(d.querySelector('[data-rate="3"]').getAttribute('aria-pressed'), 'true');
  assert.equal(JSON.parse(w.localStorage.getItem('grimdoku:rate:' + p.id)), 3, 'note retenue');
  assert.match(JSON.parse(w.localStorage.getItem('grimdoku:settings')).vid, /^[a-z0-9]+$/, 'joueur anonyme');
  d.querySelector('[data-rate="0"]').click();
  assert.equal(JSON.parse(w.localStorage.getItem('grimdoku:rate:' + p.id)), 0, 'on peut changer d\'avis (0 compris)');
  assert.deepEqual(errors, []);
});

test('lore : lettre d\'Augure à la première victoire dans un lieu, rangée dans le carnet ; épilogue en dialogue', () => {
  const { w, d, openCase, errors, PUZZLES } = open();
  const p = PUZZLES.find(q => !q.final);
  w.localStorage.setItem('grimdoku:p:' + p.id, JSON.stringify({ pos: p.solution.positions, pencil: {}, marks: [], done: [], solved: false, sig: sigOf(p) }));
  openCase(p.id);
  d.getElementById('accuse').click();
  assert.ok(d.querySelector('.letter-augure'), 'lettre glissée sous la porte');
  assert.deepEqual(JSON.parse(w.localStorage.getItem('grimdoku:lettres')), [p.place]);
  assert.ok(d.querySelectorAll('.epi .epl').length >= 3, 'épilogue en répliques');
  w.grimGo('carnet');
  assert.equal(d.querySelectorAll('.lettre:not(.locked)').length, 1, 'une lettre dans le carnet');
  assert.ok(d.querySelectorAll('.fiche').length >= 1, 'la troupe croisée a sa fiche');
  assert.deepEqual(errors, []);
});

test('lore : l\'affaire finale est verrouillée, puis débloquée par assez de lettres', () => {
  const { w, d, PUZZLES } = open();
  const fin = PUZZLES.find(q => q.final);
  if (!fin) return;
  w.grimGo('tailles');
  assert.ok(d.querySelector('.finalcase.locked'), 'verrouillée au départ');
  w.grimGo('affaire/' + fin.id);
  assert.equal(d.getElementById('accuse'), null, 'on ne peut pas l\'ouvrir directement');
  const L = w.eval('LORE');
  w.localStorage.setItem('grimdoku:lettres', JSON.stringify(Object.keys(L.letters).slice(0, L.need)));
  w.grimGo('tailles');
  d.querySelector('[data-final]').click();
  assert.ok(d.getElementById('accuse'), 'débloquée');
});

test('carte de Brumeval : un repère par lieu, chaque lieu liste ses enquêtes', () => {
  const { w, d, errors, PUZZLES } = open();
  w.grimGo('carte');
  // chaque lieu a son repère sur la carte (si l'illustration existe) et sa ligne dans la liste par contrée
  const places = [...new Set([...d.querySelectorAll('[data-place]')].map(b => b.dataset.place))];
  const want = [...new Set(PUZZLES.filter(p => !p.final).map(p => p.place))];
  assert.deepEqual([...places].sort(), [...want].sort(), 'un repère par lieu');
  let n = 0;
  for (const pl of places) {
    w.grimGo('lieu/' + pl);
    const ids = [...d.querySelectorAll('.case')].map(b => b.dataset.id);
    assert.ok(ids.length && ids.every(id => PUZZLES.find(p => p.id === id).place === pl), `${pl} : ses enquêtes`);
    n += ids.length;
  }
  assert.equal(n, PUZZLES.filter(p => !p.final).length, 'toutes les enquêtes sont sur la carte');
  assert.deepEqual(errors, []);
});

test('appui long : la roue des personnages, on y choisit qui placer (sans l\'avoir choisi avant)', async () => {
  const { d, cell, hold, openCase, errors, PUZZLES } = open();
  const p = PUZZLES.find(q => !q.final && !q.characters.some(c => c.shape));
  openCase(p.id);
  const [id, [r, c]] = Object.entries(p.solution.positions).find(([k]) => k !== 'a');
  await hold(r, c, id);
  assert.ok(cell(r, c).querySelector('.token'), 'placé depuis la roue');
  assert.equal(d.querySelector('.wheel'), null, 'roue refermée');
  assert.deepEqual(errors, []);
});

test('pastille = initiale du nom (deux lettres si besoin), ordre des fiches inchangé ; ‹ ramène au lieu de la carte', () => {
  const { w, d, openCase, PUZZLES } = open();
  const p = PUZZLES.find(q => !q.final);
  w.grimGo('lieu/' + p.place);
  d.querySelector(`.case[data-id="${p.id}"]`).click();
  const badges = [...d.querySelectorAll('.clue .em .letter')].map(e => e.textContent);
  const names = [...d.querySelectorAll('.clue .who')].map(e => e.textContent.trim());
  badges.forEach((b, i) => assert.ok(names[i].normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().startsWith(b.toLowerCase()), `${b} = début de ${names[i]}`));
  assert.equal(new Set(badges).size, badges.length, 'pastilles toutes différentes');
  d.getElementById('back').click();
  assert.ok(location(w).includes('lieu/' + p.place), 'retour au lieu');
  openCase(p.id);
  d.getElementById('back').click();
  assert.ok(location(w).includes('taille/' + p.size), 'retour à la taille');
});
const location = (w) => w.location.hash;
