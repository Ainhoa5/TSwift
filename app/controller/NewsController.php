<?php
include '../model/NewsModel.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = filter_input(INPUT_POST, 'title', FILTER_SANITIZE_STRING);
    $content = filter_input(INPUT_POST, 'content', FILTER_SANITIZE_STRING);

    $response = [];

    if (empty($title) || empty($content)) {
        $response['success'] = false;
        $response['message'] = 'Validation failed: Title or content is empty.';
    } else {
        $response['success'] = true;
        $response['message'] = 'Validation successful: Title and content received.';
        // Add more data to response if necessary
    }

    echo json_encode($response);
}
