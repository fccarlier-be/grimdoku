# Grimdoku — le lore complet
*Document généré à partir des données du jeu le 2026-10-21 (`lore/LORE.md`). Il contient tout le lore : le monde, chaque personnage et toutes ses répliques, les invités, les lieux, les lettres d'Augure, l'affaire finale et sa révélation, et la façon dont tout cela s'articule avec le jeu. Il ne contient aucune solution d'énigme.*
**Attention : ce document dévoile la fin du fil rouge (le Nœud de Brume, le Palier zéro, qui écrit les lettres et pourquoi).**
Le canon de référence est `lore/GRIMDOKU_MATRICE_CONTINUITE.md` (vérité fixe, chronologie, connaissances des personnages) ; les décisions d'application sont dans `lore/PLAN_MIGRATION_CANON.md`.

## Sommaire
1. Intentions et ton
2. Le monde : la baronnie de Brumeval
3. L'enquêteur
4. La troupe récurrente (38 personnages)
5. Les liens entre personnages
6. Les invités de passage (les victimes)
7. Les lieux, un par un
8. Le fil rouge : la vérité cachée et les lettres d'Augure
9. L'affaire finale : le testament de Fizzlebarbe
10. Gags récurrents
11. Le lore dans le jeu : comment tout s'articule
12. Règles de cohérence
13. Où vivent les données (pour modifier le lore)

## 1. Intentions et ton
Le ton est celui de **Kaamelott** : des personnages bêtes mais attachants, des répliques courtes, des chamailleries plutôt que des blagues. Grimdoku reste un jeu de logique : le lore habille les enquêtes sans jamais gêner la déduction.
- **Les dialogues portent l'humour.** Les épilogues sont de courtes scènes de quatre répliques entre l'enquêteur et le coupable.
- **Chaque personnage a un tic de langage**, reconnaissable d'une enquête à l'autre.
- **Les indices restent sobres et factuels** (« X était à côté d'un tonneau ») : ils sont générés depuis la logique de la grille. Des indices écrits « en personnage » avaient contredit la grille ; l'humour vit donc dans les descriptions, les introductions, les épilogues et les lettres.
- **Mobile d'abord** : tout se lit en quelques secondes.
- **Aucune révélation avant la résolution** : rien de ce qui s'affiche avant la victoire ne trahit la position de quelqu'un ; le coupable n'apparaît qu'au verdict.

## 2. Le monde : la baronnie de Brumeval
Toutes les enquêtes se passent dans **la baronnie de Brumeval**, assez petite pour que tout le monde se connaisse et se déteste un peu. Son port, le Grand Port de Brumeval, lui donne son nom. Elle est découpée en six contrées :

| Contrée | Lieux |
| --- | --- |
| Mortebrune, le chef-lieu | Le Château de Mortebrune · La Citadelle de Mortebrune · Le Bal Masqué · Le Cimetière de Minuit · La Tour de l'Archimage |
| La côte | Le Port des Contrebandiers · Le Grand Port de Brumeval · Le Navire Fantôme · Les Thermes Enchantés · Les Grands Bains de Brumeval |
| La campagne de Bois-Tordu | Meurtre au Sanglier Borgne · Le Moulin de Bois-Tordu · La Ferme Hantée · Le Marais des Brumes |
| Les Monts Grimaces | La Mine des Nains · La Forge du Dragon · Le Banquet des Gobelins |
| Le quartier savant | L'Académie de Magie · L'Université des Sortilèges · La Bibliothèque Interdite |
| Sur la route | La Foire aux Sortilèges · La Grande Foire des Mille Merveilles · Le Palais des Mille Vœux |

- **Mortebrune**, le chef-lieu : le château du roi Dagobert, sa citadelle, le cimetière, et la Tour de l'Archimage où vit Fizzlebarbe.
- **La côte** : contrebande, brume, un navire fantôme qui ne repart jamais, et deux établissements thermaux (les Thermes Enchantés sur la falaise, les Grands Bains au sud-ouest).
- **La campagne de Bois-Tordu** : le carrefour de la baronnie. Tout le monde finit par passer au Sanglier Borgne.
- **Les Monts Grimaces** : les nains creusent, les gobelins comptent, le dragon dort (en principe).
- **Le quartier savant** : deux écoles rivales (l'Académie de Magie et l'Université des Sortilèges) et une bibliothèque dont personne ne rend les livres.
- **Sur la route** : la Foire aux Sortilèges (qui devient la Grande Foire des Mille Merveilles une fois par an) et le Palais des Mille Vœux, ambassade d'un pays lointain dont la djinn est la seule à connaître le nom.
Dans le jeu, la **carte de Brumeval** (illustration `assets/map/brumeval2`) est épinglée au centre du bureau, chaque lieu avec sa pastille.

## 3. L'enquêteur
L'enquêteur est la seule personne compétente de la baronnie, et ça l'épuise. **Il reste une voix : on ne le voit jamais.** Son nom et son origine sont volontairement laissés ouverts. Sa voix est sèche, polie, au bord de la crise de nerfs : il ne crie jamais, il soupire, puis reformule pour les plus lents.
On l'entend à trois endroits :
1. **L'introduction de chaque enquête** (ce qu'on lui a raconté en arrivant, à la première personne). Voir la section 7 pour toutes les introductions.
2. **Les conseils du bouton 💡 Indice** : ce qu'il marmonne en relisant ses notes. Un conseil par technique de déduction :

| Technique | Ce qu'il marmonne |
| --- | --- |
| indice | Relis la fiche de <personnage>. Ses indices ne lui laissent qu'une case. Je n'ai pas eu besoin d'en lire davantage. |
| case unique | Retire à <personnage> les lignes et les colonnes déjà prises. Il ne lui reste qu'une case. |
| ligne réservée | Quelqu'un n'a plus qu'une ligne possible, ou qu'une colonne : elle est à lui, et à personne d'autre. Cela suffit pour placer <personnage>. |
| position relative | Nord, sud, est, ouest. Les positions des uns par rapport aux autres coincent <personnage>. Encore faut-il les lire ensemble. |
| seul candidat | Il existe une ligne, ou une colonne, où un seul personnage peut encore aller. C'est <personnage>. Elle était sous tes yeux. |
| pièces | Un suspect par pièce, la victime avec un seul, aucune pièce vide. Ces trois règles placent <personnage>. |
| groupes | Quelques-uns se partagent exactement autant de lignes qu'ils sont. Personne d'autre n'y entre. Cela place <personnage>. |

   Si un personnage confirmé est mal placé, le bouton le signale d'abord : « Quelque chose cloche : <personnage> n'est pas à sa place. »
3. **Le verdict** : c'est lui qui ouvre chaque épilogue (« Vous étiez seul avec… ») et donne la réplique au coupable.

### Le prologue
À la première partie (après « Jouer »), quatre scènes au centre de l'écran présentent le monde, l'enquêteur et le fil rouge. On peut les passer, et les revoir depuis le carnet (« 📜 Revoir le prologue »). La dernière mène au bureau.

**1. Brumeval** (sur l'illustration de la carte)
> La baronnie de Brumeval tient sur une seule carte, entre la mer et les Monts Grimaces. Elle compte six contrées, vingt-trois lieux, et beaucoup trop de cadavres pour des gens qui se connaissent tous.  
>   
> On y meurt surtout de passage : percepteurs, huissiers, cousines venues réclamer un héritage. Personne ici ne sait mener une enquête. C'est pour ça qu'on m'a fait venir.

**2. Lettre de nomination** — Château de Mortebrune (cachet « D »)
> Par la présente, Nous, Dagobert, roi de Brumeval et d'à peu près tout ce qu'on voit du donjon, nommons le porteur de cette lettre Enquêteur de la baronnie.  
>   
> Il résoudra les meurtres de Nos sujets, de préférence sans accuser la Couronne. Il commencera par Notre château, où l'on meurt beaucoup trop pour un lieu aussi bien gardé. Les autres portes de la baronnie s'ouvriront à mesure qu'il fera ses preuves, sauf celle du trésor, qui est vide pour des raisons qui ne le regardent pas.  
>   
> Son salaire sera fixé avec Notre trésorier, Bakchich.
> Dagobert
*Le trésorier m'a reçu. Il m'a expliqué que mon salaire était techniquement légal. Je n'ai rien touché.*

**3. Un billet sous la porte** — Billet anonyme (cachet « A »)
> Bienvenue à Brumeval, enquêteur. Ici, chaque lieu a ses secrets, et j'en connais quelques-uns.  
>   
> Venez à bout des affaires du château. Je vous écrirai.
> — A.
*Sur le rebord de la fenêtre, un corbeau m'a regardé lire. Puis il est parti. Je n'aime pas les corbeaux qui attendent une réponse.*

**4. Mes notes** (mode d'emploi)
1. Sur mon bureau, la carte de Brumeval : chaque lieu dont j'ai bouclé toutes les enquêtes m'en ouvre de nouveaux.
2. Placer tout le monde : une personne par ligne et par colonne, un suspect par pièce, la victime seule avec son meurtrier.
3. Quand la dernière enquête d'un lieu est résolue, une lettre sur ce lieu glisse sous ma porte, signée « A. ».
4. Les lettres s'empilent sur le bureau, à côté des dossiers classés et du carnet des habitants croisés.
5. Quand toutes les lettres seront réunies, quelque chose arrivera. Elles semblent toutes y mener.
*Pour l'instant, une seule porte m'est ouverte : celle du château de Mortebrune.*

Ensuite, le bureau : seul le château est ouvert, les autres lieux se découvrent au fil des lettres (section 11).

## 4. La troupe récurrente
Chaque type de personnage est **un seul personnage, au nom fixe**, que l'on retrouve d'une enquête à l'autre. Dans une enquête, il porte une **pastille** : l'initiale de son nom (ou le plus court début qui le distingue des autres personnages présents : Fa pour Fausset, Fl pour Flammèche…). Les fiches sont rangées de la plus facile à placer à la plus difficile.
**Comment lire les épilogues** : la première réplique est celle de l'enquêteur, puis elles alternent. Les gabarits sont remplacés à la construction de l'énigme :
- `{victime}` : le nom de la victime ; `{Il}`/`{il}`, `{lui}`, `{e}` : les accords sur la victime (elle/il, accord en e) ;
- `{menace}` : ce que l'invité de passage venait faire au coupable (voir section 6), par exemple « me faire payer l'impôt sur tout ce que je possède ».
Exemple rempli : pour Capucine face à Prudence l'abbesse, « {Il} voulait {menace}. Moi qui dois déjà trois tournées ! » devient « Elle voulait me faire la morale. Moi qui dois déjà trois tournées ! »

### Gribouille — Mage
- **Type** : `mage` · masculin
- **Trait** : Mage, allergique au houblon
- **Tic de langage** : Éternue avant chaque sortilège
- **Où on le croise** : L'Académie de Magie · La Bibliothèque Interdite · La Forge du Dragon · Meurtre au Sanglier Borgne · Les Thermes Enchantés · L'Université des Sortilèges
- **Épilogue quand il est coupable** :
> — Vous étiez seul avec {victime}.  
> — {Il} voulait {menace}. Atchoum ! Pardon : le houblon.  
> — Et le sortilège ?  
> — Il est parti tout seul, avec l'éternuement. Mais je visais bien.

### Fausset — Barde
- **Type** : `barde` · masculin
- **Trait** : Barde, chante faux
- **Tic de langage** : Transforme chaque conversation en couplet
- **Où on le croise** : Le Bal Masqué · Le Banquet des Gobelins · Le Château de Mortebrune · La Citadelle de Mortebrune · La Foire aux Sortilèges · La Grande Foire des Mille Merveilles · Meurtre au Sanglier Borgne
- **Épilogue quand il est coupable** :
> — Vous étiez seul avec {victime}.  
> — « {Il} voulait {menace}, ô rage, ô désespoir… »  
> — Répondez normalement.  
> — J'ai chanté jusqu'à ce qu'{il} s'arrête. Définitivement.

### Bâfrin — Troll
- **Type** : `troll` · masculin
- **Trait** : Troll, plongeur à mi-temps
- **Tic de langage** : Répète le dernier mot de la phrase des autres
- **Où on le croise** : Le Banquet des Gobelins · La Ferme Hantée · La Foire aux Sortilèges · La Forge du Dragon · Le Grand Port de Brumeval · La Grande Foire des Mille Merveilles · Les Grands Bains de Brumeval · Le Marais des Brumes · La Mine des Nains · Le Moulin de Bois-Tordu · Le Port des Contrebandiers · Meurtre au Sanglier Borgne · Les Thermes Enchantés
- **Épilogue quand il est coupable** :
> — Vous étiez seul avec {victime}.  
> — {victime}.  
> — Pourquoi ?  
> — {Il} voulait {menace}. Alors Bâfrin taper. Taper fort. Fort.

### Aëlys — Elfe
- **Type** : `elfe` · féminin
- **Trait** : Elfe, critique gastronomique
- **Tic de langage** : Note tout sur dix, les gens compris
- **Où on le croise** : L'Académie de Magie · Le Bal Masqué · Le Château de Mortebrune · La Citadelle de Mortebrune · La Grande Foire des Mille Merveilles · Les Grands Bains de Brumeval · Le Marais des Brumes · Meurtre au Sanglier Borgne · Les Thermes Enchantés
- **Épilogue quand il est coupable** :
> — Vous étiez seule avec {victime}.  
> — {Il} voulait {menace}. Je lui ai mis deux sur dix.  
> — Et ensuite ?  
> — Ensuite, zéro.

### Capucine — Fée
- **Type** : `fee` · féminin
- **Trait** : Fée, doit trois tournées
- **Tic de langage** : « Je te le rends demain. »
- **Où on le croise** : L'Académie de Magie · Le Bal Masqué · La Ferme Hantée · La Foire aux Sortilèges · La Grande Foire des Mille Merveilles · Les Grands Bains de Brumeval · La Mine des Nains · Le Moulin de Bois-Tordu · Meurtre au Sanglier Borgne · Les Thermes Enchantés · L'Université des Sortilèges
- **Épilogue quand il est coupable** :
> — Vous étiez seule avec {victime}.  
> — {Il} voulait {menace}. Moi qui dois déjà trois tournées !  
> — Alors ?  
> — Alors je lui ai pris la vie. Je la lui rends demain.

### Aagrid — Tenancier le plus *SYMPA* de la baronnie
- **Type** : `tavernier` · masculin
- **Trait** : Tenancier le plus *SYMPA* de la baronnie
- **Tic de langage** : Compte à voix basse en parlant
- **Où on le croise** : Le Grand Port de Brumeval · Les Grands Bains de Brumeval · Le Port des Contrebandiers · Meurtre au Sanglier Borgne · Les Thermes Enchantés
- **Épilogue quand il est coupable** :
> — Vous étiez seul avec {victime}.  
> — {Il} voulait {menace}. Un écu, deux écus, trois écus…  
> — Vous comptez quoi ?  
> — Ce qu'{il} me devait. Et ce que l'enterrement va me coûter.

### Blafard — Spectre
- **Type** : `spectre` · masculin
- **Trait** : Spectre, ancien châtelain. Traverse les meubles, pas les reproches
- **Tic de langage** : « De mon vivant… »
- **Pouvoir** : spectre — peut se tenir sur les meubles bloquants (il respecte quand même lignes et colonnes)
- **Où on le croise** : Le Bal Masqué · La Bibliothèque Interdite · Le Château de Mortebrune · Le Cimetière de Minuit · La Citadelle de Mortebrune · Le Navire Fantôme · La Tour de l'Archimage · L'Université des Sortilèges
- **Épilogue quand il est coupable** :
> — Vous étiez seul avec {victime}.  
> — {Il} voulait {menace}. De mon vivant, on aurait appelé ça un affront.  
> — Et de votre mort ?  
> — Un mobile.

### Flammèche — Dragonnet
- **Type** : `dragonnet` · masculin
- **Trait** : Dragonnet, brûle tout ce qu'il touche
- **Tic de langage** : S'excuse avant même d'avoir brûlé quelque chose
- **Où on le croise** : L'Académie de Magie · Le Château de Mortebrune · La Citadelle de Mortebrune · La Ferme Hantée · La Foire aux Sortilèges · La Forge du Dragon · La Grande Foire des Mille Merveilles · La Mine des Nains · Le Moulin de Bois-Tordu · La Tour de l'Archimage · L'Université des Sortilèges
- **Épilogue quand il est coupable** :
> — Vous étiez seul avec {victime}.  
> — Pardon. Pardon pardon pardon.  
> — Je n'ai encore rien dit.  
> — {Il} voulait {menace}. Alors j'ai éternué. Et quand j'éternue, je crache du feu.

### Fernand — Zombie
- **Type** : `zombie` · masculin
- **Trait** : Zombie, ancien apprenti. Ancien tout court
- **Tic de langage** : Perd un morceau quand il s'énerve
- **Où on le croise** : Le Cimetière de Minuit · La Ferme Hantée · Le Grand Port de Brumeval · Le Marais des Brumes · La Mine des Nains · Le Moulin de Bois-Tordu · Le Navire Fantôme · La Tour de l'Archimage
- **Épilogue quand il est coupable** :
> — Vous étiez seul avec {victime}.  
> — {Il} voulait {menace}. Ça m'a énervé.  
> — Et ?  
> — Mon bras gauche s'est décroché. Le seul qui avait encore sa main. {Il} l'a reçu sur la tête.

### Goémone — Sirène
- **Type** : `sirene` · féminin
- **Trait** : Sirène, venue pour l'aquarium
- **Tic de langage** : Fait des bulles quand elle ment
- **Où on le croise** : Le Grand Port de Brumeval · Les Grands Bains de Brumeval · Le Marais des Brumes · Le Moulin de Bois-Tordu · Le Navire Fantôme · Le Port des Contrebandiers · Les Thermes Enchantés · La Tour de l'Archimage
- **Épilogue quand il est coupable** :
> — Vous étiez seule avec {victime}.  
> — Je n'ai rien fait. (Blub.)  
> — Vous faites des bulles.  
> — {Il} voulait {menace}. Je l'ai juste invité{e} à nager. (Blub, blub.)

### Belladone — Comtesse vampire
- **Type** : `vampire` · féminin
- **Trait** : Comtesse vampire, végane (elle le jure)
- **Tic de langage** : « Je ne bois jamais… de vin. »
- **Où on le croise** : Le Bal Masqué · La Bibliothèque Interdite · Le Cimetière de Minuit · Le Grand Port de Brumeval · Les Grands Bains de Brumeval · Le Navire Fantôme · Le Palais des Mille Vœux · La Tour de l'Archimage
- **Épilogue quand il est coupable** :
> — Vous étiez seule avec {victime}.  
> — {Il} voulait {menace}. Je lui ai proposé un verre.  
> — De vin ?  
> — Je ne bois jamais… de vin.

### Fumerolle — Djinn
- **Type** : `djinn` · féminin
- **Trait** : Djinn, a déjà exaucé deux vœux de trop
- **Tic de langage** : Prend tout au pied de la lettre
- **Où on le croise** : L'Académie de Magie · Le Bal Masqué · La Bibliothèque Interdite · Les Grands Bains de Brumeval · Le Palais des Mille Vœux · La Tour de l'Archimage · L'Université des Sortilèges
- **Épilogue quand il est coupable** :
> — Vous étiez seule avec {victime}.  
> — {Il} voulait {menace}. Puis {il} a dit : « Je voudrais qu'on me laisse tranquille pour l'éternité. »  
> — Et ?  
> — J'exauce au pied de la lettre.

### Fizzlebarbe — Archimage
- **Type** : `archimage` · masculin
- **Trait** : Archimage, 412 ans, toujours pas de successeur
- **Tic de langage** : « De mon temps… » (en concurrence avec Blafard)
- **Où on le croise** : La Bibliothèque Interdite · Les Grands Bains de Brumeval · Le Palais des Mille Vœux · La Tour de l'Archimage · L'Université des Sortilèges
- **Épilogue quand il est coupable** :
> — Vous étiez seul avec {victime}.  
> — {Il} voulait {menace}. De mon temps, on changeait ces gens-là en tabouret.  
> — Vous l'avez changé{e} en tabouret ?  
> — Non. J'ai oublié la formule. Alors j'ai pris la canne.

### Gontran — Chevalier
- **Type** : `chevalier` · masculin
- **Trait** : Chevalier, armure trop petite depuis Noël
- **Tic de langage** : Annonce chacune de ses actions à voix haute
- **Où on le croise** : Le Bal Masqué · Le Château de Mortebrune · Le Cimetière de Minuit · La Citadelle de Mortebrune · La Forge du Dragon · La Mine des Nains
- **Épilogue quand il est coupable** :
> — Vous étiez seul avec {victime}.  
> — Je me lève. Je proteste. Je me rassois.  
> — Pourquoi ?  
> — {Il} voulait {menace}. J'ai dégainé. Je regrette. Je rengaine.

### Bakchich — Gobelin
- **Type** : `gobelin` · masculin
- **Trait** : Gobelin, trésorier du royaume (non déclaré)
- **Tic de langage** : « Techniquement, c'est légal. »
- **Où on le croise** : Le Banquet des Gobelins · La Bibliothèque Interdite · Le Château de Mortebrune · La Citadelle de Mortebrune · La Foire aux Sortilèges · La Forge du Dragon · Le Grand Port de Brumeval · La Grande Foire des Mille Merveilles · La Mine des Nains · Le Palais des Mille Vœux · Le Port des Contrebandiers
- **Épilogue quand il est coupable** :
> — Vous étiez seul avec {victime}.  
> — {Il} voulait {menace}. J'ai fait une opération comptable.  
> — Vous l'avez tué{e}.  
> — Techniquement, c'est légal. Enfin, c'est pas encore illégal.

### Dagobert — Roi
- **Type** : `roi` · masculin
- **Trait** : Roi, avare de compliments et de tout le reste
- **Tic de langage** : « C'est pas faux. », à tout ce qu'il ne comprend pas
- **Où on le croise** : Le Bal Masqué · Le Château de Mortebrune · La Citadelle de Mortebrune · Les Grands Bains de Brumeval · Le Palais des Mille Vœux
- **Épilogue quand il est coupable** :
> — Vous étiez seul avec {victime}, Majesté.  
> — {Il} voulait {menace}. À moi. Le roi.  
> — Et vous l'avez supprimé{e} ?  
> — Disons que je l'ai… exonéré{e}.

### Farinard — Meunier
- **Type** : `meunier` · masculin
- **Trait** : Meunier, pèse le grain avec le pouce
- **Tic de langage** : « Au poids, c'est honnête. »
- **Où on le croise** : La Ferme Hantée · La Grande Foire des Mille Merveilles · Le Moulin de Bois-Tordu
- **Épilogue quand il est coupable** :
> — Vous étiez seul avec {victime}.  
> — {Il} voulait {menace}.  
> — Et ?  
> — Un sac de cinquante livres, lâché du grenier. Au poids, c'est honnête.

### Briochon — Boulanger
- **Type** : `boulanger` · masculin
- **Trait** : Boulanger, pétrit plus de ragots que de pâte
- **Tic de langage** : « Je dis ça, je dis rien. »
- **Où on le croise** : Le Banquet des Gobelins · La Ferme Hantée · La Grande Foire des Mille Merveilles
- **Épilogue quand il est coupable** :
> — Vous étiez seul avec {victime}.  
> — {Il} voulait {menace}. Je dis ça, je dis rien.  
> — Dites-le.  
> — Une baguette de trois jours, ça assomme. Je dis ça, je dis rien.

### Esbroufe — Bonimenteur
- **Type** : `bonimenteur` · masculin
- **Trait** : Bonimenteur, vend du rêve au kilo
- **Tic de langage** : Vouvoie tout le monde, y compris les poules
- **Où on le croise** : La Foire aux Sortilèges · Le Grand Port de Brumeval · La Grande Foire des Mille Merveilles · Les Grands Bains de Brumeval · Le Palais des Mille Vœux
- **Épilogue quand il est coupable** :
> — Vous étiez seul avec {victime}.  
> — Permettez que je vous vouvoie : {il} voulait {menace}.  
> — Et vous ?  
> — Je lui ai vendu un élixir de longue vie. Il y avait une petite erreur sur l'étiquette.

### Clairvoya — Cartomancienne
- **Type** : `cartomancienne` · féminin
- **Trait** : Cartomancienne, voit l'avenir, rate le présent
- **Tic de langage** : « Je l'avais vu venir. », toujours après coup
- **Où on le croise** : La Foire aux Sortilèges · La Grande Foire des Mille Merveilles · Le Palais des Mille Vœux · L'Université des Sortilèges
- **Épilogue quand il est coupable** :
> — Vous étiez seule avec {victime}.  
> — {Il} voulait {menace}. Je lui ai tiré la carte de la Mort.  
> — Et ?  
> — Je l'avais vu venir. Après coup, mais je l'avais vu.

### Ciguë — Sorcière des marais
- **Type** : `sorciere` · féminin
- **Trait** : Sorcière des marais, cuisine tout ce qui coasse
- **Tic de langage** : Regarde Ambroise avec appétit
- **Où on le croise** : Le Cimetière de Minuit · La Citadelle de Mortebrune · Le Marais des Brumes
- **Épilogue quand il est coupable** :
> — Vous étiez seule avec {victime}.  
> — {Il} voulait {menace}. Ça m'a coupé l'appétit.  
> — Et ?  
> — Je l'ai changé{e} en crapaud. Et l'appétit m'est revenu.

### Ambroise — Crapaud
- **Type** : `crapaud` · masculin
- **Trait** : Crapaud, prince déchu, attend toujours son bisou
- **Tic de langage** : Rappelle son titre toutes les deux phrases
- **Où on le croise** : Le Cimetière de Minuit · Le Marais des Brumes · L'Université des Sortilèges
- **Épilogue quand il est coupable** :
> — Vous étiez seul avec {victime}.  
> — Prince Ambroise, je vous prie.  
> — Prince, vous étiez seul avec {victime}.  
> — {Il} voulait {menace} au lieu de m'embrasser. Un prince a sa fierté. Et une langue très longue.

### Dewey — Bibliothécaire
- **Type** : `bibliothecaire` · féminin
- **Trait** : Bibliothécaire, réclame le silence en hurlant
- **Tic de langage** : « CHUT ! », en hurlant
- **Où on le croise** : La Bibliothèque Interdite · L'Université des Sortilèges
- **Épilogue quand il est coupable** :
> — Vous étiez seule avec {victime}.  
> — CHUT !  
> — Je vous pose une question.  
> — {Il} voulait {menace} À VOIX HAUTE. CHUT, j'ai dit.

### Granit — Contremaître nain
- **Type** : `contremaitre` · masculin
- **Trait** : Contremaître nain, compte les pépites et les pauses
- **Tic de langage** : Chronomètre tout le monde
- **Où on le croise** : La Mine des Nains
- **Épilogue quand il est coupable** :
> — Vous étiez seul avec {victime}.  
> — {Il} voulait {menace}. En plein temps de travail.  
> — Combien de temps ?  
> — Quatre minutes. Je l'ai noté{e} absent{e}. Pour toujours.

### Grisou — Mineur nain
- **Type** : `mineur` · masculin
- **Trait** : Mineur nain, creuse plus vite qu'il ne réfléchit
- **Tic de langage** : « On creuse ? »
- **Où on le croise** : La Forge du Dragon · La Mine des Nains
- **Épilogue quand il est coupable** :
> — Vous étiez seul avec {victime}.  
> — {Il} voulait {menace}.  
> — Et vous avez fait quoi ?  
> — On a creusé. Un trou. À sa taille.

### Bâbord — Pirate
- **Type** : `pirate` · masculin
- **Trait** : Pirate, a perdu une jambe, un œil et le sens de l'orientation
- **Tic de langage** : Indique toujours la mauvaise direction
- **Où on le croise** : Le Grand Port de Brumeval · Le Navire Fantôme · Le Port des Contrebandiers
- **Épilogue quand il est coupable** :
> — Vous étiez seul avec {victime}.  
> — {Il} voulait {menace}. Je lui ai indiqué la sortie.  
> — Et ?  
> — C'était le puits. Je me trompe toujours de direction.

### Frégaton — Capitaine
- **Type** : `capitaine` · masculin
- **Trait** : Capitaine, n'a jamais quitté le port
- **Tic de langage** : Raconte des tempêtes qu'il n'a jamais vues
- **Où on le croise** : Le Grand Port de Brumeval · Le Navire Fantôme · Le Port des Contrebandiers
- **Épilogue quand il est coupable** :
> — Vous étiez seul avec {victime}.  
> — {Il} voulait {menace}. J'ai affronté des tempêtes, moi !  
> — Vous n'avez jamais quitté le port.  
> — Ce soir-là, la tempête, c'était moi. Avec une rame.

### Écho-Écho — Perroquet
- **Type** : `perroquet` · masculin
- **Trait** : Perroquet, répète tous les secrets
- **Tic de langage** : Répète tout, dans le désordre
- **Où on le croise** : Le Grand Port de Brumeval · Le Navire Fantôme · Le Port des Contrebandiers
- **Épilogue quand il est coupable** :
> — Vous étiez seul avec {victime}.  
> — Seul avec {victime} ! Seul avec {victime} !  
> — Pourquoi ?  
> — {Il} voulait {menace} ! Coup de bec ! Coup de bec !

### Brindille — Apprentie sorcière
- **Type** : `apprentie` · féminin
- **Trait** : Apprentie sorcière, a déjà fait exploser trois chaudrons
- **Tic de langage** : « C'est normal que ça fume ? »
- **Où on le croise** : L'Académie de Magie · L'Université des Sortilèges
- **Épilogue quand il est coupable** :
> — Vous étiez seule avec {victime}.  
> — {Il} voulait {menace}, alors j'ai lancé un sort de protection.  
> — Et ?  
> — C'est normal que ça fume encore ?

### Fiolius — Professeur de potions
- **Type** : `professeur` · masculin
- **Trait** : Professeur de potions, note à l'odeur
- **Tic de langage** : Renifle avant de répondre
- **Où on le croise** : L'Académie de Magie · L'Université des Sortilèges
- **Épilogue quand il est coupable** :
> — Vous étiez seul avec {victime}.  
> — (Il renifle.) {Il} voulait {menace}.  
> — Et votre potion ?  
> — Elle sentait la mort. Excellente note.

### Fricot — Chef gobelin
- **Type** : `chef` · masculin
- **Trait** : Chef gobelin, goûte tout, surtout ce qui bouge encore
- **Tic de langage** : Juge chaque plat à sa capacité à s'enfuir
- **Où on le croise** : Le Banquet des Gobelins · La Grande Foire des Mille Merveilles
- **Épilogue quand il est coupable** :
> — Vous étiez seul avec {victime}.  
> — {Il} voulait {menace}. Puis {il} a voulu filer.  
> — Et ?  
> — Chez moi, ce qui s'enfuit finit dans la marmite. C'est la règle de la maison.

### Festin — Ogre
- **Type** : `ogre` · masculin
- **Trait** : Ogre, végétarien depuis mardi
- **Tic de langage** : Compte les jours depuis mardi
- **Où on le croise** : Le Banquet des Gobelins · La Citadelle de Mortebrune · La Forge du Dragon · La Grande Foire des Mille Merveilles
- **Épilogue quand il est coupable** :
> — Vous étiez seul avec {victime}.  
> — {Il} voulait {menace}. J'ai gardé mon calme : je suis végétarien depuis mardi.  
> — On est jeudi.  
> — Justement. C'était plus mardi.

### Glas — Fossoyeur
- **Type** : `fossoyeur` · masculin
- **Trait** : Fossoyeur, creuse en sifflotant
- **Tic de langage** : Prend les mesures des gens qu'il rencontre
- **Où on le croise** : Le Cimetière de Minuit
- **Épilogue quand il est coupable** :
> — Vous étiez seul avec {victime}.  
> — {Il} voulait {menace}. Alors j'ai pris ses mesures.  
> — Pour quoi faire ?  
> — Le travail était à moitié fait. Autant le finir.

### Augure — Corbeau
- **Type** : `corbeau` · masculin
- **Trait** : Corbeau, voit beaucoup, comprend moins, ne dit rien
- **Tic de langage** : Ne parle pas : il écrit
- **Où on le croise** : Le Cimetière de Minuit
- **Épilogue quand il est coupable** :
> — Vous étiez seul avec {victime}.  
> — (Le corbeau vous tend un billet : « {Il} voulait {menace}. »)  
> — Et ensuite ?  
> — (Deuxième billet : « Ensuite, plus rien. »)

### Escabeau — Géant (grand monstre)
- **Type** : `geant` · masculin
- **Trait** : Géant, toujours couché : aucun plafond n'est assez haut
- **Tic de langage** : Se cogne, s'excuse auprès du plafond
- **Grand monstre** : occupe plusieurs cases (2 jusqu'en 8×8, 2 ou 3 en 9×9, 2 à 4 au-delà), forme propre à chaque enquête, jamais placé en premier.
- **Où on le croise** : Le Cimetière de Minuit (grand monstre) · La Foire aux Sortilèges (grand monstre) · Le Bal Masqué (grand monstre) · L'Académie de Magie (grand monstre) · Le Navire Fantôme (grand monstre) · La Citadelle de Mortebrune (grand monstre) · Le Grand Port de Brumeval (grand monstre) · La Grande Foire des Mille Merveilles (grand monstre) · Les Grands Bains de Brumeval (grand monstre)
- **Épilogue quand il est coupable** :
> — Vous étiez seul avec {victime}.  
> — {Il} voulait {menace}. Je me suis levé d'un coup.  
> — Et ?  
> — Pardon, plafond. Pardon, {victime}.

### Caillasse — Golem de pierre (grand monstre)
- **Type** : `golem` · masculin
- **Trait** : Golem de pierre, lent mais très appliqué
- **Tic de langage** : Exécute les ordres au mot près, avec un temps de retard
- **Grand monstre** : occupe plusieurs cases (2 jusqu'en 8×8, 2 ou 3 en 9×9, 2 à 4 au-delà), forme propre à chaque enquête, jamais placé en premier.
- **Où on le croise** : Le Château de Mortebrune (grand monstre) · La Forge du Dragon (grand monstre) · La Mine des Nains (grand monstre) · L'Académie de Magie (grand monstre) · La Bibliothèque Interdite (grand monstre) · Le Cimetière de Minuit (grand monstre) · La Tour de l'Archimage (grand monstre) · La Citadelle de Mortebrune (grand monstre) · Le Grand Port de Brumeval (grand monstre) · L'Université des Sortilèges (grand monstre) · La Grande Foire des Mille Merveilles (grand monstre)
- **Épilogue quand il est coupable** :
> — Vous étiez seul avec {victime}.  
> — …  
> — Vous étiez seul avec {victime}.  
> — {Il} a dit : « Pousse-toi, tas de cailloux. » Je me suis poussé. Sur {lui}.

### Glissandra — Vouivre (grand monstre)
- **Type** : `vouivre` · féminin
- **Trait** : Vouivre, serpent ailé, très longue à se retourner
- **Tic de langage** : Commence ses phrases par la fin
- **Grand monstre** : occupe plusieurs cases (2 jusqu'en 8×8, 2 ou 3 en 9×9, 2 à 4 au-delà), forme propre à chaque enquête, jamais placé en premier.
- **Où on le croise** : Le Bal Masqué (grand monstre) · La Tour de l'Archimage (grand monstre) · Le Palais des Mille Vœux (grand monstre) · Le Grand Port de Brumeval (grand monstre) · L'Université des Sortilèges (grand monstre) · La Grande Foire des Mille Merveilles (grand monstre) · Les Grands Bains de Brumeval (grand monstre)
- **Épilogue quand il est coupable** :
> — Vous étiez seule avec {victime}.  
> — Mort{e}, {il} est. Avant, {il} voulait {menace}.  
> — Dans l'ordre, s'il vous plaît.  
> — L'ordre, je finis toujours par le commencer.

### Cendrebrune — Dragon adulte (grand monstre)
- **Type** : `dragon` · masculin
- **Trait** : Dragon adulte, toujours lové dans un coin
- **Tic de langage** : Se réveille aux pires moments
- **Grand monstre** : occupe plusieurs cases (2 jusqu'en 8×8, 2 ou 3 en 9×9, 2 à 4 au-delà), forme propre à chaque enquête, jamais placé en premier.
- **Où on le croise** : Le Château de Mortebrune (grand monstre) · La Forge du Dragon (grand monstre) · La Mine des Nains (grand monstre) · Le Navire Fantôme (grand monstre) · Le Palais des Mille Vœux (grand monstre) · La Bibliothèque Interdite (grand monstre) · La Citadelle de Mortebrune (grand monstre) · Le Grand Port de Brumeval (grand monstre) · L'Université des Sortilèges (grand monstre) · La Grande Foire des Mille Merveilles (grand monstre)
- **Épilogue quand il est coupable** :
> — Vous étiez seul avec {victime}.  
> — {Il} voulait {menace}, pendant ma sieste.  
> — Et ?  
> — Je me suis réveillé de mauvaise humeur. On ne réveille pas un dragon.

## 5. Les liens entre personnages
Les mobiles viennent de ces liens. Ils nourrissent les épilogues, les lettres d'Augure et les gags.

| Entre | Lien | Ce que ça donne |
| --- | --- | --- |
| Aagrid et Capucine | Trois tournées impayées, devenues trois cents avec les intérêts | Le tavernier tient un registre des dettes de toute la baronnie |
| Aagrid et Bâfrin | Patron et plongeur, payé en restes | Bâfrin casse une assiette par jour, Aagrid la retient sur sa paie |
| Dagobert et Bakchich | Le roi et son trésorier ; le trésor est vide, personne ne sait pourquoi | Toute enquête au château finit par une question d'argent |
| Dagobert et Blafard | Blafard était châtelain avant Dagobert et n'a jamais rendu les clés | Querelle de propriété vieille de quatre siècles |
| Gontran et Flammèche | Le chevalier l'a adopté « pour le dresser » | C'est surtout l'armure de Gontran qui fond |
| Fausset et Goémone | Il lui écrit des chansons ; elle chante juste | Amour sans espoir, donc inépuisable |
| Aëlys et Fricot | La critique a donné deux sur dix au Banquet des Gobelins | Fricot rêve de la faire goûter à sa marmite |
| Fizzlebarbe et Fiolius | L'Académie contre l'Université ; chacun dit que l'autre a copié sa thèse | Les deux écoles se sabotent leurs examens |
| Fizzlebarbe et Fernand | Fernand était son apprenti ; une réparation de la Tour l'a tué il y a vingt ans (il est revenu en zombie, sans sa main) | Rancune légitime : jamais payé ni reconnu, les risques jamais expliqués |
| Fizzlebarbe et tout le monde | 412 ans et toujours pas de successeur | Chacun croit pouvoir hériter de la Tour, qui n'est pas un bien mais une charge (le fil rouge) |
| Ciguë et Ambroise | C'est elle qui l'a changé en crapaud ; il refuse de dire pourquoi | Ambroise cherche un bisou, Ciguë cherche une recette |
| Dewey et Gribouille | Gribouille a emprunté un grimoire il y a onze ans | Dewey le cherche dans toute la baronnie, en criant |
| Esbroufe et Clairvoya | Associés à la foire : lui vend les élixirs, elle prédit qu'ils marchent | Leurs clients reviennent rarement contents |
| Frégaton et Bâbord | Le capitaine qui ne part jamais, le pirate qui se perd toujours | Ils se disputent le même navire depuis vingt ans |
| Augure et tous | Le corbeau voit beaucoup et l'écrit (sans tout comprendre) | Chacun le soupçonne, personne ne l'attrape — et pour cause (section 9) |

## 6. Les invités de passage (les victimes)
La victime est **toujours un invité de passage**, un personnage d'un jour venu de l'extérieur, souvent pour embêter quelqu'un. La troupe reste ainsi vivante d'une enquête à l'autre. Seule exception : l'affaire finale, où meurt Fizzlebarbe (section 9).
Chaque invité a un **motif** (pourquoi il est venu, cité dans l'introduction : « venu{e} … ») et une **menace** (ce qu'il venait faire au coupable, citée dans l'épilogue). Sa carte de victime affiche sa description, puis « La victime. Elle était seule avec son meurtrier. »

Depuis le 2026-10-19 (audit du lore), **le nom de la victime change à chaque affaire** : la profession, le portrait, le motif et la menace restent, le nom est tiré d'une liste de vingt (`names` dans `cast.json`, tirage sans doublon par `build-puzzles.js`). Un même visiteur ne meurt donc plus seize fois ; Brumeval tue simplement beaucoup de percepteurs.

| Invité | Nom | Description | Motif (« venu… ») | Menace (dans l'épilogue) |
| --- | --- | --- | --- | --- |
| le percepteur (`percepteur`) | Taxard, Gabelou, Péageon, Prélevin, Dîmeaux, Fiscalin, Taillefer, Corvéon, Douanin, Tributin, Grattesou, Rognard, Comptegrain, Pressoux, Tondulard, Écornifle, Liardin, Exactin, Sangsuard, Ponctionnin (m) | Percepteur du baron, compte même les miettes | lever l'impôt de fin d'année | me faire payer l'impôt sur tout ce que je possède |
| la cousine (`cousine`) | Ermengarde, Cunégonde, Frédégonde, Brunehaut, Mahaut, Aldegonde, Adélaïde, Berthilde, Clotilde, Ingeburge, Ragnhilde, Hermengilde, Rotrude, Gisèle, Plectrude, Bathilde, Sigrade, Théodelinde, Amalberge, Gondeberge (f) | Cousine éloignée de tout le monde, venue pour l'héritage | réclamer un héritage | réclamer sa part de ce qui m'appartient |
| l'inspecteur des tavernes (`inspecteur`) | Pinardon, Picrate, Tastevin, Gorgeon, Rinçon, Gouleyant, Lichard, Sirotin, Chopinet, Godet, Bouchonné, Carafon, Trinquet, Flacon, Pichet, Gobelet, Décanteur, Blâmard, Notard, Barrique (m) | Inspecteur des tavernes, goûte tout, note tout | inspecter les lieux | me coller un blâme |
| le touriste (`touriste`) | Gustave, Badaud, Flânard, Musard, Fusainot, Crayonnet, Souvenard, Promenin, Visitin, Gaston, Anatole, Ernest, Hippolyte, Léandre, Octave, Évariste, Théophile, Baguenaud, Lambin, Curiosus (m) | Touriste, dessine tout au fusain, surtout ce qui est interdit | visiter la baronnie | faire mon portrait au fusain et le vendre à la foire |
| l'huissier (`huissier`) | Saisitout, Raflard, Videtout, Embarquin, Confisquet, Ramassard, Séquestre, Grappin, Crochard, Mainbasse, Ratissard, Huissard, Scellé, Inventorin, Expulsin, Récupérin, Emportout, Rapinard, Gobetout, Recouvrin (m) | Huissier de la banque gobeline, saisit d'abord, demande ensuite | saisir des biens | saisir mes affaires |
| la maîtresse-nageuse (`nageuse`) | Ondine, Brassée, Crawline, Naïade, Mouillette, Clapote, Éclaboussine, Bouée, Nageoire, Marée, Écume, Bulle, Apnée, Trempette, Plongette, Vaguelette, Ruisselle, Barbotte, Palmette, Noyelle (f) | Maîtresse-nageuse, sans permis ni maillot | donner des cours de natation | m'apprendre à nager de force |
| le colporteur (`colporteur`) | Bricabrac, Fourbi, Bazar, Babiolin, Camelot, Rossignol, Pacotillon, Toutvend, Bradeur, Fatras, Bimbelot, Breloquin, Chiffonnet, Rafistol, Ballot, Fouillis, Trimballe, Colifichet, Marchandin, Soldeur (m) | Colporteur, vend des objets dont personne ne veut | vendre sa camelote | me revendre ce qu'il m'avait déjà vendu |
| l'abbesse (`abbesse`) | Prudence, Bénédicte, Clémence, Humilité, Modestine, Pétronille, Ursule, Hildegarde, Scholastique, Radegonde, Sobriété, Austérine, Pénitence, Charité, Constance, Patience, Tempérance, Abstinence, Mortifia, Componcte (f) | Abbesse, quête pour un couvent introuvable | faire la quête | me faire la morale |
| le troubadour (`troubadour`) | Lirelire, Fredon, Ritournel, Refrain, Mandolin, Vielleux, Luthard, Couplet, Trémolo, Arpège, Rondeau, Virelai, Sérénadin, Tambourin, Flûtiau, Ménestrin, Troubadin, Chantefable, Lyrion, Pastourel (m) | Troubadour itinérant, chante juste, et ça agace | donner un concert | chanter mieux que tout le monde |
| la chasseuse de primes (`chasseuse`) | Vipérine, Traquette, Primerose, Carabine, Rapace, Fouine, Belette, Harpie, Griffonne, Arbalète, Embuscade, Pistarde, Sanguine, Corbine, Ronce, Épine, Mordache, Flèche, Lacette, Embûche (f) | Chasseuse de primes, a toujours un avis de recherche sur elle | toucher une prime | me livrer au baron contre trois écus |
| l'alchimiste (`alchimiste`) | Mercurio, Soufrius, Athanor, Plombard, Alambic, Distillon, Vitriol, Salpêtre, Antimoine, Cinabrin, Bismuth, Orpiment, Calcinus, Fumagal, Transmutin, Philtron, Sublimin, Azotin, Arsénio, Aurifex (m) | Alchimiste ambulant, transforme l'or en dettes | proposer ses services | changer mes économies en plomb |
| la baronne (`baronne`) | Grisemotte, Hautecuisse, Pincebec, Morgueline, Vanité, Clinquante, Dorure, Mirliflore, Pompadoure, Paonne, Fanfreluche, Brocarde, Altière, Rengorgée, Toupette, Ostentine, Jalousie, Hermine, Velours, Ombrelle (f) | Baronne voisine, jalouse de tout ce qui brille | rendre une visite de courtoisie | racheter la baronnie et me mettre dehors |
| la dresseuse (`dresseuse`) | Gertrude, Fouettine, Croquette, Griffette, Pattoune, Fanfare, Sifflette, Cerceline, Ombeline, Flamberge, Écaille, Muselle, Câline, Dragonette, Pirouette, Trapèze, Bastringue, Clownette, Grelotte, Ménagerie (f) | Dresseuse de dragons, surtout des petits | recruter des bêtes pour son cirque | m'emmener dans son cirque |
| le messager (`messager`) | Rapidon, Galopin, Trottin, Missivin, Courandier, Dépêchon, Hérautin, Presto, Véloce, Hâtif, Cavalcadin, Fileur, Sabot, Éperon, Postillon, Relais, Furtif, Bottin, Estafin, Ventrapat (m) | Messager du baron, porte toujours de mauvaises nouvelles | apporter une lettre du baron | m'annoncer une mauvaise nouvelle |

Dans chaque lieu, les invités sont tous différents d'une enquête à l'autre ; le titre d'une enquête est « <lieu> — l'affaire <invité> ».

## 7. Les lieux, un par un
Pour chaque lieu : sa taille de carte, ses pièces, ses habitués (les suspects possibles : dans chaque enquête, l'un d'eux est absent et un invité est la victime), ses invités, les ouvertures de ses intros (voix de l'enquêteur) et sa lettre d'Augure.
Gabarits des introductions : `{Titre}`/`{titre}` = titre de l'invité (« le percepteur »), `{victime}` = son nom, `{motif}` = son motif, `{e}`/`{lui}` = accords, `{Nombre}` = nombre de suspects en toutes lettres.

### Le Château de Mortebrune
- **Contrée** : Mortebrune, le chef-lieu · **carte** : 7×7 · **enquêtes** : 13
- **Pièces** : Chapelle, Grande salle, Cuisines, Armurerie, Tour, Jardin, Donjon (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Gontran, Bakchich, Fausset, Aëlys, Blafard, Flammèche, Dagobert
- **Victimes des enquêtes actives** : Patience (l'abbesse), Fanfare (la dresseuse), Gisèle (la cousine), Gouleyant (l'inspecteur des tavernes), Promenin (le touriste)
- **Enquêtes à grands monstres** : Cendrebrune (forme I2) — victime Saisitout ; Caillasse (forme I2) — victime Pinardon ; Cendrebrune (forme I2) — victime Rapidon ; Cendrebrune (forme I2) — victime Ondine ; Caillasse (forme I2) — victime Taxard ; Cendrebrune (forme I2) — victime Gustave
- **Ouvertures des intros** (selon le nombre d'affaires déjà résolues dans le lieu ; suivies de la mise en situation propre à chaque enquête) :
  - première venue : Ma première affaire à Brumeval, et déjà au château : on m'a fait appeler au nom du roi, ce qui veut dire que c'est grave, ou qu'il s'ennuie.
  - 2e affaire : Le roi m'a encore fait appeler. Cette fois, le garde de la herse savait mon nom.
  - 3e affaire : Troisième mort au château. Les gardes ne me demandent plus mon nom, ils me demandent combien de temps je compte rester.
  - 4e affaire : Quatrième affaire au château. On m'a gardé une chambre : à ce rythme, autant que je m'installe.
  - dernière : Encore le château, et j'espère bien que c'est la dernière fois. La cour ne rit plus quand j'arrive, et le roi ne s'ennuie plus du tout.
- **Lettre d'Augure** :
> Bakchich a mis la Tour de l'Archimage en garantie d'un prêt. Le prêteur n'a jamais vu le moindre titre de propriété. Bakchich appelle ça une formalité. — A.

### La Citadelle de Mortebrune
- **Contrée** : Mortebrune, le chef-lieu · **carte** : 9×9 · **enquêtes** : 12
- **Pièces** : Remparts, Cour d'honneur, Tour de guet, Armurerie, Jardin, Écuries, Oubliettes, Salle du trône (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Gontran, Bakchich, Fausset, Aëlys, Blafard, Flammèche, Dagobert, Ciguë, Festin
- **Victimes des enquêtes actives** : Sobriété (l'abbesse), Toutvend (le colporteur), Bastringue (la dresseuse), Clotilde (la cousine), Fumagal (l'alchimiste), Blâmard (l'inspecteur des tavernes), Galopin (le messager)
- **Enquêtes à grands monstres** : Cendrebrune (forme L3) — victime Pinardon ; Caillasse (forme L3, cachée) — victime Rapidon ; Escabeau (forme I2) — victime Ondine
- **Ouvertures des intros** (selon le nombre d'affaires déjà résolues dans le lieu ; suivies de la mise en situation propre à chaque enquête) :
  - première venue : À la Citadelle de Mortebrune, le pont-levis est resté coincé toute la nuit. Au moins, personne n'a pu s'enfuir.
  - 2e affaire : Retour à la Citadelle. Le pont-levis s'est encore coincé, juste derrière moi cette fois.
  - 3e affaire : Troisième mort à la Citadelle. On m'a confié une clé du pont-levis ; elle n'ouvre rien, mais c'est le geste qui compte.
  - 4e affaire : Quatrième affaire à la Citadelle. Les gardes ont pris l'habitude de bloquer le pont-levis dès qu'ils me voient arriver.
  - 5e affaire : Cinquième visite à la Citadelle de Mortebrune. Le pont-levis grince mon nom, maintenant ; du moins, c'est ce qu'il me semble.
  - 6e affaire : Sixième affaire à la Citadelle. On m'a proposé une chambre ; j'ai demandé laquelle n'avait pas encore servi de scène de crime.
  - dernière : Dernière affaire à la Citadelle de Mortebrune, j'espère. Le pont-levis est resté grand ouvert, et pour la première fois, personne ne s'enfuit.
- **Lettre d'Augure** :
> Blafard m'a montré ses titres de propriété. Le papier est authentique, et plus vieux que la baronnie. Le droit qu'il prétend en tirer l'est beaucoup moins. — A.

### Le Bal Masqué
- **Contrée** : Mortebrune, le chef-lieu · **carte** : 8×8 · **enquêtes** : 12
- **Pièces** : Balcon, Salle de bal, Escalier d'honneur, Vestiaire, Buffet, Salon des miroirs, Jardin d'hiver, Boudoir (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Blafard, Dagobert, Gontran, Aëlys, Fausset, Capucine, Fumerolle, Belladone
- **Victimes des enquêtes actives** : Arsénio (l'alchimiste), Charité (l'abbesse), Grappin (l'huissier), Fatras (le colporteur), Mirliflore (la baronne), Rapidon (le messager), Palmette (la maîtresse-nageuse)
- **Enquêtes à grands monstres** : Glissandra (forme I2) — victime Pinardon ; Escabeau et Glissandra (forme I2, I2) — victime Rapidon ; Glissandra (forme I2) — victime Ondine ; Escabeau et Glissandra (forme I2, I2) — victime Taxard
- **Ouvertures des intros** (selon le nombre d'affaires déjà résolues dans le lieu ; suivies de la mise en situation propre à chaque enquête) :
  - première venue : Bal masqué au château. Le plus dur, ici, c'est de savoir qui est sous quel masque, et qui ment dessous.
  - 2e affaire : Retour au Bal Masqué. On m'a prêté un masque pour me fondre dans la foule ; tout le monde m'a reconnu quand même.
  - 3e affaire : Troisième mort au Bal Masqué. L'orchestre continue de jouer, par habitude, et les danseurs aussi.
  - 4e affaire : Quatrième affaire au bal. On m'a invité à danser, ce qui ne m'était jamais arrivé ; je crois que c'était pour me distraire.
  - 5e affaire : Cinquième visite au Bal Masqué. J'ai fini par avoir mon propre masque, celui de l'enquêteur. Il ne trompe personne.
  - 6e affaire : Sixième affaire au bal. Les invités ôtent leur masque en me voyant, pour gagner du temps.
  - dernière : Dernier bal masqué, j'espère. À minuit, tout le monde a ôté son masque d'un coup, et pour une fois, personne ne mentait dessous.
- **Lettre d'Augure** :
> Au bal masqué, Fumerolle a promis la Tour à trois invités. Quand on lui a fait remarquer qu'ils ne pouvaient pas tous en hériter, elle a répondu qu'un vœu bien formulé ne se contredit jamais, et en a formulé un quatrième. — A.

### Le Cimetière de Minuit
- **Contrée** : Mortebrune, le chef-lieu · **carte** : 8×8 · **enquêtes** : 12
- **Pièces** : Maison du gardien, Chapelle, Allée des ifs, Caveau, Carré des pauvres, Jardin du souvenir, Ossuaire, Crypte (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Glas, Blafard, Fernand, Belladone, Ciguë, Augure, Gontran, Ambroise
- **Victimes des enquêtes actives** : Expulsin (l'huissier), Griffette (la dresseuse), Furtif (le messager), Aurifex (l'alchimiste), Curiosus (le touriste), Radegonde (l'abbesse), Ronce (la chasseuse de primes)
- **Enquêtes à grands monstres** : Escabeau (forme I2) — victime Prudence ; Caillasse (forme I2) — victime Mercurio ; Escabeau (forme I2) — victime Grisemotte ; Caillasse (forme I2) — victime Vipérine
- **Ouvertures des intros** (selon le nombre d'affaires déjà résolues dans le lieu ; suivies de la mise en situation propre à chaque enquête) :
  - première venue : Au Cimetière de Minuit, les habitués jurent qu'ils étaient déjà morts au moment du crime, ce qui n'aide pas.
  - 2e affaire : Retour au Cimetière de Minuit. On m'a gardé une place, au calme, entre deux tombes. J'ai décliné.
  - 3e affaire : Troisième mort au cimetière. Ici, ça ne se remarque presque pas, et c'est bien le problème.
  - 4e affaire : Quatrième affaire au Cimetière de Minuit. J'arrive maintenant à minuit pile ; les habitués trouvent ça poli.
  - 5e affaire : Cinquième visite au cimetière. Un fantôme m'a demandé si je comptais m'installer ; il avait l'air sincèrement intéressé.
  - 6e affaire : Sixième affaire au cimetière. Les chouettes ne s'envolent plus quand j'arrive : elles se poussent juste un peu.
  - dernière : Dernière affaire au Cimetière de Minuit, j'espère. Le brouillard s'est levé à mon arrivée, comme un rideau qu'on tire à la fin d'une pièce.
- **Lettre d'Augure** :
> Glas a déjà creusé une tombe au nom de Fizzlebarbe. L'archimage lui aurait demandé de « prévoir toutes les éventualités ». Je lui ai demandé s'il avait aussi prévu de vérifier que le vieux était mort. Il a pris des notes. — A.

### La Tour de l'Archimage
- **Contrée** : Mortebrune, le chef-lieu · **carte** : 7×7 · **enquêtes** : 11
- **Pièces** : Laboratoire, Observatoire, Bibliothèque, Hall, Crypte, Jardin, Escalier (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Blafard, Flammèche, Fernand, Goémone, Belladone, Fumerolle, Fizzlebarbe
- **Victimes des enquêtes actives** : Soufrius (l'alchimiste), Adélaïde (la cousine), Couplet (le troubadour), Bazar (le colporteur), Belette (la chasseuse de primes), Trapèze (la dresseuse), Hâtif (le messager)
- **Enquêtes à grands monstres** : Glissandra (forme I2) — victime Gertrude ; Caillasse (forme I2) — victime Saisitout ; Glissandra (forme I2) — victime Pinardon ; Caillasse (forme I2) — victime Rapidon
- **Ouvertures des intros** (selon le nombre d'affaires déjà résolues dans le lieu ; suivies de la mise en situation propre à chaque enquête) :
  - première venue : À la Tour de l'Archimage, les habitants prétendent n'avoir rien entendu. Ici, même les escaliers mentent.
  - 2e affaire : Retour à la Tour de l'Archimage. J'ai compté les marches en montant, puis en descendant : il en manquait trois.
  - 3e affaire : Troisième mort à la Tour. L'archimage m'a salué d'un « De mon temps, on ne mourait pas autant » ; il a 412 ans, il doit savoir.
  - 4e affaire : Quatrième affaire à la Tour. Une porte s'est ouverte toute seule à mon arrivée ; ici, c'est ce qu'on appelle être bien reçu.
  - 5e affaire : Cinquième visite à la Tour de l'Archimage. Les grimoires se sont tus quand je suis entré ; j'ignorais qu'ils parlaient.
  - 6e affaire : Sixième affaire à la Tour. J'ai pris l'habitude de monter à reculons, pour voir venir les étagères.
  - dernière : Dernière affaire à la Tour de l'Archimage, j'espère. Pour une fois, les marches m'ont mené exactement où je voulais aller, et je me suis demandé ce qu'elles cachaient.
- **Lettre d'Augure** :
> Fizzlebarbe a changé trois fois de serrure ce mois-ci. Il prétend que quelqu'un fouille son bureau. Curieusement, il ne m'a pas demandé de trouver le voleur, mais de dresser la liste de tous ceux qui ont essayé. — A.

### Le Port des Contrebandiers
- **Contrée** : La côte · **carte** : 7×7 · **enquêtes** : 7
- **Pièces** : Phare, Quai, Douane, Taverne du port, Chantier naval, Entrepôt, Marché aux poissons (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Bâbord, Frégaton, Écho-Écho, Goémone, Bakchich, Bâfrin, Aagrid
- **Victimes des enquêtes actives** : Raflard (l'huissier), Missivin (le messager), Rognard (le percepteur), Ritournel (le troubadour), Flacon (l'inspecteur des tavernes), Clapote (la maîtresse-nageuse), Souvenard (le touriste)
- **Ouvertures des intros** (selon le nombre d'affaires déjà résolues dans le lieu ; suivies de la mise en situation propre à chaque enquête) :
  - première venue : Au Port des Contrebandiers, tout le monde a quelque chose à cacher, généralement dans un tonneau.
  - 2e affaire : Retour au Port des Contrebandiers. On a rajouté des tonneaux depuis ma dernière visite ; personne ne sait d'où ils viennent.
  - 3e affaire : Troisième mort au port. Un tonneau m'a suivi jusqu'à l'auberge, et je n'ai pas osé l'ouvrir.
  - 4e affaire : Quatrième affaire au port. La marée m'attendait ; elle aussi a pris l'habitude de rapporter des choses.
  - 5e affaire : Cinquième visite au Port des Contrebandiers. J'ai fini par acheter un tonneau, pour ne pas me faire remarquer.
  - 6e affaire : Sixième affaire au port. Les mouettes ont commencé à me voler mes notes ; je soupçonne qu'on les paie.
  - dernière : Dernière affaire au Port des Contrebandiers, j'espère. Pour une fois, tous les tonneaux étaient vides, et c'est ce qui m'a le plus inquiété.
- **Lettre d'Augure** :
> Fiolius a fait livrer douze bocaux vides à son nom, avec la mention « échantillons de la Tour ». Il affirme qu'ils sont indispensables à une étude. Il ne m'a pas dit ce qu'il compte mettre dedans. — A.

### Le Grand Port de Brumeval
- **Contrée** : La côte · **carte** : 10×10 · **enquêtes** : 13
- **Pièces** : Quais, Entrepôt, Taverne du Kraken, Capitainerie, Chantier naval, Marché aux poissons, Galion, Phare, Douane (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Bâbord, Frégaton, Écho-Écho, Goémone, Aagrid, Bâfrin, Bakchich, Belladone, Esbroufe, Fernand
- **Victimes des enquêtes actives** : Bradeur (le colporteur), Harpie (la chasseuse de primes), Naïade (la maîtresse-nageuse), Théophile (le touriste), Pompadoure (la baronne), Tempérance (l'abbesse), Dîmeaux (le percepteur)
- **Enquêtes à grands monstres** : Cendrebrune (forme T4) — victime Prudence ; Glissandra (forme L4, cachée) — victime Taxard ; Caillasse et Escabeau (forme I3, I2) — victime Gustave
- **Ouvertures des intros** (selon le nombre d'affaires déjà résolues dans le lieu ; suivies de la mise en situation propre à chaque enquête) :
  - première venue : Brouillard à couper au couteau sur le Grand Port de Brumeval. Je n'y vois pas à trois pas, et les témoins non plus, paraît-il.
  - 2e affaire : Retour au Grand Port. Le brouillard est toujours là ; je crois qu'il ne part jamais, il change seulement de couleur.
  - 3e affaire : Troisième mort au Grand Port. On m'a prêté une lanterne ; elle éclaire surtout le brouillard.
  - 4e affaire : Quatrième affaire au Grand Port. J'ai appris à reconnaître les habitués à leur toux dans la brume.
  - 5e affaire : Cinquième visite au Grand Port de Brumeval. Un marin m'a demandé l'heure ; dans ce brouillard, personne n'en est jamais sûr.
  - 6e affaire : Sixième affaire au Grand Port. Le brouillard s'est écarté à mon passage, ce qui a beaucoup inquiété les marins.
  - dernière : Dernière affaire au Grand Port, j'espère. Ce matin, pour la première fois, il n'y avait pas de brouillard, et tout le monde avait l'air de se sentir tout nu.
- **Lettre d'Augure** :
> Le notaire avait reçu un projet de testament sous enveloppe scellée. Le lendemain, l'enveloppe avait disparu. Sur le bureau, une plume noire. Le notaire jure avoir entendu un battement d'ailes ; il jure aussi qu'il dormait. — A.

### Le Navire Fantôme
- **Contrée** : La côte · **carte** : 7×7 · **enquêtes** : 11
- **Pièces** : Vigie, Pont, Cabine du capitaine, Entrepont, Coquerie, Cale, Soute à poudre (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Bâbord, Écho-Écho, Goémone, Blafard, Fernand, Belladone, Frégaton
- **Victimes des enquêtes actives** : Mortifia (l'abbesse), Mouillette (la maîtresse-nageuse), Trinquet (l'inspecteur des tavernes), Tondulard (le percepteur), Cinabrin (l'alchimiste), Fanfreluche (la baronne), Fouine (la chasseuse de primes)
- **Enquêtes à grands monstres** : Cendrebrune (forme I2) — victime Mercurio ; Escabeau (forme I2) — victime Grisemotte ; Cendrebrune (forme I2) — victime Vipérine ; Escabeau (forme I2) — victime Bricabrac
- **Ouvertures des intros** (selon le nombre d'affaires déjà résolues dans le lieu ; suivies de la mise en situation propre à chaque enquête) :
  - première venue : Le Navire Fantôme ne quitte jamais le port. Le capitaine m'assure que c'est la faute de la tempête ; il n'y a pas de tempête.
  - 2e affaire : Retour à bord du Navire Fantôme. Le capitaine m'a raconté une nouvelle tempête ; il n'y en a toujours pas.
  - 3e affaire : Troisième mort à bord. Je commence à avoir le pied marin, pour un navire qui ne bouge pas.
  - 4e affaire : Quatrième affaire sur le Navire Fantôme. Le capitaine a noté mon passage dans le journal de bord, entre deux tempêtes imaginaires.
  - 5e affaire : Cinquième visite à bord. L'équipage m'a nommé matelot d'honneur : j'ai le droit de ne rien faire, comme tout le monde.
  - 6e affaire : Sixième affaire sur le Navire Fantôme. Le capitaine jure que le navire a bougé cette nuit. Il a peut-être raison : les amarres sont un peu plus tendues.
  - dernière : Dernière affaire à bord du Navire Fantôme, j'espère. Pour la première fois, le capitaine n'a parlé d'aucune tempête, et c'est le calme qui m'a fait peur.
- **Lettre d'Augure** :
> Frégaton jure avoir vu Fizzlebarbe embarquer pour « un voyage sans retour ». Le navire n'a pas quitté le quai. Ce soir-là, pourtant, le brouillard venait du mauvais côté du port. Frégaton refuse ce détail : il gâche son histoire. — A.

### Les Thermes Enchantés
- **Contrée** : La côte · **carte** : 6×6 · **enquêtes** : 6
- **Pièces** : Vestiaire, Bassin chaud, Bassin froid, Sauna, Salle de massage (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Goémone, Aëlys, Bâfrin, Capucine, Gribouille, Aagrid
- **Victimes des enquêtes actives** : Mahaut (la cousine), Pirouette (la dresseuse), Récupérin (l'huissier), Pichet (l'inspecteur des tavernes), Bottin (le messager), Éclaboussine (la maîtresse-nageuse)
- **Ouvertures des intros** (selon le nombre d'affaires déjà résolues dans le lieu ; suivies de la mise en situation propre à chaque enquête) :
  - première venue : Aux Thermes Enchantés, j'enquête en peignoir ; c'est le règlement, paraît-il.
  - 2e affaire : Retour aux Thermes Enchantés. On m'a rendu mon peignoir, lavé, plié et brodé à mon nom.
  - 3e affaire : Troisième mort aux Thermes. Le peignoir commence à me plaire, et je crains de m'habituer.
  - 4e affaire : Quatrième affaire aux Thermes Enchantés. On m'a proposé un massage pendant les interrogatoires ; j'ai refusé, de justesse.
  - 5e affaire : Cinquième visite aux Thermes. Les baigneurs disent que je fais partie des meubles, des meubles un peu humides.
  - dernière : Dernière affaire aux Thermes Enchantés, j'espère. J'ai rendu mon peignoir à l'entrée, et le gardien a eu l'air sincèrement triste.
- **Lettre d'Augure** :
> Aux Thermes, Fumerolle a dit : « Le vieux veut léguer la Tour à celui qui le mérite. Personne ne le mérite. » Puis elle m'a demandé si un vœu pouvait modifier un titre de propriété. Elle préfère les génies aux notaires. — A.

### Les Grands Bains de Brumeval
- **Contrée** : La côte · **carte** : 10×10 · **enquêtes** : 12
- **Pièces** : Grand bassin, Hammam, Sauna, Vestiaires, Bassin des sirènes, Salon de thé, Jardin des cures, Salle des massages, Bains de boue (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Goémone, Aëlys, Bâfrin, Capucine, Aagrid, Belladone, Esbroufe, Fumerolle, Fizzlebarbe, Dagobert
- **Victimes des enquêtes actives** : Pacotillon (le colporteur), Jalousie (la baronne), Cerceline (la dresseuse), Cunégonde (la cousine), Rapace (la chasseuse de primes), Clémence (l'abbesse), Presto (le messager)
- **Enquêtes à grands monstres** : Escabeau (forme T4) — victime Pinardon ; Glissandra (forme L4, cachée) — victime Rapidon
- **Ouvertures des intros** (selon le nombre d'affaires déjà résolues dans le lieu ; suivies de la mise en situation propre à chaque enquête) :
  - première venue : Aux Grands Bains de Brumeval, on vient soigner ses rhumatismes, ses nerfs ou sa réputation. Il fait quarante degrés, tout le monde transpire, et personne ne sait rien.
  - 2e affaire : Retour aux Grands Bains. On m'a prescrit une cure ; je crois qu'on voulait surtout m'occuper.
  - 3e affaire : Troisième mort aux Grands Bains. Il fait toujours quarante degrés, et les témoins fondent avant de parler.
  - 4e affaire : Quatrième affaire aux Grands Bains de Brumeval. J'ai un casier à mon nom, entre celui du roi et celui d'un inconnu qui ne revient jamais.
  - 5e affaire : Cinquième visite aux Grands Bains. On m'a fait goûter l'eau de source « qui guérit tout » ; je me sens surtout mouillé.
  - 6e affaire : Sixième affaire aux Grands Bains. Les curistes ont commencé à m'appeler « docteur », et je n'ose plus les détromper.
  - dernière : Dernière affaire aux Grands Bains de Brumeval, j'espère. Pour une fois, l'eau était froide, et tout le monde s'est mis à parler.
- **Lettre d'Augure** :
> Aux Grands Bains, Fizzlebarbe a confié à son masseur qu'il « changerait tout » après sa cure : il ne voulait peut-être plus transmettre un bâtiment, mais une tâche. Le reste s'est perdu dans les huiles. — A.

### Meurtre au Sanglier Borgne
- **Contrée** : La campagne de Bois-Tordu · **carte** : 6×6 · **enquêtes** : 6
- **Pièces** : Salle commune, Cuisine, Cave, Chambre, Écurie (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Gribouille, Fausset, Bâfrin, Aëlys, Capucine, Aagrid
- **Victimes des enquêtes actives** : Câline (la dresseuse), Rinçon (l'inspecteur des tavernes), Hérautin (le messager), Apnée (la maîtresse-nageuse), Corvéon (le percepteur)
- **Ouvertures des intros** (selon le nombre d'affaires déjà résolues dans le lieu ; suivies de la mise en situation propre à chaque enquête) :
  - première venue : Au Sanglier Borgne, le tenancier m'a accueilli comme un vieil ami, puis il a compté mes pas jusqu'au comptoir. J'ai demandé un café ; on m'a servi une bière.
  - 2e affaire : Retour au Sanglier Borgne. Aagrid m'a servi une bière avant que je dise un mot, et l'a notée sur mon ardoise.
  - 3e affaire : Troisième mort au Sanglier Borgne. Mon ardoise a désormais sa propre ligne, entre celle de la fée et celle du mage.
  - 4e affaire : Quatrième affaire à la taverne. Les habitués me gardent un tabouret ; Aagrid me compte le tabouret.
  - dernière : Dernière affaire au Sanglier Borgne, j'espère. Aagrid m'a offert la bière, la première gratuite de l'histoire de la maison ; elle avait un arrière-goût de poire et de cognac, et ça m'a inquiété plus que le cadavre.
- **Lettre d'Augure** :
> Gribouille doit quarante écus au Sanglier Borgne. Il promet de tout rembourser « dès que la Tour sera à lui ». Il promet aussi depuis onze ans de rendre le grimoire de Dewey. Les deux promesses ont le même calendrier. — A.

### Le Moulin de Bois-Tordu
- **Contrée** : La campagne de Bois-Tordu · **carte** : 6×6 · **enquêtes** : 6
- **Pièces** : Moulin, Grange, Verger, Potager, Mare (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Capucine, Bâfrin, Goémone, Fernand, Flammèche, Farinard
- **Victimes des enquêtes actives** : Scholastique (l'abbesse), Orpiment (l'alchimiste), Ondine (la maîtresse-nageuse), Pressoux (le percepteur), Gaston (le touriste), Mandolin (le troubadour)
- **Ouvertures des intros** (selon le nombre d'affaires déjà résolues dans le lieu ; suivies de la mise en situation propre à chaque enquête) :
  - première venue : Au Moulin de Bois-Tordu, le meunier m'a proposé de peser les suspects, « au poids, c'est honnête ». J'ai refusé.
  - 2e affaire : Me revoilà au Moulin de Bois-Tordu. Le meunier a sorti sa balance avant même de me dire bonjour.
  - 3e affaire : Troisième mort au moulin. Le meunier tient maintenant un registre des suspects, au poids ; le zombie y perd quelques grammes à chaque page.
  - 4e affaire : Quatrième affaire à Bois-Tordu. Le meunier m'a pesé, moi, « pour comparer ». J'ai pris trois livres depuis la taverne.
  - 5e affaire : Cinquième fois au moulin. La roue tourne, la meule tourne, et j'ai de plus en plus l'impression que c'est moi qu'on moud.
  - dernière : Dernière affaire au Moulin de Bois-Tordu, j'espère. Le meunier a rangé sa balance : il dit qu'il n'y a plus rien à peser, et je préfère ne pas savoir pourquoi.
- **Lettre d'Augure** :
> Fernand a fait refaire une clé de la Tour. Il dit en avoir eu une avant l'accident, celui qui l'a tué. Quand je lui ai demandé ce qu'elle ouvrait, il a frotté son moignon et changé de sujet. — A.

### La Ferme Hantée
- **Contrée** : La campagne de Bois-Tordu · **carte** : 6×6 · **enquêtes** : 6
- **Pièces** : Grange, Étable, Poulailler, Fournil, Potager (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Briochon, Bâfrin, Fernand, Capucine, Flammèche, Farinard
- **Victimes des enquêtes actives** : Austérine (l'abbesse), Salpêtre (l'alchimiste), Morgueline (la baronne), Épine (la chasseuse de primes), Bricabrac (le colporteur), Pastourel (le troubadour)
- **Ouvertures des intros** (selon le nombre d'affaires déjà résolues dans le lieu ; suivies de la mise en situation propre à chaque enquête) :
  - première venue : On l'appelle la Ferme Hantée, et on m'y a fait venir pour un mort de plus. Les poules, elles, refusent de témoigner.
  - 2e affaire : Retour à la Ferme Hantée. Les poules me reconnaissent ; elles refusent toujours de témoigner, mais plus poliment.
  - 3e affaire : Troisième mort à la ferme. Je commence à comprendre pourquoi on la dit hantée : personne n'en repart jamais tout à fait.
  - 4e affaire : Quatrième affaire à la Ferme Hantée. Le coq a chanté à mon arrivée, à minuit. Je crois qu'il me signale.
  - 5e affaire : Cinquième visite à la ferme. Une poule a fini par me parler. Elle a dit « cot ». J'ai noté.
  - dernière : Dernière affaire à la Ferme Hantée, j'espère. Les poules se sont alignées pour me regarder arriver, comme on salue un collègue.
- **Lettre d'Augure** :
> Briochon raconte que le testament existe, qu'il est caché, et qu'il n'en dira pas plus. Il a seulement entendu parler d'un document préparatoire. Le reste, il l'a brodé avec beaucoup de conviction. — A.

### Le Marais des Brumes
- **Contrée** : La campagne de Bois-Tordu · **carte** : 6×6 · **enquêtes** : 6
- **Pièces** : Cabane, Ponton, Roselière, Îlot, Tourbière (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Goémone, Fernand, Ambroise, Bâfrin, Aëlys, Ciguë
- **Victimes des enquêtes actives** : Ombeline (la dresseuse), Inventorin (l'huissier), Barrique (l'inspecteur des tavernes), Relais (le messager), Noyelle (la maîtresse-nageuse), Liardin (le percepteur)
- **Ouvertures des intros** (selon le nombre d'affaires déjà résolues dans le lieu ; suivies de la mise en situation propre à chaque enquête) :
  - première venue : Au Marais des Brumes, j'ai de la vase jusqu'aux genoux et zéro témoin fiable. Le marais rend les corps ; il garde le reste.
  - 2e affaire : Retour au Marais des Brumes. La vase m'arrive toujours aux genoux, mais cette fois, j'ai des bottes.
  - 3e affaire : Troisième mort au marais. Mes bottes sont restées dans la vase la dernière fois ; le marais les a gardées, avec le reste.
  - 4e affaire : Quatrième affaire dans la brume. Je reconnais maintenant chaque nénuphar, et je crois que certains me reconnaissent aussi.
  - 5e affaire : Cinquième visite au marais. La brume s'est écartée pour me laisser passer ; ici, c'est ce qui ressemble le plus à de la politesse.
  - dernière : Dernière affaire au Marais des Brumes, j'espère. Pour une fois, le marais m'a laissé mes bottes, comme s'il savait que je ne reviendrais pas.
- **Lettre d'Augure** :
> Ciguë vend une potion qui révèle certaines encres invisibles. Dewey en a acheté trois, « pour retrouver un livre ». Je ne sais pas ce qui l'inquiète le plus : l'encre, le livre ou le reçu. — A.

### La Mine des Nains
- **Contrée** : Les Monts Grimaces · **carte** : 8×8 · **enquêtes** : 14
- **Pièces** : Entrée, Galerie, Forge, Puits, Filon, Dortoir, Cantine, Salle des coffres (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Grisou, Bâfrin, Bakchich, Flammèche, Gontran, Capucine, Fernand, Granit
- **Victimes des enquêtes actives** : Bénédicte (l'abbesse), Ventrapat (le messager), Ballot (le colporteur), Chantefable (le troubadour), Bulle (la maîtresse-nageuse), Sangsuard (le percepteur)
- **Enquêtes à grands monstres** : Caillasse (forme I2) — victime Saisitout ; Cendrebrune (forme I2) — victime Pinardon ; Caillasse et Cendrebrune (forme I2, I2) — victime Rapidon ; Caillasse (forme I2) — victime Ondine ; Cendrebrune (forme I2) — victime Taxard ; Caillasse et Cendrebrune (forme I2, I2) — victime Gustave
- **Ouvertures des intros** (selon le nombre d'affaires déjà résolues dans le lieu ; suivies de la mise en situation propre à chaque enquête) :
  - première venue : À la Mine des Nains, on m'a tendu un casque et une lanterne. Ici, tout le monde a une pioche, et personne n'a d'alibi.
  - 2e affaire : Retour à la Mine des Nains. Le contremaître a chronométré ma descente : trop lente, paraît-il.
  - 3e affaire : Troisième mort au fond de la mine. Les nains m'ont donné ma propre pioche, « au cas où ». Je ne sais toujours pas au cas où quoi.
  - 4e affaire : Quatrième affaire à la mine. On m'a demandé « On creuse ? » avant même de me dire bonjour. J'ai dit non ; ils ont creusé quand même.
  - 5e affaire : Cinquième descente à la mine. Le contremaître m'a compté une pause de trop, et l'a retenue sur une paie que je ne touche pas.
  - dernière : Dernière descente à la Mine des Nains, j'espère. Ce matin, le contremaître a arrêté son chronomètre en me voyant : il dit que, pour moi, le temps est compté.
- **Lettre d'Augure** :
> Granit a reçu commande d'un coffre à l'épreuve de la magie, à livrer dans la Tour. Le client a payé d'avance et demandé qu'on ne grave aucun nom. Granit a quand même chronométré la livraison. — A.

### La Forge du Dragon
- **Contrée** : Les Monts Grimaces · **carte** : 7×7 · **enquêtes** : 13
- **Pièces** : Antre du dragon, Forge, Armurerie, Fonderie, Réserve de charbon, Atelier, Cour (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Grisou, Gontran, Bakchich, Bâfrin, Festin, Gribouille, Flammèche
- **Victimes des enquêtes actives** : Ostentine (la baronne), Trimballe (le colporteur), Gondeberge (la cousine), Gabelou (le percepteur), Trottin (le messager), Flânard (le touriste)
- **Enquêtes à grands monstres** : Cendrebrune (forme I2) — victime Prudence ; Caillasse (forme I2) — victime Mercurio ; Cendrebrune et Caillasse (forme I2, I2) — victime Rapidon ; Cendrebrune (forme I2) — victime Ondine ; Caillasse (forme I2) — victime Taxard ; Cendrebrune et Caillasse (forme I2, I2) — victime Gustave
- **Ouvertures des intros** (selon le nombre d'affaires déjà résolues dans le lieu ; suivies de la mise en situation propre à chaque enquête) :
  - première venue : La Forge du Dragon fume plus que d'habitude. Le dragon dort ; j'aimerais qu'il continue.
  - 2e affaire : Retour à la Forge du Dragon. Le dragon dort toujours, et j'ai appris à marcher sur la pointe des pieds.
  - 3e affaire : Troisième mort à la forge. La fumée me connaît maintenant ; elle me suit jusqu'à l'auberge.
  - 4e affaire : Quatrième affaire à la forge. On m'a forgé un tabouret à mon nom ; il est encore tiède, et un peu tordu.
  - 5e affaire : Cinquième visite à la Forge du Dragon. Le dragon ronfle plus fort ; les habitués disent qu'il rêve de moi.
  - dernière : Dernière affaire à la Forge du Dragon, j'espère. Même les enclumes se sont tues quand je suis entré.
- **Lettre d'Augure** :
> Fizzlebarbe a fait forger une clé unique. Le forgeron l'a vu la glisser entre les pages d'un grimoire qui n'aurait jamais dû se trouver dans la Tour. Ici, les secrets s'empilent mieux que les livres. — A.

### Le Banquet des Gobelins
- **Contrée** : Les Monts Grimaces · **carte** : 6×6 · **enquêtes** : 6
- **Pièces** : Cuisine, Cellier, Salle des fêtes, Garde-manger, Cour (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Bakchich, Bâfrin, Festin, Fausset, Briochon, Fricot
- **Victimes des enquêtes actives** : Croquette (la dresseuse), Recouvrin (l'huissier), Courandier (le messager), Brassée (la maîtresse-nageuse), Ingeburge (la cousine)
- **Ouvertures des intros** (selon le nombre d'affaires déjà résolues dans le lieu ; suivies de la mise en situation propre à chaque enquête) :
  - première venue : Au Banquet des Gobelins, on m'a placé en bout de table et servi une soupe. Je ne l'ai pas touchée.
  - 2e affaire : Me revoilà au Banquet des Gobelins. On m'a resservi la même soupe ; je crois que c'est la même assiette.
  - 3e affaire : Troisième banquet, troisième mort. Les gobelins m'ont gardé ma place, et la soupe a pris une couleur que je ne saurais pas nommer.
  - 4e affaire : Les gobelins ont fini par graver mon nom sur un tabouret. La soupe, elle, a commencé à bouger.
  - dernière : Dernier banquet, j'espère. Ce soir, les gobelins ont retiré la soupe de ma place sans un mot : même eux ont compris.
- **Lettre d'Augure** :
> Au Banquet des Gobelins, Bakchich a porté un toast « au futur propriétaire de la Tour », en levant son verre vers lui-même. Puis il a demandé si les gobelins prêtaient sans garantie. Personne n'a eu le cœur de répondre. — A.

### L'Académie de Magie
- **Contrée** : Le quartier savant · **carte** : 7×7 · **enquêtes** : 11
- **Pièces** : Tour d'astronomie, Salle de cours, Bureau du directeur, Dortoir, Laboratoire, Réfectoire, Serre (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Brindille, Gribouille, Capucine, Flammèche, Fumerolle, Aëlys, Fiolius
- **Victimes des enquêtes actives** : Ursule (l'abbesse), Chiffonnet (le colporteur), Azotin (l'alchimiste), Grisemotte (la baronne), Ponctionnin (le percepteur), Sifflette (la dresseuse)
- **Enquêtes à grands monstres** : Caillasse (forme I2) — victime Vipérine ; Escabeau (forme I2) — victime Bricabrac ; Caillasse (forme I2) — victime Ermengarde ; Escabeau (forme I2) — victime Gertrude
- **Ouvertures des intros** (selon le nombre d'affaires déjà résolues dans le lieu ; suivies de la mise en situation propre à chaque enquête) :
  - première venue : À l'Académie de Magie, on m'a reçu un soir d'examens. Ça sent le soufre, mais ici, ça sent toujours le soufre.
  - 2e affaire : Retour à l'Académie de Magie. Ça sent encore le soufre ; on m'assure que c'est un autre soufre.
  - 3e affaire : Troisième mort à l'Académie. On m'a proposé de m'inscrire, « vu le temps que vous passez ici ».
  - 4e affaire : Quatrième affaire à l'Académie. J'ai assisté à un cours sans le faire exprès. J'ai eu six sur dix.
  - 5e affaire : Cinquième visite à l'Académie. Les élèves révisent les sorts de protection quand j'arrive, et je ne sais pas si je dois le prendre mal.
  - dernière : Dernière affaire à l'Académie de Magie, j'espère. Pour une fois, ça ne sent pas le soufre, et personne n'ose dire pourquoi.
- **Lettre d'Augure** :
> Brindille s'entraîne en secret au sort qui ouvre les serrures magiques. Trois portes de l'Académie ont déjà explosé. La quatrième s'est déplacée de deux pas vers la gauche. Le directeur appelle cela un progrès. — A.

### L'Université des Sortilèges
- **Contrée** : Le quartier savant · **carte** : 11×11 · **enquêtes** : 14
- **Pièces** : Amphithéâtre, Grande bibliothèque, Serre, Dortoir, Laboratoire, Cour, Réfectoire, Observatoire, Salle des duels, Bureau du doyen (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Fizzlebarbe, Brindille, Fiolius, Gribouille, Capucine, Fumerolle, Dewey, Flammèche, Ambroise, Blafard, Clairvoya
- **Victimes des enquêtes actives** : Athanor (l'alchimiste), Breloquin (le colporteur), Sirotin (l'inspecteur des tavernes), Bouée (la maîtresse-nageuse), Éperon (le messager), Péageon (le percepteur), Gobetout (l'huissier)
- **Enquêtes à grands monstres** : Cendrebrune (forme S4) — victime Ermengarde ; Caillasse (forme O4) — victime Gertrude ; Glissandra (forme L4, cachée) — victime Saisitout
- **Ouvertures des intros** (selon le nombre d'affaires déjà résolues dans le lieu ; suivies de la mise en situation propre à chaque enquête) :
  - première venue : À l'Université des Sortilèges, c'est la veille de la remise des diplômes. L'Académie d'en face nie tout en bloc, avant même que je demande.
  - 2e affaire : Retour à l'Université des Sortilèges. L'Académie d'en face a envoyé un billet : elle nie aussi celui-là.
  - 3e affaire : Troisième mort à l'Université. La remise des diplômes est encore repoussée, et les élèves commencent à me regarder de travers.
  - 4e affaire : Quatrième affaire à l'Université. On m'a décerné un diplôme d'honneur en criminologie, en attendant que j'en trouve un vrai.
  - 5e affaire : Cinquième visite à l'Université des Sortilèges. Mon nom figure maintenant au programme, rubrique « Accidents fréquents ».
  - 6e affaire : Sixième affaire à l'Université. L'Académie d'en face a cessé de nier ; elle se contente de rire.
  - dernière : Dernière affaire à l'Université des Sortilèges, j'espère. Demain, on remet enfin les diplômes, à condition qu'il reste quelqu'un pour les recevoir.
- **Lettre d'Augure** :
> Fiolius a écrit « Annexe de l'Université » sur les plans de la Tour, à l'encre sympathique. Elle se voit très bien. Sur une coupe, deux escaliers mènent au même palier, mais aucun plan ne montre ce qui les relie. — A.

### La Bibliothèque Interdite
- **Contrée** : Le quartier savant · **carte** : 7×7 · **enquêtes** : 10
- **Pièces** : Scriptorium, Rayonnages, Bureau, Salle de lecture, Galerie, Réserve, Archives (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Gribouille, Blafard, Belladone, Fumerolle, Bakchich, Fizzlebarbe, Dewey
- **Victimes des enquêtes actives** : Hildegarde (l'abbesse), Hautecuisse (la baronne), Badaud (le touriste), Refrain (le troubadour), Soldeur (le colporteur), Ermengarde (la cousine)
- **Enquêtes à grands monstres** : Caillasse (forme I2) — victime Vipérine ; Caillasse et Cendrebrune (forme I2, I2) — victime Bricabrac ; Caillasse et Cendrebrune (forme I2, I2) — victime Ermengarde
- **Ouvertures des intros** (selon le nombre d'affaires déjà résolues dans le lieu ; suivies de la mise en situation propre à chaque enquête) :
  - première venue : À la Bibliothèque Interdite, on m'a demandé d'enquêter en silence. Je chuchote mes questions ; on me répond en hurlant « chut ».
  - 2e affaire : Retour à la Bibliothèque Interdite. Le bibliothécaire m'a délivré une carte de lecteur, et un avertissement pour bruit de pas.
  - 3e affaire : Troisième mort à la bibliothèque. J'ai appris à enquêter par écrit ; on me rend mes billets annotés, avec les fautes en rouge.
  - 4e affaire : Quatrième affaire chez les livres. Mon dossier a désormais une cote, rangé entre « Crimes » et « Crimes, suite ».
  - 5e affaire : Cinquième visite à la bibliothèque. Je chuchote si bas que je ne m'entends plus moi-même ; on m'a quand même dit « chut ».
  - dernière : Dernière affaire à la Bibliothèque Interdite, j'espère. Pour la première fois, personne n'a crié « chut » quand je suis entré, et ce silence-là m'a glacé.
- **Lettre d'Augure** :
> Dewey a enfin retrouvé le grimoire emprunté par Gribouille, au fond de la Tour. Sous la reliure, une petite fente a été refermée avec soin. Dewey hésite à la cataloguer comme réparation, fraude ou insulte. — A.

### La Foire aux Sortilèges
- **Contrée** : Sur la route · **carte** : 7×7 · **enquêtes** : 9
- **Pièces** : Roulotte, Stands, Buvette, Coulisses, Chapiteau, Ménagerie, Manège (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Clairvoya, Fausset, Bakchich, Bâfrin, Capucine, Flammèche, Esbroufe
- **Victimes des enquêtes actives** : Pénitence (l'abbesse), Clinquante (la baronne), Visitin (le touriste), Antimoine (l'alchimiste), Fiscalin (le percepteur), Marchandin (le colporteur), Sanguine (la chasseuse de primes)
- **Enquêtes à grands monstres** : Escabeau (forme I2) — victime Vipérine ; Escabeau (forme I2) — victime Bricabrac
- **Ouvertures des intros** (selon le nombre d'affaires déjà résolues dans le lieu ; suivies de la mise en situation propre à chaque enquête) :
  - première venue : À la Foire aux Sortilèges, le bonimenteur m'a proposé un élixir de vérité avant même que je sorte mon carnet. Deux écus, garanti sans effet.
  - 2e affaire : Retour à la Foire aux Sortilèges. Le bonimenteur m'a fait un prix sur l'élixir de vérité : un écu, toujours sans effet.
  - 3e affaire : Troisième mort à la foire. Le bonimenteur vend maintenant des « souvenirs de l'enquête », avec mon portrait dessus, en moins bien.
  - 4e affaire : Quatrième affaire à la foire. Le bonimenteur m'a vouvoyé, puis il a vouvoyé mon carnet, puis il m'en a vendu un second.
  - 5e affaire : Cinquième visite à la Foire aux Sortilèges. On a monté une attraction « Devinez le coupable » ; elle rapporte plus que moi.
  - 6e affaire : Sixième affaire à la foire. Le bonimenteur m'a offert l'élixir de vérité, gratuitement, et je me méfie d'autant plus.
  - dernière : Dernière affaire à la Foire aux Sortilèges, j'espère. Le bonimenteur a remballé son élixir de vérité : il dit que, pour moi, il n'a plus rien à vendre.
- **Lettre d'Augure** :
> Clairvoya a prédit à Brindille qu'elle hériterait d'une tour. Esbroufe lui a aussitôt vendu un plan de la Tour. Il y manque un étage, mais il garantit que le document est complet. — A.

### La Grande Foire des Mille Merveilles
- **Contrée** : Sur la route · **carte** : 12×12 · **enquêtes** : 15
- **Pièces** : Chapiteau, Ménagerie, Grande roue, Stand de tir, Piste aux étoiles, Roulottes, Cabinet des curiosités, Labyrinthe, Buvette, Tente de la voyante, Manège (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Esbroufe, Clairvoya, Fausset, Bakchich, Bâfrin, Capucine, Flammèche, Festin, Fricot, Briochon, Farinard, Aëlys
- **Victimes des enquêtes actives** : Théodelinde (la cousine), Rafistol (le colporteur), Clownette (la dresseuse), Componcte (l'abbesse), Tastevin (l'inspecteur des tavernes), Marée (la maîtresse-nageuse), Velours (la baronne)
- **Enquêtes à grands monstres** : Glissandra (forme S4) — victime Mercurio ; Cendrebrune et Caillasse (forme T4, I2, cachée) — victime Grisemotte ; Escabeau (forme O4) — victime Prudence
- **Ouvertures des intros** (selon le nombre d'affaires déjà résolues dans le lieu ; suivies de la mise en situation propre à chaque enquête) :
  - première venue : À la Grande Foire des Mille Merveilles, il y avait un feu d'artifice : tout le monde regardait le ciel, sauf moi, qui regardais le sol.
  - 2e affaire : Retour à la Grande Foire des Mille Merveilles. On a tiré un deuxième feu d'artifice, et retrouvé un deuxième corps.
  - 3e affaire : Troisième mort à la Grande Foire. Un forain vend des longues-vues « pour ne rien manquer du prochain crime ».
  - 4e affaire : Quatrième affaire à la Grande Foire. Je me suis perdu entre deux attractions ; on m'a retrouvé avant le corps, de peu.
  - 5e affaire : Cinquième visite à la Grande Foire. Les forains m'appellent « l'attraction du soir », et ils ont raison : je fais salle comble.
  - 6e affaire : Sixième affaire à la Grande Foire. Le bouquet final a éclaté pile à mon arrivée, et je n'ai pas su si c'était un hommage ou une diversion.
  - dernière : Dernière affaire à la Grande Foire des Mille Merveilles, j'espère. Ce soir, pas de feu d'artifice : tout le monde me regardait, moi.
- **Lettre d'Augure** :
> À la Grande Foire, Fiolius a acheté une malle assez grande pour un grimoire. Ou pour un archimage. Il dit qu'elle servira à déménager du matériel de la Tour vers l'Université. Il n'a demandé l'autorisation à personne. — A.

### Le Palais des Mille Vœux
- **Contrée** : Sur la route · **carte** : 7×7 · **enquêtes** : 11
- **Pièces** : Observatoire, Salle du trône, Trésor, Salle des lampes, Jardins suspendus, Bazar, Hammam (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Dagobert, Clairvoya, Esbroufe, Bakchich, Belladone, Fizzlebarbe, Fumerolle
- **Victimes des enquêtes actives** : Pincebec (la baronne), Traquette (la chasseuse de primes), Pinardon (l'inspecteur des tavernes), Brunehaut (la cousine), Prudence (l'abbesse), Calcinus (l'alchimiste), Nageoire (la maîtresse-nageuse)
- **Enquêtes à grands monstres** : Glissandra (forme I2) — victime Prudence ; Cendrebrune (forme I2) — victime Mercurio ; Glissandra (forme I2) — victime Rapidon ; Cendrebrune (forme I2) — victime Ondine
- **Ouvertures des intros** (selon le nombre d'affaires déjà résolues dans le lieu ; suivies de la mise en situation propre à chaque enquête) :
  - première venue : Au Palais des Mille Vœux, on m'a proposé de tout résoudre d'un claquement de doigts. J'ai lu les petites lignes.
  - 2e affaire : Retour au Palais des Mille Vœux. On m'a reproposé le claquement de doigts ; les petites lignes ont encore rapetissé.
  - 3e affaire : Troisième mort au palais. J'ai fait un vœu en entrant : ne pas en voir un quatrième. Il n'a pas été exaucé.
  - 4e affaire : Quatrième affaire au Palais des Mille Vœux. Les lampes s'allument sur mon passage, et je n'ai rien demandé.
  - 5e affaire : Cinquième visite au palais. Un tapis volant m'a déposé à l'entrée d'office ; je crois qu'on voulait m'éviter de visiter le reste.
  - 6e affaire : Sixième affaire au Palais des Mille Vœux. On m'a offert trois vœux, et j'en ai utilisé un pour avoir un café. J'ai eu une bière.
  - dernière : Dernière affaire au Palais des Mille Vœux, j'espère. Personne ne m'a rien proposé cette fois, et c'est le premier cadeau qu'on me fait ici.
- **Lettre d'Augure** :
> Le Palais des Mille Vœux a proposé d'acheter la Tour pour en faire une lampe géante. Ses émissaires y avaient mesuré une puissance qu'ils ne savaient pas expliquer. Fizzlebarbe a répondu à leur seconde visite par un éclair. — A.

## 8. Le fil rouge : la vérité cachée et les lettres d'Augure
### La vérité fixe (canon)
- **Le Nœud de Brume** : il y a environ 412 ans, Fizzlebarbe a découvert un déséquilibre magique qui menaçait les six contrées et a installé sous sa Tour un dispositif qui aide à les garder en équilibre (chemins, frontières, phénomènes magiques locaux). Ses effets visibles restent limités : brume anormale, repères qui semblent changer, trajets qui ne mènent pas où on l'attend, plans de la Tour incomplets.
- **Le Palier zéro** : un espace caché de la Tour, dans un pli magique, absent des plans publics. Il abrite les archives de création du Nœud et les documents de la charge.
- **La Tour est une charge, pas un bien** : Fizzlebarbe n'en est pas le propriétaire mais le gardien. La garde peut se transmettre ; la Tour ne se vend pas, ne se met pas en gage et ne se lègue pas comme une maison.
- **Le testament n'était qu'un projet** de transmission, confié sous scellé au notaire, jamais finalisé. Les prétendants se battent pour une propriété qu'aucun ne peut posséder.
- **Fizzlebarbe** : compétent, mais très mauvais pour faire confiance. Il a fait surveiller les prétendants par Augure sans jamais leur expliquer ce qu'il cherchait à transmettre, ni demander à Augure ce que lui voulait.
- **Augure** écrit les rapports pour Fizzlebarbe et, dans son dos, en glisse des copies sous la porte de l'enquêteur, quand la dernière affaire du lieu concerné est résolue : il espère qu'un regard extérieur verra ce que son maître refuse de voir. Il n'est pas omniscient. C'est lui qui a repris le projet chez le notaire (d'où la plume noire), de peur qu'un prétendant s'en serve.
- **Le grimoire et la clé** : il y a onze ans, Gribouille a perdu dans la Tour le grimoire emprunté à Dewey. Fizzlebarbe l'a retrouvé et y a caché une clé de service, qui ouvre un premier accès vers le Palier zéro (pas le contrôle du Nœud). Dewey retrouve le livre sans comprendre ce que cache la reliure.
- **Fernand** : apprenti de Fizzlebarbe, il est mort il y a vingt ans pendant une réparation liée aux installations de la Tour, et il est revenu en zombie, sans sa main. Négligence et conflit de travail, pas tentative de meurtre : jamais payé, jamais reconnu, jamais prévenu des risques.
### Chronologie de référence

| Quand | Fait |
| --- | --- |
| Il y a environ 412 ans | Fizzlebarbe installe le Nœud de Brume sous la Tour et en devient le gardien. |
| Il y a environ 20 ans | Fernand meurt pendant une réparation de la Tour et revient en zombie, sans sa main. |
| Il y a environ 11 ans | Gribouille perd le grimoire de Dewey dans la Tour ; Fizzlebarbe y cache une clé de service. |
| Quelques mois avant la fin | Fizzlebarbe envisage enfin de transmettre la garde et fait surveiller les prétendants par Augure. Les rumeurs d'héritage s'emballent. |
| Peu avant la fin | Serrures changées, coffre anti-magie commandé, projet scellé chez le notaire ; Augure reprend le projet et glisse ses copies sous la porte de l'enquêteur. |
| La nuit de l'affaire finale | Fizzlebarbe est tué avant d'avoir transmis la garde ; le coupable est celui que désigne la grille. |
| Après le verdict | Les archives du Palier zéro révèlent le Nœud, la charge et le rôle d'Augure. |
| Après le verdict | L'enquêteur scelle les archives du Palier zéro et garde la clé, à titre provisoire, quel que soit le coupable (Augure compris). |
| Suite prévue | Fizzlebarbe revient en spectre (« quelqu'un a déplacé les meubles de la Tour ») et reprend la garde à sa façon. |

Les enquêtes ordinaires se jouent dans n'importe quel ordre : c'est la chronologie du monde, pas un ordre imposé au joueur.
### Les lettres
Quand la dernière enquête d'un lieu est résolue (5 à 7 par lieu), l'enquêteur trouve **une lettre glissée sous sa porte**, signée « — A. ». Il y a **une lettre par lieu** (23 en tout), reçue quand le joueur ouvre l'enveloppe (c'est elle qui ouvre alors les lieux suivants). Elles se lisent dans **n'importe quel ordre**, chacune se comprend seule, aucune ne révèle la solution de l'enquête qui la donne (elle n'apparaît qu'après la victoire). Ce sont des rapports d'Augure sur les prétendants : ragots, caractère, et des indices qui se répondent (la clé et le grimoire, l'étage manquant des plans, la brume du port, la puissance mesurée par le Palais), qu'on relit autrement après la fin.

| Lieu | Lettre |
| --- | --- |
| Le Château de Mortebrune | Bakchich a mis la Tour de l'Archimage en garantie d'un prêt. Le prêteur n'a jamais vu le moindre titre de propriété. Bakchich appelle ça une formalité. |
| La Citadelle de Mortebrune | Blafard m'a montré ses titres de propriété. Le papier est authentique, et plus vieux que la baronnie. Le droit qu'il prétend en tirer l'est beaucoup moins. |
| Le Bal Masqué | Au bal masqué, Fumerolle a promis la Tour à trois invités. Quand on lui a fait remarquer qu'ils ne pouvaient pas tous en hériter, elle a répondu qu'un vœu bien formulé ne se contredit jamais, et en a formulé un quatrième. |
| Le Cimetière de Minuit | Glas a déjà creusé une tombe au nom de Fizzlebarbe. L'archimage lui aurait demandé de « prévoir toutes les éventualités ». Je lui ai demandé s'il avait aussi prévu de vérifier que le vieux était mort. Il a pris des notes. |
| La Tour de l'Archimage | Fizzlebarbe a changé trois fois de serrure ce mois-ci. Il prétend que quelqu'un fouille son bureau. Curieusement, il ne m'a pas demandé de trouver le voleur, mais de dresser la liste de tous ceux qui ont essayé. |
| Le Port des Contrebandiers | Fiolius a fait livrer douze bocaux vides à son nom, avec la mention « échantillons de la Tour ». Il affirme qu'ils sont indispensables à une étude. Il ne m'a pas dit ce qu'il compte mettre dedans. |
| Le Grand Port de Brumeval | Le notaire avait reçu un projet de testament sous enveloppe scellée. Le lendemain, l'enveloppe avait disparu. Sur le bureau, une plume noire. Le notaire jure avoir entendu un battement d'ailes ; il jure aussi qu'il dormait. |
| Le Navire Fantôme | Frégaton jure avoir vu Fizzlebarbe embarquer pour « un voyage sans retour ». Le navire n'a pas quitté le quai. Ce soir-là, pourtant, le brouillard venait du mauvais côté du port. Frégaton refuse ce détail : il gâche son histoire. |
| Les Thermes Enchantés | Aux Thermes, Fumerolle a dit : « Le vieux veut léguer la Tour à celui qui le mérite. Personne ne le mérite. » Puis elle m'a demandé si un vœu pouvait modifier un titre de propriété. Elle préfère les génies aux notaires. |
| Les Grands Bains de Brumeval | Aux Grands Bains, Fizzlebarbe a confié à son masseur qu'il « changerait tout » après sa cure : il ne voulait peut-être plus transmettre un bâtiment, mais une tâche. Le reste s'est perdu dans les huiles. |
| Meurtre au Sanglier Borgne | Gribouille doit quarante écus au Sanglier Borgne. Il promet de tout rembourser « dès que la Tour sera à lui ». Il promet aussi depuis onze ans de rendre le grimoire de Dewey. Les deux promesses ont le même calendrier. |
| Le Moulin de Bois-Tordu | Fernand a fait refaire une clé de la Tour. Il dit en avoir eu une avant l'accident, celui qui l'a tué. Quand je lui ai demandé ce qu'elle ouvrait, il a frotté son moignon et changé de sujet. |
| La Ferme Hantée | Briochon raconte que le testament existe, qu'il est caché, et qu'il n'en dira pas plus. Il a seulement entendu parler d'un document préparatoire. Le reste, il l'a brodé avec beaucoup de conviction. |
| Le Marais des Brumes | Ciguë vend une potion qui révèle certaines encres invisibles. Dewey en a acheté trois, « pour retrouver un livre ». Je ne sais pas ce qui l'inquiète le plus : l'encre, le livre ou le reçu. |
| La Mine des Nains | Granit a reçu commande d'un coffre à l'épreuve de la magie, à livrer dans la Tour. Le client a payé d'avance et demandé qu'on ne grave aucun nom. Granit a quand même chronométré la livraison. |
| La Forge du Dragon | Fizzlebarbe a fait forger une clé unique. Le forgeron l'a vu la glisser entre les pages d'un grimoire qui n'aurait jamais dû se trouver dans la Tour. Ici, les secrets s'empilent mieux que les livres. |
| Le Banquet des Gobelins | Au Banquet des Gobelins, Bakchich a porté un toast « au futur propriétaire de la Tour », en levant son verre vers lui-même. Puis il a demandé si les gobelins prêtaient sans garantie. Personne n'a eu le cœur de répondre. |
| L'Académie de Magie | Brindille s'entraîne en secret au sort qui ouvre les serrures magiques. Trois portes de l'Académie ont déjà explosé. La quatrième s'est déplacée de deux pas vers la gauche. Le directeur appelle cela un progrès. |
| L'Université des Sortilèges | Fiolius a écrit « Annexe de l'Université » sur les plans de la Tour, à l'encre sympathique. Elle se voit très bien. Sur une coupe, deux escaliers mènent au même palier, mais aucun plan ne montre ce qui les relie. |
| La Bibliothèque Interdite | Dewey a enfin retrouvé le grimoire emprunté par Gribouille, au fond de la Tour. Sous la reliure, une petite fente a été refermée avec soin. Dewey hésite à la cataloguer comme réparation, fraude ou insulte. |
| La Foire aux Sortilèges | Clairvoya a prédit à Brindille qu'elle hériterait d'une tour. Esbroufe lui a aussitôt vendu un plan de la Tour. Il y manque un étage, mais il garantit que le document est complet. |
| La Grande Foire des Mille Merveilles | À la Grande Foire, Fiolius a acheté une malle assez grande pour un grimoire. Ou pour un archimage. Il dit qu'elle servira à déménager du matériel de la Tour vers l'Université. Il n'a demandé l'autorisation à personne. |
| Le Palais des Mille Vœux | Le Palais des Mille Vœux a proposé d'acheter la Tour pour en faire une lampe géante. Ses émissaires y avaient mesuré une puissance qu'ils ne savaient pas expliquer. Fizzlebarbe a répondu à leur seconde visite par un éclair. |

**Débloquer la fin** : avec **les 23 lettres** (toutes : décision de François, 2026-10-19), l'affaire finale s'ouvre. La fin est donc vraiment la fin : Fizzlebarbe ne peut plus réapparaître vivant dans une enquête jouée après sa mort.

## 9. L'affaire finale : le testament de Fizzlebarbe
**La Tour de l'Archimage — Le testament de Fizzlebarbe** (c'est ainsi que la baronnie appelle l'affaire) : carte 10×10, la Tour de l'Archimage, la nuit où Fizzlebarbe devait régler sa succession.
- **Pièces** : Observatoire, Laboratoire, Bibliothèque, Chambre de Fizzlebarbe, Réserve des potions, Salle du testament, Grand escalier, Jardin suspendu, Crypte
- **Victime** : Fizzlebarbe (seule victime de la troupe : la mort d'un récurrent, prévue comme un événement)
- **Suspects, les neuf prétendants** : Bakchich, Fernand, Fiolius, Brindille, Blafard, Dewey, Gribouille, Fumerolle, Augure
- **Vérité fixe / vérité variable** : le meurtrier est celui que désigne la grille (n'importe lequel des neuf) ; son épilogue donne son mobile. Tout le reste (le Nœud, le Palier zéro, le projet de transmission, le rôle d'Augure) est vrai quel que soit le coupable.
- **Introduction** :
> Toutes les lettres sont là, et toutes menaient ici. Fizzlebarbe, 412 ans, a été retrouvé mort dans sa Tour, la nuit où il devait enfin régler sa succession. Le projet de testament a disparu. Ses neuf héritiers présumés étaient tous là, et un seul était avec lui. Sur la rambarde, le corbeau me regarde comme s'il savait déjà quelque chose. Pour une fois, je lui poserai la question après avoir résolu l'affaire.
- **Épilogues** : chaque prétendant a le sien, quatre répliques, propre à son mobile (des croyances fausses sur la Tour, pour la plupart).

**Si le coupable est Bakchich** :
> — Vous étiez seul avec Fizzlebarbe.  
> — Il allait régler sa succession. Et la Tour était déjà en gage chez les gobelins.  
> — Donc ?  
> — Donc, techniquement, il valait mieux qu'il ne règle rien. C'est légal. Presque.

**Si le coupable est Fernand** :
> — Vous étiez seul avec lui.  
> — Vingt ans de salaire, il me devait. Il m'a tendu une pièce. Une seule.  
> — Et ?  
> — Je me suis énervé. Mon bras gauche s'est décroché, celui qui avait encore sa main. Elle tenait un chandelier.

**Si le coupable est Fiolius** :
> — Vous étiez seul avec lui.  
> — (Il renifle.) Il sentait la fin.  
> — Vous l'avez aidé ?  
> — Je l'ai noté. Zéro. Il a mal pris la note.

**Si le coupable est Brindille** :
> — Vous étiez seule avec lui.  
> — Je voulais juste ouvrir son coffre. Avec la permission. Presque.  
> — Et ?  
> — C'est normal que la Tour fume encore ?

**Si le coupable est Blafard** :
> — Vous étiez seul avec lui.  
> — De mon vivant, cette Tour était à moi.  
> — Et maintenant ?  
> — Maintenant, nous voilà deux fantômes à nous la disputer. Ça promet.

**Si le coupable est Dewey** :
> — Vous étiez seule avec lui.  
> — Il avait caché quelque chose dans un livre de MA bibliothèque.  
> — Ce n'est pas un mobile.  
> — CHUT. C'en est un.

**Si le coupable est Gribouille** :
> — Vous étiez seul avec lui.  
> — Il voulait me déshériter pour un grimoire pas rendu.  
> — Onze ans de retard.  
> — Atchoum. Le sort est parti tout seul. Encore.

**Si le coupable est Fumerolle** :
> — Vous étiez seule avec lui.  
> — Il a fait un dernier vœu : « Que personne ne touche à ma Tour de mon vivant. »  
> — Et ?  
> — J'ai exaucé. Il n'est plus vivant, et personne n'y touche.

**Si le coupable est Augure** :
> — Vous étiez seul avec lui.  
> — (Billet : « Des mois à espionner tout le monde pour lui. Pas un merci. »)  
> — Et ?  
> — (Billet : « Il voulait que je continue. Pour l'éternité, sans doute. J'ai donné ma démission. »)

### La révélation commune
Après l'épilogue, quel que soit le coupable, la scène du verdict propose « 📜 Dans les archives du Palier zéro… » : la lettre de Fizzlebarbe, puis le billet d'Augure. Le verdict, dans la colonne, permet de la relire.
**La lettre de Fizzlebarbe**
> Si vous lisez ceci, c'est que je n'ai pas terminé ce que j'avais commencé. La Tour n'est pas un héritage : c'est une charge. Sous ses fondations se trouve le Nœud de Brume, qui aide à garder les six contrées en équilibre. Je l'ai gardé pendant quatre siècles, et j'avais fini par croire que personne ne pourrait me remplacer.  
>   
> J'ai demandé à mon corbeau de surveiller les prétendants. Il m'a rapporté leurs ambitions, leurs mensonges et leurs petites combines. Je pensais trouver la vérité dans leurs actes ; j'ai oublié de regarder les miens.  
>   
> Le document que vous cherchiez n'était qu'un projet. Ce que je voulais transmettre, c'était la garde, pas la propriété. J'ai cherché quelqu'un qui ne convoite pas la Tour. Il était sous mes yeux, mais j'étais trop occupé à le faire écrire pour le remarquer.
> **Fizzlebarbe**
**Le billet d'Augure**
> Les copies sous votre porte, c'était moi. Il ne me l'avait pas demandé. Vous, au moins, vous lisez jusqu'au bout. — A.
*J'ai scellé les archives du Palier zéro et gardé la clé. À titre provisoire, en attendant qu'un vrai gardien se présente. Je n'ai rien demandé.
Cette nuit-là, quelqu'un a déplacé les meubles de la Tour. Personne d'autre n'avait la clé.*
**Ce que ça règle** : la Tour était une charge, le testament un projet, la garde reste à transmettre. Augure, qui ne convoitait pas la Tour, veille sur les archives sans en être propriétaire. Fizzlebarbe reviendra en spectre, furieux que sa succession ne soit pas terminée ; Blafard l'accueillera dans la confrérie des défunts mécontents.

## 10. Gags récurrents
Des petites histoires qui courent d'une enquête à l'autre, sans jamais compter pour la solution :
- **Le registre de Aagrid** : la dette de Capucine grossit. Dans le carnet, sa fiche affiche « Dette au Sanglier Borgne : N tournées » (3 de départ, plus 3 par enquête résolue où l'on a croisé Capucine).
- **Le navire qui ne part pas** : dans chaque enquête du port, Frégaton annonce qu'il lève l'ancre demain. Sa fiche tient le compte : « Départs annoncés : N. Départs effectués : 0. »
- **Festin et le mardi** : végétarien « depuis mardi », quel que soit le jour (affiché sur sa fiche).
- **« De mon temps » contre « de mon vivant »** : Fizzlebarbe et Blafard se disputent le titre du plus vieux de la baronnie.
- **Le grimoire de Gribouille** : Dewey le cherche partout (une lettre le retrouve dans la Tour).
- **L'armure de Gontran** : elle rétrécit encore (ou c'est lui qui grossit, mais personne ne le lui dit).
- **Le bisou d'Ambroise** : il réclame un bisou à chaque personnage féminin pour redevenir prince ; toutes refusent. Seule Ciguë accepte de s'occuper de lui, mais pour le cuisiner.
- **Écho-Écho** : il répète tout, dans le désordre, ce qui en fait un témoin très embarrassant.

## 11. Le lore dans le jeu : comment tout s'articule
### Le parcours du joueur
1. **Accueil** : l'affiche, le titre, le sceau « Jouer ».
2. **Le prologue** (première partie seulement), puis **le bureau de l'enquêteur** : la carte de Brumeval épinglée au centre, déjà en grand. Les lieux ouverts ont une pastille (« ! » tant qu'on ne les a pas visités, ✓ quand toutes leurs enquêtes sont résolues ; au survol : nom et progression) ; les autres sont des « ? ». Aucun texte : dans les coins, les objets cliquables (**dossiers classés**, **lettres anonymes** avec un cachet rouge qui bat tant qu'une lettre n'est pas lue, **carnet d'enquête**), et un peu de décor (loupe, encrier, bougie). Plus de classement par taille.
3. **Le déblocage** : au départ, seul **Le Château de Mortebrune** est ouvert. Chaque lieu compte 5 à 7 enquêtes actives (`lore/actives.json`) ; la dernière résolue apporte la lettre du lieu et ouvre les lieux suivants (un nouveau clou sur la carte, relié par le fil rouge) :

- Le Château de Mortebrune → Le Banquet des Gobelins, Meurtre au Sanglier Borgne
- Meurtre au Sanglier Borgne → Le Moulin de Bois-Tordu, La Bibliothèque Interdite
- Le Banquet des Gobelins → La Mine des Nains
- Le Moulin de Bois-Tordu → La Ferme Hantée, Le Marais des Brumes
- La Mine des Nains → La Forge du Dragon
- La Bibliothèque Interdite → L'Académie de Magie
- La Ferme Hantée → La Foire aux Sortilèges
- Le Marais des Brumes → Le Cimetière de Minuit
- La Forge du Dragon → La Citadelle de Mortebrune
- L'Académie de Magie → L'Université des Sortilèges
- Le Cimetière de Minuit → Le Bal Masqué
- La Citadelle de Mortebrune → La Tour de l'Archimage
- La Foire aux Sortilèges → Le Port des Contrebandiers
- Le Bal Masqué → Les Thermes Enchantés, Le Palais des Mille Vœux
- L'Université des Sortilèges → La Grande Foire des Mille Merveilles
- Le Port des Contrebandiers → Le Grand Port de Brumeval, Le Navire Fantôme
- Le Grand Port de Brumeval → Les Grands Bains de Brumeval

4. **Page d'un lieu** : sa lettre (ou « Encore N enquêtes ici, et une lettre sur ce lieu glissera sous ta porte ») et ses enquêtes. Le bouton ‹ d'une enquête ramène au lieu, ou aux dossiers si on l'a ouverte de là. « Enquête suivante » propose la prochaine enquête non résolue du même lieu.
5. **L'enquête** : à la première ouverture, une **scène au centre de l'écran** montre l'illustration du décor, le titre et l'introduction de l'enquêteur (« À l'enquête »). Le titre en haut la rouvre à tout moment.
6. **La victoire** : le tampon « Affaire résolue », puis une **scène centrée** : le portrait du coupable, « Seul suspect dans la pièce de <victime>. » et l'épilogue dialogué. Si l'enquête apporte une lettre : « 📜 Une lettre a été glissée sous la porte… » ouvre **la lettre en grand** (cachet de cire « A », lieu, texte, « — A. »), annonce les lieux qui s'ouvrent sur la carte et la progression, avec « Plus tard » ou « 🗺️ Retour au bureau ».
7. **Lettres, dossiers, carnet** : les lettres reçues (les nouvelles marquées, lues dès qu'on ouvre le courrier) ; les dossiers en cours et classés ; le carnet avec les **fiches de la troupe croisée** (portrait, nom, trait, tic, gags qui se voient) et « 📜 Revoir le prologue ».
8. **L'affaire finale** : à 23 lettres, **une enveloppe scellée** apparaît sur le bureau (absente avant). Elle n'est dans aucun lieu.
### Les règles du jeu liées au lore (écran des règles)
- La victime est un invité de passage ; les suspects sont les habitués, qu'on retrouve d'une enquête à l'autre.
- Chacun porte une pastille avec l'initiale de son nom (deux lettres si deux noms commencent pareil) ; les fiches vont de la plus facile à placer à la plus difficile.
- Le bureau : au début seul le château est ouvert, chaque affaire résolue ouvre de nouveaux lieux.
- Lettres anonymes : la dernière enquête résolue dans chaque lieu (5 à 7 par lieu) donne une lettre, rangée sur le bureau ; assez de lettres, et il se passera quelque chose.
- Seule la pièce du crime contient deux personnes, et chaque pièce est occupée.
### Progression
- Les lettres trouvées sont gardées dans le navigateur (`grimdoku:lettres`), les lettres lues aussi (`grimdoku:lettres-lues`).
- Les lettres ne sont pas rétroactives : l'arrivée du lore remet la progression à zéro (les enquêtes ont de nouveaux identifiants).
- Chaque enquête garde sa partie en cours et son état résolu ; l'introduction ne s'ouvre d'elle-même qu'une fois (`grimdoku:seen:<id>`).

## 12. Règles de cohérence
- **Les lettres restent anonymes jusqu'à la révélation** : dans le jeu, elles s'appellent « lettres anonymes », signées « — A. » ; le nom d'Augure n'apparaît comme leur auteur qu'après la victoire de l'affaire finale (billet d'Augure). Le soupçon est permis (un corbeau qui écrit au lieu de parler, une plume noire chez le notaire, un corbeau à la fenêtre dans le prologue), la confirmation non. Ce document, lui, les appelle « lettres d'Augure » : il dévoile tout.
- **La troupe ne meurt pas** : la victime est un invité. Un récurrent ne meurt que rarement, comme un événement (Fizzlebarbe), et revient alors en spectre.
- **Pas de chronologie imposée** entre les enquêtes, sauf l'affaire finale, qui vient après les lettres.
- **Les textes ne dépendent jamais de la position** d'un personnage (sauf l'épilogue, écrit une fois la solution connue). Les introductions ne nomment aucun suspect de façon trompeuse : un habitué cité (le roi, le meunier…) peut être présent ou non.
- **Les indices sont générés**, jamais écrits en personnage.
- **Rien ne doit trahir une solution** avant la victoire ; ce document ne contient aucune solution.
- **Ton** : Kaamelott, courts, un tic par personnage, l'enquêteur poli et épuisé.

## 13. Où vivent les données (pour modifier le lore)
| Quoi | Fichier |
| --- | --- |
| Personnages (nom, trait, tic, épilogue), invités (motif, menace) | `cast.json` |
| Lieux : plan, pièces, habitués, introduction (`auto.intro`) | `scenes/<lieu>.json` |
| Lettres d'Augure, nombre de lettres pour la fin (`need`) | `lore/lettres.json` |
| Carte : contrées, position des pastilles, illustration retenue | `lore/carte.json`, `assets/map/` |
| Affaire finale : plan, introduction, épilogues, révélation commune (`revelation`) | `scenes/testament.json` |
| Prologue (quatre scènes de la première partie) | `lore/prologue.json` |
| Canon de référence, plan d'application | `lore/GRIMDOKU_MATRICE_CONTINUITE.md`, `lore/PLAN_MIGRATION_CANON.md` |
| Enquêtes à grands monstres (formes, victimes) | `big-cases.json` |
| Conseils de l'enquêteur, scènes, carnet, carte | `app/template.html` |
| La bible de travail (document partagé) | https://claude.ai/code/artifact/b1eaad27-d50f-4faf-8b14-30a2ef2e9e65 |
Ce fichier se régénère depuis ces données (`node tools/lore-md.js`) : une modification de `cast.json` ou des décors s'y retrouve à la génération suivante.
