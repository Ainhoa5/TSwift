function setLastVisitCookie() {
    const now = new Date();
    const expiry = new Date(now.getTime() + (365 * 24 * 60 * 60 * 1000)); // Sets the cookie to expire in 1 year
    document.cookie = "lastVisit=" + now.toUTCString() + ";expires=" + expiry.toUTCString() + ";path=/";
}

function getLastVisit() {
    const cookies = document.cookie.split('; ');
    const lastVisitCookie = cookies.find(cookie => cookie.startsWith('lastVisit='));
    return lastVisitCookie ? new Date(lastVisitCookie.split('=')[1]) : null;
}

function showWelcomeBackMessageAndUpdateLastVisit() {
    const lastVisit = getLastVisit();
    if (lastVisit) {
        const now = new Date();
        const hoursSinceLastVisit = Math.abs(now - lastVisit) / 36e5; // Convert time difference to hours
        if (hoursSinceLastVisit > 24) {
            alert(`Bienvenido de vuelta! Han pasado ${Math.floor(hoursSinceLastVisit / 24)} días desde que visitaste la página por última vez.`);
        } else {
            alert(`Bienvenido de vuelta! Tu última visita fue hace ${Math.floor(hoursSinceLastVisit)} horas.`);
        }
    } else {
        alert('Bienvenido a nuestra página!');
    }
    // Update the last visit cookie every time, not just on first visit or after showing the message
    setLastVisitCookie();
}

window.onload = function () {
    // Estimate total animation time, then show the welcome message
    setTimeout(showWelcomeBackMessageAndUpdateLastVisit, 2500); // Adjust the time based on your animations
};