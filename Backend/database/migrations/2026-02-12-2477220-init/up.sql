-- Migration generated on 2026-02-12 16:47:41

-- 1. Tabela de empresas
CREATE TABLE IF NOT EXISTS enterprise (
    id SERIAL PRIMARY KEY,
    name VARCHAR(32) NOT NULL
);

CREATE TABLE theme_colors (
    id SERIAL PRIMARY KEY,
    enterprise_id INT NOT NULL REFERENCES enterprise(id),
    branding_500 VARCHAR(7),      -- cor principal da marca
    second_500 VARCHAR(7),        -- cor secundária principal
    second_500a VARCHAR(9),      -- versão transparente
    background_color VARCHAR(7),  -- cor de fundo
    text_color VARCHAR(7),        -- cor do texto
    menu_containers VARCHAR(7)   -- cor de containers/menus
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
CREATE TABLE IF NOT EXISTS total_expense (
    id SERIAL PRIMARY KEY,
    enterprise_id INTEGER NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('aluguel', 'luz', 'água', 'gas')),
    amount NUMERIC(10, 2) NOT NULL,
    expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- 2. Usuários (funcionários)
CREATE TABLE IF NOT EXISTS employee (
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) ,
    password TEXT,
    name VARCHAR(32),
    surname VARCHAR(64),
    start_of_contract DATE,
    end_of_contract DATE,
    id_enterprise INT NOT NULL,
    role VARCHAR(20) NOT NULL,
    telephone VARCHAR(16),
    address VARCHAR(75),
    token TEXT,
    FOREIGN KEY (id_enterprise) REFERENCES enterprise(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS employee_image (
  id SERIAL PRIMARY KEY,
  employee_id INT UNIQUE NOT NULL,
  image BYTEA NOT NULL,
  FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS password_recovery_codes (
	email VARCHAR(100) NOT NULL,
	code VARCHAR(5),
	expires_at timestamp not null,
	primary key (email, code)
);


-- Tabela de salários dos funcionários
CREATE TABLE IF NOT EXISTS salary (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL REFERENCES employee(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,
    effective_date DATE NOT NULL DEFAULT CURRENT_DATE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de permissões dos funcionários
CREATE TABLE IF NOT EXISTS role (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE
);

-- 2. Tabela de permissões vinculadas a cada role
CREATE TABLE IF NOT EXISTS role_permissions (
    id SERIAL PRIMARY KEY,
    role_id INT NOT NULL,
    permission VARCHAR(50) NOT NULL,
    CONSTRAINT fk_role_permissions_role FOREIGN KEY (role_id)
        REFERENCES role(id) ON DELETE CASCADE
);


-- 3. Pratos

CREATE TABLE IF NOT EXISTS dish (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    meal_type VARCHAR(20) NOT NULL CHECK (meal_type IN ('cafe_manha', 'almoco', 'cafe_tarde', 'janta'))
);


-- 4. Cardápios por dia
-- Cada empresa pode ter um menu por dia para cada refeição

CREATE TABLE IF NOT EXISTS menu (
    id SERIAL PRIMARY KEY,
    day DATE NOT NULL,
    id_enterprise INT NOT NULL,
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


-- Cliente relaciona a qual empresa ele possui conta e crédito

CREATE TABLE IF NOT EXISTS client (
    id SERIAL PRIMARY KEY,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    email VARCHAR(50),
    name VARCHAR(25),
    surname VARCHAR(75),
    balance NUMERIC(10, 2),
    token TEXT,
    id_enterprise INT NOT NULL,
    FOREIGN KEY (id_enterprise) REFERENCES enterprise(id)
);


CREATE TABLE IF NOT EXISTS client_image (
  id SERIAL PRIMARY KEY,
  client_id INT UNIQUE NOT NULL,
  image BYTEA NOT NULL,
  FOREIGN KEY (client_id) REFERENCES client(id) ON DELETE CASCADE
);
