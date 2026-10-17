#!/bin/sh
# Grimdoku — lance la production des énigmes sur le PC de François (desktop-franky-2, Windows, 16 cœurs), détachée
# de la connexion SSH. Envoie d'abord le générateur et les décors, puis lance tools/batch.js avec les options données.
# Usage : [LOG=nom] sh tools/pc-batch.sh [options de batch.js]   (ex. --only=citadelle --parallel)
# LOG : nom du journal (grimdoku-gen\<nom>.log, « batch » par défaut) — un par production lancée en même temps
# Suivre : sh tools/pc.sh 'Get-Content $HOME\grimdoku-gen\<nom>.log -Tail 20'
# Rapatrier : sh tools/pc-fetch.sh
set -e
LOG=${LOG:-batch}
cd "$(dirname "$0")/.."
PACK=$(mktemp -t grimdoku-pack).tgz
COPYFILE_DISABLE=1 tar -czf "$PACK" engine.js cast.js cast.json gen.js build-puzzles.js big-cases.json scenes tools/batch.js solutions
sh tools/pc.sh --scp "$PACK" grimdoku-gen/pack.tgz
sleep 3 # fserver refuse les connexions trop rapprochées
sh tools/pc.sh "New-Item -ItemType Directory -Force \$HOME\grimdoku-gen\repo | Out-Null; tar -xzf \$HOME\grimdoku-gen\pack.tgz -C \$HOME\grimdoku-gen\repo; \$d = \"\$HOME\grimdoku-gen\"; \$cmd = \"cmd /c \`\"\`\"\$d\node-v22.11.0-win-x64\node.exe\`\" tools/batch.js --jobs=15 $* > \`\"\$d\\${LOG}.log\`\" 2>&1\`\"\"; \$r = Invoke-CimMethod -ClassName Win32_Process -MethodName Create -Arguments @{ CommandLine = \$cmd; CurrentDirectory = \"\$d\repo\" }; 'pid ' + \$r.ProcessId"
