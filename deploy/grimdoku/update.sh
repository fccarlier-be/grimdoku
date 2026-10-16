#!/bin/sh
# Relance le conteneur après remplacement de site/index.html
set -e
cd "$(dirname "$0")"
docker compose up -d
docker compose exec grimdoku nginx -s reload
echo "OK : $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:8095/)"
