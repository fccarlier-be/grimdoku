# Mettre Grimdoku en ligne sans perdre une relecture

À faire dans le Terminal, depuis `~/Documents/Grimdoku`. Chaque étape doit réussir avant de passer à la suivante.

## 1. Vérifier la relecture en ligne (`/epi`)

```sh
sh tools/epi-sync.sh check
```

- **« ✅ relecture en ligne identique au projet »** : passer à l'étape 3.
- **« ❌ relecture en ligne différente du projet »** : la liste montre les grilles que tu as relues en ligne (épilogue, statut, note ou mise en situation). Passer à l'étape 2.

## 2. Rapatrier tes relectures

Vérifier d'abord que rien n'a été modifié en local sur ces fichiers depuis le dernier envoi :

```sh
git status --short lore/epilogues.json lore/epilogues-relecture.json lore/intros.json
```

- **Rien ne s'affiche** : rapatrier sans risque.
  ```sh
  sh tools/epi-sync.sh pull
  ```
- **Des fichiers s'affichent** : ne pas faire `pull` (il écraserait les modifications locales). Demander à Claude de fusionner.

## 3. Construire et tester

```sh
npm run build && sh tools/pc-test.sh
```

La dernière ligne doit être **« OK tests »**. Sinon : ne pas mettre en ligne.

## 4. Enregistrer

```sh
git add -A lore puzzles && git commit -m "Relectures des épilogues"
```

## 5. Préparer l'outil de relecture, puis mettre en ligne

```sh
node tools/epi-pack.js
COPYFILE_DISABLE=1 tar -C ~/Documents/Grimdoku/deploy/grimdoku -czf - --exclude .DS_Store --exclude ./epi/data --exclude ./api-data . | ssh fserver "ssh -o BatchMode=yes vps 'tar -xzf - -C ~/grimdoku 2>&1 | grep -v \"unknown extended header\"; ~/grimdoku/update.sh'"
```

À la fin : **« OK : 200 »**. Si « relecture (/epi) redémarrée » ou « nginx.conf modifié » apparaissent, c'est normal.

## 6. Vérifier le site public

```sh
curl -s https://grimdoku.fcold.org/ | shasum; shasum deploy/grimdoku/site/index.html
```

Les deux empreintes doivent être identiques.

## Bon à savoir

- La mise en ligne n'écrase jamais tes relectures en ligne (`epi/data` n'est pas envoyé). Le risque est l'inverse : mettre en ligne un jeu qui n'a pas tes dernières relectures. C'est ce que l'étape 1 évite.
- Pousser vers GitHub ensuite : `git push`.
