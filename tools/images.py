"""Grimdoku — prépare les images générées (fond magenta) pour le jeu.

Portraits : assets/characters/<type>.(png|jpg|jpeg) → recadrage sur le visage → <type>.webp
Grands personnages (cast.json, « shape ») : l'image montre le corps entier à la taille de sa forme sur la carte
            → <type>-full.webp (détouré, au format de la forme : 2:1, 3:1 ou carré pour l'angle)
            + <type>.webp (buste découpé autour de la tête, dont la place est fixée par le prompt : BIG_HEAD)
Mobilier  : assets/objects/<type>.(png|jpg|jpeg)    → recadrage au plus près de l'objet, centré → <type>.webp
Sols      : assets/floors/<matière>.(png|jpg|jpeg) → carré, raccordable (bords qui se répètent sans couture),
            contraste adouci et éclairci → <matière>.webp (une texture couvre 2×2 cases ; parchemin : cadre de la carte)
Portraits et mobilier : fond magenta (#FF00FF) → transparence, liseré rose retiré, 256 px, WebP.
build-app.js préfère ces .webp aux dessins <type>.svg quand ils existent.

Usage : .venv/bin/python tools/images.py   (installer une fois : python3 -m venv .venv && .venv/bin/pip install pillow)
"""
import json
import unicodedata
from pathlib import Path
from PIL import Image, ImageChops, ImageEnhance, ImageStat

ROOT = Path(__file__).resolve().parent.parent / 'assets'
DIR = ROOT / 'characters'
OBJ_DIR = ROOT / 'objects'
FLOOR_DIR = ROOT / 'floors'
HOME_DIR = ROOT / 'home'      # illustrations de l'écran d'accueil (accueil-large : paysage, accueil-haut : portrait)
HOME_WIDTH = 1600
HOME_CUTOUT = {'titre': 1400, 'jouer': 700}  # images détourées (fond magenta) : largeur max
FLOOR_SIZE = 320       # une texture = 2×2 cases
FLOOR_SOFT = 0.45      # part de couleur moyenne mélangée à la texture (contraste adouci : meubles et pions lisibles)
FLOOR_LIGHT = 1.12     # éclaircissement
FLOOR_EDGE = 0.04      # bord rogné avant traitement
# noms de fichiers tolérés pour un type d'objet (accents retirés automatiquement)
OBJ_ALIAS = {'champignon': 'champi', 'roseau': 'roseaux', 'stones': 'roche'}
# idem pour les personnages (fautes de frappe dans les noms de fichiers)
CHAR_ALIAS = {'bibliothequaire': 'bibliothecaire'}
OBJ_MARGIN = 0.06                      # marge autour de l'objet, en fraction du carré
OBJ_FULL = {'tapis'}                   # objets qui remplissent toute leur case (sans marge)
SIZE = 256
# « magenta-itude » d'un pixel : min(R, B) − G, de 0 (aucune) à 255 (magenta pur).
# Au-dessus de HIGH : fond (transparent) ; en dessous de LOW : personnage (opaque) ; entre les deux : bord adouci.
LOW, HIGH = 60, 150
GLASS = 22  # titre et bouton : teinte rosée minimale d'un verre enfermé dans le dessin (key_out_outside)
# Cadrage serré pour les pions ronds : carré de ZOOM × le côté de l'image, centré sur (CX, CY) en fraction de l'image
# (les portraits générés montrent tête + buste ; la tête est dans la moitié haute).
ZOOM, CX, CY = 0.68, 0.5, 0.42
# Réglages par type quand l'image générée est cadrée autrement : (ZOOM, CX, CY)
CROP = {
    'djinn': (0.72, 0.50, 0.37),      # chignon très haut
    'chevalier': (0.48, 0.52, 0.26),  # petit casque sur une grosse armure
    'sorciere': (0.80, 0.50, 0.40),   # grand chapeau
    'crapaud': (0.80, 0.50, 0.40),    # couronne au-dessus des yeux
    'chef': (0.78, 0.52, 0.39),       # toque haute
    'apprentie': (0.80, 0.48, 0.42),  # chapeau trop grand
    'ogre': (0.60, 0.45, 0.30),       # petite tête en haut d'un grand corps
    'perroquet': (0.62, 0.66, 0.30),  # tête à droite
}


# Grands personnages : format de l'image (largeur, hauteur en cases, forme de base de engine.js SHAPES)
SHAPE_BOX = {'I2': (2, 1), 'I3': (3, 1), 'L3': (2, 2)}
# tête dans l'image entière (fixée par le prompt) : (côté du carré en fraction de la hauteur, centre x, centre y en fraction)
BIG_HEAD = {'I2': (0.95, 0.22, 0.48), 'I3': (0.95, 0.15, 0.48), 'L3': (0.5, 0.25, 0.25)}
BIG_HEAD_TYPE = {  # réglages par type d'après les images générées
    'golem': (0.62, 0.12, 0.47),
    'vouivre': (0.80, 0.09, 0.47),
    'dragon': (0.44, 0.27, 0.17),
}
# allongés vus de dessus, tête à gauche : on redresse le buste d'un quart de tour (sens horaire, en degrés)
BIG_HEAD_TURN = {'I2': 90, 'I3': 90, 'L3': 0}
BIG_SIZE = 256      # pixels par case
# Buste des grands monstres (pions, fiches) : depuis que leur forme est propre à chaque affaire, cast.json ne donne plus de
# forme par type et big() ne s'applique plus ; leur image entière est recadrée ici autour de la tête.
# (côté du carré en fraction de la hauteur, centre x, centre y en fraction de l'image, quart de tour horaire pour
# redresser un monstre couché tête à gauche)
BIG_BUST = {
    'geant': (0.80, 0.17, 0.50, 90),
    'golem': (0.72, 0.14, 0.50, 90),
    'vouivre': (0.95, 0.13, 0.50, 90),
    'dragon': (0.50, 0.30, 0.24, 0),
}
CAST = json.loads((ROOT.parent / 'cast.json').read_text(encoding='utf-8'))
SHAPE_OF = {t: a['shape'] for t, a in CAST.items() if isinstance(a, dict) and a.get('shape')}


def key_out(img):
    img = img.convert('RGBA')
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, _ = px[x, y]
            m = min(r, b) - g
            if m <= LOW:
                continue
            if m >= HIGH:
                px[x, y] = (0, 0, 0, 0)
                continue
            alpha = round(255 * (HIGH - m) / (HIGH - LOW))
            # dé-magentisation du bord : on ramène R et B vers G pour effacer la teinte rose
            r2 = min(r, g + (r - g) // 3) if r > g else r
            b2 = min(b, g + (b - g) // 3) if b > g else b
            px[x, y] = (r2, g, b2, alpha)
    return img


def key_out_outside(img):
    """Détourage pour le titre et le bouton : seul le magenta relié au bord de l'image est du fond.
    Le magenta enfermé dans le dessin (verre de la loupe, que le générateur colore comme le fond) devient du verre bleu pâle."""
    from PIL import ImageDraw
    rgb = img.convert('RGB')
    w, h = rgb.size
    px = rgb.load()
    zone = Image.new('L', (w, h))  # 255 : teinte magenta ; puis 128 : magenta relié au bord (fond)
    zone.putdata([255 if min(r, b) - g > GLASS else 0 for r, g, b in rgb.getdata()])
    zp = zone.load()
    for x, y in [(x, 0) for x in range(w)] + [(x, h - 1) for x in range(w)] + [(0, y) for y in range(h)] + [(w - 1, y) for y in range(h)]:
        if zp[x, y] == 255:
            ImageDraw.floodfill(zone, (x, y), 128)
    # magenta enfermé : pur (trou d'une lettre, comme la boucle du « d ») → fond ;
    # atténué (verre de la loupe et ses reflets) → verre bleu pâle (on garde la luminosité, donc les reflets)
    for y in range(h):
        for x in range(w):
            if zp[x, y] == 255 and min(px[x, y][0], px[x, y][2]) - px[x, y][1] >= HIGH:
                zp[x, y] = 128
    for y in range(h):
        for x in range(w):
            if zp[x, y] == 255:
                r, g, b = px[x, y]
                v = (r + g + b) / 3
                px[x, y] = (round(min(255, v * .78)), round(min(255, v * .95)), round(min(255, v * 1.18 + 20)))
    out = key_out(rgb)
    op = out.load()
    for y in range(h):
        for x in range(w):
            if zp[x, y] == 255:  # le verre reste opaque
                op[x, y] = px[x, y] + (255,)
    return out


def type_name(stem):
    """« etagère » → « etagere », alias éventuels (« champignon » → « champi »)."""
    plain = unicodedata.normalize('NFD', stem.lower()).encode('ascii', 'ignore').decode()
    return OBJ_ALIAS.get(plain, plain)


def sources(folder):
    return sorted(p for p in folder.iterdir() if p.suffix.lower() in ('.png', '.jpg', '.jpeg'))


def big(src, name):
    """Grand personnage : image entière au format de sa forme, puis buste autour de la tête."""
    w, h = SHAPE_BOX[SHAPE_OF[name]]
    img = Image.open(src)
    scale = min(1, BIG_SIZE * 2 * max(w, h) / max(img.size))
    img = key_out(img.resize((round(img.width * scale), round(img.height * scale)), Image.LANCZOS))
    box = img.getchannel('A').point(lambda a: 255 if a > 24 else 0).getbbox()
    if box:
        img = img.crop(box)
    # au format exact de la forme (w × h cases), silhouette centrée sans déformation
    W, H = BIG_SIZE * w, BIG_SIZE * h
    k = min(W / img.width, H / img.height)
    img = img.resize((max(1, round(img.width * k)), max(1, round(img.height * k))), Image.LANCZOS)
    full = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    full.paste(img, ((W - img.width) // 2, (H - img.height) // 2))
    out = DIR / (name + '-full.webp')
    full.save(out, 'WEBP', quality=82, method=6)
    zoom, cx, cy = BIG_HEAD_TYPE.get(name, BIG_HEAD[SHAPE_OF[name]])
    side = round(H * zoom)
    left = min(max(0, round(W * cx - side / 2)), W - side)
    top = min(max(0, round(H * cy - side / 2)), H - side)
    full.crop((left, top, left + side, top + side)).rotate(-BIG_HEAD_TURN[SHAPE_OF[name]]).resize((SIZE, SIZE), Image.LANCZOS).save(DIR / (name + '.webp'), 'WEBP', quality=82, method=6)
    print(f'grand {src.name} → {out.name} + {name}.webp')


def portraits():
    for src in sources(DIR):
        name = CHAR_ALIAS.get(src.stem.lower(), src.stem.lower())
        if name in SHAPE_OF:
            big(src, name)
            continue
        img = Image.open(src)
        if name in BIG_BUST:
            # grand monstre (image entière, souvent couché vu de dessus) : buste carré autour de la tête, redressé
            frac, cx, cy, turn = BIG_BUST[name]
            side = round(img.height * frac)
            left = min(max(0, round(img.width * cx - side / 2)), img.width - side)
            top = min(max(0, round(img.height * cy - side / 2)), img.height - side)
            img = img.crop((left, top, left + side, top + side)).rotate(-turn)
            img = key_out(img.resize((SIZE * 2, SIZE * 2), Image.LANCZOS)).resize((SIZE, SIZE), Image.LANCZOS)
            img.save(DIR / (name + '.webp'), 'WEBP', quality=82, method=6)
            print(f'grand monstre {src.name} → {name}.webp (buste)')
            continue
        zoom, cx, cy = CROP.get(name, (ZOOM, CX, CY))
        side = round(min(img.size) * zoom)
        left = min(max(0, round(img.width * cx - side / 2)), img.width - side)
        top = min(max(0, round(img.height * cy - side / 2)), img.height - side)
        img = img.crop((left, top, left + side, top + side))
        # détourage à mi-résolution (plus rapide, bords plus nets après réduction)
        img = key_out(img.resize((SIZE * 2, SIZE * 2), Image.LANCZOS)).resize((SIZE, SIZE), Image.LANCZOS)
        out = DIR / (name + '.webp')
        img.save(out, 'WEBP', quality=82, method=6)
        print(f'portrait {src.name} → {out.name} ({out.stat().st_size // 1024} Ko)')


VAR_DIR = DIR / 'variantes'  # planches de variantes : <type>.(png|jpeg), 2 × 2 (ou plus) bustes sur fond magenta


def split_sheet(img):
    """Découpe une planche en silhouettes : bandes de lignes sans personnage, puis colonnes vides dans chaque bande
    (robuste si le générateur décale ses personnages ; il suffit qu'ils ne se touchent pas)."""
    rgb = img.convert('RGB')
    w, h = rgb.size
    px = rgb.load()
    on = lambda x, y: not (px[x, y][0] > 170 and px[x, y][2] > 170 and px[x, y][1] < 110)  # pas magenta
    step = 2
    def runs(flags, min_len):
        out, start = [], None
        for i, f in enumerate(flags + [False]):
            if f and start is None:
                start = i
            elif not f and start is not None:
                if i - start >= min_len:
                    out.append((start, i))
                start = None
        return out
    rows = [sum(on(x, y) for x in range(0, w, step * 4)) > 1 for y in range(0, h, step)]
    pieces = []
    for y0, y1 in runs(rows, 40 // step):
        y0, y1 = y0 * step, min(h, y1 * step)
        cols = [sum(on(x, y) for y in range(y0, y1, step * 4)) > 1 for x in range(0, w, step)]
        for x0, x1 in runs(cols, 40 // step):
            pieces.append((x0 * step, y0, min(w, x1 * step), y1))
    return pieces


def variants():
    # variantes de visages des victimes (François, 2026-10-20 : des visages différents sans 133 images) : une planche par
    # type → <type>-2.webp, <type>-3.webp… (même cadrage et détourage que les portraits)
    if not VAR_DIR.exists():
        return
    for src in sources(VAR_DIR):
        name = CHAR_ALIAS.get(src.stem.lower(), src.stem.lower())
        sheet = Image.open(src).convert('RGB')
        boxes = sorted(split_sheet(sheet), key=lambda b: (round(b[1] / 100), b[0]))  # lecture : ligne par ligne
        for i, (x0, y0, x1, y1) in enumerate(boxes):
            bust = sheet.crop((x0, y0, x1, y1))
            # sur un carré magenta, buste posé en bas au centre (coupé aux épaules), comme un portrait seul
            side = max(bust.size)
            sq = Image.new('RGB', (side, side), (255, 0, 255))
            sq.paste(bust, ((side - bust.width) // 2, side - bust.height))
            zoom, cx, cy = VAR_CROP
            c = round(side * zoom)
            left = min(max(0, round(side * cx - c / 2)), side - c)
            top = min(max(0, round(side * cy - c / 2)), side - c)
            img = sq.crop((left, top, left + c, top + c))
            img = key_out(img.resize((SIZE * 2, SIZE * 2), Image.LANCZOS)).resize((SIZE, SIZE), Image.LANCZOS)
            out = DIR / f'{name}-{i + 2}.webp'
            img.save(out, 'WEBP', quality=82, method=6)
        print(f'variantes {src.name} → {name}-2 à {name}-{len(boxes) + 1}.webp ({len(boxes)} visages)')


VAR_CROP = (0.86, 0.5, 0.42)  # cadrage des variantes dans leur carré (zoom, centre x, centre y)


def objects():
    for src in sources(OBJ_DIR):
        name = type_name(src.stem)
        img = key_out(Image.open(src).resize((SIZE * 2, SIZE * 2), Image.LANCZOS))
        box = img.getchannel('A').point(lambda a: 255 if a > 24 else 0).getbbox()  # silhouette de l'objet
        if box:
            img = img.crop(box)
        # centré dans un carré, avec une marge (sauf pour les objets qui couvrent toute la case)
        margin = 0 if name in OBJ_FULL else OBJ_MARGIN
        side = round(max(img.size) / (1 - 2 * margin))
        square = Image.new('RGBA', (side, side), (0, 0, 0, 0))
        square.paste(img, ((side - img.width) // 2, (side - img.height) // 2))
        out = OBJ_DIR / (name + '.webp')
        square.resize((SIZE, SIZE), Image.LANCZOS).save(out, 'WEBP', quality=82, method=6)
        print(f'objet {src.name} → {out.name} ({out.stat().st_size // 1024} Ko)')


def _diff(a, b):
    return ImageStat.Stat(ImageChops.difference(a, b)).mean[0]


def _shift_diff(img, ax, p):
    """Écart moyen entre l'image et elle-même décalée de p pixels sur l'axe ax (0 : x, 1 : y)."""
    w, h = img.size
    if ax == 0:
        return _diff(img.crop((0, 0, w - p, h)), img.crop((p, 0, w, h)))
    return _diff(img.crop((0, 0, w, h - p)), img.crop((0, p, w, h)))


def period(img, ax):
    """Période du motif sur un axe (motif régulier : damier, mosaïque, ou image déjà répétée par le générateur),
    ou None si le motif n'est pas périodique. Recherche à demi-résolution, puis affinée au pixel près."""
    g = img.convert('L')
    small = g.resize((g.width // 2, g.height // 2))
    size = small.size[ax]
    ref = _shift_diff(small, ax, size // 5)  # écart typique entre deux zones quelconques
    best = min(range(size // 16, size // 2 + 1), key=lambda q: _shift_diff(small, ax, q))
    if _shift_diff(small, ax, best) > 0.45 * ref:
        return None
    return min(range(best * 2 - 3, best * 2 + 4), key=lambda q: _shift_diff(g, ax, q))


def blend_axis(img, ax, band=0.15):
    """Raccord sur un axe sans motif régulier : vers les deux bords, fondu avec la copie décalée d'une demi-taille."""
    w, h = img.size
    shifted = ImageChops.offset(img, w // 2 if ax == 0 else 0, h // 2 if ax == 1 else 0)
    size, b = (w, h)[ax], (w, h)[ax] * band
    ramp = [round(255 * min(1, min(i, size - 1 - i) / b)) for i in range(size)]
    mask = Image.new('L', (w, h))
    mask.putdata([ramp[x] if ax == 0 else ramp[y] for y in range(h) for x in range(w)])
    return Image.composite(img, shifted, mask)


def seamless(img):
    """Texture raccordable, axe par axe : recadrée sur une période exacte si le motif est régulier
    (aucun fondu, donc pas d'image fantôme), sinon fondue sur une bande étroite près des bords."""
    blend = []
    for ax in (0, 1):
        p = period(img, ax)
        if p:
            # une période exacte, répétée pour garder l'échelle d'origine du motif
            size = img.size[ax]
            tile = img.crop((0, 0, p, img.height) if ax == 0 else (0, 0, img.width, p))
            k = max(1, round(size / p))
            img = Image.new(img.mode, (p * k, img.height) if ax == 0 else (img.width, p * k))
            for i in range(k):
                img.paste(tile, (i * p, 0) if ax == 0 else (0, i * p))
        else:
            blend.append(ax)
    for ax in blend:
        img = blend_axis(img, ax)
    return img


def floors():
    if not FLOOR_DIR.exists():
        return
    for src in sources(FLOOR_DIR):
        name = type_name(src.stem)
        img = Image.open(src).convert('RGB')
        side = round(min(img.size) * (1 - 2 * FLOOR_EDGE))  # sans les bords (traits ou bandes que les générateurs y laissent)
        img = img.crop(((img.width - side) // 2, (img.height - side) // 2, (img.width + side) // 2, (img.height + side) // 2))
        img = seamless(img.resize((FLOOR_SIZE * 3, FLOOR_SIZE * 3), Image.LANCZOS))
        if name not in ('parchemin', 'bureau'):  # le parchemin du cadre et le bureau du fond gardent leurs tons
            mean = tuple(round(v) for v in ImageStat.Stat(img).mean)
            img = Image.blend(img, Image.new('RGB', img.size, mean), FLOOR_SOFT)
            img = ImageEnhance.Brightness(img).enhance(FLOOR_LIGHT)
        out = FLOOR_DIR / (name + '.webp')
        size = FLOOR_SIZE * 2 if name == 'bureau' else FLOOR_SIZE  # le fond de page couvre de grandes surfaces
        img.resize((size, size), Image.LANCZOS).save(out, 'WEBP', quality=78, method=6)
        print(f'sol {src.name} → {out.name} ({out.stat().st_size // 1024} Ko)')


def home():
    if not HOME_DIR.exists():
        return
    sizes = {}
    for src in sources(HOME_DIR):
        name = src.stem.lower()
        if name in HOME_CUTOUT:
            # titre et bouton : fond magenta détouré, recadré sur le dessin
            img = key_out_outside(Image.open(src))
            box = img.getchannel('A').point(lambda a: 255 if a > 24 else 0).getbbox()
            if box:
                img = img.crop(box)
            if img.width > HOME_CUTOUT[name]:
                img = img.resize((HOME_CUTOUT[name], round(img.height * HOME_CUTOUT[name] / img.width)), Image.LANCZOS)
            out = HOME_DIR / (name + '.webp')
            img.save(out, 'WEBP', quality=90, method=6)
            sizes[name] = img.size
            print(f'accueil {src.name} → {out.name} {img.size} ({out.stat().st_size // 1024} Ko, détouré)')
            continue
        img = Image.open(src).convert('RGB')
        if img.width > HOME_WIDTH:
            img = img.resize((HOME_WIDTH, round(img.height * HOME_WIDTH / img.width)), Image.LANCZOS)
        out = HOME_DIR / (src.stem.lower() + '.webp')
        img.save(out, 'WEBP', quality=92, method=6)
        print(f'accueil {src.name} → {out.name} {img.size} ({out.stat().st_size // 1024} Ko)')
        sizes[name] = img.size
    (HOME_DIR / 'sizes.json').write_text(json.dumps(sizes), encoding='utf-8')  # proportions, pour le build


LEVEL_DIR = ROOT / 'levels'   # vignettes des niveaux : <0..5>.(png|jpeg), fond magenta → détourées
DECOR_DIR = ROOT / 'decors'   # illustrations des décors : <décor>.(png|jpeg), scène entière (pas de magenta)


def levels():
    if not LEVEL_DIR.exists():
        return
    from PIL import ImageDraw, ImageFilter
    for src in sources(LEVEL_DIR):
        img = key_out_outside(Image.open(src))
        # lueurs mêlées au fond magenta (halo de bougie) : la teinte rose devient un jaune orangé chaud
        img.putdata([(min(255, r + 30), max(g, round(r * .8)), round(g * .5), a) if r > g + 25 and b > g + 25 else (r, g, b, a)
                     for r, g, b, a in img.getdata()])
        # scène dessinée jusqu'aux bords (sol, table) : fondu ovale pour qu'elle se fonde dans le parchemin
        alpha = img.getchannel('A')
        ap, w, h = alpha.load(), img.width, img.height
        ring = [ap[x, y] for x in range(w) for y in (0, 1, h - 2, h - 1)] + [ap[x, y] for y in range(h) for x in (0, 1, w - 2, w - 1)]
        if sum(1 for v in ring if v > 128) > 0.3 * len(ring):  # le dessin touche les bords : c'est une scène, pas un objet
            m = Image.new('L', img.size, 0)
            ImageDraw.Draw(m).ellipse((img.width * .06, img.height * .06, img.width * .94, img.height * .94), fill=255)
            img.putalpha(ImageChops.multiply(alpha, m.filter(ImageFilter.GaussianBlur(img.width * .06))))
        box = img.getchannel('A').point(lambda a: 255 if a > 24 else 0).getbbox()
        if box:
            img = img.crop(box)
        img.thumbnail((360, 360), Image.LANCZOS)
        out = LEVEL_DIR / (src.stem.lower() + '.webp')
        img.save(out, 'WEBP', quality=88, method=6)
        print(f'niveau {src.name} → {out.name} {img.size} ({out.stat().st_size // 1024} Ko)')


def trim_white(img, frame=0.015):
    """Retire les bandes blanches que le générateur ajoute parfois sur les bords (lignes ou colonnes majoritairement
    presque blanches, depuis chaque bord), puis une petite marge pour le filet d'encre qui les borde souvent."""
    g = img.convert('L')
    w, h = g.size
    px = g.load()
    white = lambda xs: sum(1 for v in xs if v > 228) / len(xs) > 0.6
    row = lambda y: [px[x, y] for x in range(0, w, 4)]
    col = lambda x: [px[x, y] for y in range(0, h, 4)]
    top, bottom, left, right = 0, h - 1, 0, w - 1
    while top < h // 3 and white(row(top)): top += 1
    while bottom > 2 * h // 3 and white(row(bottom)): bottom -= 1
    while left < w // 3 and white(col(left)): left += 1
    while right > 2 * w // 3 and white(col(right)): right -= 1
    if (top, bottom, left, right) != (0, h - 1, 0, w - 1):  # il y avait des bandes : on enlève aussi le filet
        dx, dy = round(w * frame), round(h * frame)
        top, bottom, left, right = top + dy, bottom - dy, left + dx, right - dx
    return img.crop((left, top, right + 1, bottom + 1))


def decors():
    if not DECOR_DIR.exists():
        return
    for src in sources(DECOR_DIR):
        full = trim_white(Image.open(src).convert('RGB'))
        img = full.copy()
        img.thumbnail((720, 720), Image.LANCZOS)
        out = DECOR_DIR / (type_name(src.stem) + '.webp')
        img.save(out, 'WEBP', quality=84, method=6)
        print(f'décor {src.name} → {out.name} {img.size} ({out.stat().st_size // 1024} Ko)')
        # grande version : la scène d'un lieu, en plein écran, avec les sceaux des enquêtes (lore/lieux-zones.json)
        full.thumbnail((1600, 1600), Image.LANCZOS)
        (DECOR_DIR / 'grand').mkdir(exist_ok=True)
        out = DECOR_DIR / 'grand' / (type_name(src.stem) + '.webp')
        full.save(out, 'WEBP', quality=82, method=6)
        print(f'décor {src.name} → grand/{out.name} {full.size} ({out.stat().st_size // 1024} Ko)')


MAP_DIR = ROOT / 'map'
DESK_DIR = ROOT / 'desk'


def desk():
    # objets du bureau de l'enquêteur (assets/desk/<objet>.png|jpeg, fond magenta) : détourés, recadrés → <objet>.webp
    if not DESK_DIR.exists():
        return
    for src in sources(DESK_DIR):
        img = key_out_outside(Image.open(src))
        box = img.getchannel('A').point(lambda a: 255 if a > 24 else 0).getbbox()
        if box:
            img = img.crop(box)
        img.thumbnail((520, 520), Image.LANCZOS)
        out = DESK_DIR / (type_name(src.stem) + '.webp')
        img.save(out, 'WEBP', quality=88, method=6)
        print(f'bureau {src.name} → {out.name} {img.size} ({out.stat().st_size // 1024} Ko)')


ICON_DIR = ROOT / 'icon'     # icône de l'appli (icone.png|jpeg, carrée, fond plein jusqu'aux bords)
ICON_OUT = ICON_DIR / 'web'  # tailles produites, copiées par build-app.js à la racine du site
ICON_SAFE = 0.8              # icône « maskable » : sujet réduit dans les 80 % centraux (Android la découpe)
ICON_FAVICON = (120, 120, 920, 920)  # favicon : recadrée sur le sceau (lisible en 16 px), en pixels de l'image 1024


def icons():
    # icône PWA, icône Apple et favicon tirées de assets/icon/icone.*
    src = next((p for p in sources(ICON_DIR) if p.stem == 'icone'), None) if ICON_DIR.exists() else None
    if not src:
        return
    ICON_OUT.mkdir(exist_ok=True)
    img = Image.open(src).convert('RGB')
    img = img.resize((1024, 1024), Image.LANCZOS)
    corners = [img.getpixel(p) for p in ((0, 0), (1023, 0), (0, 1023), (1023, 1023))]
    bg = tuple(sorted(c[i] for c in corners)[1] for i in range(3))
    for name, size in (('icon-512', 512), ('icon-192', 192), ('apple-touch-icon', 180)):
        img.resize((size, size), Image.LANCZOS).save(ICON_OUT / f'{name}.png', optimize=True)
    mask = Image.new('RGB', (512, 512), bg)
    inner = round(512 * ICON_SAFE)
    mask.paste(img.resize((inner, inner), Image.LANCZOS), ((512 - inner) // 2,) * 2)
    mask.save(ICON_OUT / 'icon-maskable-512.png', optimize=True)
    fav = img.crop(ICON_FAVICON)
    fav.resize((32, 32), Image.LANCZOS).save(ICON_OUT / 'favicon-32.png', optimize=True)
    fav.resize((48, 48), Image.LANCZOS).save(ICON_OUT / 'favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)])
    print(f'icône {src.name} → {", ".join(sorted(p.name for p in ICON_OUT.iterdir()))}')


def carte():
    # carte de la baronnie (assets/map/brumeval.png|jpeg) → brumeval.webp, 2400 px de large au plus (servie à côté de la page)
    if not MAP_DIR.exists():
        return
    for src in sources(MAP_DIR):
        img = Image.open(src).convert('RGBA')
        img.thumbnail((2400, 2400), Image.LANCZOS)
        # fond blanc autour du parchemin déchiré → transparent : remplissage depuis les quatre coins (presque-blanc
        # compris), puis le liseré clair laissé par l'anticrénelage est effacé : contour rogné de 2 px, pixels presque
        # blancs ôtés dans une bande de 10 px le long du bord, arête adoucie
        from PIL import ImageDraw, ImageFilter, ImageChops
        w, h = img.size
        probe = img.convert('RGB')
        for xy in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)):
            if min(probe.getpixel(xy)) > 215:
                ImageDraw.floodfill(probe, xy, (255, 0, 255), thresh=60)
        bg = probe.point(lambda v: 0).convert('L')
        r, g, b = probe.split()
        bg = ImageChops.multiply(ImageChops.multiply(r.point(lambda v: 255 if v == 255 else 0), g.point(lambda v: 255 if v == 0 else 0)), b.point(lambda v: 255 if v == 255 else 0))
        if bg.getbbox():
            bg = bg.filter(ImageFilter.MaxFilter(5))                       # rogne 2 px
            band = ImageChops.subtract(bg.filter(ImageFilter.MaxFilter(21)), bg)  # 10 px le long du bord
            light = img.convert('L').point(lambda v: 255 if v > 205 else 0)
            bg = ImageChops.lighter(bg, ImageChops.multiply(band, light))
            alpha = ImageChops.invert(bg).filter(ImageFilter.GaussianBlur(.8))
            img.putalpha(ImageChops.multiply(img.getchannel('A'), alpha))
        out = MAP_DIR / (type_name(src.stem) + '.webp')
        img.save(out, 'WEBP', quality=86, method=6)
        print(f'carte {src.name} → {out.name} {img.size} ({out.stat().st_size // 1024} Ko)')


INK = (62, 40, 22)  # encre sépia des croquis


def ink_lines(rgb, blur=5, strength=1.8):
    """Croquis à la plume : niveaux de gris, « color dodge » sur l'inverse flouté, traits renforcés.
    Rend un masque L : 255 = encre, 0 = papier."""
    from PIL import ImageOps, ImageFilter, ImageMath
    ev = getattr(ImageMath, 'unsafe_eval', None) or ImageMath.eval
    g = ImageOps.grayscale(rgb)
    inv = ImageOps.invert(g).filter(ImageFilter.GaussianBlur(blur))
    d = ev("convert(min(g * 255 / max(255 - i, 1), 255), 'L')", g=g, i=inv)
    return ImageOps.invert(d.point(lambda x: max(0, 255 - int((255 - x) * strength))))


def fade_mask(w, h, bottom=.3):
    """Fondu d'esquisse inachevée : plein au centre, qui s'efface vers les bords (et davantage vers le bas)."""
    from PIL import ImageDraw, ImageFilter
    m = Image.new('L', (w, h), 0)
    ImageDraw.Draw(m).ellipse((-w * .12, -h * .2, w * 1.12, h * (1.1 - bottom)), fill=255)
    return m.filter(ImageFilter.GaussianBlur(min(w, h) * .09))


def sketches():
    # croquis du carnet (personnages) : portrait d'origine cadré en buste, à l'encre sépia sur fond transparent
    # → assets/characters/croquis/<type>.webp ; et croquis des lieux pour les feuilles épinglées du bureau
    # → assets/decors/croquis/<décor>.webp (décision de François, 2026-10-18 : pas de photos au Moyen Âge)
    from PIL import ImageChops
    n = 360
    out_dir = DIR / 'croquis'
    out_dir.mkdir(exist_ok=True)
    fade = fade_mask(n, n)
    for src in sources(DIR):
        name = CHAR_ALIAS.get(src.stem.lower(), src.stem.lower())
        img = Image.open(src)
        if name in BIG_BUST:  # grand monstre : même buste que son pion (BIG_BUST)
            frac, cx, cy, turn = BIG_BUST[name]
            side = round(img.height * frac)
            left = min(max(0, round(img.width * cx - side / 2)), img.width - side)
            top = min(max(0, round(img.height * cy - side / 2)), img.height - side)
            img = img.crop((left, top, left + side, top + side)).rotate(-turn)
        else:
            side = round(min(img.size) * .92)
            left = (img.width - side) // 2
            top = min(round(img.height * .03), img.height - side)
            img = img.crop((left, top, left + side, top + side))
        cut = key_out(img.resize((n * 2, n * 2), Image.LANCZOS)).resize((n, n), Image.LANCZOS)
        a = cut.getchannel('A')
        rgb = Image.composite(cut.convert('RGB'), Image.new('RGB', cut.size, 'white'), a)
        mask = ImageChops.multiply(ImageChops.multiply(ink_lines(rgb), a), fade)
        sk = Image.new('RGBA', (n, n), INK + (0,))
        sk.putalpha(mask)
        sk.save(out_dir / (name + '.webp'), 'WEBP', quality=86, method=6)
    print(f'croquis des personnages → {out_dir.relative_to(ROOT.parent)}/')
    if DECOR_DIR.exists():
        dec_dir = DECOR_DIR / 'croquis'
        dec_dir.mkdir(exist_ok=True)
        for src in sources(DECOR_DIR):
            img = trim_white(Image.open(src).convert('RGB'))
            img.thumbnail((480, 480), Image.LANCZOS)
            mask = ImageChops.multiply(ink_lines(img, blur=4, strength=1.6), fade_mask(*img.size, bottom=.05))
            sk = Image.new('RGBA', img.size, INK + (0,))
            sk.putalpha(mask)
            sk.save(dec_dir / (type_name(src.stem) + '.webp'), 'WEBP', quality=86, method=6)
        print(f'croquis des lieux → {dec_dir.relative_to(ROOT.parent)}/')


def main():
    portraits()
    variants()
    sketches()
    objects()
    floors()
    home()
    levels()
    decors()
    carte()
    desk()
    icons()


if __name__ == '__main__':
    main()
