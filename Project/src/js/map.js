// Fuglarnir fljúga
// player and Enemy stand on platform_cloud.svg

// environment.svg
// - gera smá pixel hue hjá background fyrir meira astetic

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
// Adjust cloud height to be higher above wizards
    cloud.style.top = `${Math.random() * 3 + 1}%`;
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

// Function to start cloud spawning when page loads
function spawnClouds() {
    for (let i = 0; i < 3; i++) {
        setTimeout(spawnCloud, i * 4000); // Staggered spawns every 4 seconds
    }
}

// Ensure clouds start when page loads
document.addEventListener("DOMContentLoaded", spawnClouds);

