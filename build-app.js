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
// secours sans image : l'initiale dans un rond à l'encre (jamais d'emoji dans le jeu : François, 2026-10-20)
const letterSymbol = (id, name) => `<symbol id="${id}" viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="#efe0bd" stroke="#2b2016" stroke-width="3"/><text x="32" y="34" font-size="30" font-family="Georgia, serif" fill="#2b2016" text-anchor="middle" dominant-baseline="central">${String(name).normalize('NFD').replace(/[\u0300-\u036f]/g, '').charAt(0).toUpperCase()}</text></symbol>`;
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
  if (!fs.existsSync(file)) { symbols.push(letterSymbol(`obj-${type}`, E.OBJECTS[type].name)); missing.push('objet ' + type); continue; }
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
  if (!fs.existsSync(file)) { symbols.push(letterSymbol(`chr-${type}`, ARCHETYPES[type].name || type)); missing.push('personnage ' + type); continue; }
  const svg = fs.readFileSync(file, 'utf8').trim();
  const viewBox = (svg.match(/viewBox="([^"]+)"/) || [])[1] || '0 0 64 64';
  symbols.push(`<symbol id="chr-${type}" viewBox="${viewBox}">${svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')}</symbol>`);
}
// visages des victimes (François, 2026-10-20 : « que toutes les victimes aient un visage différent ») : pour chaque type
// d'invité, le portrait du type et ses variantes (assets/characters/<type>-N.webp, planches découpées par tools/images.py) ;
// chaque victime active reçoit un visage à elle (c.face), jamais deux fois le même dans tout le jeu tant qu'il y en a assez,
// et jamais deux fois le même dans un lieu. Variantes servies dans media/ (pas dans la page : elle resterait trop lourde).
const faceFiles = {};
{
  const actives = fs.existsSync('lore/actives.json') ? JSON.parse(fs.readFileSync('lore/actives.json', 'utf8')) : {};
  const order = Object.entries(actives).filter(([k]) => k !== '_doc').flatMap(([, ids]) => ids); // lieu par lieu
  const byType = {};
  for (const p of puzzles) {
    const v = p.characters.find(c => c.role === 'victim');
    if (!v || !ARCHETYPES[v.archetype] || !ARCHETYPES[v.archetype].guest) continue;
    (byType[v.archetype] = byType[v.archetype] || []).push({ p, v });
  }
  for (const [type, list] of Object.entries(byType)) {
    const variants = fs.readdirSync('assets/characters').filter(f => new RegExp(`^${type}-\\d+\\.webp$`).test(f))
      .sort((a, b) => +a.match(/-(\d+)\./)[1] - +b.match(/-(\d+)\./)[1]).map(f => f.replace(/\.webp$/, ''));
    if (!variants.length) continue;
    const faces = [type, ...variants];
    // victimes actives d'abord, dans l'ordre des lieux ; les grilles désactivées ensuite (visages réutilisés)
    const rank = (x) => { const i = order.indexOf(x.p.id); return i < 0 ? 1e6 : i; };
    list.sort((a, b) => rank(a) - rank(b) || a.p.id.localeCompare(b.p.id));
    list.forEach((x, i) => {
      let k = i % faces.length;
      // dans un même lieu, jamais deux fois le même visage
      const taken = new Set(list.slice(0, i).filter(y => y.p.place === x.p.place).map(y => y.v.face));
      for (let n = 0; n < faces.length && taken.has(faces[k]); n++) k = (k + 1) % faces.length;
      x.v.face = faces[k];
    });
    for (const f of variants) faceFiles[f] = `assets/characters/${f}.webp`;
  }
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
const media = { audio: {}, levels: [], decors: [], desk: {}, deskDeco: [], sketches: [], placeSketches: [], mur: {}, pieces: [] };
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
for (const obj of ['dossiers', 'lettres', 'carnet', 'enveloppe', 'mur', 'jour', 'piece', 'papier-1', 'papier-2', 'papier-3', 'support-papier', 'clou-fer', 'clou-laiton', 'clou-rouille', 'clou-tete', 'corde-rouge', 'bouton-retour', 'bouton-son', 'bouton-muet', 'bouton-aide', 'bouton-options', 'bouton-principal', 'bouton-secondaire', 'outil-indice', 'outil-crayon', 'outil-annuler', 'outil-effacer']) {
  const f = `assets/desk/${obj}.webp`;
  if (fs.existsSync(f)) { copyMedia(f, `desk-${obj}.webp`); media.desk[obj] = `media/desk-${obj}.webp`; }
}
const PIECES = JSON.parse(fs.readFileSync('lore/pieces.json', 'utf8')).pieces; // pièces à conviction (phase 3)
// page du mur (assets/mur/<élément>.webp : tableau de liège encadré, papiers vierges, punaise) et pièces à conviction
// (assets/pieces/<lieu>.webp), préparés par tools/images.py ; sans image, dessin CSS ou nom seul
for (const k of ['tableau', 'liege', 'note', 'carte', 'bande', 'punaise']) {
  const f = `assets/mur/${k}.webp`;
  if (fs.existsSync(f)) { copyMedia(f, `mur-${k}.webp`); media.mur[k] = `media/mur-${k}.webp`; }
}
for (const pl of Object.keys(PIECES)) {
  const f = `assets/pieces/${pl}.webp`;
  if (fs.existsSync(f)) { copyMedia(f, `piece-${pl}.webp`); media.pieces.push(pl); }
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
for (const [f, src] of Object.entries(faceFiles)) {
  copyMedia(src, `visage-${f}.webp`);
  symbols.push(`<symbol id="chr-${f}" viewBox="0 0 64 64"><image href="media/visage-${f}.webp" width="64" height="64"/></symbol>`);
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
// scènes des lieux : le décor en grand (assets/decors/grand/<décor>.webp) et les sceaux des enquêtes posés dessus
// (lore/lieux-zones.json : places en % de l'illustration, de la plus facile à la plus dure) ; sans places, la liste
const ZONES = JSON.parse(fs.readFileSync('lore/lieux-zones.json', 'utf8'));
media.scenes = {};
for (const [pl, z] of Object.entries(ZONES.lieux)) {
  const f = `assets/decors/grand/${z.decor}.webp`;
  if (!fs.existsSync(f)) { missing.push('décor en grand ' + z.decor); continue; }
  copyMedia(f, `scene-${z.decor}.webp`); // pas « decor-grand-… » : decor-grand-port serait aussi le petit décor du grand port
  media.scenes[pl] = { img: `media/scene-${z.decor}.webp`, ratio: z.ratio, places: z.places };
}
const SITE_PAGES = ['dist', 'deploy/grimdoku/site'];
// pages annexes (confidentialité, retour de connexion Google) et leur habillage commun, à la racine du site ;
// leurs textures (parchemin, bois du bureau) dans media/
for (const d of SITE_PAGES) {
  fs.mkdirSync(d, { recursive: true });
  for (const f of ['connexion.html', 'confidentialite.html', 'pages.css']) { fs.copyFileSync(`app/${f}`, `${d}/${f}`); fs.chmodSync(`${d}/${f}`, 0o644); }
}
// page des statistiques (stats/, derrière le mot de passe de la relecture : nginx location /stats/) : titre, lieu, taille et
// difficulté calculée de chaque grille, jamais de solution
const statsMeta = {};
for (const p of puzzles) statsMeta[p.id] = { t: p.title, pl: p.place || p.decor, pn: String(p.title).split(' — ')[0], n: p.size, d: p.difficulty, ...(p.off ? { off: 1 } : {}) };
const statsPage = fs.readFileSync('app/stats.html', 'utf8').replace('/*__META__*/{}', () => JSON.stringify(statsMeta).replace(/</g, '\\u003c'));
for (const d of SITE_PAGES) { fs.mkdirSync(`${d}/stats`, { recursive: true }); fs.writeFileSync(`${d}/stats/index.html`, statsPage); fs.chmodSync(`${d}/stats/index.html`, 0o644); }
for (const [src, name] of [['assets/floors/parchemin.webp', 'parchemin.webp'], ['assets/floors/bureau.webp', 'fond-bureau.webp']]) if (fs.existsSync(src)) copyMedia(src, name);
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
// fil rouge pendant le jeu (phase 2) : mur de l'affaire de la Tour, déclics, visites à la Tour
const FIL_ROUGE = (() => { const f = JSON.parse(fs.readFileSync('lore/fil-rouge.json', 'utf8')); delete f._doc; return f; })();
// découvertes du carnet (phase 2) : par habitué, débloquées au fil des rencontres
const CARNET = (() => { const f = JSON.parse(fs.readFileSync('lore/carnet-decouvertes.json', 'utf8')); delete f._doc; return f; })();
// rangs de l'enquêteur (phase 3) : promotions signées par Dagobert
const RANGS = JSON.parse(fs.readFileSync('lore/rangs.json', 'utf8')).rangs;
const INTROS = fs.existsSync('lore/intros.json') ? JSON.parse(fs.readFileSync('lore/intros.json', 'utf8')).lieux : {}; // ouvertures des intros par lieu
const lore = { prologue: PROLOGUE, need: LETTRES.need, letters: LETTRES.letters, troupe: {}, contrees: CARTE.contrees, pos: CARTE.pos, ratio: CARTE.ratio || [3, 2], start: CARTE.start, unlock: CARTE.unlock || {}, intros: INTROS, filRouge: FIL_ROUGE, carnet: CARNET, rangs: RANGS, pieces: PIECES };
for (const [t, a] of Object.entries(ARCHETYPES)) if (!a.guest) lore.troupe[t] = { name: a.name, desc: a.desc, tic: a.tic };
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
  .replace('/*__FLOORS__*/', () => floorCss.join('\n'))
  // place de chaque pièce à conviction sur le bureau : [gauche, haut, largeur] en % de la carte, angle en degrés ;
  // « dessus » : posée par-dessus les objets du bureau (lampe : elle tient sur une pile, rien ne tient sur elle) ; « miroir » : retournée (« horizontal » : sur l'axe horizontal, sinon sur l'axe vertical)
  .replace('/*__PIECES__*/', () => Object.entries(PIECES).filter(([, p]) => p.place).map(([pl, p]) => `.desk-piece.pc-${pl} { left: ${p.place[0]}%; top: ${p.place[1]}%; width: ${p.place[2]}%; transform: rotate(${p.place[3]}deg)${p.miroir === 'horizontal' ? ' scaleY(-1)' : p.miroir ? ' scaleX(-1)' : ''};${p.dessus ? ' z-index: 5;' : ''} }`).join('\n'));
fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/grimdoku.html', out);
console.log('dist/grimdoku.html', out.length, 'octets,', symbols.length, 'dessins, dont', objImages, 'objet(s) et', images, 'portrait(s) illustrés');
if (missing.length) console.log('ATTENTION sans image (initiale provisoire) :', missing.join(', '));
