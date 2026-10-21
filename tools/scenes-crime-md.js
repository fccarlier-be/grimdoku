// Grimdoku — scènes de crime précises, pour écrire des épilogues compatibles avec la solution (relecture extérieure) :
// pour chaque enquête active, dans l'ordre du jeu, la case de la victime et celle du coupable, le meuble sur lequel ils
// se tiennent (tapis, lit, chaise…), les meubles des cases voisines (nord, sud, est, ouest ; un mur sépare deux pièces)
// et un plan de la pièce du crime. AVEC les solutions.
// node tools/scenes-crime-md.js  → lore/SCENES_DE_CRIME.md (après un build)
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const E = require(path.join(ROOT, 'engine.js'));
const J = (f) => JSON.parse(fs.readFileSync(path.join(ROOT, f), 'utf8'));
const act = J('lore/actives.json'), carte = J('lore/carte.json');
const order = [carte.start];
for (let i = 0; i < order.length; i++) for (const n of carte.unlock[order[i]] || []) if (!order.includes(n)) order.push(n);
const CODE = { table: 'Ta', etagere: 'Et', chaudron: 'Cd', statue: 'St', tonneau: 'To', arbre: 'Ar', coffre: 'Co', foin: 'Fo', cristal: 'Cr',
  sarcophage: 'Sa', chaise: 'Ci', lit: 'Li', tapis: 'Tp', champi: 'Ch', portail: 'Po', canon: 'Ca', tombe: 'Tb', enclume: 'En', pupitre: 'Pu',
  roseaux: 'Ro', chariot: 'Cm', hamac: 'Ha', fauteuil: 'Fa', barque: 'Ba' };
const nameOf = (t) => E.OBJECTS[t].name + (E.OBJECTS[t].blocking ? '' : ' (on peut s\'y tenir)');
const cellsOf = (pos) => (Array.isArray(pos[0]) ? pos : [pos]);
const DIRS = [['au nord', -1, 0], ['au sud', 1, 0], ['à l\'ouest', 0, -1], ['à l\'est', 0, 1]];

const out = ['# Scènes de crime : où meurent les victimes', '',
  '**Contient les solutions.** Généré par `node tools/scenes-crime-md.js` à partir des grilles (ne pas éditer à la main).', '',
  'Pour chaque enquête : la pièce du crime et tous ses meubles, la case exacte de la victime et celle du coupable (ligne, colonne, comptées à partir de 1 ; le nord est en haut), le meuble sur lequel chacun se tient, et ce qui se trouve dans les quatre cases voisines (nord, sud, est, ouest). Une case voisine d\'une autre pièce est derrière un mur. Les grands personnages occupent plusieurs cases.', '',
  'Règles utiles pour écrire un épilogue : la victime était **seule avec son meurtrier** dans la pièce du crime (aucun autre personnage n\'y était) ; un épilogue ne doit citer que des meubles de cette pièce, de préférence ceux qui sont tout près de la victime. Les meubles marqués « on peut s\'y tenir » (tapis, lit, chaise, fauteuil, hamac, barque, champignon géant, portail runique) peuvent porter un personnage ; les autres sont bloquants (personne dessus).', '',
  '**Légende des plans** : `VI` victime, `CO` coupable, `..` case vide, `##` hors de la pièce du crime ; meubles : ' +
    Object.entries(CODE).map(([t, c]) => `\`${c}\` ${E.OBJECTS[t].name}`).join(', ') + '. Quand la victime ou le coupable se tient sur un meuble, le plan montre le personnage ; le texte précise le meuble.', ''];
let n = 0;
for (const pl of order) {
  if (!act[pl]) continue;
  const ps = act[pl].map(id => J(`puzzles/${id}.json`))
    .sort((a, b) => a.size - b.size || a.difficulty - b.difficulty || a.rating.score - b.rating.score || a.id.localeCompare(b.id));
  out.push(`## ${++n}. ${ps[0].title.split(' — ')[0]}`, '');
  ps.forEach((p, k) => {
    const v = p.characters.find(c => c.role === 'victim'), m = p.characters.find(c => c.id === p.solution.murderer);
    const vc = cellsOf(p.solution.positions[v.id]), mc = cellsOf(p.solution.positions[m.id]);
    const room = p.layout[vc[0][0]][vc[0][1]], inRoom = (r, c) => p.layout[r] && p.layout[r][c] === room;
    const obj = {};
    for (const o of p.objects) obj[o.at[0] + ',' + o.at[1]] = o.type;
    const who = {};
    for (const [r, c] of vc) who[r + ',' + c] = 'VI';
    for (const [r, c] of mc) who[r + ',' + c] = 'CO';
    const describe = (label, ch, cells) => {
      const lines = [`- **${label}** (${ch.name}${cells.length > 1 ? `, ${cells.length} cases` : ''}) : ` + cells.map(([r, c]) => {
        const on = obj[r + ',' + c];
        return `ligne ${r + 1}, colonne ${c + 1}` + (on ? `, **sur ${E.OBJECTS[on].the}**` : ', sur le sol nu');
      }).join(' ; ')];
      const near = [];
      for (const [r, c] of cells) for (const [d, dr, dc] of DIRS) {
        const rr = r + dr, cc = c + dc, key = rr + ',' + cc;
        if (rr < 0 || cc < 0 || rr >= p.size || cc >= p.size) { near.push(`${d} : bord de la carte`); continue; }
        if (cells.some(([a, b]) => a === rr && b === cc)) continue;
        if (!inRoom(rr, cc)) { near.push(`${d} : mur (autre pièce : ${p.rooms[p.layout[rr][cc]].name})`); continue; }
        const bits = [];
        if (who[key]) bits.push(who[key] === 'VI' ? 'la victime' : 'le coupable');
        if (obj[key]) bits.push(nameOf(obj[key]));
        near.push(`${d}${cells.length > 1 ? ` de la case ${r + 1},${c + 1}` : ''} : ${bits.join(', ') || 'case vide'}`);
      }
      lines.push(`  - cases voisines : ${near.join(' ; ')}`);
      return lines;
    };
    // plan de la pièce du crime (son rectangle englobant)
    const rs = [], cs = [];
    p.layout.forEach((row, r) => [...row].forEach((x, c) => { if (x === room) { rs.push(r); cs.push(c); } }));
    const r0 = Math.min(...rs), r1 = Math.max(...rs), c0 = Math.min(...cs), c1 = Math.max(...cs);
    const plan = [];
    for (let r = r0; r <= r1; r++) {
      let line = '';
      for (let c = c0; c <= c1; c++) line += (inRoom(r, c) ? (who[r + ',' + c] || CODE[obj[r + ',' + c]] || '..') : '##') + ' ';
      plan.push(line.trimEnd());
    }
    const meubles = [...new Set(p.objects.filter(o => inRoom(o.at[0], o.at[1])).map(o => E.OBJECTS[o.type].name))];
    const adjacent = vc.some(([r, c]) => mc.some(([a, b]) => Math.abs(a - r) + Math.abs(b - c) === 1));
    out.push(`### ${n}.${k + 1}. ${p.title.split(' — ')[1] || p.title} — coupable : ${m.name}`, '',
      `- **Pièce du crime** : ${p.rooms[room].name} ; meubles de la pièce : ${meubles.join(', ') || 'aucun'}`,
      ...describe('Victime', v, vc), ...describe('Coupable', m, mc),
      `- Coupable et victime ${adjacent ? '**côte à côte**' : 'pas côte à côte (ailleurs dans la même pièce)'} dans la solution.`, '',
      '```', ...plan, '```', '');
  });
}
fs.writeFileSync(path.join(ROOT, 'lore/SCENES_DE_CRIME.md'), out.join('\n'));
console.log(`lore/SCENES_DE_CRIME.md : ${n} lieux, ${Math.round(fs.statSync(path.join(ROOT, 'lore/SCENES_DE_CRIME.md')).size / 1024)} Ko`);
