function createMenu(basePath, showSearchBar) {
    const menuHtml = `
        <nav>
            ${!showSearchBar ? `<a href="${basePath}"><img src="${basePath}/public/multimedia/img/logofinal.png" alt="Logo" style="height: 200px;"></a>` : ''}
            <ul>
                <li><a href="${basePath}app/view/quiz.html">Quiz</a></li>
                <li><a href="${basePath}app/view/discografia.html">Discografía</a></li>
                <li><a href="${basePath}app/view/multimedia.html">Multimedia</a></li>
                ${showSearchBar ? `<input type="text" id="search-input" placeholder="Buscar noticias..." />
                                  <button id="search-button">Buscar</button>` : ''}
            </ul>
        </nav>`;

    document.getElementById('menu-container').innerHTML = menuHtml;
}

