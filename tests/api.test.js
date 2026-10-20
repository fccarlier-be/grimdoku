// Sauvegarde en ligne : fusion des progressions (app/sync.js) et serveur (deploy/grimdoku/api/server.js),
// avec un faux vérificateur de jeton Google.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { merge, same } = require('../app/sync.js');
const { createServer } = require('../deploy/grimdoku/api/server.js');

test('fusion : listes réunies, réglages laissés sur l\'appareil, affaire la plus récente', () => {
  const local = { settings: { volume: 1 }, compte: true, lettres: ['taverne'], 'p:a': { solved: false, pos: { x: [0, 0] }, t: 20 }, 'p:b': { solved: true, t: 5 }, prologue: false, 'seen:a': true };
  const remote = { lettres: ['moulin', 'taverne'], 'p:a': { solved: true, t: 10 }, 'p:b': { solved: false, pos: {}, t: 30 }, 'p:c': { solved: true }, prologue: true };
  const m = merge(local, remote);
  assert.deepStrictEqual(m.lettres.sort(), ['moulin', 'taverne']);
  assert.ok(!('settings' in m) && !('compte' in m));
  assert.strictEqual(m['p:a'].t, 20);       // plus récent
  assert.strictEqual(m['p:b'].t, 30);       // même si non résolue (« Rejouer »)
  assert.ok(m['p:c'].solved);               // venue de l'autre appareil
  assert.strictEqual(m.prologue, true);
  assert.strictEqual(m['seen:a'], true);
  // sans date (anciennes sauvegardes) : la résolue, puis la plus avancée
  assert.ok(merge({ 'p:a': { solved: false, pos: { a: 1, b: 2 } } }, { 'p:a': { solved: true } })['p:a'].solved);
  assert.strictEqual(Object.keys(merge({ 'p:a': { pos: { a: 1 } } }, { 'p:a': { pos: { a: 1, b: 2 } } })['p:a'].pos).length, 2);
  assert.ok(same({ a: 1, b: [1, { c: 2 }] }, { b: [1, { c: 2 }], a: 1 }));
});

async function withServer(fn) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'grimdoku-api-'));
  const verify = async (t) => { if (!String(t).startsWith('ok:')) throw new Error('refusé'); return t.slice(3); };
  const server = createServer({ dataDir: dir, secret: 'test', verify, origins: ['https://grimdoku.fcold.org'], secure: false });
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = `http://127.0.0.1:${server.address().port}`;
  const call = (method, url, { body, cookie, origin, type = 'application/json' } = {}) => fetch(base + url, {
    method, body: body === undefined ? undefined : JSON.stringify(body),
    headers: { ...(body !== undefined ? { 'Content-Type': type } : {}), ...(cookie ? { Cookie: cookie } : {}), ...(origin ? { Origin: origin } : {}) },
  });
  try { await fn(call, dir); } finally { server.close(); fs.rmSync(dir, { recursive: true, force: true }); }
}
const sessionOf = (r) => (r.headers.get('set-cookie') || '').split(';')[0];

test('serveur : connexion, lecture, écriture, conflit, déconnexion, effacement', () => withServer(async (call, dir) => {
  assert.strictEqual((await call('GET', '/progress')).status, 401);
  assert.strictEqual((await call('POST', '/login', { body: { credential: 'faux' } })).status, 401);
  const login = await call('POST', '/login', { body: { credential: 'ok:12345' }, origin: 'https://grimdoku.fcold.org' });
  assert.strictEqual(login.status, 200);
  assert.match(login.headers.get('set-cookie'), /HttpOnly/);
  const cookie = sessionOf(login);
  assert.deepStrictEqual(await (await call('GET', '/progress', { cookie })).json(), { rev: 0, data: {} });
  const w = await call('PUT', '/progress', { cookie, body: { data: { lettres: ['taverne'] }, rev: 0 } });
  assert.deepStrictEqual(await w.json(), { ok: true, rev: 1 });
  const stale = await call('PUT', '/progress', { cookie, body: { data: {}, rev: 0 } });
  assert.strictEqual(stale.status, 409);
  assert.deepStrictEqual((await stale.json()).data, { lettres: ['taverne'] });
  // même compte Google, autre appareil : même progression ; on ne garde qu'une empreinte, pas l'identifiant
  const other = sessionOf(await call('POST', '/login', { body: { credential: 'ok:12345' } }));
  assert.strictEqual((await (await call('GET', '/progress', { cookie: other })).json()).rev, 1);
  const files = fs.readdirSync(path.join(dir, 'users'));
  assert.ok(files.length === 1 && !files[0].includes('12345'));
  // garde-fous : autre site, pas de JSON, cookie falsifié
  assert.strictEqual((await call('PUT', '/progress', { cookie, body: { data: {}, rev: 1 }, origin: 'https://ailleurs.example' })).status, 403);
  assert.strictEqual((await call('PUT', '/progress', { cookie, body: { data: {}, rev: 1 }, type: 'text/plain' })).status, 415);
  assert.strictEqual((await call('GET', '/progress', { cookie: cookie.replace(/.$/, c => c === 'A' ? 'B' : 'A') })).status, 401);
  assert.match((await call('POST', '/logout', { body: {} })).headers.get('set-cookie'), /Max-Age=0/);
  assert.strictEqual((await call('DELETE', '/account', { cookie })).status, 200);
  assert.deepStrictEqual(await (await call('GET', '/progress', { cookie })).json(), { rev: 0, data: {} });
}));

test('page : connectée, elle fusionne sa progression avec celle du serveur', () => withServer(async (call) => {
  const { JSDOM } = require('jsdom');
  const cookie = sessionOf(await call('POST', '/login', { body: { credential: 'ok:777' } }));
  await call('PUT', '/progress', { cookie, body: { data: { lettres: ['moulin'], prologue: true }, rev: 0 } });
  const html = fs.readFileSync(path.join(__dirname, '..', 'dist', 'grimdoku.html'), 'utf8')
    .replace(/const ACCOUNT = [^;]*;/, 'const ACCOUNT = {"clientId":"test"};');
  const dom = new JSDOM(html, {
    runScripts: 'dangerously', url: 'http://localhost/', pretendToBeVisual: true,
    beforeParse(w) {
      w.scrollTo = () => {};
      w.localStorage.setItem('grimdoku:compte', 'true');
      w.localStorage.setItem('grimdoku:lettres', JSON.stringify(['taverne']));
      w.localStorage.setItem('grimdoku:settings', JSON.stringify({ volume: 0.3 }));
      // fetch de la page → serveur de test, avec le cookie de session (HttpOnly : le navigateur l'ajoute seul)
      w.fetch = (url, o = {}) => call(o.method || 'GET', '/' + url.replace(/^api\//, ''), { cookie, body: o.body ? JSON.parse(o.body) : undefined });
    },
  });
  try {
    for (let i = 0; i < 50 && !(await (await call('GET', '/progress', { cookie })).json()).data.lettres.includes('taverne'); i++) await new Promise(r => setTimeout(r, 100));
    const srv = (await (await call('GET', '/progress', { cookie })).json()).data;
    assert.deepStrictEqual(srv.lettres.sort(), ['moulin', 'taverne']);
    assert.ok(!('settings' in srv) && !('compte' in srv));
    assert.deepStrictEqual(JSON.parse(dom.window.localStorage.getItem('grimdoku:lettres')).sort(), ['moulin', 'taverne']);
    assert.strictEqual(dom.window.localStorage.getItem('grimdoku:prologue'), 'true');
  } finally { dom.window.close(); }
}));

// registre de Brumeval (François, 2026-10-20) : bouton du jeu → page Google dans le même onglet (openid seulement)
// → connexion.html vérifie state et nonce, ouvre la session et ramène au jeu, à l'écran de départ
test('inscription au registre : bouton du jeu, page Google, retour sur connexion.html puis au jeu', async () => {
  const { JSDOM } = require('jsdom');
  const html = fs.readFileSync(path.join(__dirname, '..', 'dist', 'grimdoku.html'), 'utf8')
    .replace(/const ACCOUNT = [^;]*;/, 'const ACCOUNT = {"clientId":"test"};');
  const left = [];
  const dom = new JSDOM(html, {
    runScripts: 'dangerously', url: 'https://grimdoku.fcold.org/', pretendToBeVisual: true,
    beforeParse(w) {
      w.scrollTo = () => {};
      w.localStorage.setItem('grimdoku:prologue', 'true');
      w.fetch = async () => ({ ok: false, status: 401, json: async () => ({}) });
    },
  });
  const w = dom.window, d = w.document;
  try {
    w.grimLeave = (u) => left.push(u);
    w.grimGo('bureau');
    d.getElementById('opts').click();
    const btn = d.getElementById('registreBtn');
    assert.match(btn.textContent, /Inscription au registre de Brumeval/);
    assert.match(btn.textContent, /connexion avec Google/);
    d.getElementById('privacyBtn').click();
    assert.deepStrictEqual(left, ['confidentialite.html#/bureau'], 'Confidentialité : un bouton, qui ramènera au bureau');
    left.length = 0;
    btn.click();
    const u = new URL(left[0]);
    assert.strictEqual(u.origin + u.pathname, 'https://accounts.google.com/o/oauth2/v2/auth');
    assert.strictEqual(u.searchParams.get('scope'), 'openid', 'ni nom ni adresse demandés');
    assert.strictEqual(u.searchParams.get('response_type'), 'id_token');
    assert.strictEqual(u.searchParams.get('redirect_uri'), 'https://grimdoku.fcold.org/connexion.html');
    const req = JSON.parse(w.localStorage.getItem('grimdoku:oauth'));
    assert.strictEqual(u.searchParams.get('state'), req.state);
    assert.strictEqual(u.searchParams.get('nonce'), req.nonce);
    assert.strictEqual(req.back, '#/bureau', 'on reviendra au bureau');

    // retour de Google sur connexion.html (même site, même stockage)
    const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
    const token = (nonce) => [b64({ alg: 'RS256' }), b64({ sub: '42', nonce }), 'sig'].join('.');
    const page = fs.readFileSync(path.join(__dirname, '..', 'dist', 'connexion.html'), 'utf8');
    const back = async (hash, store) => {
      const posted = [];
      const c = new JSDOM(page, {
        runScripts: 'dangerously', url: 'https://grimdoku.fcold.org/connexion.html#' + hash,
        beforeParse(cw) {
          for (const [k, v] of Object.entries(store)) cw.localStorage.setItem(k, v);
          cw.fetch = async (url, o) => { posted.push([url, JSON.parse(o.body)]); return { ok: true }; };
        },
      });
      await new Promise(r => setTimeout(r, 50));
      const cd = c.window.document;
      const out = { posted, msg: cd.getElementById('msg').textContent, link: cd.querySelector('#back a').getAttribute('href'),
        compte: c.window.localStorage.getItem('grimdoku:compte'), inscrit: c.window.localStorage.getItem('grimdoku:inscrit'), url: c.window.location.href };
      c.window.close();
      return out;
    };
    const saved = { 'grimdoku:oauth': w.localStorage.getItem('grimdoku:oauth') };
    const bad = await back(`id_token=${token('autre')}&state=${req.state}`, saved);
    assert.deepStrictEqual(bad.posted, [], 'nonce différent : refusé');
    assert.strictEqual(bad.link, './#/bureau', 'lien de retour vers l\'écran de départ');
    const stale = await back(`id_token=${token(req.nonce)}&state=faux`, saved);
    assert.deepStrictEqual(stale.posted, [], 'state différent : refusé');
    const ok = await back(`id_token=${token(req.nonce)}&state=${req.state}`, saved);
    assert.deepStrictEqual(ok.posted, [['api/login', { credential: token(req.nonce) }]]);
    assert.strictEqual(ok.compte, 'true');
    assert.strictEqual(ok.inscrit, '1');
    assert.ok(!ok.url.includes('id_token'), 'le jeton ne reste pas dans l\'adresse');
    assert.match(ok.msg, /inscrit au registre/);
  } finally { w.close(); }

  // de retour dans le jeu : le message, une seule fois, et la sauvegarde active
  const toasts = new JSDOM(html, {
    runScripts: 'dangerously', url: 'https://grimdoku.fcold.org/#/bureau', pretendToBeVisual: true,
    beforeParse(w) {
      w.scrollTo = () => {};
      w.localStorage.setItem('grimdoku:prologue', 'true');
      w.localStorage.setItem('grimdoku:compte', 'true');
      w.localStorage.setItem('grimdoku:inscrit', '1');
      w.fetch = async () => ({ ok: false, status: 401, json: async () => ({}) });
    },
  });
  try {
    assert.match(toasts.window.document.body.textContent, /inscrit au registre de Brumeval/);
    assert.strictEqual(toasts.window.localStorage.getItem('grimdoku:inscrit'), null, 'message montré une seule fois');
  } finally { toasts.window.close(); }
});
