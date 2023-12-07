document.addEventListener('DOMContentLoaded', function () {
    fetch('../../public/json/multimedia.json')
        .then(response => response.json())
        .then(mediaItems => {
            mediaItems.forEach(item => {
                let mediaObject;
                switch (item.mulType) {
                    case 'video':
                        mediaObject = new Video('../../public/multimedia/video/' + item.src, item.title, item.width, item.height, item.frameBorder, item.allowFullscreen);
                        break;
                    case 'image':
                        mediaObject = new Image('../../public/multimedia/img/' + item.src, item.title, item.width, item.altText);
                        break;
                    case 'audio':
                        mediaObject = new Audio('../../public/multimedia/audio/' + item.src, item.title, item.controls, item.type);
                        break;
                    default:
                        console.log('Unknown media type');
                        return;
                }
                mediaObject.display();
            });
        })
        .catch(error => console.error('Error fetching data:', error));
    // Function to toggle display
    function toggleDisplay(mediaContainer) {
        if (mediaContainer) {
            mediaContainer.style.display = mediaContainer.style.display === 'none' ? 'block' : 'none';
        } else {
            console.error('Media container is null');
        }
    }

    // Select all section headers and initially hide the content
    const sectionHeaders = document.querySelectorAll('section > h2');
    sectionHeaders.forEach(header => {
        console.log('Header found:', header); // Debugging line
        const mediaContainer = header.nextElementSibling;
        console.log('Media Container found:', mediaContainer); // Debugging line

        if (mediaContainer) {
            mediaContainer.style.display = 'none'; // Hide all sections initially
            // Attach a click event listener to each header
            header.addEventListener('click', () => toggleDisplay(mediaContainer));
        } else {
            console.error('Media container not found for header:', header);
        }
    });
});
