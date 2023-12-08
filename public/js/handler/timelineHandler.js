// Se agrega un listener para ejecutar el código una vez que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Realiza una solicitud fetch al controlador de Album
    fetch('../controller/AlbumController.php')
        .then(response => response.json()) // Convierte la respuesta en JSON
        .then(data => {
            // Llama a las funciones para crear la línea de tiempo y sus botones, e inicializar la interactividad
            createTimeline(data);
            createTimelineButtons(data);
            initializeTimelineInteractivity();
        })
        .catch(error => console.error('Error:', error)); // Maneja los errores
});

// Función para crear la línea de tiempo de los álbumes
function createTimeline(albums) {
    const timelineContent = document.getElementById('timelineContent'); // Obtiene el elemento del DOM para el contenido de la línea de tiempo
    albums.forEach(album => {
        // Crea un elemento HTML para cada álbum
        const item = `
            <div class="timeline__item ${album.year === 2006 ? 'is-active' : ''}" data-year="${album.year}">
                <div class="timeline__item-row">
                    <div class="timeline__item-date">${album.year}</div>
                    <div class="timeline__item-text">
                        <h3>${album.title}</h3>
                        <p>${album.description}</p>
                    </div>
                </div>
                <img src="../../public/multimedia/img/covers/${album.cover_image}" alt="cover" style="width: 900px; ">
            </div>
        `;
        timelineContent.innerHTML += item; // Añade el elemento al contenido de la línea de tiempo
    });
}

// Función para crear botones de la línea de tiempo
function createTimelineButtons(albums) {
    const timelineButtons = document.getElementById('timelineButtons'); // Obtiene el elemento del DOM para los botones de la línea de tiempo
    albums.forEach((album, index) => {
        // Crea un botón para cada álbum
        const button = `
            <div class="flex-column">
                <a href="#" class="timeline__button ${index === 0 ? 'is-active' : ''}" data-day="${album.year}"></a>
            </div>
        `;
        timelineButtons.innerHTML += button; // Añade el botón al contenedor
    });
}

// Función para inicializar la interactividad de la línea de tiempo
function initializeTimelineInteractivity() {
    const timelineButtonsContainer = document.getElementById('timelineButtons'); // Obtiene el contenedor de los botones
    const timelineItems = document.getElementsByClassName('timeline__item'); // Obtiene los elementos de la línea de tiempo

    // Agrega un listener para manejar los clics en los botones
    timelineButtonsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('timeline__button')) {
            event.preventDefault(); // Previene la acción predeterminada

            // Remueve la clase 'is-active' de todos los botones
            Array.from(timelineButtonsContainer.getElementsByClassName('timeline__button')).forEach(button => {
                button.classList.remove('is-active');
            });

            // Añade la clase 'is-active' al botón clickeado
            event.target.classList.add('is-active');

            // Obtiene el atributo 'data-day' del botón clickeado
            var day = event.target.getAttribute("data-day");

            // Actualiza el elemento activo en la línea de tiempo
            Array.from(timelineItems).forEach(item => {
                item.classList.remove('is-active');
                if (item.getAttribute("data-year") === day) {
                    item.classList.add('is-active');
                }
            });
        }
    });
}
