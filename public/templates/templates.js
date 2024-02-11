function createMenu(basePath, isIndex) {
    let menuHtml = `
        <div class="header-container">
            <header>
                <div class="navbar">
                    <div class="logo"><a href="${basePath}">HOME</a></div>
                    <ul class="links">
                        <li><a href="${basePath}app/view/quiz.html">Quiz</a></li>
                        <li><a href="${basePath}app/view/discografia.html">Discografía</a></li>
                        <li><a href="${basePath}app/view/multimedia.html">Multimedia</a></li>
                        <li><a href="${basePath}app/view/drafts.html">Drafts</a></li>
                    </ul>`;

    if (isIndex) {
        menuHtml += `

                    <a href="#" id="openNewsFormBtn" class="action_btn">Create News</a>`;

    }

    menuHtml += `
                    <div class="toggle_btn">
                        <i class="fa-solid fa-bars"></i>
                    </div>
                </div>

                <div class="dropdown_menu">
                    <li><a href="${basePath}app/view/quiz.html">Quiz</a></li>
                    <li><a href="${basePath}app/view/discografia.html">Discografía</a></li>
                    <li><a href="${basePath}app/view/multimedia.html">Multimedia</a></li>
                    <li><a href="${basePath}app/view/drafts.html">Drafts</a></li>

                    <button id="openNewsFormBtn" class="action_btn">Create News</button>
                </div>
            </header>`;

    if (isIndex) {
        menuHtml += `
            <main class="hero">
                <section id="hero">
                    <a href=""><img src="${basePath}/public/multimedia/img/logofinal.png" alt=""></a>
                    <h1>Welcome</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.<br>Repudiandae vel alias,</p>
                    </br>
                    <input type="text" id="search-input" placeholder="Buscar noticias..." />
                    </br>
                    <a href="#" class="search-btn" id="search-button">Search</a>
                </section>
            </main>`;
    }

    menuHtml += `</div>`;

    document.getElementById('menu-container').innerHTML = menuHtml;
}


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


