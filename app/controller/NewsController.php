<?php
// File: app/controller/NewsController.php
include '../model/NewsModel.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = filter_input(INPUT_POST, 'title', FILTER_SANITIZE_STRING);
    $content = filter_input(INPUT_POST, 'content', FILTER_SANITIZE_STRING);

    $newsModel = new NewsModel();
    $response = [];

    if (empty($title) || empty($content)) {
        $response['success'] = false;
        $response['message'] = 'Validation failed: Title or content is empty.';
    } else {
        if ($newsModel->addNewsItem($title, $content)) {
            $response['success'] = true;
            $response['message'] = 'News item successfully added.';
        } else {
            $response['success'] = false;
            $response['message'] = 'Failed to add news item.';
        }
    }

    echo json_encode($response);
}

?>
