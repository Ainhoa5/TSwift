class News {
    constructor(title, content, eventDate, tags, category, importance) {
        this.title = title;
        this.content = content;
        this.eventDate = eventDate;
        this.tags = tags;
        this.category = category;
        this.importance = importance;
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
                    console.log("Response from PHP:", response);
                    if (response.success) {
                        this.display(); // Call display method to update the DOM
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
    
        // Añade los elementos solo si tienen valor
        newsItem.appendChild(titleElement);
        newsItem.appendChild(contentElement);
    
        if (this.eventDate) {
            var dateElement = document.createElement('p');
            dateElement.textContent = `Fecha del Evento: ${this.eventDate}`;
            newsItem.appendChild(dateElement);
        }
    
        if (this.tags) {
            var tagsElement = document.createElement('p');
            tagsElement.textContent = `Etiquetas: ${this.tags}`;
            newsItem.appendChild(tagsElement);
        }
    
        if (this.category) {
            var categoryElement = document.createElement('p');
            categoryElement.textContent = `Categoría: ${this.category}`;
            newsItem.appendChild(categoryElement);
        }
    
        if (this.importance) {
            var importanceElement = document.createElement('p');
            importanceElement.textContent = `Importancia: ${this.importance}`;
            newsItem.appendChild(importanceElement);
        }
    
        newsContainer.appendChild(newsItem);
    }
    
}
