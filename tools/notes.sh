#!/bin/sh
# Grimdoku — résumé des votes de difficulté des joueurs (journal nginx ~/grimdoku/logs/notes.log sur le VPS) :
# par énigme, nombre de joueurs, moyenne ressentie (dernier vote de chaque joueur) et difficulté calculée.
# Usage : sh tools/notes.sh   (lecture seule sur le VPS)
set -e
cd "$(dirname "$0")/.."
LOG=$(mktemp)
ssh -o BatchMode=yes fserver "ssh -o BatchMode=yes vps 'cat ~/grimdoku/logs/notes.log 2>/dev/null'" > "$LOG"
node -e '
const fs = require("fs");
const last = {};
for (const line of fs.readFileSync(process.argv[1], "utf8").split("\n")) {
  const [t, g, d, v, s, n] = line.split(" ");
  if (!g || !/^[0-5]$/.test(d) || !v) continue;
  last[g + " " + v] = { g, d: +d, s: s === "1", n };
}
const by = {};
for (const x of Object.values(last)) (by[x.g] = by[x.g] || []).push(x);
const calc = (id) => { try { return JSON.parse(fs.readFileSync("puzzles/" + id + ".json", "utf8")).difficulty; } catch (e) { return "?"; } };
const rows = Object.entries(by).map(([g, xs]) => ({ g, n: xs.length, moy: xs.reduce((a, x) => a + x.d, 0) / xs.length, res: xs.filter(x => x.s).length, calc: calc(g) }))
  .sort((a, b) => b.n - a.n || a.g.localeCompare(b.g));
if (!rows.length) { console.log("aucun vote pour l’instant"); process.exit(0); }
console.log("énigme".padEnd(52), "votes", "résolues", "ressentie", "calculée");
for (const r of rows) console.log(r.g.padEnd(52), String(r.n).padStart(5), String(r.res).padStart(8), r.moy.toFixed(1).padStart(9), String(r.calc).padStart(8));
' "$LOG"
