# wizard-fight
A small turn based RPG fight between 2 wizards (player and computer) dice rolls, hand tracking.


### Hlutverk
|Andri|Matti|
|-|-|
|Graphics|Hand Controlls|

### File Strúktúr
```
Project/
│── assets/
│   ├── audio/
│   └── sprite/
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

### Hvernig Þetta Virkar
Það eru 3 hreyfingar sem hægt er að gera. <br>
1. 🤟 - Varpa Eldkúlu á óvinn. Kastaður er teningur upp á skaða 1d6
2. 👍 - Auka líf sitt upp. Kastaður er teningur upp á líf auka 1d4
3. ✋ - Varpa skyldi til að vernda sig sjálfan. Skaði minnkar um 50%

1. Hver Galdra Kall hefur 75 Líf
2. 10% líkur að ekki vera hittur af árás
3. 3% líkur að deyja strax
