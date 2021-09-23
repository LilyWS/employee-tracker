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

const addTablePrompts = {
  'departments': [
    {
      name: 'dName',
      type: 'input',
      message: 'What\'s the name of the new department?'
    }
  ],
  'roles': [
    {
      name: 'rName',
      type: 'input',
      message: 'What\'s the name of the role?'
    },
    {
      name: 'salary',
      type: 'input',
      message: 'What\'s the salary of the role?'
    },
    {
      name: 'dID',
      type: 'input',
      message: 'What\'s the ID of the department the role belongs to??'
    }
  ],
  'employees': [
    {
      name: 'fName',
      type: 'input',
      message: 'What\'s the first name of the employee?'
    },
    {
      name: 'lName',
      type: 'input',
      message: 'What\'s the last name of the employee?'
    },
    {
      name: 'rID',
      type: 'input',
      message: 'What\'s the id of the role this employee fills?'
    },
    {
      name: 'mID',
      type: 'input',
      message: 'What\'s the id the employees manager? (leave blank for no manager)'
    }
  ]
}

const updateRowPrompts = [
  {
    type: 'input',
    message: 'Please enter the ID of the the employee you\'d like to update',
    name: 'eID'
  },
  {
    type: 'input',
    message: 'Please enter the ID of the the role you\'d like to give the employee',
    name: 'rID'
  }
]

const renderTable = (table) => {
  console.log(`\n ${table} table: \n`)

  db.query(`SELECT * FROM ${table}`, (err, data) => {
    console.table(data);
    continuePrompt();
  });
}

const addRow = (table) => {
  inq.prompt(addTablePrompts[table])
  .then((data) => {
    if(data.dName){
      db.query(`insert into departments(name) values('${data.dName}')`, (err, outcome) => {
        console.log(`Successfully added ${data.dName} department`);
        continuePrompt();
      });
    }else if (data.rName) {
      db.query(`insert into roles(title, salary, department_id) values('${data.rName}', ${data.salary}, ${data.dID})`, (err, outcome) => {
        console.log(`Successfully added ${data.rName} role`);
        continuePrompt();
      });
    }else if (data.fName) {
      db.query(`insert into employees(first_name, last_name, role_id, manager_id) values('${data.fName}', '${data.lName}', ${data.rID}, ${(data.mID) ? data.mID : 'null'})`, (err, outcome) => {
        console.log(`Successfully added ${data.fName} ${data.lName} as an employee`);
        continuePrompt();
      });
    }
  });
}

function updateRow(table) {
  inq.prompt(updateRowPrompts)
  .then(data => {
    db.query(`update employees set role_id = ${data.rID} where id = ${data.eID}`, (err, outcome) => {
      console.log(`Successfully updated the employees role`);
      continuePrompt();
    });
  })
}

const actionDictionary = {
  'View departments': [renderTable, 'departments'],
  'View Roles': [renderTable, 'roles'],
  'View Employees': [renderTable, 'employees'], 
  'Add a department': [addRow, 'departments'],
  'Add a role': [addRow, 'roles'],
  'Add an employee': [addRow, 'employees'],
  'Update an employee': [updateRow, 'employees']
}

function newAction() {
  inq.prompt(initPrompt).then(data => actionDictionary[data.action][0](actionDictionary[data.action][1]));
}
const continuePrompt = () => inq.prompt([{name: 'continue', type: 'input', message: 'Press ENTER to continue.'}]).then(data => newAction())

newAction()