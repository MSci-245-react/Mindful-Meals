import mysql from "mysql";
import config from "./config.js";
import fetch from "node-fetch";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import csv from "csv-parser"; // importing the csv parser for importing data into SQL DB
import response from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5001;
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

app.post("/api/SignUp", (req, res) => {
  const { firstName, lastName, userName, email, password } = req.body;
  let connection = mysql.createConnection(config);
  const sql = `INSERT INTO users (firstName, lastName, userName, email, password)
        VALUES (?, ?, ?, ?, ?)`;

  const data = [firstName, lastName, userName, email, password];

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      console.error("Error adding user:", error.message);
      return res
        .status(500)
        .json({ error: "Error adding user to the database" });
    }

    return res.status(200).json({ success: true });
  });
  connection.end();
});

app.post("/api/signIn", (req, res) => {
  const { userName, password } = req.body;
  let connection = mysql.createConnection(config);
  const sql = `SELECT * FROM users WHERE userName = ? AND password = ?`;
  const data = [userName, password];

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      console.error("Error authenticating user:", error.message);
      return res.status(500).json({ error: "Error authenticating user" });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    return res.status(200).json({ success: true, user: results[0] });
  });
  connection.end();
});

app.post("/api/profilePage", (req, res) => {
  const { userName, password } = req.body;
  let connection = mysql.createConnection(config);
  const sql = `SELECT * FROM users WHERE userName = ? AND password = ?`;
  const data = [userName, password];

  connection.query(sql, data, (err, results) => {
    connection.end();

    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = results[0];
    return res.json({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      bio: userData.bio || '',
      dietaryRestrictions: userData.dietaryRestrictions || {},
    });
  });
});

// API to read recipes from the database

app.get("/api/getRecipes", (req, res) => {
  let connection = mysql.createConnection(config);
  const sql = "SELECT * FROM nutrition";

  connection.query(sql, (error, results, fields) => {
    connection.end();
    if (error) {
      console.error("Error querying the database:", error);
      res
        .status(500)
        .send("Error retrieving nutritional information from the database");
    } else {
      res.json(results);
    }
  });
});

// API to read recipes from the database
app.post("/api/getRecipes", (req, res) => {
  let connection = mysql.createConnection(config);

  const sql = `SELECT * FROM recipes`;

  connection.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    let string = JSON.stringify(results);
    res.send({ express: string });
  });
  connection.end();
});

app.post("/api/getNutritionalInfo", (req, res) => {
  let connection = mysql.createConnection(config);

  const sql = `SELECT * FROM nutrition`;

  connection.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    let string = JSON.stringify(results);
    res.send({ express: string });
  });
  connection.end();
});

app.listen(port, () => console.log(`Listening on port ${port}`));

app.post("/api/saveProfileChanges", (req, res) => {
  const { userName, password, bio, dietaryRestrictions } = req.body;
  let connection = mysql.createConnection(config);
  const sql = `UPDATE users SET bio = ?, dietaryRestrictions = ? WHERE userName = ? AND password = ?`;
  const data = [bio, JSON.stringify(dietaryRestrictions), userName, password];

  connection.query(sql, data, (err, results) => {
    connection.end();

    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ message: "Profile changes saved successfully" });
  });
});

app.post("/api/deleteAccount", (req, res) => {
  const { userName, password } = req.body;
  let connection = mysql.createConnection(config);
  const sql = `DELETE FROM users WHERE userName = ? AND password = ?`;
  const data = [userName, password];

  connection.query(sql, data, (err, results) => {
    connection.end();

    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ message: "Account deleted successfully" });
  });
});