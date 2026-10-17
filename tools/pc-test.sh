#!/bin/sh
# Grimdoku — construit les énigmes et lance les tests sur le PC de François (plus rapide que le Mac) : envoie le projet
# (sans images sources, historique, node_modules ni puzzles/), y construit et vérifie les énigmes (build-puzzles.js, la
# partie lente), assemble la page, lance tests/*.test.js, puis rapatrie puzzles/ sur le Mac (qui n'a plus qu'à assembler
# la page : node build-app.js). Code de sortie 0 = tests verts.
# Usage : sh tools/pc-test.sh
set -e
cd "$(dirname "$0")/.."
PACK=$(mktemp -t grimdoku-test).tgz
COPYFILE_DISABLE=1 tar -czf "$PACK" --exclude .git --exclude node_modules --exclude .venv --exclude dist --exclude deploy/grimdoku/site --exclude puzzles \
  --exclude '*.zip' --exclude 'assets/*/*.jpeg' --exclude 'assets/*/*.jpg' --exclude 'assets/*/*.png' --exclude 'assets/audio/*.wav' .
sh tools/pc.sh --scp "$PACK" grimdoku-gen/test.tgz
# empreinte de tout ce dont dépend la construction des énigmes : si elle n'a pas changé depuis la dernière construction
# réussie sur le PC, on ne reconstruit pas (seulement la page, rapide) — retour de François : pas de travail inutile
HASH=$(cat solutions/*.json scenes/*.json cast.json cast.js engine.js build-puzzles.js big-cases.json | shasum | cut -c1-16)
# idem pour les tests du moteur (unicité des solutions : jusqu'à 6 min pour une 12×12) : relancés seulement si les énigmes,
# le moteur ou ces tests ont changé depuis leur dernier passage réussi ; les tests de l'appli tournent toujours
EHASH=$(cat "$0" tests/engine.test.js | shasum | cut -c1-16)$HASH
# jsdom installé une fois (node_modules gardé) ; puzzles/ et solutions/ vidés seulement si on reconstruit
OUT=$(sh tools/pc.sh '$ErrorActionPreference = "Continue"; $d = "$HOME\grimdoku-gen"; $t = "$d\test"; $env:Path = "$d\node-v22.11.0-win-x64;" + $env:Path
Get-CimInstance Win32_Process | Where-Object { $_.Name -eq "node.exe" -and ($_.CommandLine -like "*build-puzzles.js*" -or $_.CommandLine -like "*build-app.js*" -or $_.CommandLine -like "*--test*") } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }
New-Item -ItemType Directory -Force $t | Out-Null
$same = (Test-Path "$t\build.hash") -and ((Get-Content "$t\build.hash") -eq "'$HASH'") -and (Test-Path "$t\puzzles")
if (-not $same) { Remove-Item -Recurse -Force "$t\puzzles", "$t\solutions", "$t\build.hash" -ErrorAction SilentlyContinue }
tar -xzf "$d\test.tgz" -C $t; Set-Location $t
New-Item -ItemType Directory -Force deploy\grimdoku\site, puzzles | Out-Null
if (-not (Test-Path node_modules\jsdom)) { npm.cmd install --no-audit --no-fund --loglevel=error 2>&1 | Out-Null }
if ($same) { "énigmes inchangées : pas de reconstruction" } else {
  node build-puzzles.js > build.log 2>&1; if ($LASTEXITCODE) { Get-Content build.log -Tail 15; "ECHEC build"; exit 1 }
  Set-Content build.hash "'$HASH'" }
node build-app.js >> build.log 2>&1; if ($LASTEXITCODE) { Get-Content build.log -Tail 15; "ECHEC build"; exit 1 }
$esame = (Test-Path engine.hash) -and ((Get-Content engine.hash) -eq "'$EHASH'")
if ($esame) { "tests du moteur inchangés : seulement ceux de l appli"; node --test tests/app.test.js > test.log 2>&1 } else { node --test "tests/*.test.js" > test.log 2>&1 }
$code = $LASTEXITCODE
if (-not $code -and -not $esame) { Set-Content engine.hash "'$EHASH'" }
Select-String -Path test.log -Pattern "^not ok|^# (pass|fail)" | Select-Object -First 25 | ForEach-Object { $_.Line }
tar -czf "$d\puzzles.tgz" puzzles
if ($code) { "ECHEC tests" } else { "OK tests" }' 2>&1 | iconv -f latin1 -t utf-8 2>/dev/null | tr -d '\r')
echo "$OUT"
case "$OUT" in *"ECHEC build"*|"") echo "❌ build en échec sur le PC : puzzles/ n'est pas touché"; exit 1;; esac
# énigmes construites sur le PC → puzzles/ du Mac (remplacé en entier : c'est une sortie du build), seulement si le PC
# en renvoie une par solution (sinon on garde puzzles/ tel quel et on s'arrête)
TMP=$(mktemp -d)
sh tools/pc.sh --get grimdoku-gen/puzzles.tgz "$TMP/puzzles.tgz"
tar -xzf "$TMP/puzzles.tgz" -C "$TMP"
GOT=$(ls "$TMP/puzzles" 2>/dev/null | grep -c '\.json$' || true)
WANT=$(ls solutions | grep -c '\.json$')
if [ "$GOT" -lt "$WANT" ]; then echo "❌ le PC n'a renvoyé que $GOT énigme(s) pour $WANT solutions : puzzles/ n'est pas touché"; exit 1; fi
rsync -a --delete "$TMP/puzzles/" puzzles/
echo "$(ls puzzles | wc -l | tr -d ' ') énigmes rapatriées du PC"
case "$OUT" in *"OK tests"*) exit 0;; *) exit 1;; esac
