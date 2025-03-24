
CREATE TABLE IF NOT EXISTS person (
    email VARCHAR(30) PRIMARY KEY,
    password TEXT NOT NULL,
    name VARCHAR(16) NOT NULL,
    surname VARCHAR(48) NOT NULL,
    startOfContract DATE,
    id_enterprise INT,
    role VARCHAR(20),
    FOREIGN KEY (id_enterprise) REFERENCES enterprise(id)
);