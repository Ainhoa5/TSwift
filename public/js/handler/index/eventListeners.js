$('#getLocation').click(function () {
    getLocation();
});
// Manejo de Eventos y Funciones Específicas con JQuery
$('#category_event').change(function () {
    if ($(this).is(':checked')) {
        $('#eventDateGroup').show();
    } else {
        $('#eventDateGroup').hide();
    }
});
function initializeNearbySearch() {
    $('#search-nearby-button').click(function (event) {
        event.preventDefault(); // Prevenir la acción por defecto del enlace
        navigator.geolocation.getCurrentPosition(function (position) {
            searchNearbyNews(position.coords.latitude, position.coords.longitude);
        }, function (error) {
            console.error("Error obtaining location:", error);
        });
    });
}

function initializeSearchBar() {
    // Configura el botón de búsqueda para buscar noticias utilizando JQuery
    $('#search-button').click(function () {
        var searchTerm = $('#search-input').val();
        searchNews(searchTerm);
    });
}
function initializeFormPopup() {
    var $form = $("#newsForm");
    var $btn = $("#openNewsFormBtn");
    var $span = $(".closeBtn").first();

    // Configura el botón para abrir el formulario
    $btn.click(function () {
        $form.css("display", "block");
    });

    // Configura el botón (o elemento) para cerrar el formulario
    $span.click(function () {
        $form.css("display", "none");
    });

    // Cierra el formulario al hacer clic fuera de él
    $(window).click(function (event) {
        if ($(event.target).is($form)) {
            $form.css("display", "none");
        }
    });
}
