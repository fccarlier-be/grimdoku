// Grimdoku — générateur d'indices pour une scène donnée (prototype).
// Usage : node gen.js scenes/<décor>.json [seed] [--victim=<type>] [--level=1|2] [--portal-murder] [--murderer=<id>] [--skulls=0|1|2|3] [--tries=N]
// Conventions imposées : suspects dans des pièces différentes, aucun indice pour la victime (ni meuble sous elle),
// indice pour qui est sur un meuble, ordre de facilité = ordre alphabétique des suspects (A le plus facile).
'use strict';
const fs = require('fs');
const E = require('./engine');

const { resolve, loadScene, withVictim } = require('./cast');
const victimArg = (process.argv.find(a => a.startsWith('--victim=')) || '').split('=')[1];
// --victim=<type> : affaire automatique, ce type d'habitué est la victime
const scene = resolve(victimArg ? withVictim(loadScene(process.argv[2]), victimArg) : loadScene(process.argv[2]));
let seed = Number(process.argv[3] || 1);
const portalMurder = process.argv.includes('--portal-murder');
const arg = (name, def) => (process.argv.find(a => a.startsWith(`--${name}=`)) || `=${def}`).split('=')[1];
const wantMurderer = arg('murderer', '');
const tries = Number(arg('tries', 200));
const wantSkulls = arg('skulls', '') === '' ? null : Number(arg('skulls', '')); // null = n'importe quelle difficulté (0 est un niveau)
const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

const ctx = E.prepare(scene);
const n = scene.size;
const ids = scene.characters.map(c => c.id);
const victim = ids.find(id => scene.characters.find(c => c.id === id).role === 'victim');
const suspects = ids.filter(id => id !== victim);

// 1. tirer une solution valide au hasard
function randomSolution() {
  for (let t = 0; t < 20000; t++) {
    const rows = shuffle([...Array(n).keys()]), cols = shuffle([...Array(n).keys()]);
    const pos = {}; let ok = true;
    ids.forEach((id, i) => { pos[id] = [rows[i], cols[i]]; if (!E.canStand(ctx, id, rows[i], cols[i])) ok = false; });
    if (!ok) continue;
    if (E.sharedRooms(ctx, pos).length) continue;
    if (ctx.objAt[pos[victim].join(',')]) continue; // la victime n'a pas d'indice, donc pas de meuble
    const m = E.murdererOf(ctx, pos);
    if (!m) continue;
    if (wantMurderer && m !== wantMurderer) continue;
    if (portalMurder) {
      const v = ids.find(id => ctx.chars[id].role === 'victim');
      if (ctx.roomOf(...pos[v]) === ctx.roomOf(...pos[m])) continue;
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
    for (const o of suspects) if (o !== id) {
      out.push({ who: id, logic: { type: r < pos[o][0] ? 'northOf' : 'southOf', other: o } });
      out.push({ who: id, logic: { type: c < pos[o][1] ? 'westOf' : 'eastOf', other: o } });
    }
    // pas de « même pièce que » ni de « seul » : avec des suspects dans des pièces différentes,
    // ils ne parleraient que de la victime et livreraient le meurtrier
  }
  return out.filter(cl => E.evalClue(ctx, cl, pos));
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

for (let attempt = 0; attempt < tries; attempt++) {
  const { pos, m } = randomSolution();
  let pool = shuffle(candidates(pos));
  if (level === 1) pool = pool.filter(cl => cl.logic.type !== 'notAdjacentTo');
  const chosen = [];
  for (const id of suspects) {
    const mine = pool.filter(cl => cl.who === id && !cl.logic.type.startsWith('not'));
    chosen.push(mine[0] || pool.find(cl => cl.who === id));
  }
  let st = hs(chosen, level);
  while (!st.solved) {
    let best = null, bestR = Infinity;
    for (const cl of pool) {
      if (chosen.includes(cl)) continue;
      const r = hs([...chosen, cl], level).remaining;
      if (r < bestR) { bestR = r; best = cl; }
    }
    if (!best || bestR >= st.remaining) break;
    chosen.push(best); st = hs(chosen, level);
  }
  if (!st.solved) continue;
  for (const cl of shuffle([...chosen])) {
    const rest = chosen.filter(x => x !== cl);
    if (!rest.some(x => x.who === cl.who)) continue;
    if (hs(rest, level).solved) chosen.splice(chosen.indexOf(cl), 1);
  }
  // convention : qui se tient sur un meuble (chaise, tapis, lit…) a un indice qui le dit
  for (const id of suspects) {
    const o = ctx.objAt[pos[id].join(',')];
    if (o && !chosen.some(cl => cl.who === id && cl.logic.type === 'onObject'))
      chosen.push({ who: id, logic: { type: 'onObject', object: o.type } });
  }
  // « sur un coffre » implique « même ligne / colonne qu'un coffre » : on retire ces doublons
  for (const cl of [...chosen]) {
    const t = cl.logic.type;
    if ((t === 'sameRowAs' || t === 'sameColAs') && chosen.some(x => x.who === cl.who && x.logic.type === 'onObject' && x.logic.object === cl.logic.object))
      chosen.splice(chosen.indexOf(cl), 1);
  }
  const needsL2 = !hs(chosen, 1).solved;
  if (level === 2 && !needsL2) continue;
  if (!hs(chosen, level).solved) continue;
  // A le plus facile à placer, puis B… (ex æquo permis) : on réattribue les suspects aux positions
  // ordre de facilité vu par le solveur complet (comme le build), pas par le solveur limité du choix des indices
  const f = relabel(E.humanSolve(scene, chosen, 2).steps, m);
  if (!f) continue;
  const pos2 = { [victim]: pos[victim] };
  for (const id of suspects) pos2[f[id]] = pos[id];
  const clues2 = chosen.map(cl => ({ who: f[cl.who], logic: cl.logic.other ? { ...cl.logic, other: f[cl.logic.other] } : cl.logic }));
  const scene2 = { ...scene, characters: scene.characters.map(c => c.id === victim ? c : { ...ctx.chars[Object.keys(f).find(k => f[k] === c.id)], id: c.id }) };
  if (wantSkulls !== null && E.rateDifficulty(E.humanSolve(scene2, clues2, 2).steps).skulls !== wantSkulls) continue;
  const sol = E.solve(scene2, clues2, 2);
  if (sol.length !== 1) { console.error('BUG: non unique'); process.exit(2); }
  const cast = {}; for (const id of suspects) cast[f[id]] = id;
  console.log(JSON.stringify({ positions: pos2, murderer: f[m], cast, nSolutions: sol.length, needsL2, clues: clues2 }, null, 1));
  process.exit(0);
}
console.error('échec');
process.exit(1);
