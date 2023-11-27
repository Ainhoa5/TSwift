<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="public/styles/style.css">
    <link rel="stylesheet" href="public/styles/menu.css">
    
</head>

<body>
    <!-- MENU -->
    <nav>
        <ul>
            <li><a href="app/view/quiz.html">Quiz</a></li>
            <li><a href="app/view/discografia.html">Discografía</a></li>
            <li><a href="app/view/multimedia.html">Multimedia</a></li>
        </ul>
    </nav>
    <!-- button to create news -->
    <div class="btn-container">
        <button id="openNewsFormBtn">Create News</button>
    </div>
    <!-- Your page content -->
    <div id="news-container"></div>
    <!-- Pop-up Form in index.php -->
    <form id="newsForm" class="form-popup">
        <!-- Importancia de la Noticia -->
        <div class="form-group form-group-horizontal">
            <label>Importancia de la Noticia:</label>
            <div class="radio-group">
                <div class="h-group">
                    <input type="radio" id="importance_high" name="importance" value="high">
                    <label for="importance_high">Alta</label>
                </div>
                <div class="h-group">
                    <input type="radio" id="importance_medium" name="importance" value="medium">
                    <label for="importance_medium">Media</label>
                </div>
                <div class="h-group">
                    <input type="radio" id="importance_low" name="importance" value="low">
                    <label for="importance_low">Baja</label>
                </div>
            </div>
        </div>


        <!-- Categorías de la Noticia -->
        <div class="form-group form-group-horizontal">
            <label>Categorías de la Noticia:</label>
            <div class="checkbox-group">
                <div class="h-group">
                    <input type="checkbox" id="category_event" name="category" value="event">
                    <label for="category_event">Evento</label>
                </div>
                <div class="h-group">
                    <input type="checkbox" id="category_song" name="category" value="song">
                    <label for="category_song">Canción</label>
                </div>
                <!-- Añadir más categorías según sea necesario -->
            </div>
        </div>

        <!-- Fecha del Evento (Oculto inicialmente) -->
        <div class="form-group" id="eventDateGroup" style="display:none;">
            <label for="eventDate">Fecha del Evento:</label>
            <input type="date" id="eventDate" name="eventDate">
        </div>

        <!-- Etiquetas de la Noticia -->
        <div class="form-group">
            <label for="tags">Etiquetas (separadas por comas):</label>
            <input type="text" id="tags" name="tags">
        </div>

        <!-- Titulo y Contenido -->
        <div class="form-group">
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" maxlength="100">
        </div>
        <div class="form-group">
            <label for="content">Content:</label>
            <textarea id="content" name="content"></textarea>
        </div>
        <!-- Botones de acción -->
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
        <span class="closeBtn">&times;</span>
    </form>


    <!-- Including your JavaScript file -->
    <script src="public/js/handler/newsFormHandler.js"></script>
    <script src="public/js/clases/News.js"></script>

</body>

</html>