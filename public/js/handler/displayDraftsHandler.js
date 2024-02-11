// displayDrafts.js

document.addEventListener('DOMContentLoaded', () => {
    loadDrafts();
});

function loadDrafts() {
    let db;
    const request = window.indexedDB.open('NewsDraftsDB');

    request.onerror = function(event) {
        console.error("Database error: ", event.target.errorCode);
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        const transaction = db.transaction(['drafts'], 'readonly');
        const store = transaction.objectStore('drafts');
        const getRequest = store.getAll();

        getRequest.onsuccess = function(event) {
            const drafts = event.target.result;
            News.allNews = []; // Asegúrate de que esto se corresponde con cómo manejas los borradores
            
            drafts.forEach(draft => {
                const newsItem = new News(draft.title, draft.content, draft.eventDate, draft.tags, draft.categories, draft.importance);
                News.allNews.push(newsItem); // Considera si necesitas adaptar esta parte
            });

            News.displayAll(); // Asegúrate de que esta función exista y funcione correctamente
        };

        getRequest.onerror = function(event) {
            console.error("Error loading drafts: ", event.target.errorCode);
        };
    };
}
