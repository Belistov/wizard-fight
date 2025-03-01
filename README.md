# wizard-fight // Þetta verður link á leikinn
A small turn based RPG fight between 2 wizards (player and computer) dice rolls, hand tracking.

### Heimildir
|Hlekkur|Hvað er þetta|
|-|-|
| https://codepen.io/shshaw/pen/XbxvNj | PNG > SVG |
| https://tympanus.net/codrops/2024/10/24/creating-a-3d-hand-controller-using-a-webcam-with-mediapipe-and-three-js/ | Hand Controller Demo |
| https://www.remove.bg/upload | Remove Background |
| https://speckyboy.com/creative-snippets-pixelated-backgrounds/ | Background |
| https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js | three.js |
| https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js | hands.js |
| https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js | drawing_utils.js |
| https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js | camera_utils.js |

### Hlutverk og To Do
| Hvað | Status | Hver |
|-|-|-|
| Sprites | Working | Andri |
| Audio | Done | Matti |
| Gesture Controll | Done | Matti |
| Attack System | Done | Matti |
| Environment Settup | Working | Andri |
| CSS | Done | Andri |
|add |to|list|

### File Strúktúr
```graphQL
Project/
│── assets/
│   ├── audio/
│   │   ├── attack.mp3
│   │   ├── heal.mp3
│   │   ├── shield_off.mp3
│   │   └── shield_on.mp3
│   └── sprite/
│   │   ├── Characters/
│   │   │   ├── Player.svg
│   │   │   └── Enemy.svg
│   │   ├── Environment/
│   │   │   └── Nature/
│   │   │   │   ├── Cloud/
│   │   │   │   │   ├── Cloud1.svg
│   │   │   │   │   ├── Cloud2.svg
│   │   │   │   │   └── Cloud3.svg
│   │   │   │   └── bird.svg
│   │   ├── MoveSet/
│   │   │   └── Shield.svg
│   │   └── Numbers/
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
│   │   ├── style.css
│   │   ├── controll.css
│   │   └── environment.css
│   ├── js/
│   │   ├── game.js
│   │   ├── audio.js
│   │   ├── map.js
│   │   ├── background.js
│   │   └── config.js
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
