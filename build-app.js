'use strict';
const fs = require('fs');
const E = require('./engine');
const t = fs.readFileSync('app/template.html', 'utf8');
const engine = fs.readFileSync('engine.js', 'utf8');
// par taille de carte, puis de la plus facile à la plus dure, sans l'afficher (pages des tailles, « Affaire suivante ») :
// difficulté, score, puis identifiant
const puzzles = fs.readdirSync('puzzles').sort().map(f => JSON.parse(fs.readFileSync('puzzles/' + f, 'utf8')))
  .sort((a, b) => a.size - b.size || a.difficulty - b.difficulty || a.rating.score - b.rating.score || a.id.localeCompare(b.id));
// grilles actives de chaque lieu (lore/actives.json, tools/actives.js) : les autres restent dans les données, désactivées
// (« off » : ni dans les lieux ni ouvrables), pour pouvoir les réactiver sans rien régénérer
if (fs.existsSync('lore/actives.json')) {
  const on = new Set(Object.entries(JSON.parse(fs.readFileSync('lore/actives.json', 'utf8'))).filter(([k]) => k !== '_doc').flatMap(([, ids]) => ids));
  for (const p of puzzles) if (!p.final && !on.has(p.id)) p.off = true;
}

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
// grands personnages : leur portrait (<type>.webp, buste tiré de l'image entière par tools/images.py) sur chacune de leurs cases
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
    ? `${sel} { display: block; margin: 0 auto; width: min(92%, 520px); aspect-ratio: ${w} / ${h}; background: ${url} center / contain no-repeat; font-size: 0; color: transparent; -webkit-text-stroke: 0; text-shadow: none; filter: drop-shadow(0 4px 10px rgba(0, 0, 0, .55)); }`
    : `${sel} { width: min(46vw, 170px); aspect-ratio: ${w} / ${h}; padding: 0; background: ${url} center / contain no-repeat; box-shadow: none; border-radius: 0; filter: drop-shadow(0 6px 12px rgba(0, 0, 0, .55)); } ${sel} span { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); } ${sel}:hover { transform: scale(1.04); }`);
}
// Médias servis à côté de la page (dossier media/, pas en base64 : la page reste légère) :
// sons d'ambiance (assets/audio/menu|carte.*), vignettes des niveaux (assets/levels/<n>.webp), décors (assets/decors/<décor>.webp)
const { execFileSync } = require('child_process');
const MEDIA = ['dist/media', 'deploy/grimdoku/site/media'];
MEDIA.forEach(d => { fs.rmSync(d, { recursive: true, force: true }); fs.mkdirSync(d, { recursive: true }); }); // vidé : rien de périmé en ligne
const media = { audio: {}, levels: [], decors: [], desk: {}, deskDeco: [], sketches: [], placeSketches: [] };
// lisibles par le serveur web quelle que soit leur origine (un fichier sorti d'un zip peut être en 600)
const copyMedia = (src, name) => MEDIA.forEach(d => { fs.copyFileSync(src, `${d}/${name}`); fs.chmodSync(`${d}/${name}`, 0o644); });
for (const track of ['menu', 'carte']) {
  const src = ['m4a', 'mp3', 'ogg', 'wav'].map(e => `assets/audio/${track}.${e}`).find(f => fs.existsSync(f));
  if (!src) { missing.push('son ' + track); continue; }
  let file = src;
  if (src.endsWith('.wav')) { // trop lourd : converti en AAC (afconvert, macOS)
    file = `dist/${track}.m4a`;
    execFileSync('afconvert', ['-f', 'm4af', '-d', 'aac', src, file]);
  }
  const name = `${track}.${file.split('.').pop()}`;
  copyMedia(file, name);
  media.audio[track] = `media/${name}`;
}
for (let d = 0; d <= 5; d++) {
  const f = `assets/levels/${d}.webp`;
  if (fs.existsSync(f)) { copyMedia(f, `niveau-${d}.webp`); media.levels[d] = `media/niveau-${d}.webp`; } else missing.push('vignette niveau ' + d);
}
// objets du bureau de l'enquêteur (assets/desk/<objet>.webp, préparés par tools/images.py) : sans image, dessin CSS
for (const obj of ['dossiers', 'lettres', 'carnet', 'enveloppe', 'papier-1', 'papier-2', 'papier-3', 'support-papier', 'clou-fer', 'clou-laiton', 'clou-rouille', 'clou-tete', 'corde-rouge', 'bouton-retour', 'bouton-son', 'bouton-muet', 'bouton-aide', 'bouton-options', 'bouton-principal', 'bouton-secondaire', 'outil-indice', 'outil-crayon', 'outil-annuler']) {
  const f = `assets/desk/${obj}.webp`;
  if (fs.existsSync(f)) { copyMedia(f, `desk-${obj}.webp`); media.desk[obj] = `media/desk-${obj}.webp`; }
}
// croquis à la plume (préparés par tools/images.py) : personnages pour le carnet (assets/characters/croquis/<type>.webp),
// lieux pour les feuilles épinglées du bureau (assets/decors/croquis/<décor>.webp)
for (const [dir, key, prefix] of [['assets/characters/croquis', 'sketches', 'croquis-'], ['assets/decors/croquis', 'placeSketches', 'croquis-lieu-']]) {
  if (fs.existsSync(dir)) for (const f of fs.readdirSync(dir).filter(n => n.endsWith('.webp')).sort()) {
    copyMedia(`${dir}/${f}`, prefix + f); media[key].push(f.replace(/\.webp$/, ''));
  }
}
// décor du bureau (assets/desk/deco-<objet>.webp : loupe, encrier, bougie…), dans l'ordre alphabétique
if (fs.existsSync('assets/desk')) for (const f of fs.readdirSync('assets/desk').filter(n => /^deco-.*\.webp$/.test(n)).sort()) {
  copyMedia(`assets/desk/${f}`, `desk-${f}`); media.deskDeco.push(`media/desk-${f}`);
}
// carte de la baronnie (assets/map/brumeval.webp, préparée par tools/images.py) : servie à côté de la page
{
  const img = JSON.parse(fs.readFileSync('lore/carte.json', 'utf8')).image || 'brumeval'; // illustration retenue
  const f = `assets/map/${img}.webp`;
  if (fs.existsSync(f)) { copyMedia(f, 'carte-brumeval.webp'); media.map = 'media/carte-brumeval.webp'; } else missing.push('carte ' + img);
}
for (const decor of [...new Set(puzzles.map(p => p.decor).filter(Boolean))].sort()) {
  const f = `assets/decors/${decor}.webp`;
  if (fs.existsSync(f)) { copyMedia(f, `decor-${decor}.webp`); media.decors.push(decor); } else missing.push('décor ' + decor);
}
// icône de l'appli (assets/icon/web, produite par tools/images.py) : favicon, icône Apple et manifeste PWA,
// à la racine du site (le navigateur demande /favicon.ico de lui-même)
const SITE = ['dist', 'deploy/grimdoku/site'];
const ICONS = ['favicon.ico', 'favicon-32.png', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png'];
let iconTags = '';
if (ICONS.every(f => fs.existsSync(`assets/icon/web/${f}`))) {
  const manifest = {
    name: 'Grimdoku', short_name: 'Grimdoku', lang: 'fr',
    description: 'Enquêtes de logique dans la baronnie de Brumeval',
    start_url: './', scope: './', display: 'standalone', orientation: 'any',
    background_color: '#16111d', theme_color: '#16111d',
    icons: [
      { src: 'icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
  for (const d of SITE) {
    for (const f of ICONS) { fs.copyFileSync(`assets/icon/web/${f}`, `${d}/${f}`); fs.chmodSync(`${d}/${f}`, 0o644); }
    fs.writeFileSync(`${d}/manifest.webmanifest`, JSON.stringify(manifest, null, 2) + '\n');
    fs.chmodSync(`${d}/manifest.webmanifest`, 0o644);
  }
  iconTags = '<link rel="icon" href="favicon.ico" sizes="16x16 32x32 48x48">\n<link rel="icon" type="image/png" sizes="32x32" href="favicon-32.png">\n<link rel="apple-touch-icon" href="apple-touch-icon.png">\n<link rel="manifest" href="manifest.webmanifest">';
} else missing.push('icône (assets/icon/icone.*)');
// bible du jeu : lettres d'Augure (lore/lettres.json) et troupe récurrente (cast.json : nom fixe, trait, tic) pour le carnet
const LETTRES = JSON.parse(fs.readFileSync('lore/lettres.json', 'utf8'));
const CARTE = JSON.parse(fs.readFileSync('lore/carte.json', 'utf8'));
const PROLOGUE = JSON.parse(fs.readFileSync('lore/prologue.json', 'utf8')).scenes;
const lore = { prologue: PROLOGUE, need: LETTRES.need, letters: LETTRES.letters, troupe: {}, contrees: CARTE.contrees, pos: CARTE.pos, ratio: CARTE.ratio || [3, 2], start: CARTE.start, unlock: CARTE.unlock || {} };
for (const [t, a] of Object.entries(ARCHETYPES)) if (!a.guest) lore.troupe[t] = { name: a.name, desc: a.desc, tic: a.tic, icon: a.icon };
const sprite = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${defs.join('')}</defs>${symbols.join('')}</svg>`;

// sauvegarde en ligne (compte Google) : fusion des progressions (app/sync.js) et identifiant client Google
// (deploy/grimdoku/api/config.json, public par nature) ; sans identifiant, rien n'apparaît dans le jeu
const syncJs = fs.readFileSync('app/sync.js', 'utf8');
const apiCfg = JSON.parse(fs.readFileSync('deploy/grimdoku/api/config.json', 'utf8'));
const account = apiCfg.googleClientId ? { clientId: apiCfg.googleClientId } : null;
const out = t.replace('/*__ENGINE__*/', () => engine)
  .replace('/*__SYNC__*/', () => syncJs)
  .replace('/*__ACCOUNT__*/null', () => JSON.stringify(account))
  .replace('/*__PUZZLES__*/', () => JSON.stringify(puzzles))
  .replace('/*__MEDIA__*/', () => JSON.stringify(media))
  .replace('/*__LORE__*/', () => JSON.stringify(lore))
  .replace('<!--__SPRITE__-->', () => sprite)
  .replace('<!--__ICONS__-->', () => iconTags)
  .replace('/*__FLOORS__*/', () => floorCss.join('\n'));
fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/grimdoku.html', out);
console.log('dist/grimdoku.html', out.length, 'octets,', symbols.length, 'dessins, dont', objImages, 'objet(s) et', images, 'portrait(s) illustrés');
if (missing.length) console.log('⚠️  sans image (emoji provisoire) :', missing.join(', '));
