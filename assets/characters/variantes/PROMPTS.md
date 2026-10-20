# Variantes de visages des victimes — prompts

Un visage différent par victime (François, 2026-10-20 : « je veux vraiment éviter les doublons »). Par type de victime,
**4 planches de 4 bustes** (2 × 2), chaque buste décrit nommément : 16 visages tous différents, dont un de réserve.

Fichiers : `assets/characters/variantes/<type>.png`, `<type>-2.png`, `<type>-3.png`, `<type>-4.png` (ou `.jpeg`).
Puis `.venv/bin/python tools/images.py` → `assets/characters/<type>-2.webp` à `<type>-17.webp` (découpe automatique).

Joindre à chaque fois le portrait actuel du type (`assets/characters/<type>.jpeg`), **pour le style seulement**.

## Début commun (à coller en tête de chaque planche)

```
Use the attached portrait ONLY as a style reference (same Franco-Belgian comic book style, bold clean black ink outlines, flat colors with light cel shading, same muted earthy palette). Do NOT copy the character of the reference: none of the four people below may look like it.
Draw FOUR clearly different people arranged in a 2 x 2 grid, each one a bust portrait (head and shoulders), body slightly turned three-quarters, looking at the viewer, head in the upper half of its quarter, filling about 70% of its quarter. Each must be recognisable as a different person even as a tiny 40-pixel icon: different face shape, age, skin tone, hair or headwear, colours and accessory, exactly as described.
The four characters must NOT touch or overlap each other or the edges: leave a wide empty gap of background between them.
Background: a perfectly flat, uniform pure magenta (#FF00FF) chroma-key background behind all four, no gradient, no texture, no shadow, no dividing lines, no grid lines, no frames. Do not use magenta or hot pink anywhere on the characters.
No text, no letters, no numbers, no watermark. Square 1:1 image.
```

## Abbesse (15 victimes)

**`abbesse.png`**
```
Top left: a tall, very thin abbess in her sixties with a long pale horse-like face and hollow cheeks, a white wimple and a pale grey habit, a heavy iron key ring in her hand, stern narrowed eyes.
Top right: a short, round, rosy-cheeked abbess in her fifties with a double chin and a big warm smile, a cream wimple and a sky-blue habit, holding a basket of bread loaves.
Bottom left: a very old, tiny, hunched abbess in her nineties with a deeply wrinkled dark brown face and a toothless grin, a black habit, leaning on a gnarled wooden walking stick.
Bottom right: a young abbess in her thirties with freckles, a sharp nose and an ambitious smirk, a dark green habit, holding a quill and a ledger.
```

**`abbesse-2.png`**
```
Top left: a broad-shouldered, muscular abbess in her forties with a square jaw and a broken nose, a rust-red habit with rolled-up sleeves, holding a big wooden ladle.
Top right: an elegant aristocratic abbess in her fifties with high cheekbones, olive skin and thin painted eyebrows, a deep purple habit with a gold pectoral cross, a haughty look.
Bottom left: a nervous, bird-like abbess in her sixties with a long thin neck, huge round eyes and thick spectacles, a light brown habit, clutching a stack of scrolls to her chest.
Bottom right: a jovial abbess in her seventies with a big red nose and laughing crinkled eyes, a white habit with a black veil, raising a pewter mug of beer.
```

**`abbesse-3.png`**
```
Top left: a severe abbess in her fifties with very dark skin, a strong chin and a perfectly straight posture, an ivory habit with a black scapular, holding a closed ornate prayer book.
Top right: a dreamy, absent-minded abbess in her forties with a soft oval face, half-closed eyes and a smudge of ink on her cheek, a lavender-grey habit, a sprig of herbs tucked behind her veil.
Bottom left: a scowling old abbess in her eighties with bushy white eyebrows, a hairy mole on her chin and a hooked nose, a mustard-yellow habit, shaking a bony fist.
Bottom right: a plump, sly abbess in her fifties with small shrewd eyes and dimples, a teal habit, counting gold coins in her palm.
```

**`abbesse-4.png`**
```
Top left: a gaunt, ascetic abbess in her seventies with sunken eyes and a shaved scalp under a simple white hood, a coarse undyed sackcloth habit, a rope belt, a serene faint smile.
Top right: a red-haired abbess in her thirties with wild curls escaping her short veil, a gap-toothed grin and a sunburnt face, a navy-blue habit, a small lantern in her hand.
Bottom left: a stocky abbess in her sixties with a heavy brow, a monocle and a stern moustache-like shadow on her upper lip, a charcoal habit, holding a long wooden ruler.
Bottom right: a gentle, very old abbess in her nineties with silver hair visible at her temples, pale blue cloudy eyes and a kind smile, a soft rose-beige habit, holding a sleeping cat.
```

Les 13 autres types (colporteur, messager, nageuse, alchimiste, baronne, dresseuse, percepteur, cousine, inspecteur,
touriste, chasseuse, huissier, troubadour) : même principe, une fois l'abbesse validée.
