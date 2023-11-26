class Audio extends Multimedia {
    constructor(src, title, controls, type) {
        super(src, title);
        this.controls = controls;
        this.type = type;
    }

    display() {
        let mediaContainer = document.getElementById('audios');
        const audioElement = document.createElement('audio');
        audioElement.controls = this.controls;
        const sourceElement = document.createElement('source');
        sourceElement.src = this.src;
        sourceElement.type = this.type;
        audioElement.appendChild(sourceElement);
        mediaContainer.appendChild(audioElement);
    }
}
