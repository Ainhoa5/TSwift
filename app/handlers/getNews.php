<?php 
// File: getNews.php or similar
include '../model/NewsModel.php';

header('Content-Type: application/json');
$newsModel = new NewsModel();

$newsItems = $newsModel->getAllNews(); // Method to fetch all news from the database
echo json_encode($newsItems);

?>