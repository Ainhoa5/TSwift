// Funciones de Inicialización
function initializeFormPopup() {
  var form = document.getElementById("newsForm");
  var btn = document.getElementById("openNewsFormBtn");
  var span = document.getElementsByClassName("closeBtn")[0];

  if (btn) btn.onclick = () => (form.style.display = "block");
  if (span) span.onclick = () => (form.style.display = "none");
  window.onclick = (event) => {
    if (event.target == form) form.style.display = "none";
  };
}
function initializeFormValidation() {
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
}
function initializeFormSubmission() {
  var newsForm = document.getElementById("newsForm");
  if (newsForm) {
    newsForm.addEventListener("submit", handleFormSubmit);
  }
}
function initializeSearchBar() {
  document.getElementById('search-button').addEventListener('click', function () {
    var searchTerm = document.getElementById('search-input').value;
    searchNews(searchTerm);
  });

}
function handleFormSubmit(e) {
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
    var eventDate = document.getElementById("eventDate").value;
    var tags = document.getElementById("tags").value;
    var category = document.querySelector('input[name="category"]:checked')
      ? document.querySelector('input[name="category"]:checked').value
      : "";
    var importance = document.querySelector(
      'input[name="importance"]:checked'
    )
      ? document.querySelector('input[name="importance"]:checked').value
      : "";

    var newsItem = new News(
      title,
      content,
      eventDate,
      tags,
      category,
      importance
    );
    newsItem.save();
  }
}


// Funciones de Ayuda (Helpers) y Validación
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
  if (tags.value.trim() === "") {
    showSuccess(tags);
    return true;
  }

  // Si el campo no está vacío, entonces aplica la expresión regular.
  if (!regex.test(tags.value)) {
    showError(
      tags,
      "Las etiquetas deben estar separadas por comas sin espacios."
    );
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

// Manejo de Eventos y Funciones Específicas
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

// search bar logic
function searchNews(searchTerm) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../../../app/controller/NewsController.php?search=" + encodeURIComponent(searchTerm), true);
  xhr.onload = () => {
      if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          if (response.success) {
              // Limpiar noticias anteriores
              document.getElementById('news-container').innerHTML = '';
              // Mostrar noticias que coinciden con la búsqueda
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
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  const filteredNews = News.allNews.filter(news => news.title.toLowerCase().includes(searchTerm));
  
  News.displayAll(filteredNews);
}

// Event listener para el botón de búsqueda o el campo de entrada
document.getElementById('search-button').addEventListener('click', filterNews);


// Fetch and display the news items on page load.
// En el archivo del manejador
fetch("../../../app/handlers/getNews.php")
  .then((response) => response.json())
  .then((newsItems) => {
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


document.addEventListener("DOMContentLoaded", function () {
  initializeFormPopup();
  initializeFormValidation();
  initializeFormSubmission();
  initializeSearchBar();
});