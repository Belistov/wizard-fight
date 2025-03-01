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
            drawLandmarks(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 20 });

            const gesture = detectGesture(landmarks);
            playerAction(gesture);
        }
    }
}

let lastGesture = null; // Store the last detected gesture

function detectGesture(landmarks) {
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    const middleTip = landmarks[12];
    const ringTip = landmarks[16];
    const pinkyTip = landmarks[20];

    let gesture = null;

    if (thumbTip.y && indexTip.y && pinkyTip.y < middleTip.y && ringTip.y) {
        gesture = 'attack'; // Fireball
    } else if (thumbTip.y < indexTip.y && thumbTip.y < middleTip.y) {
        gesture = 'heal'; // Heal
    } else if (thumbTip.y && indexTip.y && middleTip.y && ringTip.y && pinkyTip.y) {
        gesture = 'shield'; // Shield
    }

    if (gesture && gesture !== lastGesture) {
        console.log(`${gesture} registered`);
        lastGesture = gesture; // Update last detected gesture

        // Clear the gesture after a short delay to allow new gestures
        setTimeout(() => {
            lastGesture = null;
        }, 1450); // Adjust delay as needed (500ms = 0.5 seconds)

        return gesture;
    }

    return null; // No new gesture detected
}

function rollDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
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

    } else {
        if (shieldElement) {
            shieldElement.style.opacity = "0";
            setTimeout(() => {
                if (document.getElementById(`${targetId}-shield`)) {
                    document.getElementById(`${targetId}-shield`).remove();
                }
            }, 300);
        }
    }
}

function playerAction(action) {
    setButtonsState(true); // Disable buttons immediately after player action

    if (action === "attack") {
        let damage = rollDice(6);
        let blockedDamage = 0;
        let reducedDamage = damage;
        AudioManager.playSound("ATTACK");

        if (enemyShieldActive) {
            blockedDamage = rollDice(4);
            reducedDamage = Math.max(0, damage - blockedDamage);
            enemyShieldActive = false; // Shield breaks after blocking one attack
            toggleShieldEffect("enemy", false);
            AudioManager.playSound("SHIELD_DEACTIVATE");

        }

        logAction(`🔥 Player casts Fireball! Damage: ${damage} (Blocked: ${blockedDamage}, Final: ${reducedDamage})`);

        if (blockedDamage > 0) {
            createFloatingNumber("enemy", blockedDamage, "shield-block");
        }

        createFloatingNumber("enemy", reducedDamage, "damage");
        glowEffect("enemy", "red");

        enemyHealth = Math.max(0, enemyHealth - reducedDamage);
        document.getElementById("enemy").classList.add("shake");
        setTimeout(() => document.getElementById("enemy").classList.remove("shake"), 200);
        setTimeout(() => enemyTurn(), 1000);
    } 
    
    else if (action === "heal") {
        let healAmount = rollDice(4);
        playerHealth = Math.min(75, playerHealth + healAmount);
        logAction(`💚 Player heals for ${healAmount} HP.`);
        createFloatingNumber("player", healAmount, "heal");
        glowEffect("player", "green");
        AudioManager.playSound("HEAL");
        setTimeout(() => enemyTurn(), 1000);
    } 
    
    else if (action === "shield") {
        if (!playerShieldActive) {
            playerShieldActive = true;
            toggleShieldEffect("player", true);
            logAction(`🛡 Player activates Shield!`);
            AudioManager.playSound("SHIELD_ACTIVATE");

        }
        setTimeout(() => enemyTurn(), 1000);
    }

    updateHealthBars();
    checkGameOver();
    setTimeout(() => enemyTurn(), 1000);
}


let lastEnemyAction = null; // Store last enemy action
let enemyTurnInProgress = false; // Prevent multiple turns happening too fast

function enemyTurn() {
    if (enemyTurnInProgress) return; // If a turn is already happening, do nothing
    enemyTurnInProgress = true; // Mark turn as in progress

    let action = decideEnemyAction();

    // Prevent repeating the same action consecutively
    while (action === lastEnemyAction) {
        action = decideEnemyAction();
    }

    lastEnemyAction = action; // Store the new action

    if (action === "attack") {
        handleEnemyAttack();
        AudioManager.playSound("ATTACK");

    } else if (action === "heal") {
        handleEnemyHeal();
        AudioManager.playSound("HEAL");

    } else if (action === "shield") {
        handleEnemyShield();
        AudioManager.playSound("SHIELD_ACTIVATE");

    }

    updateHealthBars();
    checkGameOver();

    // Add a delay before allowing another enemy turn
    setTimeout(() => {
        enemyTurnInProgress = false; // Reset turn status
        setButtonsState(false); // Enable player actions
    }, 1000); // Adjust delay as needed (1000ms = 1 second)
}

function handleEnemyAttack() {
    let damage = rollDice(6);
    let blockedDamage = 0;
    let reducedDamage = damage;

    if (playerShieldActive) {
        blockedDamage = rollDice(4);
        reducedDamage = Math.max(0, damage - blockedDamage);
        playerShieldActive = false; // Shield breaks after blocking one attack
        toggleShieldEffect("player", false);
        AudioManager.playSound("SHIELD_DEACTIVATE");

    }

    logAction(`🔥 Enemy attacks for ${damage} (Blocked: ${blockedDamage}, Final: ${reducedDamage})`);

    if (blockedDamage > 0) {
        createFloatingNumber("player", blockedDamage, "shield-block");
    }

    createFloatingNumber("player", reducedDamage, "damage");
    glowEffect("player", "red");

    playerHealth = Math.max(0, playerHealth - reducedDamage);

    document.getElementById("player").classList.add("shake");
    setTimeout(() => document.getElementById("player").classList.remove("shake"), 200);
}

function handleEnemyHeal() {
    let healAmount = rollDice(4);
    enemyHealth = Math.min(75, enemyHealth + healAmount);
    logAction(`💚 Enemy heals for ${healAmount} HP.`);
    createFloatingNumber("enemy", healAmount, "heal");
    glowEffect("enemy", "green");
}

function handleEnemyShield() {
    if (!enemyShieldActive) {
        enemyShieldActive = true;
        toggleShieldEffect("enemy", true);
        logAction("🛡 Enemy activates Shield!");
    }
}

function decideEnemyAction() {
    let healthPercentage = (enemyHealth / 75) * 100;
    let roll = Math.random() * 100;

    // Don't let the enemy just copy the player's last move
    let possibleActions = ["attack", "heal", "shield"];
    
    // Decide based on health percentage and random roll
    if (healthPercentage > 80) return roll < 70 ? "attack" : roll < 85 ? "shield" : "heal";
    if (healthPercentage > 50) return roll < 60 ? "attack" : roll < 75 ? "shield" : "heal";
    if (healthPercentage > 20) return roll < 45 ? "attack" : roll < 70 ? "shield" : "heal";
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