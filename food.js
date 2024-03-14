const mysql = require('mysql');
const fs = require('fs');
const csv = require('csv-parser');
const results = [];

// Database connection parameters 
const connection = mysql.createConnection({
  host: 'ec2-3-137-65-169.us-east-2.compute.amazonaws.com',
  user: 'j5ngai',
  password: 'MSCI342',
  database: 'j5ngai',
});

// Establish connection with food database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL server.');
});

// Read the CSV file
fs.createReadStream('/path/to/your/recipe_sample.csv') // (recipe_sample.csv)
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    // Data has been read and parsed, now insert into the database
    results.forEach((row) => {
      const sql = `
        INSERT INTO recipes
        (RecipeId, Name, AuthorId, AuthorName, CookTime, PrepTime, TotalTime, DatePublished, Description, Images, RecipeCategory, Keywords, RecipeCuisine, Nutrition, AggregateRating, ReviewCount, Calories, FatContent, SaturatedFatContent, CholesterolContent, SodiumContent, CarbohydrateContent, FiberContent, SugarContent, ProteinContent, RecipeServings, RecipeYield, RecipeInstructions)
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
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
        row.RecipeCuisine,
        row.Nutrition,
        row.AggregateRating,
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
        row.RecipeInstructions
      ];

      // Insert the data into the database
      connection.query(sql, values, (error, results, fields) => {
        if (error) throw error;
        console.log(`Row inserted with RecipeId: ${row.RecipeId}`);
      });
    });

    // Close the database connection
    connection.end();
  });
