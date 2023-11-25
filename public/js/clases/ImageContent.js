class ImageContent extends MultimediaContent {
    constructor(title, uploadDate, imageUrl) {
        super(title, uploadDate);
        this.imageUrl = imageUrl;
    }

    enlarge() {
        // Método específico para ampliar la imagen
    }
}
    