# Mobilier — prompts de génération (même style BD encrée que les portraits)

Un dessin par type d'objet du catalogue (`OBJECTS` dans `engine.js`), réutilisé sur toutes les cartes.
Fichiers attendus : `assets/objects/<type>.png` ou `.jpeg`, carré, 512 px ou plus, **fond magenta pur uni** (#FF00FF).
Le détourage, le recadrage et l'intégration sont faits par script (comme les portraits).

## Méthode

1. Générer **d'abord le tonneau** : joindre **le portrait du tavernier** (référence de style) et envoyer « Bloc de style » + sa ligne.
   Recommencer jusqu'à ce que le rendu plaise.
2. Pour les 14 autres : **joindre le tonneau validé** et envoyer « Prompt de suite » + la ligne de l'objet
   (même angle de vue, même épaisseur de trait, même éclairage d'un objet à l'autre).
3. Vérifier à chaque fois : fond magenta **uni** (sans sol, sans ombre portée, sans dégradé), aucun rose ni violet vif
   sur l'objet, objet entier et centré, reconnaissable en tout petit (une case fait 40 à 60 px à l'écran).

## Bloc de style (premier objet, avec le portrait du tavernier en pièce jointe)

```
A single fantasy tavern object, drawn in exactly the same Franco-Belgian comic book style (bande dessinée) as the attached character portrait: bold clean black ink outlines with varying line weight, flat colors with light cel shading, the same muted earthy palette (warm wood browns, ochre, brick red, slate blue, iron grey).
Three-quarter view seen slightly from above, as if the object stood on a game board square. The object is complete (nothing cut off), centered, and fills about 85% of the frame, with a strong simple silhouette that stays readable as a tiny 40-pixel icon. No character, no hands, no floor, no cast shadow, no other object.
Background: a perfectly flat, uniform pure magenta (#FF00FF) chroma-key background, no gradient, no texture, no vignette. Do not use magenta, pink or bright purple anywhere on the object (no pink or purple glow).
No text, no letters, no frame, no border, no watermark. Square 1:1 image.
Object: 
```

## Prompt de suite (avec l'objet validé en pièce jointe)

```
Same art style, same line weight, same three-quarter view from slightly above, same lighting and the same flat pure magenta (#FF00FF) background as the attached image. The object is complete, centered and fills about 85% of the frame. No floor, no cast shadow, no character. Do not use magenta, pink or bright purple on the object. No text, no frame. Square 1:1.
New object: 
```

## Objets (ligne à coller après « Object: » / « New object: »)

| Fichier | Description |
|---|---|
| `tonneau.png` | a sturdy oak wine barrel standing upright, curved wooden staves, two dark iron hoops, a small wooden tap on the front, a few dents and scratches |
| `table.png` | a heavy rectangular wooden tavern table with four thick legs, scratched and stained top, a pewter tankard of ale with foam sitting on it |
| `chaise.png` | a simple rustic wooden chair with a tall straight back and a worn brick-red cushion on the seat |
| `lit.png` | a narrow wooden single bed with a carved headboard, a plump white pillow and a brick-red woollen blanket |
| `etagere.png` | a tall wooden bookshelf with three shelves crammed with old leather-bound books in muted colours, a candle stub and a small grinning skull on the top shelf |
| `chaudron.png` | a round black cast-iron witch's cauldron on three short legs, bubbling green potion with a few bubbles and a wisp of green steam, a wooden ladle sticking out |
| `coffre.png` | a closed wooden treasure chest with a rounded lid, brass corner bands and a heavy brass padlock |
| `foin.png` | a rectangular hay bale tied with two brick-red ropes, loose straws sticking out |
| `tapis.png` | a rectangular ornate brick-red woven rug with a golden diamond medallion and a dark border pattern, short golden fringes at both ends, seen from directly above and filling most of the frame |
| `statue.png` | a small grey stone statue of a stern knight holding a sword point-down, standing on a square stone pedestal, a crack and a bit of moss on the base |
| `arbre.png` | a small round leafy oak tree with a thick gnarled trunk, dense dark-green foliage and a couple of red apples |
| `champi.png` | a giant toadstool mushroom taller than a stool, wide brick-red cap with white spots, thick cream-coloured stem |
| `cristal.png` | a crystal ball on a carved dark wooden stand, the glass glowing pale blue and cyan with a soft swirling mist inside (no purple, no pink) |
| `sarcophage.png` | a closed grey stone sarcophagus lying on the ground, the lid carved with a simple face and folded arms, chipped edges and cobwebs at one corner |
| `portail.png` | a standing circular stone ring engraved with glowing golden runes, filled with a swirling vortex of deep blue and cyan magical energy (no purple, no pink) |
