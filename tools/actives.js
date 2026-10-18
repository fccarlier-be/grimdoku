// Grilles actives de chaque lieu (décision de François, 2026-10-19 : 5 à 7 grilles par niveau, la lettre à la dernière ;
// les autres grilles sont gardées mais désactivées). Écrit lore/actives.json : { lieu: [ids] }.
// Nombre de grilles selon la profondeur du lieu dans l'arbre de déblocage (lore/carte.json) : 5 près du château,
// 6 au milieu, 7 pour les plus lointains ; choisies à intervalles réguliers dans l'ordre du jeu (taille, difficulté),
// pour garder une progression de la plus facile à la plus dure. Usage : node tools/actives.js
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const carte = JSON.parse(fs.readFileSync(path.join(ROOT, 'lore/carte.json'), 'utf8'));
const puzzles = fs.readdirSync(path.join(ROOT, 'puzzles')).sort().map(f => JSON.parse(fs.readFileSync(path.join(ROOT, 'puzzles', f), 'utf8')))
  .filter(p => !p.final)
  .sort((a, b) => a.size - b.size || a.difficulty - b.difficulty || a.rating.score - b.rating.score || a.id.localeCompare(b.id));
const depth = { [carte.start]: 0 }, todo = [carte.start];
while (todo.length) { const a = todo.shift(); for (const b of carte.unlock[a] || []) if (!(b in depth)) { depth[b] = depth[a] + 1; todo.push(b); } }
const want = (d) => d <= 1 ? 5 : d <= 3 ? 6 : 7;
const out = { _doc: 'Grilles actives par lieu (généré par tools/actives.js, modifiable à la main). Les autres grilles sont désactivées, pas supprimées.' };
for (const place of [...new Set(puzzles.map(p => p.place))].sort((a, b) => (depth[a] ?? 99) - (depth[b] ?? 99) || a.localeCompare(b))) {
  const list = puzzles.filter(p => p.place === place), k = Math.min(list.length, want(depth[place] ?? 9));
  out[place] = k === 1 ? [list[0].id] : Array.from({ length: k }, (_, i) => list[Math.round(i * (list.length - 1) / (k - 1))].id);
  console.log(`${place.padEnd(14)} profondeur ${depth[place] ?? '?'} : ${k} / ${list.length}`);
}
fs.writeFileSync(path.join(ROOT, 'lore/actives.json'), JSON.stringify(out, null, 2) + '\n');
