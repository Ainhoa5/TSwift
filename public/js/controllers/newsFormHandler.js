document.getElementById('news-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Create an AJAX request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '../../../app/controller/NewsController.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = function() {
        if (this.status === 200) {
            // Parse the returned JSON and update the DOM
            var newNews = JSON.parse(this.responseText);
            if (response.success) {
                // Update the news section with new data
                updateNewsSection(response.news);
            } else {
                // Handle errors - display them to the user
                displayErrors(response.errors);
            }
        }
    };

    // Get form data
    var formData = new FormData(this);

    // Send the request
    xhr.send(formData);
});

function updateNewsSection(newNews) {
    // Logic to update the news section of your page with newNews using DOM
}