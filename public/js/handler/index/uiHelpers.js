function showError($element, message) {
    $element.css('border-color', 'red');
    let errorElement = $("<span>").addClass("error-message").text(message);
    if ($element.next(".error-message").length === 0) {
        $element.after(errorElement);
    }
}

function showSuccess($element) {
    $element.css('border-color', 'green');
    $element.next(".error-message").remove();
}

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        $('#latitude').val(position.coords.latitude);
        $('#longitude').val(position.coords.longitude);
      }, function(error) {
        alert("Error al obtener la ubicación: " + error.message);
      });
    } else {
      alert("La Geolocalización no está soportada por este navegador.");
    }
  }
  
  
