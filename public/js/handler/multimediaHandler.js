// Este evento se dispara cuando el contenido del DOM está completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    const player = new CustomPlayer(); // Instancia global
    // Realiza una solicitud fetch para obtener los datos de multimedia desde un archivo JSON
    fetch('../../public/json/multimedia.json')
        .then(response => response.json()) // Convierte la respuesta en formato JSON
        .then(mediaItems => {
            // Itera sobre cada elemento de multimedia
            mediaItems.forEach(item => {
                let mediaObject;
                // Según el tipo de multimedia, crea un objeto específico
                switch (item.mulType) {
                    case 'video':
                        // Crea un nuevo objeto Video
                        mediaObject = new Video('../../public/multimedia/video/' + item.src, item.title, item.width, item.height, item.frameBorder, item.allowFullscreen);
                        break;
                    case 'audio':
                        // Crea un nuevo objeto Audio
                        mediaObject = new Audio('../../public/multimedia/audio/' + item.src, item.title, item.controls, item.type);
                        break;
                    default:
                        // Maneja el caso en que el tipo de multimedia es desconocido
                        console.log('Unknown media type');
                        return;
                }
                // Muestra el objeto de multimedia
                /* mediaObject.display(); */
                player.addToPlaylist(mediaObject);
            });
        })
        .catch(error => console.error('Error fetching data:', error)); // Maneja errores en la solicitud fetch

    // Tras cargar la playlist
    console.log(player.getPlayList());

    // Cargar las acciones de cada boton a los metodos del CustomPlayer
    document.getElementById('playButton').addEventListener('click', () => player.play());
    document.getElementById('pauseButton').addEventListener('click', () => player.pause()); 
    document.getElementById('stopButton').addEventListener('click', () => player.stop());
    document.getElementById('endButton').addEventListener('click', () => player.end());
    document.getElementById('rewindButton').addEventListener('click', () => player.rewind(10));
    document.getElementById('fastForwardButton').addEventListener('click', () => player.fastForward(10));
    document.getElementById('fullscreenButton').addEventListener('click', () => player.toggleFullscreen());
    document.getElementById('volumeControl').addEventListener('input', (e) => {
        const volumeLevel = e.target.value;
        player.setVolume(volumeLevel);
    });

});
