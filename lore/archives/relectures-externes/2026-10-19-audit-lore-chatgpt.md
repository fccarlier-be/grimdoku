# Grimdoku — Audit narratif complet du dépôt

**Date de l'audit :** 19 octobre 2026  
**Périmètre :** branche `main` du dépôt [`fccarlier-be/grimdoku`](https://github.com/fccarlier-be/grimdoku).  
**Nature :** audit du lore, des textes effectivement générés, de leur assemblage et des documents de référence.  
**Modifications :** aucune. Les conclusions portent sur les sources lues ; la suite de tests n'a pas été exécutée localement.

## Verdict exécutif

Le défaut de Grimdoku n'est pas simplement que quelques blagues tombent à plat. Le dépôt contient **trois problèmes différents qui se renforcent** :

1. **Le modèle narratif ne définit pas ce qui est canonique.** Les 147 grilles actives réutilisent les mêmes 14 visiteurs nommés comme victimes dans plusieurs lieux. Si chaque verdict raconte un meurtre réellement arrivé dans le même monde, plusieurs personnages meurent jusqu'à seize fois. L'affirmation « pas de chronologie imposée » ne résout pas cette contradiction.
2. **Les épilogues sont des gabarits universels, pas des scènes adaptées à chaque affaire.** Une seule réplique par type de coupable reçoit mécaniquement la menace de n'importe quel visiteur. Le code fait exactement ce que les données lui demandent ; le problème est dans la conception des données narratives.
3. **Le canon proposé récemment n'est pas encore appliqué de manière uniforme.** Les lettres ont été réécrites, la révélation finale est bien présente, mais des épilogues anciens restent en place. Plusieurs documents de référence se contredisent sur la progression des lettres et sur ce qu'Augure sait.

Il faut donc éviter de lancer tout de suite une réécriture massive des répliques. Il faut d'abord trancher la question du canon des enquêtes, puis normaliser les règles et réécrire les scènes selon ces règles.

## 1. Comment le jeu construit réellement ses textes

Sources principales : [`build-puzzles.js`](https://github.com/fccarlier-be/grimdoku/blob/main/build-puzzles.js), [`cast.js`](https://github.com/fccarlier-be/grimdoku/blob/main/cast.js), [`cast.json`](https://github.com/fccarlier-be/grimdoku/blob/main/cast.json), [`app/template.html`](https://github.com/fccarlier-be/grimdoku/blob/main/app/template.html).

Pour une enquête ordinaire, `build-puzzles.js` choisit l'introduction automatique du lieu (`scene.auto.intro`) et produit l'épilogue à partir de cette priorité :

1. épilogue général défini sur la scène, s'il est utilisé par cette configuration ;
2. épilogue de scène indexé par le type du coupable ;
3. à défaut, épilogue du coupable dans `cast.json`.

Pour les enquêtes ordinaires générées avec un invité, `texts` vaut `scene.auto`. Or ces objets `auto` ne contiennent que l'introduction. **L'épilogue publié provient donc normalement du gabarit de `cast.json`, avec `{menace}` remplacé par la menace propre au visiteur.** C'est pourquoi le dialogue de Gontran existe dans le fichier publié [`puzzles/chateau--cousine.json`](https://github.com/fccarlier-be/grimdoku/blob/main/puzzles/chateau--cousine.json), et pas seulement dans une bible théorique.

La situation de l'affaire finale est différente : `scenes/testament.json` fournit explicitement neuf épilogues, puis le champ `revelation` est affiché par l'interface après la victoire. La révélation commune est donc techniquement en place ; ce sont surtout ses épilogues qui restent à réécrire.

Autre constat : plusieurs fichiers de scènes contiennent encore d'anciens `intro`, `epilogue` ou `epilogues`, mais ne sont plus utilisés pour fabriquer les enquêtes actives. Les variantes `bibliotheque-2`, `foire-2`, `marais-2` et `mine-2` sont ignorées par la construction automatique. Les champs d'épilogue hérités de certains décors de base sont eux aussi inactifs pour les enquêtes avec visiteurs. Ils doivent être archivés, supprimés ou marqués clairement comme données historiques afin que personne ne les prenne pour la version jouée.

## 2. Bloquants de cohérence narrative

### P0 — Les visiteurs meurent plusieurs fois dans le canon apparent

`lore/actives.json` répertorie **147 enquêtes actives sur 23 lieux**, mais les victimes ordinaires viennent de **14 identités fixes** définies dans `cast.json`. Les mêmes visiteurs sont victimes dans des lieux distincts :

| Visiteur | Nombre de grilles actives où il est victime |
|---|---:|
| Prudence, l'abbesse | 16 |
| Gertrude, la dresseuse | 15 |
| Rapidon, le messager | 12 |
| Pinardon, l'inspecteur | 11 |
| Ondine, la maîtresse-nageuse | 11 |
| Ermengarde, la cousine | 10 |
| Gustave, le touriste | 10 |
| Saisitout, l'huissier | 10 |
| Taxard, le percepteur | 10 |
| Mercurio, l'alchimiste | 10 |
| Lirelire, le troubadour | 9 |
| Grisemotte, la baronne | 9 |
| Vipérine, la chasseuse de primes | 8 |
| Bricabrac, le colporteur | 6 |

Prudence, par exemple, est victime dans seize grilles actives. Chaque enquête la présente pourtant comme un personnage unique, retrouvé mort, avec un meurtrier qui avoue.

**Pourquoi c'est bloquant :** tant que le jeu n'explique pas si chaque enquête est un événement canonique, une reconstitution hypothétique ou une variante indépendante, il est impossible de construire une chronologie cohérente. Ce n'est pas réparable avec quelques formulations différentes.

**Décision à prendre avant toute réécriture :**

- **Option recommandée si toutes les grilles sont de vraies affaires :** conserver les professions et portraits des visiteurs, mais générer des victimes distinctes par enquête (nom, identité et menace contextualisés), au lieu de réutiliser les mêmes quatorze personnes comme victimes.
- **Option moins coûteuse mais qui exige un changement de présentation :** annoncer clairement que les grilles sont des dossiers possibles ou des reconstitutions d'affaires, et non 147 événements tous survenus dans une chronologie commune. Dans ce cas, les confessions ne peuvent plus être présentées sans nuance comme l'histoire factuelle de Brumeval.

Le lore actuel essaie de combiner « des affaires locales réellement résolues », « une troupe récurrente qui survit » et « aucun ordre chronologique imposé ». Il ne règle pas la répétition des morts des visiteurs.

### P0 — La mort de Fizzlebarbe peut précéder des enquêtes où il est encore vivant

L'affaire finale se débloque à quinze lettres, avant que les 23 lieux et toutes leurs enquêtes soient nécessairement terminés. L'interface ne ferme pas les enquêtes ordinaires après le verdict final. Or Fizzlebarbe apparaît encore comme habitué dans plusieurs décors (notamment la Tour, les Grands Bains, le Palais des Mille Vœux, l'Université et la Bibliothèque).

Le joueur peut donc résoudre le meurtre de Fizzlebarbe, lire sa lettre posthume, puis ouvrir une enquête ordinaire dans laquelle Fizzlebarbe est toujours vivant et peut être le meurtrier. La résolution libre des enquêtes rend cette contradiction possible.

**À trancher :** soit l'affaire finale est une conclusion canonique et l'accès aux affaires où Fizzlebarbe apparaît vivant doit être encadré ; soit les grilles ordinaires sont explicitement des dossiers hors chronologie canonique ; soit le final est un « épilogue possible » plutôt qu'un événement obligatoire. Le dépôt ne définit pas encore cette règle.

### P0 — Augure reçoit la garde même s'il est le meurtrier final

Dans `scenes/testament.json`, le texte commun après la révélation dit qu'Augure veille désormais sur les archives du Palier zéro à titre provisoire. Cette conséquence est affichée quel que soit le coupable. Pourtant Augure est l'un des neuf suspects et peut être le meurtrier désigné par la grille.

Si le joueur vient de découvrir qu'Augure a tué Fizzlebarbe, le texte ne peut pas ensuite lui confier la surveillance des archives sans expliquer cette décision. C'est d'autant plus incohérent que l'intrigue le présente comme un employé épuisé, pas comme un gardien déjà formé.

**Correction :** rendre l'épilogue d'Augure distinct sur cette conséquence ou ne pas annoncer de nomination avant qu'une décision soit prise. Une solution simple est de dire que les archives sont provisoirement scellées par l'enquêteur ; le devenir d'Augure dépend ensuite de son innocence.

### P1 — Le nombre 412 crée une contradiction de chronologie

`cast.json` et l'affaire finale fixent l'âge de Fizzlebarbe à **412 ans**. La matrice affirme que **le Nœud de Brume a été découvert et installé il y a environ 412 ans par Fizzlebarbe**. Pris au pied de la lettre, l'archimage l'aurait installé à sa naissance.

**Correction :** changer la date de fondation (par exemple « il y a environ quatre siècles », si Fizzlebarbe était alors un jeune mage) ou changer l'âge canonique de Fizzlebarbe. Il faut fixer un nombre, pas laisser deux références exactes se confondre.

### P1 — Les documents de référence se contredisent sur le moment où la lettre est donnée

Le code du jeu vérifie `placeDone(pl)`, qui n'est vrai que si toutes les enquêtes actives du lieu sont résolues. Le texte d'aide et les tests confirment donc la règle actuelle : **la lettre est remise à la dernière enquête résolue dans un lieu** ; le joueur doit ensuite l'ouvrir pour qu'elle soit enregistrée et pour ouvrir les lieux suivants.

Plusieurs documents disent pourtant que la lettre arrive à la première enquête résolue :

- `_doc` dans [`lore/lettres.json`](https://github.com/fccarlier-be/grimdoku/blob/main/lore/lettres.json) ;
- `_doc` dans [`lore/carte.json`](https://github.com/fccarlier-be/grimdoku/blob/main/lore/carte.json) ;
- la matrice de continuité, notamment son plan de migration et sa checklist ;
- la section 8 du [`LORE.md` généré](https://github.com/fccarlier-be/grimdoku/blob/main/lore/LORE.md), qui dit « première enquête », alors que le prologue et la section de progression parlent de la dernière.

`CLAUDE.md` et le code indiquent, eux, la dernière enquête. Il faut garder cette règle (puisqu'elle est implémentée et testée) et corriger toutes les références à « première enquête ». Le `LORE.md` doit ensuite être régénéré.

### P1 — La clé et le grimoire n'ont pas encore une continuité assez précise

Les lettres indiquent que :

- Fernand a refait une clé de la Tour et en avait une avant son accident ;
- Fizzlebarbe a fait forger une « clé unique » et l'a cachée dans un grimoire ;
- le grimoire de Dewey est retrouvé dans la Tour, avec une fente sous la reliure ;
- le Palier zéro est un espace caché absent des plans publics.

La matrice affirme que la clé cachée par Fizzlebarbe ouvre un accès de service vers le Palier zéro, mais les lettres ne distinguent pas clairement cette clé de celle de Fernand. Le joueur peut donc croire qu'il s'agit du même objet et se demander comment une clé dite unique a déjà été détenue par Fernand.

La lettre du Moulin dit aussi que Fernand « a serré sa main manquante ». C'est visuellement impossible : il faut écrire qu'il serre son moignon ou touche son poignet amputé. Enfin, la potion d'encre invisible de Ciguë et le livre retrouvé par Dewey ne se rejoignent pas réellement : la lettre de la Bibliothèque parle d'une fente sous la reliure, pas d'une inscription révélée par la potion.

**Correction :** définir explicitement deux clés si c'est bien l'intention (ancienne clé de service de Fernand ; clé forgée par Fizzlebarbe pour l'accès caché), établir où se trouve cette dernière dans le grimoire, puis donner une utilité visible à la potion ou supprimer ce faux indice.

## 3. Audit des épilogues ordinaires

### Diagnostic général

Les 38 personnages récurrents disposent d'un seul épilogue-type dans `cast.json`. La menace de la victime est injectée dynamiquement :

> `{Il} voulait {menace}.` + le gag préécrit du coupable.

Cela permet une grande quantité d'enquêtes avec peu de texte, mais n'assure pas que le mobile, l'action meurtrière et la personnalité s'enchaînent. La menace est souvent la seule information propre à l'affaire ; elle pourrait être remplacée par une autre sans que le reste du dialogue change.

Le dialogue de Gontran dans `puzzles/chateau--cousine.json` est un exemple représentatif :

> — Vous étiez seul avec Ermengarde.  
> — Je me lève. Je proteste. Je me rassois.  
> — Pourquoi ?  
> — Elle voulait réclamer sa part de ce qui m'appartient. J'ai dégainé. Je regrette. Je rengaine.

Le premier bloc ne répond pas à l'enquêteur. La menace ne semble pas expliquer la réaction de Gontran ; on ne sait pas ce qui lui appartient ni pourquoi il prend la demande comme un affront. Le tic est répété deux fois, mais ne devient jamais une véritable scène. C'est un modèle de dialogues qui accumulent des gimmicks au lieu de raconter un événement.

### Audit des 38 gabarits

Cette liste ne prétend pas que chaque idée doit disparaître. Elle distingue le concept comique éventuellement conservable de l'exécution actuelle, qui doit être retravaillée.

| Personnage | Diagnostic sur le gabarit actuel | Priorité éditoriale |
|---|---|---|
| **Gribouille** | Le sort « part tout seul » à cause de l'éternuement, puis « je visais bien » suggère qu'il a visé volontairement. Accident et intention se contredisent. La menace ne modifie pas la scène. | Réécrire la causalité, conserver le houblon et l'éternuement. |
| **Fausset** | « Chanter jusqu'à ce qu'il s'arrête définitivement » est une chute macabre, mais ne dit pas pourquoi la demande de la victime entraîne cette réaction. Le couplet n'est qu'une couche posée sur la menace. | Réécrire pour que son incapacité à chanter ou son besoin de se faire écouter fasse avancer la scène. |
| **Bâfrin** | Le discours télégraphique fonctionne comme voix, mais « taper fort » remplace la motivation et ne donne aucune situation spécifique. | Donner un enchaînement concret, plutôt qu'une répétition du tic. |
| **Aëlys** | La notation sur dix offre une bonne personnalité ; « deux sur dix, ensuite zéro » ne révèle ni ce qui lui déplaît ni pourquoi cela tourne au meurtre. | Garder la critique, faire de la notation une action ou une escalade. |
| **Capucine** | « Je lui ai pris la vie. Je la lui rends demain » mélange meurtre littéral et gag de dette sans clarifier la logique. | Clarifier si l'expression est métaphorique ou magique, puis assumer la chute. |
| **Grippesou** | Compter les écus et le prix de l'enterrement correspond au radin, mais « ce qu'il me devait » n'a aucun fondement dans la plupart des menaces des visiteurs. | Relier la dette à une véritable interaction ou cesser de faire de toute victime un débiteur. |
| **Blafard** | Le jeu « de mon vivant / de votre mort » est cohérent avec le personnage, mais le rapprochement avec « un affront » est interchangeable et peu lié au mobile de la victime. | Peut être conservé comme voix ; contextualiser la première réplique. |
| **Flammèche** | Les excuses précèdent la justification, mais le lien entre la menace du visiteur, l'éternuement et le décès n'est pas suffisamment établi. | Faire de l'excès d'excuses une vraie progression de scène. |
| **Fernand** | « J'ai perdu un bras » est incompatible avec le canon de migration où il a perdu sa main lors de l'accident, vingt ans plus tôt. Le même dialogue laisse croire qu'il perd un membre nouveau à chaque meurtre. | Corriger l'histoire corporelle et l'épilogue final ; ne garder un membre perdu que si c'est un gag récurrent explicitement défini. |
| **Goémone** | Les bulles comme signe du mensonge sont lisibles, mais l'invitation à nager est plaquée sur presque toutes les menaces. La scène ne montre pas comment la victime a été tuée. | Faire de la sirène et de l'eau le cœur de l'action, pas une simple dernière phrase. |
| **Belladone** | Le vin végétalien est un gag récurrent identifiable, mais le dialogue ne relie pas l'offre de boisson au motif du meurtre. | Conserver le déni sur le vin ; écrire une circonstance qui le rende pertinent. |
| **Fumerolle** | La djinn exauce un vœu que la victime n'a pas forcément prononcé ; son pouvoir crée une explication arbitraire sans lien avec la menace injectée. | Un vœu doit être motivé et préparé par la scène, pas inventé pour fermer le dialogue. |
| **Fizzlebarbe** | La menace est suivie d'une référence à transformer les gens en tabouret, puis à la canne ; le mobile reste générique. | Faire ressortir son âge, son orgueil magique et son impatience dans une micro-scène réelle. |
| **Gontran** | Le tic est littéralement énuméré (« je me lève, je proteste… »), puis répété avec « je regrette, je rengaine ». Rien ne relie les actions à la revendication d'Ermengarde. | **Réécriture prioritaire.** Le tic doit naître de l'événement, et l'honneur du chevalier doit expliquer l'escalade. |
| **Bakchich** | « Opération comptable » et « techniquement légal » représentent bien son métier, mais n'expliquent pas comment l'opération provoque le meurtre. | Le raisonnement comptable doit révéler une combine précise, pas servir de substitut au mobile. |
| **Dagobert** | « À moi. Le roi » et « exonéré » se comprennent, mais la chute est prévisible et la menace sert uniquement de prétexte. | Faire de son avarice ou de son incompréhension une action, pas seulement un jeu de mots. |
| **Farinard** | Le sac de cinquante livres convient au meunier, mais l'idée qu'il le laisse tomber ne découle pas de la menace. | Donner à la pesée ou à une tromperie sur le poids un rôle dans l'affaire. |
| **Briochon** | La baguette rassise est visuelle et drôle, mais la répétition de « je dis ça, je dis rien » ne remplace pas l'échange et n'explique pas l'escalade. | Réduire la répétition et relier les ragots à ce que voulait faire la victime. |
| **Esbroufe** | L'élixir de longue vie avec une erreur d'étiquette fonctionne en satire commerciale, mais le mobile de la victime disparaît dans la chute. | Garder l'escroquerie, préciser l'intention et la conséquence. |
| **Clairvoya** | La carte de la Mort puis « je l'avais vu venir après coup » est une chute, pas un mobile construit. | Faire de sa mauvaise interprétation de l'avenir un vrai mécanisme de scène. |
| **Ciguë** | « Je l'ai changée en crapaud » ne confirme pas qu'elle l'a tuée, alors que la grille présente un meurtre. La menace est ensuite oubliée au profit de l'appétit. | Définir ce que signifie être « victime » dans cette scène et conserver un lien clair entre action et décès. |
| **Ambroise** | Il reproche à la victime de ne pas l'avoir embrassé alors que sa menace peut concerner les impôts, la saisie ou une autre affaire. Le mobile romantique ne correspond donc pas au visiteur de manière fiable. | **Réécriture prioritaire.** Prévoir une chute qui s'adapte réellement au visiteur ou changer le modèle de menace. |
| **Dewey** | « À voix haute » est ajouté à une menace qui n'a pas nécessairement de rapport au bruit. Le « CHUT ! » est reconnaissable mais se substitue à l'explication. | Faire de l'infraction au silence un événement concret et utiliser le tic une seule fois à bon escient. |
| **Granit** | Le chronomètre et l'absence définitive sont cohérents avec le contremaître, mais on ne comprend pas ce qui rend la menace insupportable au point de tuer. | Donner un rôle au temps de travail et au contrôle qu'il exerce. |
| **Grisou** | « On a creusé un trou à sa taille » est une image, mais elle ne fait pas avancer le mobile. | Relier le meurtre à son réflexe de creuser avant de réfléchir. |
| **Bâbord** | Le puits et la mauvaise direction constituent une chute cohérente avec le pirate, mais la menace n'a pas d'effet sur le choix de la sortie. | Faire de la mauvaise orientation la cause de l'incident. |
| **Frégaton** | La tempête inventée et la rame sont des gags séparés. La victime pourrait lui réclamer n'importe quoi, le dialogue serait presque identique. | Faire de son besoin de se prétendre capitaine le moteur de l'action. |
| **Écho-Écho** | La répétition et le coup de bec sont identifiables, mais la menace ne produit qu'une réplique répétée. | Le perroquet doit révéler involontairement quelque chose, pas seulement répéter le mobile. |
| **Brindille** | Elle lance un sort de protection mais le résultat est de la fumée ; la logique du décès est obscure et ne correspond pas systématiquement à la menace. | Montrer le sort exact ou son effet imprévu, sans faire de la fumée une explication universelle. |
| **Fiolius** | Le professeur renifle et note une potion « excellente » parce qu'elle sent la mort ; il ne relie pas l'action au mobile de la victime. | Faire de l'évaluation des potions le ressort du crime et de la chute. |
| **Fricot** | « Ce qui s'enfuit finit dans la marmite » impose que la victime ait tenté de fuir et devient la raison du meurtre, sans que cela découle forcément de la menace. | Donner au conflit culinaire une vraie étape intermédiaire. |
| **Festin** | Le gag du végétarien depuis mardi est identifiable, mais le jour et la menace peuvent être sans rapport avec le meurtre. | Faire du prétexte végétarien une mauvaise foi appliquée à la situation exacte. |
| **Glas** | Prendre les mesures de la victime et considérer le travail à moitié fait sert le fossoyeur, mais la menace n'a souvent aucun rapport avec l'enterrement. | Introduire une action de fossoyeur qui se déclenche à cause du visiteur. |
| **Augure** | « Ensuite, plus rien » est une formule anonyme, mais n'explique pas l'action ni le mobile du corbeau. Dans l'affaire finale, son épilogue est différent et mieux individualisé. | Ne pas confondre sa voix de rapporteur habituel avec son mobile de coupable final. |
| **Escabeau** | Le plafond reçoit les excuses, ce qui est visuel, mais la menace de la victime n'influence pas la scène. | Garder le gag physique, lui donner une cause précise dans l'affaire. |
| **Caillasse** | Il obéit à « pousse-toi » et écrase la victime, mais on ne sait pas si l'acte est volontaire, littéral ou accidentel. Le mobile est ignoré. | **Réécriture prioritaire.** Faire de l'obéissance littérale le ressort du meurtre, sans contredire le rôle du suspect. |
| **Glissandra** | La syntaxe inversée caractérise la vouivre, mais « l'ordre, je finis toujours par le commencer » est opaque et la menace est un insert. | Garder une inversion compréhensible et construire une progression nette. |
| **Cendrebrune** | La victime dérange sa sieste puis le dragon se réveille de mauvaise humeur. Le ressort est clair, mais le mobile est si générique qu'il efface le visiteur. | Garder l'irritabilité du dragon, préciser ce que le visiteur fait réellement. |

### Conséquence pour le modèle de données

Un seul champ `epilogue` par type ne suffit pas si la menace de la victime doit jouer un vrai rôle. Le meilleur compromis n'est pas forcément d'écrire des centaines de scènes indépendantes à la main : définir au minimum des variantes par couple **type de coupable × type de visiteur**, ou une sélection d'épilogues explicitement écrits pour les combinaisons réellement publiées. Le texte final doit être vérifié dans son rendu complet, avec la vraie menace injectée.

Les 4 répliques peuvent rester une contrainte de forme ; elles ne doivent pas devenir une formule rigide où la deuxième ligne porte la menace, la troisième pose toujours une question générique et la quatrième ajoute un gag indépendant.

## 4. Audit des épilogues de l'affaire finale

Source : [`scenes/testament.json`](https://github.com/fccarlier-be/grimdoku/blob/main/scenes/testament.json).

La révélation commune est maintenant séparée des neuf épilogues et n'apparaît qu'après la victoire : c'est une bonne architecture et les tests d'application couvrent ce comportement. En revanche, les dialogues de fin n'ont pas été entièrement migrés vers le nouveau canon.

| Coupable | Problème actuel | Correction attendue |
|---|---|---|
| **Bakchich** | Il affirme que la Tour était déjà mise en gage. Le canon dit qu'il ne peut pas la mettre en gage comme une propriété privée. | Présenter explicitement l'affirmation comme sa croyance/sa combine illégitime, pas comme un fait établi du narrateur. Donner une raison concrète pour vouloir empêcher la transmission. |
| **Fernand** | Il perd un bras pendant le meurtre, alors que le canon dit qu'il est mort dans un accident vingt ans plus tôt et est revenu sans une main. | Faire intervenir ses salaires impayés, l'accident, la rancune et son sentiment d'abandon ; ne pas lui faire perdre une nouvelle main. |
| **Fiolius** | « Il sentait la fin » / « je l'ai noté zéro » relèvent de la voix du professeur mais ne forment pas un mobile intelligible. | Raccorder son ambition universitaire ou son besoin de reconnaissance à son acte. |
| **Brindille** | « Ouvrir son coffre. Avec la permission. Presque. » est drôle en intention mais ne relie pas assez l'action au meurtre. | Préciser ce qu'elle cherchait et comment son sort a provoqué la mort. |
| **Blafard** | « Cette Tour était à moi » est une croyance fausse permise par le canon, mais la scène n'explique pas ce que Fizzlebarbe allait lui retirer. | Garder l'ancien titre, rendre sa rancune plus précise. |
| **Dewey** | Le livre de sa bibliothèque est un mobile plausible, mais elle réduit tout conflit à un « CHUT ». | Conserver l'indignation bibliothécaire tout en montrant ce que Fizzlebarbe a fait au livre ou aux archives. |
| **Gribouille** | « Me déshériter pour un grimoire pas rendu » suppose une succession privée et ignore le rôle de la clé cachée. | Faire de l'emprunt et du livre le vrai conflit, plutôt que de confirmer un héritage qui n'existe pas. |
| **Fumerolle** | Elle dit avoir exaucé un vœu de ne pas toucher à la Tour « de son vivant », ce qui implique qu'elle l'a tué pour respecter littéralement la formulation. Le lien entre vœu et mobile est possible, mais introduit tardivement. | Préparer l'existence du vœu dans sa caractérisation ou donner une formulation plus explicitement mauvaise foi. |
| **Augure** | Son épilogue explique une démission après espionnage, mais l'issue commune lui confie ensuite la garde provisoire des archives même s'il est déclaré meurtrier. | Modifier la conséquence en cas de culpabilité d'Augure ou différer toute nomination. |

La révélation finale doit rester identique pour huit coupables sur neuf, mais **la conséquence concernant Augure ne peut pas être identique** si la grille le désigne comme meurtrier.

## 5. Audit des 23 introductions de lieux

Les introductions utilisent un gabarit commun : arrivée de la victime, contexte du lieu, nombre de suspects, puis « L'un d'eux était seul avec [la victime] ». Ce cadre est utile pour le gameplay, mais les mêmes formulations reviennent dans presque tous les lieux. Cela peut servir de rituel de série, mais le lieu ne se distingue parfois que par un gag final. Chaque introduction devrait donner un détail propre au lieu et au type de victime sans ajouter un indice de placement.

Problèmes concrets à corriger :

| Lieu | Constat | Action |
|---|---|---|
| Château de Mortebrune | « Le roi m'a fait appeler » est une mise en contexte fixe même quand l'affaire porte sur un visiteur quelconque. Comme le roi peut être l'habitué absent d'une combinaison, la formulation doit signifier clairement qu'il a appelé l'enquêteur auparavant, pas qu'il assiste à la scène. | Reformuler au passé ou désigner explicitement la convocation. |
| Citadelle | « {victime} … est resté(e) coincé(e) avec » est grammaticalement suspendu : le complément introduit par « avec » manque. | Réécrire la phrase entière. |
| Bal Masqué | « N'a pas passé minuit » peut signifier qu'il est mort avant minuit plutôt que qu'il ne l'a pas survécu ; le sens reste volontairement macabre mais flou. | Choisir la lecture voulue et l'exprimer naturellement. |
| Tour de l'Archimage | « {victime} était monté(e) à la Tour … {motif} » est lourd, surtout avec des motifs comme « apporter une lettre du baron » ou « visiter la baronnie ». | Remplacer par une phrase simple : la victime est venue à la Tour pour [motif]. |
| Banquet des Gobelins | « Du côté des convives au côté du menu » répète maladroitement « côté ». | Simplifier la construction sans perdre le jeu sur le menu. |
| Grande Foire | « Qui ne regardera plus rien » a une tournure maladroite et une projection au futur qui ne s'intègre pas très bien au reste du passé narratif. | Trouver une chute plus naturelle. |
| Plusieurs lieux | « L'un d'eux était seul avec [lui/elle] » est quasiment identique partout. | Garder la fonction explicative, mais varier le rythme et la formulation entre lieux. |
| Plusieurs lieux si Grisemotte est victime | Le titre du visiteur est `la baronne de Grisemotte` et son nom est `Grisemotte` ; le gabarit `{titre} {victime}` affiche donc **« la baronne de Grisemotte Grisemotte »**. Le défaut affecte toutes les introductions générées où elle est victime. | Changer le champ `title` en `la baronne` ou changer le gabarit afin de ne pas répéter le nom. |

Le reste des introductions de lieux est globalement exploitable : leur principal défaut n'est pas une contradiction factuelle isolée, mais la répétition, quelques tournures maladroites et le fait qu'elles reposent très souvent sur une même chute standard.

## 6. Audit des 23 lettres d'Augure

La version présente dans [`lore/lettres.json`](https://github.com/fccarlier-be/grimdoku/blob/main/lore/lettres.json) a déjà intégré de nombreuses idées du nouveau canon : documents de propriété anciens, projet de testament, clé, grimoire, plans incomplets, brouillard anormal et puissance magique mesurée. La base est utilisable. La cohérence doit toutefois être consolidée avant d'ajouter plus de mythologie.

| Lieu / lettre | Point à résoudre |
|---|---|
| **Château** — Bakchich met la Tour en garantie | Compatible comme combine de Bakchich ; le texte final ne doit jamais confirmer que la mise en gage est juridiquement valide. |
| **Citadelle** — titres de Blafard | Bonne fausse piste, mais préciser que les documents anciens prouvent une ancienne prétention, pas le droit actuel sur la charge de gardiennage. |
| **Bal** — quatre promesses de Fumerolle | Bonne caractérisation de la djinn. Éviter de laisser croire que ses vœux peuvent véritablement créer quatre propriétaires simultanés. |
| **Cimetière** — tombe de Fizzlebarbe | Le gag fonctionne ; il faut juste maintenir le fait que Glas prépare des obsèques, pas qu'il a connaissance anticipée d'un meurtre. |
| **Tour** — liste des personnes ayant tenté d'entrer | C'est une des lettres les plus utiles : elle montre que Fizzlebarbe cherche des informations, pas uniquement une serrure plus solide. À conserver. |
| **Port des Contrebandiers** — bocaux de Fiolius | Mobile scientifique plausible, mais l'objet de l'étude demeure très vague. Donner une fonction claire aux échantillons ou conserver cette lettre comme fausse piste assumée. |
| **Grand Port** — projet volé, plume noire | Le projet non signé est une bonne correction. La plume constitue un indice d'Augure, mais le notaire qui affirme avoir entendu des ailes tout en disant qu'il dormait est une plaisanterie un peu trop proche d'une contradiction factuelle ; un demi-sommeil pourrait clarifier. |
| **Navire Fantôme** — Fizzlebarbe, bateau et brouillard | Bonne graine pour le dérèglement de Brumeval. Il faudra rappeler ultérieurement pourquoi une brume venant du mauvais côté est significative, sans transformer ce détail en preuve certaine. |
| **Thermes Enchantés** — vœu et propriété | Cohérent avec Fumerolle ; l'expression de la règle juridique doit rester une question qu'elle pose, pas une réponse qu'elle possède déjà. |
| **Grands Bains** — changer « un bâtiment » en « une tâche » | Très gros indice, peut-être trop explicite : il dévoile déjà presque la nature de la succession. Ajuster son degré de clarté selon le rythme global des 23 lettres. |
| **Sanglier Borgne** — dettes et grimoire | « Les deux promesses ont le même calendrier » est ambigu : le remboursement dépend de l'héritage, tandis que le retour du livre est promis depuis onze ans. Reformuler la chute pour dire clairement que Gribouille reporte les deux indéfiniment. |
| **Moulin** — clé et accident de Fernand | Corriger « serré sa main manquante » ; préciser si cette clé est une clé de service distincte de la clé unique de Fizzlebarbe. |
| **Ferme Hantée** — Briochon et projet caché | Cohérent : sa tendance à broder transforme un fait vague en rumeur. À conserver. |
| **Marais** — potion d'encre invisible achetée par Dewey | La potion ne semble pas servir à découvrir la fente sous la reliure dans la lettre de la Bibliothèque. Ajouter un signe révélé par la potion ou faire de cette dépense une fausse piste assumée. |
| **Mine des Nains** — coffre magique anonyme | Le canon affirme que Fizzlebarbe a commandé le coffre, mais la lettre ne donne aucune preuve de l'identité du client. Soit ce manque est un vrai mystère, soit la lettre doit apporter un indice vérifiable. |
| **Forge du Dragon** — clé unique dans un livre | Définir son rôle et son emplacement exacts dans le grimoire. Le texte actuel dit « entre les pages », celui de la Bibliothèque décrit une fente « sous la reliure ». Les deux peuvent être conciliés, mais la relation physique devrait être explicite. |
| **Banquet** — toast de Bakchich | Fonctionne comme indice de sa convoitise. À relier à la lettre du Château pour que la répétition apporte une information nouvelle, pas simplement le même gag. |
| **Académie** — les serrures de Brindille | Les portes qui explosent puis se déplacent sont un bon gag. La lettre doit cependant rester un signe de ses tentatives, pas laisser entendre qu'elle a déjà trouvé le Palier zéro. |
| **Université** — coupe des plans | C'est une des graines les plus précises du mystère : deux escaliers mènent au même palier, sans lien dessiné. À conserver, en s'assurant que la révélation explique ce que le plan ne peut pas montrer. |
| **Bibliothèque** — grimoire et fente | Bon lien entre Dewey, Gribouille et la clé. Il faut préciser ce que Dewey voit effectivement et ce qu'elle ne comprend pas ; la potion du Marais doit trouver sa place ici si elle est conservée. |
| **Foire aux Sortilèges** — prédiction de Clairvoya et plan incomplet | Le plan incomplet est une bonne fausse piste. La vision qui déclenche la prédiction n'est pas définie dans le texte ; sans détail supplémentaire, le sens qui lui est donné après la fin risque de sembler ajouté après coup. |
| **Grande Foire** — malle de Fiolius | Mobile de déplacement de matériel crédible. Son lien au mystère doit rester une intention d'appropriation universitaire, pas une preuve d'enlèvement de Fizzlebarbe. |
| **Palais des Mille Vœux** — puissance magique | Bonne preuve que la Tour a une valeur au-delà du bâtiment. Elle doit signaler une puissance inconnue, pas révéler trop directement le fonctionnement du Nœud. |

### État global du fil rouge

Le dossier possède désormais plusieurs familles d'indices : **accès** (clés, serrures, grimoire), **plans** (palier manquant), **documents** (projet de transmission), **ambition** (héritiers autoproclamés) et **phénomènes** (brouillard, puissance mesurée). C'est une base correcte. La faiblesse principale est que les lettres ne sont pas encore toutes reliées par une causalité parfaitement définie : quelques objets (notamment la potion) sont introduits sans rôle ultérieur établi, tandis que le nombre et la fonction des clés restent flous.

Le seuil de quinze lettres permet aussi d'ouvrir l'affaire finale sans que toutes les lettres aient été lues. Il faut donc que la révélation finale apporte les pièces manquantes, mais pas qu'elle exige que le joueur ait vu un indice essentiel qui pouvait rester dans les huit lettres non reçues. La progression doit offrir des indices redondants, ou la fin devra distinguer ce qui est prouvé par les archives de ce qui avait seulement été suggéré par les lettres.

## 7. Le canon de la matrice doit lui-même être révisé

La matrice de continuité est utile, mais elle n'est pas encore une autorité entièrement stable.

- **Âge et Nœud :** corriger le conflit 412 ans / 412 ans décrit plus haut.
- **Connaissances d'Augure :** la matrice dit qu'il n'est pas omniscient ; pourtant `cast.json` et la fiche générée dans `LORE.md` le décrivent encore comme « sait tout, ne dit rien ». Remplacer cette description par quelque chose qui reflète son observation très large mais imparfaite.
- **La clé :** définir s'il y en a une ou deux, ce qu'elles ouvrent et ce que Fernand savait réellement.
- **La transmission :** la Tour est présentée comme une charge et non comme un bien ; il faut éviter que les narrateurs, le texte commun de fin ou les fiches parlent de cette charge comme d'un titre de propriété valide. Les personnages peuvent évidemment croire l'inverse.
- **La fin variable :** le meurtrier est déterminé par la grille. Les faits du Nœud ne doivent pas changer selon le coupable, mais les conséquences immédiates doivent rester compatibles avec l'identité du meurtrier.
- **La responsabilité de Fizzlebarbe :** il surveille ses candidats sans leur expliquer l'épreuve. C'est une bonne faute de personnage, mais le canon doit dire clairement ce qu'il a vraiment préparé et ce qu'il n'a pas prévu.
- **Le statut d'Augure après la fin :** « gardien provisoire des archives » n'est pas la même chose que « successeur à la charge ». Le texte doit garder cette distinction, surtout s'il est le meurtrier.

## 8. Hygiène des sources et textes morts

### Données anciennes encore présentes

Les fichiers de scènes suivants ne produisent pas d'enquêtes ordinaires avec le manifeste actuel :

- `scenes/bibliotheque-2.json` (variante « Réserve interdite », l'Archimage y est victime) ;
- `scenes/foire-2.json` (variante « Une autre nuit », la Cartomancienne y est victime) ;
- `scenes/marais-2.json` (variante « Brume épaisse », Ambroise y est victime) ;
- `scenes/mine-2.json` (variante « Équipe de nuit », Grisou y est victime).

Leurs dialogues supposent le modèle antérieur où la troupe récurrente pouvait être victime. `build-puzzles.js` ignore les variantes et les scènes qui n'ont pas de `auto`, et la liste des enquêtes publiées n'inclut pas ces variantes. Certains champs `epilogue` ou `epilogues` historiques dans des scènes de base (notamment le Château, la Tour, la Taverne, le Marais et la Mine) sont eux aussi inactifs pour les enquêtes automatiques.

**Action :** archiver ces textes dans un répertoire `legacy` ou les supprimer après validation ; commenter tout champ inactif qui doit rester pour mémoire. Sinon, une future retouche risque d'être faite dans le mauvais fichier.

### Documents de canon partiellement synchronisés

- `lore/GRIMDOKU_MATRICE_CONTINUITE.md` fixe le nouveau canon, mais contient encore des mentions de déblocage à la première enquête.
- `lore/PLAN_MIGRATION_CANON.md` continue à présenter certaines corrections comme non appliquées alors que les 23 lettres et le champ `revelation` sont déjà mis à jour ; il faut distinguer « appliqué », « en attente » et « à valider ».
- `lore/LORE.md` est généré, mais sa section 8 affirme que la lettre est donnée à la première enquête, alors que son prologue et sa section de progression disent la dernière. Il reprend aussi l'ancienne description d'Augure qui « sait tout ».
- `CLAUDE.md` contient une description détaillée du modèle et du canon, mais doit être considérée comme un document technique de travail, non comme une seconde bible narrative indépendante.

**Règle de maintenance :** un seul fichier doit être la source de la vérité canonique ; le plan de migration doit être un état de tâches ; le `LORE.md` doit être généré depuis les données ; les textes historiques doivent être clairement exclus de la production.

## 9. Recommandations hiérarchisées

### Étape 1 — Trancher le contrat narratif (avant de réécrire)

1. Décider si chacune des grilles ordinaires représente un meurtre réellement commis ou une reconstitution/variante.
2. Décider ce qui se passe après le meurtre final de Fizzlebarbe lorsque des grilles ordinaires restent à jouer.
3. Décider ce qui arrive à Augure si c'est lui le coupable.
4. Valider le nouveau canon du Nœud, de la Tour, du projet de succession et du Palier zéro, avec une chronologie chiffrée cohérente.

### Étape 2 — Rétablir une seule source de vérité

1. Corriger les mentions « première enquête » en « dernière enquête » dans `lore/lettres.json`, `lore/carte.json`, la matrice et tout document narratif.
2. Établir la distinction des clés et le rôle du grimoire, puis réconcilier les lettres concernées.
3. Remplacer la description d'Augure qui le rend omniscient.
4. Marquer ou archiver les scènes et épilogues qui ne sont plus utilisés.
5. Mettre à jour `PLAN_MIGRATION_CANON.md` avec un statut exact, puis régénérer `lore/LORE.md`.

### Étape 3 — Reconcevoir les épilogues

Pour chaque combinaison active coupable × visiteur, l'épilogue doit répondre à quatre questions :

- Qu'a fait ou voulu faire précisément la victime ?
- Pourquoi le coupable le prend-il mal, selon sa personnalité et ses liens ?
- Quelle action entraîne la mort (ou quel mécanisme fantasy explique clairement la victime) ?
- Quelle chute révèle quelque chose du personnage sans simplement répéter son tic ?

Le mobile du visiteur ne doit pas être un segment interchangeable. Les tics servent la scène, ils ne remplacent pas sa causalité. Les textes doivent être vérifiés après substitution de toutes les variables, notamment genre, titre, nom et menace.

### Étape 4 — Réviser le fil rouge après ces décisions

Conserver les 23 lettres comme structure de progression est raisonnable, mais revoir la lettre du Moulin, la relation potion/grimoire, le statut des clés, la lettre des Grands Bains et le texte commun final. Assurer un nombre suffisant de pistes redondantes pour que toute combinaison de quinze lettres soit suivie d'une révélation intelligible.

### Étape 5 — Ajouter des validations automatisables

Ajouter au minimum des tests qui vérifient :

- aucun placeholder (`{menace}`, `{victime}`, `{Titre}`, etc.) ne reste dans les textes générés ;
- les titres construits ne répètent pas un nom propre (cas de Grisemotte) ;
- les textes de référence et le code s'accordent sur le déclencheur des lettres ;
- aucune scène marquée comme historique ne se retrouve dans les puzzles construits ;
- les textes de l'affaire finale ne confient pas automatiquement la charge à un suspect coupable ;
- les fiches de personnage ne contredisent pas le canon (ex. Augure omniscient, âge de Fizzlebarbe, main de Fernand).

Ces tests ne remplaceront pas la relecture littéraire. Ils empêcheront simplement le retour des contradictions déjà identifiées.

## 10. Conclusion

La base créative de Grimdoku est riche : personnages récurrents, lieux différenciés, gags de relations, lettres, grimoire, clé, plans incomplets et affaire finale. Le problème est la façon dont ces éléments sont actuellement assemblés : les mêmes visiteurs sont tués dans plusieurs dossiers, la plupart des épilogues ne s'adaptent pas réellement à la menace qu'ils reçoivent, et le nouveau canon n'a pas remplacé tous les anciens textes.

**La priorité n'est pas d'ajouter davantage de lore. C'est de définir ce qui s'est réellement passé, de décider quelles enquêtes sont canoniques, puis de faire en sorte que chaque dialogue raconte une scène spécifique et cohérente.** Une fois cela établi, les 23 lettres pourront former un vrai mystère à tiroirs plutôt qu'une collection d'indices qui semblent converger après coup.
