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
for (const f of fs.readdirSync(path.join(ROOT, 'scenes'))) {
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
  '**Attention : ce document dévoile la fin du fil rouge (qui écrit les lettres, et pourquoi).**');

P('## Sommaire', '1. Intentions et ton', '2. Le monde : la baronnie de Brumeval', '3. L\'enquêteur', '4. La troupe récurrente (38 personnages)', '5. Les liens entre personnages', '6. Les invités de passage (les victimes)', '7. Les lieux, un par un', '8. Le fil rouge : les lettres d\'Augure', '9. L\'affaire finale : le testament de Fizzlebarbe', '10. Gags récurrents', '11. Le lore dans le jeu : comment tout s\'articule', '12. Règles de cohérence', '13. Où vivent les données (pour modifier le lore)');

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
  'Dans le jeu, la **carte de Brumeval** (illustration `assets/map/brumeval2`) montre chaque lieu avec une pastille numérotée.');

P('## 3. L\'enquêteur',
  'L\'enquêteur est la seule personne compétente de la baronnie, et ça l\'épuise. **Il reste une voix : on ne le voit jamais.** Son nom et son origine sont volontairement laissés ouverts. Sa voix est sèche, polie, au bord de la crise de nerfs : il ne crie jamais, il soupire, puis reformule pour les plus lents.',
  'On l\'entend à trois endroits :',
  '1. **L\'introduction de chaque enquête** (ce qu\'on lui a raconté en arrivant, à la première personne). Voir la section 7 pour toutes les introductions.',
  '2. **Les conseils du bouton 💡 Indice** : ce qu\'il marmonne en relisant ses notes. Un conseil par technique de déduction :', '',
  '| Technique | Ce qu\'il marmonne |', '| --- | --- |',
  ...hints.map((h, i) => `| ${TECH[i]} | ${h} |`), '',
  '   Si un personnage confirmé est mal placé, le bouton le signale d\'abord : « Quelque chose cloche : <personnage> n\'est pas à sa place. »',
  '3. **Le verdict** : c\'est lui qui ouvre chaque épilogue (« Vous étiez seul avec… ») et donne la réplique au coupable.');

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
  '| Fizzlebarbe et Fernand | Fernand était son apprenti avant « l\'accident » | Fernand attend toujours son diplôme, et vingt ans de salaire |',
  '| Fizzlebarbe et tout le monde | 412 ans et pas de testament | Chacun espère hériter de la Tour (le fil rouge) |',
  '| Ciguë et Ambroise | C\'est elle qui l\'a changé en crapaud ; il refuse de dire pourquoi | Ambroise cherche un bisou, Ciguë cherche une recette |',
  '| Dewey et Gribouille | Gribouille a emprunté un grimoire il y a onze ans | Dewey le cherche dans toute la baronnie, en criant |',
  '| Esbroufe et Clairvoya | Associés à la foire : lui vend les élixirs, elle prédit qu\'ils marchent | Leurs clients reviennent rarement contents |',
  '| Frégaton et Bâbord | Le capitaine qui ne part jamais, le pirate qui se perd toujours | Ils se disputent le même navire depuis vingt ans |',
  '| Augure et tous | Le corbeau sait tout et l\'écrit | Chacun le soupçonne, personne ne l\'attrape — et pour cause (section 9) |');

P('## 6. Les invités de passage (les victimes)',
  'La victime est **toujours un invité de passage**, un personnage d\'un jour venu de l\'extérieur, souvent pour embêter quelqu\'un. La troupe reste ainsi vivante d\'une enquête à l\'autre. Seule exception : l\'affaire finale, où meurt Fizzlebarbe (section 9).',
  'Chaque invité a un **motif** (pourquoi il est venu, cité dans l\'introduction : « venu{e} … ») et une **menace** (ce qu\'il venait faire au coupable, citée dans l\'épilogue). Sa carte de victime affiche sa description, puis « La victime. Elle était seule avec son meurtrier. »', '',
  '| Invité | Nom | Description | Motif (« venu… ») | Menace (dans l\'épilogue) |', '| --- | --- | --- | --- | --- |',
  ...guests.map(([t, a]) => `| ${a.title} (\`${t}\`) | ${a.name} (${a.gender === 'f' ? 'f' : 'm'}) | ${a.desc} | ${a.motif} | ${a.menace} |`), '',
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

P('## 8. Le fil rouge : les lettres d\'Augure',
  `Après chaque enquête résolue, l'enquêteur trouve **une lettre anonyme glissée sous la porte**. Il y a **une lettre par lieu** (${Object.keys(lettres.letters).length} en tout) : c'est la **première enquête résolue dans un lieu** qui la donne. Les lettres se lisent dans **n'importe quel ordre** ; aucune ne dépend d'une autre ni ne révèle la solution de l'enquête qui la donne (elle n'apparaît qu'après la victoire).`,
  'Ensemble, elles racontent une affaire plus grande : **le testament de Fizzlebarbe**. L\'archimage, 412 ans, va enfin rédiger un testament et léguer la Tour « à celui qui le mérite », sans dire qui. Chaque lettre est un ragot sur un héritier possible :', '',
  '| Lieu | Lettre |', '| --- | --- |',
  ...order.filter(n => lettres.letters[n]).map(n => `| ${scenes[n] ? scenes[n].title : n} | ${lettres.letters[n]} |`), '',
  `**Les héritiers et ce que les lettres disent d'eux** : Bakchich (a mis la Tour en gage, a trinqué « au futur propriétaire »), Fernand (clé refaite, vingt ans de salaire dus), Fiolius (malle géante, bocaux « souvenirs de la Tour », plans annotés « Annexe de l'Université »), Brindille (prédiction de Clairvoya, entraînement au sort d'ouverture des serrures), Blafard (titres de propriété vieux de quatre siècles), Dewey (grimoire retrouvé dans la Tour, potions qui font apparaître les testaments), Gribouille (dette au Sanglier Borgne payable « dès que la Tour sera à lui »), Fumerolle (a promis la Tour à trois personnes), et un indice qui ne pointe personne en particulier : la plume noire laissée chez le notaire.`,
  `**Débloquer la fin** : avec **${lettres.need} lettres**, l'affaire finale s'ouvre (pas besoin de tout finir).`);

P('## 9. L\'affaire finale : le testament de Fizzlebarbe',
  `**${testament.title} — ${testament.subtitle}** : carte ${testament.size}×${testament.size}, la Tour de l'Archimage, la nuit où Fizzlebarbe devait signer son testament.`,
  `- **Pièces** : ${Object.values(testament.rooms).map(r => r.name).join(', ')}`,
  `- **Victime** : Fizzlebarbe (seule victime de la troupe : c'est la mort d'un récurrent, prévue comme un événement)`,
  `- **Suspects, les neuf héritiers** : ${testament.characters.filter(c => c.role !== 'victim').map(c => cast[c.archetype].name).join(', ')}`,
  '- **Introduction** :', quote(testament.intro),
  '- **Épilogues** : chaque héritier a le sien, et tous (sauf le corbeau) se terminent par la révélation.');
for (const [t, e] of Object.entries(testament.epilogues)) P(`**Si le coupable est ${cast[t].name}** :`, quote(e));
P('**La révélation** : les lettres n\'étaient pas l\'œuvre d\'un maître chanteur. **Augure travaillait pour Fizzlebarbe** : l\'archimage lui faisait espionner tous ses héritiers pour décider qui méritait la Tour. Sa conclusion, dans la dernière lettre : il la léguait à celui qui ne la convoitait pas… et il n\'y en avait aucun. Si c\'est Augure le coupable, il avoue par billets qu\'il en avait assez d\'écrire, et qu\'il ne voulait pas de la Tour.',
  '**Suite prévue** : Fizzlebarbe reviendra en spectre, furieux d\'avoir été assassiné avant d\'avoir signé ; Blafard l\'accueillera dans la confrérie des défunts mécontents.');

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
  '2. **Choisis ta taille** : un parchemin par taille de carte (6×6 à 12×12), plus trois entrées du lore : **🗺️ Carte de Brumeval**, **📖 Carnet d\'enquête** (avec « ✉️ N nouvelle(s) lettre(s) » tant qu\'elles ne sont pas lues) et **l\'affaire finale** (verrouillée : « Une affaire se prépare… Encore N lettres d\'Augure »). À terme, la carte remplacera le classement par taille.',
  '3. **Carte de Brumeval** : une pastille numérotée par lieu sur l\'illustration (au survol, sur ordinateur : nom du lieu, enquêtes résolues, 📜 si sa lettre est trouvée ; pastille rouge quand le lieu est terminé), puis la liste des lieux par contrée.',
  '4. **Page d\'un lieu** : sa lettre (ou « Une lettre d\'Augure attend ici la première enquête résolue ») et ses enquêtes. Le bouton ‹ d\'une enquête ouverte d\'ici ramène à ce lieu.',
  '5. **L\'enquête** : à la première ouverture, une **scène au centre de l\'écran** montre l\'illustration du décor, le titre et l\'introduction de l\'enquêteur (« À l\'enquête »). Le titre en haut la rouvre à tout moment.',
  '6. **La victoire** : le tampon « Affaire résolue », puis une **scène centrée** : le portrait du coupable, « Seul suspect dans la pièce de <victime>. » et l\'épilogue dialogué. Si l\'enquête apporte une lettre : « 📜 Une lettre a été glissée sous la porte… » ouvre **la lettre en grand** (cachet de cire « A », lieu, texte, « — A. », progression « N / 23 lettres · encore M avant que tout s\'éclaire »), avec « Ranger dans mon carnet » ou « Ouvrir le carnet ». Le verdict reste résumé dans la colonne de droite (avec la lettre).',
  '7. **Le carnet d\'enquête** : les lettres trouvées (les nouvelles sont marquées), les lieux sans lettre, et les **fiches de la troupe croisée** (portrait, nom, trait, tic, gags qui se voient). Une fiche apparaît quand on a résolu une enquête où ce personnage était présent.',
  `8. **L'affaire finale** : à ${lettres.need} lettres, elle s'ouvre depuis la page des tailles. Elle n'est dans aucune taille ni aucun lieu.`,
  '### Les règles du jeu liées au lore (écran des règles)',
  '- La victime est un invité de passage ; les suspects sont les habitués, qu\'on retrouve d\'une enquête à l\'autre.',
  '- Chacun porte une pastille avec l\'initiale de son nom (deux lettres si deux noms commencent pareil) ; les fiches vont de la plus facile à placer à la plus difficile.',
  '- Lettres d\'Augure : la première enquête résolue dans chaque lieu donne une lettre anonyme, rangée dans le carnet ; assez de lettres, et une affaire très spéciale se débloque.',
  '- Seule la pièce du crime contient deux personnes, et chaque pièce est occupée.',
  '### Progression',
  '- Les lettres trouvées sont gardées dans le navigateur (`grimdoku:lettres`), les lettres lues aussi (`grimdoku:lettres-lues`).',
  '- Les lettres ne sont pas rétroactives : l\'arrivée du lore remet la progression à zéro (les enquêtes ont de nouveaux identifiants).',
  '- Chaque enquête garde sa partie en cours et son état résolu ; l\'introduction ne s\'ouvre d\'elle-même qu\'une fois (`grimdoku:seen:<id>`).');

P('## 12. Règles de cohérence',
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
  '| Affaire finale : plan, introduction, épilogues | `scenes/testament.json` |',
  '| Enquêtes à grands monstres (formes, victimes) | `big-cases.json` |',
  '| Conseils de l\'enquêteur, scènes, carnet, carte | `app/template.html` |',
  '| La bible de travail (document partagé) | https://claude.ai/code/artifact/b1eaad27-d50f-4faf-8b14-30a2ef2e9e65 |',
  'Ce fichier se régénère depuis ces données (`node tools/lore-md.js`) : une modification de `cast.json` ou des décors s\'y retrouve à la génération suivante.');

fs.writeFileSync(path.join(ROOT, 'lore', 'LORE.md'), out.join('\n'));
console.log('lore/LORE.md :', out.join('\n').length, 'caractères,', out.join('\n').split('\n').length, 'lignes');
