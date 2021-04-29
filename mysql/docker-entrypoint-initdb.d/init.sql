
create table if not exists modules
(
    id int Not null auto_increment primary key,
    description varchar(100) not null
);

insert into modules (description) values ("Docker"),
("Fundamentos de Arquitetura de Software"),
("Comunicação");