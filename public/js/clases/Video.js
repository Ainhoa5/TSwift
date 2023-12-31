class Video extends Multimedia {
    constructor(src, title, width, height, frameBorder, allowFullscreen) {
        super(src, title);
        this.width = width;
        this.height = height;
        this.frameBorder = frameBorder;
        this.allowFullscreen = allowFullscreen;
    }

    display() {
        let mediaSection = document.getElementById('videos');
        let mediaContainer = mediaSection.querySelector('.media-content');
    
        if (!mediaContainer) {
            mediaContainer = document.createElement('div');
            mediaContainer.className = 'media-content';
            mediaSection.appendChild(mediaContainer);
        }
    
        const videoElement = document.createElement('iframe');
        videoElement.src = this.src;
        videoElement.width = this.width;
        videoElement.height = this.height;
        videoElement.frameBorder = this.frameBorder;
        videoElement.allowFullscreen = this.allowFullscreen;
        mediaContainer.appendChild(videoElement);
    }
    
}
