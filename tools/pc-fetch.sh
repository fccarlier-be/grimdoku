#!/bin/sh
# Grimdoku — rapatrie les solutions produites sur le PC (grimdoku-gen\repo\solutions) dans solutions/ (sans écraser).
set -e
cd "$(dirname "$0")/.."
TMP=$(mktemp -d)
sh tools/pc.sh 'tar -czf $HOME\grimdoku-gen\sol.tgz -C $HOME\grimdoku-gen\repo solutions'
sleep 3
O="-i $HOME/.ssh/desktop_franky -o IdentitiesOnly=yes -o BatchMode=yes -o LogLevel=ERROR"
scp -q $O -o "ProxyCommand=ssh -o ControlMaster=auto -o ControlPath=$HOME/.ssh/cm-grimdoku-%r@%h:%p -o ControlPersist=600 -o BatchMode=yes fserver docker exec -i tailscale tailscale nc %h %p" francois@100.101.87.56:grimdoku-gen/sol.tgz "$TMP/sol.tgz"
tar -xzf "$TMP/sol.tgz" -C "$TMP"
n=0
for f in "$TMP"/solutions/*.json; do [ -e "solutions/$(basename "$f")" ] || { cp "$f" solutions/; n=$((n + 1)); }; done
echo "$n solution(s) rapatriée(s)"
