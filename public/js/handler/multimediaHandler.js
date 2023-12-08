// Este evento se dispara cuando el contenido del DOM está completamente cargado
document.addEventListener('DOMContentLoaded', function () {
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
                    case 'image':
                        // Crea un nuevo objeto Image
                        mediaObject = new Image('../../public/multimedia/img/' + item.src, item.title, item.width, item.altText);
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
                mediaObject.display();
            });
        })
        .catch(error => console.error('Error fetching data:', error)); // Maneja errores en la solicitud fetch

    // Función para alternar la visualización de los contenedores de multimedia
    function toggleDisplay(mediaContainer) {
        if (mediaContainer) {
            // Alterna entre mostrar y ocultar el contenido
            mediaContainer.style.display = mediaContainer.style.display === 'none' ? 'block' : 'none';
        } else {
            // Error en caso de que el contenedor de medios sea nulo
            console.error('Media container is null');
        }
    }

    // Selecciona todos los encabezados de sección y oculta inicialmente el contenido
    const sectionHeaders = document.querySelectorAll('section > h2');
    sectionHeaders.forEach(header => {
        console.log('Header found:', header); // Línea de depuración
        const mediaContainer = header.nextElementSibling;
        console.log('Media Container found:', mediaContainer); // Línea de depuración

        if (mediaContainer) {
            // Oculta inicialmente todas las secciones
            mediaContainer.style.display = 'none';
            // Adjunta un listener de evento de clic a cada encabezado
            header.addEventListener('click', () => toggleDisplay(mediaContainer));
        } else {
            // Error en caso de que el contenedor de multimedia no se encuentre
            console.error('Media container not found for header:', header);
        }
    });
});
