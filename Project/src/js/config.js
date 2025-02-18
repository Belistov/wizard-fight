// bool devMode = true;

const CONFIG = {
    SPRITES: {
        TEST: {
            TEST_1: "assets/sprite/test1.svg",
            TEST_2: "assets/sprite/test2.svg",
            TEST_3: "assets/sprite/test3.svg"

        },
        CHARACTERS: {
            PLAYER: "assets/sprite/Characters/Player.svg",
            ENEMY: "assets/sprite/Characters/Enemy.svg",
        },
        MOVESET: {
            SHIELD: "assets/sprite/MoveSet/Shield.svg",
            FIRE: "assets/sprite/MoveSet/Fire.svg",
        },
        NUMBERS: {
            1: "assets/sprite/Numbers/1.svg",
            2: "assets/sprite/Numbers/2.svg",
            3: "assets/sprite/Numbers/3.svg",
            4: "assets/sprite/Numbers/4.svg",
            5: "assets/sprite/Numbers/5.svg",
            6: "assets/sprite/Numbers/6.svg",
        },
        ENVIRONMENT: {
            BUSH: {
                // SET SPRITE WITH PATH < assets/sprite/Environment/Nature/bush.svg
            },
            TREE: {
                // SET SPRITE WITH PATH < assets/sprite/Environment/Nature/tree.svg
            },
            BUILDING: {
                // SET SPRITE WITH PATH < assets/sprite/Environment/Buildings/building.svg
            },
            GROUND: {
                // SET SPRITE WITH PATH < assets/sprite/Environment/Nature/ground.svg
            }
        }
    },
    AUDIO: {
        ATTACK: "assets/audio/attack.mp3",
        HEAL: "assets/audio/heal.mp3",
        SHIELD_ACTIVATE: "assets/audio/shield_on.mp3",
        SHIELD_DEACTIVATE: "assets/audio/shield_off.mp3",
    },
    PAGES: {
        HTML: {
            START: "src/html/start.html",
            WIN: "src/html/win.html",
            LOSE: "src/html/lose.html",
            INDEX: "../index.html"
        },
        CSS: {
            STYLE: "src/css/style.css"
        },
        JS: {
            GAME_LOGIC: "src/js/game.js"
        }
        
    }
};
