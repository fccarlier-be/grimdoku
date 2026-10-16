#!/bin/sh
# Relance le conteneur après remplacement de site/index.html (et éventuellement de nginx.conf)
set -e
cd "$(dirname "$0")"
docker compose up -d
# nginx.conf est monté comme fichier : remplacé sur l'hôte, le conteneur garde l'ancien.
# S'il a changé, on recrée le conteneur (1 à 2 s de coupure) ; sinon un simple rechargement suffit.
if [ "$(docker compose exec -T grimdoku cat /etc/nginx/conf.d/default.conf | md5sum)" != "$(md5sum < nginx.conf)" ]; then
  echo "nginx.conf modifié : conteneur recréé"
  docker compose up -d --force-recreate
else
  docker compose exec -T grimdoku nginx -s reload
fi
# pas de port publié : on vérifie depuis l'intérieur du conteneur
sleep 1
echo "OK : $(docker compose exec -T grimdoku wget -q -S -O /dev/null http://127.0.0.1/ 2>&1 | grep -m1 'HTTP/' | awk '{print $2}')"
