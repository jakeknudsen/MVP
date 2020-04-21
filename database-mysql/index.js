const mysql = require("mysql");

const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "mvp",
});

dbConnection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("connected");
  }
});

module.exports = dbConnection;
