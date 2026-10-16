"""Grimdoku — prépare les images générées (fond magenta) pour le jeu.

Portraits : assets/characters/<type>.(png|jpg|jpeg) → recadrage sur le visage → <type>.webp
Grands personnages (cast.json, « shape ») : l'image montre le corps entier à la taille de sa forme sur la carte
            → <type>-full.webp (détouré, au format de la forme : 2:1, 3:1 ou carré pour l'angle)
            + <type>.webp (buste découpé autour de la tête, dont la place est fixée par le prompt : BIG_HEAD)
Mobilier  : assets/objects/<type>.(png|jpg|jpeg)    → recadrage au plus près de l'objet, centré → <type>.webp
Dans les deux cas : fond magenta (#FF00FF) → transparence, liseré rose retiré, 256 px, WebP.
build-app.js préfère ces .webp aux dessins <type>.svg quand ils existent.

Usage : .venv/bin/python tools/images.py   (installer une fois : python3 -m venv .venv && .venv/bin/pip install pillow)
"""
import json
import unicodedata
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent / 'assets'
DIR = ROOT / 'characters'
OBJ_DIR = ROOT / 'objects'
# noms de fichiers tolérés pour un type d'objet (accents retirés automatiquement)
OBJ_ALIAS = {'champignon': 'champi', 'roseau': 'roseaux'}
# idem pour les personnages (fautes de frappe dans les noms de fichiers)
CHAR_ALIAS = {'bibliothequaire': 'bibliothecaire'}
OBJ_MARGIN = 0.06                      # marge autour de l'objet, en fraction du carré
OBJ_FULL = {'tapis'}                   # objets qui remplissent toute leur case (sans marge)
SIZE = 256
# « magenta-itude » d'un pixel : min(R, B) − G, de 0 (aucune) à 255 (magenta pur).
# Au-dessus de HIGH : fond (transparent) ; en dessous de LOW : personnage (opaque) ; entre les deux : bord adouci.
LOW, HIGH = 60, 150
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


def main():
    portraits()
    objects()


if __name__ == '__main__':
    main()
