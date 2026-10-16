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
  const hold = async (r, c, ms = 1600) => { fire(cell(r, c), 'pointerdown'); await sleep(ms); fire(cell(r, c), 'pointerup'); };
  const openCase = (id) => d.querySelector(`.case[data-id="${id}"]`).click();
  opened.push(w);
  return { w, d, errors, cell, fire, pick, hold, openCase, PUZZLES: w.eval('PUZZLES') };
}

test('accueil : toutes les affaires, de la plus facile à la plus dure', () => {
  const { d, PUZZLES, errors } = open();
  const shown = [...d.querySelectorAll('.case')].map(b => b.dataset.id);
  assert.equal(shown.length, PUZZLES.length);
  const skulls = shown.map(id => PUZZLES.find(p => p.id === id).difficulty);
  assert.deepEqual(skulls, [...skulls].sort((a, b) => a - b));
  assert.deepEqual(errors, []);
});

test('chaque affaire : la bonne carte mène à la victoire', () => {
  // une seule page pour toutes les affaires (une page jsdom par affaire épuiserait la mémoire)
  const { w, d, openCase, errors, PUZZLES } = open();
  for (const p of PUZZLES) {
    const save = { pos: p.solution.positions, pencil: {}, marks: [], done: [], solved: false, sig: sigOf(p) };
    w.localStorage.setItem('grimdoku:p:' + p.id, JSON.stringify(save));
    openCase(p.id);
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

  fire(cell(r, c), 'pointerdown'); await sleep(500); fire(cell(r, c), 'pointerup'); cell(r, c).click();
  assert.ok(cell(r, c).querySelector('.pencil'), 'appui abandonné : la lettre reste');
  assert.equal(d.querySelector('.charge'), null, 'jauge retirée');

  await hold(r, c);
  assert.ok(cell(r, c).querySelector('.token'), 'appui long : personnage placé');
  assert.ok(d.querySelectorAll('.cell .mark').length > 0, 'croix automatiques sur sa ligne et sa colonne');

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

test('sans personnage choisi, toucher une case vide la barre ; encore une fois efface la croix', () => {
  const { d, cell, openCase, PUZZLES } = open();
  const p = PUZZLES[0];
  openCase(p.id);
  const free = [...d.querySelectorAll('.cell')].find(el => !el.querySelector('.obj'));
  const [r, c] = [+free.dataset.r, +free.dataset.c];
  cell(r, c).click();
  assert.ok(cell(r, c).querySelector('.mark'), 'croix posée');
  cell(r, c).click();
  assert.equal(cell(r, c).querySelector('.mark'), null, 'croix effacée');
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
  assert.ok(cell(...cells[0]).querySelector('.token'), 'portrait sur sa première case');
  assert.equal(d.querySelectorAll('.body').length, cells.length, 'un corps sur chacune de ses cases');
  cell(...cells[1]).click(); cell(...cells[1]).click();
  assert.equal(d.querySelectorAll('.body').length, 0, 'touché : retour au crayon');
  assert.equal(d.querySelectorAll('.pencil').length, cells.length);
  assert.deepEqual(errors, []);
});
