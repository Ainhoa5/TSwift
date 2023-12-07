class Image extends Multimedia {
    constructor(src, title, width, altText) {
        super(src, title);
        this.width = width;
        this.altText = altText;
    }

    display() {
        // First, find the parent section with the ID 'images'
        let mediaSection = document.getElementById('images');
        // Then find the first .media-content within this section
        let mediaContainer = mediaSection.querySelector('.media-content');

        // If mediaContainer is null, it means there's no .media-content div in your HTML
        if (!mediaContainer) {
            // Create the .media-content div if it doesn't exist
            mediaContainer = document.createElement('div');
            mediaContainer.className = 'media-content';
            mediaSection.appendChild(mediaContainer);
        }

        // Now, create the image element
        const imageElement = document.createElement('img');
        imageElement.src = this.src;
        imageElement.width = this.width;
        imageElement.alt = this.altText;

        // Append the image element to the mediaContainer
        mediaContainer.appendChild(imageElement);
    }
}        
