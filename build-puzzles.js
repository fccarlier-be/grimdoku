'use strict';
const fs = require('fs');
const E = require('./engine');
const { resolve, loadScene, compose, autoCases, ARCHETYPES } = require('./cast');
// Énigmes publiées : identifiant → scène (plan, personnages, intro, épilogue(s)) + solution (sortie de gen.js).
// Une variante de scène (« extends ») réutilise un décor avec une autre victime ; son « subtitle » complète le titre.
// Intro et épilogue : {victime} et {coupable} sont remplacés par les noms (qui dépendent des lettres) ;
// « epilogues » donne un texte par type de coupable possible, pour que personne n'ait besoin de connaître la solution.
// Les énigmes écrites à la main (grim-001 à grim-012, victimes de la troupe) ont été retirées avec la bible du jeu
// (2026-10-17) : la troupe est récurrente, la victime est un invité de passage. Leurs scènes restent dans scenes/.
// L'affaire finale du fil rouge (lettres d'Augure) est une scène écrite à la main : elle reste ici.
const MANIFEST = [
  { id: 'testament', scene: 'testament' }
];

// Affaires automatiques : chaque décor qui a des textes « auto » (intro et mobiles génériques) donne une affaire
// par habitué victime, dès que solutions/<décor>--<type>.json existe (produit par gen.js --victim=<type>).
// Une affaire par habitué absent, avec un invité de passage pour victime (autoCases, cast.js).
const baseOf = (name) => { const raw = JSON.parse(fs.readFileSync(`scenes/${name}.json`, 'utf8')); return raw.extends || name; };
for (const f of fs.readdirSync('scenes').sort()) {
  const name = f.replace(/\.json$/, '');
  const scene = loadScene(`scenes/${f}`);
  // les variantes (« extends ») réutilisent un décor : pas d'affaires automatiques en double
  if (baseOf(name) !== name || !scene.auto) continue;
  for (const c of autoCases(name, scene)) if (fs.existsSync(`solutions/${c.id}.json`)) MANIFEST.push({ ...c, scene: name });
}

// Affaires à grands personnages (4–5 crânes) : big-cases.json, dès que leur solution existe.
for (const c of JSON.parse(fs.readFileSync('big-cases.json', 'utf8')).cases)
  if (fs.existsSync(`solutions/${c.id}.json`)) MANIFEST.push(c);

const NOMBRES = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze'];
const cap = (t) => t[0].toUpperCase() + t.slice(1);
// « de » / « que » élidés devant une voyelle : d'Amphora, qu'Écarlate
const elide = (word, name) => /^[aeiouyhàâéèêëîïôöûü]/i.test(name.normalize('NFC')) ? word.slice(0, -1) + '\'' + name : word + ' ' + name;
// Une phrase par indice. first : le nom ouvre la phrase, sinon le pronom (Il / Elle).
function clueText(p, ch, L, first) {
  const f = ch.gender === 'f', e = f ? 'e' : '';
  const who = first ? ch.name : (f ? 'Elle' : 'Il');
  const obj = L.object && E.OBJECTS[L.object];
  const other = L.other && p.characters.find(c => c.id === L.other).name;
  const room = L.room && p.rooms[L.room].the;
  switch (L.type) {
    case 'inRoom': return `${who} était dans ${room}.`;
    case 'notInRoom': return `${who} n'était pas dans ${room}.`;
    case 'onObject':
      if (L.object === 'chaise') return `${who} était assis${e} sur une chaise.`;
      if (L.object === 'lit') return `${who} était allongé${e} sur un lit.`;
      if (L.object === 'fauteuil') return `${who} était assis${e} dans un fauteuil.`;
      if (L.object === 'hamac') return `${who} était allongé${e} dans un hamac.`;
      if (L.object === 'barque') return `${who} était dans une barque.`;
      return obj.blocking ? `${who} hantait ${obj.a}.` : `${who} était sur ${obj.a}.`;
    case 'adjacentTo': return `${who} était à côté d'${obj.a}.`;
    case 'notAdjacentTo': return `${who} n'était pas à côté d'${obj.a}.`;
    case 'sameRowAs': return `${who} était sur la même ligne qu'${obj.a}.`;
    case 'sameColAs': return `${who} était dans la même colonne qu'${obj.a}.`;
    case 'northOf': return `${who} était au nord ${elide('de', other)}.`;
    case 'southOf': return `${who} était au sud ${elide('de', other)}.`;
    case 'eastOf': return `${who} était à l'est ${elide('de', other)}.`;
    case 'westOf': return `${who} était à l'ouest ${elide('de', other)}.`;
    case 'sameRoomAs': return `${who} était dans la même pièce ${elide('que', other)}.`;
    case 'alone': return `${who} était seul${e} dans sa pièce.`;
    default: throw new Error('pas de texte pour ' + L.type);
  }
}

// Conventions de présentation (cf. CLAUDE.md §6) : lève une erreur si une énigme ne les respecte pas.
function checkConventions(p) {
  const ctx = E.prepare(p);
  const chars = p.characters;
  // suspects a, b, c… puis la victime, dernière lettre (la lettre est une pastille, plus l'initiale du nom)
  chars.forEach((c, i) => {
    const want = String.fromCharCode(97 + i);
    if (c.id !== want) throw new Error(`${p.id} : ${c.name} devrait porter la lettre ${want.toUpperCase()}`);
  });
  if (chars[chars.length - 1].role !== 'victim' || chars.filter(c => c.role === 'victim').length !== 1)
    throw new Error(p.id + ' : la victime doit être le dernier personnage');
  // la victime n'a aucun indice
  const v = chars.find(c => c.role === 'victim');
  if (p.clues.some(cl => cl.who === v.id)) throw new Error(p.id + ' : la victime ne doit pas avoir d\'indice');
  // qui est sur un meuble a un indice qui le dit
  for (const [id, v] of Object.entries(p.solution.positions)) {
    const o = E.cellsOf(v).map(([r, c]) => ctx.objAt[r + ',' + c]).find(Boolean);
    if (o && !p.clues.some(cl => cl.who === id && cl.logic.type === 'onObject' && cl.logic.object === o.type))
      throw new Error(`${p.id} : ${ctx.chars[id].name} est sur ${E.OBJECTS[o.type].the} sans indice qui le dise`);
  }
  // A est le plus facile à placer, puis B… (ex æquo autorisés)
  const step = {};
  E.humanSolve(p, p.clues, 2).steps.forEach((st, k) => st.ids.forEach(id => (step[id] = k)));
  const suspects = chars.filter(c => c.role !== 'victim');
  for (let i = 1; i < suspects.length; i++)
    if (step[suspects[i].id] < step[suspects[i - 1].id])
      throw new Error(`${p.id} : ${suspects[i].name} se place avant ${suspects[i - 1].name}, l'ordre alphabétique doit suivre la facilité`);
}
const TITLES = new Set();
const BUILT = new Set(); // énigmes écrites par ce build
for (const entry of MANIFEST) {
  if (!fs.existsSync(`solutions/${entry.id}.json`)) { console.log(`⏳ ${entry.id} : pas encore de solution (node tools/batch.js)`); continue; }
  const s = JSON.parse(fs.readFileSync(`solutions/${entry.id}.json`, 'utf8'));
  const base = loadScene(`scenes/${entry.scene}.json`);
  const scene = compose(base, entry);
  const auto = entry.victim || entry.guest; // affaire automatique : textes « auto » du décor
  const texts = auto ? scene.auto : scene;
  // noms d'après la lettre (cast.json) ; s.cast : lettres réattribuées par gen.js
  const p = resolve(scene, s.cast);
  delete p.epilogues; delete p.scene; delete p.subtitle; // seuls intro et epilogue (remplis) vont dans l'énigme
  // illustration du décor sur la fiche d'enquête (assets/decors/<décor>) ; un grand plan peut reprendre celle d'un autre décor
  p.decor = scene.decor || baseOf(entry.scene);
  p.id = entry.id;
  p.place = baseOf(entry.scene); // le lieu (décor) : sa lettre d'Augure, la carte de la baronnie
  if (scene.final) p.final = true; // affaire finale du fil rouge : cachée jusqu'à ce que les lettres soient réunies
  if (entry.hidden) p.hiddenShapes = true;
  if (entry.hiddenMax) p.hiddenMax = entry.hiddenMax; // 5 crânes : le joueur ne connaît pas la forme des grands
  delete p.auto;
  const nameOf = (id) => p.characters.find(c => c.id === id).name;
  const victim = p.characters.find(c => c.role === 'victim');
  if (scene.subtitle) p.title = `${scene.title} — ${scene.subtitle}`;
  if (auto) p.title = `${scene.title} — l'affaire ${victim.name}`;
  // même décor, même victime qu'une affaire déjà publiée (grands personnages de tailles différentes) : la seconde affaire
  if (auto && TITLES.has(p.title)) p.title = `${scene.title} — la seconde affaire ${victim.name}`;
  if (TITLES.has(p.title)) throw new Error(`${p.id} : titre déjà pris « ${p.title} »`);
  TITLES.add(p.title);
  // gabarits : {victime} {coupable}, {titre}/{Titre} (« le percepteur »), accords sur la victime {e} {il}/{Il} {lui},
  // nombre de suspects en lettres {nombre}/{Nombre}, et pour un invité {motif} (« venu{e} … ») et {menace} (épilogues)
  const va = ARCHETYPES[victim.archetype];
  const f = victim.gender === 'f', nb = NOMBRES[p.characters.length - 1], title = va.title;
  const fill = (t) => t.replace(/\{motif\}/g, va.motif || '').replace(/\{menace\}/g, va.menace || 'me nuire').replace(/\{victime\}/g, victim.name).replace(/\{coupable\}/g, nameOf(s.murderer))
    .replace(/\{titre\}/g, title).replace(/\{Titre\}/g, cap(title)).replace(/\{e\}/g, f ? 'e' : '')
    .replace(/\{il\}/g, f ? 'elle' : 'il').replace(/\{Il\}/g, f ? 'Elle' : 'Il').replace(/\{lui\}/g, f ? 'elle' : 'lui')
    .replace(/\{nombre\}/g, nb).replace(/\{Nombre\}/g, cap(nb));
  p.intro = fill(texts.intro);
  // épilogue : le dialogue du coupable avec l'enquêteur (cast.json, propre au personnage, avec son tic) ; une scène écrite
  // à la main peut avoir le sien. Lignes « — … » : l'enquêteur, puis le coupable, en alternance.
  const mType = p.characters.find(c => c.id === s.murderer).archetype;
  p.epilogue = fill(texts.epilogue || (texts.epilogues || {})[mType] || ARCHETYPES[mType].epilogue);
  // texte généré : le nom ouvre la première phrase de chaque personnage, le pronom les suivantes
  const seen = new Set();
  p.clues = s.clues.map(cl => {
    const ch = p.characters.find(c => c.id === cl.who);
    const text = clueText(p, ch, cl.logic, !seen.has(cl.who));
    seen.add(cl.who);
    return { who: cl.who, text, logic: cl.logic };
  });
  // ordre d'affichage = ordre des personnages (tri stable)
  p.clues.sort((a, b) => p.characters.findIndex(c => c.id === a.who) - p.characters.findIndex(c => c.id === b.who));
  p.solution = { positions: s.positions, murderer: s.murderer };
  // vérifications
  const sols = E.solve(p, p.clues, 3);
  if (sols.length !== 1) throw new Error(p.id + ' : ' + sols.length + ' solutions');
  // résoluble par déduction (toutes techniques), puis difficulté calculée d'après le déroulé (crânes)
  const human = E.humanSolve(p, p.clues, 2);
  if (!human.solved) throw new Error(p.id + ' non résoluble par déduction');
  p.rating = E.rateDifficulty(human.steps);
  p.difficulty = E.skullsOf(p, human.steps); // 4–5 avec des grands personnages ; rating reste la difficulté de base
  if (p.characters.some(c => String(sols[0].positions[c.id]) !== String(p.solution.positions[c.id]))) throw new Error('solution différente');
  checkConventions(p);
  fs.writeFileSync('puzzles/' + p.id + '.json', JSON.stringify(p, null, 2));
  BUILT.add(p.id + '.json');
  const r = p.rating;
  // pas de nom de coupable dans la sortie : François joue aussi aux énigmes (cf. CLAUDE.md §9)
  console.log(`${p.id} OK — ${'💀'.repeat(p.difficulty) || '0 crâne'} (score ${r.score} : la plus dure « ${r.hardest} », ${r.hardSteps} étape(s) difficile(s), ${r.directStart} placement(s) direct(s) au départ)`);
}
// puzzles/ ne garde que les énigmes de ce build : une énigme sans solution (en cours de régénération, affaire retirée)
// ne doit pas rester dans l'appli
const stale = fs.readdirSync('puzzles').filter(f => f.endsWith('.json') && !BUILT.has(f));
stale.forEach(f => fs.unlinkSync('puzzles/' + f));
if (stale.length) console.log(`🧹 ${stale.length} énigme(s) sans solution retirée(s) de puzzles/`);
