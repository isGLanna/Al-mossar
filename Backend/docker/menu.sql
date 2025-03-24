create table if not exists menu (
    id SERIAL primary key,
    day DATE not null,
    description TEXT,
    enterprise_id int not null,
    FOREIGN KEY (enterprise_id) references enterprise(id)
);