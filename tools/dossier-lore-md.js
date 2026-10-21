// Grimdoku — dossier unique pour une relecture extérieure du lore (ChatGPT, Mistral…) : règles du jeu et d'écriture,
// lore complet (lore/LORE.md sans la partie technique), canon du fil rouge (matrice de continuité, sans les consignes
// de migration), puis toutes les intros et tous les épilogues des grilles actives, dans l'ordre du jeu, avec coupables.
// node tools/dossier-lore-md.js  → lore/DOSSIER_LORE_COMPLET.md (lance d'abord lore-md.js et lecture-md.js)
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
for (const t of ['lore-md.js', 'lecture-md.js']) execFileSync('node', [path.join(__dirname, t)], { cwd: ROOT });
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
// retire les sections « ## <titre> » dont le titre correspond, jusqu'à la section suivante de même niveau
const without = (md, re) => md.split(/\n(?=## )/).filter(s => !re.test(s.split('\n')[0])).join('\n');
const down = (md) => md.replace(/^(#{1,5}) /gm, '#$1 '); // chaque document passe un niveau de titre plus bas

const intro = `# Grimdoku — dossier complet du lore (relecture extérieure)

Ce dossier réunit tout le lore du jeu **Grimdoku** pour une relecture extérieure. **Il contient les solutions (les coupables).**

## Le jeu en quelques lignes

Grimdoku est un jeu de logique de type « murder puzzle », dans un univers de fantasy humoristique (la baronnie de Brumeval). Chaque enquête est une grille : on place chaque personnage sur la carte d'un lieu à l'aide d'indices (une personne par ligne et par colonne, chaque pièce occupée). **Chaque suspect était seul dans sa pièce, sauf le coupable, qui était avec la victime** : en plaçant la victime, on démasque le coupable. La victime est toujours un « invité de passage » (abbesse, percepteur, huissier…) ; les suspects sont une troupe récurrente de personnages au nom fixe, qu'on retrouve d'un lieu à l'autre.

Le joueur avance lieu par lieu sur une carte (23 lieux, 5 à 7 enquêtes chacun, dans l'ordre qu'il veut à l'intérieur d'un lieu). Chaque enquête s'ouvre sur une **intro** (voix de l'enquêteur) et se termine, une fois résolue, sur un **épilogue** (dialogue de l'enquêteur avec le coupable). L'intro affichée = une **ouverture** propre au lieu, qui dépend du nombre d'affaires déjà résolues sur place (première venue, retours, dernière), suivie de la **mise en situation** propre à l'enquête.

## Règles d'écriture

**Épilogues**
1. Quatre répliques : l'enquêteur, le coupable, l'enquêteur, le coupable. La première nomme la victime, avec une tournure variée.
2. Le tic de langage du coupable devient un raisonnement ou une action, pas une ponctuation plaquée.
3. Le mobile touche le point sensible du coupable ; il doit être assez fort pour que CE personnage tue. Un accident absurde convient aussi très bien.
4. La chute doit faire comprendre comment la victime est morte.
5. Le gag récurrent d'un personnage ne doit jamais être plaqué : s'il ne découle pas de la situation, on s'en passe.
6. L'enquêteur reste sobre : une question ou une objection, jamais l'explication de la blague.
7. Rien d'inventé hors canon. **La scène doit être compatible avec la solution** : la mort a lieu dans la pièce du crime (indiquée pour chaque enquête, avec ses meubles), la victime y était seule avec son meurtrier (aucun autre personnage ne peut intervenir).

**Intros**
- Même longueur pour toutes (3 à 4 phrases) ; deux enquêtes d'un même lieu ne finissent jamais par la même phrase.
- Aucun indice sur le coupable (ni tic, ni trait reconnaissable) ; aucune pièce de la carte nommée (ce serait un indice de position).
- L'épilogue répond à la mise en situation (mêmes détails).
- Les ouvertures d'un lieu ne mettent pas en avant un habitué qui est coupable dans ce lieu.

**Interdits** : aucun emoji ; pas de références modernes (le monde est médiéval-fantastique).
`;

const parts = [
  intro,
  '---\n\n# Partie 1 — Le lore complet\n',
  down(without(read('lore/LORE.md'), /^## (Sommaire|13\.)/).replace(/^# .*\n/, '')),
  '---\n\n# Partie 2 — Le canon du fil rouge (matrice de continuité)\n',
  down(without(read('lore/GRIMDOKU_MATRICE_CONTINUITE.md'), /^## (6\.|9\.)/).replace(/^# .*\n/, '')),
  '---\n\n# Partie 3 — Toutes les intros et tous les épilogues, dans l\'ordre du jeu\n',
  down(read('lore/LECTURE_INTROS_EPILOGUES.md').replace(/^# .*\n/, '')),
];
fs.writeFileSync(path.join(ROOT, 'lore/DOSSIER_LORE_COMPLET.md'), parts.join('\n'));
const size = fs.statSync(path.join(ROOT, 'lore/DOSSIER_LORE_COMPLET.md')).size;
console.log(`lore/DOSSIER_LORE_COMPLET.md : ${Math.round(size / 1024)} Ko`);
