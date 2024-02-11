document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('preferencesForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Obtener los valores del formulario
        const userName = document.getElementById('userName').value;
        const backgroundColor = document.getElementById('backgroundColor').value;
        const textColor = document.getElementById('textColor').value;
        const favoriteAlbum = document.getElementById('favoriteAlbum').value;

        // Crear un objeto con las preferencias del usuario
        const userPreferences = {
            userName: userName,
            backgroundColor: backgroundColor,
            textColor: textColor,
            favoriteAlbum: favoriteAlbum
        };

        // Guardar las preferencias en el almacenamiento local
        localStorage.setItem('userPreferences', JSON.stringify(userPreferences));

        // Opcionalmente, redirigir al usuario a la página de saludo o mostrar un mensaje
        alert('Preferencias guardadas exitosamente.');
        window.location.href = 'discografia.html'; // Descomenta para redirigir
    });
});
