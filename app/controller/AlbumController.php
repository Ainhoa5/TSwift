<?php 
include '../model/AlbumModel.php';

header('Content-Type: application/json');

$albumModel = new AlbumModel();

$albums = $albumModel->getAllAlbums(); // Method to fetch all albums from the database
echo json_encode($albums);
?>
