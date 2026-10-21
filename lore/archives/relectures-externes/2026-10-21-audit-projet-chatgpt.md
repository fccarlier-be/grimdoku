# Grimdoku — audit du projet et pistes d'amélioration

J'ai examiné le dépôt [fccarlier-be/grimdoku sur GitHub](https://github.com/fccarlier-be/grimdoku?utm_source=chatgpt.com), en m'intéressant à son architecture, au moteur de résolution, à la génération des énigmes, aux tests, à l'application et aux fichiers narratifs.

Mon avis général : Grimdoku est un projet plus ambitieux qu'un simple sudoku habillé de fantasy. Tu as déjà construit un véritable système de jeu, avec des règles spécifiques, un générateur d'énigmes, un solveur, une progression persistante et un univers narratif conséquent.

Le potentiel est réel. Mais je vois aussi un risque important : le projet investit énormément dans la quantité de contenu et dans les systèmes qui l'entourent, alors que sa réussite dépendra surtout de trois choses : la qualité des énigmes, le plaisir ressenti pendant leur résolution et l'envie de découvrir la suite de l'histoire.

## Mon évaluation synthétique

Qualité du code

Bonne base de prototype

Architecture compréhensible, moteur séparé, génération automatisée et tests substantiels. La maintenabilité mérite toutefois une attention particulière.

Concept du jeu

Différenciant

La logique de placement sert directement à identifier le meurtrier. Les pièces, les meubles et les grands personnages donnent de la profondeur au système.

Lore

Potentiel élevé, exécution à consolider

Un monde identifiable, une troupe récurrente et un mystère central intéressant. Le principal défi est de faire de la narration une motivation pour jouer, plutôt qu'un contenu que l'on traverse entre deux grilles.

Gamification

Grosse marge de progression

La progression géographique et les lettres constituent déjà une bonne base. Il manque surtout des objectifs intermédiaires, des récompenses de maîtrise et des raisons de revenir une fois le contenu terminé.

Précision méthodologique : cet avis repose sur l'inspection des fichiers du dépôt, et non sur une session de jeu complète sur appareil ni sur l'exécution locale de la suite de tests. Je distingue donc les constats vérifiables des risques à confirmer en pratique.

## 1. Qualité du code

### Ce que je trouve bien conçu

1\. Un moteur de jeu indépendant de l'interface.

Le fichier [`engine.js`](https://github.com/fccarlier-be/grimdoku/blob/main/engine.js?utm_source=chatgpt.com) regroupe les règles, les contraintes de placement, le solveur exhaustif et le solveur logique. C'est une séparation saine : le même moteur peut servir à la génération, à la validation des énigmes et à l'application.

2\. La génération des énigmes est prise au sérieux.

Le couple [`gen.js`](https://github.com/fccarlier-be/grimdoku/blob/main/gen.js?utm_source=chatgpt.com) / [`build-puzzles.js`](https://github.com/fccarlier-be/grimdoku/blob/main/build-puzzles.js?utm_source=chatgpt.com) est l'un des meilleurs aspects techniques du projet.

Le système ne se contente pas de fabriquer une grille qui possède une solution. Il cherche notamment à obtenir :

- une solution unique ;
- une résolution possible par déduction, sans essai-erreur ;
- des niveaux de difficulté calculés à partir des techniques nécessaires ;
- des indices compatibles avec les règles et avec les personnages ;
- des contraintes particulières pour les victimes et les grands personnages.

C'est nettement plus exigeant qu'un générateur de grilles aléatoires. Cela constitue une vraie fondation pour développer le jeu.

3\. Les tests couvrent des invariants importants.

Les fichiers [`tests/engine.test.js`](https://github.com/fccarlier-be/grimdoku/blob/main/tests/engine.test.js?utm_source=chatgpt.com) et [`tests/app.test.js`](https://github.com/fccarlier-be/grimdoku/blob/main/tests/app.test.js?utm_source=chatgpt.com) montrent une volonté de vérifier non seulement les règles, mais aussi le comportement de l'application.

Le premier contrôle notamment l'unicité des solutions et leur résolubilité logique. Le second simule l'interface et teste des parcours fonctionnels. C'est une bonne démarche pour un projet individuel qui évolue rapidement.

4\. L'assemblage en application autonome est cohérent avec ton objectif.

[`build-app.js`](https://github.com/fccarlier-be/grimdoku/blob/main/build-app.js?utm_source=chatgpt.com) assemble le moteur, les énigmes et les ressources dans un fichier HTML autonome. Cela simplifie la distribution et réduit les dépendances nécessaires à l'exécution du jeu.

Ce n'est pas forcément l'architecture que je choisirais pour une application complexe à plusieurs développeurs, mais elle est défendable pour ton contexte.

### Ce qui me préoccupe

1\. Une interface concentrée dans un très gros fichier

[`app/template.html`](https://github.com/fccarlier-be/grimdoku/blob/main/app/template.html?utm_source=chatgpt.com) approche les 200 Ko et 2 500 lignes. Il contient les styles, le rendu, les interactions, les écrans narratifs, la sauvegarde et d'autres responsabilités.

Ce n'est pas automatiquement du mauvais code : une partie est du HTML/CSS et le fichier est assemblé volontairement. Mais cela rend les modifications transversales plus risquées. Une évolution du carnet peut avoir des effets indirects sur la navigation, les sauvegardes ou les modales.

Ma recommandation : extraire progressivement les modules fonctionnels, sans entreprendre une réécriture complète. Commencer par les systèmes autonomes — synchronisation, statistiques, narration et progression — puis séparer les composants de l'interface si le besoin se confirme.

2\. Des données et des règles qui se répondent à plusieurs endroits

Les scènes, les personnages, les solutions, les grilles actives, la carte et le lore sont répartis dans de nombreux fichiers JSON et scripts. C'est utile pour éditer le contenu sans toucher à l'interface, mais cela crée un risque de désynchronisation.

Le mécanisme `fitRooms`, les variantes de scènes et la réattribution des lettres montrent déjà que la préparation des données n'est pas triviale.

Ma recommandation : disposer d'une validation centrale des données, exécutée à chaque build, qui contrôle les références, les identifiants, les déblocages, les personnages, les lettres et les règles narratives. Les tests actuels en couvrent une partie ; il faut s'assurer que toutes les relations critiques sont contrôlées.

3\. La frontière entre données du jeu et secrets de l'application

Les solutions sont intégrées aux données distribuées au navigateur. C'est acceptable pour un jeu solo, mais cela signifie qu'un joueur techniquement curieux peut potentiellement retrouver les solutions sans résoudre les énigmes.

Le vrai enjeu n'est pas la triche dans un jeu solo : c'est de ne pas confondre une validation côté client avec une preuve fiable de réussite. Si les statistiques ou des classements deviennent importants, le serveur devra définir précisément ce qu'il accepte comme résultat.

Pour la sauvegarde en ligne, le serveur possède déjà des mécanismes intéressants : vérification du jeton Google, cookie de session signé, limitation de taille des requêtes et gestion des conflits de synchronisation. Je ne considère pas cela comme un audit de sécurité complet, toutefois.

4\. Les tests doivent devenir un garde-fou systématique

La commande de test reconstruit d'abord les données avant de lancer les tests. C'est utile, mais cela implique que la génération doit être reproductible et que les modifications de données générées doivent être contrôlées.

Je mettrais en place une intégration continue qui exécute les tests à chaque modification, vérifie la génération et signale toute régression. Je vérifierais aussi que le build ne modifie pas silencieusement des données sans rapport avec le changement en cours.

### Mon verdict technique

Je ne qualifierais pas le code de mauvais. Au contraire, il existe une vraie structure, une bonne compréhension du problème logique et une couverture de tests qui dépasse ce que l'on voit souvent dans un prototype individuel.

En revanche, je ne qualifierais pas encore l'ensemble de code robuste au sens d'un produit mature sans avoir exécuté les tests, examiné les chemins critiques en détail et vérifié le comportement réel sur mobile.

La priorité n'est pas une refonte technique. C'est de préserver les bonnes fondations tout en empêchant la complexité des données et de l'interface de devenir un frein à chaque nouvelle fonctionnalité.

## 2. Le concept du jeu

### Ce qui fonctionne vraiment

Le meilleur choix de conception, à mon sens, est que la résolution de la grille et la résolution du meurtre ne sont pas deux activités séparées.

Le joueur ne résout pas simplement un sudoku avant de lire une histoire policière. Il place des suspects, reconstitue les contraintes spatiales et découvre qui se trouvait avec la victime. La déduction est donc à la fois le gameplay et l'enquête.

Les règles ajoutent plusieurs couches intéressantes :

- Les pièces créent une contrainte de répartition des personnages.
- Les meubles modifient les emplacements possibles.
- Les portails fusionnent certaines pièces pour les besoins de l'enquête.
- Les spectres contournent certaines contraintes de mobilier.
- Les grands personnages occupent plusieurs cases et peuvent imposer une réflexion sur plusieurs lignes et colonnes.
- Les indices permettent de progresser sans transformer le jeu en puzzle purement arbitraire.

La combinaison est suffisamment spécifique pour donner à Grimdoku sa propre identité.

Les grands personnages sont particulièrement intéressants. Ils peuvent changer la manière de raisonner, et pas seulement augmenter la taille de la grille. C'est exactement le type de mécanique qui peut renouveler un jeu de logique sur la durée.

### Le principal risque : confondre difficulté et longueur

Le dépôt indique que les grilles peuvent atteindre 12 × 12 et que la difficulté est évaluée à partir des techniques utilisées par le solveur humain.

C'est une bonne approche, mais elle ne garantit pas à elle seule une difficulté agréable.

Une grille peut être :

- longue à résoudre, mais intellectuellement monotone ;
- difficile parce qu'elle exige une déduction intéressante ;
- artificiellement difficile parce que le joueur doit examiner beaucoup trop de possibilités ;
- facile à comprendre, mais frustrante sur un petit écran.

Le score calculé par le moteur est un indicateur de structure logique. Il ne mesure pas directement le plaisir, le temps de résolution ou la charge mentale réelle.

Je chercherais donc à diversifier les raisonnements nécessaires, plutôt qu'à augmenter systématiquement la taille des grilles.

Par exemple, deux grilles classées au même niveau pourraient demander des stratégies différentes : l'une fondée sur les relations entre pièces, l'autre sur les contraintes d'un grand personnage.

Cela permettrait de rendre les niveaux plus variés sans rendre chaque nouvelle enquête simplement plus longue.

### Le deuxième risque : la répétition du format policier

Le concept repose sur une structure récurrente : introduction, placement des personnages, déduction du coupable, verdict et épilogue.

Cette répétition est rassurante pour un jeu de logique, mais elle peut devenir mécanique si chaque enquête apporte seulement un nouveau décor et une nouvelle victime.

Il faut que le joueur ait régulièrement l'impression de découvrir quelque chose de nouveau. Pas nécessairement une nouvelle règle à chaque partie : une conséquence narrative, une relation inattendue entre deux personnages ou une nouvelle utilisation d'une mécanique existante peut suffire.

Je ne multiplierais donc pas les pouvoirs spéciaux à court terme. Je chercherais plutôt à exploiter davantage les règles déjà présentes.

### Le point que je surveillerais le plus : le premier contact

Le jeu possède de nombreuses règles : occupation des pièces, lignes et colonnes, meubles bloquants, indices, victime sans indice, portails, personnages de grande taille…

C'est riche, mais potentiellement intimidant.

Le prologue et l'écran des règles existent déjà. Je compléterais ce dispositif par un véritable apprentissage progressif : la première enquête devrait apprendre les gestes essentiels, la deuxième introduire une contrainte supplémentaire et les suivantes combiner les mécanismes.

Le joueur devrait comprendre pourquoi il vient de réussir, pas seulement constater que la grille est correcte.

Verdict sur le concept : je conserverais le cœur du jeu tel quel. Le travail prioritaire est de rendre les énigmes plus variées dans leur raisonnement et de mieux rythmer l'apprentissage, pas de remplacer le système.

## 3. Le lore : une bonne matière première, mais un problème d'intégration

J'ai examiné notamment [`lore/LORE.md`](https://github.com/fccarlier-be/grimdoku/blob/main/lore/LORE.md?utm_source=chatgpt.com), [`cast.json`](https://github.com/fccarlier-be/grimdoku/blob/main/cast.json?utm_source=chatgpt.com), les lettres, les données de la carte et le scénario du testament de Fizzlebarbe.

### Les forces du lore

Brumeval est un cadre adapté au jeu. Une baronnie où tout le monde se connaît, où les mêmes personnages se croisent dans des lieux différents et où les institutions sont plus ou moins compétentes constitue un terrain fertile pour une comédie policière.

La troupe récurrente est également une bonne décision. Elle permet au joueur de reconnaître les personnages, de mémoriser leurs manies et de découvrir progressivement leurs relations. Les victimes de passage évitent en parallèle de tuer systématiquement les mêmes personnages.

J'apprécie aussi le choix de conserver un enquêteur invisible, poli, sec et épuisé. Il sert de fil conducteur sans voler la vedette aux personnages.

Enfin, l'affaire finale de Fizzlebarbe dispose d'un vrai potentiel : la succession, les prétendants, le corbeau, les lettres anonymes et la révélation commune peuvent former une enquête à tiroirs plutôt qu'une simple dernière grille.

### Le problème fondamental : le lore est encore trop souvent une récompense passive

La structure actuelle repose essentiellement sur des introductions, des épilogues, des lettres et des pages de carnet. Le joueur peut résoudre les grilles en prêtant peu d'attention à ces éléments.

Cela crée un paradoxe : le projet possède un univers narratif volumineux, mais la progression mécanique ne nécessite pas forcément de s'y intéresser.

Je ne pense pas que la solution soit d'écrire encore davantage de dialogues. Elle consiste plutôt à donner une fonction à ce que le joueur apprend.

Par exemple :

- une lettre peut modifier l'interprétation d'une lettre précédente ;
- un personnage rencontré dans plusieurs lieux peut révéler une contradiction dans ses déclarations ;
- un détail récurrent peut prendre un sens nouveau à la fin ;
- le carnet peut faire apparaître une relation que le joueur n'avait pas remarquée ;
- un lieu peut être débloqué parce qu'un indice narratif y conduit, plutôt que parce qu'un compteur est arrivé à son seuil.

Cela ne signifie pas que le joueur devrait résoudre les grilles grâce à des informations narratives susceptibles de révéler les placements. La logique doit rester autonome. En revanche, les informations narratives peuvent influencer ce que le joueur croit comprendre du mystère général.

### Une réserve importante sur la cohérence narrative actuelle

Le dépôt contient deux documents particulièrement intéressants :

- [`GRIMDOKU_MATRICE_CONTINUITE.md`](https://github.com/fccarlier-be/grimdoku/blob/main/lore/GRIMDOKU_MATRICE_CONTINUITE.md?utm_source=chatgpt.com), qui définit un canon narratif cible ;
- [`PLAN_MIGRATION_CANON.md`](https://github.com/fccarlier-be/grimdoku/blob/main/lore/PLAN_MIGRATION_CANON.md?utm_source=chatgpt.com), qui décrit les modifications nécessaires pour l'appliquer.

Ces documents font évoluer la nature de la succession de Fizzlebarbe : la Tour serait liée à une charge de gardiennage, le testament ne serait qu'un projet et le Nœud de Brume constituerait l'enjeu réel du mystère.

Or, le plan de migration indique explicitement que ces changements restent à valider. Les données de production que j'ai consultées contiennent encore des formulations de l'ancien canon, notamment dans les lettres et le scénario du testament.

C'est un point concret à traiter avant d'ajouter des éléments narratifs supplémentaires : il faut éviter de développer de nouvelles scènes sur une version du canon qui n'est pas encore stabilisée.

### Ce que je changerais dans le traitement de l'histoire

Je structurerais la narration en trois niveaux clairement distincts.

Niveau 1 — La comédie immédiate

Les introductions, les dialogues, les habitudes des personnages et les conséquences absurdes de chaque meurtre. Le joueur doit pouvoir apprécier chaque enquête sans devoir suivre toute l'intrigue.

Niveau 2 — Les anomalies récurrentes

Les lettres, les contradictions, les indices indirects et les relations entre personnages. Le joueur qui fait attention commence à soupçonner qu'il se passe quelque chose de plus vaste.

Niveau 3 — L'enquête de fond

Les lettres prennent un sens nouveau, les fausses pistes sont levées et la vérité sur Fizzlebarbe et Augure devient compréhensible. La conclusion doit recontextualiser les éléments déjà découverts, plutôt que d'introduire toutes les réponses à la dernière minute.

Je garderais les textes courts dans le flux normal du jeu. Les éléments plus développés iraient dans le carnet, les lettres et les scènes de révélation. L'objectif n'est pas de transformer Grimdoku en visual novel, mais de donner au joueur l'impression que son attention est récompensée.

### Mon verdict sur le lore

Le potentiel narratif est supérieur à ce que le gameplay exploite actuellement. Le point à améliorer n'est pas la quantité de lore, mais la manière dont il s'accumule, se répond et finit par payer la curiosité du joueur.

Et je terminerais impérativement la stabilisation du canon avant de produire de nouvelles séries de textes.

## 4. Autres remarques importantes

### A. La progression géographique est une excellente base

Le bureau de l'enquêteur, la carte de Brumeval, les clous qui marquent les lieux découverts, les dossiers et les lettres donnent une identité visuelle au système de progression.

C'est beaucoup plus intéressant qu'un menu de niveaux numérotés. Le monde devient une représentation concrète du parcours du joueur.

Je conserverais cette approche et je chercherais à la renforcer plutôt qu'à ajouter un menu de récompenses générique.

### B. Attention au volume de contenu et à son équilibre

Le dépôt distingue les énigmes générées, les énigmes actives et les énigmes conservées mais désactivées. Le fichier [`lore/actives.json`](https://github.com/fccarlier-be/grimdoku/blob/main/lore/actives.json?utm_source=chatgpt.com) organise notamment la sélection des grilles par lieu.

Cette organisation est utile, mais elle soulève deux questions de conception :

- Les énigmes actives apportent-elles toutes une expérience suffisamment différente ?
- La difficulté ressentie augmente-t-elle de façon cohérente au fil de la progression ?

Je ne chercherais pas à activer toutes les grilles simplement pour afficher un gros nombre d'heures de jeu. Une sélection plus courte et mieux équilibrée vaut mieux qu'une succession d'énigmes interchangeables.

### C. L'expérience mobile doit rester prioritaire

Le projet vise explicitement le mobile, jusqu'à l'iPhone 13 mini. C'est une contrainte déterminante pour un jeu de logique.

La lisibilité des indices, la précision des interactions, la possibilité de noter des hypothèses et la gestion des personnages occupant plusieurs cases doivent être évaluées sur un véritable petit écran.

Je testerais en particulier :

- le placement d'un grand personnage sans erreur tactile ;
- la lecture simultanée des indices et de la grille ;
- l'utilisation du crayon sans multiplier les manipulations ;
- le retour en arrière après une erreur ;
- la consultation du carnet et des lettres sans perdre le contexte de la grille.

La difficulté d'une énigme ne doit pas provenir d'une interface pénible à manipuler.

### D. Les statistiques ne doivent pas devenir une fin en soi

Le projet dispose déjà de statistiques et d'un système de notation de difficulté ressentie. C'est utile pour comprendre comment le jeu est utilisé.

À terme, je privilégierais des données permettant de répondre à des questions de conception :

- À quel moment les joueurs abandonnent-ils une grille ?
- Quelles règles génèrent le plus d'erreurs ?
- Les indices sont-ils utilisés parce que la difficulté est intéressante ou parce que l'interface manque de clarté ?
- Les joueurs reviennent-ils après avoir terminé une enquête ?

Ces indicateurs seront plus utiles pour améliorer le jeu qu'un simple compteur de parties lancées.

## 5. Gamification supplémentaire : ce que j'ajouterais

Je distinguerais trois objectifs : donner envie de résoudre une grille, récompenser la maîtrise du système et inciter à revenir dans l'univers.

Voici les fonctionnalités que je privilégierais, dans l'ordre.

[Conspiracy Guides](https://images.openai.com/static-rsc-4/MYTydPHMwBEfaA0oBwOFJXv3oS5CYJmkvAcbC9mbO40delfN9k6bZfAaI9By9mKSRCcrw0eWBwAx69_OEOS7O4b0fR1BQquBRtsIi2eszHCMXROSjj5oF_ms7S0ixm-Ih2ZzHeqMsDEeEHwC-lNLOKdTjuz7FAhzvhb53_Zg-V0?purpose=inline)

Priorité 1

1\. Des objectifs secondaires par enquête

Chaque grille pourrait proposer deux ou trois objectifs facultatifs, par exemple :

- Résoudre l'affaire sans utiliser l'indice.
- Ne commettre aucune erreur de placement définitif.
- Terminer sans effacer de placement confirmé.
- Résoudre l'affaire en exploitant tous les indices utiles.

Le joueur gagnerait un sceau de dossier pour chaque objectif rempli. Ces sceaux pourraient apparaître sur les fiches du carnet.

Pourquoi : une même grille devient intéressante à rejouer sans avoir besoin d'en générer une nouvelle.

[Investigating Unsolved Mysteries  | Global Chessboard](https://images.openai.com/static-rsc-4/iBwWIZL8PAe5MhndCt2MqeLYnIYWNK0oLYmEH_W_N5gJmbhgAmuC_0chSeDB2kXeGyR-IgCxZhxLxKlWQIfyzfSK2Hjn84NqOgiljR-DvvmSs_8d4mbbmxax9HWvcyTTf9BxQpDuVQgEflLGz5O6UmDumItJ7qZFHkEqWkTdKjE?purpose=inline)

Priorité 1

2\. Une carte qui évolue réellement

Le bureau pourrait se transformer progressivement : davantage de lieux épinglés, des fils rouges reliant les affaires, de nouvelles pièces à conviction et des annotations de l'enquêteur.

Les évolutions seraient déclenchées par les enquêtes résolues, les lettres ouvertes et les découvertes narratives, pas par une monnaie artificielle.

Pourquoi : la progression devient visible et gratifiante, tout en renforçant l'identité du jeu.

[Why Movie Whodunit Movies Hook Us—And 21 That Truly Pay Off](https://images.openai.com/static-rsc-4/XyIuPDTRT1q0IFMm5R5afzgal5SNp0-Z-x-JxwtAomIacO6ynU5OVeUSzK92hzqlJWFHHkvGOsZW4jmeu7BuXxwlHlisM7ZIFnHYFH3VYWNGbSDUL6H8I2yH_10whIRqpnzY1mfE8P946oagVRwhYJH5rvOZKJ90z8QUroWbjcY?purpose=inline)

Priorité 1

3\. Des entrées de carnet à débloquer

Certaines informations pourraient apparaître seulement après plusieurs rencontres : une relation entre deux personnages, une nouvelle anecdote, un tic expliqué ou une contradiction entre deux déclarations.

Je ferais la distinction entre les informations de base, automatiquement disponibles, et les découvertes facultatives.

Pourquoi : cela récompense l'attention portée aux personnages et crée un objectif narratif entre deux lettres.

[Global Humanitarian Corps | Excellence in Humanitarian Leadership](https://images.openai.com/static-rsc-4/DuD4O8O-74MRhYYMqzm4WiSjpWNCok2w7a8bu59Ok_wYUQ5POSolq8RlCVhrt6oyqwr9IElO0GB5BHlRnvSxDpv6jgYGgabdKP7y3O5zx8bjkEWg_7KJWnKBcTTVyHKf1gnVLhFgF-szNCN79Bzx6-V0VXW5pyKSO9TinWnF1q8?purpose=inline)

4\. Des titres de compétence

Le joueur pourrait obtenir des titres selon ses performances :

- Œil de lynx : résoudre plusieurs affaires sans indice.
- Maître des pièces : réussir des enquêtes difficiles où la disposition des pièces est déterminante.
- Chasseur de géants : résoudre plusieurs affaires avec de grands personnages.
- Archiviste : découvrir toutes les lettres et informations facultatives.

Je les afficherais dans le carnet ou sur une page de profil, sans classement compétitif obligatoire.

Pourquoi : ils valorisent plusieurs façons de jouer, au lieu de récompenser uniquement la vitesse.

[Saga20 | The Art of Campaign Continuity: How to Keep Your Story Straight Without Burnout | Saga20 Blog](https://images.openai.com/static-rsc-4/iJqd1j_7O6GaLqLc0Ao6b3ol201Pmt-RhTKeDN00iT5OrQt17uoYKsKlrurm2nkqY9RdQeEfvIqF3arfWMhcFBo9ieMgW8Wvu_gsNpT70QOv4FtA8_mnu8yUdDhnyBpUZsSRv8bEB5fJVOOd2nhNkBTymH6EQSBMRVCG0CbxYw0?purpose=inline)

5\. Des dossiers thématiques

Certaines séries d'affaires pourraient être regroupées autour d'une mécanique ou d'un thème : les portails, les créatures géantes, les affaires de la cour ou les anomalies magiques.

Terminer un dossier donnerait accès à une courte scène, une entrée de carnet ou un élément décoratif du bureau.

Pourquoi : cela donne des objectifs intermédiaires aux joueurs qui ne souhaitent pas forcément suivre toutes les enquêtes dans l'ordre.

[The Beer Barrel and the Blade - Scrollina](https://images.openai.com/static-rsc-4/6-VJHjzaC7wgFxmC21RlH3oJolVJKHtsHx25rD8ToZm5_BBAFw4REAhkGtaGmm9y54rDL6FiA5uvpJVXQFfpHZjBVStrCNzygQWrrIN8c_6t6mpBq1E1b1-ibJm83bA--B0JANp223aCjs_QfzgHk95fTIKvcApoz57v8sWIji4?purpose=inline)

6\. Un véritable méta-mystère facultatif

Les lettres pourraient comporter des indices subtils qui, une fois rapprochés, permettent de comprendre un élément de l'histoire avant la révélation finale.

Le carnet pourrait offrir un espace pour relier les informations, avec une validation quand le joueur formule une hypothèse correcte.

Je ne demanderais pas de résoudre des énigmes cryptographiques arbitraires : les indices devraient être fondés sur des détails réellement présents dans les textes.

Pourquoi : c'est la fonctionnalité qui peut le plus fortement unir le lore et la gamification.

Les images ci-dessus sont des références d'ambiance, pas des maquettes de l'interface actuelle.

## 6. D'autres mécaniques envisageables

Je garderais ces idées pour une deuxième phase, une fois les premières améliorations validées.

| Fonctionnalité                         | Intérêt                                    | Réserve                                                               |
| -------------------------------------- | ------------------------------------------ | --------------------------------------------------------------------- |
| Défi quotidien                         | Une raison de revenir chaque jour          | Nécessite une rotation fiable et un contenu adapté                    |
| Mode sans indice                       | Valorise la maîtrise                       | Ne doit pas rendre les joueurs débutants honteux d'utiliser de l'aide |
| Collection de portraits et d'anecdotes | Renforce l'attachement à la troupe         | Éviter une collection qui devient une corvée                          |
| Défis à contraintes                    | Renouvelle les grilles connues             | Il faut que les contraintes restent lisibles et justes                |
| Classement de temps                    | Peut motiver certains joueurs              | Risque de privilégier la vitesse au raisonnement                      |
| Séries de victoires                    | Encourage la régularité                    | Une seule erreur ne devrait pas effacer des heures de progression     |
| Modes experts                          | Donne un objectif aux joueurs expérimentés | À développer après avoir stabilisé la difficulté normale              |

Je déconseille, au départ, les pièces, les monnaies virtuelles, les boutiques, les récompenses aléatoires et les systèmes d'énergie. Ils ajouteraient de la complexité sans renforcer le cœur du jeu.

## 7. Un système de progression que je construirais concrètement

Voici comment je combinerais les meilleures idées en un seul système cohérent.

## Exemple de boucle de progression

1. Résoudre une affaire

   Le joueur déduit le coupable et découvre l'épilogue.
2. Obtenir un bilan de l'enquête

   Le dossier est classé. Les objectifs secondaires réussis sont marqués sur la fiche, sans pénalité pour ceux qui ne le sont pas.
3. Découvrir un nouvel élément

   Une lettre, une entrée de carnet ou une nouvelle relation entre personnages apparaît selon la progression.
4. Faire évoluer le bureau

   La carte se complète, les fils rouges se multiplient et les nouvelles pièces à conviction sont visibles.
5. Atteindre un objectif intermédiaire

   Un dossier thématique est terminé, un titre est obtenu ou un élément du mystère général devient accessible.
6. Revenir pour une nouvelle raison

   Le joueur peut continuer l'histoire, terminer une collection, relever un défi ou perfectionner une enquête déjà résolue.

Le point essentiel est que ces récompenses doivent se compléter sans devenir obligatoires. Un joueur qui veut uniquement résoudre des grilles doit pouvoir le faire confortablement. Un joueur passionné par l'univers doit, lui, avoir beaucoup plus à découvrir.

## 8. Plan d'action recommandé

Si je devais décider des prochaines étapes du projet, je les ordonnerais ainsi.

Étape 1 — Consolider l'existant

Valider le canon narratif, terminer la migration des textes, vérifier la suite de tests et les données générées. Identifier les bugs de parcours sur mobile avant d'ajouter de nouvelles fonctionnalités.

Étape 2 — Améliorer la variété des énigmes

Analyser la difficulté réelle, la répétition des raisonnements et les retours des joueurs. Ajouter des variations qualitatives avant d'augmenter le nombre de grilles.

Étape 3 — Ajouter une première couche de gamification

Objectifs secondaires, titres de compétence et progression visuelle du bureau. Ce sont des fonctionnalités relativement cohérentes avec les systèmes déjà en place.

Étape 4 — Faire du lore une mécanique de découverte

Entrées de carnet conditionnelles, liens entre lettres, dossiers thématiques et indices narratifs qui prennent un sens nouveau. Tester si les joueurs ont réellement envie de découvrir la suite.

Étape 5 — Ajouter les systèmes de retour

Défis quotidiens ou hebdomadaires, nouveaux dossiers et éventuellement des modes experts, seulement si les joueurs réclament davantage de contenu après avoir terminé les parcours existants.

## Conclusion

Mon avis honnête est que Grimdoku mérite d'être développé davantage, mais pas en ajoutant des fonctionnalités dans toutes les directions.

Le moteur logique, le principe du meurtre par déduction, la troupe récurrente et le bureau d'enquête constituent déjà un ensemble cohérent. Le principal enjeu est désormais de transformer ces éléments en une expérience qui donne envie de poursuivre : une grille intéressante, une récompense satisfaisante, une découverte narrative et un nouvel objectif.

Mes trois priorités seraient :

1. Stabiliser la cohérence du lore et la fiabilité des données.
2. Vérifier que la difficulté et les interactions restent agréables sur mobile.
3. Développer une gamification intégrée à l'univers — objectifs secondaires, carnet évolutif et méta-mystère — plutôt qu'un système de points générique.

Je ne lancerais pas une refonte générale du code ni une multiplication des mécaniques de jeu avant d'avoir validé ces trois points. C'est le chemin qui me semble le plus susceptible de faire passer Grimdoku d'un prototype ambitieux à un jeu indépendant véritablement abouti.