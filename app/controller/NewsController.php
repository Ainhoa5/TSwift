<?php
// Assuming you have a NewsModel class for database operations
include '../model/NewsModel.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize input
    $title = filter_input(INPUT_POST, 'title', FILTER_SANITIZE_STRING);
    $content = filter_input(INPUT_POST, 'content', FILTER_SANITIZE_STRING);

    // Basic validation
    $errors = [];
    if (empty($title)) {
        $errors['title'] = 'Title is required.';
    }
    if (empty($content)) {
        $errors['content'] = 'Content is required.';
    }

    if (count($errors) === 0) {
        // Interact with the model
        $newsModel = new NewsModel();
        $inserted = $newsModel->addNewsItem($title, $content);

        if ($inserted) {
            // Fetch updated news and send back as JSON
            $updatedNews = $newsModel->getNewsItems();
            echo json_encode(['success' => true, 'news' => $updatedNews]);
        } else {
            // Handle error in insertion
            echo json_encode(['success' => false, 'message' => 'Error adding news item.']);
        }
    } else {
        // Send validation errors
        echo json_encode(['success' => false, 'errors' => $errors]);
    }
} else {
    // Invalid request method
    header('HTTP/1.1 405 Method Not Allowed');
    exit;
}
