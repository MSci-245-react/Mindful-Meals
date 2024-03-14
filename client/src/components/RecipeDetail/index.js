import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

const serverURL = ''; // Make sure to set your actual server URL here

const RecipeDetail = () => {
  let {RecipeId} = useParams();
  const [currentRecipe, setCurrentRecipe] = useState(null); // Only storing the current recipe now

  useEffect(() => {
    const callApiGetRecipes = async () => {
      const url = `${serverURL}/api/getRecipes`; // Adjust if your API endpoint differs
      try {
        const response = await fetch(url, {
          method: 'POST', // Use 'GET' if fetching data
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const body = await response.json();
        console.log('Fetched recipes:', body);
        const parsed = JSON.parse(body.express); // Adjust according to the actual structure of your response
        findRecipe(parsed, RecipeId); // Call findRecipe with the parsed data
      } catch (error) {
        console.error('Fetching error:', error);
      }
    };

    callApiGetRecipes();
  }, [RecipeId]); // Depend on RecipeId to refetch if it changes

  const findRecipe = (recipes, recipeId) => {
    const id = Number(recipeId); // Convert RecipeId to Number if it's a string
    // Assuming recipe.id should match RecipeId; adjust "id" to the actual property name if different
    const foundRecipe = recipes.find(recipe => recipe.RecipeId === id);
    setCurrentRecipe(foundRecipe); // Set the found recipe
  };

  return (
    <div className="container">
      <h2>Recipe Details for ID: {RecipeId}</h2>
      {currentRecipe ? (
        <div>
          <h3>{currentRecipe.Name}</h3>
          {/* Display more details of the currentRecipe here */}
        </div>
      ) : (
        <p>Loading recipe details...</p>
      )}
    </div>
  );
};

export default RecipeDetail;
