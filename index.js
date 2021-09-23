const inq = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table')

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_db'
    },
    console.log(`Connected to the companies database.`)
);

const initPrompt = [{
    type: 'list',
    name: 'action',
    message: 'What action would you like to take?',
    choices: ['View departments', 'View Roles', 'View Employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee']
}];

function renderTable(table) {
    db.query(`SELECT * FROM ${table}`, (err, data) =>{
        console.log(data);
    })
}

inq.prompt(initPrompt).then(data => renderTable('departments'));