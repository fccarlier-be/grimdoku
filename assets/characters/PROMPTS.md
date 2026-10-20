# Portraits des personnages — prompts de génération (style BD encrée)

Un portrait par **type** de personnage (`cast.json`), pas par nom : le même portrait sert pour toutes les lettres.
Fichiers attendus : `assets/characters/<type>.png` ou `.jpeg`, carré, 512 px ou plus, **fond magenta pur uni** (#FF00FF) —
le détourage en PNG transparent et le recadrage en rond sont faits par script.

## Méthode

1. Générer **d'abord le tavernier** avec « Bloc de style » + sa ligne. Recommencer jusqu'à ce que le rendu plaise.
2. Pour chacun des 16 autres : **joindre le portrait du tavernier validé** et envoyer « Prompt de suite » + la ligne du personnage.
   La référence d'image garde le style, le cadrage et le fond cohérents d'un portrait à l'autre.
3. Vérifier à chaque fois : fond magenta **uni** (sans dégradé ni ombre), aucun magenta ni rose vif sur le personnage,
   tête dans la moitié haute, personnage reconnaissable en tout petit.
4. Puis : `.venv/bin/python tools/images.py && node build-app.js` (détourage + recadrage + intégration).
   ✅ faits : les 18 premiers types (dont le boulanger). ⏳ restent : les 16 types du tableau « Nouveaux personnages » ci-dessous
   (en attendant leur image, le jeu affiche leur emoji). Nouveau type : l'ajouter à `cast.json` (titre, 8 noms) et déposer son image.

## Bloc de style (premier portrait)

```
Bust portrait of a humorous fantasy character, Franco-Belgian comic book style (bande dessinée), bold clean black ink outlines with varying line weight, flat colors with light cel shading, muted earthy palette (warm parchment, ochre, brick red, deep purple, slate blue).
Head and shoulders only, centered, body slightly turned three-quarters, looking at the viewer. The character fills about 80% of the frame, head in the upper half, with a strong simple silhouette that stays readable as a tiny 40-pixel icon.
Background: a perfectly flat, uniform pure magenta (#FF00FF) chroma-key background, no gradient, no texture, no shadow, no vignette, nothing else in the background. Do not use magenta or hot pink anywhere on the character.
No text, no letters, no frame, no border, no watermark. Square 1:1 image.
Character: 
```

## Prompt de suite (avec le portrait validé en pièce jointe)

```
Same art style, same line weight, same framing, same lighting and the same flat pure magenta (#FF00FF) background as the attached image. Do not use magenta or hot pink on the character. No text, no frame. Square 1:1.
New character: 
```

## Personnages (ligne à coller après « Character: » / « New character: »)

| Fichier | Description |
|---|---|
| `tavernier.png` | a stocky dwarf innkeeper, bald on top with tufts of brown hair on the sides, a huge braided brown beard, a bulbous red nose, red shirt under a worn leather apron, suspicious stingy eyes, clutching a small coin purse to his chest |
| `mage.png` | a middle-aged wizard with a tall floppy blue pointed hat decorated with one small gold star, a short white beard, a blue robe, sleepy half-closed eyes and a red sniffly nose (he is allergic to hops), holding a crumpled handkerchief |
| `archimage.png` | a 412-year-old archmage, extremely wrinkled, an enormous grey beard flowing down past his shoulders, huge bushy white eyebrows, a tall purple pointed hat with a golden crescent moon, a mischievous grin |
| `barde.png` | a young bard with a red cap topped by a long yellow feather, a green tunic with a gold collar, messy brown hair, mouth wide open singing loudly and off-key, the neck of a lute visible over his shoulder |
| `troll.png` | a big-headed troll with mossy olive-grey skin (not bright green), tiny eyes under a heavy brow, a big lumpy nose, two lower tusks, a sheepish smile, wearing a white dishwasher's apron and holding a cracked plate |
| `elfe.png` | an elegant elf woman with long straight golden hair, long pointed ears, a thin circlet of leaves, a sage-green dress, one eyebrow raised in a disdainful food-critic expression, holding a tiny tasting spoon |
| `fee.png` | a tiny fairy woman with translucent pale blue wings, pastel peach-coloured hair in a bun, a lavender dress, rosy cheeks, slightly tipsy with a cheeky grin, holding a small wooden tankard |
| `spectre.png` | the ghost of a former castle lord, pale bluish-white translucent body shaped like a floating sheet, a faded noble ruff collar, hollow dark eyes and a round "oh" mouth, a short rusty chain hanging from one side |
| `dragonnet.png` | a baby dragon with red-orange scales and a cream belly, two small golden horns, big yellow eyes with slit pupils, tiny bat wings behind the shoulders, a puff of grey smoke coming out of its nostrils, looking proud |
| `zombie.png` | a dopey zombie, former wizard's apprentice, grey-olive skin, stitches across the forehead, one eye bigger than the other, messy dark hair, a torn faded purple apprentice robe, a vacant goofy smile |
| `sirene.png` | a friendly mermaid with long wavy teal hair, a starfish hairpin, a modest seashell top, warm skin, holding a tiny round fishbowl with a goldfish |
| `vampire.png` | a vampire countess with very pale lavender-white skin, black hair with a widow's peak, a tall black collar lined with dark red, dark red lips showing two tiny fangs, holding a carrot with a guilty look (she claims to be vegan) |
| `djinn.png` | a female genie with light blue skin, black hair in a high topknot held by a golden ring, golden hoop earrings, a purple embroidered vest, golden bracelets, her lower body fading into a wisp of pale smoke, a smug smile |
| `chevalier.png` | a knight squeezed into steel armour that is visibly too small for him, a closed great helm with a narrow visor slit and a red plume, armour plates straining, a small dent on the helmet |
| `gobelin.png` | a goblin treasurer with olive-yellow skin (not bright green), huge pointed ears sticking out sideways, a long pointy nose, a sly toothy grin, a tiny golden monocle, a quill pen tucked behind one ear, holding a single gold coin |
| `roi.png` | a plump, stingy king with a golden crown set with a red gem, a short brown beard, a grumpy pout, a red velvet robe with a white ermine collar, clutching a heavy money pouch |
| `meunier.png` | a jolly miller with a floppy white cap, a big brown moustache, rosy cheeks, flour dust on his face and clothes, a blue shirt and a white apron, a sack of flour slung over one shoulder |

## Nouveaux personnages (pack de 80 énigmes) — même méthode, joindre le tavernier validé

| Fichier | Description |
|---|---|
| `bonimenteur.png` | a flamboyant fairground showman with a battered top hat, a curled waxed moustache, a loud striped waistcoat and a cane, mouth open mid-pitch with a huge salesman grin |
| `cartomancienne.png` | a mysterious fortune-teller woman with a dark headscarf and big golden earrings, heavy eye make-up, fanning out a few tarot cards, a knowing half-smile |
| `sorciere.png` | a swamp witch with green-grey skin, a crooked wide-brimmed hat covered in moss, stringy dark hair, a wart on her long nose, a toothy cackle, a frog sitting on her hat brim |
| `crapaud.png` | a large warty brown toad with a tiny golden crown perched on his head, big golden eyes, a pompous expression, wearing a little red royal cape |
| `bibliothecaire.png` | a stern librarian woman with a tight grey bun pierced by a pencil, half-moon glasses on a chain, a finger raised to her lips saying "shush", holding a heavy book |
| `contremaitre.png` | a grumpy dwarf foreman with a mining helmet and candle, a thick black beard, a whistle around his neck, holding a clipboard and a pocket watch |
| `mineur.png` | a cheerful dwarf miner covered in coal dust, a dented mining helmet with a lamp, a ginger braided beard, a pickaxe on his shoulder, one gold nugget in his hand |
| `pirate.png` | a scruffy pirate with an eye patch, a red bandana and a tricorn hat, a gold tooth, a scraggly beard, holding a crumpled treasure map upside down |
| `capitaine.png` | a pompous ship captain in a dark blue coat with gold buttons and epaulettes, a big bicorne hat, a neatly trimmed white beard, holding a spyglass the wrong way round |
| `perroquet.png` | a big colourful parrot with scarlet, blue and yellow feathers (no pink), beak wide open squawking, a tiny gold earring, head tilted with a gossiping look |
| `apprentie.png` | a young witch apprentice with a slightly too big pointed hat, freckles, soot on her cheek, frizzy hair singed at the tips, holding a cracked smoking flask |
| `professeur.png` | an elderly potions professor with round glasses, a long nose sniffing a bubbling vial, a stained lab robe with many pockets full of flasks, wild grey eyebrows |
| `chef.png` | a goblin chef with olive-yellow skin (not bright green), a tall white chef's toque, a stained apron, tasting soup from a big wooden spoon with a critical look |
| `ogre.png` | a huge friendly ogre with greyish-brown skin, a tiny head on huge shoulders, a bib around his neck, holding a single carrot with an embarrassed vegetarian smile |
| `fossoyeur.png` | a thin cheerful gravedigger with a flat cap, a long scarf, hollow cheeks, whistling, a shovel resting on his shoulder and a lantern in his hand |
| `corbeau.png` | a large black raven with glossy blue-black feathers, a monocle, a quill pen in its beak, looking sly and secretive |

## Grands personnages (4–5 crânes) — image du corps entier, à sa taille sur la carte

Ils occupent plusieurs cases : leur image couvre toutes leurs cases et **tourne avec eux** sur la carte.
Le buste rond (cartes d'indices, verdict) est découpé automatiquement autour de la tête : **la tête doit être à l'endroit indiqué**.
Fichier : `assets/characters/<type>.png` ou `.jpeg`, fond magenta pur uni, au **format indiqué** (si l'outil ne sait faire
que du carré ou du 16:9, garder le corps bien centré : le script recadre sur la silhouette puis le met au bon format).
Joindre le tavernier validé, et envoyer le bloc ci-dessous suivi de la ligne du personnage.

```
Same art style, same line weight, same lighting and the same flat pure magenta (#FF00FF) background as the attached image, but this time the WHOLE BODY of the creature, seen from directly above (top-down view, as if lying on a game board), so that the image still makes sense when rotated. The creature fills the frame edge to edge in the exact shape described, with no part outside it and nothing else in the image. No floor, no cast shadow. Do not use magenta or hot pink on the creature. No text, no frame.
Creature: 
```

| Fichier | Format | Description (à coller après « Creature: ») |
|---|---|---|
| `geant.png` | **2:1 paysage** | a sleepy giant lying flat on his back, stretched horizontally across the whole image, HEAD ON THE LEFT END (left quarter of the image), feet on the right end, huge round head with tiny bored eyes and a bump on the forehead, patched brown tunic, arms along the body, yawning |
| `golem.png` | **2:1 paysage** | a stone golem made of mossy grey blocks lying flat on its back, stretched horizontally across the whole image, HEAD ON THE LEFT END (left quarter of the image) with glowing amber eyes and a rune on the forehead, a feather duster held on its chest, very earnest face |
| `vouivre.png` | **3:1 paysage** | a long winged serpent (wyvern-like) with olive-green scales stretched straight and horizontally across the whole image, HEAD ON THE LEFT END (left sixth of the image) with a ruby on the forehead and a smug smile, small feathered wings folded along the body, tail tip on the right end (no pink) |
| `dragon.png` | **1:1 carré, en L** | a large adult dark-red dragon curled in an L shape that fills exactly three quarters of the square: its HEAD in the TOP-LEFT quarter, its body going down through the BOTTOM-LEFT quarter, and its tail stretched through the BOTTOM-RIGHT quarter; the TOP-RIGHT quarter is completely EMPTY (only magenta background). Cream belly, two big curved horns, smoke from the nostrils, one claw on a small pile of gold coins, suspicious eyes |

Puis `.venv/bin/python tools/images.py && npm run build` : le script produit `<type>-full.webp` (corps entier) et `<type>.webp` (buste).
Si le buste est mal cadré, régler `BIG_HEAD_TYPE` dans `tools/images.py`.

## Invités de passage (victimes) — lore 2026-10-17

Depuis la bible du jeu, la victime est presque toujours un **invité de passage** : la troupe récurrente reste vivante
d'une enquête à l'autre. Même méthode que plus haut : **joindre le portrait du tavernier validé**, envoyer « Prompt de
suite » puis la ligne de l'invité. Ces portraits sont vus sur la carte de la victime (cachet rouge) : un visage un peu
pincé ou suffisant, qu'on n'est pas trop triste de voir disparaître, mais sans rien de lugubre.

| Fichier | Invité | Description (à coller après « New character: ») |
|---|---|---|
| `percepteur.png` | Taxard, le percepteur | a thin balding tax collector with a long pointed nose, small round spectacles, a tall black hat with a brass badge, a stiff dark-green coat with silver buttons, holding a fat ledger and a quill, a smug little smile |
| `cousine.png` | Ermengarde, la cousine | a middle-aged woman in an outdated, over-decorated purple travelling dress and a huge feathered hat, a lorgnette raised to one eye, greedy satisfied expression, a rolled family tree tucked under her arm |
| `inspecteur.png` | Pinardon, l'inspecteur des tavernes | a portly inspector with a waxed curly moustache, a red nose, a brown bowler hat, a checked waistcoat, holding a wine glass up to the light with a frown, a notebook peeking from his pocket |
| `touriste.png` | Gustave, le touriste | a cheerful sunburnt MEDIEVAL traveller with a wide straw hat, a loud striped wool tunic, a leather-bound sketchbook hanging from his neck on a cord and a stick of charcoal behind his ear, wide curious eyes, a pilgrim's satchel strap on one shoulder; nothing modern (no camera, no shirt buttons, no backpack) |
| `huissier.png` | Saisitout, l'huissier | a stern grey-skinned goblin bailiff in a tight black suit and a stiff collar, a monocle, holding up an official parchment with a red wax seal, ears sticking out, cold satisfied expression |
| `nageuse.png` | Ondine, la maîtresse-nageuse | a sporty MEDIEVAL bath-house mistress with short wet hair, a long loose white linen bathing shift and a linen coif, a small brass hand bell held up to call order, a cork float on a rope over one shoulder, very bossy expression; nothing modern (no stripes, no swimsuit, no whistle, no rubber ring) |
| `colporteur.png` | Bricabrac, le colporteur | a scruffy peddler with a patchy grey beard and a crooked smile, a battered felt hat covered in trinkets, a huge backpack overflowing with pots, spoons and useless junk, offering a chipped teapot to the viewer |
| `abbesse.png` | Prudence, l'abbesse | an elderly abbess in a brown and cream nun's habit with a wooden rosary, a collection box held firmly in both hands, pursed lips and one raised disapproving eyebrow |
| `troubadour.png` | Lirelire, le troubadour | a handsome, very pleased-with-himself troubadour with golden curls, a feathered beret, a bright yellow and green doublet, holding a lute, eyes closed mid-song, chin up |
| `chasseuse.png` | Vipérine, la chasseuse de primes | a lean bounty hunter with a scar across one cheek, a wide-brimmed dark hat, a leather coat with many straps, a rolled wanted poster in one hand, narrowed eyes, a crossbow strap over her shoulder |
| `alchimiste.png` | Mercurio, l'alchimiste | a shifty travelling alchemist with a pointed black goatee, singed eyebrows, round brass goggles pushed on his forehead, a stained leather apron, holding up a bubbling green flask with a sly grin |
| `baronne.png` | Grisemotte, la baronne voisine | a haughty noblewoman with an enormous towering grey powdered wig, a heavy pearl necklace, a stiff dark-blue gown with a ruff collar, a fan half hiding a contemptuous smile |
| `dresseuse.png` | Gertrude, la dresseuse de dragons | a burly cheerful animal trainer with rolled-up sleeves, thick leather gloves, a red ringmaster jacket with brass buttons, a coiled whip at her belt, a few singe marks on her face, confident grin |
| `messager.png` | Rapidon, le messager | a breathless young royal messenger with messy hair, a small cap with a feather, a tabard in the baron's colours (slate blue and ochre), holding out a sealed scroll, an apologetic grimace (he always brings bad news) |

Puis `.venv/bin/python tools/images.py && node build-app.js`. En attendant leur image, le jeu affiche leur emoji.
