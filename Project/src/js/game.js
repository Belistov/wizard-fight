let playerHealth = 75;
let enemyHealth = 75;
let playerShieldActive = false;
let enemyShieldActive = false;

document.getElementById("player-img").src = CONFIG.SPRITES.CHARACTERS.PLAYER;
document.getElementById("enemy-img").src = CONFIG.SPRITES.CHARACTERS.ENEMY;

// MediaPipe Hands
const videoElement = document.createElement("video");
const canvasElement = document.createElement("canvas");
canvasElement.width = 1920;
canvasElement.height = 1080;
document.body.appendChild(canvasElement);
const canvasCtx = canvasElement.getContext("2d");

const hands = new Hands({ locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}` });
hands.setOptions({ maxNumHands: 1, modelComplexity: 1, minDetectionConfidence: 0.8, minTrackingConfidence: 0.8 });
hands.onResults(onResults);

const cameraFeed = new Camera(videoElement, {
    onFrame: async () => { await hands.send({ image: videoElement }); },
    width: 1920,
    height: 1080
});
cameraFeed.start();

// Handahreyfingar
function onResults(results) {
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
            drawConnectors(canvasCtx, landmarks, Hands.HAND_CONNECTIONS, { color: "#00FF00", lineWidth: 20 });
            drawLandmarks(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 1 });

            const gesture = detectGesture(landmarks);
            playerAction(gesture);
        }
    }
}

function detectGesture(landmarks) {
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    const middleTip = landmarks[12];
    const ringTip = landmarks[16];
    const pinkyTip = landmarks[20];

    if (thumbTip.y && indexTip.y && pinkyTip.y < middleTip.y && ringTip.y) {
        console.log("attack registered")
        return 'attack'; // Fireball
    }
    if (thumbTip.y < indexTip.y && thumbTip.y < middleTip.y) {
        console.log("heal registered")
        return 'heal'; // Heal
    }
    if (thumbTip.y && indexTip.y && middleTip.y && ringTip.y && pinkyTip.y) {
        console.log("shield registered")
        return 'shield'; // Shield
    }
    return null;
}

function rollDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

function playAudio(audioKey) {
    let audio = new Audio(CONFIG.AUDIO[audioKey]); // Access from config.js
    audio.volume = 0.7;
    audio.play();
}

// DELETE BEFORE HANDING IN ASIGNMENT < function logAction() >
function logAction(message) {
    let logList = document.getElementById("log-list");
    let logItem = document.createElement("li");
    logItem.innerText = message;
    logList.appendChild(logItem);

    // Limit log to 10 entries
    if (logList.children.length > 2) {
        logList.removeChild(logList.firstChild);
    }
}
function updateHealthBars() {
    updateHealthBar("player-health-bar", playerHealth);
    updateHealthBar("enemy-health-bar", enemyHealth);
}

function updateHealthBar(barId, health) {
    let bar = document.getElementById(barId);
    let percentage = (health / 75) * 100;
    bar.style.width = percentage + "%";

    if (percentage > 50) {
        bar.style.backgroundColor = "green";
    } else if (percentage > 25) {
        bar.style.backgroundColor = "yellow";
    } else {
        bar.style.backgroundColor = "red";
    }

    document.getElementById(barId.replace("-bar", "-text")).innerText = `${health} HP`;
}

function setButtonsState(disabled) {
    document.querySelectorAll("#controls-container button").forEach(button => {
        button.disabled = disabled;
    });
}

function createFloatingNumber(targetId, number, type) {
    let target = document.getElementById(targetId);
    let numberElement = document.createElement("img");

    // Use number sprite from config.js
    numberElement.src = CONFIG.SPRITES.NUMBERS[number] || CONFIG.SPRITES.NUMBERS[1];

    numberElement.classList.add("floating-number", type);
    numberElement.style.position = "absolute";

    let rect = target.getBoundingClientRect();
    let randomXOffset = (Math.random() - 0.5) * 150;
    let randomYOffset = (Math.random() - 0.5) * 70;

    numberElement.style.left = `${rect.left + rect.width / 2 - 25 + randomXOffset}px`;
    numberElement.style.top = `${rect.top - 80 + randomYOffset}px`;

    document.body.appendChild(numberElement);

    setTimeout(() => {
        numberElement.style.transform = `translateY(-80px) translateX(${(Math.random() - 0.5) * 40}px)`;
        numberElement.style.opacity = "0";
    }, 500);

    setTimeout(() => numberElement.remove(), 2000);
}

function glowEffect(targetId, color) {
    let target = document.getElementById(targetId);
    target.style.transition = "filter 0.2s ease-in-out";
    target.style.filter = `drop-shadow(0px 0px 20px ${color})`;

    setTimeout(() => {
        target.style.filter = "none";
    }, 1000);
}

function toggleShieldEffect(targetId, isActive) {
    let target = document.getElementById(targetId);
    let shieldElement = document.getElementById(`${targetId}-shield`);

    if (isActive) {
        if (!shieldElement) {
            shieldElement = document.createElement("img");
            shieldElement.src = CONFIG.SPRITES.MOVESET.SHIELD; // Access from config.js
            shieldElement.id = `${targetId}-shield`;
            shieldElement.classList.add("shield-effect");
            document.body.appendChild(shieldElement);
        }

        let rect = target.getBoundingClientRect();
        shieldElement.style.position = "absolute";
        shieldElement.style.left = `${rect.left + window.scrollX + rect.width / 2 - 60}px`;
        shieldElement.style.top = `${rect.top + window.scrollY + rect.height / 2 - 60}px`;
        shieldElement.style.opacity = "1";
        shieldElement.style.zIndex = "10";

        playAudio("SHIELD_ACTIVATE");
    } else {
        if (shieldElement) {
            shieldElement.style.opacity = "0";
            setTimeout(() => {
                if (document.getElementById(`${targetId}-shield`)) {
                    document.getElementById(`${targetId}-shield`).remove();
                    playAudio("SHIELD_DEACTIVATE");
                }
            }, 300);
        }
    }
}

function playerAction(action) {
    if (action === "attack") {
        let damage = rollDice(6);
        let blockedDamage = 0;
        let reducedDamage = damage;

        if (enemyShieldActive) {
            blockedDamage = rollDice(4);
            reducedDamage = Math.max(0, damage - blockedDamage);
            enemyShieldActive = false; // Shield breaks after blocking one attack
            toggleShieldEffect("enemy", false);
        }

        logAction(`🔥 Player casts Fireball! Damage: ${damage} (Blocked: ${blockedDamage}, Final: ${reducedDamage})`);
        
        if (blockedDamage > 0) {
            createFloatingNumber("enemy", blockedDamage, "shield-block"); // Show blocked damage
        }
        
        createFloatingNumber("enemy", reducedDamage, "damage"); // Show final damage

        glowEffect("enemy", "red");

        enemyHealth = Math.max(0, enemyHealth - reducedDamage);
        document.getElementById("enemy").classList.add("shake");
        setTimeout(() => document.getElementById("enemy").classList.remove("shake"), 200);
        setTimeout(1000)
    } 
    
    else if (action === 'heal') {
        let healAmount = rollDice(4);
        playerHealth = Math.min(75, playerHealth + healAmount);
        logAction(`💚 Player heals for ${healAmount} HP.`);
        createFloatingNumber("player", healAmount, "heal");
        glowEffect("player", "green");
        setTimeout(1000)
    } 
    
    else if (action === 'shield') {
        if (!playerShieldActive) {
            playerShieldActive = true;
            toggleShieldEffect("player", true);
            logAction(`🛡 Player activates Shield!`);
            setTimeout(1000)
        }
    }

    updateHealthBars();
    checkGameOver();
    setTimeout(() => enemyTurn(), 1000);
}

function enemyTurn() {
    let action = decideEnemyAction();

    if (action === "attack") {
        let damage = rollDice(6);
        let blockedDamage = 0;
        let reducedDamage = damage;

        if (playerShieldActive) {
            blockedDamage = rollDice(4);
            reducedDamage = Math.max(0, damage - blockedDamage);
            playerShieldActive = false; // Shield breaks after blocking one attack
            toggleShieldEffect("player", false);
        }

        logAction(`🔥 Enemy attacks for ${damage} (Blocked: ${blockedDamage}, Final: ${reducedDamage})`);
        
        if (blockedDamage > 0) {
            createFloatingNumber("player", blockedDamage, "shield-block"); // Show blocked damage
        }
        
        createFloatingNumber("player", reducedDamage, "damage"); // Show final damage

        glowEffect("player", "red");

        playerHealth = Math.max(0, playerHealth - reducedDamage);
        playAudio("ATTACK");

        document.getElementById("player").classList.add("shake");
        setTimeout(() => document.getElementById("player").classList.remove("shake"), 200);
        setTimeout(1000)
    } 
    
    else if (action === "heal") {
        let healAmount = rollDice(4);
        enemyHealth = Math.min(75, enemyHealth + healAmount);
        logAction(`💚 Enemy heals for ${healAmount} HP.`);
        createFloatingNumber("enemy", healAmount, "heal");
        glowEffect("enemy", "green");
        setTimeout(1000)
    } 
    
    else if (action === "shield") {
        if (!enemyShieldActive) {
            enemyShieldActive = true;
            toggleShieldEffect("enemy", true);
            logAction("🛡 Enemy activates Shield!");
            setTimeout(1000)
        }
    }

    updateHealthBars();
    checkGameOver();
    setTimeout(() => setButtonsState(false), 500);
}

function decideEnemyAction() {
    let healthPercentage = (enemyHealth / 75) * 100;
    let roll = Math.random() * 100;

    if (healthPercentage > 80) return roll < 75 ? "attack" : roll < 85 ? "shield" : "heal";
    if (healthPercentage > 50) return roll < 65 ? "attack" : roll < 80 ? "shield" : "heal";
    if (healthPercentage > 20) return roll < 50 ? "attack" : roll < 75 ? "shield" : "heal";
    return roll < 30 ? "attack" : roll < 50 ? "shield" : "heal";
}

function checkGameOver() {
    if (enemyHealth <= 0) {
        logAction("🎉 Player wins!");
        setButtonsState(true); // Disable buttons to prevent further actions
        setTimeout(() => {
            window.location.href = "src/html/win.html"; // Redirect to win screen
        }, 1000);
        return; // Stop further execution
    } 
    
    if (playerHealth <= 0) {
        logAction("💀 Enemy wins!");
        setButtonsState(true); // Disable buttons to prevent further actions
        setTimeout(() => {
            window.location.href = "src/html/lose.html"; // Redirect to lose screen
        }, 1000);
        return; // Stop further execution
    }
}

updateHealthBars();