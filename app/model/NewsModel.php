<?php 
// File: model/NewsModel.php
include '../Database.php';

class NewsModel {
    private $conn;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    public function addNewsItem($title, $content) {
        try {
            $query = "INSERT INTO news (title, content) VALUES (:title, :content)";
            $stmt = $this->conn->prepare($query);

            // Sanitization can also be done here if required
            $stmt->bindParam(":title", $title);
            $stmt->bindParam(":content", $content);

            if ($stmt->execute()) {
                return true;
            }
            return false;
        } catch (PDOException $exception) {
            error_log("Error in addNewsItem: " . $exception->getMessage());
            return false;
        }
    }

    // Other methods...
}

?>