// Grimdoku — production en série des énigmes manquantes (en parallèle, sans rien révéler des solutions).
// Usage : node tools/batch.js [--jobs=7] [--only=<décor>]
// Pour chaque affaire sans solution : énigmes écrites à la main (MANIFEST de build-puzzles.js) et affaires automatiques
// (un habitué victime par décor ayant des textes « auto »), lance gen.js avec une difficulté visée, puis des niveaux
// voisins en repli. Écrit solutions/<id>.json. Le journal ne donne que la difficulté, le nombre d'indices et les techniques.
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');
const E = require('../engine');
const { resolve, loadScene, withVictim } = require('../cast');

const ROOT = path.join(__dirname, '..');
const arg = (name, def) => (process.argv.find(a => a.startsWith(`--${name}=`)) || `=${def}`).split('=')[1];
const JOBS = Number(arg('jobs', Math.max(1, os.cpus().length - 1)));
const ONLY = arg('only', '');

// difficulté visée selon la taille de la carte et le rang de l'habitué dans le groupe (progression variée)
const TARGETS = { 6: [0, 1, 0, 1, 2, 1], 7: [1, 2, 1, 2, 3, 2, 1], 8: [2, 3, 2, 3, 2, 3, 2, 3] };
const TRIES = { 6: 60, 7: 60, 8: 25 };
const TIMEOUT = { 6: 60e3, 7: 120e3, 8: 300e3 };
const SEEDS = [1, 2, 3, 4, 5, 6];

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
    jobs.push({ id, scene: name, victim: c.archetype, size: scene.size, target: TARGETS[scene.size][i % TARGETS[scene.size].length] });
  });
}
const todo = jobs.filter(j => !fs.existsSync(path.join(ROOT, 'solutions', j.id + '.json')) && (!ONLY || j.scene === ONLY || j.scene.startsWith(ONLY + '-')));
console.log(`${todo.length} affaire(s) à produire, ${JOBS} en parallèle`);

function runGen(job, seed, skulls) {
  return new Promise((done) => {
    const args = ['gen.js', `scenes/${job.scene}.json`, String(seed), '--level=1', `--skulls=${skulls}`, `--tries=${TRIES[job.size]}`];
    if (job.victim) args.push(`--victim=${job.victim}`);
    const child = spawn(process.execPath, args, { cwd: ROOT });
    let out = '';
    child.stdout.on('data', d => (out += d));
    const timer = setTimeout(() => child.kill('SIGKILL'), TIMEOUT[job.size]);
    child.on('close', (code) => { clearTimeout(timer); done(code === 0 ? out : null); });
  });
}

// difficulté visée, puis voisins (±1), puis n'importe laquelle de 0 à 3
const fallbacks = (t) => [t, t - 1, t + 1, t - 2, t + 2, t + 3, t - 3].filter((x, i, a) => x >= 0 && x <= 3 && a.indexOf(x) === i);

async function produce(job) {
  for (const skulls of fallbacks(job.target)) {
    for (const seed of SEEDS) {
      const out = await runGen(job, seed, skulls);
      if (!out) continue;
      const sol = JSON.parse(out);
      const scene = job.victim ? withVictim(loadScene(scenePath(job.scene)), job.victim) : loadScene(scenePath(job.scene));
      const p = resolve(scene, sol.cast);
      const h = E.humanSolve(p, sol.clues, 2);
      if (!h.solved || E.solve(p, sol.clues, 2).length !== 1) continue;
      fs.writeFileSync(path.join(ROOT, 'solutions', job.id + '.json'), JSON.stringify(sol, null, 1) + '\n');
      const r = E.rateDifficulty(h.steps);
      const techs = [...new Set(h.steps.map(s => E.TECH[s.tech]))].join(', ');
      console.log(`✔ ${job.id.padEnd(26)} ${'💀'.repeat(r.skulls) || '0 crâne'}${skulls !== job.target ? ` (visé ${job.target})` : ''} · ${sol.clues.length} indices · ${techs}`);
      return true;
    }
  }
  console.log(`✖ ${job.id} : aucune grille trouvée`);
  return false;
}

(async () => {
  const queue = [...todo];
  let ok = 0;
  await Promise.all(Array.from({ length: JOBS }, async () => {
    while (queue.length) if (await produce(queue.shift())) ok++;
  }));
  console.log(`terminé : ${ok}/${todo.length} produite(s)`);
})();
