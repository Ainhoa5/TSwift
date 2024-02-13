class CustomPlayer {
    constructor() {
        this.currentMedia = null; // Referencia al elemento multimedia actual
    }

    // Método para establecer el medio actual (video o audio)
    setMedia(mediaElement) {
        this.currentMedia = mediaElement;
    }

    play() {
        if (this.currentMedia) this.currentMedia.play();
    }

    pause() {
        if (this.currentMedia) this.currentMedia.pause();
    }

    stop() {
        if (this.currentMedia) {
            this.currentMedia.pause();
            this.currentMedia.currentTime = 0;
        }
    }

    rewind(seconds = 10) {
        if (this.currentMedia) this.currentMedia.currentTime -= seconds;
    }

    fastForward(seconds = 10) {
        if (this.currentMedia) this.currentMedia.currentTime += seconds;
    }
    setVolume(volumeLevel) {
        if (this.currentMedia) {
            this.currentMedia.volume = volumeLevel;
        }
    }
    setupProgressIndicator(progressElement) {
        if (this.currentMedia) {
            this.currentMedia.addEventListener('timeupdate', () => {
                const value = (100 / this.currentMedia.duration) * this.currentMedia.currentTime;
                progressElement.value = value;
            });
        }
    }
    toggleFullscreen() {
        if (this.currentMedia) {
            if (this.currentMedia.requestFullscreen) {
                this.currentMedia.requestFullscreen();
            } else if (this.currentMedia.webkitRequestFullscreen) { // Safari
                this.currentMedia.webkitRequestFullscreen();
            } else if (this.currentMedia.mozRequestFullScreen) { // Firefox
                this.currentMedia.mozRequestFullScreen();
            } else if (this.currentMedia.msRequestFullscreen) { // IE11
                this.currentMedia.msRequestFullscreen();
            }
        }
    }
}
