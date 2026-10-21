// Grimdoku — relire intros ET épilogues d'un coup, dans l'ordre du jeu (AVEC les coupables : spoilers).
// Lieux dans l'ordre de la carte, affaires dans l'ordre de la page du lieu (taille, puis difficulté) ;
// pour chaque lieu, ses ouvertures (selon le rang), puis chaque affaire : intro, épilogue, statut de relecture.
// node tools/lecture-md.js  → lore/LECTURE_INTROS_EPILOGUES.md (après un build : textes remplis des énigmes)
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const J = (f) => JSON.parse(fs.readFileSync(path.join(ROOT, f), 'utf8'));
const I = J('lore/intros.json'), act = J('lore/actives.json'), carte = J('lore/carte.json'), rev = J('lore/epilogues-relecture.json');
const order = [carte.start];
for (let i = 0; i < order.length; i++) for (const n of carte.unlock[order[i]] || []) if (!order.includes(n)) order.push(n);
const RANG = ['2e', '3e', '4e', '5e', '6e'], STATUT = { valide: 'validé', relire: 'à relire', revoir: 'à revoir' };
const out = ['# Intros et épilogues, dans l\'ordre du jeu', '',
  '**Contient les coupables.** Généré par `node tools/lecture-md.js` (ne pas éditer à la main : les textes sont dans `lore/intros.json` et `lore/epilogues.json`).', '',
  'Dans chaque lieu, l\'intro affichée = l\'ouverture (selon le nombre d\'affaires déjà résolues sur place) + la mise en situation de l\'affaire.', ''];
let n = 0;
for (const pl of order) {
  if (!act[pl]) continue;
  const o = I.lieux[pl];
  const ps = act[pl].map(id => J(`puzzles/${id}.json`))
    .sort((a, b) => a.size - b.size || a.difficulty - b.difficulty || a.rating.score - b.rating.score || a.id.localeCompare(b.id));
  out.push(`## ${++n}. ${ps[0].title.split(' — ')[0]}`, '');
  if (o) {
    out.push('**Ouvertures**', '', `- *Première venue* : ${o.premiere}`);
    o.retours.forEach((t, i) => out.push(`- *${RANG[i]} affaire* : ${t}`));
    out.push(`- *Dernière* : ${o.derniere}`, '');
  }
  ps.forEach((p, k) => {
    const m = p.characters.find(c => c.id === p.solution.murderer);
    const st = (rev[p.id] || {}).status || 'relire';
    // pièce du crime (celle de la victime) et ses meubles : un épilogue ne doit pas situer la mort ailleurs
    const v = p.characters.find(c => c.role === 'victim'), pos = p.solution.positions[v.id], [r, c] = Array.isArray(pos[0]) ? pos[0] : pos;
    const room = p.layout[r][c], meubles = p.objects.filter(o => p.layout[o.at[0]][o.at[1]] === room).map(o => o.type);
    out.push(`### ${n}.${k + 1}. ${p.title.split(' — ')[1] || p.title} (${p.size}×${p.size}) — coupable : ${m.name}`, '',
      `*Pièce du crime : ${p.rooms[room].name}${meubles.length ? ' (meubles : ' + [...new Set(meubles)].join(', ') + ')' : ''}. Suspects : ${p.characters.filter(c => c.role !== 'victim').map(c => c.name).join(', ')}.*`, '',
      `**Intro** : ${p.introBody || p.intro}`, '', '**Épilogue** :', '',
      ...p.epilogue.split('\n').map(l => `> ${l}  `), '', `*Relecture : ${STATUT[st] || st}*`, '');
  });
}
fs.writeFileSync(path.join(ROOT, 'lore/LECTURE_INTROS_EPILOGUES.md'), out.join('\n'));
console.log(`lore/LECTURE_INTROS_EPILOGUES.md : ${n} lieux`);
