'use strict';
const fs = require('fs');
const E = require('./engine');
const t = fs.readFileSync('app/template.html', 'utf8');
const engine = fs.readFileSync('engine.js', 'utf8');
const puzzles = fs.readdirSync('puzzles').sort().map(f => JSON.parse(fs.readFileSync('puzzles/' + f, 'utf8')));

// mobilier : assets/objects/<type>.svg → un <symbol id="obj-<type>"> par objet, utilisé via <use href="#obj-…">
const defs = [], symbols = [];
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
  if (!fs.existsSync(file)) throw new Error('dessin manquant : ' + file);
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
  if (!fs.existsSync(file)) throw new Error('portrait manquant : ' + file);
  const svg = fs.readFileSync(file, 'utf8').trim();
  const viewBox = (svg.match(/viewBox="([^"]+)"/) || [])[1] || '0 0 64 64';
  symbols.push(`<symbol id="chr-${type}" viewBox="${viewBox}">${svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')}</symbol>`);
}
const sprite = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${defs.join('')}</defs>${symbols.join('')}</svg>`;

const out = t.replace('/*__ENGINE__*/', () => engine)
  .replace('/*__PUZZLES__*/', () => JSON.stringify(puzzles))
  .replace('<!--__SPRITE__-->', () => sprite);
fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/grimdoku.html', out);
console.log('dist/grimdoku.html', out.length, 'octets,', symbols.length, 'dessins, dont', objImages, 'objet(s) et', images, 'portrait(s) illustrés');
