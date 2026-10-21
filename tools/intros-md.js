// Grimdoku — toutes les intros à relire d'un coup (lore/intros.json), lieu par lieu dans l'ordre de la carte :
// ouvertures selon le rang, puis le corps de chaque grille active, gabarits remplis. Sans coupable ni solution.
// node tools/intros-md.js  → lore/INTROS.md
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const J = (f) => JSON.parse(fs.readFileSync(path.join(ROOT, f), 'utf8'));
const I = J('lore/intros.json'), act = J('lore/actives.json'), carte = J('lore/carte.json');
const order = [carte.start];
for (let i = 0; i < order.length; i++) for (const n of carte.unlock[order[i]] || []) if (!order.includes(n)) order.push(n);
const RANG = ['2e', '3e', '4e', '5e', '6e'];
const out = ['# Intros des enquêtes', '', 'Généré par `node tools/intros-md.js` depuis `lore/intros.json` (ne pas éditer à la main). L\'ouverture dépend du nombre d\'affaires déjà résolues dans le lieu ; le corps est propre à chaque grille.', ''];
for (const pl of order) {
  const o = I.lieux[pl];
  if (!o || !act[pl]) continue;
  const ps = act[pl].map(id => J(`puzzles/${id}.json`));
  out.push(`## ${ps[0].title.split(' — ')[0]}`, '', '**Ouvertures**', '', `- *Première venue* : ${o.premiere}`);
  o.retours.forEach((t, i) => out.push(`- *${RANG[i]} affaire* : ${t}`));
  out.push(`- *Dernière* : ${o.derniere}`, '', '**Mises en situation**', '');
  for (const p of ps) out.push(`- *${p.title.split(' — ')[1] || p.id}* : ${p.introBody || '(ancienne intro) ' + p.intro}`);
  out.push('');
}
fs.writeFileSync(path.join(ROOT, 'lore/INTROS.md'), out.join('\n'));
console.log(`lore/INTROS.md : ${order.filter(pl => I.lieux[pl]).length} lieux`);
