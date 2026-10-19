// Grimdoku — sauvegarde en ligne de la progression des joueurs (grimdoku.fcold.org/api/, derrière nginx ; conteneur
// grimdoku-api, sans port). Connexion Google : la page reçoit un jeton d'identité (Google Identity Services) et l'envoie à
// /login ; on vérifie sa signature (clés publiques de Google), son destinataire (notre identifiant client), son émetteur et
// sa date, puis on ne garde que l'empreinte de l'identifiant Google (sub) : ni nom, ni adresse. Session : cookie signé
// (HMAC, secret tiré au premier lancement dans API_DATA/secret), HttpOnly, limité à /api/.
// Routes : POST /login {credential} · GET /progress → {rev, data} · PUT /progress {data, rev} (409 + état du serveur si
//          rev est périmé : la page fusionne et renvoie) · POST /logout · DELETE /account (efface la progression en ligne)
// Données : API_DATA/users/<empreinte>.json {rev, t, data}. Réglages : config.json (googleClientId, origins).
'use strict';
const http = require('http');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const MAX_BODY = 1 << 20;
const COOKIE = 'grimdoku_session';
const AGE = 400 * 24 * 3600; // durée de la session (s)
const b64 = (s) => Buffer.from(s, 'base64url').toString('utf8');
const fail = (code, message) => Object.assign(new Error(message), { code });

// vérifie un jeton d'identité Google et renvoie son identifiant (sub)
function googleVerifier(clientId) {
  let keys = null, until = 0;
  async function certs(fresh) {
    if (keys && !fresh && Date.now() < until) return keys;
    const r = await fetch('https://www.googleapis.com/oauth2/v3/certs');
    if (!r.ok) throw new Error('clés Google : ' + r.status);
    const age = /max-age=(\d+)/.exec(r.headers.get('cache-control') || '');
    keys = (await r.json()).keys;
    until = Date.now() + (age ? +age[1] : 3600) * 1000;
    return keys;
  }
  return async (token) => {
    if (!clientId) throw new Error('identifiant client Google absent');
    const [h, p, s] = String(token || '').split('.');
    if (!s) throw new Error('jeton illisible');
    const head = JSON.parse(b64(h)), claims = JSON.parse(b64(p));
    if (head.alg !== 'RS256') throw new Error('algorithme refusé');
    const find = (list) => list.find(k => k.kid === head.kid);
    const jwk = find(await certs()) || find(await certs(true)); // clés renouvelées par Google
    if (!jwk) throw new Error('clé inconnue');
    const ok = crypto.verify('RSA-SHA256', Buffer.from(h + '.' + p), crypto.createPublicKey({ key: jwk, format: 'jwk' }), Buffer.from(s, 'base64url'));
    if (!ok) throw new Error('signature invalide');
    if (!['accounts.google.com', 'https://accounts.google.com'].includes(claims.iss)) throw new Error('émetteur refusé');
    if (claims.aud !== clientId) throw new Error('destinataire refusé');
    if (!(claims.exp * 1000 > Date.now())) throw new Error('jeton expiré');
    if (!claims.sub) throw new Error('identifiant absent');
    return String(claims.sub);
  };
}

function createServer({ dataDir, secret, verify, origins = [], secure = true }) {
  const users = path.join(dataDir, 'users');
  fs.mkdirSync(users, { recursive: true });
  const sign = (v) => crypto.createHmac('sha256', secret).update(v).digest('base64url');
  const session = (uid) => { const v = Buffer.from(JSON.stringify({ u: uid, t: Date.now() })).toString('base64url'); return v + '.' + sign(v); };
  function who(req) {
    const m = new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`).exec(req.headers.cookie || '');
    if (!m) return null;
    const [v, s] = m[1].split('.');
    if (!s) return null;
    const a = Buffer.from(sign(v)), b = Buffer.from(s);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
    try {
      const o = JSON.parse(b64(v));
      return Date.now() - o.t < AGE * 1000 && /^[0-9a-f]{64}$/.test(o.u) ? o.u : null;
    } catch (e) { return null; }
  }
  const file = (uid) => path.join(users, uid + '.json');
  const read = (uid) => { try { return JSON.parse(fs.readFileSync(file(uid), 'utf8')); } catch (e) { return { rev: 0, data: {} }; } };
  const write = (uid, o) => { const f = file(uid), tmp = f + '.tmp'; fs.writeFileSync(tmp, JSON.stringify(o)); fs.renameSync(tmp, f); };
  const cookie = (v, age) => `${COOKIE}=${v}; Path=/api/; Max-Age=${age}; HttpOnly; SameSite=Lax${secure ? '; Secure' : ''}`;
  const body = (req) => new Promise((ok, ko) => {
    const parts = []; let n = 0;
    req.on('data', (c) => { n += c.length; if (n > MAX_BODY) { ko(fail(413, 'trop volumineux')); req.destroy(); } else parts.push(c); });
    req.on('end', () => { try { ok(JSON.parse(Buffer.concat(parts).toString('utf8') || '{}')); } catch (e) { ko(fail(400, 'JSON illisible')); } });
    req.on('error', ko);
  });

  return http.createServer(async (req, res) => {
    const send = (code, o, headers = {}) => {
      res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers });
      res.end(JSON.stringify(o));
    };
    const url = req.url.split('?')[0];
    try {
      if (req.method !== 'GET') {
        // écritures : seulement depuis la page du jeu, et en JSON (un autre site ne peut pas en envoyer sans pré-vol CORS)
        if (req.headers.origin && !origins.includes(req.headers.origin)) return send(403, { error: 'origine refusée' });
        if (req.method !== 'DELETE' && !/^application\/json\b/.test(req.headers['content-type'] || '')) return send(415, { error: 'JSON attendu' });
      }
      if (req.method === 'POST' && url === '/login') {
        const { credential } = await body(req);
        let sub;
        try { sub = await verify(credential); } catch (e) { console.error('connexion refusée :', e.message); return send(401, { error: 'connexion refusée' }); }
        const uid = crypto.createHash('sha256').update('grimdoku:' + sub).digest('hex');
        return send(200, { ok: true }, { 'Set-Cookie': cookie(session(uid), AGE) });
      }
      if (req.method === 'POST' && url === '/logout') return send(200, { ok: true }, { 'Set-Cookie': cookie('', 0) });
      const uid = who(req);
      if (!uid) return send(401, { error: 'non connecté' });
      if (req.method === 'GET' && url === '/progress') { const o = read(uid); return send(200, { rev: o.rev, data: o.data }); }
      if (req.method === 'PUT' && url === '/progress') {
        const { data, rev } = await body(req);
        if (!data || typeof data !== 'object' || Array.isArray(data)) return send(400, { error: 'attendu : { data, rev }' });
        const o = read(uid);
        if (rev !== o.rev) return send(409, { rev: o.rev, data: o.data });
        write(uid, { rev: o.rev + 1, t: Date.now(), data });
        return send(200, { ok: true, rev: o.rev + 1 });
      }
      if (req.method === 'DELETE' && url === '/account') {
        fs.rmSync(file(uid), { force: true });
        return send(200, { ok: true }, { 'Set-Cookie': cookie('', 0) });
      }
      send(404, { error: 'introuvable' });
    } catch (e) {
      if (!e.code) console.error(e);
      if (!res.headersSent) send(e.code || 500, { error: e.code ? e.message : 'erreur' });
    }
  });
}

module.exports = { createServer, googleVerifier };

if (require.main === module) {
  const dataDir = process.env.API_DATA || path.join(__dirname, '..', 'api-data');
  const cfg = JSON.parse(fs.readFileSync(process.env.API_CONFIG || path.join(__dirname, 'config.json'), 'utf8'));
  fs.mkdirSync(dataDir, { recursive: true });
  const sf = path.join(dataDir, 'secret');
  if (!fs.existsSync(sf)) fs.writeFileSync(sf, crypto.randomBytes(32).toString('hex'), { mode: 0o600 });
  const server = createServer({
    dataDir, secret: fs.readFileSync(sf, 'utf8').trim(), verify: googleVerifier(cfg.googleClientId),
    origins: cfg.origins || [], secure: process.env.API_INSECURE !== '1',
  });
  const port = +(process.env.PORT || 8097), host = process.env.HOST || '127.0.0.1';
  server.listen(port, host, () => console.log(`Sauvegarde Grimdoku : http://${host}:${port}/ (${cfg.googleClientId ? 'Google prêt' : 'identifiant client Google absent'})`));
}
