# Scènes de crime : où meurent les victimes

**Contient les solutions.** Généré par `node tools/scenes-crime-md.js` à partir des grilles (ne pas éditer à la main).

Pour chaque enquête : la pièce du crime et tous ses meubles, la case exacte de la victime et celle du coupable (ligne, colonne, comptées à partir de 1 ; le nord est en haut), le meuble sur lequel chacun se tient, et ce qui se trouve dans les quatre cases voisines (nord, sud, est, ouest). Une case voisine d'une autre pièce est derrière un mur. Les grands personnages occupent plusieurs cases.

Règles utiles pour écrire un épilogue : la victime était **seule avec son meurtrier** dans la pièce du crime (aucun autre personnage n'y était) ; un épilogue ne doit citer que des meubles de cette pièce, de préférence ceux qui sont tout près de la victime. Les meubles marqués « on peut s'y tenir » (tapis, lit, chaise, fauteuil, hamac, barque, champignon géant, portail runique) peuvent porter un personnage ; les autres sont bloquants (personne dessus).

**Légende des plans** : `VI` victime, `CO` coupable, `..` case vide, `##` hors de la pièce du crime ; meubles : `Ta` table, `Et` étagère, `Cd` chaudron, `St` statue, `To` tonneau, `Ar` arbre, `Co` coffre, `Fo` botte de foin, `Cr` boule de cristal, `Sa` sarcophage, `Ci` chaise, `Li` lit, `Tp` tapis, `Ch` champignon géant, `Po` portail runique, `Ca` canon, `Tb` tombe, `En` enclume, `Pu` pupitre, `Ro` massif de roseaux, `Cm` chariot de mine, `Ha` hamac, `Fa` fauteuil, `Ba` barque. Quand la victime ou le coupable se tient sur un meuble, le plan montre le personnage ; le texte précise le meuble.

## 1. Le Château de Mortebrune

### 1.1. l'affaire Patience — coupable : Blafard

- **Pièce du crime** : Donjon ; meubles de la pièce : botte de foin, sarcophage
- **Victime** (Patience) : ligne 7, colonne 3, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Jardin) ; au sud : bord de la carte ; à l'ouest : sarcophage ; à l'est : mur (autre pièce : Jardin)
- **Coupable** (Blafard) : ligne 6, colonne 1, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Armurerie) ; au sud : case vide ; à l'ouest : bord de la carte ; à l'est : botte de foin
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
CO Fo ##
.. Sa VI
```

### 1.2. l'affaire Fanfare — coupable : Gontran

- **Pièce du crime** : Jardin ; meubles de la pièce : arbre, champignon géant
- **Victime** (Fanfare) : ligne 7, colonne 4, sur le sol nu
  - cases voisines : au nord : arbre ; au sud : bord de la carte ; à l'ouest : mur (autre pièce : Donjon) ; à l'est : case vide
- **Coupable** (Gontran) : ligne 4, colonne 3, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Grande salle) ; au sud : champignon géant (on peut s'y tenir) ; à l'ouest : mur (autre pièce : Armurerie) ; à l'est : arbre
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
CO Ar ..
Ch .. ..
.. Ar ..
## VI ..
```

### 1.3. l'affaire Gisèle — coupable : Gontran

- **Pièce du crime** : Jardin ; meubles de la pièce : arbre, champignon géant
- **Victime** (Gisèle) : ligne 6, colonne 3, sur le sol nu
  - cases voisines : au nord : champignon géant (on peut s'y tenir) ; au sud : mur (autre pièce : Donjon) ; à l'ouest : mur (autre pièce : Donjon) ; à l'est : arbre
- **Coupable** (Gontran) : ligne 5, colonne 4, sur le sol nu
  - cases voisines : au nord : arbre ; au sud : arbre ; à l'ouest : champignon géant (on peut s'y tenir) ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. Ar ..
Ch CO ..
VI Ar ..
## .. ..
```

### 1.4. l'affaire Gouleyant — coupable : Bakchich

- **Pièce du crime** : Grande salle ; meubles de la pièce : chaise, table, tapis, chaudron, tonneau
- **Victime** (Gouleyant) : ligne 2, colonne 7, sur le sol nu
  - cases voisines : au nord : chaudron ; au sud : mur (autre pièce : Tour) ; à l'ouest : case vide ; à l'est : bord de la carte
- **Coupable** (Bakchich) : ligne 3, colonne 3, sur le sol nu
  - cases voisines : au nord : chaise (on peut s'y tenir) ; au sud : mur (autre pièce : Jardin) ; à l'ouest : mur (autre pièce : Armurerie) ; à l'est : tapis (on peut s'y tenir)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. .. .. .. Cd
Ci Ta Ci .. VI
CO Tp .. To ##
```

### 1.5. l'affaire Promenin — coupable : Fausset

- **Pièce du crime** : Tour ; meubles de la pièce : lit, étagère, boule de cristal
- **Victime** (Promenin) : ligne 4, colonne 6, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Grande salle) ; au sud : case vide ; à l'ouest : mur (autre pièce : Jardin) ; à l'est : lit (on peut s'y tenir)
- **Coupable** (Fausset) : ligne 3, colonne 7, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Grande salle) ; au sud : lit (on peut s'y tenir) ; à l'ouest : mur (autre pièce : Grande salle) ; à l'est : bord de la carte
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## CO
VI Li
.. ..
Et ..
.. Cr
```

## 2. Le Banquet des Gobelins

### 2.1. l'affaire Croquette — coupable : Fausset

- **Pièce du crime** : Salle des fêtes ; meubles de la pièce : table, chaise, tapis
- **Victime** (Croquette) : ligne 3, colonne 6, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Cellier) ; au sud : case vide ; à l'ouest : chaise (on peut s'y tenir) ; à l'est : bord de la carte
- **Coupable** (Fausset) : ligne 5, colonne 5, sur le sol nu
  - cases voisines : au nord : table ; au sud : case vide ; à l'ouest : case vide ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. .. ## ##
.. Ta Ci VI
.. Ci Ta ..
## .. CO ..
## ## .. Tp
```

### 2.2. l'affaire Recouvrin — coupable : Bakchich

- **Pièce du crime** : Cour ; meubles de la pièce : arbre, champignon géant
- **Victime** (Recouvrin) : ligne 6, colonne 4, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Salle des fêtes) ; au sud : bord de la carte ; à l'ouest : case vide ; à l'est : mur (autre pièce : Salle des fêtes)
- **Coupable** (Bakchich) : ligne 5, colonne 2, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Garde-manger) ; au sud : arbre ; à l'ouest : mur (autre pièce : Garde-manger) ; à l'est : champignon géant (on peut s'y tenir)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## CO Ch ##
.. Ar .. VI
```

### 2.3. l'affaire Courandier — coupable : Fricot

- **Pièce du crime** : Salle des fêtes ; meubles de la pièce : table, chaise, tapis
- **Victime** (Courandier) : ligne 5, colonne 4, sur le sol nu
  - cases voisines : au nord : chaise (on peut s'y tenir) ; au sud : mur (autre pièce : Cour) ; à l'ouest : mur (autre pièce : Cour) ; à l'est : case vide
- **Coupable** (Fricot) : ligne 4, colonne 6, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : case vide ; à l'ouest : table ; à l'est : bord de la carte
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. .. ## ##
.. Ta Ci ..
.. Ci Ta CO
## VI .. ..
## ## .. Tp
```

### 2.4. l'affaire Brassée — coupable : Bakchich

- **Pièce du crime** : Salle des fêtes ; meubles de la pièce : table, chaise, tapis
- **Victime** (Brassée) : ligne 5, colonne 6, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : tapis (on peut s'y tenir) ; à l'ouest : case vide ; à l'est : bord de la carte
- **Coupable** (Bakchich) : ligne 4, colonne 4, **sur la chaise**
  - cases voisines : au nord : table ; au sud : case vide ; à l'ouest : case vide ; à l'est : table
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. .. ## ##
.. Ta Ci ..
.. CO Ta ..
## .. .. VI
## ## .. Tp
```

### 2.5. l'affaire Ingeburge — coupable : Festin

- **Pièce du crime** : Salle des fêtes ; meubles de la pièce : table, chaise, tapis
- **Victime** (Ingeburge) : ligne 4, colonne 3, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Cour) ; à l'ouest : mur (autre pièce : Garde-manger) ; à l'est : chaise (on peut s'y tenir)
- **Coupable** (Festin) : ligne 3, colonne 5, **sur la chaise**
  - cases voisines : au nord : mur (autre pièce : Cellier) ; au sud : table ; à l'ouest : table ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. .. ## ##
.. Ta CO ..
VI Ci Ta ..
## .. .. ..
## ## .. Tp
```

## 3. Meurtre au Sanglier Borgne

### 3.1. l'affaire Câline — coupable : Fausset

- **Pièce du crime** : Chambre ; meubles de la pièce : lit, coffre
- **Victime** (Câline) : ligne 4, colonne 2, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Salle commune) ; au sud : case vide ; à l'ouest : case vide ; à l'est : mur (autre pièce : Salle commune)
- **Coupable** (Fausset) : ligne 6, colonne 1, sur le sol nu
  - cases voisines : au nord : lit (on peut s'y tenir) ; au sud : bord de la carte ; à l'ouest : bord de la carte ; à l'est : coffre
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. VI ##
Li .. ##
CO Co ..
```

### 3.2. l'affaire Rinçon — coupable : Aëlys

- **Pièce du crime** : Chambre ; meubles de la pièce : lit, coffre
- **Victime** (Rinçon) : ligne 6, colonne 3, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Salle commune) ; au sud : bord de la carte ; à l'ouest : coffre ; à l'est : mur (autre pièce : Écurie)
- **Coupable** (Aëlys) : ligne 4, colonne 1, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Salle commune) ; au sud : lit (on peut s'y tenir) ; à l'ouest : bord de la carte ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
CO .. ##
Li .. ##
.. Co VI
```

### 3.3. l'affaire Hérautin — coupable : Aagrid

- **Pièce du crime** : Salle commune ; meubles de la pièce : table, chaise
- **Victime** (Hérautin) : ligne 4, colonne 3, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : case vide ; à l'ouest : mur (autre pièce : Chambre) ; à l'est : mur (autre pièce : Cave)
- **Coupable** (Aagrid) : ligne 2, colonne 2, **sur la chaise**
  - cases voisines : au nord : table ; au sud : case vide ; à l'ouest : case vide ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
Ci Ta ..
.. CO ..
Ta .. ..
## ## VI
## ## ..
```

### 3.4. l'affaire Apnée — coupable : Bâfrin

- **Pièce du crime** : Salle commune ; meubles de la pièce : table, chaise
- **Victime** (Apnée) : ligne 3, colonne 2, sur le sol nu
  - cases voisines : au nord : chaise (on peut s'y tenir) ; au sud : mur (autre pièce : Chambre) ; à l'ouest : table ; à l'est : case vide
- **Coupable** (Bâfrin) : ligne 1, colonne 1, **sur la chaise**
  - cases voisines : au nord : bord de la carte ; au sud : case vide ; à l'ouest : bord de la carte ; à l'est : table
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
CO Ta ..
.. Ci ..
Ta VI ..
## ## ..
## ## ..
```

### 3.5. l'affaire Corvéon — coupable : Gribouille

- **Pièce du crime** : Chambre ; meubles de la pièce : lit, coffre
- **Victime** (Corvéon) : ligne 4, colonne 1, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Salle commune) ; au sud : lit (on peut s'y tenir) ; à l'ouest : bord de la carte ; à l'est : case vide
- **Coupable** (Gribouille) : ligne 5, colonne 2, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : coffre ; à l'ouest : lit (on peut s'y tenir) ; à l'est : mur (autre pièce : Salle commune)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
VI .. ##
Li CO ##
.. Co ..
```

## 4. La Mine des Nains

### 4.1. l'affaire Bénédicte — coupable : Capucine

- **Pièce du crime** : Forge ; meubles de la pièce : enclume, chaudron, chariot de mine
- **Victime** (Bénédicte) : ligne 2, colonne 7, sur le sol nu
  - cases voisines : au nord : enclume ; au sud : case vide ; à l'ouest : case vide ; à l'est : chaudron
- **Coupable** (Capucine) : ligne 3, colonne 6, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : case vide ; à l'ouest : mur (autre pièce : Galerie) ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. En ..
.. VI Cd
CO .. ..
.. Cm ##
.. ## ##
```

### 4.2. l'affaire Chantefable — coupable : Granit

- **Pièce du crime** : Filon ; meubles de la pièce : champignon géant, enclume, chariot de mine
- **Victime** (Chantefable) : ligne 6, colonne 8, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : enclume ; à l'ouest : champignon géant (on peut s'y tenir) ; à l'est : bord de la carte
- **Coupable** (Granit) : ligne 7, colonne 7, sur le sol nu
  - cases voisines : au nord : champignon géant (on peut s'y tenir) ; au sud : chariot de mine ; à l'ouest : case vide ; à l'est : enclume
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## ## ..
## .. ..
.. Ch VI
.. CO En
.. Cm ..
```

### 4.3. l'affaire Ballot — coupable : Flammèche

- **Pièce du crime** : Filon ; meubles de la pièce : champignon géant, enclume, chariot de mine
- **Victime** (Ballot) : ligne 6, colonne 6, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Forge) ; au sud : case vide ; à l'ouest : mur (autre pièce : Cantine) ; à l'est : champignon géant (on peut s'y tenir)
- **Coupable** (Flammèche) : ligne 8, colonne 8, sur le sol nu
  - cases voisines : au nord : enclume ; au sud : bord de la carte ; à l'ouest : chariot de mine ; à l'est : bord de la carte
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## ## ..
## .. ..
VI Ch ..
.. .. En
.. Cm CO
```

### 4.4. l'affaire Ventrapat — coupable : Grisou

- **Pièce du crime** : Galerie ; meubles de la pièce : chariot de mine, statue
- **Victime** (Ventrapat) : ligne 4, colonne 5, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Cantine) ; à l'ouest : case vide ; à l'est : mur (autre pièce : Forge)
- **Coupable** (Grisou) : ligne 1, colonne 4, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : case vide ; à l'ouest : mur (autre pièce : Dortoir) ; à l'est : statue
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## CO St
## .. ..
.. Cm ..
.. .. VI
```

### 4.5. l'affaire Bulle — coupable : Flammèche

- **Pièce du crime** : Galerie ; meubles de la pièce : chariot de mine, statue
- **Victime** (Bulle) : ligne 1, colonne 4, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : case vide ; à l'ouest : mur (autre pièce : Dortoir) ; à l'est : statue
- **Coupable** (Flammèche) : ligne 3, colonne 5, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : case vide ; à l'ouest : chariot de mine ; à l'est : mur (autre pièce : Forge)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## VI St
## .. ..
.. Cm CO
.. .. ..
```

### 4.6. l'affaire Sangsuard — coupable : Grisou

- **Pièce du crime** : Galerie ; meubles de la pièce : chariot de mine, statue
- **Victime** (Sangsuard) : ligne 3, colonne 3, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Dortoir) ; au sud : case vide ; à l'ouest : mur (autre pièce : Dortoir) ; à l'est : chariot de mine
- **Coupable** (Grisou) : ligne 1, colonne 4, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : case vide ; à l'ouest : mur (autre pièce : Dortoir) ; à l'est : statue
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## CO St
## .. ..
VI Cm ..
.. .. ..
```

## 5. Le Moulin de Bois-Tordu

### 5.1. l'affaire Scholastique — coupable : Capucine

- **Pièce du crime** : Moulin ; meubles de la pièce : coffre, chaise, table
- **Victime** (Scholastique) : ligne 1, colonne 2, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : table ; à l'ouest : coffre ; à l'est : chaise (on peut s'y tenir)
- **Coupable** (Capucine) : ligne 3, colonne 3, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Verger) ; à l'ouest : mur (autre pièce : Verger) ; à l'est : mur (autre pièce : Grange)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
Co VI Ci
.. Ta ..
## ## CO
```

### 5.2. l'affaire Orpiment — coupable : Fernand

- **Pièce du crime** : Potager ; meubles de la pièce : statue, chaise
- **Victime** (Orpiment) : ligne 5, colonne 5, sur le sol nu
  - cases voisines : au nord : statue ; au sud : mur (autre pièce : Mare) ; à l'ouest : mur (autre pièce : Mare) ; à l'est : chaise (on peut s'y tenir)
- **Coupable** (Fernand) : ligne 4, colonne 4, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Grange) ; au sud : mur (autre pièce : Mare) ; à l'ouest : mur (autre pièce : Verger) ; à l'est : statue
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## .. ..
CO St ..
## VI Ci
## ## ..
```

### 5.3. l'affaire Ondine — coupable : Fernand

- **Pièce du crime** : Verger ; meubles de la pièce : arbre, champignon géant
- **Victime** (Ondine) : ligne 3, colonne 2, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Moulin) ; au sud : case vide ; à l'ouest : case vide ; à l'est : mur (autre pièce : Moulin)
- **Coupable** (Fernand) : ligne 5, colonne 1, sur le sol nu
  - cases voisines : au nord : arbre ; au sud : arbre ; à l'ouest : bord de la carte ; à l'est : champignon géant (on peut s'y tenir)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. VI ##
Ar .. ..
CO Ch ##
Ar ## ##
```

### 5.4. l'affaire Pressoux — coupable : Goémone

- **Pièce du crime** : Potager ; meubles de la pièce : statue, chaise
- **Victime** (Pressoux) : ligne 4, colonne 4, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Grange) ; au sud : mur (autre pièce : Mare) ; à l'ouest : mur (autre pièce : Verger) ; à l'est : statue
- **Coupable** (Goémone) : ligne 3, colonne 6, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Grange) ; au sud : case vide ; à l'ouest : case vide ; à l'est : bord de la carte
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## .. CO
VI St ..
## .. Ci
## ## ..
```

### 5.5. l'affaire Gaston — coupable : Fernand

- **Pièce du crime** : Potager ; meubles de la pièce : statue, chaise
- **Victime** (Gaston) : ligne 4, colonne 6, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : chaise (on peut s'y tenir) ; à l'ouest : statue ; à l'est : bord de la carte
- **Coupable** (Fernand) : ligne 5, colonne 5, sur le sol nu
  - cases voisines : au nord : statue ; au sud : mur (autre pièce : Mare) ; à l'ouest : mur (autre pièce : Mare) ; à l'est : chaise (on peut s'y tenir)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## .. ..
.. St VI
## CO Ci
## ## ..
```

### 5.6. l'affaire Mandolin — coupable : Capucine

- **Pièce du crime** : Moulin ; meubles de la pièce : coffre, chaise, table
- **Victime** (Mandolin) : ligne 2, colonne 1, sur le sol nu
  - cases voisines : au nord : coffre ; au sud : mur (autre pièce : Verger) ; à l'ouest : bord de la carte ; à l'est : table
- **Coupable** (Capucine) : ligne 3, colonne 3, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Verger) ; à l'ouest : mur (autre pièce : Verger) ; à l'est : mur (autre pièce : Grange)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
Co .. Ci
VI Ta ..
## ## CO
```

## 6. La Bibliothèque Interdite

### 6.1. l'affaire Hildegarde — coupable : Blafard

- **Pièce du crime** : Scriptorium ; meubles de la pièce : pupitre, fauteuil, table
- **Victime** (Hildegarde) : ligne 1, colonne 1, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : case vide ; à l'ouest : bord de la carte ; à l'est : pupitre
- **Coupable** (Blafard) : ligne 3, colonne 2, **sur le fauteuil**
  - cases voisines : au nord : case vide ; au sud : case vide ; à l'ouest : case vide ; à l'est : mur (autre pièce : Salle de lecture)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
VI Pu ..
.. .. Pu
.. CO ##
Ta .. ##
```

### 6.2. l'affaire Hautecuisse — coupable : Belladone

- **Pièce du crime** : Rayonnages ; meubles de la pièce : étagère
- **Victime** (Hautecuisse) : ligne 1, colonne 4, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : case vide ; à l'ouest : mur (autre pièce : Scriptorium) ; à l'est : étagère
- **Coupable** (Belladone) : ligne 2, colonne 5, sur le sol nu
  - cases voisines : au nord : étagère ; au sud : mur (autre pièce : Salle de lecture) ; à l'ouest : case vide ; à l'est : étagère
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
VI Et .. Et
.. CO Et ..
```

### 6.3. l'affaire Badaud — coupable : Dewey

- **Pièce du crime** : Salle de lecture ; meubles de la pièce : table, chaise
- **Victime** (Badaud) : ligne 4, colonne 3, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : case vide ; à l'ouest : mur (autre pièce : Scriptorium) ; à l'est : table
- **Coupable** (Dewey) : ligne 3, colonne 4, **sur la chaise**
  - cases voisines : au nord : mur (autre pièce : Rayonnages) ; au sud : table ; à l'ouest : case vide ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. CO ..
VI Ta ..
.. Ci ..
```

### 6.4. l'affaire Refrain — coupable : Gribouille

- **Pièce du crime** : Scriptorium ; meubles de la pièce : pupitre, fauteuil, table
- **Victime** (Refrain) : ligne 4, colonne 2, sur le sol nu
  - cases voisines : au nord : fauteuil (on peut s'y tenir) ; au sud : mur (autre pièce : Réserve) ; à l'ouest : table ; à l'est : mur (autre pièce : Salle de lecture)
- **Coupable** (Gribouille) : ligne 1, colonne 1, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : case vide ; à l'ouest : bord de la carte ; à l'est : pupitre
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
CO Pu ..
.. .. Pu
.. Fa ##
Ta VI ##
```

### 6.5. l'affaire Soldeur — coupable : Belladone

- **Pièce du crime** : Archives ; meubles de la pièce : statue, fauteuil, étagère, coffre, boule de cristal
- **Victime** (Soldeur) : ligne 5, colonne 7, sur le sol nu
  - cases voisines : au nord : statue ; au sud : case vide ; à l'ouest : case vide ; à l'est : bord de la carte
- **Coupable** (Belladone) : ligne 4, colonne 6, sur le sol nu
  - cases voisines : au nord : fauteuil (on peut s'y tenir) ; au sud : case vide ; à l'ouest : mur (autre pièce : Salle de lecture) ; à l'est : statue
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## ## Fa ..
## ## CO St
## ## .. VI
.. Et .. ..
Cr .. Co ..
```

### 6.6. l'affaire Ermengarde — coupable : Cendrebrune

- **Pièce du crime** : Rayonnages ; meubles de la pièce : étagère
- **Victime** (Ermengarde) : ligne 1, colonne 6, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : étagère ; à l'ouest : étagère ; à l'est : étagère
- **Coupable** (Cendrebrune, 2 cases) : ligne 2, colonne 4, sur le sol nu ; ligne 2, colonne 5, sur le sol nu
  - cases voisines : au nord de la case 2,4 : case vide ; au sud : mur (autre pièce : Salle de lecture) ; à l'ouest : mur (autre pièce : Scriptorium) ; au nord de la case 2,5 : étagère ; au sud : mur (autre pièce : Salle de lecture) ; à l'est de la case 2,5 : étagère
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. Et VI Et
CO CO Et ..
```

## 7. La Forge du Dragon

### 7.1. l'affaire Ostentine — coupable : Bakchich

- **Pièce du crime** : Fonderie ; meubles de la pièce : chaudron, chariot de mine, tonneau
- **Victime** (Ostentine) : ligne 4, colonne 2, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Antre du dragon) ; au sud : case vide ; à l'ouest : chariot de mine ; à l'est : case vide
- **Coupable** (Bakchich) : ligne 5, colonne 3, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Cour) ; à l'ouest : case vide ; à l'est : chariot de mine
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## ## Cd ..
Cm VI .. ..
.. .. CO Cm
To ## ## ##
```

### 7.2. l'affaire Trimballe — coupable : Grisou

- **Pièce du crime** : Atelier ; meubles de la pièce : table, chaise, enclume
- **Victime** (Trimballe) : ligne 7, colonne 7, sur le sol nu
  - cases voisines : au nord : enclume ; au sud : bord de la carte ; à l'ouest : case vide ; à l'est : bord de la carte
- **Coupable** (Grisou) : ligne 4, colonne 5, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Forge) ; au sud : chaise (on peut s'y tenir) ; à l'ouest : mur (autre pièce : Fonderie) ; à l'est : table
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
CO Ta ##
Ci .. ..
.. .. En
## .. VI
```

### 7.3. l'affaire Gondeberge — coupable : Grisou

- **Pièce du crime** : Atelier ; meubles de la pièce : table, chaise, enclume
- **Victime** (Gondeberge) : ligne 6, colonne 5, sur le sol nu
  - cases voisines : au nord : chaise (on peut s'y tenir) ; au sud : mur (autre pièce : Cour) ; à l'ouest : mur (autre pièce : Cour) ; à l'est : case vide
- **Coupable** (Grisou) : ligne 5, colonne 6, sur le sol nu
  - cases voisines : au nord : table ; au sud : case vide ; à l'ouest : chaise (on peut s'y tenir) ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. Ta ##
Ci CO ..
VI .. En
## .. ..
```

### 7.4. l'affaire Gabelou — coupable : Gontran

- **Pièce du crime** : Cour ; meubles de la pièce : arbre, tonneau
- **Victime** (Gabelou) : ligne 7, colonne 5, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Atelier) ; au sud : bord de la carte ; à l'ouest : case vide ; à l'est : mur (autre pièce : Atelier)
- **Coupable** (Gontran) : ligne 6, colonne 4, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Fonderie) ; au sud : case vide ; à l'ouest : tonneau ; à l'est : mur (autre pièce : Atelier)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## .. To CO ##
Ar .. .. .. VI
```

### 7.5. l'affaire Trottin — coupable : Caillasse

- **Pièce du crime** : Antre du dragon ; meubles de la pièce : coffre, lit
- **Victime** (Trottin) : ligne 1, colonne 3, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : mur (autre pièce : Forge) ; à l'ouest : case vide ; à l'est : mur (autre pièce : Forge)
- **Coupable** (Caillasse, 2 cases) : ligne 3, colonne 1, sur le sol nu ; ligne 3, colonne 2, sur le sol nu
  - cases voisines : au nord de la case 3,1 : case vide ; au sud : mur (autre pièce : Fonderie) ; à l'ouest : bord de la carte ; au nord de la case 3,2 : lit (on peut s'y tenir) ; au sud : mur (autre pièce : Fonderie) ; à l'est : mur (autre pièce : Fonderie)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
Co .. VI
.. Li ##
CO CO ##
```

### 7.6. l'affaire Flânard — coupable : Cendrebrune

- **Pièce du crime** : Atelier ; meubles de la pièce : table, chaise, enclume
- **Victime** (Flânard) : ligne 4, colonne 5, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Forge) ; au sud : chaise (on peut s'y tenir) ; à l'ouest : mur (autre pièce : Fonderie) ; à l'est : table
- **Coupable** (Cendrebrune, 2 cases) : ligne 7, colonne 6, sur le sol nu ; ligne 7, colonne 7, sur le sol nu
  - cases voisines : au nord de la case 7,6 : case vide ; au sud : bord de la carte ; à l'ouest : mur (autre pièce : Cour) ; au nord de la case 7,7 : enclume ; au sud : bord de la carte ; à l'est : bord de la carte
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
VI Ta ##
Ci .. ..
.. .. En
## CO CO
```

## 8. La Ferme Hantée

### 8.1. l'affaire Austérine — coupable : Briochon

- **Pièce du crime** : Potager ; meubles de la pièce : arbre, champignon géant, statue
- **Victime** (Austérine) : ligne 5, colonne 3, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : champignon géant (on peut s'y tenir) ; à l'ouest : mur (autre pièce : Fournil) ; à l'est : case vide
- **Coupable** (Briochon) : ligne 6, colonne 4, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : bord de la carte ; à l'ouest : champignon géant (on peut s'y tenir) ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## ## .. ##
## .. Ar ..
## VI .. St
.. Ch CO ..
```

### 8.2. l'affaire Salpêtre — coupable : Bâfrin

- **Pièce du crime** : Grange ; meubles de la pièce : botte de foin, tonneau
- **Victime** (Salpêtre) : ligne 1, colonne 2, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : case vide ; à l'ouest : botte de foin ; à l'est : tonneau
- **Coupable** (Bâfrin) : ligne 3, colonne 3, sur le sol nu
  - cases voisines : au nord : botte de foin ; au sud : mur (autre pièce : Potager) ; à l'ouest : mur (autre pièce : Fournil) ; à l'est : mur (autre pièce : Potager)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
Fo VI To
.. .. Fo
## ## CO
```

### 8.3. l'affaire Morgueline — coupable : Fernand

- **Pièce du crime** : Grange ; meubles de la pièce : botte de foin, tonneau
- **Victime** (Morgueline) : ligne 2, colonne 1, sur le sol nu
  - cases voisines : au nord : botte de foin ; au sud : mur (autre pièce : Fournil) ; à l'ouest : bord de la carte ; à l'est : case vide
- **Coupable** (Fernand) : ligne 3, colonne 3, sur le sol nu
  - cases voisines : au nord : botte de foin ; au sud : mur (autre pièce : Potager) ; à l'ouest : mur (autre pièce : Fournil) ; à l'est : mur (autre pièce : Potager)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
Fo .. To
VI .. Fo
## ## CO
```

### 8.4. l'affaire Épine — coupable : Farinard

- **Pièce du crime** : Potager ; meubles de la pièce : arbre, champignon géant, statue
- **Victime** (Épine) : ligne 5, colonne 4, sur le sol nu
  - cases voisines : au nord : arbre ; au sud : case vide ; à l'ouest : case vide ; à l'est : statue
- **Coupable** (Farinard) : ligne 4, colonne 3, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Grange) ; au sud : case vide ; à l'ouest : mur (autre pièce : Fournil) ; à l'est : arbre
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## ## .. ##
## CO Ar ..
## .. VI St
.. Ch .. ..
```

### 8.5. l'affaire Bricabrac — coupable : Capucine

- **Pièce du crime** : Potager ; meubles de la pièce : arbre, champignon géant, statue
- **Victime** (Bricabrac) : ligne 6, colonne 4, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : bord de la carte ; à l'ouest : champignon géant (on peut s'y tenir) ; à l'est : case vide
- **Coupable** (Capucine) : ligne 4, colonne 3, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Grange) ; au sud : case vide ; à l'ouest : mur (autre pièce : Fournil) ; à l'est : arbre
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## ## .. ##
## CO Ar ..
## .. .. St
.. Ch VI ..
```

### 8.6. l'affaire Pastourel — coupable : Bâfrin

- **Pièce du crime** : Potager ; meubles de la pièce : arbre, champignon géant, statue
- **Victime** (Pastourel) : ligne 4, colonne 3, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Grange) ; au sud : case vide ; à l'ouest : mur (autre pièce : Fournil) ; à l'est : arbre
- **Coupable** (Bâfrin) : ligne 6, colonne 5, sur le sol nu
  - cases voisines : au nord : statue ; au sud : bord de la carte ; à l'ouest : case vide ; à l'est : mur (autre pièce : Poulailler)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## ## .. ##
## VI Ar ..
## .. .. St
.. Ch .. CO
```

## 9. Le Marais des Brumes

### 9.1. l'affaire Ombeline — coupable : Ambroise

- **Pièce du crime** : Ponton ; meubles de la pièce : barque, tonneau
- **Victime** (Ombeline) : ligne 1, colonne 6, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : mur (autre pièce : Roselière) ; à l'ouest : barque (on peut s'y tenir) ; à l'est : bord de la carte
- **Coupable** (Ambroise) : ligne 3, colonne 3, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Îlot) ; à l'ouest : mur (autre pièce : Îlot) ; à l'est : mur (autre pièce : Roselière)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## .. Ba VI
.. To ## ##
CO ## ## ##
```

### 9.2. l'affaire Inventorin — coupable : Bâfrin

- **Pièce du crime** : Tourbière ; meubles de la pièce : champignon géant, arbre, massif de roseaux
- **Victime** (Inventorin) : ligne 6, colonne 3, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : bord de la carte ; à l'ouest : case vide ; à l'est : case vide
- **Coupable** (Bâfrin) : ligne 4, colonne 5, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Roselière) ; au sud : case vide ; à l'ouest : mur (autre pièce : Roselière) ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## ## ## CO ..
## .. Ro .. Ar
.. VI .. Ch ..
```

### 9.3. l'affaire Barrique — coupable : Goémone

- **Pièce du crime** : Îlot ; meubles de la pièce : arbre, champignon géant
- **Victime** (Barrique) : ligne 4, colonne 3, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Ponton) ; au sud : mur (autre pièce : Tourbière) ; à l'ouest : arbre ; à l'est : mur (autre pièce : Roselière)
- **Coupable** (Goémone) : ligne 6, colonne 1, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : bord de la carte ; à l'ouest : bord de la carte ; à l'est : mur (autre pièce : Tourbière)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
Ch .. ##
.. Ar VI
.. .. ##
CO ## ##
```

### 9.4. l'affaire Relais — coupable : Ambroise

- **Pièce du crime** : Tourbière ; meubles de la pièce : champignon géant, arbre, massif de roseaux
- **Victime** (Relais) : ligne 6, colonne 6, sur le sol nu
  - cases voisines : au nord : arbre ; au sud : bord de la carte ; à l'ouest : champignon géant (on peut s'y tenir) ; à l'est : bord de la carte
- **Coupable** (Ambroise) : ligne 5, colonne 5, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : champignon géant (on peut s'y tenir) ; à l'ouest : massif de roseaux ; à l'est : arbre
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## ## ## .. ..
## .. Ro CO Ar
.. .. .. Ch VI
```

### 9.5. l'affaire Noyelle — coupable : Goémone

- **Pièce du crime** : Tourbière ; meubles de la pièce : champignon géant, arbre, massif de roseaux
- **Victime** (Noyelle) : ligne 5, colonne 5, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : champignon géant (on peut s'y tenir) ; à l'ouest : massif de roseaux ; à l'est : arbre
- **Coupable** (Goémone) : ligne 6, colonne 3, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : bord de la carte ; à l'ouest : case vide ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## ## ## .. ..
## .. Ro VI Ar
.. CO .. Ch ..
```

### 9.6. l'affaire Liardin — coupable : Goémone

- **Pièce du crime** : Tourbière ; meubles de la pièce : champignon géant, arbre, massif de roseaux
- **Victime** (Liardin) : ligne 4, colonne 5, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Roselière) ; au sud : case vide ; à l'ouest : mur (autre pièce : Roselière) ; à l'est : case vide
- **Coupable** (Goémone) : ligne 6, colonne 4, sur le sol nu
  - cases voisines : au nord : massif de roseaux ; au sud : bord de la carte ; à l'ouest : case vide ; à l'est : champignon géant (on peut s'y tenir)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## ## ## VI ..
## .. Ro .. Ar
.. .. CO Ch ..
```

## 10. L'Académie de Magie

### 10.1. l'affaire Ursule — coupable : Gribouille

- **Pièce du crime** : Dortoir ; meubles de la pièce : boule de cristal, fauteuil, lit, coffre
- **Victime** (Ursule) : ligne 3, colonne 2, sur le sol nu
  - cases voisines : au nord : fauteuil (on peut s'y tenir) ; au sud : coffre ; à l'ouest : lit (on peut s'y tenir) ; à l'est : mur (autre pièce : Salle de cours)
- **Coupable** (Gribouille) : ligne 4, colonne 1, sur le sol nu
  - cases voisines : au nord : lit (on peut s'y tenir) ; au sud : lit (on peut s'y tenir) ; à l'ouest : bord de la carte ; à l'est : coffre
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
Cr ..
.. Fa
Li VI
CO Co
Li ..
```

### 10.2. l'affaire Grisemotte — coupable : Gribouille

- **Pièce du crime** : Réfectoire ; meubles de la pièce : table, chaise
- **Victime** (Grisemotte) : ligne 5, colonne 5, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : case vide ; à l'ouest : case vide ; à l'est : mur (autre pièce : Laboratoire)
- **Coupable** (Gribouille) : ligne 4, colonne 3, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Salle de cours) ; au sud : chaise (on peut s'y tenir) ; à l'ouest : mur (autre pièce : Dortoir) ; à l'est : table
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
CO Ta .. ## ##
Ci .. VI ## ##
## .. .. .. ##
## ## .. .. ..
```

### 10.3. l'affaire Azotin — coupable : Brindille

- **Pièce du crime** : Salle de cours ; meubles de la pièce : pupitre
- **Victime** (Azotin) : ligne 2, colonne 4, sur le sol nu
  - cases voisines : au nord : pupitre ; au sud : case vide ; à l'ouest : pupitre ; à l'est : pupitre
- **Coupable** (Brindille) : ligne 3, colonne 3, sur le sol nu
  - cases voisines : au nord : pupitre ; au sud : mur (autre pièce : Réfectoire) ; à l'ouest : mur (autre pièce : Dortoir) ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. Pu ..
Pu VI Pu
CO .. ..
```

### 10.4. l'affaire Ponctionnin — coupable : Brindille

- **Pièce du crime** : Réfectoire ; meubles de la pièce : table, chaise
- **Victime** (Ponctionnin) : ligne 5, colonne 4, sur le sol nu
  - cases voisines : au nord : table ; au sud : case vide ; à l'ouest : chaise (on peut s'y tenir) ; à l'est : case vide
- **Coupable** (Brindille) : ligne 4, colonne 5, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Salle de cours) ; au sud : case vide ; à l'ouest : table ; à l'est : mur (autre pièce : Laboratoire)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. Ta CO ## ##
Ci VI .. ## ##
## .. .. .. ##
## ## .. .. ..
```

### 10.5. l'affaire Chiffonnet — coupable : Brindille

- **Pièce du crime** : Laboratoire ; meubles de la pièce : fauteuil, étagère, chaudron, table
- **Victime** (Chiffonnet) : ligne 1, colonne 7, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : étagère ; à l'ouest : fauteuil (on peut s'y tenir) ; à l'est : bord de la carte
- **Coupable** (Brindille) : ligne 2, colonne 6, sur le sol nu
  - cases voisines : au nord : fauteuil (on peut s'y tenir) ; au sud : case vide ; à l'ouest : mur (autre pièce : Salle de cours) ; à l'est : étagère
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
Fa VI
CO Et
.. Cd
Et ..
.. Ta
## ..
```

### 10.6. l'affaire Sifflette — coupable : Escabeau

- **Pièce du crime** : Réfectoire ; meubles de la pièce : table, chaise
- **Victime** (Sifflette) : ligne 7, colonne 6, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : bord de la carte ; à l'ouest : case vide ; à l'est : case vide
- **Coupable** (Escabeau, 2 cases) : ligne 5, colonne 4, sur le sol nu ; ligne 5, colonne 5, sur le sol nu
  - cases voisines : au nord de la case 5,4 : table ; au sud de la case 5,4 : case vide ; à l'ouest de la case 5,4 : chaise (on peut s'y tenir) ; au nord de la case 5,5 : case vide ; au sud de la case 5,5 : case vide ; à l'est : mur (autre pièce : Laboratoire)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. Ta .. ## ##
Ci CO CO ## ##
## .. .. .. ##
## ## .. VI ..
```

## 11. La Citadelle de Mortebrune

### 11.1. l'affaire Sobriété — coupable : Fausset

- **Pièce du crime** : Cour d'honneur ; meubles de la pièce : statue, chariot de mine
- **Victime** (Sobriété) : ligne 4, colonne 4, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Jardin) ; à l'ouest : mur (autre pièce : Armurerie) ; à l'est : chariot de mine
- **Coupable** (Fausset) : ligne 2, colonne 5, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : case vide ; à l'ouest : case vide ; à l'est : statue
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. .. .. ..
.. CO St ..
.. .. .. ..
VI Cm .. ..
```

### 11.2. l'affaire Toutvend — coupable : Blafard

- **Pièce du crime** : Jardin ; meubles de la pièce : arbre, champignon géant
- **Victime** (Toutvend) : ligne 6, colonne 4, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : case vide ; à l'ouest : mur (autre pièce : Armurerie) ; à l'est : case vide
- **Coupable** (Blafard) : ligne 5, colonne 6, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Cour d'honneur) ; au sud : arbre ; à l'ouest : case vide ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. .. CO .. Ch
VI .. Ar .. ..
.. .. .. .. ..
```

### 11.3. l'affaire Clotilde — coupable : Ciguë

- **Pièce du crime** : Jardin ; meubles de la pièce : arbre, champignon géant
- **Victime** (Clotilde) : ligne 5, colonne 7, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Cour d'honneur) ; au sud : case vide ; à l'ouest : case vide ; à l'est : champignon géant (on peut s'y tenir)
- **Coupable** (Ciguë) : ligne 6, colonne 4, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : case vide ; à l'ouest : mur (autre pièce : Armurerie) ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. .. .. VI Ch
CO .. Ar .. ..
.. .. .. .. ..
```

### 11.4. l'affaire Bastringue — coupable : Gontran

- **Pièce du crime** : Jardin ; meubles de la pièce : arbre, champignon géant
- **Victime** (Bastringue) : ligne 6, colonne 7, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : case vide ; à l'ouest : arbre ; à l'est : case vide
- **Coupable** (Gontran) : ligne 7, colonne 5, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Salle du trône) ; à l'ouest : case vide ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. .. .. .. Ch
.. .. Ar VI ..
.. CO .. .. ..
```

### 11.5. l'affaire Fumagal — coupable : Ciguë

- **Pièce du crime** : Jardin ; meubles de la pièce : arbre, champignon géant
- **Victime** (Fumagal) : ligne 7, colonne 6, sur le sol nu
  - cases voisines : au nord : arbre ; au sud : mur (autre pièce : Salle du trône) ; à l'ouest : case vide ; à l'est : case vide
- **Coupable** (Ciguë) : ligne 6, colonne 5, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : case vide ; à l'ouest : case vide ; à l'est : arbre
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. .. .. .. Ch
.. CO Ar .. ..
.. .. VI .. ..
```

### 11.6. l'affaire Blâmard — coupable : Blafard

- **Pièce du crime** : Jardin ; meubles de la pièce : arbre, champignon géant
- **Victime** (Blâmard) : ligne 7, colonne 7, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Salle du trône) ; à l'ouest : case vide ; à l'est : case vide
- **Coupable** (Blafard) : ligne 6, colonne 4, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : case vide ; à l'ouest : mur (autre pièce : Armurerie) ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. .. .. .. Ch
CO .. Ar .. ..
.. .. .. VI ..
```

### 11.7. l'affaire Galopin — coupable : Bakchich

- **Pièce du crime** : Jardin ; meubles de la pièce : arbre, champignon géant
- **Victime** (Galopin) : ligne 7, colonne 8, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Salle du trône) ; à l'ouest : case vide ; à l'est : mur (autre pièce : Salle du trône)
- **Coupable** (Bakchich) : ligne 6, colonne 4, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : case vide ; à l'ouest : mur (autre pièce : Armurerie) ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. .. .. .. Ch
CO .. Ar .. ..
.. .. .. .. VI
```

## 12. La Foire aux Sortilèges

### 12.1. l'affaire Pénitence — coupable : Clairvoya

- **Pièce du crime** : Coulisses ; meubles de la pièce : lit, coffre, statue
- **Victime** (Pénitence) : ligne 3, colonne 2, sur le sol nu
  - cases voisines : au nord : coffre ; au sud : statue ; à l'ouest : coffre ; à l'est : mur (autre pièce : Chapiteau)
- **Coupable** (Clairvoya) : ligne 4, colonne 1, sur le sol nu
  - cases voisines : au nord : coffre ; au sud : mur (autre pièce : Manège) ; à l'ouest : bord de la carte ; à l'est : statue
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
Li ..
.. Co
Co VI
CO St
```

### 12.2. l'affaire Clinquante — coupable : Fausset

- **Pièce du crime** : Chapiteau ; meubles de la pièce : tapis, boule de cristal, chaudron
- **Victime** (Clinquante) : ligne 3, colonne 4, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Stands) ; au sud : tapis (on peut s'y tenir) ; à l'ouest : case vide ; à l'est : boule de cristal
- **Coupable** (Fausset) : ligne 5, colonne 3, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Manège) ; à l'ouest : mur (autre pièce : Manège) ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. VI Cr ..
.. Tp .. ..
CO .. .. Cd
## .. .. ##
## .. .. ##
```

### 12.3. l'affaire Visitin — coupable : Fausset

- **Pièce du crime** : Stands ; meubles de la pièce : table, tonneau
- **Victime** (Visitin) : ligne 2, colonne 4, sur le sol nu
  - cases voisines : au nord : table ; au sud : mur (autre pièce : Chapiteau) ; à l'ouest : case vide ; à l'est : tonneau
- **Coupable** (Fausset) : ligne 1, colonne 3, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : case vide ; à l'ouest : mur (autre pièce : Coulisses) ; à l'est : table
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
CO Ta ..
.. VI To
```

### 12.4. l'affaire Antimoine — coupable : Clairvoya

- **Pièce du crime** : Chapiteau ; meubles de la pièce : tapis, boule de cristal, chaudron
- **Victime** (Antimoine) : ligne 3, colonne 3, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Stands) ; au sud : case vide ; à l'ouest : mur (autre pièce : Coulisses) ; à l'est : case vide
- **Coupable** (Clairvoya) : ligne 7, colonne 5, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : bord de la carte ; à l'ouest : case vide ; à l'est : mur (autre pièce : Ménagerie)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
VI .. Cr ..
.. Tp .. ..
.. .. .. Cd
## .. .. ##
## .. CO ##
```

### 12.5. l'affaire Fiscalin — coupable : Capucine

- **Pièce du crime** : Coulisses ; meubles de la pièce : lit, coffre, statue
- **Victime** (Fiscalin) : ligne 1, colonne 2, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : coffre ; à l'ouest : lit (on peut s'y tenir) ; à l'est : mur (autre pièce : Stands)
- **Coupable** (Capucine) : ligne 4, colonne 1, sur le sol nu
  - cases voisines : au nord : coffre ; au sud : mur (autre pièce : Manège) ; à l'ouest : bord de la carte ; à l'est : statue
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
Li VI
.. Co
Co ..
CO St
```

### 12.6. l'affaire Marchandin — coupable : Fausset

- **Pièce du crime** : Ménagerie ; meubles de la pièce : tonneau, chaise, botte de foin
- **Victime** (Marchandin) : ligne 4, colonne 7, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : botte de foin ; à l'ouest : mur (autre pièce : Chapiteau) ; à l'est : bord de la carte
- **Coupable** (Fausset) : ligne 1, colonne 6, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : chaise (on peut s'y tenir) ; à l'ouest : mur (autre pièce : Stands) ; à l'est : tonneau
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
CO To
Ci ..
## ..
## VI
## Fo
.. ..
.. To
```

### 12.7. l'affaire Sanguine — coupable : Escabeau

- **Pièce du crime** : Chapiteau ; meubles de la pièce : tapis, boule de cristal, chaudron
- **Victime** (Sanguine) : ligne 7, colonne 4, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : bord de la carte ; à l'ouest : mur (autre pièce : Manège) ; à l'est : case vide
- **Coupable** (Escabeau, 2 cases) : ligne 4, colonne 3, sur le sol nu ; ligne 5, colonne 3, sur le sol nu
  - cases voisines : au nord de la case 4,3 : case vide ; à l'ouest : mur (autre pièce : Coulisses) ; à l'est de la case 4,3 : tapis (on peut s'y tenir) ; au sud : mur (autre pièce : Manège) ; à l'ouest : mur (autre pièce : Manège) ; à l'est de la case 5,3 : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. .. Cr ..
CO Tp .. ..
CO .. .. Cd
## .. .. ##
## VI .. ##
```

## 13. Le Cimetière de Minuit

### 13.1. l'affaire Expulsin — coupable : Glas

- **Pièce du crime** : Ossuaire ; meubles de la pièce : tombe
- **Victime** (Expulsin) : ligne 8, colonne 8, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : bord de la carte ; à l'ouest : case vide ; à l'est : bord de la carte
- **Coupable** (Glas) : ligne 5, colonne 7, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Chapelle) ; au sud : tombe ; à l'ouest : case vide ; à l'est : mur (autre pièce : Chapelle)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. CO ##
.. Tb ..
.. .. ..
Tb .. VI
```

### 13.2. l'affaire Griffette — coupable : Ciguë

- **Pièce du crime** : Chapelle ; meubles de la pièce : statue, pupitre, sarcophage
- **Victime** (Griffette) : ligne 3, colonne 7, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : sarcophage ; à l'ouest : mur (autre pièce : Allée des ifs) ; à l'est : sarcophage
- **Coupable** (Ciguë) : ligne 2, colonne 8, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : sarcophage ; à l'ouest : case vide ; à l'est : bord de la carte
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. St ..
Pu .. CO
## VI Sa
## Sa ..
## ## ..
```

### 13.3. l'affaire Furtif — coupable : Glas

- **Pièce du crime** : Allée des ifs ; meubles de la pièce : arbre, tombe
- **Victime** (Furtif) : ligne 3, colonne 6, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Chapelle) ; au sud : arbre ; à l'ouest : case vide ; à l'est : mur (autre pièce : Chapelle)
- **Coupable** (Glas) : ligne 2, colonne 4, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : arbre ; à l'ouest : mur (autre pièce : Maison du gardien) ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## .. Tb ##
## CO .. ##
.. Ar .. VI
.. .. .. Ar
```

### 13.4. l'affaire Curiosus — coupable : Augure

- **Pièce du crime** : Chapelle ; meubles de la pièce : statue, pupitre, sarcophage
- **Victime** (Curiosus) : ligne 1, colonne 6, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : pupitre ; à l'ouest : mur (autre pièce : Allée des ifs) ; à l'est : statue
- **Coupable** (Augure) : ligne 5, colonne 8, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Ossuaire) ; à l'ouest : mur (autre pièce : Ossuaire) ; à l'est : bord de la carte
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
VI St ..
Pu .. ..
## .. Sa
## Sa ..
## ## CO
```

### 13.5. l'affaire Radegonde — coupable : Glas

- **Pièce du crime** : Crypte ; meubles de la pièce : sarcophage
- **Victime** (Radegonde) : ligne 6, colonne 1, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Maison du gardien) ; au sud : case vide ; à l'ouest : bord de la carte ; à l'est : case vide
- **Coupable** (Glas) : ligne 8, colonne 2, sur le sol nu
  - cases voisines : au nord : sarcophage ; au sud : bord de la carte ; à l'ouest : case vide ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
VI .. ## ##
.. Sa ## ##
.. CO .. Sa
```

### 13.6. l'affaire Aurifex — coupable : Glas

- **Pièce du crime** : Allée des ifs ; meubles de la pièce : arbre, tombe
- **Victime** (Aurifex) : ligne 1, colonne 4, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : case vide ; à l'ouest : mur (autre pièce : Maison du gardien) ; à l'est : tombe
- **Coupable** (Glas) : ligne 3, colonne 3, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Maison du gardien) ; au sud : case vide ; à l'ouest : mur (autre pièce : Maison du gardien) ; à l'est : arbre
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## VI Tb ##
## .. .. ##
CO Ar .. ..
.. .. .. Ar
```

### 13.7. l'affaire Ronce — coupable : Glas

- **Pièce du crime** : Maison du gardien ; meubles de la pièce : lit, table, tombe
- **Victime** (Ronce) : ligne 1, colonne 2, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : table ; à l'ouest : lit (on peut s'y tenir) ; à l'est : case vide
- **Coupable** (Glas) : ligne 4, colonne 1, sur le sol nu
  - cases voisines : au nord : tombe ; au sud : case vide ; à l'ouest : bord de la carte ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
Li VI ..
.. Ta ..
Tb .. ##
CO .. ##
.. Tb ##
```

## 14. L'Université des Sortilèges

### 14.1. l'affaire Athanor — coupable : Brindille

- **Pièce du crime** : Dortoir ; meubles de la pièce : lit
- **Victime** (Athanor) : ligne 5, colonne 4, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : case vide ; à l'ouest : case vide ; à l'est : mur (autre pièce : Cour)
- **Coupable** (Brindille) : ligne 4, colonne 3, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Amphithéâtre) ; au sud : case vide ; à l'ouest : case vide ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
Li .. CO ..
.. .. .. VI
.. .. Li ..
```

### 14.2. l'affaire Sirotin — coupable : Fiolius

- **Pièce du crime** : Cour ; meubles de la pièce : statue, arbre
- **Victime** (Sirotin) : ligne 6, colonne 5, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : arbre ; à l'ouest : mur (autre pièce : Dortoir) ; à l'est : statue
- **Coupable** (Fiolius) : ligne 7, colonne 8, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : case vide ; à l'ouest : case vide ; à l'est : mur (autre pièce : Laboratoire)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## .. .. .. St
## VI St .. ..
.. Ar .. .. CO
.. .. .. .. ..
```

### 14.3. l'affaire Breloquin — coupable : Fiolius

- **Pièce du crime** : Grande bibliothèque ; meubles de la pièce : étagère, fauteuil, tapis
- **Victime** (Breloquin) : ligne 4, colonne 6, sur le sol nu
  - cases voisines : au nord : fauteuil (on peut s'y tenir) ; au sud : mur (autre pièce : Cour) ; à l'ouest : case vide ; à l'est : tapis (on peut s'y tenir)
- **Coupable** (Fiolius) : ligne 2, colonne 5, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : case vide ; à l'ouest : mur (autre pièce : Amphithéâtre) ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. Et .. ..
CO .. .. Et
.. Fa .. ..
.. VI Tp ..
```

### 14.4. l'affaire Bouée — coupable : Fumerolle

- **Pièce du crime** : Grande bibliothèque ; meubles de la pièce : étagère, fauteuil, tapis
- **Victime** (Bouée) : ligne 2, colonne 6, sur le sol nu
  - cases voisines : au nord : étagère ; au sud : fauteuil (on peut s'y tenir) ; à l'ouest : case vide ; à l'est : case vide
- **Coupable** (Fumerolle) : ligne 4, colonne 5, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Cour) ; à l'ouest : mur (autre pièce : Dortoir) ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. Et .. ..
.. VI .. Et
.. Fa .. ..
CO .. Tp ..
```

### 14.5. l'affaire Péageon — coupable : Dewey

- **Pièce du crime** : Cour ; meubles de la pièce : statue, arbre
- **Victime** (Péageon) : ligne 5, colonne 6, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Grande bibliothèque) ; au sud : statue ; à l'ouest : case vide ; à l'est : case vide
- **Coupable** (Dewey) : ligne 8, colonne 8, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Salle des duels) ; à l'ouest : case vide ; à l'est : mur (autre pièce : Observatoire)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## .. VI .. St
## .. St .. ..
.. Ar .. .. ..
.. .. .. .. CO
```

### 14.6. l'affaire Éperon — coupable : Fiolius

- **Pièce du crime** : Grande bibliothèque ; meubles de la pièce : étagère, fauteuil, tapis
- **Victime** (Éperon) : ligne 3, colonne 8, sur le sol nu
  - cases voisines : au nord : étagère ; au sud : case vide ; à l'ouest : case vide ; à l'est : mur (autre pièce : Serre)
- **Coupable** (Fiolius) : ligne 4, colonne 5, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Cour) ; à l'ouest : mur (autre pièce : Dortoir) ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. Et .. ..
.. .. .. Et
.. Fa .. VI
CO .. Tp ..
```

### 14.7. l'affaire Gobetout — coupable : Brindille

- **Pièce du crime** : Observatoire ; meubles de la pièce : boule de cristal, tapis
- **Victime** (Gobetout) : ligne 8, colonne 11, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Laboratoire) ; au sud : case vide ; à l'ouest : boule de cristal ; à l'est : bord de la carte
- **Coupable** (Brindille) : ligne 9, colonne 10, sur le sol nu
  - cases voisines : au nord : boule de cristal ; au sud : case vide ; à l'ouest : case vide ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. Cr VI
.. CO ..
.. .. Tp
.. .. ..
```

## 15. La Tour de l'Archimage

### 15.1. l'affaire Soufrius — coupable : Blafard

- **Pièce du crime** : Laboratoire ; meubles de la pièce : portail runique, chaudron
- **Victime** (Soufrius) : ligne 1, colonne 3, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : case vide ; à l'ouest : case vide ; à l'est : mur (autre pièce : Observatoire)
- **Coupable** (Blafard) : ligne 6, colonne 5, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Crypte) ; au sud : mur (autre pièce : Crypte) ; à l'ouest : mur (autre pièce : Crypte) ; à l'est : mur (autre pièce : Jardin)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
Po .. VI
.. Cd ..
.. .. ##
```

### 15.2. l'affaire Belette — coupable : Flammèche

- **Pièce du crime** : Bibliothèque ; meubles de la pièce : étagère, tapis
- **Victime** (Belette) : ligne 3, colonne 4, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Observatoire) ; au sud : tapis (on peut s'y tenir) ; à l'ouest : étagère ; à l'est : étagère
- **Coupable** (Flammèche) : ligne 4, colonne 5, sur le sol nu
  - cases voisines : au nord : étagère ; au sud : mur (autre pièce : Crypte) ; à l'ouest : tapis (on peut s'y tenir) ; à l'est : mur (autre pièce : Jardin)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
Et VI Et
.. Tp CO
```

### 15.3. l'affaire Adélaïde — coupable : Flammèche

- **Pièce du crime** : Observatoire ; meubles de la pièce : boule de cristal, statue, chaise
- **Victime** (Adélaïde) : ligne 1, colonne 4, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : case vide ; à l'ouest : mur (autre pièce : Laboratoire) ; à l'est : boule de cristal
- **Coupable** (Flammèche) : ligne 3, colonne 6, sur le sol nu
  - cases voisines : au nord : statue ; au sud : mur (autre pièce : Jardin) ; à l'ouest : mur (autre pièce : Bibliothèque) ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
VI Cr .. Ci
.. .. St ..
## ## CO ..
```

### 15.4. l'affaire Couplet — coupable : Flammèche

- **Pièce du crime** : Observatoire ; meubles de la pièce : boule de cristal, statue, chaise
- **Victime** (Couplet) : ligne 1, colonne 6, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : statue ; à l'ouest : boule de cristal ; à l'est : chaise (on peut s'y tenir)
- **Coupable** (Flammèche) : ligne 2, colonne 4, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Bibliothèque) ; à l'ouest : mur (autre pièce : Laboratoire) ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. Cr VI Ci
CO .. St ..
## ## .. ..
```

### 15.5. l'affaire Bazar — coupable : Fernand

- **Pièce du crime** : Jardin ; meubles de la pièce : arbre, champignon géant
- **Victime** (Bazar) : ligne 6, colonne 7, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : case vide ; à l'ouest : champignon géant (on peut s'y tenir) ; à l'est : bord de la carte
- **Coupable** (Fernand) : ligne 5, colonne 6, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : champignon géant (on peut s'y tenir) ; à l'ouest : mur (autre pièce : Crypte) ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. Ar
CO ..
Ch VI
## ..
```

### 15.6. l'affaire Trapèze — coupable : Glissandra

- **Pièce du crime** : Laboratoire ; meubles de la pièce : portail runique, chaudron
- **Victime** (Trapèze) : ligne 3, colonne 2, sur le sol nu
  - cases voisines : au nord : chaudron ; au sud : mur (autre pièce : Bibliothèque) ; à l'ouest : case vide ; à l'est : mur (autre pièce : Bibliothèque)
- **Coupable** (Glissandra, 2 cases) : ligne 7, colonne 4, sur le sol nu ; ligne 7, colonne 5, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Crypte) ; au sud : bord de la carte ; à l'ouest : mur (autre pièce : Escalier) ; au nord : mur (autre pièce : Crypte) ; au sud : bord de la carte ; à l'est : mur (autre pièce : Crypte)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
Po .. ..
.. Cd ..
.. VI ##
```

### 15.7. l'affaire Hâtif — coupable : Blafard

- **Pièce du crime** : Observatoire ; meubles de la pièce : boule de cristal, statue, chaise
- **Victime** (Hâtif) : ligne 2, colonne 5, sur le sol nu
  - cases voisines : au nord : boule de cristal ; au sud : mur (autre pièce : Bibliothèque) ; à l'ouest : case vide ; à l'est : statue
- **Coupable** (Blafard) : ligne 3, colonne 6, sur le sol nu
  - cases voisines : au nord : statue ; au sud : mur (autre pièce : Jardin) ; à l'ouest : mur (autre pièce : Bibliothèque) ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. Cr .. Ci
.. VI St ..
## ## CO ..
```

## 16. Le Port des Contrebandiers

### 16.1. l'affaire Raflard — coupable : Écho-Écho

- **Pièce du crime** : Chantier naval ; meubles de la pièce : barque, enclume
- **Victime** (Raflard) : ligne 5, colonne 3, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Marché aux poissons) ; à l'ouest : mur (autre pièce : Taverne du port) ; à l'est : case vide
- **Coupable** (Écho-Écho) : ligne 4, colonne 4, **sur la barque**
  - cases voisines : au nord : case vide ; au sud : case vide ; à l'ouest : case vide ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## .. ..
.. CO ..
VI .. En
## .. ##
```

### 16.2. l'affaire Missivin — coupable : Bâfrin

- **Pièce du crime** : Marché aux poissons ; meubles de la pièce : table, tonneau
- **Victime** (Missivin) : ligne 7, colonne 4, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Chantier naval) ; au sud : bord de la carte ; à l'ouest : tonneau ; à l'est : mur (autre pièce : Entrepôt)
- **Coupable** (Bâfrin) : ligne 6, colonne 1, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Taverne du port) ; au sud : case vide ; à l'ouest : bord de la carte ; à l'est : table
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
CO Ta .. ##
.. .. To VI
```

### 16.3. l'affaire Rognard — coupable : Bâbord

- **Pièce du crime** : Chantier naval ; meubles de la pièce : barque, enclume
- **Victime** (Rognard) : ligne 4, colonne 5, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : enclume ; à l'ouest : barque (on peut s'y tenir) ; à l'est : mur (autre pièce : Entrepôt)
- **Coupable** (Bâbord) : ligne 3, colonne 4, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Quai) ; au sud : barque (on peut s'y tenir) ; à l'ouest : mur (autre pièce : Quai) ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## CO ..
.. Ba VI
.. .. En
## .. ##
```

### 16.4. l'affaire Ritournel — coupable : Bakchich

- **Pièce du crime** : Douane ; meubles de la pièce : table, coffre, chaise
- **Victime** (Ritournel) : ligne 1, colonne 7, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : table ; à l'ouest : mur (autre pièce : Quai) ; à l'est : bord de la carte
- **Coupable** (Bakchich) : ligne 3, colonne 6, **sur la chaise**
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Entrepôt) ; à l'ouest : mur (autre pièce : Chantier naval) ; à l'est : coffre
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## VI
.. Ta
CO Co
```

### 16.5. l'affaire Flacon — coupable : Bakchich

- **Pièce du crime** : Taverne du port ; meubles de la pièce : statue, lit, table, chaise, tonneau
- **Victime** (Flacon) : ligne 2, colonne 1, sur le sol nu
  - cases voisines : au nord : statue ; au sud : case vide ; à l'ouest : bord de la carte ; à l'est : lit (on peut s'y tenir)
- **Coupable** (Bakchich) : ligne 4, colonne 2, **sur la chaise**
  - cases voisines : au nord : case vide ; au sud : case vide ; à l'ouest : table ; à l'est : mur (autre pièce : Chantier naval)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
St ..
VI Li
.. ..
Ta CO
To ..
```

### 16.6. l'affaire Clapote — coupable : Frégaton

- **Pièce du crime** : Entrepôt ; meubles de la pièce : coffre, tonneau
- **Victime** (Clapote) : ligne 5, colonne 7, sur le sol nu
  - cases voisines : au nord : coffre ; au sud : case vide ; à l'ouest : case vide ; à l'est : bord de la carte
- **Coupable** (Frégaton) : ligne 6, colonne 5, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Chantier naval) ; au sud : case vide ; à l'ouest : mur (autre pièce : Chantier naval) ; à l'est : tonneau
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## .. Co
## .. VI
CO To ..
.. .. Co
```

### 16.7. l'affaire Souvenard — coupable : Frégaton

- **Pièce du crime** : Chantier naval ; meubles de la pièce : barque, enclume
- **Victime** (Souvenard) : ligne 6, colonne 4, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Marché aux poissons) ; à l'ouest : mur (autre pièce : Marché aux poissons) ; à l'est : mur (autre pièce : Entrepôt)
- **Coupable** (Frégaton) : ligne 3, colonne 5, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Quai) ; au sud : case vide ; à l'ouest : case vide ; à l'est : mur (autre pièce : Douane)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## .. CO
.. Ba ..
.. .. En
## VI ##
```

## 17. Le Bal Masqué

### 17.1. l'affaire Arsénio — coupable : Fausset

- **Pièce du crime** : Buffet ; meubles de la pièce : table, chaise, tonneau
- **Victime** (Arsénio) : ligne 5, colonne 6, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Salle de bal) ; au sud : mur (autre pièce : Jardin d'hiver) ; à l'ouest : mur (autre pièce : Salle de bal) ; à l'est : table
- **Coupable** (Fausset) : ligne 4, colonne 7, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Escalier d'honneur) ; au sud : table ; à l'ouest : mur (autre pièce : Salle de bal) ; à l'est : table
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## CO Ta
VI Ta ..
## Ci ..
## .. To
## ## ..
```

### 17.2. l'affaire Fatras — coupable : Dagobert

- **Pièce du crime** : Salle de bal ; meubles de la pièce : chaise, tapis, statue
- **Victime** (Fatras) : ligne 2, colonne 4, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : tapis (on peut s'y tenir) ; à l'ouest : case vide ; à l'est : case vide
- **Coupable** (Dagobert) : ligne 1, colonne 6, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : case vide ; à l'ouest : chaise (on peut s'y tenir) ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## .. Ci CO ..
.. VI .. .. St
.. Tp .. .. ##
.. .. Tp .. ##
## .. .. ## ##
```

### 17.3. l'affaire Charité — coupable : Dagobert

- **Pièce du crime** : Salle de bal ; meubles de la pièce : chaise, tapis, statue
- **Victime** (Charité) : ligne 1, colonne 6, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : case vide ; à l'ouest : chaise (on peut s'y tenir) ; à l'est : case vide
- **Coupable** (Dagobert) : ligne 2, colonne 5, sur le sol nu
  - cases voisines : au nord : chaise (on peut s'y tenir) ; au sud : case vide ; à l'ouest : case vide ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## .. Ci VI ..
.. .. CO .. St
.. Tp .. .. ##
.. .. Tp .. ##
## .. .. ## ##
```

### 17.4. l'affaire Mirliflore — coupable : Fumerolle

- **Pièce du crime** : Jardin d'hiver ; meubles de la pièce : arbre, champignon géant
- **Victime** (Mirliflore) : ligne 6, colonne 6, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Buffet) ; au sud : case vide ; à l'ouest : arbre ; à l'est : mur (autre pièce : Buffet)
- **Coupable** (Fumerolle) : ligne 8, colonne 4, sur le sol nu
  - cases voisines : au nord : champignon géant (on peut s'y tenir) ; au sud : bord de la carte ; à l'ouest : mur (autre pièce : Boudoir) ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## .. Ar VI ##
.. Ch .. .. ##
## CO .. Ar ..
```

### 17.5. l'affaire Grappin — coupable : Dagobert

- **Pièce du crime** : Salle de bal ; meubles de la pièce : chaise, tapis, statue
- **Victime** (Grappin) : ligne 5, colonne 4, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Jardin d'hiver) ; à l'ouest : mur (autre pièce : Salon des miroirs) ; à l'est : case vide
- **Coupable** (Dagobert) : ligne 3, colonne 6, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : case vide ; à l'ouest : case vide ; à l'est : mur (autre pièce : Escalier d'honneur)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## .. Ci .. ..
.. .. .. .. St
.. Tp .. CO ##
.. .. Tp .. ##
## VI .. ## ##
```

### 17.6. l'affaire Rapidon — coupable : Escabeau

- **Pièce du crime** : Salle de bal ; meubles de la pièce : chaise, tapis, statue
- **Victime** (Rapidon) : ligne 4, colonne 4, sur le sol nu
  - cases voisines : au nord : tapis (on peut s'y tenir) ; au sud : case vide ; à l'ouest : case vide ; à l'est : tapis (on peut s'y tenir)
- **Coupable** (Escabeau, 2 cases) : ligne 1, colonne 6, sur le sol nu ; ligne 1, colonne 7, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud de la case 1,6 : case vide ; à l'ouest de la case 1,6 : chaise (on peut s'y tenir) ; au nord : bord de la carte ; au sud de la case 1,7 : statue ; à l'est : mur (autre pièce : Buffet)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## .. Ci CO CO
.. .. .. .. St
.. Tp .. .. ##
.. VI Tp .. ##
## .. .. ## ##
```

### 17.7. l'affaire Palmette — coupable : Gontran

- **Pièce du crime** : Buffet ; meubles de la pièce : tapis, table, chaise, tonneau
- **Victime** (Palmette) : ligne 1, colonne 8, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : case vide ; à l'ouest : mur (autre pièce : Salle de bal) ; à l'est : bord de la carte
- **Coupable** (Gontran) : ligne 3, colonne 7, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Salle de bal) ; au sud : case vide ; à l'ouest : mur (autre pièce : Salle de bal) ; à l'est : tapis (on peut s'y tenir)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## ## VI
## ## ..
## CO Tp
## .. Ta
.. Ta ..
## Ci ..
## .. To
## ## ..
```

## 18. La Grande Foire des Mille Merveilles

### 18.1. l'affaire Théodelinde — coupable : Briochon

- **Pièce du crime** : Grande roue ; meubles de la pièce : statue, chaise, chariot de mine
- **Victime** (Théodelinde) : ligne 3, colonne 12, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : chariot de mine ; à l'ouest : case vide ; à l'est : bord de la carte
- **Coupable** (Briochon) : ligne 4, colonne 9, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Piste aux étoiles) ; à l'ouest : mur (autre pièce : Ménagerie) ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. .. St ..
.. .. .. ..
.. Ci .. VI
CO .. .. Cm
```

### 18.2. l'affaire Componcte — coupable : Flammèche

- **Pièce du crime** : Manège ; meubles de la pièce : chariot de mine, statue, fauteuil
- **Victime** (Componcte) : ligne 11, colonne 5, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Buvette) ; au sud : case vide ; à l'ouest : mur (autre pièce : Tente de la voyante) ; à l'est : case vide
- **Coupable** (Flammèche) : ligne 12, colonne 6, **sur le fauteuil**
  - cases voisines : au nord : case vide ; au sud : bord de la carte ; à l'ouest : case vide ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
VI .. Cm .. .. ## ## ##
.. CO .. .. .. St .. ..
```

### 18.3. l'affaire Rafistol — coupable : Fricot

- **Pièce du crime** : Ménagerie ; meubles de la pièce : botte de foin, chariot de mine
- **Victime** (Rafistol) : ligne 4, colonne 6, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Piste aux étoiles) ; à l'ouest : mur (autre pièce : Stand de tir) ; à l'est : case vide
- **Coupable** (Fricot) : ligne 3, colonne 7, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : case vide ; à l'ouest : case vide ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. Fo .. ..
.. .. .. Cm
Fo .. CO ..
## VI .. ..
```

### 18.4. l'affaire Clownette — coupable : Festin

- **Pièce du crime** : Grande roue ; meubles de la pièce : statue, chaise, chariot de mine
- **Victime** (Clownette) : ligne 1, colonne 10, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : case vide ; à l'ouest : case vide ; à l'est : statue
- **Coupable** (Festin) : ligne 3, colonne 9, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : case vide ; à l'ouest : mur (autre pièce : Ménagerie) ; à l'est : chaise (on peut s'y tenir)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. VI St ..
.. .. .. ..
CO Ci .. ..
.. .. .. Cm
```

### 18.5. l'affaire Marée — coupable : Clairvoya

- **Pièce du crime** : Stand de tir ; meubles de la pièce : canon, tonneau, table
- **Victime** (Marée) : ligne 4, colonne 2, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Chapiteau) ; au sud : case vide ; à l'ouest : canon ; à l'est : case vide
- **Coupable** (Clairvoya) : ligne 5, colonne 3, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : case vide ; à l'ouest : case vide ; à l'est : tonneau
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
Ca VI .. .. ..
.. .. CO To ..
.. Ta .. .. ..
```

### 18.6. l'affaire Tastevin — coupable : Esbroufe

- **Pièce du crime** : Grande roue ; meubles de la pièce : statue, chaise, chariot de mine
- **Victime** (Tastevin) : ligne 2, colonne 12, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : case vide ; à l'ouest : case vide ; à l'est : bord de la carte
- **Coupable** (Esbroufe) : ligne 4, colonne 9, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Piste aux étoiles) ; à l'ouest : mur (autre pièce : Ménagerie) ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. .. St ..
.. .. .. VI
.. Ci .. ..
CO .. .. Cm
```

### 18.7. l'affaire Velours — coupable : Clairvoya

- **Pièce du crime** : Buvette ; meubles de la pièce : table, tonneau, chaise, boule de cristal, tapis
- **Victime** (Velours) : ligne 10, colonne 4, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : case vide ; à l'ouest : case vide ; à l'est : chaise (on peut s'y tenir)
- **Coupable** (Clairvoya) : ligne 11, colonne 1, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : case vide ; à l'ouest : bord de la carte ; à l'est : boule de cristal
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## ## ## .. .. Ta .. .. ..
.. .. .. VI Ci .. .. To ..
CO Cr .. .. ## ## ## ## ##
.. .. Tp .. ## ## ## ## ##
```

## 19. Le Grand Port de Brumeval

### 19.1. l'affaire Bradeur — coupable : Bakchich

- **Pièce du crime** : Marché aux poissons ; meubles de la pièce : table, tapis
- **Victime** (Bradeur) : ligne 6, colonne 1, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Taverne du Kraken) ; au sud : case vide ; à l'ouest : bord de la carte ; à l'est : case vide
- **Coupable** (Bakchich) : ligne 8, colonne 3, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Douane) ; à l'ouest : case vide ; à l'est : tapis (on peut s'y tenir)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
VI .. .. ..
.. Ta .. ..
.. .. CO Tp
```

### 19.2. l'affaire Harpie — coupable : Bâbord

- **Pièce du crime** : Galion ; meubles de la pièce : canon, hamac, coffre
- **Victime** (Harpie) : ligne 7, colonne 8, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Chantier naval) ; au sud : case vide ; à l'ouest : case vide ; à l'est : mur (autre pièce : Phare)
- **Coupable** (Bâbord) : ligne 9, colonne 6, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Douane) ; à l'ouest : case vide ; à l'est : hamac (on peut s'y tenir)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. .. ## ##
.. Ca .. VI
.. .. .. ..
.. CO Ha ..
## ## .. Co
```

### 19.3. l'affaire Naïade — coupable : Frégaton

- **Pièce du crime** : Chantier naval ; meubles de la pièce : enclume, tonneau
- **Victime** (Naïade) : ligne 4, colonne 7, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Entrepôt) ; au sud : case vide ; à l'ouest : mur (autre pièce : Capitainerie) ; à l'est : case vide
- **Coupable** (Frégaton) : ligne 6, colonne 9, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Phare) ; à l'ouest : case vide ; à l'est : tonneau
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
VI .. .. ..
.. En .. ..
.. .. CO To
```

### 19.4. l'affaire Pompadoure — coupable : Belladone

- **Pièce du crime** : Phare ; meubles de la pièce : boule de cristal, chaise
- **Victime** (Pompadoure) : ligne 9, colonne 9, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : chaise (on peut s'y tenir) ; à l'ouest : mur (autre pièce : Galion) ; à l'est : case vide
- **Coupable** (Belladone) : ligne 8, colonne 10, sur le sol nu
  - cases voisines : au nord : boule de cristal ; au sud : case vide ; à l'ouest : case vide ; à l'est : bord de la carte
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. Cr
.. CO
VI ..
Ci ..
```

### 19.5. l'affaire Tempérance — coupable : Aagrid

- **Pièce du crime** : Entrepôt ; meubles de la pièce : coffre, tonneau, chariot de mine
- **Victime** (Tempérance) : ligne 2, colonne 7, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : case vide ; à l'ouest : mur (autre pièce : Quais) ; à l'est : case vide
- **Coupable** (Aagrid) : ligne 3, colonne 10, sur le sol nu
  - cases voisines : au nord : tonneau ; au sud : mur (autre pièce : Chantier naval) ; à l'ouest : case vide ; à l'est : bord de la carte
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. .. Co ..
VI .. .. To
.. Cm .. CO
```

### 19.6. l'affaire Théophile — coupable : Bâbord

- **Pièce du crime** : Marché aux poissons ; meubles de la pièce : table, tapis
- **Victime** (Théophile) : ligne 8, colonne 2, sur le sol nu
  - cases voisines : au nord : table ; au sud : mur (autre pièce : Douane) ; à l'ouest : case vide ; à l'est : case vide
- **Coupable** (Bâbord) : ligne 6, colonne 3, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Capitainerie) ; au sud : case vide ; à l'ouest : case vide ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. .. CO ..
.. Ta .. ..
.. VI .. Tp
```

### 19.7. l'affaire Dîmeaux — coupable : Frégaton

- **Pièce du crime** : Marché aux poissons ; meubles de la pièce : table, tapis
- **Victime** (Dîmeaux) : ligne 7, colonne 1, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : case vide ; à l'ouest : bord de la carte ; à l'est : table
- **Coupable** (Frégaton) : ligne 6, colonne 3, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Capitainerie) ; au sud : case vide ; à l'ouest : case vide ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. .. CO ..
VI Ta .. ..
.. .. .. Tp
```

## 20. Le Navire Fantôme

### 20.1. l'affaire Mortifia — coupable : Écho-Écho

- **Pièce du crime** : Cale ; meubles de la pièce : tonneau, coffre
- **Victime** (Mortifia) : ligne 4, colonne 3, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Pont) ; au sud : case vide ; à l'ouest : mur (autre pièce : Entrepont) ; à l'est : case vide
- **Coupable** (Écho-Écho) : ligne 7, colonne 5, sur le sol nu
  - cases voisines : au nord : coffre ; au sud : bord de la carte ; à l'ouest : case vide ; à l'est : tonneau
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
VI .. ## ## ##
.. To .. ## ##
.. .. Co .. ##
## .. CO To ..
```

### 20.2. l'affaire Mouillette — coupable : Bâbord

- **Pièce du crime** : Pont ; meubles de la pièce : canon, coffre
- **Victime** (Mouillette) : ligne 1, colonne 3, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : case vide ; à l'ouest : mur (autre pièce : Entrepont) ; à l'est : canon
- **Coupable** (Bâbord) : ligne 3, colonne 4, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Cale) ; à l'ouest : canon ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
VI Ca ..
.. .. Co
Ca CO ..
```

### 20.3. l'affaire Trinquet — coupable : Écho-Écho

- **Pièce du crime** : Cale ; meubles de la pièce : tonneau, coffre
- **Victime** (Trinquet) : ligne 6, colonne 4, sur le sol nu
  - cases voisines : au nord : tonneau ; au sud : case vide ; à l'ouest : case vide ; à l'est : coffre
- **Coupable** (Écho-Écho) : ligne 5, colonne 5, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Coquerie) ; au sud : coffre ; à l'ouest : tonneau ; à l'est : mur (autre pièce : Coquerie)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. .. ## ## ##
.. To CO ## ##
.. VI Co .. ##
## .. .. To ..
```

### 20.4. l'affaire Tondulard — coupable : Belladone

- **Pièce du crime** : Coquerie ; meubles de la pièce : chaudron, tonneau
- **Victime** (Tondulard) : ligne 4, colonne 5, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Pont) ; au sud : mur (autre pièce : Cale) ; à l'ouest : mur (autre pièce : Cale) ; à l'est : chaudron
- **Coupable** (Belladone) : ligne 5, colonne 6, sur le sol nu
  - cases voisines : au nord : chaudron ; au sud : mur (autre pièce : Cale) ; à l'ouest : mur (autre pièce : Cale) ; à l'est : tonneau
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## .. ##
VI Cd ..
## CO To
## ## ..
```

### 20.5. l'affaire Cinabrin — coupable : Écho-Écho

- **Pièce du crime** : Pont ; meubles de la pièce : canon, coffre
- **Victime** (Cinabrin) : ligne 2, colonne 4, sur le sol nu
  - cases voisines : au nord : canon ; au sud : case vide ; à l'ouest : case vide ; à l'est : coffre
- **Coupable** (Écho-Écho) : ligne 3, colonne 5, sur le sol nu
  - cases voisines : au nord : coffre ; au sud : mur (autre pièce : Coquerie) ; à l'ouest : case vide ; à l'est : mur (autre pièce : Coquerie)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. Ca ..
.. VI Co
Ca .. CO
```

### 20.6. l'affaire Fanfreluche — coupable : Écho-Écho

- **Pièce du crime** : Cale ; meubles de la pièce : tonneau, coffre
- **Victime** (Fanfreluche) : ligne 4, colonne 4, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Pont) ; au sud : tonneau ; à l'ouest : case vide ; à l'est : mur (autre pièce : Coquerie)
- **Coupable** (Écho-Écho) : ligne 5, colonne 3, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : case vide ; à l'ouest : mur (autre pièce : Entrepont) ; à l'est : tonneau
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. VI ## ## ##
CO To .. ## ##
.. .. Co .. ##
## .. .. To ..
```

### 20.7. l'affaire Fouine — coupable : Écho-Écho

- **Pièce du crime** : Coquerie ; meubles de la pièce : table, lit, fauteuil, chaudron, tonneau
- **Victime** (Fouine) : ligne 1, colonne 7, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : lit (on peut s'y tenir) ; à l'ouest : table ; à l'est : bord de la carte
- **Coupable** (Écho-Écho) : ligne 4, colonne 5, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Pont) ; au sud : mur (autre pièce : Cale) ; à l'ouest : mur (autre pièce : Cale) ; à l'est : chaudron
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## Ta VI
## .. Li
## .. Fa
CO Cd ..
## .. To
## ## ..
```

## 21. Les Thermes Enchantés

### 21.1. l'affaire Mahaut — coupable : Aëlys

- **Pièce du crime** : Bassin chaud ; meubles de la pièce : statue, fauteuil, tapis
- **Victime** (Mahaut) : ligne 1, colonne 6, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : fauteuil (on peut s'y tenir) ; à l'ouest : case vide ; à l'est : bord de la carte
- **Coupable** (Aëlys) : ligne 3, colonne 4, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Salle de massage) ; à l'ouest : tapis (on peut s'y tenir) ; à l'est : mur (autre pièce : Bassin froid)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. St .. VI
.. .. .. Fa
Tp CO ## ##
```

### 21.2. l'affaire Pirouette — coupable : Capucine

- **Pièce du crime** : Bassin chaud ; meubles de la pièce : statue, fauteuil, tapis
- **Victime** (Pirouette) : ligne 3, colonne 4, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Salle de massage) ; à l'ouest : tapis (on peut s'y tenir) ; à l'est : mur (autre pièce : Bassin froid)
- **Coupable** (Capucine) : ligne 1, colonne 5, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : case vide ; à l'ouest : statue ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. St CO ..
.. .. .. Fa
Tp VI ## ##
```

### 21.3. l'affaire Récupérin — coupable : Goémone

- **Pièce du crime** : Bassin chaud ; meubles de la pièce : statue, fauteuil, tapis
- **Victime** (Récupérin) : ligne 2, colonne 5, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Bassin froid) ; à l'ouest : case vide ; à l'est : fauteuil (on peut s'y tenir)
- **Coupable** (Goémone) : ligne 3, colonne 4, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Salle de massage) ; à l'ouest : tapis (on peut s'y tenir) ; à l'est : mur (autre pièce : Bassin froid)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. St .. ..
.. .. VI Fa
Tp CO ## ##
```

### 21.4. l'affaire Pichet — coupable : Aëlys

- **Pièce du crime** : Bassin froid ; meubles de la pièce : statue, massif de roseaux
- **Victime** (Pichet) : ligne 3, colonne 5, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Bassin chaud) ; au sud : case vide ; à l'ouest : mur (autre pièce : Bassin chaud) ; à l'est : statue
- **Coupable** (Aëlys) : ligne 6, colonne 6, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : bord de la carte ; à l'ouest : case vide ; à l'est : bord de la carte
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
VI St
.. ..
Ro ..
.. CO
```

### 21.5. l'affaire Bottin — coupable : Goémone

- **Pièce du crime** : Salle de massage ; meubles de la pièce : lit, table
- **Victime** (Bottin) : ligne 5, colonne 3, sur le sol nu
  - cases voisines : au nord : lit (on peut s'y tenir) ; au sud : case vide ; à l'ouest : mur (autre pièce : Sauna) ; à l'est : lit (on peut s'y tenir)
- **Coupable** (Goémone) : ligne 6, colonne 4, sur le sol nu
  - cases voisines : au nord : lit (on peut s'y tenir) ; au sud : bord de la carte ; à l'ouest : case vide ; à l'est : mur (autre pièce : Bassin froid)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## Li ..
## VI Li
Ta .. CO
```

### 21.6. l'affaire Éclaboussine — coupable : Bâfrin

- **Pièce du crime** : Bassin chaud ; meubles de la pièce : statue, fauteuil, tapis
- **Victime** (Éclaboussine) : ligne 1, colonne 5, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : case vide ; à l'ouest : statue ; à l'est : case vide
- **Coupable** (Bâfrin) : ligne 3, colonne 4, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Salle de massage) ; à l'ouest : tapis (on peut s'y tenir) ; à l'est : mur (autre pièce : Bassin froid)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. St VI ..
.. .. .. Fa
Tp CO ## ##
```

## 22. Le Palais des Mille Vœux

### 22.1. l'affaire Pincebec — coupable : Clairvoya

- **Pièce du crime** : Salle du trône ; meubles de la pièce : tapis, statue, fauteuil
- **Victime** (Pincebec) : ligne 3, colonne 5, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Jardins suspendus) ; à l'ouest : fauteuil (on peut s'y tenir) ; à l'est : mur (autre pièce : Bazar)
- **Coupable** (Clairvoya) : ligne 2, colonne 3, sur le sol nu
  - cases voisines : au nord : statue ; au sud : case vide ; à l'ouest : mur (autre pièce : Salle des lampes) ; à l'est : tapis (on peut s'y tenir)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
St .. St
CO Tp ..
.. Fa VI
```

### 22.2. l'affaire Pinardon — coupable : Dagobert

- **Pièce du crime** : Hammam ; meubles de la pièce : tapis, chaise
- **Victime** (Pinardon) : ligne 6, colonne 3, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Jardins suspendus) ; au sud : case vide ; à l'ouest : case vide ; à l'est : mur (autre pièce : Jardins suspendus)
- **Coupable** (Dagobert) : ligne 7, colonne 2, **sur le tapis**
  - cases voisines : au nord : case vide ; au sud : bord de la carte ; à l'ouest : case vide ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
Ci .. ##
.. .. VI
.. CO ..
```

### 22.3. l'affaire Traquette — coupable : Fumerolle

- **Pièce du crime** : Jardins suspendus ; meubles de la pièce : arbre, champignon géant
- **Victime** (Traquette) : ligne 4, colonne 5, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Salle du trône) ; au sud : case vide ; à l'ouest : arbre ; à l'est : mur (autre pièce : Bazar)
- **Coupable** (Fumerolle) : ligne 5, colonne 4, sur le sol nu
  - cases voisines : au nord : arbre ; au sud : case vide ; à l'ouest : champignon géant (on peut s'y tenir) ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. Ar VI
Ch CO ..
## .. Ar
## .. ..
```

### 22.4. l'affaire Brunehaut — coupable : Fizzlebarbe

- **Pièce du crime** : Hammam ; meubles de la pièce : tapis, chaise
- **Victime** (Brunehaut) : ligne 6, colonne 1, sur le sol nu
  - cases voisines : au nord : chaise (on peut s'y tenir) ; au sud : case vide ; à l'ouest : bord de la carte ; à l'est : case vide
- **Coupable** (Fizzlebarbe) : ligne 7, colonne 3, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : bord de la carte ; à l'ouest : tapis (on peut s'y tenir) ; à l'est : mur (autre pièce : Jardins suspendus)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
Ci .. ##
VI .. ..
.. Tp CO
```

### 22.5. l'affaire Prudence — coupable : Esbroufe

- **Pièce du crime** : Salle des lampes ; meubles de la pièce : boule de cristal, étagère, table
- **Victime** (Prudence) : ligne 1, colonne 2, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : case vide ; à l'ouest : boule de cristal ; à l'est : mur (autre pièce : Salle du trône)
- **Coupable** (Esbroufe) : ligne 4, colonne 1, sur le sol nu
  - cases voisines : au nord : étagère ; au sud : mur (autre pièce : Hammam) ; à l'ouest : bord de la carte ; à l'est : table
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
Cr VI
.. ..
Et ..
CO Ta
```

### 22.6. l'affaire Calcinus — coupable : Dagobert

- **Pièce du crime** : Bazar ; meubles de la pièce : tapis, tonneau, table, coffre
- **Victime** (Calcinus) : ligne 4, colonne 6, sur le sol nu
  - cases voisines : au nord : tonneau ; au sud : case vide ; à l'ouest : mur (autre pièce : Jardins suspendus) ; à l'est : tapis (on peut s'y tenir)
- **Coupable** (Dagobert) : ligne 6, colonne 7, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : coffre ; à l'ouest : table ; à l'est : bord de la carte
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
To ..
VI Tp
.. ..
Ta CO
.. Co
```

### 22.7. l'affaire Nageoire — coupable : Esbroufe

- **Pièce du crime** : Salle du trône ; meubles de la pièce : tapis, statue, fauteuil, coffre
- **Victime** (Nageoire) : ligne 1, colonne 7, sur le sol nu
  - cases voisines : au nord : bord de la carte ; au sud : coffre ; à l'ouest : coffre ; à l'est : bord de la carte
- **Coupable** (Esbroufe) : ligne 3, colonne 5, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : mur (autre pièce : Jardins suspendus) ; à l'ouest : fauteuil (on peut s'y tenir) ; à l'est : mur (autre pièce : Bazar)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
St .. St Co VI
.. Tp .. .. Co
.. Fa CO ## ##
```

## 23. Les Grands Bains de Brumeval

### 23.1. l'affaire Pacotillon — coupable : Goémone

- **Pièce du crime** : Bains de boue ; meubles de la pièce : chaudron, massif de roseaux
- **Victime** (Pacotillon) : ligne 9, colonne 5, sur le sol nu
  - cases voisines : au nord : chaudron ; au sud : case vide ; à l'ouest : case vide ; à l'est : case vide
- **Coupable** (Goémone) : ligne 10, colonne 4, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : bord de la carte ; à l'ouest : mur (autre pièce : Jardin des cures) ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. Cd .. ..
.. VI .. ..
CO .. Ro ..
```

### 23.2. l'affaire Cunégonde — coupable : Aëlys

- **Pièce du crime** : Bains de boue ; meubles de la pièce : chaudron, massif de roseaux
- **Victime** (Cunégonde) : ligne 8, colonne 7, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Salon de thé) ; au sud : case vide ; à l'ouest : case vide ; à l'est : mur (autre pièce : Salle des massages)
- **Coupable** (Aëlys) : ligne 9, colonne 5, sur le sol nu
  - cases voisines : au nord : chaudron ; au sud : case vide ; à l'ouest : case vide ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. Cd .. VI
.. CO .. ..
.. .. Ro ..
```

### 23.3. l'affaire Cerceline — coupable : Aëlys

- **Pièce du crime** : Jardin des cures ; meubles de la pièce : arbre, champignon géant
- **Victime** (Cerceline) : ligne 9, colonne 1, sur le sol nu
  - cases voisines : au nord : champignon géant (on peut s'y tenir) ; au sud : case vide ; à l'ouest : bord de la carte ; à l'est : case vide
- **Coupable** (Aëlys) : ligne 7, colonne 3, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : case vide ; à l'ouest : case vide ; à l'est : mur (autre pièce : Salon de thé)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. Ar ..
.. .. CO
Ch .. ..
VI .. ..
.. .. Ar
```

### 23.4. l'affaire Jalousie — coupable : Capucine

- **Pièce du crime** : Salon de thé ; meubles de la pièce : table, fauteuil, tapis
- **Victime** (Jalousie) : ligne 7, colonne 6, sur le sol nu
  - cases voisines : au nord : table ; au sud : mur (autre pièce : Bains de boue) ; à l'ouest : case vide ; à l'est : tapis (on peut s'y tenir)
- **Coupable** (Capucine) : ligne 6, colonne 4, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Vestiaires) ; au sud : case vide ; à l'ouest : mur (autre pièce : Jardin des cures) ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## Fa .. ..
CO .. Ta ..
.. .. VI Tp
```

### 23.5. l'affaire Rapace — coupable : Fizzlebarbe

- **Pièce du crime** : Salon de thé ; meubles de la pièce : table, fauteuil, tapis
- **Victime** (Rapace) : ligne 6, colonne 4, sur le sol nu
  - cases voisines : au nord : mur (autre pièce : Vestiaires) ; au sud : case vide ; à l'ouest : mur (autre pièce : Jardin des cures) ; à l'est : case vide
- **Coupable** (Fizzlebarbe) : ligne 7, colonne 6, sur le sol nu
  - cases voisines : au nord : table ; au sud : mur (autre pièce : Bains de boue) ; à l'ouest : case vide ; à l'est : tapis (on peut s'y tenir)
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
## Fa .. ..
VI .. Ta ..
.. .. CO Tp
```

### 23.6. l'affaire Clémence — coupable : Aëlys

- **Pièce du crime** : Jardin des cures ; meubles de la pièce : arbre, champignon géant
- **Victime** (Clémence) : ligne 10, colonne 1, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : bord de la carte ; à l'ouest : bord de la carte ; à l'est : case vide
- **Coupable** (Aëlys) : ligne 7, colonne 2, sur le sol nu
  - cases voisines : au nord : arbre ; au sud : case vide ; à l'ouest : case vide ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. Ar ..
.. CO ..
Ch .. ..
.. .. ..
VI .. Ar
```

### 23.7. l'affaire Presto — coupable : Bâfrin

- **Pièce du crime** : Jardin des cures ; meubles de la pièce : arbre, champignon géant
- **Victime** (Presto) : ligne 10, colonne 2, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : bord de la carte ; à l'ouest : case vide ; à l'est : arbre
- **Coupable** (Bâfrin) : ligne 7, colonne 1, sur le sol nu
  - cases voisines : au nord : case vide ; au sud : champignon géant (on peut s'y tenir) ; à l'ouest : bord de la carte ; à l'est : case vide
- Coupable et victime pas côte à côte (ailleurs dans la même pièce) dans la solution.

```
.. Ar ..
CO .. ..
Ch .. ..
.. .. ..
.. VI Ar
```
