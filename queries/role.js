import db from "../db/connection.js";

// get /api/role
async function getRoles() {
  const [rows, fields] = await db.query(`SELECT * FROM company_role`);
  console.log({ rows });
  return rows;
}

async function addRole(role) {
  const [rows, fields] = await db.query(
    `INSERT INTO company_role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *`,
    [role.title, role.salary, role.department_id]
  );
  return rows[0];
}

const updateRole = async (role) => {
  const [rows, fields] = await db.query(
    `UPDATE company_role SET title = $1, salary = $2, department_id = $3 WHERE id = $4 RETURNING *`,
    [role.title, role.salary, role.department_id, role.id]
  );
};

export default { addRole, getRoles, updateRole };
