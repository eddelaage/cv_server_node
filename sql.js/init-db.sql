DROP DATABASE IF EXISTS cv_edouard;
CREATE DATABASE cv_edouard;
USE cv_edouard;

CREATE TABLE messages
(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    firts_name VARCHAR(90),
    last_name VARCHAR(90),
    email VARCHAR(90),
    messages VARCHAR(250)
);