// This is the correct way to use 'DOMContentLoaded', wrapping all the initialization logic within it.
document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("newsForm");
  var btn = document.getElementById("openNewsFormBtn");
  var span = document.getElementsByClassName("closeBtn")[0];

  if (btn) {
    btn.onclick = function () {
      form.style.display = "block";
    };
  }

  if (span) {
    span.onclick = function () {
      form.style.display = "none";
    };
  }

  window.onclick = function (event) {
    if (event.target == form) {
      form.style.display = "none";
    }
  };
  // Elementos del formulario
  var eventDate = document.getElementById("eventDate");
  var tags = document.getElementById("tags");
  var title = document.getElementById("title");
  var content = document.getElementById("content");

  // Event listeners para validación
  eventDate.addEventListener("blur", validateEventDate);
  tags.addEventListener("blur", validateTags);
  title.addEventListener("blur", validateNotEmpty);
  content.addEventListener("blur", validateNotEmpty);

  function validateEventDate() {
    // Primero, verifica si el campo de fecha está visible
    var eventDateGroup = document.getElementById("eventDateGroup");
    if (eventDateGroup.style.display === "none") {
      return true; // El campo está oculto, por lo que se considera "válido"
    }

    // Aquí continúa con la validación normal si el campo está visible
    var eventDate = document.getElementById("eventDate");
    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    var selectedDate = new Date(eventDate.value);

    if (selectedDate < currentDate) {
      showError(
        eventDate,
        "La fecha del evento no puede ser anterior a la fecha actual."
      );
      return false;
    } else {
      showSuccess(eventDate);
      return true;
    }
  }
  function validateTags() {
    var regex = /^[a-zA-Z0-9]+(,[a-zA-Z0-9]+)*$/;

    // Verifica si el campo está vacío. Si lo está, considera la validación como exitosa.
    if (tags.value.trim() === '') {
        showSuccess(tags);
        return true;
    }

    // Si el campo no está vacío, entonces aplica la expresión regular.
    if (!regex.test(tags.value)) {
        showError(tags, "Las etiquetas deben estar separadas por comas sin espacios.");
        return false;
    } else {
        showSuccess(tags);
        return true;
    }
}

  function validateNotEmpty(event) {
    var element = event.target;
    if (element.value.trim() === "") {
      showError(element, "Este campo no puede estar vacío.");
      return false;
    } else {
      showSuccess(element);
      return true;
    }
  }
  function showError(element, message) {
    element.style.borderColor = "red";
    // Muestra el mensaje de error
    var errorElement = document.createElement("span");
    errorElement.classList.add("error-message");
    errorElement.textContent = message;
    if (element.nextSibling.className !== "error-message") {
      element.parentNode.insertBefore(errorElement, element.nextSibling);
    }
  }
  function showSuccess(element) {
    element.style.borderColor = "green";
    // Elimina el mensaje de error si existe
    if (element.nextSibling.className === "error-message") {
      element.parentNode.removeChild(element.nextSibling);
    }
  }

  // Seleccionamos el checkbox y el grupo del campo de fecha del evento
  var checkbox = document.getElementById("category_event");
  var eventDateGroup = document.getElementById("eventDateGroup");

  // Añadimos un event listener al cambio del checkbox
  checkbox.addEventListener("change", function () {
    // Si el checkbox está marcado, mostramos el campo de fecha
    if (checkbox.checked) {
      eventDateGroup.style.display = "block";
    } else {
      // Si no está marcado, ocultamos el campo
      eventDateGroup.style.display = "none";
    }
  });
  var newsForm = document.getElementById("newsForm");
  if (newsForm) {
    newsForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var isValid = true;

      // Llama a las funciones de validación
      isValid &&= validateEventDate();
      isValid &&= validateTags();
      isValid &&= validateNotEmpty({
        target: document.getElementById("title"),
      });
      isValid &&= validateNotEmpty({
        target: document.getElementById("content"),
      });

      // Si todas las validaciones son correctas, procesa el formulario
      if (isValid) {
        var title = document.getElementById("title").value;
        var content = document.getElementById("content").value;

        var newsItem = new News(title, content);
        newsItem.save();
      }
    });
  }

  // Fetch and display the news items on page load.
  console.log("DOMContentLoaded executed");
  fetch("../../../app/handlers/getNews.php")
    .then((response) => response.json())
    .then((newsItems) => {
      newsItems.forEach((itemData) => {
        // Create an instance of News for each item
        let newsItem = new News(itemData.title, itemData.content);
        newsItem.display();
      });
    })
    .catch((error) => console.error("Error fetching news:", error));
});
