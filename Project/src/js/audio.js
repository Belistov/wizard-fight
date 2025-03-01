const AudioManager = {
    playSound: function (soundKey) {
        if (CONFIG.AUDIO.ACTION[soundKey]) {
            let audio = new Audio(CONFIG.AUDIO.ACTION[soundKey]);
            audio.volume = 0.7;
            audio.play();
        } else {
            console.error(`Audio key '${soundKey}' not found in CONFIG.AUDIO.ACTION`);
        }
    },

    playMusic: function (musicKey, loop = true) {
        if (CONFIG.AUDIO.MUSIC[musicKey]) {
            let music = new Audio(CONFIG.AUDIO.MUSIC[musicKey]);
            music.volume = 0.5;
            music.loop = loop;
            music.play();
            return music; // Return music instance so it can be stopped later
        } else {
            console.error(`Music key '${musicKey}' not found in CONFIG.AUDIO.MUSIC`);
        }
    },

    stopMusic: function (musicInstance) {
        if (musicInstance) {
            musicInstance.pause();
            musicInstance.currentTime = 0;
        }
    }
};
