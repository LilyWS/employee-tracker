use employee_db;

insert into departments (name)
values ("Engineering"), ("Management"), ("Sales");

insert into roles (title, salary, department_id)
values ("Front-End Engineer", 95000, 1), 
        ("Back-End Engineer", 95000, 1),
        ("Lead Engineer", 125000, 2),
        ("Sales Head", 125000, 2),
        ("Salesperson", 80000, 3);

insert into employees (first_name, last_name, role_id, manager_id)
values ("Leonard", "Dennis", 3, null),
        ("Candice", "Killjoy", 4, null),
        ("John", "Jones", 1, 1),
        ("Julian", "Lychof", 2, 1),
        ("Slim", "Bright", 5, 2),
        ("George", "Stanza", 5, 2);