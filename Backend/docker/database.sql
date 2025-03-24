create table if not exists enterprise(
    id SERIAL primary key,
    name varchar(32) not null
);

create table if not exists menu (
    id SERIAL primary key,
    day DATE not null,
    description TEXT,
    enterprise_id int not null,
    FOREIGN KEY (enterprise_id) references enterprise(id)
);

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
