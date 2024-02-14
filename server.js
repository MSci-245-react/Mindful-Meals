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
const port = process.env.PORT || 5000;
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.static(path.join(__dirname, 'client/build')));

// API to read movies from the database
app.post('/api/getMovies', (req, res) => {
  let connection = mysql.createConnection(config);

  const sql = `SELECT id, name, year, quality FROM movies`;

  connection.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    let string = JSON.stringify(results);
    res.send({express: string});
  });
  connection.end();
});

// API to add a review to the database
app.post('/api/addReview', (req, res) => {
  const {userID, movieID, reviewTitle, reviewContent, reviewScore} = req.body;

  let connection = mysql.createConnection(config);

  const sql = `INSERT INTO Review (userID, movieID, reviewTitle, reviewContent, reviewScore) 
				 VALUES (?, ?, ?, ?, ?)`;

  const data = [userID, movieID, reviewTitle, reviewContent, reviewScore];

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

// API to import data from csv file into SQL DB
app.post('/api/uploadCSV', (req, res) => {
  const csvPath = path.join(__dirname, 'recipe_sample.csv');

  let connection = mysql.createConnection(config);
  const data = [];

  fs.createReadStream(csvPath)
    .pipe(csv())
    .on('data', row => {
      // Adapt this line to match your CSV structure and database table schema
      data.push([
        row.RecipeId,
        row.Name,
        row.AuthorId,
        row.AuthorName,
        row.CookTime,
        row.PrepTime,
        row.TotalTime,
        row.DatePublished,
        row.Description,
        row.Images,
        row.RecipeCategory,
        row.Keywords,
        row.RecipeIngredientQuantities,
        row.RecipeIngredientParts,
        row.AggregatedRating,
        row.ReviewCount,
        row.Calories,
        row.FatContent,
        row.SaturatedFatContent,
        row.CholesterolContent,
        row.SodiumContent,
        row.CarbohydrateContent,
        row.FiberContent,
        row.SugarContent,
        row.ProteinContent,
        row.RecipeServings,
        row.RecipeYield,
        row.RecipeInstructions,
      ]);
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
      const query = `
        INSERT INTO recipes (
          RecipeId, Name, AuthorId, AuthorName, CookTime, PrepTime, TotalTime, DatePublished, 
          Description, Images, RecipeCategory, Keywords, RecipeIngredientQuantities, 
          RecipeIngredientParts, AggregatedRating, ReviewCount, Calories, FatContent, 
          SaturatedFatContent, CholesterolContent, SodiumContent, CarbohydrateContent, 
          FiberContent, SugarContent, ProteinContent, RecipeServings, RecipeYield, 
          RecipeInstructions
        ) VALUES ?`;

      connection.query(query, [data], (error, response) => {
        if (error) {
          console.error('Error inserting data:', error.message);
          return res
            .status(500)
            .json({error: 'Error inserting CSV data into the database'});
        }
        res
          .status(200)
          .json({success: true, message: 'Data inserted successfully'});
      });
      connection.end();
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
