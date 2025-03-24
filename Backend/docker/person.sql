CREATE TABLE IF NOT EXISTS people (
    email VARCHAR(30) PRIMARY KEY,
    password VARCHAR(16) NOT NULL,
    name VARCHAR(16) NOT NULL,
    surname VARCHAR(48) NOT NULL,
    startOfContract DATE,
    role VARCHAR(20),
    enterprise_id INT,
    FOREIGN KEY (enterprise_id) REFERENCES enterprise(id)
    );