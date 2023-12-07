document.addEventListener('DOMContentLoaded', function() {
    fetch('../controller/AlbumController.php')
        .then(response => response.json())
        .then(data => {
            createTimeline(data);
            createTimelineButtons(data);
            initializeTimelineInteractivity();
        })
        .catch(error => console.error('Error:', error));
});

function createTimeline(albums) {
    const timelineContent = document.getElementById('timelineContent');
    albums.forEach(album => {
        const item = `
            <div class="timeline__item ${album.year === 2006 ? 'is-active' : ''}" data-year="${album.year}">
                <div class="timeline__item-row">
                    <div class="timeline__item-date">${album.year}</div>
                    <div class="timeline__item-text">
                        <h3>${album.title}</h3>
                        <p>${album.description}</p>
                    </div>
                </div>
                <img src="../../public/multimedia/img/covers/${album.cover_image}" alt="cover" style="width: 900px; ">
            </div>
        `;
        timelineContent.innerHTML += item;
    });
}

function createTimelineButtons(albums) {
    const timelineButtons = document.getElementById('timelineButtons');
    albums.forEach((album, index) => {
        const button = `
            <div class="flex-column">
                <a href="#" class="timeline__button ${index === 0 ? 'is-active' : ''}" data-day="${album.year}"></a>
            </div>
        `;
        timelineButtons.innerHTML += button;
    });
}

function initializeTimelineInteractivity() {
    const timelineButtonsContainer = document.getElementById('timelineButtons');
    const timelineItems = document.getElementsByClassName('timeline__item');

    timelineButtonsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('timeline__button')) {
            event.preventDefault();
            // Remove 'is-active' class from all buttons
            Array.from(timelineButtonsContainer.getElementsByClassName('timeline__button')).forEach(button => {
                button.classList.remove('is-active');
            });

            // Add 'is-active' class to clicked button
            event.target.classList.add('is-active');

            // Get the 'data-day' attribute of the clicked button
            var day = event.target.getAttribute("data-day");

            // Update the active timeline item
            Array.from(timelineItems).forEach(item => {
                item.classList.remove('is-active');
                if (item.getAttribute("data-year") === day) {
                    item.classList.add('is-active');
                }
            });
        }
    });
}
