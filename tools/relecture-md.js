// Grimdoku — dossier de relecture des épilogues pour une relecture extérieure (une autre IA, par exemple) :
// lore global, troupe (rôle, trait, tic, lieux), relations, invités, règles d'écriture, puis tous les épilogues par lieu
// avec leur contexte, ceux validés par François marqués ✅. Écrit lore/RELECTURE_EPILOGUES.md.
// ⚠️ Révèle le coupable de chaque enquête. Usage : node tools/relecture-md.js (après node tools/lore-md.js)
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const J = (f) => JSON.parse(fs.readFileSync(path.join(ROOT, f), 'utf8'));
const cast = J('cast.json'), epi = J('lore/epilogues.json'), carte = J('lore/carte.json');
const rev = fs.existsSync(path.join(ROOT, 'lore/epilogues-relecture.json')) ? J('lore/epilogues-relecture.json') : {};
const actives = new Set(Object.entries(J('lore/actives.json')).filter(([k]) => k !== '_doc').flatMap(([, ids]) => ids));
const lore = fs.readFileSync(path.join(ROOT, 'lore/LORE.md'), 'utf8');

// une section de LORE.md (« ## n. Titre »), titre rétrogradé d'un niveau
const section = (n) => {
  const start = lore.indexOf(`\n## ${n}. `);
  const end = lore.indexOf('\n## ', start + 4);
  return lore.slice(start + 1, end < 0 ? undefined : end).replace(/^## /, '### ').replace(/\n### /g, '\n#### ').trim();
};

// lieux dans l'ordre du jeu (départ, puis ceux qu'ouvre chaque lettre)
const order = [carte.start];
for (let i = 0; i < order.length; i++) for (const n of carte.unlock[order[i]] || []) if (!order.includes(n)) order.push(n);
const scenes = {};
for (const f of fs.readdirSync(path.join(ROOT, 'scenes')).filter(n => n.endsWith('.json'))) scenes[f.slice(0, -5)] = J('scenes/' + f);
const where = {};
for (const [k, s] of Object.entries(scenes)) if (s.auto) for (const c of s.characters) (where[c.archetype] = where[c.archetype] || []).push(s.title);

const out = [];
const P = (...l) => out.push(...l, '');
P('# Grimdoku — dossier de relecture des épilogues',
  `*Généré le ${new Date().toISOString().slice(0, 10)} par \`node tools/relecture-md.js\`. ⚠️ Ce document révèle le coupable de chaque enquête et la vérité du fil rouge.*`,
  '## Ce qu\'on attend de la relecture',
  'Grimdoku est un jeu de logique (placer des personnages sur une carte d\'après des indices pour trouver qui était seul avec la victime), habillé d\'un lore humoristique dans l\'esprit de *Kaamelott*. Après chaque enquête résolue, un **épilogue** de quatre répliques montre l\'enquêteur face au coupable.',
  'Merci de relire les épilogues ci-dessous à la lumière du lore et des règles d\'écriture, et de signaler pour chacun ce qui ne va pas : mobile trop faible pour ce personnage, meurtre qui ne se comprend pas, chute qui ne fait pas sourire, gag plaqué, contradiction avec le canon, répétitions entre épilogues, français maladroit. Proposer une réécriture quand c\'est utile. Les épilogues marqués ✅ ont déjà été validés par l\'auteur : les relire seulement si un problème grave saute aux yeux.');

P('## Règles d\'écriture des épilogues',
  '1. **Quatre répliques** : enquêteur, coupable, enquêteur, coupable. La première nomme la victime et met le coupable face à elle, avec une formule variée (« Parlons de… », « Il n\'y avait que vous et… », « Pourquoi… ? »…) : le rituel « Vous étiez seul(e) avec… » ne doit pas revenir systématiquement.',
  '2. **Le tic du personnage devient un raisonnement ou une action**, pas une ponctuation ajoutée à la fin.',
  '3. **Le mobile doit être assez fort pour que CE personnage tue.** Le vrai mobile touche son point sensible ; la menace de la victime n\'est que le déclencheur.',
  '4. **La chute doit faire comprendre le meurtre.** Un jeu de mots qui sonne bien sans dire l\'acte ne suffit pas.',
  '5. **Aucun gag récurrent plaqué** : s\'il ne découle pas de la situation, on s\'en passe.',
  '6. **L\'enquêteur reste sobre**, fatigué, pragmatique : une question ou une objection qui ouvre une faille, jamais l\'explication de la blague.',
  '7. **Rien d\'inventé hors canon** (personnages, relations, pouvoirs) ; respecter l\'introduction du lieu ; ne pas citer la pièce du crime (elle dépend de la solution de la grille).',
  'Cas particuliers : Augure (corbeau) ne parle pas, il écrit ; Écho-Écho (perroquet) répète des mots dans le désordre ; Glissandra (vouivre) commence ses phrases par la fin ; Bâfrin (troll) répète le dernier mot de la phrase des autres et parle de lui à la troisième personne. Les épilogues des enquêtes ordinaires ne doivent rien dévoiler du fil rouge (Augure n\'y est jamais l\'auteur des lettres).');

P('## Le lore', section(1), section(2), section(3).split('\n#### ')[0]);

P('## La troupe récurrente (les suspects)',
  'Les habitués de Brumeval reviennent d\'une enquête à l\'autre ; aucun ne meurt dans une enquête ordinaire (la victime est toujours un invité de passage). Ils sont coupables à tour de rôle selon la solution de la grille.', '',
  '| Personnage | Type | Rôle et trait | Tic | Où on le croise |', '| --- | --- | --- | --- | --- |',
  ...Object.entries(cast).filter(([, a]) => a && typeof a === 'object' && !a.guest && a.name)
    .map(([t, a]) => `| **${a.name}** (${a.gender === 'f' ? 'f' : 'm'}) | \`${t}\` | ${a.desc} | ${a.tic || ''} | ${(where[t] || []).join(' · ') || '—'} |`));

P(section(5), section(6), section(10));
P('## Le fil rouge (à ne pas dévoiler dans les épilogues ordinaires)', section(8).replace(/^### .*\n/, ''));

// les épilogues, par lieu
const items = Object.keys(epi).filter(id => id !== '_doc' && fs.existsSync(path.join(ROOT, 'puzzles', id + '.json'))).map(id => {
  const p = J('puzzles/' + id + '.json');
  const m = p.characters.find(c => c.id === p.solution.murderer), v = p.characters.find(c => c.role === 'victim');
  return { id, p, m, v, rank: order.indexOf(p.place) };
}).sort((a, b) => a.rank - b.rank || actives.has(b.id) - actives.has(a.id) || a.id.localeCompare(b.id));
const nVal = items.filter(it => (rev[it.id] || {}).status === 'valide').length;
P('## Les épilogues',
  `${items.length} épilogues (${items.filter(it => actives.has(it.id)).length} grilles jouables, ${items.filter(it => !actives.has(it.id)).length} grilles désactivées), dont **${nVal} validés ✅**. Classés par lieu, dans l'ordre où le joueur les découvre. Pour chacun : la victime (son métier, ce qu'elle venait faire, la menace qu'elle représentait), le coupable (trait et tic), l'introduction de l'enquête, puis l'épilogue.`);
let place = null;
for (const it of items) {
  if (it.p.place !== place) {
    place = it.p.place;
    P(`### ${it.p.title.split(' — ')[0]}`);
  }
  const a = cast[it.m.archetype], g = cast[it.v.archetype], r = rev[it.id] || {};
  const status = r.status === 'valide' ? ' ✅ validé' : r.status === 'revoir' ? ' ⚠️ à revoir' : '';
  P(`#### ${it.p.title}${status}${actives.has(it.id) ? '' : ' *(grille désactivée)*'}`,
    `- **Victime** : ${it.v.name}, ${g.title} — ${g.desc}. Venu${it.v.gender === 'f' ? 'e' : ''} ${g.motif} ; menace : « ${g.menace} ».`,
    `- **Coupable** : ${a.name} — ${a.desc}. Tic : ${a.tic}.`,
    `- **Introduction** : ${it.p.intro}`,
    // notes de l'auteur seulement (pas celles laissées par l'outil lors des réécritures)
    ...(r.note && !/^(Réécrit|Repassé)/.test(r.note) ? [`- **Note de l'auteur** : ${r.note}`] : []), '',
    ...epi[it.id].split('\n').map(l => '> ' + l + '  '));
}
fs.writeFileSync(path.join(ROOT, 'lore/RELECTURE_EPILOGUES.md'), out.join('\n').replace(/\n{3,}/g, '\n\n'));
console.log(`lore/RELECTURE_EPILOGUES.md : ${items.length} épilogues, ${nVal} validés`);
