class Audio extends Multimedia {
    constructor(src, title, controls, type) {
        super(src, title);
        this.controls = controls;
        this.type = type;
    }

    display() {
        let mediaSection = document.getElementById('audios');
        let mediaContainer = mediaSection.querySelector('.media-content');
    
        if (!mediaContainer) {
            mediaContainer = document.createElement('div');
            mediaContainer.className = 'media-content';
            mediaSection.appendChild(mediaContainer);
        }
    
        const audioElement = document.createElement('audio');
        audioElement.controls = this.controls;
        const sourceElement = document.createElement('source');
        sourceElement.src = this.src;
        sourceElement.type = this.type;
        audioElement.appendChild(sourceElement);
        mediaContainer.appendChild(audioElement);
    }
    
}
