// Grimdoku — distribution : transforme les personnages d'une scène ({ id, archetype, role })
// en fiches complètes (nom, genre, icône, description, pouvoirs) d'après cast.json.
// Le nom dépend de la LETTRE (l'identifiant) : le personnage « c » s'appelle names.C de son type.
'use strict';
const fs = require('fs');
const path = require('path');

const ARCHETYPES = JSON.parse(fs.readFileSync(path.join(__dirname, 'cast.json'), 'utf8'));
delete ARCHETYPES._doc;
// chaque nom commence par sa lettre (accents ignorés : Écarlate → E)
for (const [type, a] of Object.entries(ARCHETYPES))
  for (const [letter, name] of Object.entries(a.names))
    if (name.normalize('NFD')[0].toUpperCase() !== letter) throw new Error(`cast.json : ${type}.${letter} = ${name}`);

// scene : la scène telle qu'écrite ; cast (optionnel, sortie de gen.js) : { lettre: identifiant d'origine }
// quand le générateur a réattribué les lettres. Renvoie une copie de la scène avec des fiches complètes.
function resolve(scene, cast = {}) {
  const byId = Object.fromEntries(scene.characters.map(c => [c.id, c]));
  const characters = scene.characters.map(slot => {
    const src = byId[cast[slot.id] || slot.id];
    const a = ARCHETYPES[src.archetype];
    if (!a) throw new Error(`${scene.id} : type de personnage inconnu « ${src.archetype} »`);
    const name = a.names[slot.id.toUpperCase()];
    if (!name) throw new Error(`${scene.id} : pas de nom en ${slot.id.toUpperCase()} pour le type ${src.archetype}`);
    const ch = { id: slot.id, name, gender: a.gender, role: src.role, icon: a.icon, desc: a.desc, archetype: src.archetype };
    if (a.traits) ch.traits = a.traits;
    // grand personnage (4–5 crânes) : forme propre à l'énigme (engine.js, SHAPES), donnée par withBig
    if (src.shape) {
      if (!a.big) throw new Error(`${scene.id} : ${src.archetype} n'est pas un grand personnage`);
      ch.shape = src.shape;
    }
    return ch;
  });
  return { ...scene, characters };
}

// Charge scenes/<nom>.json. Une variante ({ "extends": "foire", ... }) reprend le plan, les pièces et les objets
// de sa scène de base, et remplace ce qu'elle redéfinit (personnages, intro, épilogues, sous-titre).
function loadScene(file) {
  const scene = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!scene.extends) return scene;
  const base = loadScene(path.join(path.dirname(file), scene.extends + '.json'));
  const { extends: _, ...own } = scene;
  return { ...base, epilogue: undefined, epilogues: undefined, subtitle: undefined, ...own };
}

// Affaires automatiques : le groupe d'habitués d'un décor (ses personnages), avec `victimType` comme victime.
// Suspects en a, b, c… puis la victime en dernier (gen.js réattribue ensuite les lettres selon la facilité).
function withVictim(scene, victimType) {
  const pool = scene.characters.map(c => c.archetype);
  if (!pool.includes(victimType)) throw new Error(`${victimType} n'est pas un habitué de ce décor (${pool.join(', ')})`);
  const order = pool.filter(t => t !== victimType).concat(victimType);
  const characters = order.map((t, i) => ({ id: String.fromCharCode(97 + i), archetype: t, role: t === victimType ? 'victim' : 'suspect' }));
  return { ...scene, characters };
}

// Affaires à grands personnages (4–5 crânes) : les habitués d'un décor, `bigTypes` en plus (types de cast.json marqués
// `big`), `victimType` comme victime (habitué ou grand). `shapes` : la forme de chaque grand, dans l'ordre de `bigTypes`
// (la taille varie d'une énigme à l'autre). Chaque case prend sa ligne et sa colonne : on garde le plus grand nombre
// d'habitués pour lequel une orientation des grands tient dans la carte (lignes ≤ N et colonnes ≤ N).
const { orientations, SHAPES } = require('./engine');
// [lignes, colonnes] occupées par chaque orientation d'une forme
const spans = (s) => orientations(s).map(o => [Math.max(...o.map(x => x[0])) + 1, Math.max(...o.map(x => x[1])) + 1]);
function withBig(scene, victimType, bigTypes, shapes) {
  const n = scene.size;
  if (!shapes || shapes.length !== bigTypes.length) throw new Error(`${scene.id} : une forme par grand personnage (${bigTypes.join(', ')})`);
  const shapeOf = Object.fromEntries(bigTypes.map((t, i) => [t, shapes[i]]));
  for (const [t, s] of Object.entries(shapeOf)) {
    if (!ARCHETYPES[t] || !ARCHETYPES[t].big) throw new Error(`${t} n'est pas un grand personnage`);
    if (!SHAPES[s]) throw new Error(`forme inconnue ${s}`);
  }
  // toutes les sommes [lignes, colonnes] possibles pour les grands
  let sums = [[0, 0]];
  for (const s of shapes) sums = sums.flatMap(([r, c]) => spans(s).map(([dr, dc]) => [r + dr, c + dc]));
  const small = Math.max(...sums.map(([r, c]) => n - Math.max(r, c))); // personnages d'une case (victime comprise)
  const smallSuspects = small - (shapeOf[victimType] ? 0 : 1);
  const pool = scene.characters.map(c => c.archetype).filter(t => t !== victimType && !bigTypes.includes(t));
  if (pool.length < smallSuspects) throw new Error(`décor trop petit : ${smallSuspects} habitués demandés, ${pool.length} disponibles`);
  const order = bigTypes.filter(t => t !== victimType).concat(pool.slice(0, smallSuspects), victimType);
  const characters = order.map((t, i) => {
    const ch = { id: String.fromCharCode(97 + i), archetype: t, role: t === victimType ? 'victim' : 'suspect' };
    if (shapeOf[t]) ch.shape = shapeOf[t];
    return ch;
  });
  return { ...scene, characters };
}

module.exports = { ARCHETYPES, resolve, loadScene, withVictim, withBig };
