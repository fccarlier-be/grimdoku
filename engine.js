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


  // Grands personnages (4–5 crânes) : formes, en décalages [dl, dc] dans une orientation de base.
  // Règles : chaque case prend sa ligne et sa colonne, toutes les cases dans la même pièce, jamais sur un meuble.
  const SHAPES = {
    I2: { name: '2 cases', cells: [[0, 0], [0, 1]] },
    I3: { name: '3 cases en ligne', cells: [[0, 0], [0, 1], [0, 2]] },
    L3: { name: '3 cases en angle', cells: [[0, 0], [1, 0], [1, 1]] }
  };
  const byRC = (a, b) => a[0] - b[0] || a[1] - b[1];
  // orientations distinctes d'une forme, coin haut-gauche en (0, 0), cases triées
  function orientations(shape) {
    const out = new Map();
    let cs = SHAPES[shape].cells;
    for (let k = 0; k < 4; k++) {
      cs = cs.map(([r, c]) => [c, -r]);
      const mr = Math.min(...cs.map(x => x[0])), mc = Math.min(...cs.map(x => x[1]));
      const norm = cs.map(([r, c]) => [r - mr, c - mc]).sort(byRC);
      out.set(JSON.stringify(norm), norm);
    }
    return [...out.values()];
  }
  // cases d'une position : [l, c] (une case) ou [[l, c], …] (grand personnage, cases triées)
  const cellsOf = (v) => (Array.isArray(v[0]) ? v : [v]);
  const posKey = (v) => cellsOf(v).map(([r, c]) => key(r, c)).join(';');

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
  const zoneAt = (ctx, v) => ctx.zoneOf(...cellsOf(v)[0]);

  // Formes possibles d'un personnage : null (une case), [forme] (forme connue), toutes (forme cachée, 5 crânes).
  function shapesOf(ctx, id) {
    const ch = ctx.chars[id];
    if (!ch.shape) return null;
    return ctx.p.hiddenShapes ? Object.keys(SHAPES) : [ch.shape];
  }

  function canStand(ctx, charId, r, c) {
    const o = ctx.objAt[key(r, c)];
    if (!o) return true;
    if (shapesOf(ctx, charId)) return false; // un grand personnage ne monte sur aucun meuble
    if (!OBJECTS[o.type].blocking) return true;
    const ch = ctx.chars[charId];
    return !!(ch.traits && ch.traits.includes('spectre'));
  }

  // Toutes les positions où un personnage peut se tenir, sans tenir compte des indices.
  function placementsOf(ctx, id) {
    const n = ctx.n, out = [];
    const shapes = shapesOf(ctx, id);
    if (!shapes) {
      for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (canStand(ctx, id, r, c)) out.push([r, c]);
      return out;
    }
    for (const s of shapes) for (const o of orientations(s))
      for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
        const cs = o.map(([dr, dc]) => [r + dr, c + dc]);
        if (!cs.every(([a, b]) => a < n && b < n && !ctx.objAt[key(a, b)])) continue;
        const room = ctx.roomOf(...cs[0]);
        if (cs.every(([a, b]) => ctx.roomOf(a, b) === room)) out.push(cs);
      }
    return out;
  }
  // position valide pour ce personnage (forme, pièce unique, meubles) ? cells dans n'importe quel ordre
  function isPlacement(ctx, id, v) {
    const k = posKey(Array.isArray(v[0]) ? [...v].sort(byRC) : v);
    return placementsOf(ctx, id).some(pl => posKey(pl) === k);
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

  // Évalue un indice sur un placement. pos: {id: [r,c] ou [[r,c],…]}
  // Grand personnage : « à côté de », « même ligne / colonne » = au moins une de ses cases ;
  // « au nord de X » = toutes ses cases plus haut que toutes celles de X.
  function evalClue(ctx, clue, pos) {
    const cs = cellsOf(pos[clue.who]);
    const [r, c] = cs[0];
    const L = clue.logic;
    const typeAt = (rr, cc) => { const o = ctx.objAt[key(rr, cc)]; return o ? o.type : null; };
    const near = () => cs.some(([a, b]) => neighbors(ctx, a, b).some(([x, y]) => typeAt(x, y) === L.object));
    const span = (v, axis) => { const xs = cellsOf(v).map(rc => rc[axis]); return [Math.min(...xs), Math.max(...xs)]; };
    switch (L.type) {
      case 'inRoom': return ctx.roomOf(r, c) === L.room;
      case 'notInRoom': return ctx.roomOf(r, c) !== L.room;
      case 'onObject': return cs.some(([a, b]) => typeAt(a, b) === L.object);
      case 'adjacentTo': return near();
      case 'notAdjacentTo': return !near();
      case 'sameRowAs': return ctx.p.objects.some(o => o.type === L.object && cs.some(x => x[0] === o.at[0]));
      case 'sameColAs': return ctx.p.objects.some(o => o.type === L.object && cs.some(x => x[1] === o.at[1]));
      case 'sameRoomAs': return zoneAt(ctx, pos[clue.who]) === zoneAt(ctx, pos[L.other]);
      // nord = haut de la carte ; « au sud de X » = sur une ligne plus basse, n'importe quelle colonne
      case 'northOf': return span(cs, 0)[1] < span(pos[L.other], 0)[0];
      case 'southOf': return span(cs, 0)[0] > span(pos[L.other], 0)[1];
      case 'eastOf': return span(cs, 1)[0] > span(pos[L.other], 1)[1];
      case 'westOf': return span(cs, 1)[1] < span(pos[L.other], 1)[0];
      case 'alone': {
        const z = zoneAt(ctx, cs);
        return Object.keys(pos).every(id => id === clue.who || zoneAt(ctx, pos[id]) !== z);
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
      if (zoneAt(ctx, pos[sus[i].id]) === zoneAt(ctx, pos[sus[j].id])) out.push([sus[i].id, sus[j].id]);
    return out;
  }

  // Coupable : seul suspect dans la zone de la victime (null si 0 ou >1).
  function murdererOf(ctx, pos) {
    const v = ctx.p.characters.find(c => c.role === 'victim');
    const z = zoneAt(ctx, pos[v.id]);
    const s = ctx.p.characters.filter(c => c.role !== 'victim' && zoneAt(ctx, pos[c.id]) === z);
    return s.length === 1 ? s[0].id : null;
  }

  // Lignes et colonnes (distinctes) d'une position
  const linesOf = (v) => { const cs = cellsOf(v); return [[...new Set(cs.map(x => x[0]))], [...new Set(cs.map(x => x[1]))]]; };

  // Énumère les solutions (s'arrête à `limit`).
  function solve(p, clues, limit) {
    const ctx = prepare(p);
    const ids = p.characters.map(c => c.id);
    const n = ctx.n;
    const used = [new Array(n).fill(false), new Array(n).fill(false)];
    const pos = {};
    const sols = [];
    // indices unaires évalués tôt : positions possibles de chacun
    const opts = {};
    for (const id of ids) {
      const mine = clues.filter(cl => cl.who === id && !isPair(cl.logic.type));
      opts[id] = placementsOf(ctx, id).filter(v => mine.every(cl => evalClue(ctx, cl, { [id]: v }))).map(v => ({ v, lines: linesOf(v) }));
    }
    const binary = clues.filter(cl => isPair(cl.logic.type));
    const free = (o) => o.lines[0].every(r => !used[0][r]) && o.lines[1].every(c => !used[1][c]);
    const mark = (o, b) => { o.lines[0].forEach(r => (used[0][r] = b)); o.lines[1].forEach(c => (used[1][c] = b)); };
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
      for (const o of opts[id]) {
        if (!free(o)) continue;
        pos[id] = o.v; mark(o, true);
        rec(i + 1);
        mark(o, false); delete pos[id];
      }
    }
    rec(0);
    return sols;
  }

  // Vérifie un placement du joueur : renvoie la liste des problèmes.
  function checkPlacement(p, pos) {
    const ctx = prepare(p);
    const errs = [];
    const rows = {}, cols = {};
    for (const id of Object.keys(pos)) {
      const [rs, cs] = linesOf(pos[id]);
      for (const r of rs) if (rows[r]) errs.push({ kind: 'row', ids: [rows[r], id] }); else rows[r] = id;
      for (const c of cs) if (cols[c]) errs.push({ kind: 'col', ids: [cols[c], id] }); else cols[c] = id;
      if (shapesOf(ctx, id)) { if (!isPlacement(ctx, id, pos[id])) errs.push({ kind: 'shape', ids: [id] }); }
      else if (!canStand(ctx, id, ...pos[id])) errs.push({ kind: 'blocked', ids: [id] });
    }
    for (const pair of sharedRooms(ctx, pos)) errs.push({ kind: 'room', ids: pair });
    return errs;
  }

  // Solveur « humain » : propagation sans essai-erreur, technique la plus simple d'abord.
  // Il raisonne sur des positions (une case, ou plusieurs pour un grand personnage).
  // Techniques (TECH), de la plus facile à la plus dure :
  //   0 indice : le personnage n'a qu'une position possible d'après ses propres indices
  //   1 case unique : un placé prend ses lignes et colonnes aux autres
  //   2 ligne réservée : toutes les positions d'un personnage passent par une même ligne (colonne) → interdite aux autres
  //   3 position relative : « au nord de X » → au-dessus de la ligne la plus basse possible de X (et inversement)
  //   4 seul candidat : une ligne (colonne) ne peut accueillir qu'un seul personnage — seulement quand toutes les
  //     lignes (colonnes) sont forcément occupées (avec un grand personnage, certaines peuvent rester vides)
  //   5 pièces : « même pièce », « seul », suspects dans des pièces différentes, règle du meurtre
  //   6 groupes (niveau 2) : des personnages confinés dans k lignes (colonnes) qui en occupent forcément k
  // level 1 = techniques 0 à 5 ; level 2 = + 6.
  // Renvoie { solved, remaining, cand, order, steps } ; cand: {id: Set(posKey)} ;
  // steps : [{ ids, tech }] dans l'ordre où un humain place les personnages ; order : steps[].ids.
  const TECH = ['indice', 'case unique', 'ligne réservée', 'position relative', 'seul candidat', 'pièces', 'groupes'];
  // maxTech (optionnel) : n'utiliser que les techniques jusqu'à cet indice de TECH (générateur, grilles faciles)
  function humanSolve(p, clues, level, maxTech = Infinity) {
    const ctx = prepare(p);
    const n = ctx.n;
    const ids = p.characters.map(c => c.id);
    const victim = p.characters.find(c => c.role === 'victim').id;
    // infos par position : lignes, colonnes, étendue, zone
    const INFO = {};
    const info = (v) => {
      const k = posKey(v);
      if (!INFO[k]) {
        const [rs, cs] = linesOf(v);
        INFO[k] = { k, v, lines: [rs, cs], min: [Math.min(...rs), Math.min(...cs)], max: [Math.max(...rs), Math.max(...cs)], zone: zoneAt(ctx, v) };
      }
      return INFO[k];
    };
    const cand = {};
    for (const id of ids) {
      const mine = clues.filter(cl => cl.who === id && !isPair(cl.logic.type));
      cand[id] = new Set(placementsOf(ctx, id).filter(v => mine.every(cl => evalClue(ctx, cl, { [id]: v }))).map(v => info(v).k));
    }
    const steps = [];
    const placed = new Set();
    let fresh = [];
    // Chaque technique raisonne sur un instantané pris au début de son passage (snap) et n'applique ses éliminations
    // qu'à l'état réel : le résultat d'un passage ne dépend pas de l'ordre des personnages (donc pas des lettres).
    const live = (id) => [...cand[id]].map(k => INFO[k]);
    let snap = null;
    const opts = (id) => (snap ? snap[id] : live(id));
    const zones = (id) => new Set(opts(id).map(o => o.zone));
    const fixed = (id) => { const os = opts(id); return os.length === 1 ? os[0] : null; };
    // nombre minimal de lignes (axe 0) ou colonnes (axe 1) qu'occupe un personnage
    const minSpan = (id, axis) => Math.min(...opts(id).map(o => o.lines[axis].length));
    const restrict = (id, pred) => {
      let ch = false;
      for (const k of [...cand[id]]) if (!pred(INFO[k])) { cand[id].delete(k); ch = true; }
      if (ch && cand[id].size === 1 && !placed.has(id)) { placed.add(id); fresh.push(id); }
      return ch;
    };
    const avoid = (axis, x) => (o) => !o.lines[axis].includes(x);
    ids.filter(id => cand[id].size === 1).forEach(id => placed.add(id));
    if (placed.size) steps.push({ ids: [...placed], tech: 0 });

    const rules = [
      null,
      // 1 case unique : un placé libère ses lignes et ses colonnes
      () => {
        let ch = false;
        for (const id of ids) {
          const f = fixed(id); if (!f) continue;
          for (const o of ids) if (o !== id) ch = restrict(o, (q) => q.lines[0].every(r => !f.lines[0].includes(r)) && q.lines[1].every(c => !f.lines[1].includes(c))) || ch;
        }
        return ch;
      },
      // 2 ligne réservée : un personnage dont toutes les positions passent par une ligne (colonne) la prend aux autres
      () => {
        let ch = false;
        for (const id of ids) {
          const os = opts(id);
          if (os.length < 2) continue;
          for (const axis of [0, 1]) {
            const common = os[0].lines[axis].filter(x => os.every(o => o.lines[axis].includes(x)));
            for (const x of common) for (const o of ids) if (o !== id) ch = restrict(o, avoid(axis, x)) || ch;
          }
        }
        return ch;
      },
      // 3 position relative (toutes les cases de l'un avant toutes celles de l'autre)
      () => {
        let ch = false;
        for (const cl of clues) {
          const t = cl.logic.type;
          if (!RELATIVE.includes(t)) continue;
          const a = cl.who, b = cl.logic.other;
          const axis = t === 'northOf' || t === 'southOf' ? 0 : 1;
          const less = t === 'northOf' || t === 'westOf'; // a avant b sur l'axe
          const oa = opts(a), ob = opts(b);
          if (less) {
            const lim = Math.max(...ob.map(o => o.min[axis])), lim2 = Math.min(...oa.map(o => o.max[axis]));
            ch = restrict(a, (q) => q.max[axis] < lim) || ch;
            ch = restrict(b, (q) => q.min[axis] > lim2) || ch;
          } else {
            const lim = Math.min(...ob.map(o => o.max[axis])), lim2 = Math.max(...oa.map(o => o.min[axis]));
            ch = restrict(a, (q) => q.min[axis] > lim) || ch;
            ch = restrict(b, (q) => q.max[axis] < lim2) || ch;
          }
        }
        return ch;
      },
      // 4 seul candidat : une ligne (colonne) qu'un seul personnage peut occuper, quand aucune ne peut rester vide
      () => {
        let ch = false;
        for (const axis of [0, 1]) {
          if (ids.reduce((s, id) => s + minSpan(id, axis), 0) < n) continue;
          for (let x = 0; x < n; x++) {
            const who = ids.filter(id => opts(id).some(o => o.lines[axis].includes(x)));
            if (who.length === 1) ch = restrict(who[0], (q) => q.lines[axis].includes(x)) || ch;
          }
        }
        return ch;
      },
      // 5 pièces : même pièce que, seul dans sa pièce, règle du meurtre
      () => {
        let ch = false;
        for (const cl of clues) if (cl.logic.type === 'sameRoomAs') {
          const a = cl.who, b = cl.logic.other;
          const za = zones(a), zb = zones(b);
          ch = restrict(a, (q) => zb.has(q.zone)) || ch;
          ch = restrict(b, (q) => za.has(q.zone)) || ch;
        }
        for (const cl of clues) if (cl.logic.type === 'alone') {
          const a = cl.who, za = zones(a);
          if (za.size === 1) { const z = [...za][0]; for (const o of ids) if (o !== a) ch = restrict(o, (q) => q.zone !== z) || ch; }
          for (const o of ids) if (o !== a) { const zo = zones(o); if (zo.size === 1) { const z = [...zo][0]; ch = restrict(a, (q) => q.zone !== z) || ch; } }
        }
        // règle du meurtre : exactement un suspect dans la zone de la victime
        const suspects = ids.filter(i => i !== victim);
        // suspects dans des pièces différentes : une pièce certaine pour l'un est interdite aux autres
        for (const s of suspects) { const zs = zones(s); if (zs.size === 1) { const z = [...zs][0]; for (const o of suspects) if (o !== s) ch = restrict(o, (q) => q.zone !== z) || ch; } }
        // la victime ne peut être que dans une zone où un suspect peut aller
        ch = restrict(victim, (q) => suspects.some(s => zones(s).has(q.zone))) || ch;
        // ni dans une zone qui contient déjà 2 suspects certains
        ch = restrict(victim, (q) => suspects.filter(s => { const zs = zones(s); return zs.size === 1 && zs.has(q.zone); }).length < 2) || ch;
        const zv = zones(victim);
        if (zv.size === 1) {
          const z = [...zv][0];
          const sure = suspects.filter(s => { const zs = zones(s); return zs.size === 1 && zs.has(z); });
          if (sure.length === 1) for (const s of suspects) if (s !== sure[0]) ch = restrict(s, (q) => q.zone !== z) || ch;
          const can = suspects.filter(s => zones(s).has(z));
          if (can.length === 1) ch = restrict(can[0], (q) => q.zone === z) || ch;
        }
        return ch;
      },
      // 6 groupes : des personnages confinés dans k lignes (colonnes) et qui en occupent au moins k les prennent toutes
      () => {
        if (level < 2) return false;
        let ch = false;
        for (const axis of [0, 1]) {
          const lines = {};
          for (const id of ids) lines[id] = new Set(opts(id).flatMap(o => o.lines[axis]));
          for (const id of ids) {
            const L = lines[id];
            if (L.size < 2 || L.size >= n) continue;
            const group = ids.filter(o => [...lines[o]].every(x => L.has(x)));
            if (group.reduce((s, g) => s + minSpan(g, axis), 0) >= L.size) for (const o of ids) if (!group.includes(o))
              ch = restrict(o, (q) => q.lines[axis].every(x => !L.has(x))) || ch;
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
        snap = Object.fromEntries(ids.map(id => [id, live(id)]));
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
  //   4 et 5 crânes : grilles à grands personnages (skullsOf).
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
  // Crânes d'une énigme : 4 avec un grand personnage de forme connue, 5 à forme cachée, sinon d'après le déroulé.
  function skullsOf(p, steps) {
    if (p.characters.some(c => c.shape)) return p.hiddenShapes ? 5 : 4;
    return rateDifficulty(steps).skulls;
  }

  const api = { OBJECTS, SHAPES, TECH, rateDifficulty, skullsOf, RELATIVE, isPair, prepare, sharedRooms, canStand, evalClue, murdererOf, solve, checkPlacement, neighbors, humanSolve, cellsOf, posKey, placementsOf, isPlacement, shapesOf, orientations, linesOf };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.GrimEngine = api;
})(typeof window !== 'undefined' ? window : globalThis);
