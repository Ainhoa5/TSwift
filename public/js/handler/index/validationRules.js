function validateField() {
    var validationType = $(this).data('validationType'); // Usa JQuery para acceder a los atributos data-

    switch (validationType) {
        case 'date':
            validateEventDate();
            break;
        case 'text':
            validateText($(this)); // Pasamos el objeto JQuery del campo a validar
            break;
        // Añadir más casos según sea necesario
    }
}
function initializeFormValidation() {
    $('.form-field').each(function () {
        var $field = $(this);
        var timeout = null; // Variable para almacenar el ID del temporizador

        // Asignar el tipo de validación según el id o alguna otra propiedad
        switch ($field.attr('id')) {
            case 'eventDate':
                $field.data('validationType', 'date');
                // Manejar el evento change de forma separada para eventDate
                $field.change(validateField);
                break;
            case 'tags':
            case 'title':
            case 'content':
                $field.data('validationType', 'text');
                // Añadir el evento keyup con setTimeout
                $field.keyup(function () {
                    clearTimeout(timeout); // Limpia el temporizador anterior
                    // Establece un nuevo temporizador
                    timeout = setTimeout(() => {
                        validateField.call(this); // Usamos call para asegurarnos de que this se refiere al campo dentro de validateField
                    }, 500); // 500 ms de retraso antes de validar
                });
                break;
            // Añadir más casos si hay más campos
        }
    });
}


function validateEventDate() {
    // Verifica si el campo de fecha está visible
    var $eventDateGroup = $("#eventDateGroup");
    if ($eventDateGroup.css("display") === "none") {
        return true; // Considera "válido" si el campo está oculto
    }

    // Continúa con la validación si el campo está visible
    var $eventDate = $("#eventDate");
    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    var selectedDate = new Date($eventDate.val());

    // Verifica si la fecha seleccionada es anterior a la fecha actual
    if (selectedDate < currentDate) {
        showError($eventDate, "La fecha del evento no puede ser anterior a la fecha actual.");
        return false;
    } else {
        showSuccess($eventDate);
        return true;
    }
}

function validateText($element) {
    // Verificación genérica de campo vacío
    if ($element.val().trim() === "") {
        showError($element, "Este campo no puede estar vacío.");
        return false;
    }

    // Validación específica para formato
    var regex = /^[a-zA-Z0-9 ]+(,[a-zA-Z0-9 ]+)*$/;
    if (!regex.test($element.val())) {
        showError($element, "Este campo no debe de tener caracteres especiales.");
        return false;
    }

    // Si pasa todas las validaciones
    showSuccess($element);
    return true;
}

function validateNotEmpty($element) {
    if ($element.val().trim() === "") {
        showError($element, "Este campo no puede estar vacío.");
        return false;
    } else {
        showSuccess($element);
        return true;
    }
}
