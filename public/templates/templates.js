function createMenu(basePath, showSearchBar) {
    const menuHtml = `
        <nav>
            <button id="menu-toggle" class="menu-toggle"><i class="fas fa-bars"></i></button>
            ${!showSearchBar ? `<a href="${basePath}"><img src="${basePath}/public/multimedia/img/logofinal.png" alt="Logo" style="height: 200px;"></a>` : ''}
            <ul id="menu-items" class="hidden">
                <li><a href="${basePath}app/view/quiz.html">Quiz</a></li>
                <li><a href="${basePath}app/view/discografia.html">Discografía</a></li>
                <li><a href="${basePath}app/view/multimedia.html">Multimedia</a></li>
                ${showSearchBar ? `<input type="text" id="search-input" placeholder="Buscar noticias..." />
                                  <button id="search-button">Buscar</button>` : ''}
            </ul>
        </nav>`;

    document.getElementById('menu-container').innerHTML = menuHtml;
}
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

function createFooter() {
    const footerHtml = `
        <footer class="footer">
            <div class="footer-column">
                <p>&copy; 2023 Taylor Swift Fan Page. Todos los derechos reservados.</p>
                <p>Este sitio no está afiliado con Taylor Swift o su sello discográfico.</p>
            </div>
            <div class="footer-column">
                <ul class="social-icons">
                    <li><a href="https://taylorswift.tumblr.com/"><i class="fab fa-tumblr"></i></a></li>
                    <li><a href="https://twitter.com/taylorswift13"><i class="fab fa-twitter"></i></a></li>
                    <li><a href="https://www.instagram.com/taylorswift/"><i class="fab fa-instagram"></i></a></li>
                </ul>
            </div>
        </footer>`;

    document.getElementById('footer-container').innerHTML = footerHtml;
}


