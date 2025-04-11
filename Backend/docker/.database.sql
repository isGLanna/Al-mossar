
-- 1. Tabela de empresas

CREATE TABLE IF NOT EXISTS enterprise (
    id SERIAL PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    email VARCHAR(32) NOT NULL,
    password TEXT NOT NULL,
    token TEXT
);


-- 2. E-mails autorizados por empresa

CREATE TABLE IF NOT EXISTS authorized_emails (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    id_enterprise INT NOT NULL,
    FOREIGN KEY (id_enterprise) REFERENCES enterprise(id) ON DELETE CASCADE
);


-- 3. Usuários (funcionários)

CREATE TABLE IF NOT EXISTS user (
    email VARCHAR(255) PRIMARY KEY,
    password TEXT NOT NULL,
    name VARCHAR(32) NOT NULL,
    surname VARCHAR(64) NOT NULL,
    startOfContract DATE,
    id_enterprise INT NOT NULL,
    role VARCHAR(20),
    token TEXT,
    FOREIGN KEY (id_enterprise) REFERENCES enterprise(id) ON DELETE CASCADE
);


-- 4. Pratos

CREATE TABLE IF NOT EXISTS dish (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    id_enterprise INT NOT NULL,
    FOREIGN KEY (id_enterprise) REFERENCES enterprise(id) ON DELETE CASCADE
);


-- 5. Cardápios por dia
-- Cada empresa pode ter 1 menu por dia

CREATE TABLE IF NOT EXISTS menu (
    id SERIAL PRIMARY KEY,
    day DATE NOT NULL,
    id_enterprise INT NOT NULL,
    UNIQUE (day, id_enterprise),
    FOREIGN KEY (id_enterprise) REFERENCES enterprise(id) ON DELETE CASCADE
);


-- 6. Ligação entre cardápios e pratos

CREATE TABLE IF NOT EXISTS menu_dish (
    id SERIAL PRIMARY KEY,
    id_menu INT NOT NULL,
    id_dish INT NOT NULL,
    FOREIGN KEY (id_menu) REFERENCES menu(id) ON DELETE CASCADE,
    FOREIGN KEY (id_dish) REFERENCES dish(id) ON DELETE CASCADE,
    UNIQUE (id_menu, id_dish)
);
