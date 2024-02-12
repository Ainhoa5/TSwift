// Funciones de Inicialización
function initializeFormPopup() {
  var form = document.getElementById("newsForm");
  var btn = document.getElementById("openNewsFormBtn");
  var span = document.getElementsByClassName("closeBtn")[0];

  // Configura el botón para abrir el formulario y el botón para cerrarlo
  if (btn) btn.onclick = () => (form.style.display = "block");
  if (span) span.onclick = () => (form.style.display = "none");
  // Cierra el formulario al hacer clic fuera de él
  window.onclick = (event) => {
    if (event.target == form) form.style.display = "none";
  };
}

function validateField(event) {
  var field = event.target;
  var validationType = field.dataset.validationType; // Usa un atributo data- para determinar el tipo de validación

  switch (validationType) {
    case 'date':
      validateEventDate();
      break;
    case 'text':
      validateText(event);
      break;
    // Añadir más casos según sea necesario
  }
}

function initializeFormValidation() {
  var fields = document.querySelectorAll('.form-field');
  var timeout = null; // Variable para almacenar el ID del temporizador

  fields.forEach(field => {
    // Asignar el tipo de validación según el id o alguna otra propiedad
    switch (field.id) {
      case 'eventDate':
        field.dataset.validationType = 'date';
        // Manejar el evento change de forma separada para eventDate
        field.addEventListener("change", validateField);
        break;
      case 'tags':
      case 'title':
      case 'content':
        field.dataset.validationType = 'text';
        // Añadir el evento keyup con setTimeout
        field.addEventListener("keyup", function (event) {
          clearTimeout(timeout); // Limpia el temporizador anterior
          // Establece un nuevo temporizador
          timeout = setTimeout(() => {
            validateField(event);
          }, 500); // 500 ms de retraso antes de validar
        });
        break;
      // Añadir más casos si hay más campos
    }
  });
}


function initializeFormSubmission() {
  var newsForm = document.getElementById("newsForm");
  // Añade un event listener al formulario para manejar su envío
  if (newsForm) {
    newsForm.addEventListener("submit", handleFormSubmit);
  }
}

function initializeSearchBar() {
  // Configura el botón de búsqueda para buscar noticias
  document.getElementById('search-button').addEventListener('click', function () {
    var searchTerm = document.getElementById('search-input').value;
    searchNews(searchTerm);
  });
}

function handleFormSubmit(e) {
  e.preventDefault(); // Previene el comportamiento por defecto del formulario

  var isValid = true;

  // Supongamos que estas funciones de validación están definidas en otro lugar
  isValid &&= validateEventDate();
  isValid &&= validateNotEmpty({ target: document.getElementById("title") });
  isValid &&= validateNotEmpty({ target: document.getElementById("content") });

  if (isValid) {
    var title = document.getElementById("title").value;
    var content = document.getElementById("content").value;
    var eventDate = document.getElementById("eventDate").value;
    var tags = document.getElementById("tags").value;
    var latitude = document.getElementById("latitude").value;
    var longitude = document.getElementById("longitude").value;
    var category = document.querySelector('input[name="category"]:checked') ? document.querySelector('input[name="category"]:checked').value : "";
    var importance = document.querySelector('input[name="importance"]:checked') ? document.querySelector('input[name="importance"]:checked').value : "";

    // Creación del objeto News y llamada al método save
    var newsItem = new News(title, content, eventDate, tags, category, importance, latitude, longitude);
    newsItem.save();
  }
}


// LOCALIZACIÓN LOGIC
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      document.getElementById('latitude').value = position.coords.latitude;
      document.getElementById('longitude').value = position.coords.longitude;
    }, function(error) {
      alert("Error al obtener la ubicación: " + error.message);
    });
  } else {
    alert("La Geolocalización no está soportada por este navegador.");
  }
}

document.getElementById('getLocation').addEventListener('click', getLocation);


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
// Funciones de Ayuda (Helpers) y Validación
function validateEventDate() {
  // Verifica si el campo de fecha está visible
  var eventDateGroup = document.getElementById("eventDateGroup");
  if (eventDateGroup.style.display === "none") {
    return true; // Considera "válido" si el campo está oculto
  }

  // Continúa con la validación si el campo está visible
  var eventDate = document.getElementById("eventDate");
  var currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  var selectedDate = new Date(eventDate.value);

  // Verifica si la fecha seleccionada es anterior a la fecha actual
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

function validateText(event) {
  var element = event.target;

  // Verificación genérica de campo vacío
  if (element.value.trim() === "") {
    showError(element, "Este campo no puede estar vacío.");
    return false;
  }

  // Validación específica para formato
  var regex = /^[a-zA-Z0-9 ]+(,[a-zA-Z0-9 ]+)*$/;

  if (!regex.test(element.value)) {
    showError(element, "Este campo no debe de tener carácteres especiales.");
    return false;
  }

  // Si pasa todas las validaciones
  showSuccess(element);
  return true;
}


function showError(element, message) {
  element.style.borderColor = "red";
  // Crea y muestra un mensaje de error
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

// Manejo de Eventos y Funciones Específicas
var checkbox = document.getElementById("category_event");
var eventDateGroup = document.getElementById("eventDateGroup");
// Añade un event listener para mostrar/ocultar el campo de fecha basado en un checkbox
checkbox.addEventListener("change", function () {
  if (checkbox.checked) {
    eventDateGroup.style.display = "block";
  } else {
    eventDateGroup.style.display = "none";
  }
});

// logica para buscar noticias cercanas
function initializeNearbySearch() {
  document.getElementById('search-nearby-button').addEventListener('click', function (event) {
    event.preventDefault(); // Prevenir la acción por defecto del enlace
    navigator.geolocation.getCurrentPosition(function(position) {
      searchNearbyNews(position.coords.latitude, position.coords.longitude);
    }, function(error) {
      console.error("Error obtaining location:", error);
    });
  });
}

function searchNearbyNews(lat, lon) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../../../app/controller/NewsController.php?nearby=true&lat=" + lat + "&lon=" + lon, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.success) {
        document.getElementById('news-container').innerHTML = '';
        response.news.forEach(function(newsData) {
          var newsItem = new News(newsData.title, newsData.content, newsData.eventDate, newsData.tags, newsData.category, newsData.importance);
          newsItem.display();
        });
      } else {
        console.error("Error from PHP:", response.message);
      }
    }
  };
  xhr.onerror = function () {
    console.error("Request error.");
  };
  xhr.send();
}

// Llamar a initializeNearbySearch en la carga de la página o cuando sea apropiado
document.addEventListener('DOMContentLoaded', initializeNearbySearch);

// Lógica de la barra de búsqueda
function searchNews(searchTerm) {
  var xhr = new XMLHttpRequest();
  // Envía una petición para buscar noticias
  xhr.open("GET", "../../../app/controller/NewsController.php?search=" + encodeURIComponent(searchTerm), true);
  xhr.onload = () => {
    // Maneja la respuesta del servidor
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.success) {
        // Limpia y muestra las noticias que coinciden con la búsqueda
        document.getElementById('news-container').innerHTML = '';
        response.news.forEach(newsData => {
          var newsItem = new News(newsData.title, newsData.content, newsData.eventDate, newsData.tags, newsData.category, newsData.importance);
          newsItem.display();
        });
      } else {
        console.error("Error from PHP:", response.message);
      }
    }
  };
  xhr.onerror = () => {
    console.error("Request error:", xhr.status, xhr.statusText);
  };
  xhr.send();
}

function filterNews() {
  // Filtra las noticias basándose en el término de búsqueda
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  const filteredNews = News.allNews.filter(news => news.title.toLowerCase().includes(searchTerm));

  // Muestra las noticias filtradas
  News.displayAll(filteredNews);
}

// Añade un event listener al botón de búsqueda
/* document.getElementById('search-button').addEventListener('click', filterNews); */

// Obtiene y muestra las noticias al cargar la página
fetch("../../../app/handlers/getNews.php")
  .then((response) => response.json())
  .then((newsItems) => {
    // Crea objetos de noticias y los muestra
    News.allNews = newsItems.map(itemData => new News(
      itemData.title,
      itemData.content,
      itemData.eventDate,
      itemData.tags,
      itemData.category,
      itemData.importance
    ));
    News.displayAll();
  })
  .catch((error) => console.error("Error fetching news:", error));

// Inicializa las funciones al cargar el contenido del DOM
document.addEventListener("DOMContentLoaded", function () {
  initializeFormPopup();
  initializeFormValidation();
  initializeFormSubmission();
  initializeSearchBar();
});
