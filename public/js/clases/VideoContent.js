class VideoContent extends MultimediaContent {
    constructor(title, uploadDate, videoUrl) {
        super(title, uploadDate);
        this.videoUrl = videoUrl;
    }

    play() {
        // Método específico para reproducir el video
    }
}
