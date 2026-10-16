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
const sprite = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${defs.join('')}</defs>${symbols.join('')}</svg>`;

const out = t.replace('/*__ENGINE__*/', () => engine)
  .replace('/*__PUZZLES__*/', () => JSON.stringify(puzzles))
  .replace('<!--__SPRITE__-->', () => sprite);
fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/grimdoku.html', out);
console.log('dist/grimdoku.html', out.length, 'octets,', symbols.length, 'dessins, dont', objImages, 'objet(s) et', images, 'portrait(s) illustrés,', bigImages, 'grand(s) personnage(s) en entier');
if (missing.length) console.log('⚠️  sans image (emoji provisoire) :', missing.join(', '));
