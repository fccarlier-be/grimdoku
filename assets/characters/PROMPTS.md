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

## Grands personnages (4–5 crânes) — même méthode, joindre le tavernier validé

Ils occupent plusieurs cases sur la carte, mais leur portrait reste un buste rond comme les autres.

| Fichier | Description |
|---|---|
| `geant.png` | a sleepy giant with a huge round head, tiny bored eyes, a stubby nose, a patched brown tunic and a big bump on his forehead from low ceilings, yawning |
| `golem.png` | a stone golem made of mossy grey blocks with glowing amber eyes and a rune carved on its forehead, a very earnest, focused expression, a small feather duster in one hand |
| `vouivre.png` | a long winged serpent woman (wyvern-like) with olive-green scales, small feathered wings, a single ruby on her forehead, coiled around herself, a smug knowing smile (no pink) |
| `dragon.png` | a large adult dragon with dark red scales and a cream belly, curled tail, two big curved horns, smoke rising from the nostrils, one claw resting protectively on a small pile of gold coins, suspicious eyes |
