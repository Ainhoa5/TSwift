// saveDrafts.js

document.addEventListener('DOMContentLoaded', () => {
    // Asegúrate de que el elemento exista antes de añadir el listener
    const saveDraftButton = document.getElementById('saveDraft');
    if (saveDraftButton) {
        saveDraftButton.addEventListener('click', saveDraftFormData);
    }
});

let db;// Incrementa la versión de la base de datos
const request = window.indexedDB.open('NewsDraftsDB', 2); // Cambia '1' por '2' o un número mayor


request.onerror = function(event) {
    console.error("Database error: ", event.target.errorCode);
};

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore('drafts', { autoIncrement: true });
};

request.onsuccess = function(event) {
    db = event.target.result;
};

function saveDraftFormData() {
    const formData = {
        importance: document.querySelector('input[name="importance"]:checked')?.value,
        categories: Array.from(document.querySelectorAll('input[name="category"]:checked')).map(el => el.value),
        eventDate: document.getElementById('eventDate').value,
        title: document.getElementById('title').value,
        content: document.getElementById('content').value,
        tags: document.getElementById('tags').value.split(',')
    };
    
    saveDraft(formData);
}

function saveDraft(data) {
    const transaction = db.transaction(['drafts'], 'readwrite');
    const store = transaction.objectStore('drafts');
    const request = store.add(data);

    request.onsuccess = () => {
        console.log("Draft saved successfully.");
    };

    request.onerror = (event) => {
        console.error("Error saving draft: ", event.target.error);
    };
}
