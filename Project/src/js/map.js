function spawnCloud() {
    const gameContainer = document.getElementById("game-container");
    if (!gameContainer) {
        console.error("Game container not found! Make sure #game-container exists in index.html");
        return;
    }

    let cloud = document.createElement("img");
    cloud.src = CONFIG.SPRITES.ENVIRONMENT.CLOUD[`CLOUD${Math.floor(Math.random() * 3) + 1}`];
    cloud.classList.add("cloud");

    // Random height (Above wizards)
    cloud.style.position = "absolute";
    cloud.style.top = `${Math.random() * 10 + 1}%`;
    cloud.style.width = "100px"; // Default size (adjustable)
    cloud.style.opacity = "1"; // Slight transparency

    // Random direction (left to right or right to left)
    let direction = Math.random() > 0.5 ? "left" : "right";

    if (direction === "left") {
        cloud.style.left = "-15%"; // Start off-screen left
        cloud.dataset.direction = "right";
    } else {
        cloud.style.left = "110%"; // Start off-screen right
        cloud.dataset.direction = "left";
        cloud.style.transform = "scaleX(-1)"; // Flip horizontally
    }

    // Append cloud to game-container
    gameContainer.appendChild(cloud);

    // Random movement speed (6-12 seconds)
    let speed = Math.random() * 6 + 6;

    setTimeout(() => {
        cloud.style.transition = `left ${speed}s linear`;
        cloud.style.left = direction === "left" ? "110%" : "-15%";
    }, 100);

    // Remove cloud and respawn after movement ends
    setTimeout(() => {
        cloud.remove();
        spawnCloud(); // Ensure new cloud is spawned after one disappears
    }, speed * 1000);
}

// Function to spawn bird with rare chance
function spawnBird() {
    const gameContainer = document.getElementById("game-container");
    if (!gameContainer) {
        console.error("Game container not found! Make sure #game-container exists in index.html");
        return;
    }

    // Chance for the bird to appear (e.g., 10% chance)
    if (Math.random() > 0.9) {
        let bird = document.createElement("img");
        bird.src = CONFIG.SPRITES.ENVIRONMENT.BIRD;
        bird.classList.add("bird");

        // Random height for bird
        bird.style.position = "absolute";
        bird.style.top = `${Math.random() * 45 + 5}%`; // Random height between 5% and 45%
        bird.style.width = "100px"; // Default size (adjustable)
        bird.style.opacity = "1"; // Full opacity

        // Random direction (left to right or right to left)
        let direction = "left";

        if (direction === "left") {
            bird.style.left = "-15%"; // Start off-screen left
            bird.dataset.direction = "right";
        }  
        // Append bird to game-container
        gameContainer.appendChild(bird);

        // Random movement speed (6-12 seconds)
        let speed = Math.random() * 6 + 6;

        setTimeout(() => {
            bird.style.transition = `left ${speed}s linear`;
            bird.style.left = direction === "left" ? "110%" : "-15%";
        }, 100);

        // Remove bird after movement ends
        setTimeout(() => {
            bird.remove();
        }, speed * 1000);
    }

    // Call the function again to keep checking for the bird spawn (interval of 5 seconds)
    setTimeout(spawnBird, 5000); // Checks every 5 seconds for a bird to spawn
}

// Function to animate player and enemy floating
function animateFloat() {
    const player = document.getElementById("player");
    const enemy = document.getElementById("enemy");

    // If the player and enemy exist, apply floating effect
    if (player) {
        player.style.animation = "float 3s ease-in-out infinite";  // Apply floating animation
    }

    if (enemy) {
        enemy.style.animation = "float 3s ease-in-out infinite";  // Apply floating animation
    }
}

// Add floating animation via keyframes in CSS
function addFloatingAnimation() {
    const styleSheet = document.styleSheets[0];  // Use the first stylesheet
    const keyframes = `
        @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
        }
    `;

    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);  // Add keyframes to the stylesheet
}

// Start the animation for floating and bird spawning
function startGame() {
    console.log("Starting game...");

    // Ensure the game container exists
    const gameContainer = document.getElementById("game-container");
    if (!gameContainer) {
        console.error("Game container not found! Make sure #game-container exists in index.html");
        return;
    }

    // Add the floating animation to CSS
    addFloatingAnimation();  

    // Start the floating animation for player and enemy
    animateFloat();  

    // Start spawning clouds
    for (let i = 0; i < 7; i++) {
        setTimeout(spawnCloud, i * 1500); // Staggered spawns every 1.5 seconds
    }

    // Start the bird spawning with rare chance
    spawnBird();
}

// Ensure game starts when page loads
document.addEventListener("DOMContentLoaded", startGame);