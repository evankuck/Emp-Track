import db from "../db/connection.js";

const getDepartments = async () => {
  const [rows, fields] = await db.execute("SELECT * FROM department");
  console.log({ rows });
  return rows;
};

const addDepartment = async (department) => {
  const [rows, fields] = await db.execute(
    "INSERT INTO department (department_name) VALUES ($1) RETURNING *",
    [department]
  );
  console.log({ rows });
  return rows[0];
};

export default { addDepartment, getDepartments };
