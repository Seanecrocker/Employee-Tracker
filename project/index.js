const inquirer = require('inquirer');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'Postgres1228',
    host: 'localhost',
    database: 'employee_tracker'
});

// Main menu function
const mainMenu = async () => {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Exit'
            ]
        }
    ]);

    switch (action) {
        case 'View All Employees':
            await viewAllEmployees();
            break;
        case 'Add Employee':
            await addEmployee();
            break;
        case 'Update Employee Role':
            await updateEmployeeRole();
            break;
        case 'View All Roles':
            await viewAllRoles();
            break;
        case 'Add Role':
            await addRole();
            break;
        case 'View All Departments':
            await viewAllDepartments();
            break;
        case 'Add Department':
            await addDepartment();
            break;
        case 'Exit':
            pool.end();
            console.log('Goodbye!');
            return; // Exit the program
    }
};

// Helper function to execute a query and log the results
const executeQuery = async (query, params = []) => {
    try {
        const res = await pool.query(query, params);
        return res.rows;
    } catch (err) {
        console.error('Error executing query', err);
        return [];
    }
};

// Function to view all employees with detailed information
const viewAllEmployees = async () => {
    const query = `
        SELECT 
            e.employee_first_name AS first_name,
            e.employee_last_name AS last_name,
            r.role_title AS title,
            d.name AS department,
            r.role_salary AS salary,
            CONCAT(m.employee_first_name, ' ', m.employee_last_name) AS manager
        FROM employee e
        LEFT JOIN role r ON e.employee_role_id = r.role_id
        LEFT JOIN department d ON r.role_department = d.department_id
        LEFT JOIN employee m ON e.manager_id = m.employee_id
        ORDER BY e.employee_id;
    `;

    const rows = await executeQuery(query);
    console.table(rows);

    return mainMenu(); // Return to the main menu after displaying data
};

// Function to add an employee
const addEmployee = async () => {
    console.log("addEmployee function called"); // Debug log

    const roles = await executeQuery('SELECT role_id, role_title FROM role');
    const roleChoices = roles.map(role => ({ name: role.role_title, value: role.role_id }));

    const employees = await executeQuery('SELECT employee_id, employee_first_name || \' \' || employee_last_name AS name FROM employee');
    const managerChoices = employees.map(emp => ({ name: emp.name, value: emp.employee_id }));
    managerChoices.push({ name: 'None', value: null });

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'last_name',
            message: "What is the employee's last name?"
        },
        {
            type: 'list',
            name: 'role_id',
            message: "What is the employee's role?",
            choices: roleChoices
        },
        {
            type: 'list',
            name: 'manager_id',
            message: "Who is the employee's manager?",
            choices: managerChoices
        }
    ]);

    console.log("Inquirer prompt answers:", answers); // Debug log

    await executeQuery('INSERT INTO employee (employee_first_name, employee_last_name, employee_role_id, manager_id) VALUES ($1, $2, $3, $4)', [answers.first_name, answers.last_name, answers.role_id, answers.manager_id]);
    console.log(`Added ${answers.first_name} ${answers.last_name} to the database`);
    
    return mainMenu();
};

const updateEmployeeRole = async () => {
    const employees = await executeQuery('SELECT employee_id, employee_first_name || \' \' || employee_last_name AS name FROM employee');
    const employeeChoices = employees.map(emp => ({ name: emp.name, value: emp.employee_id }));

    const roles = await executeQuery('SELECT role_id, role_title FROM role');
    const roleChoices = roles.map(role => ({ name: role.role_title, value: role.role_id }));

    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: "Which employee's role do you want to update?",
            choices: employeeChoices
        },
        {
            type: 'list',
            name: 'role_id',
            message: "Which role do you want to assign the selected employee?",
            choices: roleChoices
        }
    ]);

    await executeQuery('UPDATE employee SET employee_role_id = $1 WHERE employee_id = $2', [answers.role_id, answers.employee_id]);
    console.log(`Updated employee's role`);
    
    return mainMenu();
};

const viewAllRoles = async () => {
    const rows = await executeQuery('SELECT * FROM role');
    console.table(rows);
    
    return mainMenu(); // Return to the main menu after displaying data
};

const addRole = async () => {
    const departments = await executeQuery('SELECT department_id, name FROM department');
    const departmentChoices = departments.map(dept => ({ name: dept.name, value: dept.department_id }));

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'role_title',
            message: "What is the role's title?"
        },
        {
            type: 'input',
            name: 'role_salary',
            message: "What is the role's salary?"
        },
        {
            type: 'list',
            name: 'role_department',
            message: "Which department does the role belong to?",
            choices: departmentChoices
        }
    ]);

    await executeQuery('INSERT INTO role (role_title, role_salary, role_department) VALUES ($1, $2, $3)', [answers.role_title, answers.role_salary, answers.role_department]);
    console.log(`Added role ${answers.role_title} to the database`);
    
    return mainMenu();
};

const viewAllDepartments = async () => {
    const rows = await executeQuery('SELECT * FROM department');
    console.table(rows);
    
    return mainMenu(); // Return to the main menu after displaying data
};

const addDepartment = async () => {
    const { name } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the department's name?"
        }
    ]);

    await executeQuery('INSERT INTO department (name) VALUES ($1)', [name]);
    console.log(`Added department ${name} to the database`);
    
    return mainMenu();
};

// Start the application
mainMenu();
