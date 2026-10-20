# Variantes de visages des victimes — prompts

Un visage différent par victime (François, 2026-10-20 : « je veux vraiment éviter les doublons »). Par type de victime,
**4 planches de 4 bustes** (2 × 2), chaque buste décrit nommément : 16 visages tous différents, dont un de réserve.

Fichiers : `assets/characters/variantes/<type>.png`, `<type>-2.png`, `<type>-3.png`, `<type>-4.png` (ou `.jpeg`).
Puis `.venv/bin/python tools/images.py` → `assets/characters/<type>-2.webp` à `<type>-17.webp` (découpe automatique).

Joindre à chaque fois le portrait actuel du type (`assets/characters/<type>.jpeg`), **pour le style seulement**.

Chaque planche est **un seul bloc complet** à coller (le sujet en premier : un générateur ne garde parfois que le
début du prompt ; « ne copie pas la référence » seul lui a fait dessiner des gens d'aujourd'hui, cf. `ancien/`).

## abbesse.png

```
Medieval fantasy, Franco-Belgian comic book style (bande dessinée): bold clean black ink outlines, flat colors with light cel shading, muted earthy palette. The attached image is a STYLE reference only (drawing style, line work, colours, framing): keep that style, but draw new faces.
Draw a character sheet of FOUR different MEDIEVAL ABBESSES (Catholic nuns of the Middle Ages, each wearing a nun's habit, a veil and a white wimple framing the face), arranged in a 2 x 2 grid. Nothing modern: no modern clothes, no modern hairstyles, no jewellery other than a cross or a rosary.
Each abbess is a bust portrait (head and shoulders), body slightly turned three-quarters, looking at the viewer, head in the upper half of her quarter, filling about 70% of her quarter. They must look like four clearly different women, recognisable even as tiny 40-pixel icons:
1. Top left: a tall, very thin abbess in her sixties with a long pale horse-like face and hollow cheeks, a pale grey habit, a heavy iron key ring in her hand, stern narrowed eyes.
2. Top right: a short, round, rosy-cheeked abbess in her fifties with a double chin and a big warm smile, a sky-blue habit, holding a basket of bread loaves.
3. Bottom left: a very old, tiny, hunched abbess in her nineties with a deeply wrinkled dark brown face and a toothless grin, a black habit, leaning on a gnarled wooden walking stick.
4. Bottom right: a young abbess in her thirties with freckles, a sharp nose and an ambitious smirk, a dark green habit, holding a quill and a ledger.
The four abbesses must NOT touch or overlap each other or the edges: leave a wide empty gap of background between them.
Background: a perfectly flat, uniform pure magenta (#FF00FF) chroma-key background behind all four, no gradient, no texture, no shadow, no dividing lines, no grid lines, no frames. Do not use magenta or hot pink anywhere on the characters.
No text, no letters, no numbers, no watermark. Square 1:1 image.
```

## abbesse-2.png

```
Medieval fantasy, Franco-Belgian comic book style (bande dessinée): bold clean black ink outlines, flat colors with light cel shading, muted earthy palette. The attached image is a STYLE reference only (drawing style, line work, colours, framing): keep that style, but draw new faces.
Draw a character sheet of FOUR different MEDIEVAL ABBESSES (Catholic nuns of the Middle Ages, each wearing a nun's habit, a veil and a white wimple framing the face), arranged in a 2 x 2 grid. Nothing modern: no modern clothes, no modern hairstyles, no jewellery other than a cross or a rosary.
Each abbess is a bust portrait (head and shoulders), body slightly turned three-quarters, looking at the viewer, head in the upper half of her quarter, filling about 70% of her quarter. They must look like four clearly different women, recognisable even as tiny 40-pixel icons:
1. Top left: a broad-shouldered, muscular abbess in her forties with a square jaw and a broken nose, a rust-red habit with rolled-up sleeves, holding a big wooden ladle.
2. Top right: an elegant aristocratic abbess in her fifties with high cheekbones, olive skin and thin arched eyebrows, a deep purple habit with a gold pectoral cross, a haughty look.
3. Bottom left: a nervous, bird-like abbess in her sixties with a long thin neck, huge round eyes and thick round spectacles, a light brown habit, clutching a stack of scrolls to her chest.
4. Bottom right: a jovial abbess in her seventies with a big red nose and laughing crinkled eyes, a white habit with a black veil, raising a pewter mug of beer.
The four abbesses must NOT touch or overlap each other or the edges: leave a wide empty gap of background between them.
Background: a perfectly flat, uniform pure magenta (#FF00FF) chroma-key background behind all four, no gradient, no texture, no shadow, no dividing lines, no grid lines, no frames. Do not use magenta or hot pink anywhere on the characters.
No text, no letters, no numbers, no watermark. Square 1:1 image.
```

## abbesse-3.png

```
Medieval fantasy, Franco-Belgian comic book style (bande dessinée): bold clean black ink outlines, flat colors with light cel shading, muted earthy palette. The attached image is a STYLE reference only (drawing style, line work, colours, framing): keep that style, but draw new faces.
Draw a character sheet of FOUR different MEDIEVAL ABBESSES (Catholic nuns of the Middle Ages, each wearing a nun's habit, a veil and a white wimple framing the face), arranged in a 2 x 2 grid. Nothing modern: no modern clothes, no modern hairstyles, no jewellery other than a cross or a rosary.
Each abbess is a bust portrait (head and shoulders), body slightly turned three-quarters, looking at the viewer, head in the upper half of her quarter, filling about 70% of her quarter. They must look like four clearly different women, recognisable even as tiny 40-pixel icons:
1. Top left: a severe abbess in her fifties with very dark skin, a strong chin and a perfectly straight posture, an ivory habit with a black scapular, holding a closed ornate prayer book.
2. Top right: a dreamy, absent-minded abbess in her forties with a soft oval face, half-closed eyes and a smudge of ink on her cheek, a lavender-grey habit, a sprig of herbs tucked into her veil.
3. Bottom left: a scowling old abbess in her eighties with bushy white eyebrows, a hairy mole on her chin and a hooked nose, a mustard-yellow habit, shaking a bony fist.
4. Bottom right: a plump, sly abbess in her fifties with small shrewd eyes and dimples, a teal habit, counting gold coins in her palm.
The four abbesses must NOT touch or overlap each other or the edges: leave a wide empty gap of background between them.
Background: a perfectly flat, uniform pure magenta (#FF00FF) chroma-key background behind all four, no gradient, no texture, no shadow, no dividing lines, no grid lines, no frames. Do not use magenta or hot pink anywhere on the characters.
No text, no letters, no numbers, no watermark. Square 1:1 image.
```

## abbesse-4.png

```
Medieval fantasy, Franco-Belgian comic book style (bande dessinée): bold clean black ink outlines, flat colors with light cel shading, muted earthy palette. The attached image is a STYLE reference only (drawing style, line work, colours, framing): keep that style, but draw new faces.
Draw a character sheet of FOUR different MEDIEVAL ABBESSES (Catholic nuns of the Middle Ages, each wearing a nun's habit, a veil and a white wimple framing the face), arranged in a 2 x 2 grid. Nothing modern: no modern clothes, no modern hairstyles, no jewellery other than a cross or a rosary.
Each abbess is a bust portrait (head and shoulders), body slightly turned three-quarters, looking at the viewer, head in the upper half of her quarter, filling about 70% of her quarter. They must look like four clearly different women, recognisable even as tiny 40-pixel icons:
1. Top left: a gaunt, ascetic abbess in her seventies with sunken eyes, a coarse undyed sackcloth habit with a rope belt and a plain white hood, a serene faint smile.
2. Top right: a red-haired abbess in her thirties with a few curls escaping her veil, a gap-toothed grin and a sunburnt face, a navy-blue habit, a small lantern in her hand.
3. Bottom left: a stocky abbess in her sixties with a heavy brow, a monocle and a faint moustache shadow on her upper lip, a charcoal habit, holding a long wooden ruler.
4. Bottom right: a gentle, very old abbess in her nineties with pale cloudy blue eyes and a kind smile, a soft rose-beige habit, holding a sleeping cat.
The four abbesses must NOT touch or overlap each other or the edges: leave a wide empty gap of background between them.
Background: a perfectly flat, uniform pure magenta (#FF00FF) chroma-key background behind all four, no gradient, no texture, no shadow, no dividing lines, no grid lines, no frames. Do not use magenta or hot pink anywhere on the characters.
No text, no letters, no numbers, no watermark. Square 1:1 image.
```

Les 13 autres types : même modèle (sujet en tête, référence pour le style seulement), une fois l'abbesse validée.
