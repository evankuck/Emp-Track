INSERT INTO department
    (department_name, id)
VALUES
    ('Sales', 1),
    ('Marketing', 2),
    ('Accounting', 3);

INSERT INTO company_role
    (title, salary, department_id)
VALUES
    ('Sales Rep', 45000, 1),
    ('Marketing Rep', 50000, 2),
    ('CPA', 65000, 3);

INSERT INTO employee
    (first_name, last_name, role_id, department_id, manager_id)
VALUES
('Derek', 'Westin', 2, 2, 1),
('Jessica', 'Waters', 3, 3, 1),
('Alanah', 'DeGraw', 1, 1, 1),
('Denis', 'Markham', 1, 1, 1),
('Clinton', 'Munro', 2, 2, 1),
('Frankie', 'Jordan', 3, 3, 1),
('Abbie', 'Lee', 3, 3, 1);



