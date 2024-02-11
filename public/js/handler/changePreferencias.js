const albumData = {
    "albums": [
        {
            "name": "Fearless",
            "description": "Fearless es el segundo álbum de estudio de Taylor Swift...",
            "image": "../../public/multimedia/img/preferencias/fearless.jpg"
        },
        {
            "name": "1989",
            "description": "1989 es el quinto álbum de estudio de Taylor Swift...",
            "image": "../../public/multimedia/img/preferencias/1989.jpg"
        },
        {
            "name": "Reputation",
            "description": "Reputation es el sexto álbum de estudio de Taylor Swift...",
            "image": "../../public/multimedia/img/preferencias/reputation.jpg"
        }
        // Añade más álbumes según sea necesario
    ]
};


document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencia al botón
    const deleteButton = document.getElementById('deletePreferences');

    // Agregar evento de clic al botón
    deleteButton.addEventListener('click', function () {
        // Borrar las preferencias del almacenamiento local
        localStorage.removeItem('userPreferences');

        // Opcional: Mostrar un mensaje de confirmación
        alert('Preferencias eliminadas.');

        // Redirigir al usuario a la página de establecimiento de preferencias
        window.location.href = 'preferencias.html';
    });

    // Verificar si las preferencias del usuario están guardadas en el almacenamiento local
    const userPreferences = localStorage.getItem('userPreferences');

    // Si no existen preferencias guardadas, redirigir al formulario de preferencias
    if (!userPreferences) {
        window.location.href = 'preferencias.html';
    }
    // Si existen preferencias, aplicarlas a la página
    else {
        const preferences = JSON.parse(userPreferences);
        const favoriteAlbum = albumData.albums.find(album => album.name === preferences.favoriteAlbum);

        // Aplicar las preferencias de colores
        document.body.style.backgroundColor = preferences.backgroundColor;
        document.body.style.color = preferences.textColor;

        // Actualizar la sección de biografía
        if (favoriteAlbum) {
            document.querySelector('#biography .title').textContent = `Taylor Swift - ${favoriteAlbum.name}`;
            document.querySelector('#biography .bio-text h3').textContent = `About ${favoriteAlbum.name}`;
            document.querySelector('#biography .bio-text p').textContent = favoriteAlbum.description;
            document.querySelector('#biography .bio-image img').src = favoriteAlbum.image;
            document.querySelector('#biography .bio-image img').alt = `Taylor Swift - ${favoriteAlbum.name}`;
        }
    }
});
