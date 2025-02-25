document.addEventListener("DOMContentLoaded", async () => {
    await startCamera();
    document.getElementById("player-img").src = CONFIG.SPRITES.CHARACTERS.PLAYER;
    document.getElementById("enemy-img").src = CONFIG.SPRITES.CHARACTERS.ENEMY;
});

async function startCamera() {
    const video = document.getElementById("camera-feed");
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.style.transform = "scaleX(-1)";
}