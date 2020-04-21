const dbConnection = require("./index.js");

dbConnection.query("CREATE DATABASE IF NOT EXISTS mvp;", (err) => {
  if (err) throw err;
});

dbConnection.query("USE mvp;", (err) => {
  if (err) throw err;
});

dbConnection.query(
  "CREATE TABLE IF NOT EXISTS project (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name varchar(45))",
  (err) => {
    if (err) throw err;
  }
);

dbConnection.query(
  "CREATE TABLE IF NOT EXISTS note (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, title varchar(1500), note varchar(1000), project_name varchar(150))",
  (err) => {
    if (err) throw err;
  }
);
