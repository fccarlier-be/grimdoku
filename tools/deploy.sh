#!/bin/sh
# Grimdoku — reconstruit, teste (sur le PC de François), puis met en ligne sur https://grimdoku.fcold.org (VPS via fserver, cf. CLAUDE.md §7).
# S'arrête au premier test en échec : rien n'est envoyé.
# Usage : sh tools/deploy.sh
set -e
cd "$(dirname "$0")/.."
LOG=$(mktemp)
# énigmes construites et tests lancés sur le PC de François (plus rapide, CLAUDE.md §7 bis), qui renvoie puzzles/ ;
# la page est assemblée ici (c'est elle qu'on envoie). PC injoignable : tout sur le Mac.
if sh tools/pc.sh 'exit 0' > /dev/null 2>&1; then
  sh tools/pc-test.sh || { echo "❌ tests en échec (PC) : rien n'est mis en ligne"; exit 1; }
  node build-app.js > "$LOG" 2>&1 || { tail -20 "$LOG"; echo "❌ build en échec : rien n'est mis en ligne"; exit 1; }
  cp dist/grimdoku.html deploy/grimdoku/site/index.html
elif ! npm test > "$LOG" 2>&1; then
  grep -E "✖|AssertionError|Error" "$LOG" | head -20
  echo "❌ tests en échec : rien n'est mis en ligne ($LOG)"
  exit 1
else
  grep -E "ℹ (pass|fail)" "$LOG"
fi
# garde-fou : jamais de page avec moins d'énigmes que de solutions (une page vide a été envoyée le 2026-10-17)
N=$(ls puzzles | grep -c '\.json$'); W=$(ls solutions | grep -c '\.json$')
if [ "$N" -lt "$W" ]; then echo "❌ $N énigme(s) pour $W solutions : rien n'est mis en ligne"; exit 1; fi
cmp -s dist/grimdoku.html deploy/grimdoku/site/index.html
# relecture des épilogues (/epi) : serveur et contexte de cette version ; les épilogues modifiés en ligne (epi/data)
# restent sur le VPS, jamais envoyés ni écrasés ; de même les progressions des joueurs (api-data)
node tools/epi-pack.js
[ -f deploy/grimdoku/epi.htpasswd ] || { echo "❌ deploy/grimdoku/epi.htpasswd manquant (mot de passe de /epi)"; exit 1; }
COPYFILE_DISABLE=1 tar -C deploy/grimdoku -czf - --exclude .DS_Store --exclude ./epi/data --exclude ./api-data . \
  | ssh -o BatchMode=yes fserver "ssh -o BatchMode=yes vps 'tar -xzf - -C ~/grimdoku 2>&1 | grep -v \"unknown extended header\"; ~/grimdoku/update.sh'"
LIVE=$(mktemp)
curl -fsS https://grimdoku.fcold.org/ -o "$LIVE"
if cmp -s "$LIVE" dist/grimdoku.html; then echo "✅ en ligne, identique au build local"; else echo "⚠️ le site public diffère du build local"; exit 1; fi
