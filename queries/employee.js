import db from "../db/connection.js";

const getEmployees = async () => {
  const [rows, fields] = await db.execute("SELECT * FROM employee");
  console.log({ rows });
  return rows;
};

const addEmployee = async (employee) => {
  const [rows, fields] = await db.execute(
    `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${employee.first_name}", "${employee.last_name}", ${employee.role_id}, ${employee.manager_id})`
  );
  console.log({ rows });
  return rows[0];
};

const updateEmployee = async (employee) => {
  const [rows, fields] = await db.execute(
    `UPDATE employee SET first_name = "${employee.first_name}", last_name = "${employee.last_name}", role_id = ${employee.role_id}, manager_id = ${employee.manager_id}, department_id = ${employee.department_id} WHERE id = ${employee.id}`
  );
  return rows[0];
};

export default { addEmployee, getEmployees, updateEmployee };
