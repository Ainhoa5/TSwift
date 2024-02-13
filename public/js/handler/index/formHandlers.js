$(document).on('submit', '#newsForm', function(e) { // handle form submit
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    let isValid = true;

    // Asumiendo que estas funciones de validación ahora aceptan un objeto JQuery como parámetro
    isValid &&= validateEventDate();
    isValid &&= validateNotEmpty($("#title"));
    isValid &&= validateNotEmpty($("#content"));

    if (isValid) {
        // Utilizar JQuery para simplificar la obtención de valores
        let title = $("#title").val();
        let content = $("#content").val();
        let eventDate = $("#eventDate").val();
        let tags = $("#tags").val();
        let latitude = $("#latitude").val();
        let longitude = $("#longitude").val();
        let category = $('input[name="category"]:checked').val() || "";
        let importance = $('input[name="importance"]:checked').val() || "";

        // Asumiendo que News es una clase que ya existe y tiene un método save adecuado
        let newsItem = new News(title, content, eventDate, tags, category, importance, latitude, longitude);
        newsItem.save(); // Esta llamada sigue siendo válida, asumiendo que News.save() gestiona la petición AJAX
    }
});
