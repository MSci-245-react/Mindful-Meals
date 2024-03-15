import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import './recipeDetail.css';

const serverURL = ''; // Make sure to set your actual server URL here

const RecipeDetail = () => {
  let {RecipeId} = useParams();
  const [currentRecipe, setCurrentRecipe] = useState(null); // Only storing the current recipe now

  useEffect(() => {
    const callApiGetRecipes = async () => {
      const url = `${serverURL}/api/getRecipes`;
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const body = await response.json();
        console.log('Fetched recipes:', body);
        const parsed = JSON.parse(body.express);
        findRecipe(parsed, RecipeId); // Call findRecipe with the parsed data
      } catch (error) {
        console.error('Fetching error:', error);
      }
    };

    callApiGetRecipes();
  }, [RecipeId]);

  const findRecipe = (recipes, recipeId) => {
    const id = Number(recipeId);
    const foundRecipe = recipes.find(recipe => recipe.RecipeId === id);
    setCurrentRecipe(foundRecipe);
  };

  const parseString = inputString => {
    return inputString
      .slice(3, -2)
      .split(',')
      .map(item => item.trim().replace(/"/g, ''));
  };

  let matches = [];
  if (currentRecipe) {
    const quantities = parseString(currentRecipe.RecipeIngredientQuantities);
    const ingredients = parseString(currentRecipe.RecipeIngredientParts);

    matches = quantities.map((quantity, index) => {
      return {quantity: quantity, ingredient: ingredients[index]};
    });
  }

  let numberedInstructions = [];
  if (currentRecipe && currentRecipe.RecipeInstructions) {
    numberedInstructions = currentRecipe.RecipeInstructions.slice(3, -2)
      .split('", "')
      .map(item => item.trim().replace(/"/g, ''));
  }

  return (
    <div className="recipe-container">
      {currentRecipe ? (
        <>
          <div>
            <h2 className="main-header">{currentRecipe.Name}</h2>
            <p>Uploaded By: {currentRecipe.AuthorName}</p>
            <div>
              <h3 className="headings">Ingredients</h3>
              <ul className="instructions-ingredient-font">
                {matches.map((match, index) => (
                  <li key={index}>
                    {match.quantity} {match.ingredient}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="headings">Instructions</h3>
              <ol className="instructions-ingredient-font">
                {numberedInstructions.map((instr, index) => (
                  <li key={index}>{instr}</li>
                ))}
              </ol>
            </div>
          </div>
        </>
      ) : (
        <p>Loading recipe details...</p>
      )}
    </div>
  );
};

export default RecipeDetail;
