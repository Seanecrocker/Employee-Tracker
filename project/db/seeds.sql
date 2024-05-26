-- Insert into department
INSERT INTO department (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

-- Insert into role with subqueries to get the department_id
INSERT INTO role (role_title, role_department, role_salary)
VALUES ('Software Engineer', (SELECT department_id FROM department WHERE name = 'Engineering'), 120000),
       ('Account Manager', (SELECT department_id FROM department WHERE name = 'Finance'), 160000),
       ('Sales Lead', (SELECT department_id FROM department WHERE name = 'Sales'), 100000),
       ('Salesperson', (SELECT department_id FROM department WHERE name = 'Sales'), 80000),
       ('Lead Engineer', (SELECT department_id FROM department WHERE name = 'Engineering'), 150000),
       ('Accountant', (SELECT department_id FROM department WHERE name = 'Finance'), 125000),
       ('Legal Team Lead', (SELECT department_id FROM department WHERE name = 'Legal'), 250000),
       ('Lawyer', (SELECT department_id FROM department WHERE name = 'Legal'), 190000);

-- Insert into employee with correct syntax for manager_id
INSERT INTO employee (employee_first_name, employee_last_name, employee_role_id, manager_id)
VALUES ('John', 'Doe', (SELECT role_id FROM role WHERE role_title = 'Software Engineer'), NULL),
       ('Mike', 'Chan', (SELECT role_id FROM role WHERE role_title = 'Account Manager'), 1),
       ('Ashley', 'Rodriguez', (SELECT role_id FROM role WHERE role_title = 'Sales Lead'), 2),
       ('Kevin', 'Tupik', (SELECT role_id FROM role WHERE role_title = 'Salesperson'), NULL),
       ('Kunal', 'Singh', (SELECT role_id FROM role WHERE role_title = 'Lead Engineer'), 3),
       ('Malia', 'Brown', (SELECT role_id FROM role WHERE role_title = 'Accountant'), NULL),
       ('Sarah', 'Lourd', (SELECT role_id FROM role WHERE role_title = 'Legal Team Lead'), 4),
       ('Tom', 'Allen', (SELECT role_id FROM role WHERE role_title = 'Lawyer'), NULL);



-- INSERT INTO employee (employee_first_name, employee_last_name, employee_role_id)
-- VALUES  ('John', 'Doe', 1),
--         ('Mike', 'Chan', 2),
--         ('Ashley', 'Rodriguez', 3),
--         ('Kevin', 'Tupik' 4),
--         ('Kunal', 'Singh', 5),
--         ('Malia', 'Brown' 6),
--         ('Sarah', 'Lourd' 7),
--         ('Tom', 'Allen' 8);
    