class Video extends Multimedia {
    constructor(src, title, width, height, frameBorder, allowFullscreen) {
        super(src, title);
        this.width = width;
        this.height = height;
        this.frameBorder = frameBorder;
        this.allowFullscreen = allowFullscreen;
    }

    createMediaElement() {
        const videoElement = document.createElement('video');
        videoElement.src = this.src; // Asume que 'this.src' tiene la ruta del archivo
        videoElement.width = this.width;
        videoElement.height = this.height;
        videoElement.setAttribute('allowfullscreen', this.allowFullscreen);
        return videoElement;
    }

}
