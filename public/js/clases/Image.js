class Image extends Multimedia {
        constructor(src, title, width, altText) {
            super(src, title);
            this.width = width;
            this.altText = altText;
        }

    display() {
        let mediaContainer = document.getElementById('images');
        const imageElement = document.createElement('img');
        imageElement.src = this.src;
        imageElement.width = this.width
        imageElement.alt = this.altText;
        mediaContainer.appendChild(imageElement);
    }
}
