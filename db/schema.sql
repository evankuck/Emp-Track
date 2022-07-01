DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS company_role;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(30)
);


CREATE TABLE company_role (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER
);


CREATE TABLE employee (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
  manager_id INTEGER,
  department_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES company_role (id),
  FOREIGN KEY (department_id) REFERENCES department (id),
  FOREIGN KEY (manager_id) REFERENCES employee (id)
);
