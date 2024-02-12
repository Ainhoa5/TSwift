<?php
// File: model/NewsModel.php
include '../Database.php';

class NewsModel
{
    private $conn;

    public function __construct()
    {
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    public function addNewsItem($title, $content, $eventDate, $tags, $category, $importance, $latitude, $longitude)
    {
        try {
            // Preparación de la consulta con todos los parámetros necesarios
            $query = "INSERT INTO news (title, content, eventDate, tags, category, importance, latitud, longitud) VALUES (:title, :content, :eventDate, :tags, :category, :importance, :latitude, :longitude)";
            $stmt = $this->conn->prepare($query);

            // Vinculación de todos los parámetros
            $stmt->bindParam(":title", $title);
            $stmt->bindParam(":content", $content);
            $stmt->bindParam(":eventDate", $eventDate);
            $stmt->bindParam(":tags", $tags);
            $stmt->bindParam(":category", $category);
            $stmt->bindParam(":importance", $importance);
            $stmt->bindParam(":latitude", $latitude);
            $stmt->bindParam(":longitude", $longitude);

            // Ejecución de la consulta
            if ($stmt->execute()) {
                return true;
            }
            return false;
        } catch (PDOException $exception) {
            error_log("Error in addNewsItem: " . $exception->getMessage());
            return false;
        }
    }


    public function searchNewsItems($searchTerm)
    {
        $query = "SELECT * FROM news WHERE title LIKE :searchTerm"; // Asumiendo que tu tabla se llama 'news' y tienes una columna 'title'
        $stmt = $this->conn->prepare($query);

        // Usando % alrededor de searchTerm para buscar coincidencias parciales
        $term = "%" . $searchTerm . "%";
        $stmt->bindParam(":searchTerm", $term);

        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    }

    public function getAllNews()
    {
        $query = "SELECT * FROM news ORDER BY created_at ASC";
        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        $newsItems = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $newsItems[] = $row;
        }

        return $newsItems;
    }

    public function getNearby($userLat, $userLon)
    {
        $query = "SELECT *,
        (6371 * acos(cos(radians(:userLat))
        * cos(radians(latitud))
        * cos(radians(longitud) - radians(:userLon))
        + sin(radians(:userLat))
        * sin(radians(latitud)))) AS distancia
        FROM news
        HAVING distancia < 30 -- Establece el radio de búsqueda en 30 km
        ORDER BY distancia;";

        $stmt = $this->conn->prepare($query);

        // Vincula los parámetros userLat y userLon a la consulta
        $stmt->bindParam(':userLat', $userLat);
        $stmt->bindParam(':userLon', $userLon);

        $stmt->execute();

        $newsItems = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $newsItems[] = $row;
        }

        return $newsItems;
    }

}


?>