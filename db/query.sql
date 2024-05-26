SELECT
    role.role_title,
    department.name 
FROM department
JOIN role ON role.role_department = department.department_id;

SELECT
    employee.employee_id,
    employee.employee_first_name,
    employee.employee_last_name,
    role.role_title,
    role.role_salary,
    department.name AS department_name,
    manager.employee_first_name AS manager_first_name,
    manager.employee_last_name AS manager_last_name
FROM employee
JOIN role ON employee.employee_role_id = role.role_id
JOIN department ON role.role_department = department.department_id
LEFT JOIN employee AS manager ON employee.manager_id = manager.employee_id;

