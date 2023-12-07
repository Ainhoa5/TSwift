document.addEventListener('DOMContentLoaded', function() {
    fetch('../../public/json/multimedia.json')
        .then(response => response.json())
        .then(mediaItems => {
            mediaItems.forEach(item => {
                let mediaObject;
                switch (item.mulType) {
                    case 'video':
                        mediaObject = new Video('../../public/multimedia/video/'+item.src, item.title, item.width, item.height, item.frameBorder, item.allowFullscreen);
                        break;
                    case 'image':
                        mediaObject = new Image('../../public/multimedia/img/'+item.src, item.title, item.width, item.altText);
                        break;
                    case 'audio':
                        mediaObject = new Audio('../../public/multimedia/audio/'+item.src, item.title, item.controls, item.type);
                        break;
                    default:
                        console.log('Unknown media type');
                        return;
                }
                mediaObject.display();
            });
        })
        .catch(error => console.error('Error fetching data:', error));
        
});
