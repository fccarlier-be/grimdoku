// Grimdoku — page de relecture des épilogues : lire chaque scène dans son contexte (lieu, victime, coupable, introduction),
// la modifier, lui donner un statut (à relire, validé, à revoir) et une note. ⚠️ La page révèle le coupable de chaque enquête.
//
// Deux usages :
// - en local : node tools/relecture.js  puis http://localhost:8096 — contexte lu dans le projet, modifications écrites
//   dans lore/epilogues.json et lore/epilogues-relecture.json ;
// - sur le VPS (grimdoku.fcold.org/epi, derrière nginx et un mot de passe) : EPI_BUNDLE = contexte figé au moment de la
//   mise en ligne (tools/epi-pack.js), EPI_DATA = dossier des épilogues modifiables, gardé hors des mises en ligne
//   (initialisé depuis EPI_SEED s'il est vide). Synchronisation avec le projet : tools/epi-sync.sh (GET /export, POST /import).
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PORT = +process.env.PORT || 8096;
const HOST = process.env.HOST || '127.0.0.1';
const SERVER = !!process.env.EPI_BUNDLE;
const DATA = SERVER ? process.env.EPI_DATA : path.join(ROOT, 'lore');
const F_EPI = path.join(DATA, 'epilogues.json');
const F_REV = path.join(DATA, 'epilogues-relecture.json');
const J = (f) => JSON.parse(fs.readFileSync(path.join(ROOT, f), 'utf8'));
const read = (f, def) => fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : def;
// écriture sûre : fichier temporaire puis renommage (jamais de fichier à moitié écrit)
const write = (f, obj) => { fs.writeFileSync(f + '.tmp', JSON.stringify(obj, null, 2) + '\n'); fs.renameSync(f + '.tmp', f); };
const REV_DOC = 'Relecture des épilogues (tools/relecture.js) : statut (relire, valide, revoir) et note de François, par énigme.';

if (SERVER) { // première mise en route sur le VPS : les épilogues de départ
  fs.mkdirSync(DATA, { recursive: true });
  for (const f of ['epilogues.json', 'epilogues-relecture.json'])
    if (!fs.existsSync(path.join(DATA, f)) && fs.existsSync(path.join(process.env.EPI_SEED, f))) fs.copyFileSync(path.join(process.env.EPI_SEED, f), path.join(DATA, f));
}

// lieux dans l'ordre du jeu : départ, puis ceux qu'ouvre chaque lettre (lore/carte.json)
function placeOrder() {
  const carte = J('lore/carte.json'), order = [carte.start], seen = new Set(order);
  for (let i = 0; i < order.length; i++) for (const n of carte.unlock[order[i]] || []) if (!seen.has(n)) { seen.add(n); order.push(n); }
  return order;
}

// contexte de chaque épilogue (lieu, victime, coupable, introduction), lu dans le projet ; figé dans EPI_BUNDLE sur le VPS
function context(ids) {
  const cast = J('cast.json');
  const actives = new Set(Object.entries(J('lore/actives.json')).filter(([k]) => k !== '_doc').flatMap(([, v]) => v));
  const order = placeOrder(), out = {};
  for (const id of ids) {
    const file = path.join(ROOT, 'puzzles', id + '.json');
    if (!fs.existsSync(file)) continue;
    const p = JSON.parse(fs.readFileSync(file, 'utf8'));
    const m = p.characters.find(c => c.id === p.solution.murderer), v = p.characters.find(c => c.role === 'victim');
    const a = cast[m.archetype], g = cast[v.archetype];
    out[id] = {
      id, place: p.place, placeTitle: p.title.split(' — ')[0], title: p.title, rank: order.indexOf(p.place), active: actives.has(id),
      victim: { name: v.name, title: g.title || '', desc: g.desc || '', motif: g.motif || '', menace: g.menace || '', gender: g.gender },
      culprit: { name: a.name, desc: a.desc, tic: a.tic, gender: a.gender }, intro: p.intro
    };
  }
  return out;
}

function data() {
  const epi = read(F_EPI, {}), rev = read(F_REV, {});
  const ctx = SERVER ? JSON.parse(fs.readFileSync(process.env.EPI_BUNDLE, 'utf8')) : context(Object.keys(epi));
  const items = Object.keys(epi).filter(id => id !== '_doc' && ctx[id])
    .map(id => ({ ...ctx[id], text: epi[id], status: (rev[id] || {}).status || 'relire', note: (rev[id] || {}).note || '' }));
  items.sort((x, y) => (x.rank - y.rank) || (y.active - x.active) || x.id.localeCompare(y.id));
  return items;
}

function save(body) {
  const { id, text, status, note } = body;
  const epi = read(F_EPI, {});
  if (!epi[id]) throw new Error('épilogue inconnu : ' + id);
  const lines = String(text).replace(/\r/g, '').split('\n').map(l => l.trim()).filter(Boolean);
  if (!lines.length || lines.some(l => !l.startsWith('— '))) throw new Error('chaque réplique doit commencer par « — »');
  epi[id] = lines.join('\n');                       // même clé : l'ordre du fichier est conservé
  write(F_EPI, epi);
  const rev = read(F_REV, { _doc: REV_DOC });
  rev[id] = { status: ['relire', 'valide', 'revoir'].includes(status) ? status : 'relire', note: String(note || '') };
  write(F_REV, rev);
  return { ok: true, text: epi[id] };
}

// synchronisation avec le projet (tools/epi-sync.sh) : tout lire, ou tout remplacer
const exportAll = () => ({ epilogues: read(F_EPI, {}), relecture: read(F_REV, { _doc: REV_DOC }) });
function importAll(body) {
  if (!body || typeof body.epilogues !== 'object' || typeof body.relecture !== 'object') throw new Error('attendu : { epilogues, relecture }');
  write(F_EPI, body.epilogues); write(F_REV, body.relecture);
  return { ok: true, epilogues: Object.keys(body.epilogues).length - 1 };
}

const PAGE = String.raw`<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Relecture des épilogues</title>
<style>
:root { --bg: #2b2016; --paper: #f3e7c9; --ink: #2b1d10; --muted: #7a5c38; --red: #a3312a; --ok: #3d7a3a; --warn: #b8741a; --line: rgba(43,29,16,.2); }
* { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--ink); font: 16px/1.45 Georgia, "Iowan Old Style", serif; }
header { position: sticky; top: 0; z-index: 5; background: #1e160f; color: #f3e6c8; padding: 10px 16px; box-shadow: 0 3px 10px rgba(0,0,0,.5); }
header h1 { margin: 0 0 6px; font-size: 20px; font-weight: 400; }
.warn { color: #f0a93a; font-size: 13px; }
.bar { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-top: 6px; }
.bar select, .bar input { font: inherit; font-size: 14px; padding: 4px 6px; border-radius: 6px; border: 1px solid #6e5434; background: #f3e6c8; color: var(--ink); }
.bar label { font-size: 14px; }
.stats { font-size: 13px; color: #e8d9b8; margin-left: auto; }
main { max-width: 900px; margin: 0 auto; padding: 16px; display: flex; flex-direction: column; gap: 16px; }
.card { background: var(--paper); border-radius: 4px; padding: 14px 16px; box-shadow: 0 6px 14px rgba(0,0,0,.45); border-left: 6px solid #c9b58c; }
.card.valide { border-left-color: var(--ok); } .card.revoir { border-left-color: var(--warn); } .card.dirty { outline: 3px solid #f0a93a; }
.card h2 { margin: 0; font-size: 18px; font-weight: 600; }
.tag { display: inline-block; font: 12px/1 system-ui, sans-serif; padding: 3px 6px; border-radius: 99px; background: #d9c69b; color: var(--ink); margin-left: 6px; vertical-align: middle; }
.tag.off { background: #8c8170; color: #fff; }
.ctx { margin: 8px 0; font-size: 14px; color: #3b2a18; display: grid; gap: 3px; }
.ctx b { color: var(--ink); }
.ctx i { color: var(--muted); }
details { font-size: 14px; color: #4b3822; margin: 4px 0 8px; }
summary { cursor: pointer; color: var(--muted); }
.cols { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
@media (max-width: 720px) { .cols { grid-template-columns: 1fr; } }
textarea { width: 100%; min-height: 150px; font: 15px/1.5 Georgia, serif; padding: 8px; border: 1px solid var(--line); border-radius: 4px; background: #fffaf0; color: var(--ink); resize: vertical; }
.note { min-height: 44px; font-size: 14px; }
.preview { display: flex; flex-direction: column; gap: 6px; font-size: 15px; }
.preview p { margin: 0; padding: 6px 10px; border-radius: 10px; max-width: 92%; }
.preview .me { background: #e6d6ad; align-self: flex-start; font-style: italic; }
.preview .them { background: #fff7e2; align-self: flex-end; box-shadow: inset 0 0 0 1px var(--line); }
.checks { font: 13px/1.3 system-ui, sans-serif; color: var(--warn); min-height: 16px; margin-top: 4px; }
.actions { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-top: 8px; }
.st { font: 13px system-ui, sans-serif; border: 1px solid #b9a37a; background: #efe2c2; padding: 5px 9px; border-radius: 99px; cursor: pointer; }
.st[aria-pressed="true"].relire { background: #c9b58c; } .st[aria-pressed="true"].valide { background: var(--ok); color: #fff; } .st[aria-pressed="true"].revoir { background: var(--warn); color: #fff; }
.save { margin-left: auto; font: 600 14px system-ui, sans-serif; background: var(--red); color: #fff; border: 0; padding: 7px 14px; border-radius: 6px; cursor: pointer; }
.save:disabled { opacity: .4; cursor: default; }
.msg { font: 13px system-ui, sans-serif; color: var(--ok); }
.empty { color: #e8d9b8; text-align: center; }
</style></head><body>
<header>
  <h1>Relecture des épilogues</h1>
  <div class="warn">⚠️ Cette page révèle le coupable de chaque enquête. Ctrl+S (⌘S) enregistre la scène en cours d'édition.</div>
  <div class="bar">
    <select id="fPlace"><option value="">Tous les lieux</option></select>
    <select id="fCulprit"><option value="">Tous les coupables</option></select>
    <select id="fStatus"><option value="">Tous les statuts</option><option value="relire">À relire</option><option value="valide">Validé</option><option value="revoir">À revoir</option></select>
    <input id="fText" type="search" placeholder="Rechercher un mot…">
    <label><input id="fOff" type="checkbox"> grilles désactivées</label>
    <span class="stats" id="stats"></span>
  </div>
</header>
<main id="list"></main>
<script>
const $ = (s, el = document) => el.querySelector(s);
const esc = (t) => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
let ITEMS = [], current = null;
const LABEL = { relire: 'À relire', valide: 'Validé', revoir: 'À revoir' };

function preview(text) {
  return text.split('\n').filter(l => l.trim()).map((l, i) => '<p class="' + (i % 2 ? 'them' : 'me') + '">' + esc(l.replace(/^—\s*/, '')) + '</p>').join('');
}
function checks(it, text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean), out = [];
  if (lines.length !== 4) out.push(lines.length + ' répliques (règle : quatre)');
  if (lines.some(l => !l.startsWith('— '))) out.push('une réplique ne commence pas par « — »');
  if (lines[0] && !lines[0].includes(it.victim.name)) out.push('le nom de la victime (' + it.victim.name + ') manque dans la 1re réplique');
  return out.join(' · ');
}
function card(it) {
  return '<article class="card ' + it.status + '" data-id="' + it.id + '">' +
    '<h2>' + esc(it.title) + (it.active ? '' : '<span class="tag off">désactivée</span>') + '</h2>' +
    '<div class="ctx">' +
      '<div><b>Victime</b> : ' + esc(it.victim.name) + ', ' + esc(it.victim.title) + ' <i>(' + esc(it.victim.desc) + ')</i> — venu' + (it.victim.gender === 'f' ? 'e ' : ' ') + esc(it.victim.motif) + ' ; menace : « ' + esc(it.victim.menace) + ' »</div>' +
      '<div><b>Coupable</b> : ' + esc(it.culprit.name) + ' <i>(' + esc(it.culprit.desc) + ')</i> — tic : ' + esc(it.culprit.tic) + '</div>' +
    '</div>' +
    '<details><summary>Introduction de l\'enquête</summary>' + esc(it.intro) + '</details>' +
    '<div class="cols"><textarea class="ed" spellcheck="true">' + esc(it.text) + '</textarea><div class="preview">' + preview(it.text) + '</div></div>' +
    '<div class="checks">' + esc(checks(it, it.text)) + '</div>' +
    '<textarea class="note" placeholder="Note (facultative) : ce qui ne va pas, une idée…">' + esc(it.note) + '</textarea>' +
    '<div class="actions">' + ['relire', 'valide', 'revoir'].map(s => '<button class="st ' + s + '" data-st="' + s + '" aria-pressed="' + (it.status === s) + '">' + LABEL[s] + '</button>').join('') +
      '<span class="msg"></span><button class="save" disabled>Enregistrer</button></div>' +
  '</article>';
}
function filtered() {
  const pl = $('#fPlace').value, cu = $('#fCulprit').value, st = $('#fStatus').value, q = $('#fText').value.trim().toLowerCase(), off = $('#fOff').checked;
  return ITEMS.filter(it => (off || it.active) && (!pl || it.place === pl) && (!cu || it.culprit.name === cu) && (!st || it.status === st) &&
    (!q || (it.text + ' ' + it.title + ' ' + it.culprit.name + ' ' + it.note).toLowerCase().includes(q)));
}
function stats() {
  const act = ITEMS.filter(it => it.active || $('#fOff').checked), n = (s) => act.filter(it => it.status === s).length;
  $('#stats').textContent = act.length + ' épilogues · ' + n('valide') + ' validés · ' + n('revoir') + ' à revoir · ' + n('relire') + ' à relire';
}
function draw() {
  const list = filtered();
  $('#list').innerHTML = list.length ? list.map(card).join('') : '<p class="empty">Aucun épilogue pour ces filtres.</p>';
  stats();
}
function itemOf(el) { const c = el.closest('.card'); return c && ITEMS.find(it => it.id === c.dataset.id); }
function dirty(c, on) { c.classList.toggle('dirty', on); $('.save', c).disabled = !on; }

document.addEventListener('input', (e) => {
  const c = e.target.closest('.card'); if (!c) return;
  const it = itemOf(c); current = c;
  if (e.target.classList.contains('ed')) { $('.preview', c).innerHTML = preview(e.target.value); $('.checks', c).textContent = checks(it, e.target.value); }
  dirty(c, true); $('.msg', c).textContent = '';
});
document.addEventListener('focusin', (e) => { const c = e.target.closest && e.target.closest('.card'); if (c) current = c; });
document.addEventListener('click', (e) => {
  const c = e.target.closest('.card'); if (!c) return;
  if (e.target.dataset.st) { c.querySelectorAll('.st').forEach(b => b.setAttribute('aria-pressed', b === e.target)); c.className = 'card ' + e.target.dataset.st; dirty(c, true); current = c; }
  if (e.target.classList.contains('save')) saveCard(c);
});
document.addEventListener('keydown', (e) => { if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); if (current && !$('.save', current).disabled) saveCard(current); } });
window.addEventListener('beforeunload', (e) => { if (document.querySelector('.card.dirty')) { e.preventDefault(); e.returnValue = ''; } });

async function saveCard(c) {
  const it = itemOf(c);
  const body = { id: it.id, text: $('.ed', c).value, note: $('.note', c).value, status: ($('.st[aria-pressed="true"]', c) || {}).dataset?.st || 'relire' };
  const r = await fetch('save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const out = await r.json();
  if (!r.ok) { $('.msg', c).style.color = '#a3312a'; $('.msg', c).textContent = out.error; return; }
  Object.assign(it, { text: out.text, note: body.note, status: body.status });
  $('.ed', c).value = out.text; dirty(c, false); c.className = 'card ' + it.status;
  $('.msg', c).style.color = ''; $('.msg', c).textContent = 'Enregistré ✓'; stats();
}
['fPlace', 'fCulprit', 'fStatus', 'fText', 'fOff'].forEach(id => $('#' + id).addEventListener(id === 'fText' ? 'input' : 'change', () => {
  if (document.querySelector('.card.dirty') && !confirm('Des modifications ne sont pas enregistrées. Changer de filtre quand même ?')) return;
  draw();
}));
fetch('data').then(r => r.json()).then(items => {
  ITEMS = items;
  const places = [...new Map(items.map(it => [it.place, it.placeTitle])).entries()];
  $('#fPlace').innerHTML += places.map(([k, t]) => '<option value="' + k + '">' + esc(t) + '</option>').join('');
  const culprits = [...new Set(items.map(it => it.culprit.name))].sort((a, b) => a.localeCompare(b));
  $('#fCulprit').innerHTML += culprits.map(n => '<option>' + esc(n) + '</option>').join('');
  draw();
});
</script></body></html>`;

module.exports = { context };
if (require.main === module) http.createServer((req, res) => {
  const send = (code, type, body) => { res.writeHead(code, { 'Content-Type': type + '; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(body); };
  const url = req.url.split('?')[0];
  const post = (fn) => {
    let raw = '';
    req.on('data', c => { raw += c; if (raw.length > 4e6) req.destroy(); });
    req.on('end', () => {
      try { send(200, 'application/json', JSON.stringify(fn(JSON.parse(raw)))); }
      catch (e) { send(400, 'application/json', JSON.stringify({ error: e.message })); }
    });
  };
  try {
    if (req.method === 'GET' && url === '/') return send(200, 'text/html', PAGE);
    if (req.method === 'GET' && url === '/data') return send(200, 'application/json', JSON.stringify(data()));
    if (req.method === 'GET' && url === '/export') return send(200, 'application/json', JSON.stringify(exportAll()));
    if (req.method === 'POST' && url === '/save') return post(save);
    if (req.method === 'POST' && url === '/import') return post(importAll);
    send(404, 'text/plain', 'introuvable');
  } catch (e) { send(500, 'text/plain', e.message); }
}).listen(PORT, HOST, () => console.log(`Relecture des épilogues : http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}  (Ctrl+C pour arrêter)`));
