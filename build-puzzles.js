'use strict';
const fs = require('fs');
const E = require('./engine');
const { resolve } = require('./cast');
// Textes : seuls l'intro et l'épilogue sont écrits à la main ({victime} et {coupable} sont remplacés par les noms,
// qui dépendent des lettres attribuées par le générateur). Les indices sont générés depuis leur logique
// (clueText) : sobres, ils ne peuvent pas contredire le lieu où se trouve le personnage.
const texts = {
  'grim-001': {
    intro: "{victime}, tavernier nain et radin de compétition, a été retrouvé raide à l'aube. Personne ne le regrette, mais quelqu'un l'a aidé à partir. Place chaque client, trouve qui était seul avec lui.",
    epilogue: "{coupable} craque : {victime} voulait lui retenir trois mois de salaire pour UNE assiette mangée. « Elle était en terre cuite, elle avait l'air bonne ! »"
  },
  'grim-003': {
    intro: "Le roi {victime} a été retrouvé sans vie au petit matin, dans son propre château. Ses invités jurent tous qu'ils dormaient. L'un d'eux ment : il était seul avec lui.",
    epilogue: "{coupable} hantait ces murs quatre siècles avant que {victime} ne s'y installe sans demander. Il n'a jamais digéré l'expropriation. Le fantôme avoue tout, puis traverse le mur pour éviter le procès."
  },
  'grim-004': {
    intro: "Le meunier {victime} a été retrouvé ce matin, aussi raide qu'une meule. Cinq villageois rôdaient autour du moulin cette nuit. Un seul était avec lui.",
    // un épilogue par coupable possible (type de personnage) : le build choisit, personne n'a besoin de connaître la solution
    epilogues: {
      fee: "{coupable} avoue en battant des ailes : {victime} lui vendait sa farine au prix de la poudre de fée. Elle a juste voulu lui rendre la monnaie de sa pièce.",
      troll: "{coupable} avoue la bouche pleine : {victime} lui facturait chaque miette tombée du moulin. Les miettes, c'était tout ce qu'il mangeait.",
      sirene: "{coupable} avoue en larmes : {victime} voulait assécher la mare pour agrandir son moulin. On ne touche pas à la maison d'une sirène.",
      zombie: "{coupable} avoue, ce qui lui prend un moment : {victime} l'avait embauché pour tourner la meule sans le payer. « Je suis mort, pas bénévole. »",
      dragonnet: "{coupable} avoue en fumant des naseaux : {victime} lui avait demandé de chauffer le four à pain. Gratuitement. Pour la quatorzième fois."
    }
  },
  'grim-002': {
    intro: "L'archimage {victime}, 412 ans, a enfin rendu son dernier sortilège. Sa tour grouille d'invités douteux, et un portail runique relie le laboratoire à la crypte… Qui l'a envoyé ad patres ?",
    epilogue: "{coupable} a traversé le portail runique de la crypte pour surgir dans le laboratoire, juste derrière {victime}. Mobile : il lui avait vendu un élixir de bronzage. Garanti sans effet secondaire."
  }
};

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
for (const [scene, sol] of [['scene1.json', 'sol1.json'], ['scene2.json', 'sol2.json'], ['scene3.json', 'sol3.json'], ['scene4.json', 'sol4.json']]) {
  const s = JSON.parse(fs.readFileSync(sol, 'utf8'));
  // noms d'après la lettre (cast.json) ; s.cast : lettres réattribuées par gen.js
  const p = resolve(JSON.parse(fs.readFileSync(scene, 'utf8')), s.cast);
  const nameOf = (id) => p.characters.find(c => c.id === id).name;
  const fill = (t) => t.replace(/\{victime\}/g, nameOf(p.characters.find(c => c.role === 'victim').id)).replace(/\{coupable\}/g, nameOf(s.murderer));
  p.intro = fill(texts[p.id].intro);
  const t = texts[p.id];
  p.epilogue = fill(t.epilogue || t.epilogues[p.characters.find(c => c.id === s.murderer).archetype]);
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
  console.log(`${p.id} OK — ${'💀'.repeat(r.skulls)} (score ${r.score} : la plus dure « ${r.hardest} », ${r.hardSteps} étape(s) difficile(s), ${r.directStart} placement(s) direct(s) au départ)`);
}
