-- 1. Tabela de empresas
CREATE TABLE IF NOT EXISTS enterprise (
    id SERIAL PRIMARY KEY,
    name VARCHAR(32) NOT NULL
);


-- Tabela de despesas com alimentos
CREATE TABLE IF NOT EXISTS food_expense (
    id SERIAL PRIMARY KEY,
    enterprise_id INTEGER NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de despesas gerais (aluguel, água, luz, gás ...)
CREATE TABLE IF NOT EXISTS general_expense (
    id SERIAL PRIMARY KEY,
    enterprise_id INTEGER NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('aluguel', 'luz', 'água', 'gás')),
    amount NUMERIC(10, 2) NOT NULL,
    expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- 2. Usuários (funcionários)

CREATE TABLE IF NOT EXISTS employee (
    email VARCHAR(255) PRIMARY KEY,
    password TEXT,
    name VARCHAR(32),
    surname VARCHAR(64),
    startOfContract DATE,
    id_enterprise INT NOT NULL,
    role VARCHAR(20) NOT NULL,
    token TEXT,
    FOREIGN KEY (id_enterprise) REFERENCES enterprise(id) ON DELETE CASCADE
);

-- Tabela de salários dos funcionários
CREATE TABLE IF NOT EXISTS salary (
    id SERIAL PRIMARY KEY,
    employee_email INTEGER NOT NULL REFERENCES employee(email) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,
    effective_date DATE NOT NULL DEFAULT CURRENT_DATE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Pratos

CREATE TABLE IF NOT EXISTS dish (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    id_enterprise INT NOT NULL,
    FOREIGN KEY (id_enterprise) REFERENCES enterprise(id) ON DELETE CASCADE
);


-- 4. Cardápios por dia
-- Cada empresa pode ter 1 menu por dia

CREATE TABLE IF NOT EXISTS menu (
    id SERIAL PRIMARY KEY,
    day DATE NOT NULL,
    id_enterprise INT NOT NULL,
    UNIQUE (day, id_enterprise),
    FOREIGN KEY (id_enterprise) REFERENCES enterprise(id) ON DELETE CASCADE
);


-- 5. Ligação entre cardápios e pratos

CREATE TABLE IF NOT EXISTS menu_dish (
    id SERIAL PRIMARY KEY,
    id_menu INT NOT NULL,
    id_dish INT NOT NULL,
    FOREIGN KEY (id_menu) REFERENCES menu(id) ON DELETE CASCADE,
    FOREIGN KEY (id_dish) REFERENCES dish(id) ON DELETE CASCADE,
    UNIQUE (id_menu, id_dish)
);
