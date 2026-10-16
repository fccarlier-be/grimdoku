# Sols — prompts de génération (même style BD encrée que les portraits et le mobilier)

Une texture par **matière** (champ `floor` des pièces dans `scenes/*.json`), réutilisée sur toutes les cartes.
Fichiers attendus : `assets/floors/<matière>.png` ou `.jpeg`, **carré**, 1024 px de préférence. Pas de fond magenta ici : la texture remplit toute l'image.
Le script la rend raccordable (bords sans couture), adoucit son contraste et l'éclaircit ; le jeu la teinte ensuite avec la couleur de chaque pièce.
Une texture couvre 2×2 cases (une case fait 40 à 60 px sur téléphone) : **motifs assez grands**, pas de détail minuscule.

## Méthode
1. Générer **d'abord le parquet** : joindre **le tonneau validé** (référence de style) et envoyer « Bloc de style » + sa ligne.
2. Pour les autres : joindre **le parquet validé** et envoyer « Prompt de suite » + la ligne de la matière.
3. Vérifier : vue **exactement de dessus**, éclairage plat et uniforme (aucune ombre portée, aucun point lumineux, aucun vignettage),
   **contraste faible et tons clairs**, rien qui ressemble à un objet ou à un personnage, pas de bord ni de cadre.
4. Puis `.venv/bin/python tools/images.py && npm run build`.

## Bloc de style (premier sol, avec le tonneau en pièce jointe)

```
A seamless tileable floor texture seen from directly above (pure top-down, orthographic), drawn in the same Franco-Belgian comic book style (bande dessinée) as the attached object: clean black ink lines with slightly varying weight, flat colors with very light cel shading, muted earthy palette. Even, flat lighting over the whole image: no cast shadow, no highlight spot, no vignette, no perspective. Low contrast and light tones, so that furniture and characters drawn on top stay readable. Large simple pattern (about 4 to 8 repeats across the image), no tiny details. The pattern fills the whole square edge to edge and continues past the edges. No objects, no characters, no text, no frame, no border. Square 1:1.
Floor: 
```

## Prompt de suite (avec le parquet validé en pièce jointe)

```
Same art style, same ink line weight, same flat top-down view, same light low-contrast tones and even lighting as the attached floor texture. Seamless tileable, pattern filling the whole square edge to edge, large simple shapes, no objects, no text, no frame. Square 1:1.
New floor: 
```

## Matières (ligne à coller après « Floor: » / « New floor: »)

| Fichier | Pièces (exemples) | Description |
|---|---|---|
| `parquet.png` | salle commune, chambre, dortoir, bureau | worn honey-coloured wooden floorboards running horizontally, staggered plank ends, a few nail heads and knots |
| `navire.png` | pont, cabine, cale, quai, ponton | weathered grey-brown ship deck planks running horizontally with dark tarred seams between them and round wooden pegs |
| `dalles.png` | chapelle, grande salle, hall, donjon | large irregular light-grey flagstones with thick mortar joints, a few cracks |
| `crypte.png` | crypte, caveau, ossuaire | old cracked dark-grey stone slabs, worn and uneven, with a little moss in the joints and a few tiny pebbles |
| `damier.png` | cuisine, laboratoire, buffet | a checkerboard of cream and muted brick-red square tiles, some chipped corners |
| `noble.png` | salle de bal, salle du trône, boudoir | elegant wooden parquet in a herringbone pattern, two warm wood tones, polished but drawn flat |
| `mosaique.png` | hammam, bassins, sauna | small square mosaic tiles in pale turquoise and white forming simple wave bands |
| `tomettes.png` | fournil, cave, cellier, coquerie | hexagonal terracotta floor tiles (tomettes) in soft orange-brown with cream joints |
| `herbe.png` | jardin, verger, potager, allées | short soft grass drawn as tufts of ink strokes, a few clover leaves and tiny pebbles |
| `paille.png` | grange, étable, écurie, poulailler | packed earth floor scattered with loose golden straw |
| `sciure.png` | chapiteau, manège, stands | a sawdust and sand circus floor, pale beige with fine wood shavings |
| `roche.png` | galeries de mine, puits, antre du dragon | rough uneven cave rock floor in brown-grey with cracks and a few small stones |
| `paves.png` | cour, marché | rounded cobblestones in grey and ochre tones, tightly packed |
| `boue.png` | mare, tourbière, roselière | wet muddy marsh ground in olive-brown with small puddles and a few reed stems lying flat |
| `parchemin.png` | cadre de la carte | an old parchment paper texture, warm cream with faint stains, fibres and slight discoloration (no writing, no drawing) |

## Fond de l'appli : le bureau de l'enquêteur (même méthode, joindre le parquet validé)

Contrairement aux sols, cette texture **reste sombre** (le texte clair des titres est posé dessus) et n'est pas adoucie.

| Fichier | Rôle | Description |
|---|---|---|
| `bureau.png` | fond de toutes les pages | a dark walnut wooden desk top seen from directly above, deep brown planks running horizontally with subtle grain, a few faint ink stains and old scratches, very dark and low contrast overall (it is a background behind light text), even lighting, no objects |
