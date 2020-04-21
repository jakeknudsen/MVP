const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("../database-mysql/index.js");
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');
const app = express();
app.use(cors());

app.use(express.static(__dirname + "/../client/dist"));

app.get("/journals", (req, res) => {
  db.query(`SELECT name FROM project`, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

app.get("/entries", (req, res) => {
  db.query(`SELECT * FROM note WHERE project_name = 'MVP'`, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

app.post("/journals:projectTitle", (req, res) => {
  const request = req.params.projectTitle.split(":");
  const title = request[1];
  db.query(`INSERT INTO project (name) VALUES ('${title}')`);
  res.end();
});

app.post("/entries:entry", (req, res) => {
  const request = req.params.entry.split(":");
  const splitTitle = request[2].split(",");
  const title = splitTitle[0];
  const splitNote = request[3].split("}");
  const note = splitNote[0];

  db.query(
    `INSERT INTO note (title, note, project_name) VALUES (${title}, ${note}, 'MVP')`
  );
  res.end();
});

app.listen(3000, function () {
  console.log("listening on port 3000");
});
