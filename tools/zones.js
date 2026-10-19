// Grimdoku — placement des sceaux des scènes de lieux (lore/lieux-zones.json), à la main (François, 2026-10-20 : « un
// petit outil pour que je puisse les placer manuellement »). En local : node tools/zones.js  puis http://localhost:8098
// On choisit un lieu, on fait glisser les sceaux sur le décor en grand ; chaque sceau lâché est enregistré aussitôt.
// Sceau n° 1 = l'enquête la plus facile du lieu (même ordre que dans le jeu) ; « Annuler » revient en arrière.
// Ensuite : node build-app.js pour voir le résultat dans le jeu.
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PORT = +process.env.PORT || 8098;
const F_ZONES = path.join(ROOT, 'lore/lieux-zones.json');
const J = (f) => JSON.parse(fs.readFileSync(path.join(ROOT, f), 'utf8'));

// les enquêtes actives de chaque lieu, dans l'ordre du jeu (build-app.js : taille, difficulté, note, identifiant)
function cases() {
  const on = new Set(Object.entries(J('lore/actives.json')).filter(([k]) => k !== '_doc').flatMap(([, ids]) => ids));
  const all = fs.readdirSync(path.join(ROOT, 'puzzles')).filter(f => f.endsWith('.json')).sort().map(f => J('puzzles/' + f))
    .sort((a, b) => a.size - b.size || a.difficulty - b.difficulty || a.rating.score - b.rating.score || a.id.localeCompare(b.id))
    .filter(p => !p.final && on.has(p.id));
  const by = {};
  for (const p of all) {
    const v = p.characters.find(c => c.role === 'victim');
    (by[p.place] = by[p.place] || []).push({ id: p.id, title: p.title, size: p.size, difficulty: p.difficulty, victim: v.name, archetype: v.archetype });
  }
  return by;
}

// même mise en forme que le fichier écrit à la main : une place [x, y] par ligne
const dump = (z) => JSON.stringify(z, null, 2).replace(/\[\s+([\d.-]+),\s+([\d.-]+)\s+\]/g, '[$1, $2]') + '\n';
const write = (obj) => { fs.writeFileSync(F_ZONES + '.tmp', dump(obj)); fs.renameSync(F_ZONES + '.tmp', F_ZONES); };

const PAGE = `<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Sceaux des lieux</title>
<style>
  :root { --bg: #1c1712; --fg: #efe3cc; --muted: #a8977a; --line: #3b3127; --accent: #e0a64b; }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--fg); font: 15px/1.4 system-ui, sans-serif; display: grid; grid-template-columns: 210px 1fr; min-height: 100vh; }
  nav { border-right: 1px solid var(--line); padding: 10px; overflow-y: auto; max-height: 100vh; position: sticky; top: 0; }
  nav button { display: block; width: 100%; text-align: left; padding: 6px 8px; margin: 1px 0; border: 0; border-radius: 6px; background: none; color: var(--fg); font: inherit; cursor: pointer; }
  nav button:hover { background: #2a231b; }
  nav button.on { background: #3a2e20; color: var(--accent); }
  nav small { color: var(--muted); }
  main { padding: 14px 20px; }
  header { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; flex-wrap: wrap; }
  h1 { margin: 0; font-size: 20px; }
  #state { color: var(--muted); font-size: 13px; }
  #state.ok { color: #8fc78f; }
  #state.err { color: #e57b6b; }
  header button { padding: 6px 12px; border-radius: 6px; border: 1px solid var(--line); background: #2a231b; color: var(--fg); font: inherit; cursor: pointer; }
  header button:disabled { opacity: .4; cursor: default; }
  .stage { position: relative; width: min(100%, calc((100vh - 190px) * var(--r))); user-select: none; touch-action: none; }
  .stage img { display: block; width: 100%; border-radius: 4px; pointer-events: none; }
  .seal { position: absolute; width: 52px; height: 52px; margin: -26px 0 0 -26px; border-radius: 50%; cursor: grab; background: #efe0bd center / cover;
    box-shadow: 0 0 0 3px #a3271d, 0 0 0 4.5px #17100a, 0 4px 10px rgba(0, 0, 0, .6); }
  .seal.drag { cursor: grabbing; box-shadow: 0 0 0 3px var(--accent), 0 0 0 4.5px #17100a, 0 6px 16px rgba(0, 0, 0, .7); z-index: 2; }
  .seal b { position: absolute; right: -8px; top: -8px; min-width: 22px; height: 22px; padding: 0 4px; border-radius: 11px; background: #17100a; color: #fff; font-size: 13px; display: grid; place-items: center; box-shadow: 0 0 0 1.5px var(--accent); }
  .seal.hot { box-shadow: 0 0 0 3px var(--accent), 0 0 0 4.5px #17100a, 0 4px 10px rgba(0, 0, 0, .6); }
  ol { margin: 14px 0 0; padding-left: 22px; color: var(--muted); columns: 2; }
  ol li { cursor: default; }
  ol li.hot { color: var(--accent); }
  .help { color: var(--muted); font-size: 13px; margin: 0 0 10px; }
</style>
<nav id="nav"></nav>
<main>
  <header><h1 id="title"></h1><button id="undo" disabled>Annuler</button><span id="state"></span></header>
  <p class="help">Fais glisser les sceaux. Chaque sceau lâché est enregistré dans lore/lieux-zones.json. N° 1 = l'enquête la plus facile.</p>
  <div class="stage" id="stage"><img id="img" alt=""></div>
  <ol id="list"></ol>
</main>
<script>
let D, cur, hist = [];
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const label = (pl) => (D.cases[pl] && D.cases[pl][0] ? D.cases[pl][0].title.split(/ [—–-] /)[0] : pl);
fetch('data').then(r => r.json()).then(d => {
  D = d;
  const pls = Object.keys(D.zones.lieux);
  $('nav').innerHTML = pls.map(pl => '<button data-pl="' + pl + '">' + esc(label(pl)) + '<br><small>' + pl + ' · ' + D.zones.lieux[pl].decor + '</small></button>').join('');
  $('nav').querySelectorAll('button').forEach(b => b.onclick = () => show(b.dataset.pl));
  show(decodeURIComponent(location.hash.slice(1)) in D.zones.lieux ? decodeURIComponent(location.hash.slice(1)) : pls[0]);
});
function state(t, cls) { $('state').textContent = t; $('state').className = cls || ''; }
function show(pl) {
  cur = pl; hist = []; $('undo').disabled = true; state('');
  location.hash = pl;
  $('nav').querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.pl === pl));
  const z = D.zones.lieux[pl], list = D.cases[pl] || [];
  $('title').textContent = label(pl);
  $('stage').style.setProperty('--r', z.ratio[0] / z.ratio[1]);
  $('img').src = 'img/' + z.decor + '.webp';
  // une place par enquête (des places en trop, jamais montrées dans le jeu, restent dans le fichier)
  while (z.places.length < list.length) z.places.push([50, 50]);
  $('stage').querySelectorAll('.seal').forEach(s => s.remove());
  list.forEach((c, i) => {
    const s = document.createElement('div');
    s.className = 'seal'; s.dataset.i = i; s.title = (i + 1) + '. ' + c.title;
    s.style.backgroundImage = 'url(portrait/' + c.archetype + '.webp)';
    s.innerHTML = '<b>' + (i + 1) + '</b>';
    place(s, z.places[i]);
    drag(s);
    $('stage').appendChild(s);
  });
  $('list').innerHTML = list.map((c, i) => '<li data-i="' + i + '">' + esc(c.title.split(/ [—–-] /).slice(1).join(' — ') || c.title) + ' <small>(' + c.size + '×' + c.size + ', difficulté ' + c.difficulty + ', victime ' + esc(c.victim) + ')</small></li>').join('');
  const hot = (i, on) => { $('list').querySelector('[data-i="' + i + '"]').classList.toggle('hot', on); $('stage').querySelector('.seal[data-i="' + i + '"]').classList.toggle('hot', on); };
  $('list').querySelectorAll('li').forEach(li => { li.onmouseenter = () => hot(li.dataset.i, true); li.onmouseleave = () => hot(li.dataset.i, false); });
  $('stage').querySelectorAll('.seal').forEach(s => { s.onmouseenter = () => hot(s.dataset.i, true); s.onmouseleave = () => hot(s.dataset.i, false); });
}
function place(s, [x, y]) { s.style.left = x + '%'; s.style.top = y + '%'; }
function drag(s) {
  s.onpointerdown = (e) => {
    e.preventDefault(); s.setPointerCapture(e.pointerId); s.classList.add('drag');
    const i = +s.dataset.i, before = D.zones.lieux[cur].places[i].slice();
    const at = (ev) => {
      const r = $('stage').getBoundingClientRect();
      const x = Math.max(0, Math.min(100, (ev.clientX - r.left) / r.width * 100)), y = Math.max(0, Math.min(100, (ev.clientY - r.top) / r.height * 100));
      return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
    };
    s.onpointermove = (ev) => place(s, at(ev));
    s.onpointerup = (ev) => {
      s.onpointermove = s.onpointerup = null; s.classList.remove('drag');
      const p = at(ev);
      if (p[0] === before[0] && p[1] === before[1]) return;
      D.zones.lieux[cur].places[i] = p;
      hist.push({ pl: cur, i, p: before }); $('undo').disabled = false;
      save();
    };
  };
}
$('undo').onclick = () => {
  const h = hist.pop(); if (!h) return;
  D.zones.lieux[h.pl].places[h.i] = h.p;
  place($('stage').querySelector('.seal[data-i="' + h.i + '"]'), h.p);
  $('undo').disabled = !hist.length;
  save();
};
document.addEventListener('keydown', e => { if ((e.metaKey || e.ctrlKey) && e.key === 'z') { e.preventDefault(); $('undo').click(); } });
function save() {
  state('Enregistrement…');
  fetch('save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pl: cur, places: D.zones.lieux[cur].places }) })
    .then(r => { if (!r.ok) throw new Error(r.status); state('Enregistré ✓', 'ok'); })
    .catch(() => state('Échec de l\\'enregistrement', 'err'));
}
</script>
</html>`;

const send = (res, code, type, body) => { res.writeHead(code, { 'Content-Type': type, 'Cache-Control': 'no-store' }); res.end(body); };
http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  try {
    if (req.method === 'GET' && url === '/') return send(res, 200, 'text/html; charset=utf-8', PAGE);
    if (req.method === 'GET' && url === '/data') return send(res, 200, 'application/json', JSON.stringify({ zones: J('lore/lieux-zones.json'), cases: cases() }));
    let m;
    if (req.method === 'GET' && (m = /^\/img\/([a-z0-9-]+)\.webp$/.exec(url))) {
      const f = path.join(ROOT, 'assets/decors/grand', m[1] + '.webp');
      return fs.existsSync(f) ? send(res, 200, 'image/webp', fs.readFileSync(f)) : send(res, 404, 'text/plain', 'introuvable');
    }
    if (req.method === 'GET' && (m = /^\/portrait\/([a-z0-9-]+)\.webp$/.exec(url))) {
      const f = path.join(ROOT, 'assets/characters', m[1] + '.webp');
      return fs.existsSync(f) ? send(res, 200, 'image/webp', fs.readFileSync(f)) : send(res, 404, 'text/plain', 'introuvable');
    }
    if (req.method === 'POST' && url === '/save') {
      let body = '';
      req.on('data', c => { body += c; if (body.length > 1e5) req.destroy(); });
      req.on('end', () => {
        try {
          const { pl, places } = JSON.parse(body);
          const z = J('lore/lieux-zones.json');
          if (!z.lieux[pl] || !Array.isArray(places) || !places.every(p => Array.isArray(p) && p.length === 2 && p.every(n => typeof n === 'number' && n >= 0 && n <= 100)))
            return send(res, 400, 'text/plain', 'données refusées');
          z.lieux[pl].places = places;
          write(z);
          console.log(`${pl} : ${places.map(p => p.join(',')).join('  ')}`);
          send(res, 200, 'application/json', '{"ok":true}');
        } catch (e) { send(res, 400, 'text/plain', 'JSON illisible'); }
      });
      return;
    }
    send(res, 404, 'text/plain', 'introuvable');
  } catch (e) { console.error(e); send(res, 500, 'text/plain', 'erreur'); }
}).listen(PORT, '127.0.0.1', () => console.log(`Sceaux des lieux : http://localhost:${PORT}/`));
