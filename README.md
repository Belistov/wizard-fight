# wizard-fight
A small turn based RPG fight between 2 wizards (player and computer) dice rolls, hand tracking.

### Góðir Hlekkir
|Hlekkur|Hvað er þetta|
|-|-|
|https://codepen.io/shshaw/pen/XbxvNj|PNG > SVG|
|https://tympanus.net/codrops/2024/10/24/creating-a-3d-hand-controller-using-a-webcam-with-mediapipe-and-three-js/|Hand Controller Demo|
|https://www.remove.bg/upload|Remove Background|

### Hlutverk og To Do
| Hvað | Status | Hver |
|-|-|-|
| Sprites | Working | Andri |
| Gesture Controll | Working | Matti |
| Attack System | N/A | Matti |
| Environment Settup | N/A | Andri |
| CSS | N/A | N/A |
|add |to|list|

### File Strúktúr
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
│   │   ├── MoveSet/
│   │   │   ├── Shield.svg
│   │   │   ├── Fire.svg
│   │   │   └── Heal.svg
│   │   └── Numbers/
│   │   │   ├── 0.svg
│   │   │   ├── 1.svg
│   │   │   ├── 2.svg
│   │   │   ├── 3.svg
│   │   │   ├── 4.svg
│   │   │   ├── 5.svg
│   │   │   └── 6.svg
│── src/
│   ├── html/
│   │   ├── win.html
│   │   ├── lose.html
│   │   └── start.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── game.js
│   │   └── config.js
│   ├── imports/
│   │   └── import.js
└── index.html
```

### Leiðbeningar
Það eru 3 hreyfingar sem hægt er að gera. <br>
1. 🤟 - Varpar Eldkúlu á óvin. Kastaður er teningur upp á skaða 1d6
2. 👍 - Fá meiri lífstig. Kastaður er teningur upp á auka líf 1d4
3. ✋ - Varpa skyldi til að vernda sjálfan sig. Skaði minnkar um 50%

1. Hver Galdra Kall hefur 75 Líf
2. 10% líkur að árás hittir ekki (miss)
3. 3% líkur að árás drepur strax óvin
