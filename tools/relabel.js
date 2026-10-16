// Grimdoku — réattribue les lettres d'une solution existante pour que l'ordre alphabétique suive l'ordre de facilité
// du solveur complet (même règle que gen.js et que la vérification du build). La solution ne change pas ;
// les noms suivent les lettres. Affaires automatiques (<décor>--<type>) et énigmes du MANIFEST ; ne révèle rien.
// Usage : node tools/relabel.js
'use strict';
const fs = require('fs');
const path = require('path');
const E = require('../engine');
const { resolve, loadScene, withVictim, withBig } = require('../cast');
const ROOT = path.join(__dirname, '..');

let fixed = 0;
const MANIFEST = eval(fs.readFileSync(path.join(ROOT, 'build-puzzles.js'), 'utf8').match(/const MANIFEST = (\[[\s\S]*?\n\]);/)[1]);
const sceneOf = Object.fromEntries(MANIFEST.map(e => [e.id, e.scene]));
const BIG = Object.fromEntries(JSON.parse(fs.readFileSync(path.join(ROOT, 'big-cases.json'), 'utf8')).cases.map(c => [c.id, c]));
for (const file of fs.readdirSync(path.join(ROOT, 'solutions'))) {
  const id = file.replace(/\.json$/, '');
  const big = BIG[id];
  const [scene, victim] = big ? [big.scene, big.victim] : id.includes('--') ? id.split('--') : [sceneOf[id], null];
  if (!scene) continue;
  const sol = JSON.parse(fs.readFileSync(path.join(ROOT, 'solutions', file), 'utf8'));
  const loaded = loadScene(path.join(ROOT, 'scenes', scene + '.json'));
  const raw = big ? withBig(loaded, victim, big.big) : victim ? withVictim(loaded, victim) : loaded;
  const p = resolve(raw, sol.cast);
  if (big && big.hidden) p.hiddenShapes = true;
  const ids = p.characters.map(c => c.id);
  const vic = p.characters.find(c => c.role === 'victim').id;
  const suspects = ids.filter(x => x !== vic);
  const steps = E.humanSolve(p, sol.clues, 2).steps;
  const step = {};
  steps.forEach((st, k) => st.ids.forEach(x => (step[x] = k)));
  if (!suspects.some((x, i) => i && step[x] < step[suspects[i - 1]])) continue;
  // f : ancienne lettre → nouvelle lettre, suspects rangés par étape (ordre d'origine conservé en cas d'égalité)
  const order = [...suspects].sort((a, b) => step[a] - step[b] || a.localeCompare(b));
  const f = { [vic]: vic };
  order.forEach((old, i) => (f[old] = suspects[i]));
  const castNow = sol.cast || Object.fromEntries(ids.map(x => [x, x]));
  const cast = {}, positions = {};
  for (const old of ids) { cast[f[old]] = castNow[old] || old; positions[f[old]] = sol.positions[old]; }
  delete cast[vic];
  const out = {
    ...sol, positions, murderer: f[sol.murderer], cast,
    clues: sol.clues.map(cl => ({ who: f[cl.who], logic: cl.logic.other ? { ...cl.logic, other: f[cl.logic.other] } : cl.logic }))
  };
  fs.writeFileSync(path.join(ROOT, 'solutions', file), JSON.stringify(out, null, 1) + '\n');
  fixed++;
  console.log('lettres réattribuées :', id);
}
console.log(fixed, 'solution(s) corrigée(s)');
