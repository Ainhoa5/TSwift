class Video extends Multimedia {
    constructor(src, title, width, height, frameBorder, allowFullscreen) {
        super(src, title);
        this.width = width;
        this.height = height;
        this.frameBorder = frameBorder;
        this.allowFullscreen = allowFullscreen;
        this.player = new CustomPlayer();
    }

    display() {
        let mediaSection = document.getElementById('videos');
        let mediaContainer = mediaSection.querySelector('.media-content');

        if (!mediaContainer) {
            mediaContainer = document.createElement('div');
            mediaContainer.className = 'media-content';
            mediaSection.appendChild(mediaContainer);
        }

        const videoElement = document.createElement('video');
        videoElement.src = this.src;
        videoElement.width = this.width;
        videoElement.height = this.height;
        videoElement.setAttribute('allowfullscreen', this.allowFullscreen);
        mediaContainer.appendChild(videoElement);

        this.player.setMedia(videoElement);
        this.assignControlEvents();
    }

    assignControlEvents() {
        const playButton = document.getElementById('playButton');
        const pauseButton = document.getElementById('pauseButton');
        const stopButton = document.getElementById('stopButton');
        const rewindButton = document.getElementById('rewindButton');
        const fastForwardButton = document.getElementById('fastForwardButton');
        const fullscreenButton = document.getElementById('fullscreenButton');

        // Remover manejadores de eventos previos si existen para evitar duplicación
        playButton.onclick = () => this.player.play();
        pauseButton.onclick = () => this.player.pause();
        stopButton.onclick = () => this.player.stop();
        rewindButton.onclick = () => this.player.rewind(10);
        fastForwardButton.onclick = () => this.player.fastForward(10);
        fullscreenButton.onclick = () => this.player.toggleFullscreen();
    }
}