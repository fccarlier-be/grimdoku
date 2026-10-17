#!/bin/sh
# Accès au PC de François (desktop-franky-2, Windows, PowerShell) :
#   pc.sh '<commande PowerShell>'   ·   pc.sh --scp <local> <distant>   ·   pc.sh --get <distant> <local>
# Chemin : en direct par Tailscale si le Mac est sur le réseau Tailscale (n'importe où, même en 4G), sinon par fserver
# (réseau local de la maison). Une seule connexion réutilisée (ControlMaster, gardée 10 min) : fserver bloque l'adresse
# qui ouvre trop de connexions rapprochées (constaté le 2026-10-17).
set -e
PC=100.101.87.56
CM="-o ControlMaster=auto -o ControlPath=$HOME/.ssh/cm-grimdoku-%r@%h:%p -o ControlPersist=600"
O="-i $HOME/.ssh/desktop_franky -o IdentitiesOnly=yes -o BatchMode=yes -o LogLevel=ERROR -o ConnectTimeout=20"
if nc -z -G 3 "$PC" 22 2>/dev/null; then
  VIA="$CM"; PX=""   # direct (Tailscale sur le Mac)
else
  VIA=""; PX="ProxyCommand=ssh $CM -o BatchMode=yes fserver docker exec -i tailscale tailscale nc %h %p"
fi
run_ssh() { if [ -n "$PX" ]; then ssh $O -o "$PX" "$@"; else ssh $O $VIA "$@"; fi; }
run_scp() { if [ -n "$PX" ]; then scp -q $O -o "$PX" "$@"; else scp -q $O $VIA "$@"; fi; }
case "$1" in
  --scp) run_scp "$2" "francois@$PC:$3" ;;
  --get) run_scp "francois@$PC:$2" "$3" ;;
  --via) [ -n "$PX" ] && echo "par fserver" || echo "en direct (Tailscale)" ;;
  *) run_ssh "francois@$PC" "$1" ;;
esac
