<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Noticias</title>

    <meta name="Quiz" content="All news about Taylor Swift" />
    <link rel="stylesheet" href="public/styles/style.css">
    <link rel="stylesheet" href="public/styles/menu.css">
    <link rel="stylesheet" href="public/styles/news.css">
    <link rel="stylesheet" href="public/styles/footer.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

</head>

<body>
    <!-- NOSCRIPT -->
    <noscript>
        <div style="background-color: yellow; color: black; padding: 10px; text-align: center;">
            Parece que JavaScript no está habilitado en tu navegador. Algunas características de esta página no funcionarán correctamente sin JavaScript.
        </div>
    </noscript>
    <!-- MENU -->
    <div id="menu-container"></div>
    <script src="public/templates/templates.js"></script>
    <script>
        // Call the function with appropriate parameters
        createMenu('', true); // '.' for current directory, 'true' to show search bar
    </script>

    <!-- Your page content -->
    <div id="news-container"></div>

    <!-- Pop-up Form in index.php -->
    <form id="newsForm" class="form-popup">
    <!-- Importancia de la Noticia -->
    <div class="form-group form-group-horizontal">
        <label>Importancia de la Noticia:</label>
        <div class="radio-group">
            <div class="h-group">
                <input type="radio" id="importance_high" name="importance" value="high" class="form-field">
                <label for="importance_high">Alta</label>
            </div>
            <div class="h-group">
                <input type="radio" id="importance_medium" name="importance" value="medium" class="form-field">
                <label for="importance_medium">Media</label>
            </div>
            <div class="h-group">
                <input type="radio" id="importance_low" name="importance" value="low" class="form-field">
                <label for="importance_low">Baja</label>
            </div>
        </div>
    </div>

    <!-- Categorías de la Noticia -->
    <div class="form-group form-group-horizontal">
        <label>Categorías de la Noticia:</label>
        <div class="checkbox-group">
            <div class="h-group">
                <input type="checkbox" id="category_event" name="category" value="event" class="form-field">
                <label for="category_event">Evento</label>
            </div>
            <div class="h-group">
                <input type="checkbox" id="category_song" name="category" value="song" class="form-field">
                <label for="category_song">Canción</label>
            </div>
            <!-- Añadir más categorías según sea necesario -->
        </div>
    </div>

    <!-- Fecha del Evento (Oculto inicialmente) -->
    <div class="form-group" id="eventDateGroup" style="display:none;">
        <label for="eventDate">Fecha del Evento:</label>
        <input type="date" id="eventDate" name="eventDate" class="form-field">
    </div>

    <!-- Titulo y Contenido -->
    <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" maxlength="100" class="form-field">
    </div>
    <div class="form-group">
        <label for="content">Content:</label>
        <textarea id="content" name="content" class="form-field"></textarea>
    </div>

    <!-- Etiquetas de la Noticia -->
    <div class="form-group">
        <label for="tags">Etiquetas (separadas por comas):</label>
        <input type="text" id="tags" name="tags" class="form-field">
    </div>
    
    <!-- Botones de acción -->
    <button type="submit">Submit</button>
    <button type="reset">Reset</button>
    <span class="closeBtn">&times;</span>
</form>


    <!-- FOOTER -->
    <div id="footer-container"></div>
    <script src="public/templates/templates.js"></script>
    <script>
        // Call the function with appropriate parameters
        createFooter(); // '.' for current directory, 'true' to show search bar
    </script>
    <!-- Including your JavaScript file -->
    <script src="public/js/handler/newsFormHandler.js"></script>
    <script src="public/js/clases/News.js"></script>

    <script src="https://unpkg.com/scrollreveal"></script>
    <script>
        //SCROLL
        const sr = ScrollReveal({
            origin: 'top',
            distance: '85px',
            duration: 2200,
            reset: true
        })

        // Base delay
        let baseDelay = 100;

        sr.reveal('.navbar', {
            delay: baseDelay // 100ms
        });
        sr.reveal('.hero', {
            delay: baseDelay += 900 // 200ms
        });
        sr.reveal('.btn-container', {
            delay: 400 // 300ms
        });
        sr.reveal('.news-item', {
            delay: 400 // 400ms
        });
    </script>
    <script src="public/templates/dropdownMenu.js"></script>
</body>

</html>