class Audio extends Multimedia {
    constructor(src, title, controls, type) {
        super(src, title);
        this.controls = controls;
        this.type = type;
    }

    createMediaElement() {
        const videoElement = document.createElement('video');
        videoElement.src = this.src; // Asume que 'this.src' tiene la ruta del archivo
        videoElement.width = this.width;
        videoElement.height = this.height;
        videoElement.controls = true; // Muestra controles de reproducción
        videoElement.setAttribute('allowfullscreen', this.allowFullscreen);
        return videoElement;
    }


}
