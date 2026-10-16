'use strict';
const fs = require('fs');
const E = require('./engine');
const t = fs.readFileSync('app/template.html', 'utf8');
const engine = fs.readFileSync('engine.js', 'utf8');
// de la plus facile à la plus dure (accueil et « Affaire suivante »), puis par score, puis par identifiant
const puzzles = fs.readdirSync('puzzles').sort().map(f => JSON.parse(fs.readFileSync('puzzles/' + f, 'utf8')))
  .sort((a, b) => a.difficulty - b.difficulty || a.rating.score - b.rating.score || a.id.localeCompare(b.id));

// mobilier : assets/objects/<type>.svg → un <symbol id="obj-<type>"> par objet, utilisé via <use href="#obj-…">
const defs = [], symbols = [];
// secours tant qu'un meuble ou un personnage n'a ni image (.webp) ni dessin (.svg) : son emoji, et un avertissement
const missing = [];
const emojiSymbol = (id, emoji) => `<symbol id="${id}" viewBox="0 0 64 64"><text x="32" y="34" font-size="44" text-anchor="middle" dominant-baseline="central">${emoji}</text></symbol>`;
let objImages = 0;
for (const type of Object.keys(E.OBJECTS)) {
  // une image <type>.webp (préparée par tools/images.py) a priorité sur le dessin <type>.svg
  const webp = `assets/objects/${type}.webp`;
  if (fs.existsSync(webp)) {
    symbols.push(`<symbol id="obj-${type}" viewBox="0 0 64 64"><image href="data:image/webp;base64,${fs.readFileSync(webp).toString('base64')}" width="64" height="64"/></symbol>`);
    objImages++;
    continue;
  }
  const file = `assets/objects/${type}.svg`;
  if (!fs.existsSync(file)) { symbols.push(emojiSymbol(`obj-${type}`, E.OBJECTS[type].icon)); missing.push('objet ' + type); continue; }
  let svg = fs.readFileSync(file, 'utf8').trim();
  svg = svg.replace(/<defs>([\s\S]*?)<\/defs>/, (_, d) => { defs.push(d); return ''; });
  const viewBox = (svg.match(/viewBox="([^"]+)"/) || [])[1] || '0 0 64 64';
  const body = svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
  symbols.push(`<symbol id="obj-${type}" viewBox="${viewBox}">${body}</symbol>`);
}
// portraits : assets/characters/<type>.svg → <symbol id="chr-<type>">, un par type de cast.json
const { ARCHETYPES } = require('./cast');
// Une image <type>.webp (portrait généré, préparé par tools/images.py) a priorité sur le dessin <type>.svg.
let images = 0;
for (const type of Object.keys(ARCHETYPES)) {
  const webp = `assets/characters/${type}.webp`;
  if (fs.existsSync(webp)) {
    const data = fs.readFileSync(webp).toString('base64');
    symbols.push(`<symbol id="chr-${type}" viewBox="0 0 64 64"><image href="data:image/webp;base64,${data}" width="64" height="64"/></symbol>`);
    images++;
    continue;
  }
  const file = `assets/characters/${type}.svg`;
  if (!fs.existsSync(file)) { symbols.push(emojiSymbol(`chr-${type}`, ARCHETYPES[type].icon)); missing.push('personnage ' + type); continue; }
  const svg = fs.readFileSync(file, 'utf8').trim();
  const viewBox = (svg.match(/viewBox="([^"]+)"/) || [])[1] || '0 0 64 64';
  symbols.push(`<symbol id="chr-${type}" viewBox="${viewBox}">${svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')}</symbol>`);
}
// grands personnages : image entière <type>-full.webp → <symbol id="big-<type>"> au format de sa forme (en cases)
const BOX = { I2: [2, 1], I3: [3, 1], L3: [2, 2] };
let bigImages = 0;
for (const [type, a] of Object.entries(ARCHETYPES)) {
  const full = `assets/characters/${type}-full.webp`;
  if (!a.shape) continue;
  if (!fs.existsSync(full)) { missing.push('grand personnage entier ' + type); continue; }
  const [w, h] = BOX[a.shape];
  symbols.push(`<symbol id="big-${type}" viewBox="0 0 ${w * 64} ${h * 64}"><image href="data:image/webp;base64,${fs.readFileSync(full).toString('base64')}" width="${w * 64}" height="${h * 64}"/></symbol>`);
  bigImages++;
}
// sols : assets/floors/<matière>.webp → une classe .fl-<matière> par matière (texture teintée par la couleur de la pièce) ;
// parchemin.webp → fond du cadre de la carte. Sans texture : couleur unie de la pièce (repli).
const floorsUsed = [...new Set(puzzles.flatMap(p => Object.values(p.rooms).map(r => r.floor)).filter(Boolean))].sort();
const floorCss = [];
for (const m of floorsUsed.concat('parchemin', 'bureau')) {
  const f = `assets/floors/${m}.webp`;
  if (!fs.existsSync(f)) { missing.push((m === 'bureau' ? 'fond ' : 'sol ') + m); continue; }
  const url = `url(data:image/webp;base64,${fs.readFileSync(f).toString('base64')})`;
  floorCss.push(m === 'parchemin' ? `:root { --parch-tex: ${url}; }` : m === 'bureau' ? `:root { --desk-tex: ${url}; }` : `.cell.fl-${m} { --floor: ${url}; }`);
}
// bords déchirés du parchemin (cadre de la carte) : bruit fractal qui déplace le contour
// version légère pour les fiches et les fenêtres (bords à peine irréguliers, le texte n'est pas filtré)
defs.push('<filter id="torn-s" x="-3%" y="-3%" width="106%" height="106%"><feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="5" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G"/></filter>');
defs.push('<filter id="torn" x="-4%" y="-4%" width="108%" height="108%"><feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" seed="11" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="11" xChannelSelector="R" yChannelSelector="G"/></filter>');
// écran d'accueil : assets/home/accueil-large.webp (paysage) et accueil-haut.webp (portrait, téléphone), en variables CSS
for (const [name, v] of [['accueil-large', '--hero-wide'], ['accueil-haut', '--hero-tall']]) {
  const f = `assets/home/${name}.webp`;
  if (fs.existsSync(f)) floorCss.push(`:root { ${v}: url(data:image/webp;base64,${fs.readFileSync(f).toString('base64')}); }`);
  // version portrait : utilisée sur téléphone à la place du paysage
  if (fs.existsSync(f) && name === 'accueil-haut') floorCss.push('@media (max-width: 699px) { .heroimg { background-image: var(--hero-tall); aspect-ratio: 9 / 16; max-height: 72vh; } }');
}
// titre et bouton « Jouer » de l'accueil : images détourées (assets/home/titre.webp, jouer.webp) ; sans elles, le texte
const homeSizes = fs.existsSync('assets/home/sizes.json') ? JSON.parse(fs.readFileSync('assets/home/sizes.json', 'utf8')) : {};
for (const [name, sel] of [['titre', '.herotitle .logo'], ['jouer', '.herobtn']]) {
  const f = `assets/home/${name}.webp`;
  if (!fs.existsSync(f) || !homeSizes[name]) { missing.push('accueil ' + name); continue; }
  const [w, h] = homeSizes[name];
  const url = `url(data:image/webp;base64,${fs.readFileSync(f).toString('base64')})`;
  floorCss.push(name === 'titre'
    ? `${sel} { display: block; margin: 0 auto; width: min(86%, 640px); aspect-ratio: ${w} / ${h}; background: ${url} center / contain no-repeat; font-size: 0; color: transparent; -webkit-text-stroke: 0; text-shadow: none; filter: drop-shadow(0 4px 10px rgba(0, 0, 0, .55)); }`
    : `${sel} { width: min(64vw, 300px); aspect-ratio: ${w} / ${h}; padding: 0; background: ${url} center / contain no-repeat; box-shadow: none; border-radius: 0; filter: drop-shadow(0 6px 12px rgba(0, 0, 0, .55)); } ${sel} span { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); } ${sel}:hover { transform: scale(1.04); }`);
}
const sprite = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${defs.join('')}</defs>${symbols.join('')}</svg>`;

const out = t.replace('/*__ENGINE__*/', () => engine)
  .replace('/*__PUZZLES__*/', () => JSON.stringify(puzzles))
  .replace('<!--__SPRITE__-->', () => sprite)
  .replace('/*__FLOORS__*/', () => floorCss.join('\n'));
fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/grimdoku.html', out);
console.log('dist/grimdoku.html', out.length, 'octets,', symbols.length, 'dessins, dont', objImages, 'objet(s) et', images, 'portrait(s) illustrés,', bigImages, 'grand(s) personnage(s) en entier');
if (missing.length) console.log('⚠️  sans image (emoji provisoire) :', missing.join(', '));
