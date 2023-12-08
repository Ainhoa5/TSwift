class News {
    constructor(title, content) {
        this.title = title;
        this.content = content;
    }

    save() {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "../../../app/controller/NewsController.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onload = () => {
            if (xhr.status === 200) {
                try {

                    var response = JSON.parse(xhr.responseText);
                    console.log("Response from PHP:", response);
                    // Handle the response, like updating the DOM
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

        var formData = `title=${encodeURIComponent(this.title)}&content=${encodeURIComponent(this.content)}`;
        xhr.send(formData);
    }
    displayAll(){
        fetch('path/to/getNews.php')
        .then(response => response.json())
        .then(newsItems => {
            newsItems.forEach(item => {
                display(item);
            });
        })
        .catch(error => console.error('Error fetching news:', error));
    }
    display() {
        // Assuming there's a container for news items with an ID 'news-container'
        var newsContainer = document.getElementById('news-container');
        
        // Create elements for the news item
        var newsItem = document.createElement('div');
        newsItem.classList.add('news-item');

        var titleElement = document.createElement('h3');
        titleElement.textContent = this.title;

        var contentElement = document.createElement('p');
        contentElement.textContent = this.content;

        // Append the new elements to the news item
        newsItem.appendChild(titleElement);
        newsItem.appendChild(contentElement);

        // Append the news item to the container
        newsContainer.appendChild(newsItem);
    }

}
