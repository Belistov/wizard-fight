let playerHealth = 75;
let enemyHealth = 75;
let playerShieldActive = false;
let enemyShieldActive = false;

function rollDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

function playAudio(audioKey) {
    let audio = new Audio(CONFIG.AUDIO[audioKey]); // Access from config.js
    audio.volume = 0.7;
    audio.play();
}

function logAction(message) {
    let logList = document.getElementById("log-list");
    let logItem = document.createElement("li");
    logItem.innerText = message;
    logList.appendChild(logItem);
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
    setButtonsState(true);

    if (action === "attack") {
        let damage = rollDice(6);
        let reducedDamage = damage;
        let blockedDamage = 0;

        if (enemyShieldActive) {
            blockedDamage = Math.floor(damage / 2);
            reducedDamage = damage - blockedDamage;
            enemyShieldActive = false;

            logAction(`🔥 Player casts Fireball! Damage: ${damage} (Shield Blocked: ${blockedDamage}, Final: ${reducedDamage})`);
            createFloatingNumber("enemy", blockedDamage, "shield-block");
            createFloatingNumber("enemy", reducedDamage, "shield-taken");

            toggleShieldEffect("enemy", false); // Remove enemy shield immediately after blocking
        } else {
            logAction(`🔥 Player casts Fireball! Deals ${damage} damage.`);
            createFloatingNumber("enemy", damage, "damage");
        }

        enemyHealth = Math.max(0, enemyHealth - reducedDamage);
        document.getElementById("enemy").classList.add("shake");
        setTimeout(() => document.getElementById("enemy").classList.remove("shake"), 200);
    } 
    
    else if (action === "heal") {
        let healAmount = rollDice(4);
        playerHealth = Math.min(75, playerHealth + healAmount);
        logAction(`💚 Player heals for ${healAmount} HP.`);
        createFloatingNumber("player", healAmount, "heal");
    } 
    
    else if (action === "shield") {
        playerShieldActive = true;
        toggleShieldEffect("player", true);
        logAction(`🛡 Player activates Shield!`);
    }

    updateHealthBars();
    setTimeout(() => setTimeout(enemyTurn, 1000), 75);
}

function enemyTurn() {
    let action = decideEnemyAction();

    if (action === "attack") {
        let damage = rollDice(6);
        let reducedDamage = damage;
        let blockedDamage = 0;

        if (playerShieldActive) {
            blockedDamage = Math.floor(damage / 2);
            reducedDamage = damage - blockedDamage;
            playerShieldActive = false;
            toggleShieldEffect("player", false);

            createFloatingNumber("player", blockedDamage, "shield-block");
            createFloatingNumber("player", reducedDamage, "shield-taken");
        } else {
            createFloatingNumber("player", reducedDamage, "damage");
        }

        playerHealth = Math.max(0, playerHealth - reducedDamage);
        logAction(`🔥 Enemy attacks for ${reducedDamage} damage.`);
        playAudio("ATTACK");

        document.getElementById("player").classList.add("shake");
        setTimeout(() => document.getElementById("player").classList.remove("shake"), 200);
    } else if (action === "heal") {
        let healAmount = rollDice(4);
        enemyHealth = Math.min(75, enemyHealth + healAmount);
        logAction(`💚 Enemy heals for ${healAmount} HP.`);
        playAudio("HEAL");
        createFloatingNumber("enemy", healAmount, "heal");
    } else if (action === "shield") {
        enemyShieldActive = true;
        toggleShieldEffect("enemy", true);
        logAction("🛡 Enemy activates Shield!");
    }

    updateHealthBars();
    setTimeout(() => setButtonsState(false), 500);
    checkGameOver();
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
        setTimeout(() => window.location.href = CONFIG.PAGES.WIN);
    } else if (playerHealth <= 0) {
        logAction("💀 Enemy wins!");
        setTimeout(() => window.location.href = CONFIG.PAGES.LOSE, );
    }
}

updateHealthBars();
