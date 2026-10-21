#!/bin/sh
# Grimdoku — synchronise les épilogues (et les mises en situation, lore/intros.json) entre le projet et la relecture en ligne (grimdoku.fcold.org/epi).
#   sh tools/epi-sync.sh pull   récupère les épilogues relus en ligne → lore/epilogues.json, lore/epilogues-relecture.json
#   sh tools/epi-sync.sh check  avant toute mise en ligne : la relecture en ligne a-t-elle des changements absents du projet ?
#   sh tools/epi-sync.sh push   envoie ceux du projet en ligne (refusé si le VPS a changé depuis le dernier pull :
#                               les modifications faites en ligne ne sont jamais écrasées sans avoir été récupérées)
# Mot de passe : trousseau macOS, entrée « grimdoku-epi » (security add-generic-password -s grimdoku-epi -a francois -w).
set -e
cd "$(dirname "$0")/.."
URL=https://grimdoku.fcold.org/epi
PASS=$(security find-generic-password -s grimdoku-epi -a francois -w 2>/dev/null) || {
  echo "❌ mot de passe absent du trousseau : security add-generic-password -s grimdoku-epi -a francois -w"; exit 1; }
STAMP=lore/.epi-sync   # empreinte de l'état en ligne au dernier pull (ou push)
TMP=$(mktemp)
curl -fsS -u "francois:$PASS" "$URL/export" -o "$TMP"
NOW=$(shasum < "$TMP" | cut -c1-16)
case "$1" in
  check)
    # avant toute mise en ligne (règle de François, 2026-10-21) : la relecture en ligne a-t-elle des changements qui ne sont
    # pas dans le projet ? Liste les grilles concernées et sort en erreur s'il y en a (alors : pull, et refaire le build).
    node -e "const fs=require('fs');const o=JSON.parse(fs.readFileSync('$TMP','utf8'));
      const E=JSON.parse(fs.readFileSync('lore/epilogues.json','utf8')),R=JSON.parse(fs.readFileSync('lore/epilogues-relecture.json','utf8')),
        G=(JSON.parse(fs.readFileSync('lore/intros.json','utf8')).grilles)||{},OG=(o.intros&&o.intros.grilles)||{};
      const ids=new Set([...Object.keys(o.epilogues),...Object.keys(o.relecture),...Object.keys(OG)]);ids.delete('_doc');const diff=[];
      for(const id of ids){const w=[];if(o.epilogues[id]!==E[id])w.push('épilogue');if(JSON.stringify(o.relecture[id])!==JSON.stringify(R[id]))w.push('statut/note');
        if(o.intros&&OG[id]!==G[id])w.push('mise en situation');if(w.length)diff.push(id+' : '+w.join(', '));}
      const C=JSON.parse(fs.readFileSync('lore/carnet-decouvertes.json','utf8'));if(o.carnet&&JSON.stringify(o.carnet)!==JSON.stringify(C))diff.push('carnet des habitués (découvertes)');
      if(diff.length){console.log('❌ relecture en ligne différente du projet ('+diff.length+') :\n  '+diff.join('\n  ')+'\n→ sh tools/epi-sync.sh pull, vérifier, refaire le build');process.exit(1)}
      console.log('✅ relecture en ligne identique au projet')" || exit 1
    echo "$NOW" > "$STAMP" ;;
  pull)
    node -e "const fs=require('fs');const o=JSON.parse(fs.readFileSync('$TMP','utf8'));
      fs.writeFileSync('lore/epilogues.json',JSON.stringify(o.epilogues,null,2)+'\n');
      fs.writeFileSync('lore/epilogues-relecture.json',JSON.stringify(o.relecture,null,2)+'\n');
      if(o.intros&&o.intros.grilles)fs.writeFileSync('lore/intros.json',JSON.stringify(o.intros,null,2)+'\n');
      if(o.carnet)fs.writeFileSync('lore/carnet-decouvertes.json',JSON.stringify(o.carnet,null,2)+'\n');
      console.log(Object.keys(o.epilogues).length-1+' épilogues récupérés')"
    echo "$NOW" > "$STAMP"
    git diff --stat lore/epilogues.json lore/epilogues-relecture.json lore/intros.json lore/carnet-decouvertes.json ;;
  push)
    if [ -f "$STAMP" ] && [ "$(cat "$STAMP")" != "$NOW" ]; then
      echo "❌ des épilogues ont été modifiés en ligne depuis le dernier pull : sh tools/epi-sync.sh pull d'abord"; exit 1; fi
    node -e "const fs=require('fs');process.stdout.write(JSON.stringify({epilogues:JSON.parse(fs.readFileSync('lore/epilogues.json','utf8')),relecture:JSON.parse(fs.readFileSync('lore/epilogues-relecture.json','utf8')),intros:JSON.parse(fs.readFileSync('lore/intros.json','utf8')),carnet:JSON.parse(fs.readFileSync('lore/carnet-decouvertes.json','utf8'))}))" \
      | curl -fsS -u "francois:$PASS" -X POST -H 'Content-Type: application/json' --data-binary @- "$URL/import"; echo
    curl -fsS -u "francois:$PASS" "$URL/export" | shasum | cut -c1-16 > "$STAMP" ;;
  *) echo "usage : sh tools/epi-sync.sh pull|push|check"; exit 1 ;;
esac
rm -f "$TMP"
