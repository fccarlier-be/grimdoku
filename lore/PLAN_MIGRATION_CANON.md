# Plan de migration vers le canon de la matrice de continuité

**Statut :** plan à valider. Aucun fichier de données ni de code n'a été modifié pour l'établir (étapes 1 et 2 de `GRIMDOKU_MATRICE_CONTINUITE.md`).
**Date :** 18 octobre 2026.

## 1. Décisions tranchées (points laissés ouverts)

| Point | Décision | Raison |
|---|---|---|
| La lettre de Fizzlebarbe mentionne les copies envoyées à l'enquêteur | **Retiré de sa lettre.** C'est Augure qui l'avoue, dans un billet affiché juste après. | Fizzlebarbe ne peut pas savoir ce qu'Augure fait dans son dos ; et Augure devient un personnage de la révélation, plus seulement un sujet. |
| La lettre du notaire décrit la plume noire alors qu'Augure est censé taire son implication | **Ironie assumée** : Augure décrit sa propre plume sans se dénoncer. | À la relecture, après la fin, le joueur comprend qu'il parlait de lui. |
| Fernand est un zombie : avant ou après l'accident ? | **L'accident l'a tué** ; il est revenu en zombie, avec une main en moins. | Colle à sa description (« ancien apprenti, ancien tout court ») et rend sa rancune légitime. Son épilogue final ne doit plus dire qu'il perd une main la nuit du meurtre. |
| Longueur des lettres | Les plus longues perdent une phrase (40 mots environ au maximum). | Lisibles dans le carnet sur téléphone. |

## 2. Inventaire des contradictions (audit)

| Fichier | Clé / entrée | Problème | Action |
|---|---|---|---|
| `lore/lettres.json` | les 23 lettres | Ancien canon (testament comme fait, propriété) ; pas d'indices qui se répondent | Remplacer par les textes de la section 3 |
| `lore/lettres.json` | `_doc` | « un héritier du testament » | Reformuler : rapports d'Augure sur les prétendants |
| `scenes/testament.json` | `intro` | « la nuit où il devait enfin signer son testament » ; « Le testament a disparu » | Texte de la matrice (« arrêter sa succession », « le projet de testament ») |
| `scenes/testament.json` | `epilogues` (8) | La révélation est collée dans 8 épilogues, absente de celui d'Augure | Retirer ; épilogues de 4 répliques, propres au coupable (section 4) |
| `scenes/testament.json` | `epilogues.corbeau` | « Il m'a légué la Tour » : contredit la charge de gardiennage | Réécrire (section 4) |
| `scenes/testament.json` | `epilogues.zombie` | « J'ai perdu une main » : il l'a perdue il y a vingt ans | Réécrire (section 4) |
| `scenes/testament.json` | `epilogues.gobelin`, `bibliothecaire`, `apprentie` | « Il allait signer », « son testament annoté », « la serrure du testament » | Ajuster (section 4) |
| `scenes/testament.json` | (nouveau) `revelation` | Révélation commune absente | Ajouter (section 5) |
| `scenes/testament.json` | `subtitle`, pièce « Salle du testament » | Nom de l'affaire et d'une pièce | **Garder** : c'est ainsi que la baronnie appelle l'affaire (croyance des personnages) |
| `cast.json` | `archimage.desc` | « toujours pas de testament » | « Archimage, 412 ans, toujours pas de successeur » |
| `cast.json` | `corbeau.desc`, `zombie.desc` | Compatibles | Garder |
| `scenes/<lieu>.json` | 23 introductions | Aucune ne parle du testament ni de la Tour comme propriété | Rien à changer |
| `app/template.html` | scènes de fin | Pas de bloc commun pour l'affaire finale | Ajouter une troisième scène, affaire finale seulement (section 6) |
| `app/template.html` | carnet, règles, lettre en grand | Compatibles (« avant que tout s'éclaire ») | Rien à changer |
| `tools/lore-md.js` | sections 5, 8 et 9 | Textes rédigés à la main sur l'ancien canon (révélation, héritiers, « avant d'avoir signé ») | Réécrire selon le canon, puis régénérer `LORE.md` |

## 3. Les 23 lettres cibles

Textes de la matrice, avec les décisions de la section 1 (Fernand mort dans l'accident) et une phrase en moins pour les plus longues. Signature « — A. » ajoutée par l'appli, comme aujourd'hui.

| Lieu (clé) | Texte cible | Écart avec la matrice |
|---|---|---|
| `chateau` | Bakchich a mis la Tour de l'Archimage en garantie d'un prêt. Le prêteur n'a jamais vu le moindre titre de propriété. Bakchich appelle ça une formalité. | resserré |
| `citadelle` | Blafard m'a montré ses titres de propriété. Le papier est authentique, et plus vieux que la baronnie. Le droit qu'il prétend en tirer l'est beaucoup moins. | une phrase en moins |
| `bal` | Au bal masqué, Fumerolle a promis la Tour à trois invités. Quand on lui a fait remarquer qu'ils ne pouvaient pas tous en hériter, elle a répondu qu'un vœu bien formulé ne se contredit jamais, et en a formulé un quatrième. | resserré |
| `cimetiere` | Glas a déjà creusé une tombe au nom de Fizzlebarbe. L'archimage lui aurait demandé de « prévoir toutes les éventualités ». Je lui ai demandé s'il avait aussi prévu de vérifier que le vieux était mort. Il a pris des notes. | — |
| `tour` | Fizzlebarbe a changé trois fois de serrure ce mois-ci. Il prétend que quelqu'un fouille son bureau. Curieusement, il ne m'a pas demandé de trouver le voleur, mais de dresser la liste de tous ceux qui ont essayé. | — |
| `port` | Fiolius a fait livrer douze bocaux vides à son nom, avec la mention « échantillons de la Tour ». Il affirme qu'ils sont indispensables à une étude. Il ne m'a pas dit ce qu'il compte mettre dedans. | — |
| `grand-port` | Le notaire avait reçu un projet de testament sous enveloppe scellée. Le lendemain, l'enveloppe avait disparu. Sur le bureau, une plume noire. Le notaire jure avoir entendu un battement d'ailes ; il jure aussi qu'il dormait. | resserré |
| `navire` | Frégaton jure avoir vu Fizzlebarbe embarquer pour « un voyage sans retour ». Le navire n'a pas quitté le quai. Ce soir-là, pourtant, le brouillard venait du mauvais côté du port. Frégaton refuse ce détail : il gâche son histoire. | resserré |
| `thermes` | Aux Thermes, Fumerolle a dit : « Le vieux veut léguer la Tour à celui qui le mérite. Personne ne le mérite. » Puis elle m'a demandé si un vœu pouvait modifier un titre de propriété. Elle préfère les génies aux notaires. | resserré |
| `grands-bains` | Aux Grands Bains, Fizzlebarbe a confié à son masseur qu'il « changerait tout » après sa cure : il ne voulait peut-être plus transmettre un bâtiment, mais une tâche. Le reste s'est perdu dans les huiles. | resserré |
| `taverne` | Gribouille doit quarante écus au Sanglier Borgne. Il promet de tout rembourser « dès que la Tour sera à lui ». Il promet aussi depuis onze ans de rendre le grimoire de Dewey. Les deux promesses ont le même calendrier. | — |
| `moulin` | Fernand a fait refaire une clé de la Tour. Il dit en avoir eu une avant l'accident, celui qui l'a tué. Quand je lui ai demandé ce qu'elle ouvrait, il a serré sa main manquante et changé de sujet. | Fernand mort dans l'accident |
| `ferme` | Briochon raconte que le testament existe, qu'il est caché, et qu'il n'en dira pas plus. Il a seulement entendu parler d'un document préparatoire. Le reste, il l'a brodé avec beaucoup de conviction. | resserré |
| `marais` | Ciguë vend une potion qui révèle certaines encres invisibles. Dewey en a acheté trois, « pour retrouver un livre ». Je ne sais pas ce qui l'inquiète le plus : l'encre, le livre ou le reçu. | resserré |
| `mine` | Granit a reçu commande d'un coffre à l'épreuve de la magie, à livrer dans la Tour. Le client a payé d'avance et demandé qu'on ne grave aucun nom. Granit a quand même chronométré la livraison. | resserré |
| `forge` | Fizzlebarbe a fait forger une clé unique. Le forgeron l'a vu la glisser entre les pages d'un grimoire qui n'aurait jamais dû se trouver dans la Tour. Ici, les secrets s'empilent mieux que les livres. | une phrase en moins |
| `banquet` | Au Banquet des Gobelins, Bakchich a porté un toast « au futur propriétaire de la Tour », en levant son verre vers lui-même. Puis il a demandé si les gobelins prêtaient sans garantie. Personne n'a eu le cœur de répondre. | resserré |
| `academie` | Brindille s'entraîne en secret au sort qui ouvre les serrures magiques. Trois portes de l'Académie ont déjà explosé. La quatrième s'est déplacée de deux pas vers la gauche. Le directeur appelle cela un progrès. | — |
| `universite` | Fiolius a écrit « Annexe de l'Université » sur les plans de la Tour, à l'encre sympathique. Elle se voit très bien. Sur une coupe, deux escaliers mènent au même palier, mais aucun plan ne montre ce qui les relie. | une phrase en moins |
| `bibliotheque` | Dewey a enfin retrouvé le grimoire emprunté par Gribouille, au fond de la Tour. Sous la reliure, une petite fente a été refermée avec soin. Dewey hésite à la cataloguer comme réparation, fraude ou insulte. | resserré |
| `foire` | Clairvoya a prédit à Brindille qu'elle hériterait d'une tour. Esbroufe lui a aussitôt vendu un plan de la Tour. Il y manque un étage, mais il garantit que le document est complet. | une phrase en moins |
| `grande-foire` | À la Grande Foire, Fiolius a acheté une malle assez grande pour un grimoire. Ou pour un archimage. Il dit qu'elle servira à déménager du matériel de la Tour vers l'Université. Il n'a demandé l'autorisation à personne. | resserré |
| `palais` | Le Palais des Mille Vœux a proposé d'acheter la Tour pour en faire une lampe géante. Ses émissaires y avaient mesuré une puissance qu'ils ne savaient pas expliquer. Fizzlebarbe a répondu à leur seconde visite par un éclair. | resserré |

Contrôles : la lettre du notaire parle d'un **projet** ; forge et bibliothèque sont compatibles (clé cachée dans le grimoire, Dewey ne sait pas ce que cache la fente) ; université et foire décrivent la même lacune (un étage manquant) sans l'expliquer ; le Palais signale une puissance, pas le Nœud.

## 4. Les 9 épilogues de l'affaire finale (sans la révélation)

Quatre répliques, l'enquêteur puis le coupable ; la révélation vient après, en commun (section 5).

| Coupable | Épilogue cible |
|---|---|
| Bakchich (`gobelin`) | — Vous étiez seul avec Fizzlebarbe. / — Il allait régler sa succession. Et la Tour était déjà en gage chez les gobelins. / — Donc ? / — Donc, techniquement, il valait mieux qu'il ne règle rien. C'est légal. Presque. |
| Fernand (`zombie`) | — Vous étiez seul avec lui. / — Vingt ans de salaire, il me devait. Il m'a tendu une pièce. Une seule. / — Et ? / — Je me suis énervé. J'ai perdu un bras. Il tenait un chandelier. |
| Fiolius (`professeur`) | inchangé : — Vous étiez seul avec lui. / — (Il renifle.) Il sentait la fin. / — Vous l'avez aidé ? / — Je l'ai noté. Zéro. Il a mal pris la note. |
| Brindille (`apprentie`) | — Vous étiez seule avec lui. / — Je voulais juste ouvrir son coffre. Avec la permission. Presque. / — Et ? / — C'est normal que la Tour fume encore ? |
| Blafard (`spectre`) | inchangé : — Vous étiez seul avec lui. / — De mon vivant, cette Tour était à moi. / — Et maintenant ? / — Maintenant, nous voilà deux fantômes à nous la disputer. Ça promet. |
| Dewey (`bibliothecaire`) | — Vous étiez seule avec lui. / — Il avait caché quelque chose dans un livre de MA bibliothèque. / — Ce n'est pas un mobile. / — CHUT. C'en est un. |
| Gribouille (`mage`) | inchangé : — Vous étiez seul avec lui. / — Il voulait me déshériter pour un grimoire pas rendu. / — Onze ans de retard. / — Atchoum. Le sort est parti tout seul. Encore. |
| Fumerolle (`djinn`) | inchangé : — Vous étiez seule avec lui. / — Il a fait un dernier vœu : « Que personne ne touche à ma Tour de mon vivant. » / — Et ? / — J'ai exaucé. Il n'est plus vivant, et personne n'y touche. |
| Augure (`corbeau`) | — Vous étiez seul avec lui. / — (Billet : « Des mois à espionner tout le monde pour lui. Pas un merci. ») / — Et ? / — (Billet : « Il voulait que je continue. Pour l'éternité, sans doute. J'ai donné ma démission. ») |

Les mobiles restent des croyances de personnages (« déshériter », « cette Tour était à moi ») : ils ne contredisent pas le canon, ils montrent que chacun s'est trompé sur la nature de la Tour.

## 5. Révélation commune (après l'épilogue, quel que soit le coupable)

Nouveau champ `revelation` de `scenes/testament.json`, en deux temps :

**La lettre de Fizzlebarbe** (trouvée dans les archives du Palier zéro)

> Si vous lisez ceci, c'est que je n'ai pas terminé ce que j'avais commencé. La Tour n'est pas un héritage : c'est une charge. Sous ses fondations se trouve le Nœud de Brume, qui aide à garder les six contrées en équilibre. Je l'ai gardé pendant quatre cent douze ans, et j'avais fini par croire que personne ne pourrait me remplacer.
>
> J'ai demandé à mon corbeau de surveiller les prétendants. Il m'a rapporté leurs ambitions, leurs mensonges et leurs petites combines. Je pensais trouver la vérité dans leurs actes ; j'ai oublié de regarder les miens.
>
> Le document que vous cherchiez n'était qu'un projet. Ce que je voulais transmettre, c'était la garde, pas la propriété. J'ai cherché quelqu'un qui ne convoite pas la Tour. Il était sous mes yeux, mais j'étais trop occupé à le faire écrire pour le remarquer.
>
> **Fizzlebarbe**

**Le billet d'Augure** (décision de la section 1)

> Les copies sous votre porte, c'était moi. Il ne me l'avait pas demandé. Vous, au moins, vous lisez jusqu'au bout.
>
> *Augure veille désormais sur les archives, à titre provisoire. Il a demandé que ce soit écrit.*

## 6. Changements de l'appli (`app/template.html`)

| Changement | Détail | Risque | Test |
|---|---|---|---|
| Troisième scène, affaire finale seulement | Après la scène du verdict, le bouton devient « 📜 Dans les archives du Palier zéro… » ; il ouvre la lettre de Fizzlebarbe, puis le billet d'Augure. Même présentation que la lettre d'Augure (cachet, parchemin). | Aucun sur les grilles : présentation seulement | Les 9 coupables possibles affichent la même révélation, uniquement après la victoire |
| Verdict dans la colonne | L'épilogue reste ; un lien « Relire la lettre de Fizzlebarbe » rouvre la révélation | Aucun | Présent seulement après la victoire de l'affaire finale |
| Rien d'autre | Pas de nouvelle mécanique, pas de séquence bloquante : la révélation se ferme comme les autres scènes | — | — |

## 7. Autres fichiers

| Fichier | Changement |
|---|---|
| `cast.json` | `archimage.desc` : « Archimage, 412 ans, toujours pas de successeur » |
| `lore/lettres.json` | `_doc` : « Rapports d'Augure sur les prétendants à la Tour (copies glissées sous la porte de l'enquêteur) … » |
| `tools/lore-md.js` | Sections 5, 8 et 9 réécrites selon le canon (Tour = charge, projet de transmission, Nœud de Brume, Palier zéro, rôle d'Augure, Fernand mort dans l'accident, révélation commune) ; ajout de la chronologie de référence |
| `lore/LORE.md` | Régénéré après coup (`node tools/lore-md.js`), jamais édité à la main |
| `lore/GRIMDOKU_MATRICE_CONTINUITE.md` | Gardé tel quel comme référence ; les décisions de la section 1 y seront reportées en annexe |
| `big-cases.json`, `lore/carte.json`, grilles | Rien |

## 8. Vérifications prévues

- JSON valides ; 23 lettres, une par lieu, mêmes clés.
- Les grilles et leurs solutions ne changent pas : pas de régénération, pas de reconstruction des énigmes autres que l'affaire finale (seuls ses textes changent). Les tests du moteur restent inchangés ; tests de l'appli en local.
- Nouveau test : la révélation n'apparaît qu'après la victoire de l'affaire finale, et elle est identique quel que soit le coupable (texte commun, pas dans l'épilogue).
- Aucun texte affiché avant la victoire ne nomme le coupable.
- `node tools/lore-md.js` produit un `LORE.md` conforme.
- Tout reste en local ; aucune mise en ligne sans feu vert.
