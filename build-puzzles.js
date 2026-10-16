'use strict';
const fs = require('fs');
const E = require('./engine');
const { resolve } = require('./cast');
// Énigmes publiées : identifiant → scène (plan, personnages, intro, épilogue(s)) + solution (sortie de gen.js).
// Une même scène peut porter plusieurs énigmes ; « subtitle » les distingue dans le titre.
// Intro et épilogue : {victime} et {coupable} sont remplacés par les noms (qui dépendent des lettres) ;
// « epilogues » donne un texte par type de coupable possible, pour que personne n'ait besoin de connaître la solution.
const MANIFEST = [
  { id: 'grim-001', scene: 'taverne' },
  { id: 'grim-002', scene: 'tour' },
  { id: 'grim-003', scene: 'chateau' },
  { id: 'grim-004', scene: 'moulin' }
];

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
const initial = (name) => name.normalize('NFD')[0].toUpperCase();

// Conventions de présentation (cf. CLAUDE.md §6) : lève une erreur si une énigme ne les respecte pas.
function checkConventions(p) {
  const ctx = E.prepare(p);
  const chars = p.characters;
  // suspects A, B, C… puis la victime, dernière lettre
  chars.forEach((c, i) => {
    const want = String.fromCharCode(65 + i);
    if (initial(c.name) !== want) throw new Error(`${p.id} : ${c.name} devrait commencer par ${want}`);
  });
  if (chars[chars.length - 1].role !== 'victim' || chars.filter(c => c.role === 'victim').length !== 1)
    throw new Error(p.id + ' : la victime doit être le dernier personnage');
  // la victime n'a aucun indice
  const v = chars.find(c => c.role === 'victim');
  if (p.clues.some(cl => cl.who === v.id)) throw new Error(p.id + ' : la victime ne doit pas avoir d\'indice');
  // qui est sur un meuble a un indice qui le dit
  for (const [id, [r, c]] of Object.entries(p.solution.positions)) {
    const o = ctx.objAt[r + ',' + c];
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
for (const entry of MANIFEST) {
  const s = JSON.parse(fs.readFileSync(`solutions/${entry.id}.json`, 'utf8'));
  const scene = JSON.parse(fs.readFileSync(`scenes/${entry.scene}.json`, 'utf8'));
  // noms d'après la lettre (cast.json) ; s.cast : lettres réattribuées par gen.js
  const p = resolve(scene, s.cast);
  delete p.epilogues; delete p.scene; // textes sources : seuls intro et epilogue (remplis) vont dans l'énigme
  p.id = entry.id;
  if (entry.subtitle) p.title = `${scene.title} — ${entry.subtitle}`;
  const nameOf = (id) => p.characters.find(c => c.id === id).name;
  const fill = (t) => t.replace(/\{victime\}/g, nameOf(p.characters.find(c => c.role === 'victim').id)).replace(/\{coupable\}/g, nameOf(s.murderer));
  p.intro = fill(scene.intro);
  p.epilogue = fill(scene.epilogue || scene.epilogues[p.characters.find(c => c.id === s.murderer).archetype]);
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
  p.difficulty = p.rating.skulls;
  if (p.characters.some(c => String(sols[0].positions[c.id]) !== String(p.solution.positions[c.id]))) throw new Error('solution différente');
  checkConventions(p);
  fs.writeFileSync('puzzles/' + p.id + '.json', JSON.stringify(p, null, 2));
  const r = p.rating;
  // pas de nom de coupable dans la sortie : François joue aussi aux énigmes (cf. CLAUDE.md §9)
  console.log(`${p.id} OK — ${'💀'.repeat(r.skulls) || '0 crâne'} (score ${r.score} : la plus dure « ${r.hardest} », ${r.hardSteps} étape(s) difficile(s), ${r.directStart} placement(s) direct(s) au départ)`);
}
