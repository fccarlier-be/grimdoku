// Grimdoku — moteur de règles partagé (app + générateur)
// Coordonnées [ligne, colonne], indexées à 0.
(function (root) {
  'use strict';

  const OBJECTS = {
    table:    { name: 'table', a: "une table", the: "la table",          blocking: true,  icon: '🍽️' },
    etagere:  { name: 'étagère', a: "une étagère", the: "l'étagère",        blocking: true,  icon: '📚' },
    chaudron: { name: 'chaudron', a: "un chaudron", the: "le chaudron",       blocking: true,  icon: '🫕' },
    statue:   { name: 'statue', a: "une statue", the: "la statue",         blocking: true,  icon: '🗿' },
    tonneau:  { name: 'tonneau', a: "un tonneau", the: "le tonneau",        blocking: true,  icon: '🛢️' },
    arbre:    { name: 'arbre', a: "un arbre", the: "l'arbre",          blocking: true,  icon: '🌳' },
    coffre:   { name: 'coffre', a: "un coffre", the: "le coffre",         blocking: true,  icon: '🧰' },
    foin:     { name: 'botte de foin', a: "une botte de foin", the: "la botte de foin",  blocking: true,  icon: '🌾' },
    cristal:  { name: 'boule de cristal', a: "une boule de cristal", the: "la boule de cristal", blocking: true, icon: '🔮' },
    sarcophage: { name: 'sarcophage', a: "un sarcophage", the: "le sarcophage",   blocking: true,  icon: '⚰️' },
    chaise:   { name: 'chaise', a: "une chaise", the: "la chaise",         blocking: false, icon: '🪑' },
    lit:      { name: 'lit', a: "un lit", the: "le lit",            blocking: false, icon: '🛏️' },
    tapis:    { name: 'tapis', a: "un tapis", the: "le tapis",          blocking: false, icon: '' },
    champi:   { name: 'champignon géant', a: "un champignon géant", the: "le champignon géant", blocking: false, icon: '🍄' },
    portail:  { name: 'portail runique', a: "un portail runique", the: "le portail runique", blocking: false, icon: '🌀' },
    // ajouts du pack de 20 énigmes
    canon:    { name: 'canon', a: "un canon", the: "le canon", blocking: true, icon: '💣' },
    tombe:    { name: 'tombe', a: "une tombe", the: "la tombe", blocking: true, icon: '🪦' },
    enclume:  { name: 'enclume', a: "une enclume", the: "l'enclume", blocking: true, icon: '⚒️' },
    pupitre:  { name: 'pupitre', a: "un pupitre", the: "le pupitre", blocking: true, icon: '📖' },
    roseaux:  { name: 'massif de roseaux', a: "un massif de roseaux", the: "le massif de roseaux", blocking: true, icon: '🌾' },
    chariot:  { name: 'chariot de mine', a: "un chariot de mine", the: "le chariot de mine", blocking: true, icon: '🛒' },
    hamac:    { name: 'hamac', a: "un hamac", the: "le hamac", blocking: false, icon: '🪢' },
    fauteuil: { name: 'fauteuil', a: "un fauteuil", the: "le fauteuil", blocking: false, icon: '🛋️' },
    barque:   { name: 'barque', a: "une barque", the: "la barque", blocking: false, icon: '🛶' }
  };

  function key(r, c) { return r + ',' + c; }
  // indices qui dépendent d'un autre personnage (ou de tous) : évalués une fois tout le monde placé
  const RELATIVE = ['northOf', 'southOf', 'eastOf', 'westOf'];
  const isPair = (t) => t === 'sameRoomAs' || t === 'alone' || RELATIVE.includes(t);

  // Prépare une énigme : index des objets, pièces fusionnées par portails.
  function prepare(p) {
    const n = p.size;
    const objAt = {};
    for (const o of p.objects) objAt[key(o.at[0], o.at[1])] = o;
    const roomOf = (r, c) => p.layout[r][c];
    // union-find des pièces via portails
    const parent = {};
    for (const k of Object.keys(p.rooms)) parent[k] = k;
    const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
    const links = {};
    for (const o of p.objects) if (o.type === 'portail') (links[o.link] = links[o.link] || []).push(roomOf(o.at[0], o.at[1]));
    for (const l of Object.values(links)) if (l.length === 2) parent[find(l[0])] = find(l[1]);
    const zoneOf = (r, c) => find(roomOf(r, c));
    const chars = {};
    for (const ch of p.characters) chars[ch.id] = ch;
    return { p, n, objAt, roomOf, zoneOf, chars };
  }

  function canStand(ctx, charId, r, c) {
    const o = ctx.objAt[key(r, c)];
    if (!o) return true;
    if (!OBJECTS[o.type].blocking) return true;
    const ch = ctx.chars[charId];
    return !!(ch.traits && ch.traits.includes('spectre'));
  }

  // Cases « à côté » : les 4 voisines orthogonales de la même pièce (on ne compte pas à travers un mur).
  function neighbors(ctx, r, c) {
    const out = [];
    for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const rr = r + dr, cc = c + dc;
      if (rr >= 0 && cc >= 0 && rr < ctx.n && cc < ctx.n && ctx.roomOf(rr, cc) === ctx.roomOf(r, c)) out.push([rr, cc]);
    }
    return out;
  }

  // Évalue un indice sur un placement complet. pos: {id:[r,c]}
  function evalClue(ctx, clue, pos) {
    const [r, c] = pos[clue.who];
    const L = clue.logic;
    const typeAt = (rr, cc) => { const o = ctx.objAt[key(rr, cc)]; return o ? o.type : null; };
    switch (L.type) {
      case 'inRoom': return ctx.roomOf(r, c) === L.room;
      case 'notInRoom': return ctx.roomOf(r, c) !== L.room;
      case 'onObject': return typeAt(r, c) === L.object;
      case 'adjacentTo': return neighbors(ctx, r, c).some(([a, b]) => typeAt(a, b) === L.object);
      case 'notAdjacentTo': return !neighbors(ctx, r, c).some(([a, b]) => typeAt(a, b) === L.object);
      case 'sameRowAs': return ctx.p.objects.some(o => o.type === L.object && o.at[0] === r);
      case 'sameColAs': return ctx.p.objects.some(o => o.type === L.object && o.at[1] === c);
      case 'sameRoomAs': { const [a, b] = pos[L.other]; return ctx.zoneOf(r, c) === ctx.zoneOf(a, b); }
      // nord = haut de la carte ; « au sud de X » = sur une ligne plus basse, n'importe quelle colonne
      case 'northOf': return r < pos[L.other][0];
      case 'southOf': return r > pos[L.other][0];
      case 'eastOf': return c > pos[L.other][1];
      case 'westOf': return c < pos[L.other][1];
      case 'alone': {
        const z = ctx.zoneOf(r, c);
        return Object.keys(pos).every(id => id === clue.who || ctx.zoneOf(pos[id][0], pos[id][1]) !== z);
      }
      default: throw new Error('indice inconnu ' + L.type);
    }
  }

  // Règle des pièces : seule la pièce du crime contient deux personnes, donc les suspects sont tous
  // dans des pièces (zones) différentes. Renvoie la liste des paires de suspects qui partagent une pièce.
  function sharedRooms(ctx, pos) {
    const out = [];
    const sus = ctx.p.characters.filter(c => c.role !== 'victim' && pos[c.id]);
    for (let i = 0; i < sus.length; i++) for (let j = i + 1; j < sus.length; j++)
      if (ctx.zoneOf(...pos[sus[i].id]) === ctx.zoneOf(...pos[sus[j].id])) out.push([sus[i].id, sus[j].id]);
    return out;
  }

  // Coupable : seul suspect dans la zone de la victime (null si 0 ou >1).
  function murdererOf(ctx, pos) {
    const v = ctx.p.characters.find(c => c.role === 'victim');
    const z = ctx.zoneOf(pos[v.id][0], pos[v.id][1]);
    const s = ctx.p.characters.filter(c => c.role !== 'victim' && ctx.zoneOf(pos[c.id][0], pos[c.id][1]) === z);
    return s.length === 1 ? s[0].id : null;
  }

  // Énumère les solutions (s'arrête à `limit`).
  function solve(p, clues, limit) {
    const ctx = prepare(p);
    const ids = p.characters.map(c => c.id);
    const n = ctx.n;
    const usedR = new Array(n).fill(false), usedC = new Array(n).fill(false);
    const pos = {};
    const sols = [];
    // indices unaires évalués tôt
    const unary = {};
    for (const cl of clues) {
      const t = cl.logic.type;
      if (!isPair(t)) (unary[cl.who] = unary[cl.who] || []).push(cl);
    }
    const binary = clues.filter(cl => isPair(cl.logic.type));
    function rec(i) {
      if (sols.length >= limit) return;
      if (i === ids.length) {
        if (!binary.every(cl => evalClue(ctx, cl, pos))) return;
        if (sharedRooms(ctx, pos).length) return;
        const m = murdererOf(ctx, pos);
        if (!m) return;
        sols.push({ positions: JSON.parse(JSON.stringify(pos)), murderer: m });
        return;
      }
      const id = ids[i];
      for (let r = 0; r < n; r++) {
        if (usedR[r]) continue;
        for (let c = 0; c < n; c++) {
          if (usedC[c] || !canStand(ctx, id, r, c)) continue;
          pos[id] = [r, c];
          if ((unary[id] || []).every(cl => evalClue(ctx, cl, pos))) {
            usedR[r] = usedC[c] = true;
            rec(i + 1);
            usedR[r] = usedC[c] = false;
          }
          delete pos[id];
        }
      }
    }
    rec(0);
    return sols;
  }

  // Vérifie un placement du joueur : renvoie la liste des problèmes.
  function checkPlacement(p, pos) {
    const ctx = prepare(p);
    const errs = [];
    const ids = Object.keys(pos);
    const rows = {}, cols = {};
    for (const id of ids) {
      const [r, c] = pos[id];
      if (rows[r]) errs.push({ kind: 'row', ids: [rows[r], id] }); else rows[r] = id;
      if (cols[c]) errs.push({ kind: 'col', ids: [cols[c], id] }); else cols[c] = id;
      if (!canStand(ctx, id, r, c)) errs.push({ kind: 'blocked', ids: [id] });
    }
    for (const pair of sharedRooms(ctx, pos)) errs.push({ kind: 'room', ids: pair });
    return errs;
  }

  // Solveur « humain » : propagation sans essai-erreur, technique la plus simple d'abord.
  // Techniques (TECH), de la plus facile à la plus dure :
  //   0 indice : le personnage n'a qu'une case possible d'après ses propres indices
  //   1 case unique : une seule case reste une fois les lignes/colonnes des placés retirées
  //   2 ligne réservée : toutes les cases d'un personnage sont sur une même ligne (colonne) → interdite aux autres
  //   3 position relative : « au nord de X » → au-dessus de la ligne la plus basse possible de X (et inversement)
  //   4 seul candidat : une ligne (colonne) ne peut accueillir qu'un seul personnage
  //   5 pièces : « même pièce », « seul », suspects dans des pièces différentes, règle du meurtre
  //   6 groupes (niveau 2) : k personnages confinés dans k lignes (colonnes)
  // level 1 = techniques 0 à 5 ; level 2 = + 6.
  // Renvoie { solved, remaining, cand, order, steps } ; cand: {id: Set('r,c')} ;
  // steps : [{ ids, tech }] dans l'ordre où un humain place les personnages ; order : steps[].ids.
  const TECH = ['indice', 'case unique', 'ligne réservée', 'position relative', 'seul candidat', 'pièces', 'groupes'];
  // maxTech (optionnel) : n'utiliser que les techniques jusqu'à cet indice de TECH (générateur, grilles faciles)
  function humanSolve(p, clues, level, maxTech = Infinity) {
    const ctx = prepare(p);
    const n = ctx.n;
    const ids = p.characters.map(c => c.id);
    const victim = p.characters.find(c => c.role === 'victim').id;
    const cand = {};
    for (const id of ids) {
      cand[id] = new Set();
      for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
        if (!canStand(ctx, id, r, c)) continue;
        const pos = { [id]: [r, c] };
        const ok = clues.every(cl => cl.who !== id || isPair(cl.logic.type) || evalClue(ctx, cl, pos));
        if (ok) cand[id].add(key(r, c));
      }
    }
    const steps = [];
    const placed = new Set();
    let fresh = [];
    // Chaque technique raisonne sur un instantané pris au début de son passage (snap) et n'applique ses éliminations
    // qu'à l'état réel : le résultat d'un passage ne dépend pas de l'ordre des personnages (donc pas des lettres).
    const liveCells = (id) => [...cand[id]].map(k => k.split(',').map(Number));
    let snap = null;
    const cells = (id) => (snap ? snap[id] : liveCells(id));
    const zones = (id) => new Set(cells(id).map(([r, c]) => ctx.zoneOf(r, c)));
    const fixed = (id) => { const cs = cells(id); return cs.length === 1 ? cs[0] : null; };
    const restrict = (id, pred) => {
      let ch = false;
      for (const k of [...cand[id]]) { const [r, c] = k.split(',').map(Number); if (!pred(r, c)) { cand[id].delete(k); ch = true; } }
      if (ch && cand[id].size === 1 && !placed.has(id)) { placed.add(id); fresh.push(id); }
      return ch;
    };
    ids.filter(id => cand[id].size === 1).forEach(id => placed.add(id));
    if (placed.size) steps.push({ ids: [...placed], tech: 0 });

    const rules = [
      null,
      // 1 case unique : un placé libère sa ligne et sa colonne
      () => {
        let ch = false;
        for (const id of ids) {
          const f = fixed(id); if (!f) continue;
          for (const o of ids) if (o !== id) ch = restrict(o, (r, c) => r !== f[0] && c !== f[1]) || ch;
        }
        return ch;
      },
      // 2 ligne réservée : un personnage confiné à une ligne (colonne) la prend aux autres
      () => {
        let ch = false;
        for (const id of ids) {
          if (cells(id).length < 2) continue;
          for (const axis of [0, 1]) {
            const L = new Set(cells(id).map(rc => rc[axis]));
            if (L.size !== 1) continue;
            const x = [...L][0];
            for (const o of ids) if (o !== id) ch = restrict(o, (r, c) => (axis ? c : r) !== x) || ch;
          }
        }
        return ch;
      },
      // 3 position relative
      () => {
        let ch = false;
        for (const cl of clues) {
          const t = cl.logic.type;
          if (!RELATIVE.includes(t)) continue;
          const a = cl.who, b = cl.logic.other;
          const axis = t === 'northOf' || t === 'southOf' ? 0 : 1;
          const less = t === 'northOf' || t === 'westOf'; // a avant b sur l'axe
          const va = cells(a).map(rc => rc[axis]), vb = cells(b).map(rc => rc[axis]);
          if (less) {
            const maxB = Math.max(...vb), minA = Math.min(...va);
            ch = restrict(a, (r, c) => (axis ? c : r) < maxB) || ch;
            ch = restrict(b, (r, c) => (axis ? c : r) > minA) || ch;
          } else {
            const minB = Math.min(...vb), maxA = Math.max(...va);
            ch = restrict(a, (r, c) => (axis ? c : r) > minB) || ch;
            ch = restrict(b, (r, c) => (axis ? c : r) < maxA) || ch;
          }
        }
        return ch;
      },
      // 4 seul candidat : une ligne (colonne) qu'un seul personnage peut occuper
      () => {
        let ch = false;
        for (let x = 0; x < n; x++) for (const axis of [0, 1]) {
          const who = ids.filter(id => cells(id).some(rc => rc[axis] === x));
          if (who.length === 1) ch = restrict(who[0], (r, c) => (axis ? c : r) === x) || ch;
        }
        return ch;
      },
      // 5 pièces : même pièce que, seul dans sa pièce, règle du meurtre
      () => {
        let ch = false;
        for (const cl of clues) if (cl.logic.type === 'sameRoomAs') {
          const a = cl.who, b = cl.logic.other;
          const za = zones(a), zb = zones(b);
          ch = restrict(a, (r, c) => zb.has(ctx.zoneOf(r, c))) || ch;
          ch = restrict(b, (r, c) => za.has(ctx.zoneOf(r, c))) || ch;
        }
        for (const cl of clues) if (cl.logic.type === 'alone') {
          const a = cl.who, za = zones(a);
          if (za.size === 1) { const z = [...za][0]; for (const o of ids) if (o !== a) ch = restrict(o, (r, c) => ctx.zoneOf(r, c) !== z) || ch; }
          for (const o of ids) if (o !== a) { const zo = zones(o); if (zo.size === 1) { const z = [...zo][0]; ch = restrict(a, (r, c) => ctx.zoneOf(r, c) !== z) || ch; } }
        }
        // règle du meurtre : exactement un suspect dans la zone de la victime
        const suspects = ids.filter(i => i !== victim);
        // suspects dans des pièces différentes : une pièce certaine pour l'un est interdite aux autres
        for (const s of suspects) { const zs = zones(s); if (zs.size === 1) { const z = [...zs][0]; for (const o of suspects) if (o !== s) ch = restrict(o, (r, c) => ctx.zoneOf(r, c) !== z) || ch; } }
        // la victime ne peut être que dans une zone où un suspect peut aller
        ch = restrict(victim, (r, c) => { const z = ctx.zoneOf(r, c); return suspects.some(s => zones(s).has(z)); }) || ch;
        // ni dans une zone qui contient déjà 2 suspects certains
        ch = restrict(victim, (r, c) => { const z = ctx.zoneOf(r, c); return suspects.filter(s => { const zs = zones(s); return zs.size === 1 && zs.has(z); }).length < 2; }) || ch;
        const zv = zones(victim);
        if (zv.size === 1) {
          const z = [...zv][0];
          const sure = suspects.filter(s => { const zs = zones(s); return zs.size === 1 && zs.has(z); });
          if (sure.length === 1) for (const s of suspects) if (s !== sure[0]) ch = restrict(s, (r, c) => ctx.zoneOf(r, c) !== z) || ch;
          const can = suspects.filter(s => zones(s).has(z));
          if (can.length === 1) ch = restrict(can[0], (r, c) => ctx.zoneOf(r, c) === z) || ch;
        }
        return ch;
      },
      // 6 groupes : k personnages confinés dans k lignes (colonnes), k ≥ 2
      () => {
        if (level < 2) return false;
        let ch = false;
        for (const axis of [0, 1]) {
          const lines = {};
          for (const id of ids) lines[id] = new Set(cells(id).map(rc => rc[axis]));
          for (const id of ids) {
            const L = lines[id];
            if (L.size < 2 || L.size >= n) continue;
            const group = ids.filter(o => [...lines[o]].every(x => L.has(x)));
            if (group.length === L.size) for (const o of ids) if (!group.includes(o))
              ch = restrict(o, (r, c) => !L.has(axis ? c : r)) || ch;
          }
        }
        return ch;
      }
    ];

    // à chaque tour : la technique la plus simple qui fait progresser, puis on recommence depuis la plus simple
    for (let guard = 0; guard < 1000; guard++) {
      if (ids.some(id => cand[id].size === 0)) return { solved: false, contradiction: true, cand, steps, order: steps.map(s => s.ids) };
      let progressed = false;
      for (let t = 1; t < rules.length && t <= maxTech; t++) {
        fresh = [];
        snap = Object.fromEntries(ids.map(id => [id, liveCells(id)]));
        const changed = rules[t]();
        snap = null;
        if (changed) {
          if (fresh.length) steps.push({ ids: fresh, tech: t });
          progressed = true;
          break;
        }
      }
      if (!progressed) break;
    }
    const remaining = ids.reduce((s, id) => s + cand[id].size, 0);
    return { solved: ids.every(id => cand[id].size === 1), remaining, cand, steps, order: steps.map(s => s.ids) };
  }

  // Difficulté d'après le déroulé de humanSolve (steps) :
  //   score = poids de la technique la plus dure
  //         + 1 par étape difficile (poids ≥ 3) au-delà de la première
  //         + 2 s'il n'y a aucun placement direct au départ (rien à quoi s'accrocher)
  //   crânes (échelle 0–5) : score ≤ 1 → 0, 2 → 1, 3–4 → 2, ≥ 5 → 3.
  //   4 et 5 crânes sont réservés aux grilles à nouvelles mécaniques (personnages sur plusieurs cases…).
  const TECH_WEIGHT = [0, 1, 2, 2, 3, 3, 5]; // indexé comme TECH
  function rateDifficulty(steps) {
    const w = steps.map(s => TECH_WEIGHT[s.tech]);
    const hardest = Math.max(0, ...w);
    const hardSteps = w.filter(x => x >= 3).length;
    const directStart = steps.length && steps[0].tech === 0 ? steps[0].ids.length : 0;
    const score = hardest + Math.max(0, hardSteps - 1) + (directStart ? 0 : 2);
    const skulls = score <= 1 ? 0 : score <= 2 ? 1 : score <= 4 ? 2 : 3;
    const top = steps[w.indexOf(hardest)];
    return { skulls, score, hardest: TECH[top ? top.tech : 0], hardSteps, directStart };
  }

  const api = { OBJECTS, TECH, rateDifficulty, RELATIVE, isPair, prepare, sharedRooms, canStand, evalClue, murdererOf, solve, checkPlacement, neighbors, humanSolve };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.GrimEngine = api;
})(typeof window !== 'undefined' ? window : globalThis);
