import inquirer from "inquirer";
import queries from "./queries/index.js";

async function main() {
  const choice = await homeScreen();

  switch (choice) {
    case "View Employees":
      await viewEmployees();

      break;

    case "Add Employee":
      await addEmployee();

      break;

    case "Update Employee":
      await updateEmployee();

      break;

    case "Add Role":
      await addRole();

      break;

    case "View Roles":
      await viewRoles();

      break;

    case "Add Department":
      await addDepartment();

      break;

    case "View Departments":
      await viewDepartments();

      break;

    case "End":
      connection.end();
      break;
  }
}

async function homeScreen() {
  const { choice } = await inquirer.prompt({
    type: "list",
    name: "choice",
    message: "What would you like to do?",
    choices: [
      "View Employees",
      "View Roles",
      "View Departments",
      "Add Employee",
      "Add Role",
      "Add Department",
      "Update Employee",
      "Delete Employee",
      "Delete Role",
      "Delete Department",
      "EXIT",
    ],
  });
  return choice;
}

async function viewEmployees() {
  const employees = await queries.Employee.getEmployees();
  console.table(employees);
  return employees;
}

async function addEmployee() {
  // prompt for info about an employee then query to insert that addEmployee

  const roles = await queries.Role.getRoles();
  const managers = await queries.Employee.getEmployees();
  const employeeAnswers = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is the employee's first name?",
    },
    {
      type: "input",
      name: "last_name",
      message: "What is the employee's last name?",
    },
    {
      type: "list",
      name: "role_id",
      message: "What is the employee's role?",
      choices: roles.map((role) => ({
        name: `${role.title} - ${role.salary}`,
        value: role.id,
      })),
    },
    {
      type: "list",
      name: "manager_id",
      message: "who is the employee's manager?",
      choices: managers.map((manager) => ({
        name: manager.first_name + " " + manager.last_name,
        value: manager.id,
      })),
    },
  ]);

  const employee = await queries.Employee.addEmployee(employeeAnswers);
  return employee;
}

async function updateEmployee() {
  const employees = await queries.Employee.getEmployees();
  const roles = await queries.Role.getRoles();
  const departments = await queries.Department.getDepartments();
  const { whichEmployee } = await inquirer.prompt([
    {
      type: "list",
      name: "whichEmployee",
      message: "Which employee would you like to update?",
      choices: employees.map((employee) => ({
        name: employee.first_name + " " + employee.last_name,
        value: employee.id,
      })),
    },
  ]);

  const employeeDetails = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      default: employees[whichEmployee - 1].first_name,
      message: "What is the employee's first name?",
    },
    {
      type: "input",
      name: "last_name",
      default: employees[whichEmployee - 1].last_name,
      message: "What is the employee's last name?",
    },
    {
      type: "list",
      name: "role_id",
      message: "What is the employee's role?",
      choices: roles.map((role) => ({
        name: `${role.title} - ${role.salary}`,
        value: role.id,
      })),
    },
    {
      type: "list",
      name: "manager_id",
      message: "who is the employee's manager?",
      choices: employees.map((employee) => ({
        name: employee.first_name + " " + employee.last_name,
        value: employee.id,
      })),
    },
    {
      type: "list",
      name: "department_id",
      message: "what is the employee's department?",
      choices: departments.map((department) => ({
        name: department.department_name,
        value: department.id,
      })),
    },
  ]);

  const updatedEmployee = await queries.Employee.updateEmployee({
    ...employeeDetails,
    id: whichEmployee,
  });
  return updateEmployee;
}

async function addRole() {
  const role = inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the role's title?",
    },
    {
      type: "input",
      name: "salary",
      message: "What is the role's salary?",
    },
    {
      type: "input",
      name: "department_id",
      message: "What is the role's department?",
    },
  ]);
  const newRole = await queries.Role.addRole(role);
  return newRole;
}

async function viewRoles() {
  const roles = await queries.Role.getRoles();
  console.table(roles);
  return roles;
}

async function addDepartment() {
  const department = await inquirer.prompt([
    {
      type: "input",
      name: "department_name",
      message: "What is the department's name?",
    },
  ]);
  queries.Department.addDepartment(department);
  return department;
}

async function viewDepartments() {
  const departments = await queries.Department.getDepartments();
  console.table(departments);
  return departments;
}

main();
