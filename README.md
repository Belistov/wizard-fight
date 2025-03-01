# [Wizard Fight](https://snubble9753.github.io/) - linkur á leikinn
#### Andri og Matthías - Áfangi: FORR3FV05EU - Tæknimenntaskólinn
Turn Based RPG milli 2 galdrakarla (PvE). Notast er við Hand tracking til að áhveða hvað blái galdrakarlinn gerir. 

### Leiðbeningar
Það eru 3 hreyfingar sem hægt er að gera. <br>
1. 🤟 - Varpar Eldkúlu á óvin. Kastaður er teningur upp á skaða 1d6
2. 👍 - Fá meiri lífstig. Kastaður er teningur upp á auka líf 1d4
3. ✋ - Varpa skyldi til að vernda sjálfan sig. Skaði minnkar um 50%

1. Hver Galdrakall hefur 75 Líf
2. 10% líkur að árás hittir ekki (miss)
3. 3% líkur að árás drepur strax óvin

### Myndir/Video
Útlit leiks
![image](https://github.com/user-attachments/assets/a9001a02-60d6-4fcd-8aa9-53c2a18e55f0)

[Video af virkni leiks](https://www.youtube.com/watch?v=nfwj6NKrf6M)


### Heimildir/söfn
|Hlekkur|Hvað er þetta|
|-|-|
| https://tympanus.net/codrops/2024/10/24/creating-a-3d-hand-controller-using-a-webcam-with-mediapipe-and-three-js/ | Hand Controller Demo |
| https://www.remove.bg/upload | Remove Background |
| https://speckyboy.com/creative-snippets-pixelated-backgrounds/ | Background |
| https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js | three.js |
| https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js | hands.js |
| https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js | drawing_utils.js |
| https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js | camera_utils.js |


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
