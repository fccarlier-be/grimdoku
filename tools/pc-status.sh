#!/bin/sh
# Grimdoku — une ligne d'état de la production sur le PC : petites / grandes cartes, échecs, productions en cours.
cd "$(dirname "$0")/.."
sh tools/pc.sh '$s = Get-ChildItem $HOME\grimdoku-gen\repo\solutions; $g = ($s | Where-Object { $_.Name -match "^(citadelle|grand-port|universite|grande-foire)" }).Count; $n = @(Get-CimInstance Win32_Process | Where-Object { $_.Name -eq "node.exe" -and $_.CommandLine -like "*batch.js*" }).Count; $e = @(Select-String -Path (Get-ChildItem $HOME\grimdoku-gen\*.log | Sort-Object LastWriteTime | Select-Object -Last 1).FullName -Pattern "aucune grille").Count; "petites " + ($s.Count - $g) + "/170, grandes " + $g + "/54, echecs " + $e + ", productions " + $n' 2>&1 | tr -d '\r' | tail -1
