// Grimdoku — le site en local, comme en ligne : la page (deploy/grimdoku/site) et la sauvegarde en ligne (/api/,
// deploy/grimdoku/api/server.js, vraie connexion Google), pour tester l'inscription au registre de bout en bout.
// node tools/local.js  puis http://localhost:8095 (adresse de retour autorisée dans la console Google).
// Progressions de test hors du projet (API_DATA, par défaut dans le dossier temporaire), cookie sans « Secure » (http).
'use strict';
const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { createServer, googleVerifier } = require('../deploy/grimdoku/api/server.js');

const ROOT = path.join(__dirname, '..');
const SITE = path.join(ROOT, 'deploy/grimdoku/site');
const PORT = +process.env.PORT || 8095;
const DATA = process.env.API_DATA || path.join(os.tmpdir(), 'grimdoku-api-local');
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'deploy/grimdoku/api/config.json'), 'utf8'));
fs.mkdirSync(DATA, { recursive: true });
const sf = path.join(DATA, 'secret');
if (!fs.existsSync(sf)) fs.writeFileSync(sf, require('crypto').randomBytes(32).toString('hex'), { mode: 0o600 });
const api = createServer({ dataDir: DATA, secret: fs.readFileSync(sf, 'utf8').trim(), verify: googleVerifier(cfg.googleClientId), origins: cfg.origins || [], secure: false })
  .listeners('request')[0];

const TYPES = { '.html': 'text/html; charset=utf-8', '.webp': 'image/webp', '.png': 'image/png', '.ico': 'image/x-icon', '.mp3': 'audio/mpeg', '.m4a': 'audio/mp4', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.js': 'text/javascript', '.css': 'text/css' };
// votes et compteur anonyme, comme nginx (deploy/grimdoku/nginx.conf) : réponse vide, une ligne au même format dans
// DATA/notes.log et DATA/stats.log (résumé : sh tools/stats.sh <DATA>/stats.log)
const LOGS = { '/note': ['notes.log', ['g', 'd', 'v', 's', 'n']], '/stat': ['stats.log', ['e', 'v', 'g', 'n']] };
http.createServer((req, res) => {
  const u = new URL(req.url, 'http://localhost');
  if (LOGS[u.pathname]) {
    const [file, args] = LOGS[u.pathname];
    const t = new Date().toISOString().replace(/\.\d+Z$/, '+00:00');
    fs.appendFileSync(path.join(DATA, file), [t, ...args.map(a => u.searchParams.get(a) || '-')].join(' ') + '\n');
    res.writeHead(204, { 'Cache-Control': 'no-store' }); return res.end();
  }
  if (req.url.startsWith('/api/')) { req.url = req.url.slice(4); return api(req, res); } // comme nginx : /api/x → /x
  // page des statistiques : ses journaux sont ceux du dossier de données (en ligne : logs/, derrière un mot de passe)
  const JOURNAUX = { '/stats/journal': 'stats.log', '/stats/notes': 'notes.log' };
  if (JOURNAUX[u.pathname]) {
    const f = path.join(DATA, JOURNAUX[u.pathname]);
    if (!fs.existsSync(f)) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' }); return fs.createReadStream(f).pipe(res);
  }
  if (u.pathname === '/stats') { res.writeHead(301, { Location: '/stats/' }); return res.end(); }
  let rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  if (rel.endsWith('/')) rel += 'index.html';
  const f = path.join(SITE, rel);
  if (!f.startsWith(SITE + path.sep) || !fs.existsSync(f) || !fs.statSync(f).isFile()) { res.writeHead(404); return res.end('introuvable'); }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
  fs.createReadStream(f).pipe(res);
}).listen(PORT, '127.0.0.1', () => console.log(`Grimdoku en local, avec /api/ : http://localhost:${PORT}/ (données de test : ${DATA})`));
