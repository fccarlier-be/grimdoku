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

module.exports = { ARCHETYPES, resolve, loadScene, withVictim };
