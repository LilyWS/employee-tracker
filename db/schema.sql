drop database if exists employee_db;
create database employee_db;

use employee_db;

create table departments(
    id int not null auto_increment primary key,
    name varchar(30)
);

create table roles(
    id int not null auto_increment primary key,
    title varchar(30),
    salary dec,
    department_id int,
    foreign key (department_id)
    references departments(id)
);

create table employees(
    id int not null primary key auto_increment,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    foreign key (role_id)
    references roles(id),
    manager_id int,
    foreign key (manager_id)
    references employees(id)
);