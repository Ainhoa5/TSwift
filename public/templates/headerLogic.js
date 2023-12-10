document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuItems = document.getElementById('menu-items');

    menuToggle.addEventListener('click', function() {
        if (menuItems.style.display === "block") {
            menuItems.style.display = "none";
        } else {
            menuItems.style.display = "block";
        }
    });
});