#!/bin/sh
# Grimdoku — relance SEULEMENT les tests sur le PC, sur les énigmes et la page déjà construites par pc-test.sh
# (grimdoku-gen\test) : envoie tests/ (et, si --page, app/template.html + build-app.js, puis réassemble la page, rapide).
# À utiliser quand seuls des tests (ou la page) ont changé : pas de reconstruction des énigmes.
# Usage : sh tools/pc-retest.sh [--page]
set -e
cd "$(dirname "$0")/.."
FILES="tests deploy/grimdoku/api"
[ "$1" = "--page" ] && FILES="tests app build-app.js deploy/grimdoku/api lore/lieux-zones.json lore/epilogues.json assets/decors/grand assets/characters/*-[0-9]*.webp"
PACK=$(mktemp -t grimdoku-retest).tgz
COPYFILE_DISABLE=1 tar -czf "$PACK" $FILES
sh tools/pc.sh --scp "$PACK" grimdoku-gen/retest.tgz
PAGE=0; [ "$1" = "--page" ] && PAGE=1
OUT=$(sh tools/pc.sh '$d = "$HOME\grimdoku-gen"; $t = "$d\test"; $env:Path = "$d\node-v22.11.0-win-x64;" + $env:Path; Set-Location $t
tar -xzf "$d\retest.tgz" -C $t
if ('$PAGE' -eq 1) { node build-app.js > build-app.log 2>&1; if ($LASTEXITCODE) { Get-Content build-app.log -Tail 10; "ECHEC build"; exit 1 } }
node --test "tests/*.test.js" > test.log 2>&1; $code = $LASTEXITCODE
Select-String -Path test.log -Pattern "^not ok|^# (pass|fail)" | Select-Object -First 25 | ForEach-Object { $_.Line }
if ($code) { "ECHEC tests" } else { "OK tests" }' 2>&1 | iconv -f latin1 -t utf-8 2>/dev/null | tr -d '\r')
echo "$OUT"
case "$OUT" in *"OK tests"*) exit 0;; *) exit 1;; esac
