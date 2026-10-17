// Grimdoku — générateur d'indices pour une scène donnée (prototype).
// Usage : node gen.js scenes/<décor>.json [seed] [--victim=<type>] [--big=<type>:<forme>[,<type>:<forme>]] [--hidden] [--level=1|2] [--portal-murder] [--murderer=<id>] [--skulls=0|1|2|3] [--tries=N]
// --big : grands personnages (4 crânes), chacun avec sa forme (engine.js, SHAPES ; ex. --big=dragon:T4) ; --hidden : leur forme est cachée (5 crânes). --skulls filtre alors la difficulté
// « de base » (déroulé du solveur), qui sert à ordonner les grilles à l'intérieur du niveau.
// Conventions imposées : suspects dans des pièces différentes, aucun indice pour la victime (ni meuble sous elle),
// indice pour qui est sur un meuble, ordre de facilité = ordre alphabétique des suspects (A le plus facile).
'use strict';
const fs = require('fs');
const E = require('./engine');

const { resolve, loadScene, withVictim, withBig } = require('./cast');
const victimArg = (process.argv.find(a => a.startsWith('--victim=')) || '').split('=')[1];
const bigArg = (process.argv.find(a => a.startsWith('--big=')) || '').split('=')[1];
// --victim=<type> : affaire automatique, ce type d'habitué est la victime ; --big : avec des grands personnages
const base = loadScene(process.argv[2]);
const bigs = bigArg ? bigArg.split(',').map(x => x.split(':')) : [];
const scene = resolve(bigArg ? withBig(base, victimArg, bigs.map(x => x[0]), bigs.map(x => x[1])) : victimArg ? withVictim(base, victimArg) : base);
if (process.argv.includes('--hidden')) scene.hiddenShapes = true;
const hiddenMax = (process.argv.find(a => a.startsWith('--hidden-max=')) || '').split('=')[1];
if (hiddenMax) scene.hiddenMax = Number(hiddenMax); // forme cachée parmi celles d'au plus N cases
let seed = Number(process.argv[3] || 1);
const portalMurder = process.argv.includes('--portal-murder');
const arg = (name, def) => (process.argv.find(a => a.startsWith(`--${name}=`)) || `=${def}`).split('=')[1];
const wantMurderer = arg('murderer', '');
const tries = Number(arg('tries', 200));
// --avoid=<fichier.json> : grilles déjà publiées du même décor ([{ cells: [posKey…], victim: posKey }]) ; on refuse une
// solution trop proche (E.tooClose : même case pour la victime, ou plus de la moitié des cases occupées en commun)
const avoid = arg('avoid', '') ? JSON.parse(fs.readFileSync(arg('avoid', ''), 'utf8')) : [];
const wantSkulls = arg('skulls', '') === '' ? null : Number(arg('skulls', '')); // null = n'importe quelle difficulté (0 est un niveau)
// GEN_DEBUG=1 : en cas d'échec, compte des raisons de rejet des essais (diagnostic)
const WHY = {};
const why = (r) => { WHY[r] = (WHY[r] || 0) + 1; };
process.on('exit', (code) => { if (code && process.env.GEN_DEBUG) console.error('rejets :', JSON.stringify(WHY)); });
const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

const ctx = E.prepare(scene);
const n = scene.size;
const ids = scene.characters.map(c => c.id);
const victim = ids.find(id => scene.characters.find(c => c.id === id).role === 'victim');
const suspects = ids.filter(id => id !== victim);

// 1. tirer une solution valide au hasard
const hasBig = scene.characters.some(c => c.shape);
// la vraie forme de chaque grand (même si le joueur ne la connaît pas : --hidden)
const truth = E.prepare({ ...scene, hiddenShapes: false, hiddenMax: undefined });
const PL = Object.fromEntries(ids.map(id => [id, E.placementsOf(truth, id)]));
// Construction pas à pas (retour en arrière) : grands d'abord, la victime en dernier ; chaque personnage sur une case tirée
// au hasard qui respecte déjà les règles (lignes et colonnes libres, un suspect par pièce, victime hors meuble, et avec
// --no-direct personne sur un meuble unique). Le tirage d'une permutation au hasard ne suffisait plus sur 12×12.
function randomPositions() {
  const order = [...ids].sort((a, b) => !!ctx.chars[b].shape - !!ctx.chars[a].shape || (a === victim) - (b === victim));
  const pos = {}, used = [new Set(), new Set()], zones = new Set();
  let budget = 5000;
  const unique = (o) => o && scene.objects.filter(x => x.type === o.type).length === 1;
  const ok = (id, v) => {
    const [rs, cs] = E.linesOf(v);
    if (rs.some(r => used[0].has(r)) || cs.some(c => used[1].has(c))) return false;
    const cells = E.cellsOf(v);
    if (id === victim) return !cells.some(rc => ctx.objAt[rc.join(',')]);
    if (zones.has(ctx.zoneOf(...cells[0]))) return false;
    return !(noDirect && !ctx.chars[id].shape && unique(ctx.objAt[cells[0].join(',')]));
  };
  function rec(i) {
    if (i === order.length) return true;
    if (--budget < 0) return false;
    const id = order[i];
    for (const v of shuffle([...PL[id]])) {
      if (!ok(id, v)) continue;
      const [rs, cs] = E.linesOf(v);
      const z = id === victim ? null : ctx.zoneOf(...E.cellsOf(v)[0]);
      pos[id] = v; rs.forEach(r => used[0].add(r)); cs.forEach(c => used[1].add(c)); if (z !== null) zones.add(z);
      if (rec(i + 1)) return true;
      rs.forEach(r => used[0].delete(r)); cs.forEach(c => used[1].delete(c)); if (z !== null) zones.delete(z); delete pos[id];
    }
    return false;
  }
  return rec(0) ? pos : null;
}
function randomSolution() {
  for (let t = 0; t < 500000; t++) { // beaucoup de tirages : sur 12×12, peu respectent toutes les règles
    const pos = randomPositions();
    if (!pos) continue;
    if (E.sharedRooms(ctx, pos).length) continue;
    if (E.emptyZones(ctx, pos).length) continue; // chaque pièce est occupée
    if (E.cellsOf(pos[victim]).some(rc => ctx.objAt[rc.join(',')])) continue; // la victime n'a pas d'indice, donc pas de meuble
    // sans placement direct : personne sur un meuble unique (l'indice « sur le hamac » le placerait d'emblée)
    if (noDirect && suspects.some(id => { const o = !ctx.chars[id].shape && ctx.objAt[pos[id].join(',')]; return o && scene.objects.filter(x => x.type === o.type).length === 1; })) { why('meuble unique'); continue; }
    const me = E.layoutSig(pos, victim);
    if (avoid.some(o => E.tooClose(me, o))) continue; // déjà une grille presque identique dans ce décor
    const m = E.murdererOf(ctx, pos);
    if (!m) continue;
    if (wantMurderer && m !== wantMurderer) continue;
    if (portalMurder) {
      const v = ids.find(id => ctx.chars[id].role === 'victim');
      if (ctx.roomOf(...E.cellsOf(pos[v])[0]) === ctx.roomOf(...E.cellsOf(pos[m])[0])) continue;
      // le spectre doit être sur un objet bloquant pour que sa règle compte
      const sp = ids.find(id => (ctx.chars[id].traits || []).includes('spectre'));
      const o = sp && ctx.objAt[pos[sp].join(',')];
      if (sp && !(o && E.OBJECTS[o.type].blocking)) continue;
    }
    return { pos, m };
  }
  throw new Error('pas de solution trouvée');
}

// 2. pool d'indices vrais
function candidates(pos) {
  const out = [];
  const types = [...new Set(scene.objects.map(o => o.type))];
  for (const id of suspects) {
    if (ctx.chars[id].shape) { out.push(...bigCandidates(pos, id, types)); continue; }
    const [r, c] = pos[id];
    const room = ctx.roomOf(r, c);
    out.push({ who: id, logic: { type: 'inRoom', room } });
    for (const k of Object.keys(scene.rooms)) if (k !== room) out.push({ who: id, logic: { type: 'notInRoom', room: k } });
    const o = ctx.objAt[r + ',' + c];
    if (o) out.push({ who: id, logic: { type: 'onObject', object: o.type } });
    for (const t of types) {
      const adj = E.neighbors(ctx, r, c).some(([a, b]) => (ctx.objAt[a + ',' + b] || {}).type === t);
      out.push({ who: id, logic: { type: adj ? 'adjacentTo' : 'notAdjacentTo', object: t } });
      if (scene.objects.some(x => x.type === t && x.at[0] === r)) out.push({ who: id, logic: { type: 'sameRowAs', object: t } });
      if (scene.objects.some(x => x.type === t && x.at[1] === c)) out.push({ who: id, logic: { type: 'sameColAs', object: t } });
    }
    // positions relatives entre suspects (jamais par rapport à la victime, qui n'a pas d'indice)
    for (const o of suspects) if (o !== id && !ctx.chars[o].shape) {
      out.push({ who: id, logic: { type: r < pos[o][0] ? 'northOf' : 'southOf', other: o } });
      out.push({ who: id, logic: { type: c < pos[o][1] ? 'westOf' : 'eastOf', other: o } });
    }
    for (const o of suspects) if (o !== id && ctx.chars[o].shape) for (const type of E.RELATIVE) out.push({ who: id, logic: { type, other: o } });
    // pas de « même pièce que » ni de « seul » : avec des suspects dans des pièces différentes,
    // ils ne parleraient que de la victime et livreraient le meurtrier
  }
  return out.filter(cl => E.evalClue(ctx, cl, pos));
}

// Indices d'un grand personnage : mêmes types, évalués sur toutes ses cases (gardés seulement s'ils sont vrais)
function bigCandidates(pos, id, types) {
  const out = [];
  const room = ctx.roomOf(...E.cellsOf(pos[id])[0]);
  out.push({ who: id, logic: { type: 'inRoom', room } });
  for (const k of Object.keys(scene.rooms)) if (k !== room) out.push({ who: id, logic: { type: 'notInRoom', room: k } });
  for (const object of types) for (const type of ['adjacentTo', 'notAdjacentTo', 'sameRowAs', 'sameColAs']) out.push({ who: id, logic: { type, object } });
  for (const o of suspects) if (o !== id) for (const type of E.RELATIVE) out.push({ who: id, logic: { type, other: o } });
  return out;
}

// Associe chaque suspect (identifiant d'origine) à une lettre pour que l'ordre de facilité suive l'alphabet.
// Reste sur place : le coupable s'il est imposé (--murderer). Les autres fiches de personnage (pouvoirs compris) suivent
// leur position : la sortie « cast » dit quelle fiche d'origine prend chaque lettre (il faudra la renommer).
// steps : sortie de humanSolve ; renvoie { idOrigine: nouvelId } ou null si impossible.
function relabel(steps, murderer) {
  const stay = new Set(wantMurderer ? [murderer] : []);
  const f = {};
  let cursor = 0;
  for (const st of steps) {
    const group = st.ids.filter(id => id !== victim);
    const slots = suspects.slice(cursor, cursor + group.length);
    for (const id of group) if (stay.has(id)) { if (!slots.includes(id)) return null; f[id] = id; }
    const free = slots.filter(x => !Object.values(f).includes(x));
    for (const id of group) if (!stay.has(id)) f[id] = free.shift();
    cursor += group.length;
  }
  return Object.keys(f).length === suspects.length ? f : null;
}

const count = (clues) => E.solve(scene, clues, 400).length;
const level = Number((process.argv.find(a => a.startsWith('--level=')) || '--level=1').split('=')[1]);
// technique la plus dure autorisée pendant le choix des indices, selon la difficulté visée
// (0 crâne : indices + cases uniques ; 1 : + ligne réservée, positions relatives ; 2 : + seul candidat, pièces)
const MAX_TECH = { 0: 1, 1: 3, 2: 5, 3: 6 };
const maxTech = wantSkulls === null ? Infinity : MAX_TECH[wantSkulls];
const hs = (clues, lv) => E.humanSolve(scene, clues, lv, maxTech);
// --no-direct : aucun personnage placé par ses seuls indices (le jeu était trop simple, retour de François) ;
// --big-late : un grand personnage n'est jamais placé avant qu'au moins un autre personnage l'ait été
const noDirect = process.argv.includes('--no-direct');
const bigLate = process.argv.includes('--big-late');
const OWN = Object.fromEntries(ids.map(id => [id, E.placementsOf(ctx, id)]));
const ownCount = (id, clues) => {
  const mine = clues.filter(cl => cl.who === id && !E.isPair(cl.logic.type));
  return OWN[id].filter(v => mine.every(cl => E.evalClue(ctx, cl, { [id]: v }))).length;
};
const direct = (clues, id) => noDirect && ownCount(id, clues) <= 1;

for (let attempt = 0; attempt < tries; attempt++) {
  const { pos, m } = randomSolution();
  let pool = shuffle(candidates(pos));
  // « pas à côté de » : écarté au niveau 1, sauf sans placement direct (il réduit les cases sans en donner aucune)
  if (level === 1 && !noDirect) pool = pool.filter(cl => cl.logic.type !== 'notAdjacentTo');
  const chosen = [];
  for (const id of suspects) {
    const ok = (cl) => cl.who === id && !direct([cl], id);
    const mine = pool.filter(cl => ok(cl) && !cl.logic.type.startsWith('not'));
    const first = mine[0] || pool.find(ok);
    if (first) chosen.push(first);
  }
  let st = hs(chosen, level);
  while (!st.solved) {
    let best = null, bestR = Infinity;
    for (const cl of pool) {
      if (chosen.includes(cl)) continue;
      if (direct([...chosen, cl], cl.who)) continue;
      const r = hs([...chosen, cl], level).remaining;
      if (r < bestR) { bestR = r; best = cl; }
    }
    if (!best || bestR >= st.remaining) break;
    chosen.push(best); st = hs(chosen, level);
  }
  if (!st.solved) { why('indices insuffisants'); continue; }
  for (const cl of shuffle([...chosen])) {
    const rest = chosen.filter(x => x !== cl);
    if (!rest.some(x => x.who === cl.who)) continue;
    if (hs(rest, level).solved) chosen.splice(chosen.indexOf(cl), 1);
  }
  // convention : qui se tient sur un meuble (chaise, tapis, lit…) a un indice qui le dit
  for (const id of suspects) {
    const o = !ctx.chars[id].shape && ctx.objAt[pos[id].join(',')];
    if (o && !chosen.some(cl => cl.who === id && cl.logic.type === 'onObject'))
      chosen.push({ who: id, logic: { type: 'onObject', object: o.type } });
  }
  // « sur un coffre » implique « même ligne / colonne qu'un coffre » : on retire ces doublons
  for (const cl of [...chosen]) {
    const t = cl.logic.type;
    if ((t === 'sameRowAs' || t === 'sameColAs') && chosen.some(x => x.who === cl.who && x.logic.type === 'onObject' && x.logic.object === cl.logic.object))
      chosen.splice(chosen.indexOf(cl), 1);
  }
  // contraintes de difficulté, vérifiées sur le déroulé complet (indices de meubles compris)
  {
    const steps = E.humanSolve(scene, chosen, 2).steps;
    if (noDirect && (steps.some(s => s.tech === 0) || suspects.some(id => direct(chosen, id)))) { why('placement direct'); continue; }
    if (bigLate && steps.length && steps[0].ids.some(id => ctx.chars[id].shape)) { why('grand placé en premier'); continue; }
  }
  const needsL2 = !hs(chosen, 1).solved;
  if (level === 2 && !needsL2) continue;
  if (!hs(chosen, level).solved) { why('plus résoluble après ajouts'); continue; }
  // A le plus facile à placer, puis B… (ex æquo permis) : on réattribue les suspects aux positions
  // ordre de facilité vu par le solveur complet (comme le build), pas par le solveur limité du choix des indices
  const f = relabel(E.humanSolve(scene, chosen, 2).steps, m);
  if (!f) { why('lettres'); continue; }
  const pos2 = { [victim]: pos[victim] };
  for (const id of suspects) pos2[f[id]] = pos[id];
  const clues2 = chosen.map(cl => ({ who: f[cl.who], logic: cl.logic.other ? { ...cl.logic, other: f[cl.logic.other] } : cl.logic }));
  const scene2 = { ...scene, characters: scene.characters.map(c => c.id === victim ? c : { ...ctx.chars[Object.keys(f).find(k => f[k] === c.id)], id: c.id }) };
  if (wantSkulls !== null && E.rateDifficulty(E.humanSolve(scene2, clues2, 2).steps).skulls !== wantSkulls) { why('difficulté'); continue; }
  const sol = E.solve(scene2, clues2, 2);
  if (sol.length !== 1) { console.error('BUG: non unique'); process.exit(2); }
  const cast = {}; for (const id of suspects) cast[f[id]] = id;
  console.log(JSON.stringify({ positions: pos2, murderer: f[m], cast, nSolutions: sol.length, needsL2, clues: clues2 }, null, 1));
  process.exit(0);
}
console.error('échec');
process.exit(1);
