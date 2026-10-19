// Génère lore/LORE.md : le lore complet de Grimdoku, tiré des données du jeu (cast.json, scenes, lore/*.json, template).
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = process.argv[2] || path.join(__dirname, '..'); // usage : node tools/lore-md.js
const J = (f) => JSON.parse(fs.readFileSync(path.join(ROOT, f), 'utf8'));
const cast = J('cast.json'); delete cast._doc;
const lettres = J('lore/lettres.json');
const carte = J('lore/carte.json');
const testament = J('scenes/testament.json');
const big = J('big-cases.json').cases;
const { loadScene, autoCases } = require(path.join(ROOT, 'cast.js'));
const tpl = fs.readFileSync(path.join(ROOT, 'app/template.html'), 'utf8');
const hints = [...tpl.slice(tpl.indexOf('const HINT_TEXT = ['), tpl.indexOf('];', tpl.indexOf('const HINT_TEXT = ['))).matchAll(/`([^`]*)`/g)].map(m => m[1].replace(/\$\{n\}/g, '<personnage>'));
const TECH = ['indice', 'case unique', 'ligne réservée', 'position relative', 'seul candidat', 'pièces', 'groupes'];
const scenes = {};
for (const f of fs.readdirSync(path.join(ROOT, 'scenes')).filter(n => n.endsWith('.json'))) { // scenes/legacy : archives
  const raw = J('scenes/' + f);
  if (raw.extends || !raw.auto) continue;
  scenes[f.replace('.json', '')] = loadScene(path.join(ROOT, 'scenes', f));
}
const puzzles = fs.readdirSync(path.join(ROOT, 'puzzles')).map(f => J('puzzles/' + f));
const troupe = Object.entries(cast).filter(([, a]) => !a.guest);
const guests = Object.entries(cast).filter(([, a]) => a.guest);
const quote = (t) => t.split('\n').map(l => '> ' + l).join('  \n');
const out = [];
const P = (...l) => out.push(...l, '');

P('# Grimdoku — le lore complet',
  `*Document généré à partir des données du jeu le ${new Date().toISOString().slice(0, 10)} (\`lore/LORE.md\`). Il contient tout le lore : le monde, chaque personnage et toutes ses répliques, les invités, les lieux, les lettres d'Augure, l'affaire finale et sa révélation, et la façon dont tout cela s'articule avec le jeu. Il ne contient aucune solution d'énigme.*`,
  '**Attention : ce document dévoile la fin du fil rouge (le Nœud de Brume, le Palier zéro, qui écrit les lettres et pourquoi).**',
  'Le canon de référence est `lore/GRIMDOKU_MATRICE_CONTINUITE.md` (vérité fixe, chronologie, connaissances des personnages) ; les décisions d\'application sont dans `lore/PLAN_MIGRATION_CANON.md`.');

P('## Sommaire', '1. Intentions et ton', '2. Le monde : la baronnie de Brumeval', '3. L\'enquêteur', '4. La troupe récurrente (38 personnages)', '5. Les liens entre personnages', '6. Les invités de passage (les victimes)', '7. Les lieux, un par un', '8. Le fil rouge : la vérité cachée et les lettres d\'Augure', '9. L\'affaire finale : le testament de Fizzlebarbe', '10. Gags récurrents', '11. Le lore dans le jeu : comment tout s\'articule', '12. Règles de cohérence', '13. Où vivent les données (pour modifier le lore)');

P('## 1. Intentions et ton',
  'Le ton est celui de **Kaamelott** : des personnages bêtes mais attachants, des répliques courtes, des chamailleries plutôt que des blagues. Grimdoku reste un jeu de logique : le lore habille les enquêtes sans jamais gêner la déduction.',
  '- **Les dialogues portent l\'humour.** Les épilogues sont de courtes scènes de quatre répliques entre l\'enquêteur et le coupable.',
  '- **Chaque personnage a un tic de langage**, reconnaissable d\'une enquête à l\'autre.',
  '- **Les indices restent sobres et factuels** (« X était à côté d\'un tonneau ») : ils sont générés depuis la logique de la grille. Des indices écrits « en personnage » avaient contredit la grille ; l\'humour vit donc dans les descriptions, les introductions, les épilogues et les lettres.',
  '- **Mobile d\'abord** : tout se lit en quelques secondes.',
  '- **Aucune révélation avant la résolution** : rien de ce qui s\'affiche avant la victoire ne trahit la position de quelqu\'un ; le coupable n\'apparaît qu\'au verdict.');

P('## 2. Le monde : la baronnie de Brumeval',
  'Toutes les enquêtes se passent dans **la baronnie de Brumeval**, assez petite pour que tout le monde se connaisse et se déteste un peu. Son port, le Grand Port de Brumeval, lui donne son nom. Elle est découpée en six contrées :', '',
  '| Contrée | Lieux |', '| --- | --- |',
  ...carte.contrees.map(c => `| ${c.nom} | ${c.lieux.map(l => scenes[l] ? scenes[l].title : l).join(' · ')} |`), '',
  '- **Mortebrune**, le chef-lieu : le château du roi Dagobert, sa citadelle, le cimetière, et la Tour de l\'Archimage où vit Fizzlebarbe.',
  '- **La côte** : contrebande, brume, un navire fantôme qui ne repart jamais, et deux établissements thermaux (les Thermes Enchantés sur la falaise, les Grands Bains au sud-ouest).',
  '- **La campagne de Bois-Tordu** : le carrefour de la baronnie. Tout le monde finit par passer au Sanglier Borgne.',
  '- **Les Monts Grimaces** : les nains creusent, les gobelins comptent, le dragon dort (en principe).',
  '- **Le quartier savant** : deux écoles rivales (l\'Académie de Magie et l\'Université des Sortilèges) et une bibliothèque dont personne ne rend les livres.',
  '- **Sur la route** : la Foire aux Sortilèges (qui devient la Grande Foire des Mille Merveilles une fois par an) et le Palais des Mille Vœux, ambassade d\'un pays lointain dont la djinn est la seule à connaître le nom.',
  'Dans le jeu, la **carte de Brumeval** (illustration `assets/map/brumeval2`) est épinglée au centre du bureau, chaque lieu avec sa pastille.');

P('## 3. L\'enquêteur',
  'L\'enquêteur est la seule personne compétente de la baronnie, et ça l\'épuise. **Il reste une voix : on ne le voit jamais.** Son nom et son origine sont volontairement laissés ouverts. Sa voix est sèche, polie, au bord de la crise de nerfs : il ne crie jamais, il soupire, puis reformule pour les plus lents.',
  'On l\'entend à trois endroits :',
  '1. **L\'introduction de chaque enquête** (ce qu\'on lui a raconté en arrivant, à la première personne). Voir la section 7 pour toutes les introductions.',
  '2. **Les conseils du bouton 💡 Indice** : ce qu\'il marmonne en relisant ses notes. Un conseil par technique de déduction :', '',
  '| Technique | Ce qu\'il marmonne |', '| --- | --- |',
  ...hints.map((h, i) => `| ${TECH[i]} | ${h} |`), '',
  '   Si un personnage confirmé est mal placé, le bouton le signale d\'abord : « Quelque chose cloche : <personnage> n\'est pas à sa place. »',
  '3. **Le verdict** : c\'est lui qui ouvre chaque épilogue (« Vous étiez seul avec… ») et donne la réplique au coupable.');
const prologue = J('lore/prologue.json').scenes;
P('### Le prologue',
  'À la première partie (après « Jouer »), quatre scènes au centre de l\'écran présentent le monde, l\'enquêteur et le fil rouge. On peut les passer, et les revoir depuis le carnet (« 📜 Revoir le prologue »). La dernière mène au bureau.');
prologue.forEach((sc, i) => {
  if (sc.guide) P(`**${i + 1}. ${sc.titre}** (mode d'emploi)`, ...sc.guide.map((g, k) => `${k + 1}. ${g}`), `*${sc.conseil}*`);
  else if (sc.sceau) P(`**${i + 1}. ${sc.titre}** — ${sc.de} (cachet « ${sc.sceau} »)`, quote(sc.texte.split('\n').join('\n\n')), `> ${sc.signature}`, ...(sc.apres ? [`*${sc.apres}*`] : []));
  else P(`**${i + 1}. ${sc.titre}** (sur l'illustration de la carte)`, quote(sc.texte.split('\n').join('\n\n')));
});
P('Ensuite, le bureau : seul le château est ouvert, les autres lieux se découvrent au fil des lettres (section 11).');

P('## 4. La troupe récurrente',
  'Chaque type de personnage est **un seul personnage, au nom fixe**, que l\'on retrouve d\'une enquête à l\'autre. Dans une enquête, il porte une **pastille** : l\'initiale de son nom (ou le plus court début qui le distingue des autres personnages présents : Fa pour Fausset, Fl pour Flammèche…). Les fiches sont rangées de la plus facile à placer à la plus difficile.',
  '**Comment lire les épilogues** : la première réplique est celle de l\'enquêteur, puis elles alternent. Les gabarits sont remplacés à la construction de l\'énigme :',
  '- `{victime}` : le nom de la victime ; `{Il}`/`{il}`, `{lui}`, `{e}` : les accords sur la victime (elle/il, accord en e) ;',
  '- `{menace}` : ce que l\'invité de passage venait faire au coupable (voir section 6), par exemple « me faire payer l\'impôt sur tout ce que je possède ».',
  'Exemple rempli : pour Capucine face à Prudence l\'abbesse, « {Il} voulait {menace}. Moi qui dois déjà trois tournées ! » devient « Elle voulait me faire la morale. Moi qui dois déjà trois tournées ! »');
const lieuxDe = {};
for (const [name, s] of Object.entries(scenes)) for (const c of s.characters) (lieuxDe[c.archetype] = lieuxDe[c.archetype] || []).push(s.title);
for (const b of big) for (const t of b.big) { const s = scenes[b.scene]; if (s) (lieuxDe[t] = lieuxDe[t] || []).push(s.title + ' (grand monstre)'); }
for (const [t, a] of troupe) {
  const lieux = [...new Set(lieuxDe[t] || [])];
  if (t === 'archimage' && !lieux.includes(testament.title)) lieux.push(testament.title + ' — l\'affaire finale (victime)');
  P(`### ${a.name} — ${a.desc.split(',')[0]}${a.big ? ' (grand monstre)' : ''}`,
    `- **Type** : \`${t}\` · ${a.gender === 'f' ? 'féminin' : 'masculin'}`,
    `- **Trait** : ${a.desc}`,
    `- **Tic de langage** : ${a.tic}`,
    ...(a.traits ? [`- **Pouvoir** : ${a.traits.includes('spectre') ? 'spectre — peut se tenir sur les meubles bloquants (il respecte quand même lignes et colonnes)' : a.traits.join(', ')}`] : []),
    ...(a.big ? ['- **Grand monstre** : occupe plusieurs cases (2 jusqu\'en 8×8, 2 ou 3 en 9×9, 2 à 4 au-delà), forme propre à chaque enquête, jamais placé en premier.'] : []),
    `- **Où on le croise** : ${lieux.length ? lieux.join(' · ') : '—'}`,
    '- **Épilogue quand il est coupable** :', quote(a.epilogue));
}

P('## 5. Les liens entre personnages',
  'Les mobiles viennent de ces liens. Ils nourrissent les épilogues, les lettres d\'Augure et les gags.', '',
  '| Entre | Lien | Ce que ça donne |', '| --- | --- | --- |',
  '| Grippesou et Capucine | Trois tournées impayées, devenues trois cents avec les intérêts | Le tavernier tient un registre des dettes de toute la baronnie |',
  '| Grippesou et Bâfrin | Patron et plongeur, payé en restes | Bâfrin casse une assiette par jour, Grippesou la retient sur sa paie |',
  '| Dagobert et Bakchich | Le roi et son trésorier ; le trésor est vide, personne ne sait pourquoi | Toute enquête au château finit par une question d\'argent |',
  '| Dagobert et Blafard | Blafard était châtelain avant Dagobert et n\'a jamais rendu les clés | Querelle de propriété vieille de quatre siècles |',
  '| Gontran et Flammèche | Le chevalier l\'a adopté « pour le dresser » | C\'est surtout l\'armure de Gontran qui fond |',
  '| Fausset et Goémone | Il lui écrit des chansons ; elle chante juste | Amour sans espoir, donc inépuisable |',
  '| Aëlys et Fricot | La critique a donné deux sur dix au Banquet des Gobelins | Fricot rêve de la faire goûter à sa marmite |',
  '| Fizzlebarbe et Fiolius | L\'Académie contre l\'Université ; chacun dit que l\'autre a copié sa thèse | Les deux écoles se sabotent leurs examens |',
  '| Fizzlebarbe et Fernand | Fernand était son apprenti ; une réparation de la Tour l\'a tué il y a vingt ans (il est revenu en zombie, sans sa main) | Rancune légitime : jamais payé ni reconnu, les risques jamais expliqués |',
  '| Fizzlebarbe et tout le monde | 412 ans et toujours pas de successeur | Chacun croit pouvoir hériter de la Tour, qui n\'est pas un bien mais une charge (le fil rouge) |',
  '| Ciguë et Ambroise | C\'est elle qui l\'a changé en crapaud ; il refuse de dire pourquoi | Ambroise cherche un bisou, Ciguë cherche une recette |',
  '| Dewey et Gribouille | Gribouille a emprunté un grimoire il y a onze ans | Dewey le cherche dans toute la baronnie, en criant |',
  '| Esbroufe et Clairvoya | Associés à la foire : lui vend les élixirs, elle prédit qu\'ils marchent | Leurs clients reviennent rarement contents |',
  '| Frégaton et Bâbord | Le capitaine qui ne part jamais, le pirate qui se perd toujours | Ils se disputent le même navire depuis vingt ans |',
  '| Augure et tous | Le corbeau voit beaucoup et l\'écrit (sans tout comprendre) | Chacun le soupçonne, personne ne l\'attrape — et pour cause (section 9) |');

P('## 6. Les invités de passage (les victimes)',
  'La victime est **toujours un invité de passage**, un personnage d\'un jour venu de l\'extérieur, souvent pour embêter quelqu\'un. La troupe reste ainsi vivante d\'une enquête à l\'autre. Seule exception : l\'affaire finale, où meurt Fizzlebarbe (section 9).',
  'Chaque invité a un **motif** (pourquoi il est venu, cité dans l\'introduction : « venu{e} … ») et une **menace** (ce qu\'il venait faire au coupable, citée dans l\'épilogue). Sa carte de victime affiche sa description, puis « La victime. Elle était seule avec son meurtrier. »', '',
  'Depuis le 2026-10-19 (audit du lore), **le nom de la victime change à chaque affaire** : la profession, le portrait, le motif et la menace restent, le nom est tiré d\'une liste de vingt (`names` dans `cast.json`, tirage sans doublon par `build-puzzles.js`). Un même visiteur ne meurt donc plus seize fois ; Brumeval tue simplement beaucoup de percepteurs.', '',
  '| Invité | Nom | Description | Motif (« venu… ») | Menace (dans l\'épilogue) |', '| --- | --- | --- | --- | --- |',
  ...guests.map(([t, a]) => `| ${a.title} (\`${t}\`) | ${(a.names || [a.name]).join(', ')} (${a.gender === 'f' ? 'f' : 'm'}) | ${a.desc} | ${a.motif} | ${a.menace} |`), '',
  'Dans chaque lieu, les invités sont tous différents d\'une enquête à l\'autre ; le titre d\'une enquête est « <lieu> — l\'affaire <invité> ».');

P('## 7. Les lieux, un par un',
  'Pour chaque lieu : sa taille de carte, ses pièces, ses habitués (les suspects possibles : dans chaque enquête, l\'un d\'eux est absent et un invité est la victime), ses invités, son introduction (voix de l\'enquêteur) et sa lettre d\'Augure.',
  'Gabarits des introductions : `{Titre}`/`{titre}` = titre de l\'invité (« le percepteur »), `{victime}` = son nom, `{motif}` = son motif, `{e}`/`{lui}` = accords, `{Nombre}` = nombre de suspects en toutes lettres.');
const order = carte.contrees.flatMap(c => c.lieux);
for (const name of order) {
  const s = scenes[name];
  if (!s) continue;
  const cases = autoCases(name, s);
  const bigs = big.filter(b => b.scene === name);
  const nb = puzzles.filter(p => p.place === name && !p.final).length;
  const contree = carte.contrees.find(c => c.lieux.includes(name)).nom;
  P(`### ${s.title}`,
    `- **Contrée** : ${contree} · **carte** : ${s.size}×${s.size} · **enquêtes** : ${nb}${s.decor && s.decor !== name ? ` · illustration reprise de « ${s.decor} »` : ''}`,
    `- **Pièces** : ${Object.values(s.rooms).map(r => r.name).join(', ')} (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)`,
    `- **Habitués** : ${s.characters.map(c => cast[c.archetype].name).join(', ')}`,
    `- **Invités** (enquêtes normales) : ${cases.map(c => cast[c.guest].name + ' (' + cast[c.guest].title + ')').join(', ')}`,
    ...(bigs.length ? [`- **Enquêtes à grands monstres** : ${bigs.map(b => `${b.big.map(t => cast[t].name).join(' et ')} (forme ${b.shapes.join(', ')}${b.hidden ? ', cachée' : ''}) — victime ${cast[b.victim].name}`).join(' ; ')}`] : []),
    '- **Introduction** :', quote(s.auto.intro),
    '- **Lettre d\'Augure** :', quote((lettres.letters[name] || '—') + ' — A.'));
}

P('## 8. Le fil rouge : la vérité cachée et les lettres d\'Augure',
  '### La vérité fixe (canon)',
  '- **Le Nœud de Brume** : il y a environ 412 ans, Fizzlebarbe a découvert un déséquilibre magique qui menaçait les six contrées et a installé sous sa Tour un dispositif qui aide à les garder en équilibre (chemins, frontières, phénomènes magiques locaux). Ses effets visibles restent limités : brume anormale, repères qui semblent changer, trajets qui ne mènent pas où on l\'attend, plans de la Tour incomplets.',
  '- **Le Palier zéro** : un espace caché de la Tour, dans un pli magique, absent des plans publics. Il abrite les archives de création du Nœud et les documents de la charge.',
  '- **La Tour est une charge, pas un bien** : Fizzlebarbe n\'en est pas le propriétaire mais le gardien. La garde peut se transmettre ; la Tour ne se vend pas, ne se met pas en gage et ne se lègue pas comme une maison.',
  '- **Le testament n\'était qu\'un projet** de transmission, confié sous scellé au notaire, jamais finalisé. Les prétendants se battent pour une propriété qu\'aucun ne peut posséder.',
  '- **Fizzlebarbe** : compétent, mais très mauvais pour faire confiance. Il a fait surveiller les prétendants par Augure sans jamais leur expliquer ce qu\'il cherchait à transmettre, ni demander à Augure ce que lui voulait.',
  '- **Augure** écrit les rapports pour Fizzlebarbe et, dans son dos, en glisse des copies sous la porte de l\'enquêteur, quand la dernière affaire du lieu concerné est résolue : il espère qu\'un regard extérieur verra ce que son maître refuse de voir. Il n\'est pas omniscient. C\'est lui qui a repris le projet chez le notaire (d\'où la plume noire), de peur qu\'un prétendant s\'en serve.',
  '- **Le grimoire et la clé** : il y a onze ans, Gribouille a perdu dans la Tour le grimoire emprunté à Dewey. Fizzlebarbe l\'a retrouvé et y a caché une clé de service, qui ouvre un premier accès vers le Palier zéro (pas le contrôle du Nœud). Dewey retrouve le livre sans comprendre ce que cache la reliure.',
  '- **Fernand** : apprenti de Fizzlebarbe, il est mort il y a vingt ans pendant une réparation liée aux installations de la Tour, et il est revenu en zombie, sans sa main. Négligence et conflit de travail, pas tentative de meurtre : jamais payé, jamais reconnu, jamais prévenu des risques.',
  '### Chronologie de référence', '',
  '| Quand | Fait |', '| --- | --- |',
  '| Il y a environ 412 ans | Fizzlebarbe installe le Nœud de Brume sous la Tour et en devient le gardien. |',
  '| Il y a environ 20 ans | Fernand meurt pendant une réparation de la Tour et revient en zombie, sans sa main. |',
  '| Il y a environ 11 ans | Gribouille perd le grimoire de Dewey dans la Tour ; Fizzlebarbe y cache une clé de service. |',
  '| Quelques mois avant la fin | Fizzlebarbe envisage enfin de transmettre la garde et fait surveiller les prétendants par Augure. Les rumeurs d\'héritage s\'emballent. |',
  '| Peu avant la fin | Serrures changées, coffre anti-magie commandé, projet scellé chez le notaire ; Augure reprend le projet et glisse ses copies sous la porte de l\'enquêteur. |',
  '| La nuit de l\'affaire finale | Fizzlebarbe est tué avant d\'avoir transmis la garde ; le coupable est celui que désigne la grille. |',
  '| Après le verdict | Les archives du Palier zéro révèlent le Nœud, la charge et le rôle d\'Augure. |',
  '| Après le verdict | L\'enquêteur scelle les archives du Palier zéro et garde la clé, à titre provisoire, quel que soit le coupable (Augure compris). |', '| Suite prévue | Fizzlebarbe revient en spectre (« quelqu\'un a déplacé les meubles de la Tour ») et reprend la garde à sa façon. |', '',
  'Les enquêtes ordinaires se jouent dans n\'importe quel ordre : c\'est la chronologie du monde, pas un ordre imposé au joueur.',
  '### Les lettres',
  `Quand la dernière enquête d'un lieu est résolue (5 à 7 par lieu), l'enquêteur trouve **une lettre glissée sous sa porte**, signée « — A. ». Il y a **une lettre par lieu** (${Object.keys(lettres.letters).length} en tout), reçue quand le joueur ouvre l'enveloppe (c'est elle qui ouvre alors les lieux suivants). Elles se lisent dans **n'importe quel ordre**, chacune se comprend seule, aucune ne révèle la solution de l'enquête qui la donne (elle n'apparaît qu'après la victoire). Ce sont des rapports d'Augure sur les prétendants : ragots, caractère, et des indices qui se répondent (la clé et le grimoire, l'étage manquant des plans, la brume du port, la puissance mesurée par le Palais), qu'on relit autrement après la fin.`, '',
  '| Lieu | Lettre |', '| --- | --- |',
  ...order.filter(n => lettres.letters[n]).map(n => `| ${scenes[n] ? scenes[n].title : n} | ${lettres.letters[n]} |`), '',
  `**Débloquer la fin** : avec **les ${lettres.need} lettres** (toutes : décision de François, 2026-10-19), l'affaire finale s'ouvre. La fin est donc vraiment la fin : Fizzlebarbe ne peut plus réapparaître vivant dans une enquête jouée après sa mort.`);

P('## 9. L\'affaire finale : le testament de Fizzlebarbe',
  `**${testament.title} — ${testament.subtitle}** (c'est ainsi que la baronnie appelle l'affaire) : carte ${testament.size}×${testament.size}, la Tour de l'Archimage, la nuit où Fizzlebarbe devait régler sa succession.`,
  `- **Pièces** : ${Object.values(testament.rooms).map(r => r.name).join(', ')}`,
  '- **Victime** : Fizzlebarbe (seule victime de la troupe : la mort d\'un récurrent, prévue comme un événement)',
  `- **Suspects, les neuf prétendants** : ${testament.characters.filter(c => c.role !== 'victim').map(c => cast[c.archetype].name).join(', ')}`,
  '- **Vérité fixe / vérité variable** : le meurtrier est celui que désigne la grille (n\'importe lequel des neuf) ; son épilogue donne son mobile. Tout le reste (le Nœud, le Palier zéro, le projet de transmission, le rôle d\'Augure) est vrai quel que soit le coupable.',
  '- **Introduction** :', quote(testament.intro),
  '- **Épilogues** : chaque prétendant a le sien, quatre répliques, propre à son mobile (des croyances fausses sur la Tour, pour la plupart).');
for (const [t, e] of Object.entries(testament.epilogues)) P(`**Si le coupable est ${cast[t].name}** :`, quote(e));
const R = testament.revelation;
P('### La révélation commune',
  'Après l\'épilogue, quel que soit le coupable, la scène du verdict propose « 📜 Dans les archives du Palier zéro… » : la lettre de Fizzlebarbe, puis le billet d\'Augure. Le verdict, dans la colonne, permet de la relire.',
  '**La lettre de Fizzlebarbe**', quote(R.lettre.split('\n').join('\n\n')), `> **${R.signature}**`,
  '**Le billet d\'Augure**', quote(R.billet + ' — A.'), `*${R.apres}*`,
  '**Ce que ça règle** : la Tour était une charge, le testament un projet, la garde reste à transmettre. Augure, qui ne convoitait pas la Tour, veille sur les archives sans en être propriétaire. Fizzlebarbe reviendra en spectre, furieux que sa succession ne soit pas terminée ; Blafard l\'accueillera dans la confrérie des défunts mécontents.');

P('## 10. Gags récurrents',
  'Des petites histoires qui courent d\'une enquête à l\'autre, sans jamais compter pour la solution :',
  '- **Le registre de Grippesou** : la dette de Capucine grossit. Dans le carnet, sa fiche affiche « Dette au Sanglier Borgne : N tournées » (3 de départ, plus 3 par enquête résolue où l\'on a croisé Capucine).',
  '- **Le navire qui ne part pas** : dans chaque enquête du port, Frégaton annonce qu\'il lève l\'ancre demain. Sa fiche tient le compte : « Départs annoncés : N. Départs effectués : 0. »',
  '- **Festin et le mardi** : végétarien « depuis mardi », quel que soit le jour (affiché sur sa fiche).',
  '- **« De mon temps » contre « de mon vivant »** : Fizzlebarbe et Blafard se disputent le titre du plus vieux de la baronnie.',
  '- **Le grimoire de Gribouille** : Dewey le cherche partout (une lettre le retrouve dans la Tour).',
  '- **L\'armure de Gontran** : elle rétrécit encore (ou c\'est lui qui grossit, mais personne ne le lui dit).',
  '- **Le bisou d\'Ambroise** : il réclame un bisou à chaque personnage féminin pour redevenir prince ; toutes refusent. Seule Ciguë accepte de s\'occuper de lui, mais pour le cuisiner.',
  '- **Écho-Écho** : il répète tout, dans le désordre, ce qui en fait un témoin très embarrassant.');

P('## 11. Le lore dans le jeu : comment tout s\'articule',
  '### Le parcours du joueur',
  '1. **Accueil** : l\'affiche, le titre, le sceau « Jouer ».',
  '2. **Le prologue** (première partie seulement), puis **le bureau de l\'enquêteur** : la carte de Brumeval épinglée au centre, déjà en grand. Les lieux ouverts ont une pastille (« ! » tant qu\'on ne les a pas visités, ✓ quand toutes leurs enquêtes sont résolues ; au survol : nom et progression) ; les autres sont des « ? ». Aucun texte : dans les coins, les objets cliquables (**dossiers classés**, **lettres anonymes** avec un cachet rouge qui bat tant qu\'une lettre n\'est pas lue, **carnet d\'enquête**), et un peu de décor (loupe, encrier, bougie). Plus de classement par taille.',
  '3. **Le déblocage** : au départ, seul **' + (scenes[carte.start] ? scenes[carte.start].title : carte.start) + '** est ouvert. Chaque lieu compte 5 à 7 enquêtes actives (`lore/actives.json`) ; la dernière résolue apporte la lettre du lieu et ouvre les lieux suivants (un nouveau clou sur la carte, relié par le fil rouge) :', '',
  ...Object.entries(carte.unlock).map(([a, b]) => `- ${scenes[a] ? scenes[a].title : a} → ${b.map(l => scenes[l] ? scenes[l].title : l).join(', ')}`), '',
  '4. **Page d\'un lieu** : sa lettre (ou « Encore N enquêtes ici, et une lettre sur ce lieu glissera sous ta porte ») et ses enquêtes. Le bouton ‹ d\'une enquête ramène au lieu, ou aux dossiers si on l\'a ouverte de là. « Enquête suivante » propose la prochaine enquête non résolue du même lieu.',
  '5. **L\'enquête** : à la première ouverture, une **scène au centre de l\'écran** montre l\'illustration du décor, le titre et l\'introduction de l\'enquêteur (« À l\'enquête »). Le titre en haut la rouvre à tout moment.',
  '6. **La victoire** : le tampon « Affaire résolue », puis une **scène centrée** : le portrait du coupable, « Seul suspect dans la pièce de <victime>. » et l\'épilogue dialogué. Si l\'enquête apporte une lettre : « 📜 Une lettre a été glissée sous la porte… » ouvre **la lettre en grand** (cachet de cire « A », lieu, texte, « — A. »), annonce les lieux qui s\'ouvrent sur la carte et la progression, avec « Plus tard » ou « 🗺️ Retour au bureau ».',
  '7. **Lettres, dossiers, carnet** : les lettres reçues (les nouvelles marquées, lues dès qu\'on ouvre le courrier) ; les dossiers en cours et classés ; le carnet avec les **fiches de la troupe croisée** (portrait, nom, trait, tic, gags qui se voient) et « 📜 Revoir le prologue ».',
  `8. **L'affaire finale** : à ${lettres.need} lettres, **une enveloppe scellée** apparaît sur le bureau (absente avant). Elle n'est dans aucun lieu.`,
  '### Les règles du jeu liées au lore (écran des règles)',
  '- La victime est un invité de passage ; les suspects sont les habitués, qu\'on retrouve d\'une enquête à l\'autre.',
  '- Chacun porte une pastille avec l\'initiale de son nom (deux lettres si deux noms commencent pareil) ; les fiches vont de la plus facile à placer à la plus difficile.',
  '- Le bureau : au début seul le château est ouvert, chaque affaire résolue ouvre de nouveaux lieux.',
  '- Lettres anonymes : la dernière enquête résolue dans chaque lieu (5 à 7 par lieu) donne une lettre, rangée sur le bureau ; assez de lettres, et il se passera quelque chose.',
  '- Seule la pièce du crime contient deux personnes, et chaque pièce est occupée.',
  '### Progression',
  '- Les lettres trouvées sont gardées dans le navigateur (`grimdoku:lettres`), les lettres lues aussi (`grimdoku:lettres-lues`).',
  '- Les lettres ne sont pas rétroactives : l\'arrivée du lore remet la progression à zéro (les enquêtes ont de nouveaux identifiants).',
  '- Chaque enquête garde sa partie en cours et son état résolu ; l\'introduction ne s\'ouvre d\'elle-même qu\'une fois (`grimdoku:seen:<id>`).');

P('## 12. Règles de cohérence',
  '- **Les lettres restent anonymes jusqu\'à la révélation** : dans le jeu, elles s\'appellent « lettres anonymes », signées « — A. » ; le nom d\'Augure n\'apparaît comme leur auteur qu\'après la victoire de l\'affaire finale (billet d\'Augure). Le soupçon est permis (un corbeau qui écrit au lieu de parler, une plume noire chez le notaire, un corbeau à la fenêtre dans le prologue), la confirmation non. Ce document, lui, les appelle « lettres d\'Augure » : il dévoile tout.',
  '- **La troupe ne meurt pas** : la victime est un invité. Un récurrent ne meurt que rarement, comme un événement (Fizzlebarbe), et revient alors en spectre.',
  '- **Pas de chronologie imposée** entre les enquêtes, sauf l\'affaire finale, qui vient après les lettres.',
  '- **Les textes ne dépendent jamais de la position** d\'un personnage (sauf l\'épilogue, écrit une fois la solution connue). Les introductions ne nomment aucun suspect de façon trompeuse : un habitué cité (le roi, le meunier…) peut être présent ou non.',
  '- **Les indices sont générés**, jamais écrits en personnage.',
  '- **Rien ne doit trahir une solution** avant la victoire ; ce document ne contient aucune solution.',
  '- **Ton** : Kaamelott, courts, un tic par personnage, l\'enquêteur poli et épuisé.');

P('## 13. Où vivent les données (pour modifier le lore)',
  '| Quoi | Fichier |', '| --- | --- |',
  '| Personnages (nom, trait, tic, épilogue), invités (motif, menace) | `cast.json` |',
  '| Lieux : plan, pièces, habitués, introduction (`auto.intro`) | `scenes/<lieu>.json` |',
  '| Lettres d\'Augure, nombre de lettres pour la fin (`need`) | `lore/lettres.json` |',
  '| Carte : contrées, position des pastilles, illustration retenue | `lore/carte.json`, `assets/map/` |',
  '| Affaire finale : plan, introduction, épilogues, révélation commune (`revelation`) | `scenes/testament.json` |',
  '| Prologue (quatre scènes de la première partie) | `lore/prologue.json` |',
  '| Canon de référence, plan d\'application | `lore/GRIMDOKU_MATRICE_CONTINUITE.md`, `lore/PLAN_MIGRATION_CANON.md` |',
  '| Enquêtes à grands monstres (formes, victimes) | `big-cases.json` |',
  '| Conseils de l\'enquêteur, scènes, carnet, carte | `app/template.html` |',
  '| La bible de travail (document partagé) | https://claude.ai/code/artifact/b1eaad27-d50f-4faf-8b14-30a2ef2e9e65 |',
  'Ce fichier se régénère depuis ces données (`node tools/lore-md.js`) : une modification de `cast.json` ou des décors s\'y retrouve à la génération suivante.');

fs.writeFileSync(path.join(ROOT, 'lore', 'LORE.md'), out.join('\n'));
console.log('lore/LORE.md :', out.join('\n').length, 'caractères,', out.join('\n').split('\n').length, 'lignes');
