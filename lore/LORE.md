# Grimdoku — le lore complet
*Document généré à partir des données du jeu le 2026-10-18 (`lore/LORE.md`). Il contient tout le lore : le monde, chaque personnage et toutes ses répliques, les invités, les lieux, les lettres d'Augure, l'affaire finale et sa révélation, et la façon dont tout cela s'articule avec le jeu. Il ne contient aucune solution d'énigme.*
**Attention : ce document dévoile la fin du fil rouge (qui écrit les lettres, et pourquoi).**

## Sommaire
1. Intentions et ton
2. Le monde : la baronnie de Brumeval
3. L'enquêteur
4. La troupe récurrente (38 personnages)
5. Les liens entre personnages
6. Les invités de passage (les victimes)
7. Les lieux, un par un
8. Le fil rouge : les lettres d'Augure
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
Dans le jeu, la **carte de Brumeval** (illustration `assets/map/brumeval2`) montre chaque lieu avec une pastille numérotée.

## 3. L'enquêteur
L'enquêteur est la seule personne compétente de la baronnie, et ça l'épuise. **Il reste une voix : on ne le voit jamais.** Son nom et son origine sont volontairement laissés ouverts. Sa voix est sèche, polie, au bord de la crise de nerfs : il ne crie jamais, il soupire, puis reformule pour les plus lents.
On l'entend à trois endroits :
1. **L'introduction de chaque enquête** (ce qu'on lui a raconté en arrivant, à la première personne). Voir la section 7 pour toutes les introductions.
2. **Les conseils du bouton 💡 Indice** : ce qu'il marmonne en relisant ses notes. Un conseil par technique de déduction :

| Technique | Ce qu'il marmonne |
| --- | --- |
| indice | Relisons la fiche de <personnage>. Ses indices ne laissent qu'une case. Bon. |
| case unique | <personnage>… On retire les lignes et les colonnes déjà prises : il ne reste qu'une case. Évidemment. |
| ligne réservée | Quelqu'un n'a plus qu'une ligne possible, ou qu'une colonne : elle est à lui, les autres n'ont rien à y faire. Ça suffit pour placer <personnage>. |
| position relative | Nord, sud, est, ouest. Les positions relatives coincent <personnage>. Ce n'est pas sorcier. Enfin, pas ici. |
| seul candidat | Une ligne, ou une colonne, où un seul personnage peut encore aller. C'est <personnage>. Il fallait la voir. |
| pièces | La règle des pièces : un suspect par pièce, la victime avec un seul, et pas une pièce vide. Ça place <personnage>. |
| groupes | Quelques-uns se partagent exactement autant de lignes qu'ils sont. Personne d'autre n'y entre. Ça place <personnage>. |

   Si un personnage confirmé est mal placé, le bouton le signale d'abord : « Quelque chose cloche : <personnage> n'est pas à sa place. »
3. **Le verdict** : c'est lui qui ouvre chaque épilogue (« Vous étiez seul avec… ») et donne la réplique au coupable.

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

### Grippesou — Tavernier nain
- **Type** : `tavernier` · masculin
- **Trait** : Tavernier nain, radin légendaire
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
> — J'ai perdu un bras. {Il} l'a reçu sur la tête.

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
- **Trait** : Archimage, 412 ans, toujours pas de testament
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
- **Trait** : Corbeau, écrit des lettres anonymes
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
| Grippesou et Capucine | Trois tournées impayées, devenues trois cents avec les intérêts | Le tavernier tient un registre des dettes de toute la baronnie |
| Grippesou et Bâfrin | Patron et plongeur, payé en restes | Bâfrin casse une assiette par jour, Grippesou la retient sur sa paie |
| Dagobert et Bakchich | Le roi et son trésorier ; le trésor est vide, personne ne sait pourquoi | Toute enquête au château finit par une question d'argent |
| Dagobert et Blafard | Blafard était châtelain avant Dagobert et n'a jamais rendu les clés | Querelle de propriété vieille de quatre siècles |
| Gontran et Flammèche | Le chevalier l'a adopté « pour le dresser » | C'est surtout l'armure de Gontran qui fond |
| Fausset et Goémone | Il lui écrit des chansons ; elle chante juste | Amour sans espoir, donc inépuisable |
| Aëlys et Fricot | La critique a donné deux sur dix au Banquet des Gobelins | Fricot rêve de la faire goûter à sa marmite |
| Fizzlebarbe et Fiolius | L'Académie contre l'Université ; chacun dit que l'autre a copié sa thèse | Les deux écoles se sabotent leurs examens |
| Fizzlebarbe et Fernand | Fernand était son apprenti avant « l'accident » | Fernand attend toujours son diplôme, et vingt ans de salaire |
| Fizzlebarbe et tout le monde | 412 ans et pas de testament | Chacun espère hériter de la Tour (le fil rouge) |
| Ciguë et Ambroise | C'est elle qui l'a changé en crapaud ; il refuse de dire pourquoi | Ambroise cherche un bisou, Ciguë cherche une recette |
| Dewey et Gribouille | Gribouille a emprunté un grimoire il y a onze ans | Dewey le cherche dans toute la baronnie, en criant |
| Esbroufe et Clairvoya | Associés à la foire : lui vend les élixirs, elle prédit qu'ils marchent | Leurs clients reviennent rarement contents |
| Frégaton et Bâbord | Le capitaine qui ne part jamais, le pirate qui se perd toujours | Ils se disputent le même navire depuis vingt ans |
| Augure et tous | Le corbeau sait tout et l'écrit | Chacun le soupçonne, personne ne l'attrape — et pour cause (section 9) |

## 6. Les invités de passage (les victimes)
La victime est **toujours un invité de passage**, un personnage d'un jour venu de l'extérieur, souvent pour embêter quelqu'un. La troupe reste ainsi vivante d'une enquête à l'autre. Seule exception : l'affaire finale, où meurt Fizzlebarbe (section 9).
Chaque invité a un **motif** (pourquoi il est venu, cité dans l'introduction : « venu{e} … ») et une **menace** (ce qu'il venait faire au coupable, citée dans l'épilogue). Sa carte de victime affiche sa description, puis « La victime. Elle était seule avec son meurtrier. »

| Invité | Nom | Description | Motif (« venu… ») | Menace (dans l'épilogue) |
| --- | --- | --- | --- | --- |
| le percepteur (`percepteur`) | Taxard (m) | Percepteur du baron, compte même les miettes | lever l'impôt de fin d'année | me faire payer l'impôt sur tout ce que je possède |
| la cousine (`cousine`) | Ermengarde (f) | Cousine éloignée de tout le monde, venue pour l'héritage | réclamer un héritage | réclamer sa part de ce qui m'appartient |
| l'inspecteur des tavernes (`inspecteur`) | Pinardon (m) | Inspecteur des tavernes, goûte tout, note tout | inspecter les lieux | me coller un blâme |
| le touriste (`touriste`) | Gustave (m) | Touriste, dessine tout au fusain, surtout ce qui est interdit | visiter la baronnie | faire mon portrait au fusain et le vendre à la foire |
| l'huissier (`huissier`) | Saisitout (m) | Huissier de la banque gobeline, saisit d'abord, demande ensuite | saisir des biens | saisir mes affaires |
| la maîtresse-nageuse (`nageuse`) | Ondine (f) | Maîtresse-nageuse, sans permis ni maillot | donner des cours de natation | m'apprendre à nager de force |
| le colporteur (`colporteur`) | Bricabrac (m) | Colporteur, vend des objets dont personne ne veut | vendre sa camelote | me revendre ce qu'il m'avait déjà vendu |
| l'abbesse (`abbesse`) | Prudence (f) | Abbesse, quête pour un couvent introuvable | faire la quête | me faire la morale |
| le troubadour (`troubadour`) | Lirelire (m) | Troubadour itinérant, chante juste, et ça agace | donner un concert | chanter mieux que tout le monde |
| la chasseuse de primes (`chasseuse`) | Vipérine (f) | Chasseuse de primes, a toujours un avis de recherche sur elle | toucher une prime | me livrer au baron contre trois écus |
| l'alchimiste (`alchimiste`) | Mercurio (m) | Alchimiste ambulant, transforme l'or en dettes | proposer ses services | changer mes économies en plomb |
| la baronne de Grisemotte (`baronne`) | Grisemotte (f) | Baronne voisine, jalouse de tout ce qui brille | rendre une visite de courtoisie | racheter la baronnie et me mettre dehors |
| la dresseuse (`dresseuse`) | Gertrude (f) | Dresseuse de dragons, surtout des petits | recruter des bêtes pour son cirque | m'emmener dans son cirque |
| le messager (`messager`) | Rapidon (m) | Messager du baron, porte toujours de mauvaises nouvelles | apporter une lettre du baron | m'annoncer une mauvaise nouvelle |

Dans chaque lieu, les invités sont tous différents d'une enquête à l'autre ; le titre d'une enquête est « <lieu> — l'affaire <invité> ».

## 7. Les lieux, un par un
Pour chaque lieu : sa taille de carte, ses pièces, ses habitués (les suspects possibles : dans chaque enquête, l'un d'eux est absent et un invité est la victime), ses invités, son introduction (voix de l'enquêteur) et sa lettre d'Augure.
Gabarits des introductions : `{Titre}`/`{titre}` = titre de l'invité (« le percepteur »), `{victime}` = son nom, `{motif}` = son motif, `{e}`/`{lui}` = accords, `{Nombre}` = nombre de suspects en toutes lettres.

### Le Château de Mortebrune
- **Contrée** : Mortebrune, le chef-lieu · **carte** : 7×7 · **enquêtes** : 13
- **Pièces** : Chapelle, Grande salle, Cuisines, Armurerie, Tour, Jardin, Donjon (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Gontran, Bakchich, Fausset, Aëlys, Blafard, Flammèche, Dagobert
- **Invités** (enquêtes normales) : Prudence (l'abbesse), Mercurio (l'alchimiste), Grisemotte (la baronne de Grisemotte), Vipérine (la chasseuse de primes), Bricabrac (le colporteur), Ermengarde (la cousine), Gertrude (la dresseuse)
- **Enquêtes à grands monstres** : Cendrebrune (forme I2) — victime Saisitout ; Caillasse (forme I2) — victime Pinardon ; Cendrebrune (forme I2) — victime Rapidon ; Cendrebrune (forme I2) — victime Ondine ; Caillasse (forme I2) — victime Taxard ; Cendrebrune (forme I2) — victime Gustave
- **Introduction** :
> {Titre} {victime} était venu{e} au Château de Mortebrune {motif}. Le roi m'a fait appeler, ce qui veut dire que c'est grave, ou qu'il s'ennuie. {Nombre} membres de la cour étaient au château cette nuit-là. L'un d'eux était seul avec {lui}.
- **Lettre d'Augure** :
> Bakchich a mis la Tour de l'Archimage en gage à la banque gobeline. Elle ne lui appartient pas. Détail, selon lui. — A.

### La Citadelle de Mortebrune
- **Contrée** : Mortebrune, le chef-lieu · **carte** : 9×9 · **enquêtes** : 12 · illustration reprise de « chateau »
- **Pièces** : Remparts, Cour d'honneur, Tour de guet, Armurerie, Jardin, Écuries, Oubliettes, Salle du trône (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Gontran, Bakchich, Fausset, Aëlys, Blafard, Flammèche, Dagobert, Ciguë, Festin
- **Invités** (enquêtes normales) : Lirelire (le troubadour), Prudence (l'abbesse), Mercurio (l'alchimiste), Grisemotte (la baronne de Grisemotte), Vipérine (la chasseuse de primes), Bricabrac (le colporteur), Ermengarde (la cousine), Gertrude (la dresseuse), Saisitout (l'huissier)
- **Enquêtes à grands monstres** : Cendrebrune (forme L3) — victime Pinardon ; Caillasse (forme L3, cachée) — victime Rapidon ; Escabeau (forme I2) — victime Ondine
- **Introduction** :
> Le pont-levis est resté coincé toute la nuit, et {titre} {victime}, venu{e} {motif}, est resté{e} coincé{e} avec. Pour toujours. {Nombre} occupants de la Citadelle ne pouvaient pas sortir. L'un d'eux était seul avec {lui}. Au moins, personne n'a pu s'enfuir.
- **Lettre d'Augure** :
> Blafard affirme que la Tour faisait partie de son domaine, il y a quatre siècles. Il a gardé les titres de propriété. Ils sont un peu transparents. — A.

### Le Bal Masqué
- **Contrée** : Mortebrune, le chef-lieu · **carte** : 8×8 · **enquêtes** : 12
- **Pièces** : Balcon, Salle de bal, Escalier d'honneur, Vestiaire, Buffet, Salon des miroirs, Jardin d'hiver, Boudoir (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Blafard, Dagobert, Gontran, Aëlys, Fausset, Capucine, Fumerolle, Belladone
- **Invités** (enquêtes normales) : Prudence (l'abbesse), Mercurio (l'alchimiste), Grisemotte (la baronne de Grisemotte), Vipérine (la chasseuse de primes), Bricabrac (le colporteur), Ermengarde (la cousine), Gertrude (la dresseuse), Saisitout (l'huissier)
- **Enquêtes à grands monstres** : Glissandra (forme I2) — victime Pinardon ; Escabeau et Glissandra (forme I2, I2) — victime Rapidon ; Glissandra (forme I2) — victime Ondine ; Escabeau et Glissandra (forme I2, I2) — victime Taxard
- **Introduction** :
> Bal masqué au château : {titre} {victime}, venu{e} {motif}, n'a pas passé minuit. {Nombre} invités dansaient, ou le prétendent. L'un d'eux était seul avec {lui}. Le plus dur, ici, c'est de savoir qui est sous quel masque. Et qui ment dessous.
- **Lettre d'Augure** :
> Au bal masqué, Fumerolle a promis à trois invités différents qu'ils hériteraient de la Tour. Elle exauce, paraît-il. — A.

### Le Cimetière de Minuit
- **Contrée** : Mortebrune, le chef-lieu · **carte** : 8×8 · **enquêtes** : 12
- **Pièces** : Maison du gardien, Chapelle, Allée des ifs, Caveau, Carré des pauvres, Jardin du souvenir, Ossuaire, Crypte (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Glas, Blafard, Fernand, Belladone, Ciguë, Augure, Gontran, Ambroise
- **Invités** (enquêtes normales) : Gertrude (la dresseuse), Saisitout (l'huissier), Pinardon (l'inspecteur des tavernes), Rapidon (le messager), Ondine (la maîtresse-nageuse), Taxard (le percepteur), Gustave (le touriste), Lirelire (le troubadour)
- **Enquêtes à grands monstres** : Escabeau (forme I2) — victime Prudence ; Caillasse (forme I2) — victime Mercurio ; Escabeau (forme I2) — victime Grisemotte ; Caillasse (forme I2) — victime Vipérine
- **Introduction** :
> Au Cimetière de Minuit, on a retrouvé {titre} {victime}, venu{e} {motif}. Pour une fois, le fossoyeur n'a pas eu à se déplacer. {Nombre} habitués du lieu rôdaient entre les tombes. L'un d'eux était seul avec {lui}. Les autres jurent qu'ils étaient déjà morts, ce qui n'aide pas.
- **Lettre d'Augure** :
> Glas a déjà creusé une tombe au nom de Fizzlebarbe. « Pour gagner du temps », dit-il. — A.

### La Tour de l'Archimage
- **Contrée** : Mortebrune, le chef-lieu · **carte** : 7×7 · **enquêtes** : 11
- **Pièces** : Laboratoire, Observatoire, Bibliothèque, Hall, Crypte, Jardin, Escalier (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Blafard, Flammèche, Fernand, Goémone, Belladone, Fumerolle, Fizzlebarbe
- **Invités** (enquêtes normales) : Lirelire (le troubadour), Prudence (l'abbesse), Mercurio (l'alchimiste), Grisemotte (la baronne de Grisemotte), Vipérine (la chasseuse de primes), Bricabrac (le colporteur), Ermengarde (la cousine)
- **Enquêtes à grands monstres** : Glissandra (forme I2) — victime Gertrude ; Caillasse (forme I2) — victime Saisitout ; Glissandra (forme I2) — victime Pinardon ; Caillasse (forme I2) — victime Rapidon
- **Introduction** :
> {Titre} {victime} était monté{e} à la Tour de l'Archimage {motif}. On l'a retrouvé{e} au pied d'une étagère de grimoires, sans vie. {Nombre} habitants de la tour prétendent n'avoir rien entendu. L'un d'eux était avec {lui}. Ici, même les escaliers mentent.
- **Lettre d'Augure** :
> Fizzlebarbe a changé trois fois de serrure ce mois-ci. Il dit que quelqu'un fouille son bureau la nuit. — A.

### Le Port des Contrebandiers
- **Contrée** : La côte · **carte** : 7×7 · **enquêtes** : 7
- **Pièces** : Phare, Quai, Douane, Taverne du port, Chantier naval, Entrepôt, Marché aux poissons (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Bâbord, Frégaton, Écho-Écho, Goémone, Bakchich, Bâfrin, Grippesou
- **Invités** (enquêtes normales) : Saisitout (l'huissier), Pinardon (l'inspecteur des tavernes), Rapidon (le messager), Ondine (la maîtresse-nageuse), Taxard (le percepteur), Gustave (le touriste), Lirelire (le troubadour)
- **Introduction** :
> Au Port des Contrebandiers, {titre} {victime}, venu{e} {motif}, a été repêché{e} à marée basse. {Nombre} habitués traînaient sur les quais. L'un d'eux était seul avec {lui}. Ici, tout le monde a quelque chose à cacher, généralement dans un tonneau.
- **Lettre d'Augure** :
> Une cargaison est arrivée au port au nom de Fiolius : douze bocaux vides, étiquetés « souvenirs de la Tour ». — A.

### Le Grand Port de Brumeval
- **Contrée** : La côte · **carte** : 10×10 · **enquêtes** : 13 · illustration reprise de « port »
- **Pièces** : Quais, Entrepôt, Taverne du Kraken, Capitainerie, Chantier naval, Marché aux poissons, Galion, Phare, Douane (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Bâbord, Frégaton, Écho-Écho, Goémone, Grippesou, Bâfrin, Bakchich, Belladone, Esbroufe, Fernand
- **Invités** (enquêtes normales) : Mercurio (l'alchimiste), Grisemotte (la baronne de Grisemotte), Vipérine (la chasseuse de primes), Bricabrac (le colporteur), Ermengarde (la cousine), Gertrude (la dresseuse), Saisitout (l'huissier), Pinardon (l'inspecteur des tavernes), Rapidon (le messager), Ondine (la maîtresse-nageuse)
- **Enquêtes à grands monstres** : Cendrebrune (forme T4) — victime Prudence ; Glissandra (forme L4, cachée) — victime Taxard ; Caillasse et Escabeau (forme I3, I2) — victime Gustave
- **Introduction** :
> Brouillard à couper au couteau sur le Grand Port de Brumeval. Quelqu'un ne s'est pas contenté du brouillard : {titre} {victime}, venu{e} {motif}, est mort{e} sur les quais. {Nombre} habitués erraient dans la brume. L'un d'eux était seul avec {lui}.
- **Lettre d'Augure** :
> Le notaire de Brumeval a reçu un testament scellé. On le lui a volé le lendemain. Sur son bureau, il ne restait qu'une plume noire. — A.

### Le Navire Fantôme
- **Contrée** : La côte · **carte** : 7×7 · **enquêtes** : 11
- **Pièces** : Vigie, Pont, Cabine du capitaine, Entrepont, Coquerie, Cale, Soute à poudre (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Bâbord, Écho-Écho, Goémone, Blafard, Fernand, Belladone, Frégaton
- **Invités** (enquêtes normales) : Pinardon (l'inspecteur des tavernes), Rapidon (le messager), Ondine (la maîtresse-nageuse), Taxard (le percepteur), Gustave (le touriste), Lirelire (le troubadour), Prudence (l'abbesse)
- **Enquêtes à grands monstres** : Cendrebrune (forme I2) — victime Mercurio ; Escabeau (forme I2) — victime Grisemotte ; Cendrebrune (forme I2) — victime Vipérine ; Escabeau (forme I2) — victime Bricabrac
- **Introduction** :
> Le Navire Fantôme ne quitte jamais le port, et {titre} {victime}, venu{e} à bord {motif}, non plus, désormais. {Nombre} membres de l'équipage traînaient sur le pont. L'un d'eux était seul avec {lui}. Le capitaine m'assure que c'est la faute de la tempête. Il n'y a pas de tempête.
- **Lettre d'Augure** :
> Frégaton jure avoir vu Fizzlebarbe embarquer pour « un voyage sans retour ». Frégaton n'a jamais vu partir le moindre bateau. — A.

### Les Thermes Enchantés
- **Contrée** : La côte · **carte** : 6×6 · **enquêtes** : 6
- **Pièces** : Vestiaire, Bassin chaud, Bassin froid, Sauna, Salle de massage (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Goémone, Aëlys, Bâfrin, Capucine, Gribouille, Grippesou
- **Invités** (enquêtes normales) : Ermengarde (la cousine), Gertrude (la dresseuse), Saisitout (l'huissier), Pinardon (l'inspecteur des tavernes), Rapidon (le messager), Ondine (la maîtresse-nageuse)
- **Introduction** :
> Aux Thermes Enchantés, {titre} {victime}, venu{e} {motif}, a pris son dernier bain. {Nombre} baigneurs se prélassaient. L'un d'eux était seul avec {lui}. J'enquête en peignoir ; c'est le règlement, paraît-il.
- **Lettre d'Augure** :
> Aux Thermes, Fumerolle a dit en riant : « Le vieux veut léguer la Tour à celui qui le mérite. Personne ne le mérite. » — A.

### Les Grands Bains de Brumeval
- **Contrée** : La côte · **carte** : 10×10 · **enquêtes** : 12 · illustration reprise de « thermes »
- **Pièces** : Grand bassin, Hammam, Sauna, Vestiaires, Bassin des sirènes, Salon de thé, Jardin des cures, Salle des massages, Bains de boue (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Goémone, Aëlys, Bâfrin, Capucine, Grippesou, Belladone, Esbroufe, Fumerolle, Fizzlebarbe, Dagobert
- **Invités** (enquêtes normales) : Gustave (le touriste), Lirelire (le troubadour), Prudence (l'abbesse), Mercurio (l'alchimiste), Grisemotte (la baronne de Grisemotte), Vipérine (la chasseuse de primes), Bricabrac (le colporteur), Ermengarde (la cousine), Gertrude (la dresseuse), Saisitout (l'huissier)
- **Enquêtes à grands monstres** : Escabeau (forme T4) — victime Pinardon ; Glissandra (forme L4, cachée) — victime Rapidon
- **Introduction** :
> Aux Grands Bains de Brumeval, on vient soigner ses rhumatismes, ses nerfs ou sa réputation. {Titre} {victime}, venu{e} {motif}, n'est pas ressorti{e} du bain. {Nombre} curistes et employés barbotaient dans les parages. L'un d'eux était seul avec {lui}. Il fait quarante degrés, tout le monde transpire, et personne ne sait rien.
- **Lettre d'Augure** :
> Aux Grands Bains, Fizzlebarbe a confié à son masseur qu'il « changerait tout » dans son testament après sa cure. Le masseur n'a rien entendu d'autre : il avait les mains occupées. — A.

### Meurtre au Sanglier Borgne
- **Contrée** : La campagne de Bois-Tordu · **carte** : 6×6 · **enquêtes** : 6
- **Pièces** : Salle commune, Cuisine, Cave, Chambre, Écurie (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Gribouille, Fausset, Bâfrin, Aëlys, Capucine, Grippesou
- **Invités** (enquêtes normales) : Gertrude (la dresseuse), Saisitout (l'huissier), Pinardon (l'inspecteur des tavernes), Rapidon (le messager), Ondine (la maîtresse-nageuse), Taxard (le percepteur)
- **Introduction** :
> On m'a tiré du lit à l'aube. {Titre} {victime}, venu{e} au Sanglier Borgne {motif}, ne se réveillera plus. {Nombre} clients juraient dormir comme des loirs. L'un d'eux était avec {lui}. J'ai demandé un café ; on m'a servi une bière.
- **Lettre d'Augure** :
> Gribouille doit quarante écus au Sanglier Borgne. Il a promis à Grippesou de tout rembourser « dès que la Tour sera à lui ». — A.

### Le Moulin de Bois-Tordu
- **Contrée** : La campagne de Bois-Tordu · **carte** : 6×6 · **enquêtes** : 6
- **Pièces** : Moulin, Grange, Verger, Potager, Mare (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Capucine, Bâfrin, Goémone, Fernand, Flammèche, Farinard
- **Invités** (enquêtes normales) : Ondine (la maîtresse-nageuse), Taxard (le percepteur), Gustave (le touriste), Lirelire (le troubadour), Prudence (l'abbesse), Mercurio (l'alchimiste)
- **Introduction** :
> Au Moulin de Bois-Tordu, {titre} {victime}, venu{e} {motif}, a fini plus plat{e} qu'une galette. {Nombre} voisins traînaient dans le coin. L'un d'eux était seul avec {lui}. Le meunier m'a proposé de peser les suspects. J'ai refusé.
- **Lettre d'Augure** :
> Fernand a fait refaire une clé de la Tour. Il dit qu'il en avait une, avant l'accident. — A.

### La Ferme Hantée
- **Contrée** : La campagne de Bois-Tordu · **carte** : 6×6 · **enquêtes** : 6
- **Pièces** : Grange, Étable, Poulailler, Fournil, Potager (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Briochon, Bâfrin, Fernand, Capucine, Flammèche, Farinard
- **Invités** (enquêtes normales) : Lirelire (le troubadour), Prudence (l'abbesse), Mercurio (l'alchimiste), Grisemotte (la baronne de Grisemotte), Vipérine (la chasseuse de primes), Bricabrac (le colporteur)
- **Introduction** :
> On dit la Ferme Hantée, et {titre} {victime}, venu{e} {motif}, va sûrement y contribuer. {Nombre} habitants de la ferme étaient là cette nuit. L'un d'eux était seul avec {lui}. Les poules, elles, refusent de témoigner.
- **Lettre d'Augure** :
> Briochon raconte à tout le monde que le testament existe, qu'il est caché, et qu'il n'en dira pas plus. Il en dit toujours plus. — A.

### Le Marais des Brumes
- **Contrée** : La campagne de Bois-Tordu · **carte** : 6×6 · **enquêtes** : 6
- **Pièces** : Cabane, Ponton, Roselière, Îlot, Tourbière (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Goémone, Fernand, Ambroise, Bâfrin, Aëlys, Ciguë
- **Invités** (enquêtes normales) : Gertrude (la dresseuse), Saisitout (l'huissier), Pinardon (l'inspecteur des tavernes), Rapidon (le messager), Ondine (la maîtresse-nageuse), Taxard (le percepteur)
- **Introduction** :
> Le Marais des Brumes a rendu le corps de {titre} {victime}, venu{e} {motif}. Il garde le reste. {Nombre} habitants du marais pataugeaient dans le coin. L'un d'eux était seul avec {lui}. J'ai de la vase jusqu'aux genoux et zéro témoin fiable.
- **Lettre d'Augure** :
> Ciguë vend une potion qui fait apparaître les testaments. Dewey en a acheté trois. — A.

### La Mine des Nains
- **Contrée** : Les Monts Grimaces · **carte** : 8×8 · **enquêtes** : 14
- **Pièces** : Entrée, Galerie, Forge, Puits, Filon, Dortoir, Cantine, Salle des coffres (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Grisou, Bâfrin, Bakchich, Flammèche, Gontran, Capucine, Fernand, Granit
- **Invités** (enquêtes normales) : Lirelire (le troubadour), Prudence (l'abbesse), Mercurio (l'alchimiste), Grisemotte (la baronne de Grisemotte), Vipérine (la chasseuse de primes), Bricabrac (le colporteur), Ermengarde (la cousine), Gertrude (la dresseuse)
- **Enquêtes à grands monstres** : Caillasse (forme I2) — victime Saisitout ; Cendrebrune (forme I2) — victime Pinardon ; Caillasse et Cendrebrune (forme I2, I2) — victime Rapidon ; Caillasse (forme I2) — victime Ondine ; Cendrebrune (forme I2) — victime Taxard ; Caillasse et Cendrebrune (forme I2, I2) — victime Gustave
- **Introduction** :
> À la Mine des Nains, {titre} {victime}, venu{e} {motif}, est descendu{e} plus bas que prévu. {Nombre} mineurs et visiteurs étaient au fond. L'un d'eux était seul avec {lui}. Ici, tout le monde a une pioche, et personne n'a d'alibi.
- **Lettre d'Augure** :
> Granit a reçu une commande secrète : un coffre-fort à l'épreuve de la magie. Adresse de livraison : la Tour de l'Archimage. — A.

### La Forge du Dragon
- **Contrée** : Les Monts Grimaces · **carte** : 7×7 · **enquêtes** : 13
- **Pièces** : Antre du dragon, Forge, Armurerie, Fonderie, Réserve de charbon, Atelier, Cour (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Grisou, Gontran, Bakchich, Bâfrin, Festin, Gribouille, Flammèche
- **Invités** (enquêtes normales) : Grisemotte (la baronne de Grisemotte), Vipérine (la chasseuse de primes), Bricabrac (le colporteur), Ermengarde (la cousine), Gertrude (la dresseuse), Saisitout (l'huissier), Pinardon (l'inspecteur des tavernes)
- **Enquêtes à grands monstres** : Cendrebrune (forme I2) — victime Prudence ; Caillasse (forme I2) — victime Mercurio ; Cendrebrune et Caillasse (forme I2, I2) — victime Rapidon ; Cendrebrune (forme I2) — victime Ondine ; Caillasse (forme I2) — victime Taxard ; Cendrebrune et Caillasse (forme I2, I2) — victime Gustave
- **Introduction** :
> La Forge du Dragon fume plus que d'habitude : {titre} {victime}, venu{e} {motif}, n'en est pas ressorti{e}. {Nombre} habitués de la forge étaient au travail, paraît-il. L'un d'eux était seul avec {lui}. Le dragon dort. J'aimerais qu'il continue.
- **Lettre d'Augure** :
> Fizzlebarbe a fait forger une clé unique. Le forgeron l'a vu la glisser entre les pages d'un livre. — A.

### Le Banquet des Gobelins
- **Contrée** : Les Monts Grimaces · **carte** : 6×6 · **enquêtes** : 6
- **Pièces** : Cuisine, Cellier, Salle des fêtes, Garde-manger, Cour (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Bakchich, Bâfrin, Festin, Fausset, Briochon, Fricot
- **Invités** (enquêtes normales) : Ermengarde (la cousine), Gertrude (la dresseuse), Saisitout (l'huissier), Pinardon (l'inspecteur des tavernes), Rapidon (le messager), Ondine (la maîtresse-nageuse)
- **Introduction** :
> Au Banquet des Gobelins, {titre} {victime}, venu{e} {motif}, est passé{e} du côté des convives au côté du menu. Enfin, presque. {Nombre} invités se goinfraient. L'un d'eux était seul avec {lui}. On m'a servi une soupe. Je ne l'ai pas touchée.
- **Lettre d'Augure** :
> Au Banquet des Gobelins, Bakchich a porté un toast « au futur propriétaire de la Tour ». Il a levé son verre vers lui-même. — A.

### L'Académie de Magie
- **Contrée** : Le quartier savant · **carte** : 7×7 · **enquêtes** : 11
- **Pièces** : Tour d'astronomie, Salle de cours, Bureau du directeur, Dortoir, Laboratoire, Réfectoire, Serre (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Brindille, Gribouille, Capucine, Flammèche, Fumerolle, Aëlys, Fiolius
- **Invités** (enquêtes normales) : Ondine (la maîtresse-nageuse), Taxard (le percepteur), Gustave (le touriste), Lirelire (le troubadour), Prudence (l'abbesse), Mercurio (l'alchimiste), Grisemotte (la baronne de Grisemotte)
- **Enquêtes à grands monstres** : Caillasse (forme I2) — victime Vipérine ; Escabeau (forme I2) — victime Bricabrac ; Caillasse (forme I2) — victime Ermengarde ; Escabeau (forme I2) — victime Gertrude
- **Introduction** :
> À l'Académie de Magie, {titre} {victime}, venu{e} {motif}, a été retrouvé{e} un soir d'examens. {Nombre} élèves et professeurs révisaient, paraît-il. L'un d'eux était seul avec {lui}. Ça sent le soufre, mais ici, ça sent toujours le soufre.
- **Lettre d'Augure** :
> Brindille s'entraîne en secret au sort qui ouvre les serrures magiques. Trois portes de l'Académie ont déjà explosé. — A.

### L'Université des Sortilèges
- **Contrée** : Le quartier savant · **carte** : 11×11 · **enquêtes** : 14 · illustration reprise de « academie »
- **Pièces** : Amphithéâtre, Grande bibliothèque, Serre, Dortoir, Laboratoire, Cour, Réfectoire, Observatoire, Salle des duels, Bureau du doyen (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Fizzlebarbe, Brindille, Fiolius, Gribouille, Capucine, Fumerolle, Dewey, Flammèche, Ambroise, Blafard, Clairvoya
- **Invités** (enquêtes normales) : Pinardon (l'inspecteur des tavernes), Rapidon (le messager), Ondine (la maîtresse-nageuse), Taxard (le percepteur), Gustave (le touriste), Lirelire (le troubadour), Prudence (l'abbesse), Mercurio (l'alchimiste), Grisemotte (la baronne de Grisemotte), Vipérine (la chasseuse de primes), Bricabrac (le colporteur)
- **Enquêtes à grands monstres** : Cendrebrune (forme S4) — victime Ermengarde ; Caillasse (forme O4) — victime Gertrude ; Glissandra (forme L4, cachée) — victime Saisitout
- **Introduction** :
> La veille de la remise des diplômes, l'Université des Sortilèges a perdu {titre} {victime}, venu{e} {motif}. {Nombre} membres de l'université travaillaient tard, ou faisaient semblant. L'un d'eux était seul avec {lui}. L'Académie d'en face nie tout en bloc, avant même que je demande.
- **Lettre d'Augure** :
> Fiolius a écrit « Annexe de l'Université » sur les plans de la Tour. À l'encre sympathique. Elle se voit très bien. — A.

### La Bibliothèque Interdite
- **Contrée** : Le quartier savant · **carte** : 7×7 · **enquêtes** : 10
- **Pièces** : Scriptorium, Rayonnages, Bureau, Salle de lecture, Galerie, Réserve, Archives (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Gribouille, Blafard, Belladone, Fumerolle, Bakchich, Fizzlebarbe, Dewey
- **Invités** (enquêtes normales) : Ondine (la maîtresse-nageuse), Taxard (le percepteur), Gustave (le touriste), Lirelire (le troubadour), Prudence (l'abbesse), Mercurio (l'alchimiste), Grisemotte (la baronne de Grisemotte)
- **Enquêtes à grands monstres** : Caillasse (forme I2) — victime Vipérine ; Caillasse et Cendrebrune (forme I2, I2) — victime Bricabrac ; Caillasse et Cendrebrune (forme I2, I2) — victime Ermengarde
- **Introduction** :
> À la Bibliothèque Interdite, {titre} {victime}, venu{e} {motif}, a été retrouvé{e} entre deux rayonnages. On m'a demandé d'enquêter en silence. {Nombre} lecteurs étaient là. L'un d'eux était seul avec {lui}. Je chuchote mes questions ; on me répond en hurlant « chut ».
- **Lettre d'Augure** :
> Dewey a enfin retrouvé le grimoire volé par Gribouille… caché au fond de la Tour. Qui l'y a mis ? — A.

### La Foire aux Sortilèges
- **Contrée** : Sur la route · **carte** : 7×7 · **enquêtes** : 9
- **Pièces** : Roulotte, Stands, Buvette, Coulisses, Chapiteau, Ménagerie, Manège (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Clairvoya, Fausset, Bakchich, Bâfrin, Capucine, Flammèche, Esbroufe
- **Invités** (enquêtes normales) : Ondine (la maîtresse-nageuse), Taxard (le percepteur), Gustave (le touriste), Lirelire (le troubadour), Prudence (l'abbesse), Mercurio (l'alchimiste), Grisemotte (la baronne de Grisemotte)
- **Enquêtes à grands monstres** : Escabeau (forme I2) — victime Vipérine ; Escabeau (forme I2) — victime Bricabrac
- **Introduction** :
> La Foire aux Sortilèges a perdu un client : {titre} {victime}, venu{e} {motif}. {Nombre} forains juraient qu'ils tenaient leur stand. L'un d'eux était seul avec {lui}. Le bonimenteur m'a déjà proposé un élixir de vérité. Deux écus, garanti sans effet.
- **Lettre d'Augure** :
> Clairvoya a prédit à Brindille qu'elle hériterait d'une tour. Esbroufe lui a aussitôt vendu un plan de la Tour. Il y manque un étage. — A.

### La Grande Foire des Mille Merveilles
- **Contrée** : Sur la route · **carte** : 12×12 · **enquêtes** : 15 · illustration reprise de « foire »
- **Pièces** : Chapiteau, Ménagerie, Grande roue, Stand de tir, Piste aux étoiles, Roulottes, Cabinet des curiosités, Labyrinthe, Buvette, Tente de la voyante, Manège (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Esbroufe, Clairvoya, Fausset, Bakchich, Bâfrin, Capucine, Flammèche, Festin, Fricot, Briochon, Farinard, Aëlys
- **Invités** (enquêtes normales) : Vipérine (la chasseuse de primes), Bricabrac (le colporteur), Ermengarde (la cousine), Gertrude (la dresseuse), Saisitout (l'huissier), Pinardon (l'inspecteur des tavernes), Rapidon (le messager), Ondine (la maîtresse-nageuse), Taxard (le percepteur), Gustave (le touriste), Lirelire (le troubadour), Prudence (l'abbesse)
- **Enquêtes à grands monstres** : Glissandra (forme S4) — victime Mercurio ; Cendrebrune et Caillasse (forme T4, I2, cachée) — victime Grisemotte ; Escabeau (forme O4) — victime Prudence
- **Introduction** :
> Feu d'artifice à la Grande Foire des Mille Merveilles : tout le monde regardait le ciel, sauf {titre} {victime}, venu{e} {motif}, qui ne regardera plus rien. {Nombre} forains et visiteurs juraient avoir le nez en l'air. L'un d'eux était seul avec {lui}.
- **Lettre d'Augure** :
> À la Grande Foire, Fiolius a acheté une malle assez grande pour un grimoire. Ou pour un archimage. — A.

### Le Palais des Mille Vœux
- **Contrée** : Sur la route · **carte** : 7×7 · **enquêtes** : 11
- **Pièces** : Observatoire, Salle du trône, Trésor, Salle des lampes, Jardins suspendus, Bazar, Hammam (la plus petite est fusionnée avec une voisine quand il y a plus de pièces que de suspects : chaque pièce doit être occupée)
- **Habitués** : Dagobert, Clairvoya, Esbroufe, Bakchich, Belladone, Fizzlebarbe, Fumerolle
- **Invités** (enquêtes normales) : Grisemotte (la baronne de Grisemotte), Vipérine (la chasseuse de primes), Bricabrac (le colporteur), Ermengarde (la cousine), Gertrude (la dresseuse), Saisitout (l'huissier), Pinardon (l'inspecteur des tavernes)
- **Enquêtes à grands monstres** : Glissandra (forme I2) — victime Prudence ; Cendrebrune (forme I2) — victime Mercurio ; Glissandra (forme I2) — victime Rapidon ; Cendrebrune (forme I2) — victime Ondine
- **Introduction** :
> Au Palais des Mille Vœux, {titre} {victime}, venu{e} {motif}, a fait un vœu de trop, ou en a croisé un. {Nombre} hôtes du palais étaient là. L'un d'eux était seul avec {lui}. La djinn m'a proposé de tout résoudre d'un claquement de doigts. J'ai lu les petites lignes.
- **Lettre d'Augure** :
> Le Palais des Mille Vœux a proposé d'acheter la Tour pour en faire une lampe géante. Fizzlebarbe a répondu par un éclair. — A.

## 8. Le fil rouge : les lettres d'Augure
Après chaque enquête résolue, l'enquêteur trouve **une lettre anonyme glissée sous la porte**. Il y a **une lettre par lieu** (23 en tout) : c'est la **première enquête résolue dans un lieu** qui la donne. Les lettres se lisent dans **n'importe quel ordre** ; aucune ne dépend d'une autre ni ne révèle la solution de l'enquête qui la donne (elle n'apparaît qu'après la victoire).
Ensemble, elles racontent une affaire plus grande : **le testament de Fizzlebarbe**. L'archimage, 412 ans, va enfin rédiger un testament et léguer la Tour « à celui qui le mérite », sans dire qui. Chaque lettre est un ragot sur un héritier possible :

| Lieu | Lettre |
| --- | --- |
| Le Château de Mortebrune | Bakchich a mis la Tour de l'Archimage en gage à la banque gobeline. Elle ne lui appartient pas. Détail, selon lui. |
| La Citadelle de Mortebrune | Blafard affirme que la Tour faisait partie de son domaine, il y a quatre siècles. Il a gardé les titres de propriété. Ils sont un peu transparents. |
| Le Bal Masqué | Au bal masqué, Fumerolle a promis à trois invités différents qu'ils hériteraient de la Tour. Elle exauce, paraît-il. |
| Le Cimetière de Minuit | Glas a déjà creusé une tombe au nom de Fizzlebarbe. « Pour gagner du temps », dit-il. |
| La Tour de l'Archimage | Fizzlebarbe a changé trois fois de serrure ce mois-ci. Il dit que quelqu'un fouille son bureau la nuit. |
| Le Port des Contrebandiers | Une cargaison est arrivée au port au nom de Fiolius : douze bocaux vides, étiquetés « souvenirs de la Tour ». |
| Le Grand Port de Brumeval | Le notaire de Brumeval a reçu un testament scellé. On le lui a volé le lendemain. Sur son bureau, il ne restait qu'une plume noire. |
| Le Navire Fantôme | Frégaton jure avoir vu Fizzlebarbe embarquer pour « un voyage sans retour ». Frégaton n'a jamais vu partir le moindre bateau. |
| Les Thermes Enchantés | Aux Thermes, Fumerolle a dit en riant : « Le vieux veut léguer la Tour à celui qui le mérite. Personne ne le mérite. » |
| Les Grands Bains de Brumeval | Aux Grands Bains, Fizzlebarbe a confié à son masseur qu'il « changerait tout » dans son testament après sa cure. Le masseur n'a rien entendu d'autre : il avait les mains occupées. |
| Meurtre au Sanglier Borgne | Gribouille doit quarante écus au Sanglier Borgne. Il a promis à Grippesou de tout rembourser « dès que la Tour sera à lui ». |
| Le Moulin de Bois-Tordu | Fernand a fait refaire une clé de la Tour. Il dit qu'il en avait une, avant l'accident. |
| La Ferme Hantée | Briochon raconte à tout le monde que le testament existe, qu'il est caché, et qu'il n'en dira pas plus. Il en dit toujours plus. |
| Le Marais des Brumes | Ciguë vend une potion qui fait apparaître les testaments. Dewey en a acheté trois. |
| La Mine des Nains | Granit a reçu une commande secrète : un coffre-fort à l'épreuve de la magie. Adresse de livraison : la Tour de l'Archimage. |
| La Forge du Dragon | Fizzlebarbe a fait forger une clé unique. Le forgeron l'a vu la glisser entre les pages d'un livre. |
| Le Banquet des Gobelins | Au Banquet des Gobelins, Bakchich a porté un toast « au futur propriétaire de la Tour ». Il a levé son verre vers lui-même. |
| L'Académie de Magie | Brindille s'entraîne en secret au sort qui ouvre les serrures magiques. Trois portes de l'Académie ont déjà explosé. |
| L'Université des Sortilèges | Fiolius a écrit « Annexe de l'Université » sur les plans de la Tour. À l'encre sympathique. Elle se voit très bien. |
| La Bibliothèque Interdite | Dewey a enfin retrouvé le grimoire volé par Gribouille… caché au fond de la Tour. Qui l'y a mis ? |
| La Foire aux Sortilèges | Clairvoya a prédit à Brindille qu'elle hériterait d'une tour. Esbroufe lui a aussitôt vendu un plan de la Tour. Il y manque un étage. |
| La Grande Foire des Mille Merveilles | À la Grande Foire, Fiolius a acheté une malle assez grande pour un grimoire. Ou pour un archimage. |
| Le Palais des Mille Vœux | Le Palais des Mille Vœux a proposé d'acheter la Tour pour en faire une lampe géante. Fizzlebarbe a répondu par un éclair. |

**Les héritiers et ce que les lettres disent d'eux** : Bakchich (a mis la Tour en gage, a trinqué « au futur propriétaire »), Fernand (clé refaite, vingt ans de salaire dus), Fiolius (malle géante, bocaux « souvenirs de la Tour », plans annotés « Annexe de l'Université »), Brindille (prédiction de Clairvoya, entraînement au sort d'ouverture des serrures), Blafard (titres de propriété vieux de quatre siècles), Dewey (grimoire retrouvé dans la Tour, potions qui font apparaître les testaments), Gribouille (dette au Sanglier Borgne payable « dès que la Tour sera à lui »), Fumerolle (a promis la Tour à trois personnes), et un indice qui ne pointe personne en particulier : la plume noire laissée chez le notaire.
**Débloquer la fin** : avec **15 lettres**, l'affaire finale s'ouvre (pas besoin de tout finir).

## 9. L'affaire finale : le testament de Fizzlebarbe
**La Tour de l'Archimage — Le testament de Fizzlebarbe** : carte 10×10, la Tour de l'Archimage, la nuit où Fizzlebarbe devait signer son testament.
- **Pièces** : Observatoire, Laboratoire, Bibliothèque, Chambre de Fizzlebarbe, Réserve des potions, Salle du testament, Grand escalier, Jardin suspendu, Crypte
- **Victime** : Fizzlebarbe (seule victime de la troupe : c'est la mort d'un récurrent, prévue comme un événement)
- **Suspects, les neuf héritiers** : Bakchich, Fernand, Fiolius, Brindille, Blafard, Dewey, Gribouille, Fumerolle, Augure
- **Introduction** :
> Quinze lettres, et toutes menaient ici. Fizzlebarbe, 412 ans, a été retrouvé mort dans sa Tour, la nuit où il devait enfin signer son testament. Le testament a disparu. Ses neuf héritiers présumés étaient tous là, et un seul était avec lui. Sur la rambarde, le corbeau me regarde comme s'il savait déjà.
- **Épilogues** : chaque héritier a le sien, et tous (sauf le corbeau) se terminent par la révélation.

**Si le coupable est Bakchich** :
> — Vous étiez seul avec Fizzlebarbe.  
> — Il allait signer. Et la Tour était déjà en gage chez les gobelins.  
> — Donc ?  
> — Donc, techniquement, il valait mieux qu'il ne signe pas. C'est légal. Presque.  
> — (Augure dépose une dernière lettre, signée Fizzlebarbe : « Mon corbeau vous a tous surveillés pour moi. Je léguais la Tour à celui qui ne la convoitait pas. Il n'y en avait aucun. »)

**Si le coupable est Fernand** :
> — Vous étiez seul avec lui.  
> — Vingt ans de salaire, il me devait. Il m'a tendu une pièce.  
> — Et ?  
> — J'ai perdu une main. Elle tenait un chandelier.  
> — (Augure dépose une dernière lettre, signée Fizzlebarbe : « Mon corbeau vous a tous surveillés pour moi. Je léguais la Tour à celui qui ne la convoitait pas. Il n'y en avait aucun. »)

**Si le coupable est Fiolius** :
> — Vous étiez seul avec lui.  
> — (Il renifle.) Il sentait la fin.  
> — Vous l'avez aidé ?  
> — Je l'ai noté. Zéro. Il a mal pris la note.  
> — (Augure dépose une dernière lettre, signée Fizzlebarbe : « Mon corbeau vous a tous surveillés pour moi. Je léguais la Tour à celui qui ne la convoitait pas. Il n'y en avait aucun. »)

**Si le coupable est Brindille** :
> — Vous étiez seule avec lui.  
> — Je voulais juste ouvrir la serrure du testament.  
> — Et ?  
> — C'est normal que la Tour fume encore ?  
> — (Augure dépose une dernière lettre, signée Fizzlebarbe : « Mon corbeau vous a tous surveillés pour moi. Je léguais la Tour à celui qui ne la convoitait pas. Il n'y en avait aucun. »)

**Si le coupable est Blafard** :
> — Vous étiez seul avec lui.  
> — De mon vivant, cette Tour était à moi.  
> — Et maintenant ?  
> — Maintenant, nous voilà deux fantômes à nous la disputer. Ça promet.  
> — (Augure dépose une dernière lettre, signée Fizzlebarbe : « Mon corbeau vous a tous surveillés pour moi. Je léguais la Tour à celui qui ne la convoitait pas. Il n'y en avait aucun. »)

**Si le coupable est Dewey** :
> — Vous étiez seule avec lui.  
> — Il avait annoté son testament dans un livre de MA bibliothèque.  
> — Ce n'est pas un mobile.  
> — CHUT. C'en est un.  
> — (Augure dépose une dernière lettre, signée Fizzlebarbe : « Mon corbeau vous a tous surveillés pour moi. Je léguais la Tour à celui qui ne la convoitait pas. Il n'y en avait aucun. »)

**Si le coupable est Gribouille** :
> — Vous étiez seul avec lui.  
> — Il voulait me déshériter pour un grimoire pas rendu.  
> — Onze ans de retard.  
> — Atchoum. Le sort est parti tout seul. Encore.  
> — (Augure dépose une dernière lettre, signée Fizzlebarbe : « Mon corbeau vous a tous surveillés pour moi. Je léguais la Tour à celui qui ne la convoitait pas. Il n'y en avait aucun. »)

**Si le coupable est Fumerolle** :
> — Vous étiez seule avec lui.  
> — Il a fait un dernier vœu : « Que personne ne touche à ma Tour de mon vivant. »  
> — Et ?  
> — J'ai exaucé. Il n'est plus vivant, et personne n'y touche.  
> — (Augure dépose une dernière lettre, signée Fizzlebarbe : « Mon corbeau vous a tous surveillés pour moi. Je léguais la Tour à celui qui ne la convoitait pas. Il n'y en avait aucun. »)

**Si le coupable est Augure** :
> — Vous étiez seul avec lui.  
> — (Billet : « Il m'a fait espionner tout le monde pendant des mois. Les lettres, c'était lui. »)  
> — Et ?  
> — (Billet : « Puis il m'a légué la Tour. Je n'en voulais pas. Je voulais qu'il arrête de me faire écrire. »)

**La révélation** : les lettres n'étaient pas l'œuvre d'un maître chanteur. **Augure travaillait pour Fizzlebarbe** : l'archimage lui faisait espionner tous ses héritiers pour décider qui méritait la Tour. Sa conclusion, dans la dernière lettre : il la léguait à celui qui ne la convoitait pas… et il n'y en avait aucun. Si c'est Augure le coupable, il avoue par billets qu'il en avait assez d'écrire, et qu'il ne voulait pas de la Tour.
**Suite prévue** : Fizzlebarbe reviendra en spectre, furieux d'avoir été assassiné avant d'avoir signé ; Blafard l'accueillera dans la confrérie des défunts mécontents.

## 10. Gags récurrents
Des petites histoires qui courent d'une enquête à l'autre, sans jamais compter pour la solution :
- **Le registre de Grippesou** : la dette de Capucine grossit. Dans le carnet, sa fiche affiche « Dette au Sanglier Borgne : N tournées » (3 de départ, plus 3 par enquête résolue où l'on a croisé Capucine).
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
2. **Choisis ta taille** : un parchemin par taille de carte (6×6 à 12×12), plus trois entrées du lore : **🗺️ Carte de Brumeval**, **📖 Carnet d'enquête** (avec « ✉️ N nouvelle(s) lettre(s) » tant qu'elles ne sont pas lues) et **l'affaire finale** (verrouillée : « Une affaire se prépare… Encore N lettres d'Augure »). À terme, la carte remplacera le classement par taille.
3. **Carte de Brumeval** : une pastille numérotée par lieu sur l'illustration (au survol, sur ordinateur : nom du lieu, enquêtes résolues, 📜 si sa lettre est trouvée ; pastille rouge quand le lieu est terminé), puis la liste des lieux par contrée.
4. **Page d'un lieu** : sa lettre (ou « Une lettre d'Augure attend ici la première enquête résolue ») et ses enquêtes. Le bouton ‹ d'une enquête ouverte d'ici ramène à ce lieu.
5. **L'enquête** : à la première ouverture, une **scène au centre de l'écran** montre l'illustration du décor, le titre et l'introduction de l'enquêteur (« À l'enquête »). Le titre en haut la rouvre à tout moment.
6. **La victoire** : le tampon « Affaire résolue », puis une **scène centrée** : le portrait du coupable, « Seul suspect dans la pièce de <victime>. » et l'épilogue dialogué. Si l'enquête apporte une lettre : « 📜 Une lettre a été glissée sous la porte… » ouvre **la lettre en grand** (cachet de cire « A », lieu, texte, « — A. », progression « N / 23 lettres · encore M avant que tout s'éclaire »), avec « Ranger dans mon carnet » ou « Ouvrir le carnet ». Le verdict reste résumé dans la colonne de droite (avec la lettre).
7. **Le carnet d'enquête** : les lettres trouvées (les nouvelles sont marquées), les lieux sans lettre, et les **fiches de la troupe croisée** (portrait, nom, trait, tic, gags qui se voient). Une fiche apparaît quand on a résolu une enquête où ce personnage était présent.
8. **L'affaire finale** : à 15 lettres, elle s'ouvre depuis la page des tailles. Elle n'est dans aucune taille ni aucun lieu.
### Les règles du jeu liées au lore (écran des règles)
- La victime est un invité de passage ; les suspects sont les habitués, qu'on retrouve d'une enquête à l'autre.
- Chacun porte une pastille avec l'initiale de son nom (deux lettres si deux noms commencent pareil) ; les fiches vont de la plus facile à placer à la plus difficile.
- Lettres d'Augure : la première enquête résolue dans chaque lieu donne une lettre anonyme, rangée dans le carnet ; assez de lettres, et une affaire très spéciale se débloque.
- Seule la pièce du crime contient deux personnes, et chaque pièce est occupée.
### Progression
- Les lettres trouvées sont gardées dans le navigateur (`grimdoku:lettres`), les lettres lues aussi (`grimdoku:lettres-lues`).
- Les lettres ne sont pas rétroactives : l'arrivée du lore remet la progression à zéro (les enquêtes ont de nouveaux identifiants).
- Chaque enquête garde sa partie en cours et son état résolu ; l'introduction ne s'ouvre d'elle-même qu'une fois (`grimdoku:seen:<id>`).

## 12. Règles de cohérence
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
| Affaire finale : plan, introduction, épilogues | `scenes/testament.json` |
| Enquêtes à grands monstres (formes, victimes) | `big-cases.json` |
| Conseils de l'enquêteur, scènes, carnet, carte | `app/template.html` |
| La bible de travail (document partagé) | https://claude.ai/code/artifact/b1eaad27-d50f-4faf-8b14-30a2ef2e9e65 |
Ce fichier se régénère depuis ces données (`node tools/lore-md.js`) : une modification de `cast.json` ou des décors s'y retrouve à la génération suivante.
