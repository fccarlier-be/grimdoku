#!/bin/sh
# Grimdoku — résumé du compteur anonyme (journal nginx ~/grimdoku/logs/stats.log sur le VPS) : joueurs uniques, jours et
# heures de jeu (heure de Paris), affaires ouvertes et résolues, par joueur et par lieu. Aucun nom ni adresse : v est un
# identifiant tiré au hasard par l'appareil.
# Usage : sh tools/stats.sh            (lecture seule sur le VPS, par fserver)
#         sh tools/stats.sh <fichier>  (journal déjà rapatrié, par ex. depuis le PC quand fserver demande un mot de passe)
#         sh tools/stats.sh --local    (parties jouées sur node tools/local.js, http://localhost:8095)
set -e
cd "$(dirname "$0")/.."
if [ "$1" = "--local" ]; then set -- "$(node -e 'console.log(require("path").join(process.env.API_DATA || require("path").join(require("os").tmpdir(), "grimdoku-api-local"), "stats.log"))')"
  [ -f "$1" ] || { echo "aucun événement en local pour l’instant ($1)"; exit 0; }; fi
if [ -n "$1" ]; then LOG="$1"; else
  LOG=$(mktemp)
  ssh -o BatchMode=yes fserver "ssh -o BatchMode=yes vps 'cat ~/grimdoku/logs/stats.log 2>/dev/null'" > "$LOG"
fi
node -e '
const fs = require("fs");
const ev = [];
for (const line of fs.readFileSync(process.argv[1], "utf8").split("\n")) {
  const [t, e, v, g, n] = line.trim().split(" ");
  if (!t || !/^(visite|ouverte|resolue)$/.test(e) || !/^[a-z0-9]{1,16}$/.test(v || "")) continue;
  const d = new Date(t); if (isNaN(d)) continue;
  ev.push({ d, e, v, g: g && g !== "-" ? g : null, n: +n || null });
}
if (!ev.length) { console.log("aucun événement pour l’instant"); process.exit(0); }
const paris = (d, o) => new Intl.DateTimeFormat("fr-FR", Object.assign({ timeZone: "Europe/Paris" }, o)).format(d);
const day = d => paris(d, { year: "numeric", month: "2-digit", day: "2-digit" }).split("/").reverse().join("-");
const hour = d => parseInt(paris(d, { hour: "2-digit", hourCycle: "h23" }), 10);
const players = new Set(ev.map(x => x.v));
console.log(`du ${day(ev[0].d)} au ${day(ev[ev.length - 1].d)} : ${players.size} joueur(s) unique(s), ` +
  `${ev.filter(x => x.e === "ouverte").length} ouvertures, ${ev.filter(x => x.e === "resolue").length} résolutions`);
console.log("\njour         joueurs  nouveaux  ouvertes  résolues");
const first = {}; for (const x of ev) if (!first[x.v]) first[x.v] = day(x.d);
const days = {};
for (const x of ev) { const k = day(x.d); const o = days[k] = days[k] || { v: new Set(), o: 0, r: 0 };
  o.v.add(x.v); if (x.e === "ouverte") o.o++; if (x.e === "resolue") o.r++; }
for (const [k, o] of Object.entries(days).sort()) console.log(k.padEnd(12), String(o.v.size).padStart(7),
  String(Object.values(first).filter(f => f === k).length).padStart(9), String(o.o).padStart(9), String(o.r).padStart(9));
const h = Array(24).fill(0), seen = new Set();
for (const x of ev) { const k = x.v + day(x.d) + hour(x.d); if (!seen.has(k)) { seen.add(k); h[hour(x.d)]++; } }
const max = Math.max(...h);
console.log("\nheures de jeu (joueurs actifs par heure, heure de Paris)");
h.forEach((c, i) => { if (c) console.log(String(i).padStart(2) + "h " + "#".repeat(Math.ceil(c * 40 / max)) + " " + c); });
const by = {};
for (const x of ev) { const o = by[x.v] = by[x.v] || { o: new Set(), r: new Set(), days: new Set() };
  o.days.add(day(x.d)); if (x.e === "ouverte" && x.g) o.o.add(x.g); if (x.e === "resolue" && x.g) o.r.add(x.g); }
const solved = Object.values(by).map(o => o.r.size).sort((a, b) => a - b);
const med = solved[Math.floor(solved.length / 2)];
console.log(`\naffaires résolues par joueur : médiane ${med}, max ${solved[solved.length - 1]} ; ` +
  `${solved.filter(s => s === 0).length} joueur(s) sans aucune résolue ; ` +
  `${Object.values(by).filter(o => o.days.size > 1).length} revenu(s) un autre jour`);
const tranches = [[0, 0], [1, 2], [3, 5], [6, 10], [11, 20], [21, 50], [51, 1e9]];
console.log(tranches.map(([a, b]) => `${a === b ? a : b > 1e8 ? a + "+" : a + "-" + b} : ${solved.filter(s => s >= a && s <= b).length}`).join("   "));
const place = g => g.split("--")[0];
const pl = {};
for (const x of ev) if (x.g) { const o = pl[place(x.g)] = pl[place(x.g)] || { o: new Set(), r: new Set() };
  if (x.e === "ouverte") o.o.add(x.v); if (x.e === "resolue") o.r.add(x.v); }
console.log("\nlieu                 joueurs  ont résolu au moins une affaire");
for (const [k, o] of Object.entries(pl).sort((a, b) => b[1].o.size - a[1].o.size)) console.log(k.padEnd(20), String(o.o.size).padStart(7), String(o.r.size).padStart(9));
const gr = {};
for (const x of ev) if (x.g) { const o = gr[x.g] = gr[x.g] || { o: new Set(), r: new Set(), n: x.n };
  if (x.e === "ouverte") o.o.add(x.v); if (x.e === "resolue") o.r.add(x.v); }
console.log("\naffaires les plus abandonnées (ouvertes sans être résolues, par joueur)");
Object.entries(gr).map(([g, o]) => ({ g, n: o.n, ab: [...o.o].filter(v => !o.r.has(v)).length, o: o.o.size }))
  .filter(x => x.ab).sort((a, b) => b.ab - a.ab).slice(0, 10)
  .forEach(x => console.log(x.g.padEnd(52), `${x.ab}/${x.o}`, x.n ? x.n + "×" + x.n : ""));
' "$LOG"
[ -z "$1" ] && rm -f "$LOG"; true
