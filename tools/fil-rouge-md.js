// Grimdoku — les textes du fil rouge pendant le jeu (lore/fil-rouge.json), à relire d'un coup : déclics du mur,
// petites questions avec leurs pièces (et la lettre de chaque pièce), déductions, visites à la Tour.
// node tools/fil-rouge-md.js  → lore/FIL_ROUGE.md
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const J = (f) => JSON.parse(fs.readFileSync(path.join(ROOT, f), 'utf8'));
const F = J('lore/fil-rouge.json'), L = J('lore/lettres.json').letters;
const title = (pl) => J(`scenes/${pl}.json`).title;
const q = (s) => s.split('\n').map(l => '> ' + l).join('  \n>\n');
const out = ['# Le fil rouge pendant le jeu — textes à relire', '',
  'Généré par `node tools/fil-rouge-md.js` depuis `lore/fil-rouge.json` (et les lettres de `lore/lettres.json`) : c\'est là qu\'on modifie. Phase 2 de la roadmap : le mur de l\'affaire de la Tour, les petites questions, et les trois visites à Fizzlebarbe. Les seuils comptent les lettres **ouvertes**, quel que soit l\'ordre des lieux.', '',
  '## 1. Les déclics de l\'enquêteur (le mur se construit)', '',
  ...F.declics.flatMap(d => [`**À ${d.lettres} lettre${d.lettres > 1 ? 's' : ''}**${d.mur ? ` — question en tête du mur : *${d.question}*` : ' — pas encore de mur (note dans le carnet)'}`, '', q(d.texte), '']),
  '## 2. Les petites questions, leurs pièces et leurs déductions', '',
  'Chaque lettre épingle une pièce (l\'étiquette ci-dessous) sous une question. La question apparaît avec sa première pièce ; quand toutes ses pièces sont là, l\'enquêteur écrit sa déduction.', '',
  ...Object.entries(F.questions).flatMap(([k, Q]) => {
    const ps = Object.entries(F.pieces).filter(([, p]) => p.question === k);
    return [`### ${Q.titre} (${ps.length} pièces)`, '', ...ps.map(([pl, p]) => `- **${title(pl)}** — *« ${p.etiquette} »*  \n  Lettre : ${L[pl]}`), '', '**Déduction** :', '', q(Q.deduction), ''];
  }),
  '## 3. Les trois visites à la Tour', '',
  ...F.visites.flatMap(v => [`### À ${v.lettres} lettres — ${v.titre}`, '', q(v.texte), '', `*Note de l'enquêteur* : ${v.note}`, ''])];
fs.writeFileSync(path.join(ROOT, 'lore/FIL_ROUGE.md'), out.join('\n'));
console.log('lore/FIL_ROUGE.md');
