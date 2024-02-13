class Audio extends Multimedia {
    constructor(src, title, controls, type) {
        super(src, title);
        this.controls = controls;
        this.type = type;
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
        videoElement.controls = true; // Asumimos que queremos controles por defecto
        videoElement.setAttribute('allowfullscreen', this.allowFullscreen);
        mediaContainer.appendChild(videoElement);
    }
    
}
