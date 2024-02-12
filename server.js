import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import bodyParser from 'body-parser';
import response from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/api/loadUserSettings', (req, res) => {
  let connection = mysql.createConnection(config);
  let userID = req.body.userID;

  let sql = `SELECT mode FROM user WHERE userID = ?`;
  console.log(sql);
  let data = [userID];
  console.log(data);

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }

    let string = JSON.stringify(results);
    //let obj = JSON.parse(string);
    res.send({express: string});
  });
  connection.end();
});

app.post('/api/loadMovies', (req, res) => {
  let connection = mysql.createConnection(config);
  let userID = req.body.userID;

  let sql = `SELECT * FROM movies`;
  console.log(sql);
  let data = [userID];
  console.log(data);

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }

    let string = JSON.stringify(results);
    //let obj = JSON.parse(string);
    res.send({express: string});
  });
  connection.end();
});

app.post('/api/addReview', (req, res) => {
  const {reviewTitle, reviewScore, reviewContent, userID, movieID} = req.body;

  const connection = mysql.createConnection(config);

  const sql =
    'INSERT INTO review (reviewTitle, reviewScore, reviewContent, userID, movieID) VALUES (?, ?, ?, ?, ?)';
  const values = [reviewTitle, reviewScore, reviewContent, userID, movieID];
  console.log(values);

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error adding review:', error);
      res.sendStatus(500);
    } else {
      console.log('Review added successfully');
      res.sendStatus(200);
    }
    connection.end();
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
