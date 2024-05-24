DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

/c employee_tracker;

CREATE TABLE department (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(30) UNIQUE NOT NULL,
);

CREATE TABLE role (
    role_id SERIAL PRIMARY KEY,
    role_title VARCHAR(30) UNIQUE NOT NULL,
    role_salary DECIMAL NOT NULL,
    role_department INTEGER NOT NULL,
    FOREIGN KEY (role_department) REFERENCES department(department_id)
);

CREATE TABLE employee (
    employee_id SERIAL PRIMARY KEY,
    employee_first_name VARCHAR(30) NOT NULL,
    employee_last_name VARCHAR(30) NOT NULL,
    employee_role_id INTEGER NOT NULL,
    FOREIGN KEY (employee_role_id) REFERENCES role(role_id)
    manager_id INTEGER
    FOREIGN KEY (manager_id) REFERENCES employee(employee_id)
)

