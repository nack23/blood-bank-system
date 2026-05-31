CREATE DATABASE blood_bank_db;
USE blood_bank_db;

-- users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('hospital','receiver') NOT NULL,
    blood_group VARCHAR(5) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- blood_samples table
CREATE TABLE blood_samples (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hospital_id INT NOT NULL,
    blood_group VARCHAR(5) NOT NULL,
    units INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (hospital_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

-- blood_requests table 

CREATE TABLE requests (
    id INT AUTO_INCREMENT PRIMARY KEY,

    receiver_id INT NOT NULL,

    sample_id INT NOT NULL,

    units INT NOT NULL DEFAULT 0,

    status ENUM(
        'Pending',
        'Approved',
        'Rejected'
    ) DEFAULT 'Pending',

    request_date TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (receiver_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

    FOREIGN KEY (sample_id)
    REFERENCES blood_samples(id)
    ON DELETE CASCADE
);