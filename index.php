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
    <!-- Your page content -->
    <!-- In index.php -->
    <button id="openNewsFormBtn">Create News</button>
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
        <span class="closeBtn">&times;</span>
    </form>
    <!-- Including your JavaScript file -->
    <script src="public/js/controllers/newsFormHandler.js"></script>
    
</body>
</html>