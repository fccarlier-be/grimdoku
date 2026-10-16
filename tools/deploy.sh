#!/bin/sh
# Grimdoku — reconstruit, teste, puis met en ligne sur https://grimdoku.fcold.org (VPS via fserver, cf. CLAUDE.md §7).
# S'arrête au premier test en échec : rien n'est envoyé.
# Usage : sh tools/deploy.sh
set -e
cd "$(dirname "$0")/.."
LOG=$(mktemp)
if ! npm test > "$LOG" 2>&1; then
  grep -E "✖|AssertionError|Error" "$LOG" | head -20
  echo "❌ tests en échec : rien n'est mis en ligne ($LOG)"
  exit 1
fi
grep -E "ℹ (pass|fail)" "$LOG"
cmp -s dist/grimdoku.html deploy/grimdoku/site/index.html
COPYFILE_DISABLE=1 tar -C deploy/grimdoku -czf - --exclude .DS_Store . \
  | ssh -o BatchMode=yes fserver "ssh -o BatchMode=yes vps 'tar -xzf - -C ~/grimdoku 2>&1 | grep -v \"unknown extended header\"; ~/grimdoku/update.sh'"
LIVE=$(mktemp)
curl -fsS https://grimdoku.fcold.org/ -o "$LIVE"
if cmp -s "$LIVE" dist/grimdoku.html; then echo "✅ en ligne, identique au build local"; else echo "⚠️ le site public diffère du build local"; exit 1; fi
