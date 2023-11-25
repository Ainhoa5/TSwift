class AudioContent extends MultimediaContent {
    constructor(title, uploadDate, audioUrl) {
        super(title, uploadDate);
        this.audioUrl = audioUrl;
    }

    listen() {
        // Método específico para escuchar el audio
    }
}
