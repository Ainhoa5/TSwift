function getNews() {
    $.ajax({
        url: "../../../app/handlers/getNews.php",
        type: "GET",
        dataType: "json",
        success: function (newsItems) {
            // Crea objetos de noticias y los muestra
            News.allNews = newsItems.map(function (itemData) {
                return new News(itemData.title, itemData.content, itemData.eventDate, itemData.tags, itemData.category, itemData.importance);
            });
            News.displayAll();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error fetching news:", textStatus, errorThrown);
        }
    });
}
function searchNearbyNews(lat, lon) {
    $.ajax({
        url: "../../../app/controller/NewsController.php",
        type: "GET",
        data: {
            nearby: true,
            lat: lat,
            lon: lon
        },
        success: function (response) {
            // No es necesario parsear la respuesta si jQuery ya lo ha hecho automáticamente.
            if (response.success) {
                $('#news-container').empty();
                response.news.forEach(function (newsData) {
                    var newsItem = new News(newsData.title, newsData.content, newsData.eventDate, newsData.tags, newsData.category, newsData.importance);
                    newsItem.display();
                });
            } else {
                console.error("Error from PHP:", response.message);
            }
        },
        error: function (xhr, status, error) {
            console.error("Request error:", status, error);
        }
    });
}

function searchNews(searchTerm) {
    $.ajax({
        url: "../../../app/controller/NewsController.php",
        type: "GET",
        data: {
            search: encodeURIComponent(searchTerm)
        },
        success: function (response) {
            // Directamente utiliza la respuesta sin JSON.parse()
            if (response.success) {
                $('#news-container').empty();
                response.news.forEach(function (newsData) {
                    var newsItem = new News(newsData.title, newsData.content, newsData.eventDate, newsData.tags, newsData.category, newsData.importance);
                    newsItem.display();
                });
            } else {
                console.error("Error from PHP:", response.message);
            }
        },
        error: function (xhr, status, error) {
            console.error("Request error:", status, error);
        }
    });
}

