create table if not exists menu {
    id int primary key AUTOINCREMENT,
    day DATE not null,
    description TEXT,
    enterprise_id int not null,
    FOREIGN KEY (enterprise_id) references enterprise(id)
    };