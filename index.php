<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="public/styles/style.css">
</head>

<body>
    <!-- MENU -->
    <nav>
        <ul>
            <li><a href="app/view/biografia.html">Biografía</a></li>
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
        <div class="form-group">
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" maxlength="100" required>
        </div>
        <div class="form-group">
            <label for="content">Content:</label>
            <textarea id="content" name="content"></textarea>
        </div>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
        <span class="closeBtn">&times;</span>
    </form>

    <!-- Including your JavaScript file -->
    <script src="public/js/handler/newsFormHandler.js"></script>
    <script src="public/js/clases/News.js"></script>

</body>

</html>