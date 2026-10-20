# Aperçu des variantes de visages d'un type (portrait actuel + variantes, en ronds comme dans le jeu) → apercus/<type>-visages.png
# Usage : .venv/bin/python tools/variantes-apercu.py <type>
import sys
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent
t = sys.argv[1]
fs = [ROOT / f'assets/characters/{t}.webp'] + sorted((ROOT / 'assets/characters').glob(f'{t}-*.webp'), key=lambda p: int(p.stem.rsplit('-', 1)[1]))
cols = 6; rows = (len(fs) + cols - 1) // cols
sheet = Image.new('RGB', (cols * 270, rows * 290), (60, 45, 35)); d = ImageDraw.Draw(sheet)
for i, f in enumerate(fs):
    im = Image.open(f).convert('RGBA').resize((240, 240))
    bg = Image.new('RGBA', (240, 240), (239, 224, 189, 255)); bg.alpha_composite(im)
    m = Image.new('L', (240, 240), 0); ImageDraw.Draw(m).ellipse((0, 0, 239, 239), fill=255)
    x, y = (i % cols) * 270 + 15, (i // cols) * 290 + 10
    sheet.paste(bg, (x, y), m); d.text((x + 105, y + 250), 'actuel' if i == 0 else str(i + 1), fill=(240, 220, 180))
out = ROOT / 'apercus' / f'{t}-visages.png'
sheet.save(out); print(out, len(fs) - 1, 'variantes')
