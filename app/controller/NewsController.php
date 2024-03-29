<?php
// File: app/controller/NewsController.php
include '../model/NewsModel.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['search'])) {

    $newsModel = new NewsModel();
    $searchTerm = filter_input(INPUT_GET, 'search', FILTER_SANITIZE_SPECIAL_CHARS);
    $newsItems = $newsModel->searchNewsItems($searchTerm); // Asegúrate de que este método exista y funcione correctamente

    if ($newsItems) {
        echo json_encode(['success' => true, 'news' => $newsItems]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No news items found.']);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['nearby'])) {

    // Asume que las coordenadas del usuario se han obtenido y almacenado de alguna manera
    $userLat = filter_input(INPUT_GET, 'lat', FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
    $userLon = filter_input(INPUT_GET, 'lon', FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);

    $newsModel = new NewsModel();
    $newsItems = $newsModel->getNearby($userLat, $userLon); // Asegúrate de que este método acepte latitud y longitud

    if ($newsItems) {
        echo json_encode(['success' => true, 'news' => $newsItems]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No nearby news items found.']);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = filter_input(INPUT_POST, 'title', FILTER_SANITIZE_SPECIAL_CHARS);
    $content = filter_input(INPUT_POST, 'content', FILTER_SANITIZE_SPECIAL_CHARS);
    $eventDate = filter_input(INPUT_POST, 'eventDate', FILTER_SANITIZE_SPECIAL_CHARS);
    $tags = filter_input(INPUT_POST, 'tags', FILTER_SANITIZE_SPECIAL_CHARS);
    $category = filter_input(INPUT_POST, 'category', FILTER_SANITIZE_SPECIAL_CHARS);
    $importance = filter_input(INPUT_POST, 'importance', FILTER_SANITIZE_SPECIAL_CHARS);
    $latitude = filter_input(INPUT_POST, 'latitude', FILTER_SANITIZE_SPECIAL_CHARS);
    $longitude = filter_input(INPUT_POST, 'longitude', FILTER_SANITIZE_SPECIAL_CHARS);

    $newsModel = new NewsModel();
    $response = [];

    // Validación básica
    if (empty($title) || empty($content)) {
        $response['success'] = false;
        $response['message'] = 'Validation failed: Title or content is empty.';
    } else {
        // Llama a una versión actualizada de addNewsItem que acepta los nuevos campos
        if ($newsModel->addNewsItem($title, $content, $eventDate, $tags, $category, $importance, $latitude, $longitude)) {
            $response['success'] = true;
            $response['data'] = array(
                'title' => $title,
                'content' => $content,
                'eventDate' => $eventDate,
                'tags' => $tags,
                'category' => $category,
                'importance' => $importance
            );

            $response['message'] = 'News item successfully added.';
        } else {
            $response['success'] = false;
            $response['message'] = 'Failed to add news item.';
        }
    }

    echo json_encode($response);
}


?>