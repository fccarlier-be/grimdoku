// Grimdoku — production en série des énigmes manquantes (en parallèle, sans rien révéler des solutions).
// Usage : node tools/batch.js [--jobs=7] [--only=<décor>[,<décor>…]] [--seeds=N]
// Pour chaque affaire sans solution : énigmes écrites à la main (MANIFEST de build-puzzles.js) et affaires automatiques
// (un habitué victime par décor ayant des textes « auto »), lance gen.js avec une difficulté visée, puis des niveaux
// voisins en repli. Écrit solutions/<id>.json. Le journal ne donne que la difficulté, le nombre d'indices et les techniques.
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');
const E = require('../engine');
const { resolve, loadScene, withVictim, withBig } = require('../cast');

const ROOT = path.join(__dirname, '..');
const arg = (name, def) => (process.argv.find(a => a.startsWith(`--${name}=`)) || `=${def}`).split('=')[1];
const JOBS = Number(arg('jobs', Math.max(1, os.cpus().length - 1)));
const ONLY = arg('only', '');

// difficulté visée selon la taille de la carte et le rang de l'habitué dans le groupe (progression variée)
// (jeu jugé trop simple par François, 2026-10-16 : aucune grille ne place un personnage d'emblée, difficultés relevées)
const TARGETS = { 6: [1, 2, 1, 2, 2, 1], 7: [2, 3, 2, 3, 2, 3, 2], 8: [3, 2, 3, 3, 2, 3, 3, 3] };
const TRIES = { 6: 60, 7: 60, 8: 25, 9: 8, 10: 8, 11: 6, 12: 6 };
const TIMEOUT = { 6: 60e3, 7: 120e3, 8: 300e3, 9: 400e3, 10: 500e3, 11: 600e3, 12: 700e3 };
// grandes cartes (9×9 et plus) : pas de difficulté visée (trop lent à filtrer) ; sans placement direct, elles sont dures
// graines propres à chaque affaire (sinon deux affaires d'un même décor tirent la même grille)
const hash = (s) => [...s].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) % 1000003, 7);
const SEEDS = Number(arg('seeds', 6)); // --seeds=N : plus d'essais pour une affaire difficile
const seedsOf = (id) => Array.from({ length: SEEDS }, (_, k) => hash(id) * 7 + k + 1);

// énigmes écrites à la main : lues dans build-puzzles.js
const manifestSrc = fs.readFileSync(path.join(ROOT, 'build-puzzles.js'), 'utf8').match(/const MANIFEST = (\[[\s\S]*?\n\]);/)[1];
const MANIFEST = eval(manifestSrc);
const HAND_TARGET = { 'grim-011': 2, 'grim-012': 3 };

const jobs = [];
const scenePath = (name) => path.join(ROOT, 'scenes', name + '.json');
const baseOf = (name) => JSON.parse(fs.readFileSync(scenePath(name), 'utf8')).extends || name;
const handVictims = new Set(MANIFEST.map(e => baseOf(e.scene) + '--' + loadScene(scenePath(e.scene)).characters.find(c => c.role === 'victim').archetype));
for (const e of MANIFEST) {
  const size = loadScene(scenePath(e.scene)).size;
  jobs.push({ id: e.id, scene: e.scene, victim: null, size, target: HAND_TARGET[e.id] ?? 1 });
}
for (const f of fs.readdirSync(path.join(ROOT, 'scenes')).sort()) {
  const name = f.replace(/\.json$/, '');
  const scene = loadScene(scenePath(name));
  // les variantes (« extends ») réutilisent un décor : pas d'affaires automatiques en double
  if (baseOf(name) !== name || !scene.auto) continue;
  scene.characters.forEach((c, i) => {
    const id = `${name}--${c.archetype}`;
    if (handVictims.has(id)) return;
    jobs.push({ id, scene: name, victim: c.archetype, size: scene.size, target: scene.size >= 9 ? null : TARGETS[scene.size][i % TARGETS[scene.size].length] });
  });
}
// affaires à grands personnages (big-cases.json) : difficulté de base visée, pour une progression dans le niveau 4 / 5
const BIG_TARGETS = { false: [2, 3, 2, 3, 3], true: [2, 3, 3, 3, 2] };
JSON.parse(fs.readFileSync(path.join(ROOT, 'big-cases.json'), 'utf8')).cases.forEach((c, i) => {
  const size = loadScene(scenePath(c.scene)).size;
  jobs.push({ id: c.id, scene: c.scene, victim: c.victim, big: c.big, shapes: c.shapes, hidden: !!c.hidden, hiddenMax: c.hiddenMax, size, target: size >= 9 ? null : BIG_TARGETS[!!c.hidden][i % 5] });
});
// --only=<décor>[,<décor>…] : ces décors seulement (et leurs variantes « <décor>-2 »)
const onlyList = ONLY ? ONLY.split(',') : [];
const todo = jobs.filter(j => !fs.existsSync(path.join(ROOT, 'solutions', j.id + '.json')) && (!onlyList.length || onlyList.some(o => j.scene === o || j.scene.startsWith(o + '-'))));
console.log(`${todo.length} affaire(s) à produire, ${JOBS} en parallèle`);

// grilles déjà produites dans le même décor (variantes comprises) : à ne pas refaire
const decorOf = (job) => baseOf(job.scene);
function avoidFile(job) {
  const out = [];
  for (const j of jobs) {
    if (j.id === job.id || decorOf(j) !== decorOf(job)) continue;
    const f = path.join(ROOT, 'solutions', j.id + '.json');
    if (!fs.existsSync(f)) continue;
    const sol = JSON.parse(fs.readFileSync(f, 'utf8'));
    const vic = Object.keys(sol.positions).sort().pop(); // la victime prend la dernière lettre
    out.push(E.layoutSig(sol.positions, vic));
  }
  const file = path.join(os.tmpdir(), `grimdoku-avoid-${process.pid}-${job.id}.json`);
  fs.writeFileSync(file, JSON.stringify(out));
  return file;
}

function runGen(job, seed, skulls) {
  return new Promise((done) => {
    const args = ['gen.js', `scenes/${job.scene}.json`, String(seed), '--level=1', `--tries=${TRIES[job.size]}`, `--avoid=${job.avoid}`, '--no-direct'];
    if (skulls !== null) args.push(`--skulls=${skulls}`);
    if (job.victim) args.push(`--victim=${job.victim}`);
    if (job.big) args.push('--big-late');
    if (job.big) args.push(`--big=${job.big.map((t, i) => t + ':' + job.shapes[i]).join(',')}`);
    if (job.hidden) args.push('--hidden');
    if (job.hiddenMax) args.push(`--hidden-max=${job.hiddenMax}`);
    const child = spawn(process.execPath, args, { cwd: ROOT });
    let out = '';
    child.stdout.on('data', d => (out += d));
    const timer = setTimeout(() => child.kill('SIGKILL'), TIMEOUT[job.size]);
    child.on('close', (code) => { clearTimeout(timer); done(code === 0 ? out : null); });
  });
}

// difficulté visée, puis voisins (±1), puis n'importe laquelle de 0 à 3
const fallbacks = (t) => t === null ? [null] : [t, t - 1, t + 1, t - 2, t + 2, t + 3, t - 3].filter((x, i, a) => x >= 0 && x <= 3 && a.indexOf(x) === i);

async function produce(job) {
  job.avoid = avoidFile(job);
  for (const skulls of fallbacks(job.target)) {
    for (const seed of seedsOf(job.id)) {
      const out = await runGen(job, seed, skulls);
      if (!out) continue;
      const sol = JSON.parse(out);
      const base = loadScene(scenePath(job.scene));
      const scene = job.big ? withBig(base, job.victim, job.big, job.shapes) : job.victim ? withVictim(base, job.victim) : base;
      const p = resolve(scene, sol.cast);
      if (job.hidden) p.hiddenShapes = true;
      if (job.hiddenMax) p.hiddenMax = job.hiddenMax;
      const h = E.humanSolve(p, sol.clues, 2);
      if (!h.solved || E.solve(p, sol.clues, 2).length !== 1) continue;
      // une autre grille du décor a pu être écrite entre-temps (--parallel) : on revérifie qu'elle n'est pas trop proche
      const mine = E.layoutSig(sol.positions, Object.keys(sol.positions).sort().pop());
      if (JSON.parse(fs.readFileSync(avoidFile(job), 'utf8')).some(o => E.tooClose(mine, o))) continue;
      fs.writeFileSync(path.join(ROOT, 'solutions', job.id + '.json'), JSON.stringify(sol, null, 1) + '\n');
      const r = { skulls: E.skullsOf(p, h.steps) };
      const techs = [...new Set(h.steps.map(s => E.TECH[s.tech]))].join(', ');
      console.log(`✔ ${job.id.padEnd(26)} ${'💀'.repeat(r.skulls) || '0 crâne'}${job.big && skulls !== null ? ` (base ${skulls})` : ''}${skulls !== job.target ? ` (visé ${job.target})` : ''} · ${sol.clues.length} indices · ${techs}`);
      return true;
    }
  }
  console.log(`✖ ${job.id} : aucune grille trouvée`);
  return false;
}

(async () => {
  const queue = [...todo];
  let ok = 0;
  // une seule affaire à la fois par décor (chacune voit les grilles déjà produites des autres), sauf --parallel :
  // plusieurs par décor, chaque grille étant revérifiée juste avant d'être écrite
  const busy = new Set();
  const PARALLEL = process.argv.includes('--parallel');
  await Promise.all(Array.from({ length: JOBS }, async () => {
    for (;;) {
      const i = queue.findIndex(j => PARALLEL || !busy.has(decorOf(j)));
      if (i < 0) { if (!queue.length) return; await new Promise(r => setTimeout(r, 500)); continue; }
      const job = queue.splice(i, 1)[0];
      if (!PARALLEL) busy.add(decorOf(job));
      if (await produce(job)) ok++;
      busy.delete(decorOf(job));
    }
  }));
  console.log(`terminé : ${ok}/${todo.length} produite(s)`);
})();
