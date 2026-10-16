#!/bin/sh
# Relance le conteneur après remplacement de site/index.html
set -e
cd "$(dirname "$0")"
docker compose up -d
docker compose exec grimdoku nginx -s reload
# pas de port publié : on vérifie depuis l'intérieur du conteneur
echo "OK : $(docker compose exec grimdoku wget -q -S -O /dev/null http://127.0.0.1/ 2>&1 | grep -m1 'HTTP/' | awk '{print $2}')"
