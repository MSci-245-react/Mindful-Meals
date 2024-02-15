import mysql from 'mysql';
import csv from 'csv-parser';
import fs from 'fs';
import config from './config.js';

const csvPath = 'recipe_sample.csv';

// Create a connection to the database
const connection = mysql.createConnection(config);

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database successfully.');
});

const insertData = data => {
  const placeholders = data.map(() => '(?)').join(',');
  const query = `INSERT INTO recipes (
        RecipeId, Name, AuthorId, AuthorName, CookTime, PrepTime, TotalTime, DatePublished, 
        Description, Images, RecipeCategory, Keywords, RecipeIngredientQuantities, RecipeIngredientParts, 
        AggregatedRating, ReviewCount, Calories, FatContent, SaturatedFatContent, CholesterolContent, 
        SodiumContent, CarbohydrateContent, FiberContent, SugarContent, ProteinContent, 
        RecipeServings, RecipeYield, RecipeInstructions
    ) VALUES ${placeholders}`;

  connection.query(query, data, (error, results) => {
    if (error) {
      console.error('Error inserting data:', error);
    } else {
      console.log('Data inserted successfully:', results);
    }
  });
};

const data = [];

let isFirstRow = true;

fs.createReadStream(csvPath)
  .pipe(
    csv({
      headers: [
        'RecipeId',
        'Name',
        'AuthorId',
        'AuthorName',
        'CookTime',
        'PrepTime',
        'TotalTime',
        'DatePublished',
        'Description',
        'Images',
        'RecipeCategory',
        'Keywords',
        'RecipeIngredientQuantities',
        'RecipeIngredientParts',
        'AggregatedRating',
        'ReviewCount',
        'Calories',
        'FatContent',
        'SaturatedFatContent',
        'CholesterolContent',
        'SodiumContent',
        'CarbohydrateContent',
        'FiberContent',
        'SugarContent',
        'ProteinContent',
        'RecipeServings',
        'RecipeYield',
        'RecipeInstructions',
      ],
      skipLines: 1, // Skip the first line (header row)
    }),
  )
  .on('data', row => {
    if (isFirstRow) {
      isFirstRow = false;
      return; // Skip the first row
    }
    console.log(row);
    // Convert each row object to an array of values in the correct order
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
    console.log(row.RecipeId);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    insertData(data);
    connection.end();
  });
