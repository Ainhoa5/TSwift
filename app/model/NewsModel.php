<?php 
// File: model/NewsModel.php
include '../Database.php';

class NewsModel {
    private $conn;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    public function addNewsItem($title, $content, $eventDate, $tags, $category, $importance) {
        try {
            // Actualiza la consulta para incluir los nuevos campos
            $query = "INSERT INTO news (title, content, eventDate, tags, category, importance) VALUES (:title, :content, :eventDate, :tags, :category, :importance)";
            $stmt = $this->conn->prepare($query);
    
            // Vincula los nuevos valores
            $stmt->bindParam(":title", $title);
            $stmt->bindParam(":content", $content);
            $stmt->bindParam(":eventDate", $eventDate);
            $stmt->bindParam(":tags", $tags);
            $stmt->bindParam(":category", $category);
            $stmt->bindParam(":importance", $importance);
    
            if ($stmt->execute()) {
                return true;
            }
            return false;
        } catch (PDOException $exception) {
            error_log("Error in addNewsItem: " . $exception->getMessage());
            return false;
        }
    }
    

    public function getAllNews() {
        $query = "SELECT * FROM news ORDER BY created_at ASC";
        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        $newsItems = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $newsItems[] = $row;
        }

        return $newsItems;
    }
}


?>