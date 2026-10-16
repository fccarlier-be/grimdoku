// Tests du moteur et des énigmes publiées : node --test tests/  (ou npm test, qui reconstruit d'abord)
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const E = require('../engine');

const PUZZLES = fs.readdirSync(path.join(__dirname, '..', 'puzzles')).sort()
  .map(f => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'puzzles', f), 'utf8')));

for (const p of PUZZLES) {
  test(`${p.id} : solution unique, résoluble par déduction, conventions`, () => {
    const sols = E.solve(p, p.clues, 3);
    assert.equal(sols.length, 1, 'une seule solution');
    for (const c of p.characters) assert.deepEqual(sols[0].positions[c.id], p.solution.positions[c.id]);
    assert.equal(sols[0].murderer, p.solution.murderer);

    const h = E.humanSolve(p, p.clues, 2);
    assert.ok(h.solved, 'résoluble sans essai-erreur');
    assert.equal(p.difficulty, E.skullsOf(p, h.steps), 'crânes = difficulté calculée');

    const victim = p.characters.find(c => c.role === 'victim');
    assert.equal(p.characters[p.characters.length - 1].id, victim.id, 'victime en dernier');
    assert.ok(!p.clues.some(cl => cl.who === victim.id), 'aucun indice pour la victime');
    assert.equal(E.sharedRooms(E.prepare(p), p.solution.positions).length, 0, 'suspects dans des pièces différentes');
    p.characters.forEach((c, i) => assert.equal(c.name.normalize('NFD')[0].toUpperCase(), String.fromCharCode(65 + i), `initiale de ${c.name}`));
  });
}

// petite carte de test : deux pièces côte à côte (A | B), une table en (0,1) dans A
const mini = {
  size: 3, rooms: { A: { name: 'A' }, B: { name: 'B' } },
  layout: ['AAB', 'AAB', 'AAB'],
  objects: [{ type: 'table', at: [0, 1] }],
  characters: [{ id: 'a', name: 'Arpège', role: 'suspect' }, { id: 'b', name: 'Bob', role: 'suspect' }, { id: 'v', name: 'Victor', role: 'victim' }]
};

test('« à côté de » ne traverse pas les murs', () => {
  const ctx = E.prepare(mini);
  const adj = (r, c) => E.evalClue(ctx, { who: 'a', logic: { type: 'adjacentTo', object: 'table' } }, { a: [r, c] });
  assert.equal(adj(0, 0), true, 'voisine dans la même pièce');
  assert.equal(adj(1, 1), true, 'voisine du dessous');
  assert.equal(adj(0, 2), false, 'de l\'autre côté du mur');
  assert.equal(adj(1, 0), false, 'en diagonale');
});

test('positions relatives : nord / sud / est / ouest, n\'importe quelle colonne ou ligne', () => {
  const ctx = E.prepare(mini);
  const ev = (type, pa, pb) => E.evalClue(ctx, { who: 'a', logic: { type, other: 'b' } }, { a: pa, b: pb });
  assert.equal(ev('northOf', [0, 0], [2, 2]), true);
  assert.equal(ev('southOf', [0, 0], [2, 2]), false);
  assert.equal(ev('westOf', [0, 0], [2, 2]), true);
  assert.equal(ev('eastOf', [1, 2], [0, 0]), true);
});

test('règle des pièces : deux suspects ne partagent jamais une pièce', () => {
  const ctx = E.prepare(mini);
  assert.equal(E.sharedRooms(ctx, { a: [0, 0], b: [1, 1], v: [2, 2] }).length, 1);
  assert.equal(E.sharedRooms(ctx, { a: [0, 0], b: [1, 2], v: [2, 1] }).length, 0);
  assert.ok(E.checkPlacement(mini, { a: [0, 0], b: [1, 1] }).some(e => e.kind === 'room'));
});

test('difficulté : un départ sans placement direct coûte 2 points', () => {
  const easy = E.rateDifficulty([{ ids: ['a'], tech: 0 }, { ids: ['b'], tech: 1 }]);
  const noStart = E.rateDifficulty([{ ids: ['a'], tech: 1 }, { ids: ['b'], tech: 1 }]);
  assert.equal(easy.skulls, 0, 'que des indices et des cases uniques → 0 crâne (initiation)');
  assert.equal(noStart.score, easy.score + 2);
  assert.equal(E.rateDifficulty([{ ids: ['a'], tech: 0 }, { ids: ['b'], tech: 6 }]).skulls, 3, 'groupes → 3 crânes');
});

// grands personnages (4–5 crânes) : carte 4×4, deux pièces A | B, une table en (0,1)
const bigMini = {
  size: 4, rooms: { A: { name: 'A' }, B: { name: 'B' } },
  layout: ['AABB', 'AABB', 'AABB', 'AABB'],
  objects: [{ type: 'table', at: [0, 1] }, { type: 'chaise', at: [3, 0] }],
  characters: [{ id: 'a', name: 'Ardent', role: 'suspect', shape: 'L3' }, { id: 'b', name: 'Bob', role: 'suspect' }, { id: 'v', name: 'Victor', role: 'victim' }]
};

test('grands personnages : orientations des formes', () => {
  assert.equal(E.orientations('I2').length, 2);
  assert.equal(E.orientations('I3').length, 2);
  assert.equal(E.orientations('L3').length, 4);
});

test('grands personnages : jamais sur un meuble (même praticable), jamais à cheval sur deux pièces', () => {
  const ctx = E.prepare(bigMini);
  const pls = E.placementsOf(ctx, 'a');
  assert.ok(pls.length > 0);
  for (const pl of pls) {
    assert.equal(pl.length, 3);
    assert.ok(pl.every(([r, c]) => !ctx.objAt[r + ',' + c]), 'aucune case sur un meuble');
    assert.equal(new Set(pl.map(([r, c]) => ctx.roomOf(r, c))).size, 1, 'une seule pièce');
  }
  assert.equal(E.isPlacement(ctx, 'a', [[1, 1], [1, 2], [2, 1]]), false, 'à cheval sur A et B');
  assert.equal(E.isPlacement(ctx, 'a', [[2, 0], [1, 0], [1, 1]]), true, 'ordre des cases indifférent');
});

test('grands personnages : chaque case prend sa ligne et sa colonne', () => {
  const pos = { a: [[1, 0], [1, 1], [2, 0]], b: [[0, 1]] };
  assert.ok(E.checkPlacement(bigMini, { a: pos.a, b: [3, 1] }).some(e => e.kind === 'col'), 'colonne de sa 2e case');
  assert.ok(E.checkPlacement(bigMini, { a: pos.a, b: [2, 3] }).some(e => e.kind === 'row'), 'ligne de sa 3e case');
  assert.ok(E.checkPlacement(bigMini, { a: [[1, 0], [1, 1], [1, 2]] }).some(e => e.kind === 'shape'), 'mauvaise forme');
  assert.deepEqual(E.checkPlacement(bigMini, { a: pos.a, b: [3, 3] }), []);
});

test('grands personnages : « au nord de » = toutes ses cases plus haut, « à côté » = n\'importe laquelle', () => {
  const ctx = E.prepare(bigMini);
  const a = [[1, 0], [2, 0], [2, 1]];
  const ev = (logic, b) => E.evalClue(ctx, { who: 'a', logic }, { a, b });
  assert.equal(ev({ type: 'northOf', other: 'b' }, [3, 3]), true);
  assert.equal(ev({ type: 'northOf', other: 'b' }, [2, 3]), false, 'même ligne que sa case du bas');
  assert.equal(ev({ type: 'southOf', other: 'b' }, [0, 3]), true);
  assert.equal(E.evalClue(ctx, { who: 'a', logic: { type: 'adjacentTo', object: 'chaise' } }, { a }), true, 'sa case (2,0) touche la chaise');
  assert.equal(E.evalClue(ctx, { who: 'a', logic: { type: 'sameColAs', object: 'table' } }, { a }), true, 'sa case (2,1)');
});

test('forme cachée : toutes les formes sont envisagées', () => {
  const known = E.placementsOf(E.prepare(bigMini), 'a').length;
  const hidden = E.placementsOf(E.prepare({ ...bigMini, hiddenShapes: true }), 'a');
  assert.ok(hidden.length > known);
  assert.deepEqual([...new Set(hidden.map(pl => pl.length))].sort(), [2, 3, 4], 'de 2 à 4 cases');
  const old = E.placementsOf(E.prepare({ ...bigMini, hiddenShapes: true, hiddenMax: 3 }), 'a');
  assert.deepEqual([...new Set(old.map(pl => pl.length))].sort(), [2, 3], 'grilles d\'origine : 2 ou 3 cases');
  assert.equal(E.skullsOf({ ...bigMini, hiddenShapes: true }, []), 5);
  assert.equal(E.skullsOf(bigMini, []), 4);
});

test('formes : 8 formes de 2 à 4 cases, tournées et retournées', () => {
  assert.deepEqual(Object.keys(E.SHAPES), ['I2', 'I3', 'L3', 'I4', 'O4', 'L4', 'T4', 'S4']);
  const n = Object.fromEntries(Object.keys(E.SHAPES).map(s => [s, E.orientations(s).length]));
  assert.deepEqual(n, { I2: 2, I3: 2, L3: 4, I4: 2, O4: 1, L4: 8, T4: 4, S4: 4 }, 'L et J, S et Z : la forme se retourne');
});

test('la taille d\'un grand personnage change d\'une affaire à l\'autre', () => {
  const shapes = {};
  for (const p of PUZZLES) for (const c of p.characters) if (c.shape) (shapes[c.archetype] = shapes[c.archetype] || new Set()).add(E.SHAPES[c.shape].cells.length);
  assert.ok(Object.values(shapes).some(s => s.size > 1));
});

test('pas deux grilles presque identiques dans un même décor (victime au même endroit, ou plus de la moitié des cases en commun)', () => {
  const by = {};
  for (const p of PUZZLES) (by[p.decor] = by[p.decor] || []).push(p);
  const sig = (p) => E.layoutSig(p.solution.positions, p.characters.find(c => c.role === 'victim').id);
  const close = [];
  for (const ps of Object.values(by))
    for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++)
      if (E.tooClose(sig(ps[i]), sig(ps[j]))) close.push(ps[i].id + ' ~ ' + ps[j].id);
  assert.deepEqual(close, []);
});
