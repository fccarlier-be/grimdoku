#!/bin/sh
# Grimdoku — rapatrie les solutions produites sur le PC (grimdoku-gen\repo\solutions) dans solutions/ (sans écraser).
set -e
cd "$(dirname "$0")/.."
TMP=$(mktemp -d)
sh tools/pc.sh 'tar -czf $HOME\grimdoku-gen\sol.tgz -C $HOME\grimdoku-gen\repo solutions'
sleep 3
sh tools/pc.sh --get grimdoku-gen/sol.tgz "$TMP/sol.tgz"
tar -xzf "$TMP/sol.tgz" -C "$TMP"
n=0
for f in "$TMP"/solutions/*.json; do [ -e "solutions/$(basename "$f")" ] || { cp "$f" solutions/; n=$((n + 1)); }; done
echo "$n solution(s) rapatriée(s)"
