
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
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    eventDate DATE NOT NULL,
    tags VARCHAR(255),
    category VARCHAR(100),
    importance INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE albums (
    id INT AUTO_INCREMENT PRIMARY KEY,
    year YEAR NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    cover_image VARCHAR(255), -- Assuming the cover image is stored as a file path or URL
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);



CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    description TEXT,
    event_date DATETIME,
    location VARCHAR(255)
);

INSERT INTO albums (year, title, description, cover_image) VALUES 
(2006, 'Taylor Swift', 'Debut studio album by Taylor Swift.', 'cover1.jpg'),
(2008, 'Fearless', 'Second studio album by Taylor Swift.', 'cover2.jpg'),
(2010, 'Speak Now', 'Third studio album by Taylor Swift.', 'cover3.jpg'),
(2012, 'Red', 'Fourth studio album by Taylor Swift.', 'cover4.jpg'),
(2014, '1989', 'Fifth studio album by Taylor Swift.', 'cover5.jpg'),
(2017, 'Reputation', 'Sixth studio album by Taylor Swift.', 'cover6.jpg'),
(2019, 'Lover', 'Seventh studio album by Taylor Swift.', 'cover7.jpg'),
(2020, 'Folklore', 'Eighth studio album by Taylor Swift.', 'cover8.jpg'),
(2022, 'Midnights', 'Tenth studio album by Taylor Swift.', 'cover10.jpg'),
(2021, 'Red (Taylors Version)', 'Re-recorded version of the 2012 album Red by Taylor Swift.', 'cover13.jpg'),
(2023, 'Speak Now (Taylors Version)', 'Re-recorded version of the 2010 album Speak Now by Taylor Swift.', 'cover14.jpg'),
