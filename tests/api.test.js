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
    .replace('const ACCOUNT = null;', 'const ACCOUNT = {"clientId":"test"};');
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
