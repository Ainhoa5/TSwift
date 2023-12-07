class News {
    constructor(title, content, eventDate, tags, category, importance) {
        this.title = title;
        this.content = content;
        this.eventDate = eventDate;
        this.tags = tags;
        this.category = category;
        this.importance = importance;
    }
    
    static allNews = [];
    static loadNews() {
        // Cargar noticias desde la base de datos y añadirlas a allNews
    }
    save() {
        console.log(this.tags);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "../../../app/controller/NewsController.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onload = () => {
            if (xhr.status === 200) {
                try {
                    var response = JSON.parse(xhr.responseText);
                    if (response.success) {
                        News.allNews.push(this); // Añadir la nueva noticia al array
                        News.displayAll(); // Actualizar la visualización de las noticias
                    } else {
                        console.error("Error from PHP:", response.message);
                    }
                } catch (e) {
                    console.error("Could not parse JSON:", e);
                }
            }
        };

        xhr.onerror = () => {
            console.error("Request error:", xhr.status, xhr.statusText);
        };

        // Include the new fields in the form data
        var formData = `title=${encodeURIComponent(this.title)}&content=${encodeURIComponent(this.content)}&eventDate=${encodeURIComponent(this.eventDate)}&tags=${encodeURIComponent(this.tags)}&category=${encodeURIComponent(this.category)}&importance=${encodeURIComponent(this.importance)}`;
        xhr.send(formData);
    }

    display() {
        var newsContainer = document.getElementById('news-container');
    
        var newsItem = document.createElement('div');
        newsItem.classList.add('news-item');
    
        var titleElement = document.createElement('h3');
        titleElement.textContent = this.title;
    
        var contentElement = document.createElement('p');
        contentElement.textContent = this.content;
    
        // Add the elements only if they have value
        newsItem.appendChild(titleElement);
        newsItem.appendChild(contentElement);
    
        if (this.eventDate) {
            var dateElement = document.createElement('p');
            dateElement.textContent = `Fecha del Evento: ${this.eventDate}`;
            dateElement.classList.add('news-date'); // Add class for styling
            newsItem.appendChild(dateElement);
        }
    
        if (this.tags) {
            var tagsElement = document.createElement('p');
            tagsElement.textContent = `Etiquetas: ${this.tags}`;
            tagsElement.classList.add('news-tags'); // Add class for styling
            newsItem.appendChild(tagsElement);
        }
    
        if (this.category) {
            var categoryElement = document.createElement('p');
            categoryElement.textContent = `Categoría: ${this.category}`;
            categoryElement.classList.add('news-category'); // Add class for styling
            newsItem.appendChild(categoryElement);
        }
    
        if (this.importance) {
            var importanceElement = document.createElement('p');
            importanceElement.textContent = `Importancia: ${this.importance}`;
            importanceElement.classList.add('news-importance'); // Add class for styling
            newsItem.appendChild(importanceElement);
        }
    
        newsContainer.appendChild(newsItem);
    }
    static displayAll() {
        const newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML = ''; // Limpia el contenedor actual de noticias
        News.allNews.forEach(newsItem => newsItem.display());
    }
    
}
