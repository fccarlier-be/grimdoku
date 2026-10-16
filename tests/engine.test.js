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
    assert.equal(p.difficulty, E.rateDifficulty(h.steps).skulls, 'crânes = difficulté calculée');

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
  assert.equal(easy.skulls, 1);
  assert.equal(noStart.score, easy.score + 2);
  assert.equal(E.rateDifficulty([{ ids: ['a'], tech: 0 }, { ids: ['b'], tech: 6 }]).skulls, 3, 'groupes → 3 crânes');
});
