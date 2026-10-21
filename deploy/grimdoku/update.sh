#!/bin/sh
# Relance le conteneur après remplacement de site/index.html (et éventuellement de nginx.conf)
set -e
cd "$(dirname "$0")"
docker compose up -d
# relecture des épilogues (/epi) : le serveur construit sa page au démarrage ; nouvelle version reçue (epi/app) → on le
# redémarre (quelques secondes de coupure de /epi seulement ; les épilogues relus en ligne, dans epi/data, ne bougent pas)
EPI_SUM=$(cat epi/app/relecture.js epi/app/bundle.json | md5sum)
if [ "$EPI_SUM" != "$(cat .epi-app.sum 2>/dev/null)" ]; then
  docker compose restart grimdoku-epi && echo "$EPI_SUM" > .epi-app.sum && echo "relecture (/epi) redémarrée"
fi
# nginx.conf est monté comme fichier : remplacé sur l'hôte, le conteneur garde l'ancien.
# S'il a changé, on recrée le conteneur (1 à 2 s de coupure) ; sinon un simple rechargement suffit.
if [ "$(docker compose exec -T grimdoku cat /etc/nginx/conf.d/default.conf | md5sum)" != "$(md5sum < nginx.conf)" ]; then
  # vérifiée d'abord dans un conteneur jetable, sans réseau : invalide, on ne relance rien (le site garde l'ancienne)
  if ! docker run --rm --network none -v "$PWD/nginx.conf:/etc/nginx/conf.d/default.conf:ro" \
      -v "$PWD/epi.htpasswd:/etc/nginx/epi.htpasswd:ro" -v "$PWD/logs:/var/log/grimdoku" nginx:1.27-alpine nginx -t -q; then
    echo "ERREUR : nginx.conf invalide, rien n'est relancé (le site tourne encore avec l'ancienne configuration)"; exit 1
  fi
  echo "nginx.conf modifié : conteneur recréé"
  docker compose up -d --force-recreate
else
  docker compose exec -T grimdoku nginx -s reload
fi
# pas de port publié : on vérifie depuis l'intérieur du conteneur
sleep 1
echo "OK : $(docker compose exec -T grimdoku wget -q -S -O /dev/null http://127.0.0.1/ 2>&1 | grep -m1 'HTTP/' | awk '{print $2}')"
