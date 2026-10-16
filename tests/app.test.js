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
  const { PUZZLES } = open();
  for (const p of PUZZLES) {
    const save = { pos: p.solution.positions, pencil: {}, marks: [], done: [], solved: false, sig: sigOf(p) };
    const { d, openCase, errors } = open({ saves: { [p.id]: save } });
    openCase(p.id);
    d.getElementById('accuse').click();
    assert.ok(d.querySelector('.stamp'), `${p.id} : tampon « Affaire résolue »`);
    assert.ok(d.querySelector('.verdictcard'), `${p.id} : verdict`);
    assert.deepEqual(errors, [], p.id);
  }
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
