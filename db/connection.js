import mysql from "mysql2/promise";

// Connect to database
const db = await mysql.createConnection({
  host: "localhost",
  // Your MySQL username,
  user: "root",
  // Your MySQL password
  password: "Antlerboy004!?",
  database: "employee",
});

export default db;
