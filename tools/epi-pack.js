// Grimdoku — prépare la page de relecture des épilogues pour le VPS (grimdoku.fcold.org/epi) :
// deploy/grimdoku/epi/app/relecture.js (le serveur), bundle.json (contexte de chaque épilogue : lieu, victime, coupable,
// introduction, figé à cette version des énigmes) et seed/ (épilogues de départ, utilisés seulement si le VPS n'en a pas
// encore). Les épilogues modifiés en ligne vivent dans ~/grimdoku/epi/data sur le VPS, jamais écrasés par une mise en ligne.
// Usage : node tools/epi-pack.js  (lancé par la mise en ligne)
'use strict';
const fs = require('fs');
const path = require('path');
const { context } = require('./relecture');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'deploy/grimdoku/epi/app');
fs.mkdirSync(path.join(OUT, 'seed'), { recursive: true });
const epi = JSON.parse(fs.readFileSync(path.join(ROOT, 'lore/epilogues.json'), 'utf8'));
// contexte de toutes les énigmes (pas seulement celles qui ont déjà un épilogue) : un épilogue ajouté en ligne plus tard
// retrouve le sien
const ids = fs.readdirSync(path.join(ROOT, 'puzzles')).filter(f => f.endsWith('.json')).map(f => f.slice(0, -5));
const ctx = context(ids);
fs.writeFileSync(path.join(OUT, 'bundle.json'), JSON.stringify(ctx));
fs.copyFileSync(path.join(__dirname, 'relecture.js'), path.join(OUT, 'relecture.js'));
// noms des habitués, pour la vue « Carnet » de la relecture
const cast = JSON.parse(fs.readFileSync(path.join(ROOT, 'cast.json'), 'utf8'));
fs.writeFileSync(path.join(OUT, 'noms.json'), JSON.stringify(Object.fromEntries(Object.entries(cast).filter(([k, a]) => k !== '_doc' && !a.guest).map(([k, a]) => [k, a.name]))));
for (const f of ['epilogues.json', 'epilogues-relecture.json', 'intros.json', 'carnet-decouvertes.json'])
  if (fs.existsSync(path.join(ROOT, 'lore', f))) fs.copyFileSync(path.join(ROOT, 'lore', f), path.join(OUT, 'seed', f));
console.log(`deploy/grimdoku/epi/app : ${Object.keys(ctx).length} énigmes en contexte, ${Object.keys(epi).length - 1} épilogues de départ`);
