# wizard-fight
A small turn based RPG fight between 2 wizards (player and computer) dice rolls, hand tracking.


### Hlutverk
|Andri|Matti|
|-|-|
|Graphics|Hand Controlls|

### File Strúktúr
js

```graphQL
Project/
│── assets/
│   ├── audio/
│   └── sprite/
│   │   ├── Characters/
│   │   │   ├── Player.svg
│   │   │   └── Enemy.svg
│   │   ├── Environment/
│   │   │   ├── Buildings/
│   │   │   │   ├── Building_1.svg
│   │   │   │   ├── Building_2.svg
│   │   │   │   ├── Building_3.svg
│   │   │   │   └── Building_4.svg
│   │   │   └── Nature/
│   │   │   │   ├── Bush_1.svg
│   │   │   │   ├── Bush_2.svg
│   │   │   │   ├── Bush_3.svg
│   │   │   │   ├── Tree_1.svg
│   │   │   │   ├── Tree_2.svg
│   │   │   │   └── Tree_3.svg
│   │   └── MoveSett/
│   │   │   ├── Shield.svg
│   │   │   ├── Fire.svg
│   │   │   └── Player.svg
│── src/
│   ├── html/
│   │   ├── dummy.html
│   │   └── dummy2.html
│   ├── css/
│   │   └── dummy.css
│   ├── js/
│   │   └── dummy.js
│   ├── imports/
│   │   └── import.js
│── index.html
```

py

```py
Project/
│── assets/
│   ├── audio/
│   └── sprite/
│   │   ├── Characters/
│   │   │   ├── Player.svg
│   │   │   └── Enemy.svg
│   │   ├── Environment/
│   │   │   ├── Buildings/
│   │   │   │   ├── Building_1.svg
│   │   │   │   ├── Building_2.svg
│   │   │   │   ├── Building_3.svg
│   │   │   │   └── Building_4.svg
│   │   │   └── Nature/
│   │   │   │   ├── Bush_1.svg
│   │   │   │   ├── Bush_2.svg
│   │   │   │   ├── Bush_3.svg
│   │   │   │   ├── Tree_1.svg
│   │   │   │   ├── Tree_2.svg
│   │   │   │   └── Tree_3.svg
│   │   └── MoveSett/
│   │   │   ├── Shield.svg
│   │   │   ├── Fire.svg
│   │   │   └── Player.svg
│── src/
│   ├── html/
│   │   ├── dummy.html
│   │   └── dummy2.html
│   ├── css/
│   │   └── dummy.css
│   ├── js/
│   │   └── dummy.js
│   ├── imports/
│   │   └── import.js
│── index.html
```

cs

```cs
Project/
│── assets/
│   ├── audio/
│   └── sprite/
│   │   ├── Characters/
│   │   │   ├── Player.svg
│   │   │   └── Enemy.svg
│   │   ├── Environment/
│   │   │   ├── Buildings/
│   │   │   │   ├── Building_1.svg
│   │   │   │   ├── Building_2.svg
│   │   │   │   ├── Building_3.svg
│   │   │   │   └── Building_4.svg
│   │   │   └── Nature/
│   │   │   │   ├── Bush_1.svg
│   │   │   │   ├── Bush_2.svg
│   │   │   │   ├── Bush_3.svg
│   │   │   │   ├── Tree_1.svg
│   │   │   │   ├── Tree_2.svg
│   │   │   │   └── Tree_3.svg
│   │   └── MoveSett/
│   │   │   ├── Shield.svg
│   │   │   ├── Fire.svg
│   │   │   └── Player.svg
│── src/
│   ├── html/
│   │   ├── dummy.html
│   │   └── dummy2.html
│   ├── css/
│   │   └── dummy.css
│   ├── js/
│   │   └── dummy.js
│   ├── imports/
│   │   └── import.js
│── index.html
```

lua 

```lua
Project/
│── assets/
│   ├── audio/
│   └── sprite/
│   │   ├── Characters/
│   │   │   ├── Player.svg
│   │   │   └── Enemy.svg
│   │   ├── Environment/
│   │   │   ├── Buildings/
│   │   │   │   ├── Building_1.svg
│   │   │   │   ├── Building_2.svg
│   │   │   │   ├── Building_3.svg
│   │   │   │   └── Building_4.svg
│   │   │   └── Nature/
│   │   │   │   ├── Bush_1.svg
│   │   │   │   ├── Bush_2.svg
│   │   │   │   ├── Bush_3.svg
│   │   │   │   ├── Tree_1.svg
│   │   │   │   ├── Tree_2.svg
│   │   │   │   └── Tree_3.svg
│   │   └── MoveSett/
│   │   │   ├── Shield.svg
│   │   │   ├── Fire.svg
│   │   │   └── Player.svg
│── src/
│   ├── html/
│   │   ├── dummy.html
│   │   └── dummy2.html
│   ├── css/
│   │   └── dummy.css
│   ├── js/
│   │   └── dummy.js
│   ├── imports/
│   │   └── import.js
│── index.html
```

### Leiðbeningar
Það eru 3 hreyfingar sem hægt er að gera. <br>
1. 🤟 - Varpar Eldkúlu á óvin. Kastaður er teningur upp á skaða 1d6
2. 👍 - Fá meiri lífstig. Kastaður er teningur upp á auka líf 1d4
3. ✋ - Varpa skyldi til að vernda sjálfan sig. Skaði minnkar um 50%

1. Hver Galdra Kall hefur 75 Líf
2. 10% líkur að árás hittir ekki (miss)
3. 3% líkur að árás drepur strax óvin
