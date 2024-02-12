function setLastVisitCookie() {
    const now = new Date();
    const expiry = new Date(now.getTime() + (365 * 24 * 60 * 60 * 1000)); // Hace que la cookie expire en 1 año
    document.cookie = "lastVisit=" + now.toUTCString() + ";expires=" + expiry.toUTCString() + ";path=/";
}

function getLastVisit() {
    const cookies = document.cookie.split('; ');
    const lastVisitCookie = cookies.find(cookie => cookie.startsWith('lastVisit='));
    return lastVisitCookie ? new Date(lastVisitCookie.split('=')[1]) : null;
}
function showWelcomeBackMessage() {
    const lastVisit = getLastVisit();
    if (lastVisit) {
        const now = new Date();
        const hoursSinceLastVisit = Math.abs(now - lastVisit) / 36e5; // Convertir diferencia de tiempo en horas
        if (hoursSinceLastVisit > 24) {
            alert(`Bienvenido de vuelta! Han pasado ${Math.floor(hoursSinceLastVisit / 24)} días desde que vistaste la página por primera vez.`);
        } else {
            alert(`Bienvenido de vuelta! Tu primera visita fue hace ${Math.floor(hoursSinceLastVisit)} horas.`);
        }
    } else {
        setLastVisitCookie(); // Establece la cookie para la primera vez que el usuario visita la página
    }
}
