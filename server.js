import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import bodyParser from 'body-parser';
import csv from 'csv-parser'; // importing the csv parser for importing data into SQL DB
import response from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5001;
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/api/SignUp', (req, res) => {
  const {firstName, lastName, userName, email, password} = req.body;
  let connection = mysql.createConnection(config);
  const sql = `INSERT INTO users (firstName, lastName, userName, email, password)
       VALUES (?, ?, ?, ?, ?)`;

  const data = [firstName, lastName, userName, email, password];

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      console.error('Error adding user:', error.message);
      return res.status(500).json({error: 'Error adding user to the database'});
    }

    return res.status(200).json({success: true});
  });
  connection.end();
});

app.post('/api/signIn', (req, res) => {
  const {userName, password} = req.body;
  let connection = mysql.createConnection(config);
  const sql = `SELECT * FROM users WHERE userName = ? AND password = ?`;
  const data = [userName, password];

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      console.error('Error authenticating user:', error.message);
      return res.status(500).json({error: 'Error authenticating user'});
    }
    if (results.length === 0) {
      return res.status(401).json({error: 'Invalid username or password'});
    }
    return res.status(200).json({success: true, user: results[0]});
  });
  connection.end();
});

app.get('/api/profilePage', (req, res) => {
  const {email} = req.query;
  let connection = mysql.createConnection(config);
  const sql = `SELECT * FROM users WHERE email = ?`;
  const data = [email];

  connection.query(sql, data, (err, results) => {
    connection.end();

    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({error: 'Internal Server Error'});
    }

    if (results.length === 0) {
      return res.status(404).json({error: 'User not found'});
    }

    const userData = results[0];
    return res.json({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      userName: userData.userName,
      bio: userData.bio || '',
      allergies: userData.allergies || '',
    });
  });
});

// API to read recipes from the database

app.get('/api/getRecipes', (req, res) => {
  let connection = mysql.createConnection(config);
  const sql = 'SELECT * FROM nutrition';

  connection.query(sql, (error, results, fields) => {
    connection.end();
    if (error) {
      console.error('Error querying the database:', error);
      res
        .status(500)
        .send('Error retrieving nutritional information from the database');
    } else {
      res.json(results);
    }
  });
});

// API to read recipes from the database
app.post('/api/getRecipes', (req, res) => {
  let connection = mysql.createConnection(config);

  const sql = `SELECT * FROM recipes`;

  connection.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    let string = JSON.stringify(results);
    res.send({express: string});
  });
  connection.end();
});

app.post('/api/addReview', (req, res) => {
  const {recipeId, userId, userName, reviewTitle, reviewBody, rating} =
    req.body;
  const connection = mysql.createConnection(config);
  const sql = `INSERT INTO review (recipeId, userId, userName, reviewTitle, reviewBody, rating) VALUES (?, ?, ?, ?, ?, ?)`;
  const data = [recipeId, userId, userName, reviewTitle, reviewBody, rating];

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      console.error('Error adding review:', error.message);
      return res
        .status(500)
        .json({error: 'Error adding review to the database'});
    }

    return res.status(200).json({success: true});
  });

  connection.end();
});

app.post('/api/addSavedRecipe', (req, res) => {
  const {recipeId, userId, userName, recipeName} = req.body;
  const connection = mysql.createConnection(config);
  const sql = `INSERT INTO savedRecipes (recipeId, userId, userName, recipeName) VALUES (?, ?, ?, ?)`;
  const data = [recipeId, userId, userName, recipeName];

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      console.error('Error adding review:', error.message);
      res.status(500).json({error: 'Error adding review to the database'});
    } else {
      res.status(200).json({success: true});
    }
    connection.end(); // Close the connection here
  });
});

app.post('/api/getUserData', (req, res) => {
  let connection = mysql.createConnection(config);
  const userEmail = req.body.email;

  const sql = `SELECT * FROM users WHERE email = ?`;

  connection.query(sql, [userEmail], (error, results) => {
    if (error) {
      res.status(500).send({error: error.message});
      return console.error(error.message);
    }
    if (results.length > 0) {
      res.send(results[0]);
    } else {
      res.status(404).send({message: 'User not found'});
    }
  });

  connection.end();
});

app.post('/api/getReviews', (req, res) => {
  let connection = mysql.createConnection(config);

  const sql = `SELECT * FROM review`;

  connection.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    let string = JSON.stringify(results);
    res.send({express: string});
  });
  connection.end();
});

app.post('/api/getNutritionalInfo', (req, res) => {
  let connection = mysql.createConnection(config);

  const sql = `SELECT * FROM nutrition`;

  connection.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    let string = JSON.stringify(results);
    res.send({express: string});
  });
  connection.end();
});

app.listen(port, () => console.log(`Listening on port ${port}`));

app.post('/api/saveProfileChanges', (req, res) => {
  const {userName, password, bio, dietaryRestrictions} = req.body;
  let connection = mysql.createConnection(config);
  const sql = `UPDATE users SET bio = ?, dietaryRestrictions = ? WHERE userName = ? AND password = ?`;
  const data = [bio, JSON.stringify(dietaryRestrictions), userName, password];

  connection.query(sql, data, (err, results) => {
    connection.end();

    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({error: 'Internal Server Error'});
    }

    if (results.length === 0) {
      return res.status(404).json({error: 'User not found'});
    }

    return res.json({message: 'Profile changes saved successfully'});
  });
});

app.post('/api/deleteAccount', (req, res) => {
  const {userName, password} = req.body;
  let connection = mysql.createConnection(config);
  const sql = `DELETE FROM users WHERE userName = ? AND password = ?`;
  const data = [userName, password];

  connection.query(sql, data, (err, results) => {
    connection.end();

    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({error: 'Internal Server Error'});
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({error: 'User not found'});
    }

    return res.json({message: 'Account deleted successfully'});
  });
});

app.post('/api/updateBio', (req, res) => {
  const {email, bio} = req.body;
  let connection = mysql.createConnection(config);
  const sql = 'UPDATE users SET bio = ? WHERE email = ?';
  const data = [bio, email];

  connection.query(sql, data, (err, results) => {
    connection.end();

    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({error: 'Internal Server Error'});
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({error: 'User not found'});
    }

    return res.json({message: 'Bio updated successfully'});
  });
});

app.post('/api/updateDietaryRestrictions', (req, res) => {
  const {email, dietaryRestrictions} = req.body;
  let connection = mysql.createConnection(config);
  const sql = 'UPDATE users SET dietaryRestrictions = ? WHERE email = ?';
  const data = [dietaryRestrictions, email];

  connection.query(sql, data, (err, results) => {
    connection.end();

    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({error: 'Internal Server Error'});
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({error: 'User not found'});
    }

    return res.json({message: 'Dietary restrictions updated successfully'});
  });
});

app.post('/api/updateAllergies', (req, res) => {
  const {email, allergies} = req.body;
  let connection = mysql.createConnection(config);
  const sql = 'UPDATE users SET allergies = ? WHERE email = ?';
  const data = [allergies, email];

  connection.query(sql, data, (err, results) => {
    connection.end();

    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({error: 'Internal Server Error'});
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({error: 'User not found'});
    }

    return res.json({message: 'Allergies updated successfully'});
  });
});

app.post('/api/getSavedRecipes', (req, res) => {
  const {userId} = req.body;
  let connection = mysql.createConnection(config);
  const sql = `SELECT DISTINCT recipeId, recipeName FROM savedRecipes WHERE userId = ?`;
  const data = [userId];

  connection.query(sql, data, (err, results) => {
    connection.end();

    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({error: 'Internal Server Error'});
    }

    if (results.length === 0) {
      return res.status(404).json({error: 'No saved recipes found'});
    }

    return res.json(results);
  });
});
