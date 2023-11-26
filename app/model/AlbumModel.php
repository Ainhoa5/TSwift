<?php 
// File: model/AlbumModel.php
include '../Database.php';

class AlbumModel {
    private $conn;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    public function getAllAlbums() {
        $query = "SELECT * FROM albums ORDER BY year ASC";
        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        $albums = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $albums[] = $row;
        }

        return $albums;
    }
}
?>
