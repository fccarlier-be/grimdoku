#!/bin/sh
# pc.sh <commande PowerShell>  |  pc.sh --scp <local> <distant>  — accès au PC (desktop-franky-2) par fserver + Tailscale
# Une seule connexion à fserver, réutilisée (ControlMaster, gardée 10 min) : fserver bloque l'adresse qui ouvre trop de
# connexions rapprochées (constaté le 2026-10-17).
set -e
CM="-o ControlMaster=auto -o ControlPath=$HOME/.ssh/cm-grimdoku-%r@%h:%p -o ControlPersist=600"
O="-i $HOME/.ssh/desktop_franky -o IdentitiesOnly=yes -o BatchMode=yes -o LogLevel=ERROR -o ConnectTimeout=20"
PX="ProxyCommand=ssh $CM -o BatchMode=yes fserver docker exec -i tailscale tailscale nc %h %p"
if [ "$1" = "--scp" ]; then exec scp -q $O -o "$PX" "$2" "francois@100.101.87.56:$3"; fi
exec ssh $O -o "$PX" francois@100.101.87.56 "$1"
