# Grimdoku — prototype

- `engine.js` : règles (pièces, portails, spectre, indices), solveur exhaustif, solveur « humain » (niveaux 1 et 2).
- `gen.js` : génère un jeu d'indices pour une scène. `node gen.js scene2.json 5 --level=2 --portal-murder`
- `build-puzzles.js` : ajoute les textes, vérifie unicité + résolubilité logique, écrit `puzzles/*.json`.
- `build-app.js` : assemble `app/template.html` + moteur + énigmes en `dist/grimdoku.html` (fichier unique).

Reconstruire : `node build-puzzles.js && node build-app.js`
