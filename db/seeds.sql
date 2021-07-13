use employeeTrackerDB;

INSERT INTO department
    (name)
VALUES
    ('Marketing'),
    ('Sales'),
    ('Management'),
    ('Finance');

INSERT INTO role    
    (title, salary, department_id)
VALUES
    ('Marketing', 100000, 1),
    ('CMO', 80000, 1),
    ('Sales Member', 150000, 2),
    ('Account Executive', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Team Manager', 125000, 3),
    ('CFO', 250000, 4),
    ('Finance', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Haneen', 'Nasereddin', 1, NULL),
    ('Solomon', 'Woods', 2, 1),
    ('Sam', 'Smith', 3, NULL),
    ('Kayla', 'James', 4, 3),
    ('Tim', 'Jackson', 5, NULL),
    ('Connor', 'Omalley', 6, 5),
    ('Alex', 'Allen', 7, NULL),
    ('Katie', 'Finnegan', 8, 7);
