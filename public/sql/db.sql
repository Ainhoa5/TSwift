
CREATE DATABASE TSwift;
USE TSwift;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    content TEXT,
    author_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE TABLE albums (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    release_date DATE,
    cover_image VARCHAR(255)
);

CREATE TABLE songs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    album_id INT,
    title VARCHAR(100),
    duration TIME,
    FOREIGN KEY (album_id) REFERENCES albums(id)
);

CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    description TEXT,
    event_date DATETIME,
    location VARCHAR(255)
);

CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    news_id INT,
    user_id INT,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (news_id) REFERENCES news(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
