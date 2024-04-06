import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './recipeFinder.css';

const serverURL = ''; // Make sure this points to your actual server URL

const RecipeFinder = () => {
  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [allergensArray, setAllergensArray] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState(() => {
    const localData = localStorage.getItem('savedRecipes');
    return localData ? JSON.parse(localData) : [];
  });
  const [showSavedRecipes, setShowSavedRecipes] = useState(false);
  const [dietaryRestrictionsArray, setDietaryRestrictionsArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;


  useEffect(() => {
    try {
      const savedAllergens = localStorage.getItem('allergens');
      if (savedAllergens) {
        setAllergensArray(JSON.parse(savedAllergens));
      }
    } catch (error) {
      console.error('Failed to parse allergens from localStorage:', error);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('allergens', JSON.stringify(allergensArray));
  }, [allergensArray]);

  const lastRowIndex = currentPage * itemsPerPage;
  const firstRowIndex = lastRowIndex - itemsPerPage;
  const currentRecipes = recipes.slice(firstRowIndex, lastRowIndex);
  const totalPages = Math.ceil(recipes.length / itemsPerPage);

  const getRecipes = () => {
    callApiGetRecipes().then(data => { // assuming that the server sends back the proper JSON
      // No need to parse as callApiGetRecipes already parses the response
      const filtered = filterRecipes(data, ingredientsArray, dietaryRestrictionsArray, allergensArray);
      setRecipes(filtered);
    }).catch(error => {
      console.error('Error fetching recipes:', error);
    });
  };

  const callApiGetRecipes = async () => {
    const url = `${serverURL}/api/getRecipes`;
    const body = {
      ingredientsArray,
      dietaryRestrictionsArray,
      allergensArray
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Assuming the server sends back a JSON object
      return await response.json();
    } catch (error) {
      console.error("There was an error fetching recipes:", error);
      throw error; // Rethrow the error to be caught by the caller of callApiGetRecipes
    }
  };

  const filterRecipes = (
    recipes,
    ingredientsArray,
    dietaryRestrictionsArray,
    allergensArray,
  ) => {
    return recipes.filter(recipe => {
      const recipeIngredientsLower = recipe.RecipeIngredientParts.toLowerCase();
      const ingredientsMatch =
        !Array.isArray(ingredientsArray) ||
        ingredientsArray.length === 0 ||
        ingredientsArray.every(ingredient =>
          recipeIngredientsLower.includes(ingredient.toLowerCase()),
        );

        const recipeDietaryRestrictionsLower = recipe.Keywords.toLowerCase();
        const dietaryRestrictionsMatch =
          !Array.isArray(dietaryRestrictionsArray) ||
          dietaryRestrictionsArray.length === 0 ||
          dietaryRestrictionsArray.every(restriction =>
            recipeDietaryRestrictionsLower.includes(restriction.toLowerCase()),
          );
  
        const allergensMatch = !allergensArray.some(allergen =>
          recipeIngredientsLower.includes(allergen.toLowerCase()),
        );
  
        return ingredientsMatch && dietaryRestrictionsMatch && allergensMatch;
      });
    };

  const handleDietaryChange = (event, restriction) => {
    const isChecked = event.target.checked;
    setDietaryRestrictionsArray(prevRestrictions => {
      if (isChecked) {
        // Add the restriction if it's not already in the array
        return prevRestrictions.includes(restriction)
          ? prevRestrictions
          : [...prevRestrictions, restriction];
      } else {
        // Remove the restriction if the checkbox is unchecked
        return prevRestrictions.filter(item => item !== restriction);
      }
    });
  };


  const handleSaveRecipe = (recipe) => {
    const isAlreadySaved = savedRecipes.some(savedRecipe => savedRecipe.RecipeId === recipe.RecipeId);
    if (!isAlreadySaved) {
      const newSavedRecipes = [...savedRecipes, recipe];
      setSavedRecipes(newSavedRecipes);
      // Additionally save to localStorage
      localStorage.setItem('savedRecipes', JSON.stringify(newSavedRecipes));
    }
  };

  const handleRemoveRecipe = (recipeId) => {
    const updatedSavedRecipes = savedRecipes.filter(recipe => recipe.RecipeId !== recipeId);
    setSavedRecipes(updatedSavedRecipes);
    localStorage.setItem('savedRecipes', JSON.stringify(updatedSavedRecipes));
  }; 

  const addAllergen = () => {
    if (ingredientInput.trim() && !allergensArray.includes(ingredientInput)) {
      setAllergensArray(prev => [...prev, ingredientInput]);
      setIngredientInput('');
    }
  };

  const handleRemoveAllergen = (index) => {
    setAllergensArray((prevAllergens) => prevAllergens.filter((_, i) => i !== index));
  };

  const handleToggleSavedRecipes = () => {
    setShowSavedRecipes(!showSavedRecipes);
  };

  const handleIngredientChange = (e) => {
    setIngredientInput(e.target.value);
  };

  const addIngredient = () => {
    if (ingredientInput.trim() && !ingredientsArray.includes(ingredientInput)) {
      setIngredientsArray(prev => [...prev, ingredientInput]);
      setIngredientInput('');
    }
  };

  const clearIngredients = () => {
    setIngredientsArray([]);
    setIngredientInput('');
  };

  const clearRecipes = () => {
    setRecipes([]);
  };

  const clearSearch = () => {
    setRecipes([]);
  };


  const goToNextPage = () => {
    setCurrentPage(current => Math.min(current + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage(current => Math.max(current - 1, 1));
  };

  return (
    <div className="container">
      <div className="heading-text">Search for Recipes</div>
      <div className="ingredient-input">
        <input
          type="text"
          id="text-input"
          placeholder="Enter Ingredients"
          value={ingredientInput} // Changed to use ingredientInput
          onChange={handleIngredientChange}
        />
        <button onClick={addIngredient}>Add</button>{' '}
        <button onClick={clearIngredients}>Clear</button>
        <button onClick={addAllergen}>Add as Allergen</button> {/* New Allergen Button */}
      </div>
      {/* Display added ingredients */}
      <div className="subheading-text">Added Ingredients</div>
      <div className="ingredients-list">
        {ingredientsArray.map((ingredient, index) => (
          <div key={index} className="ingredient-box">
            {ingredient}
          </div>
        ))}
      </div>
      <div className="subheading-text">Dietary Restrictions</div>
      <div className="dietary-restrictions">
        {/* ... (Dietary restrictions checkboxes) */}

         {/* Section to display added allergens */}
         <div className="subheading-text">Allergens</div>
<div className="allergens-list">
  {allergensArray.map((allergen, index) => (
    <div key={index} className="allergen-pill">
      {allergen}
      <button className="allergen-remove-btn" onClick={() => handleRemoveAllergen(index)}>
        &times; {/* This creates a 'times' symbol (×) to serve as a remove button */}
      </button>
    </div>
  ))}
</div>

        <label>
          <input
            type="checkbox"
            checked={dietaryRestrictionsArray.includes('Gluten Free')}
            onChange={e => handleDietaryChange(e, 'Gluten Free')}
          />{' '}
          Gluten-Free
        </label>
        <label>
          <input
            type="checkbox"
            checked={dietaryRestrictionsArray.includes('Lactose Free')}
            onChange={e => handleDietaryChange(e, 'Lactose Free')}
          />{' '}
          Lactose-Free
        </label>
        <label>
          <input
            type="checkbox"
            checked={dietaryRestrictionsArray.includes('Vegan')}
            onChange={e => handleDietaryChange(e, 'Vegan')}
          />{' '}
          Vegan
        </label>
      </div>
      <div className="recipe-buttons">
        <button onClick={getRecipes}>Search Recipes</button>
        <button onClick={clearSearch}>Clear Recipes</button>
        <button onClick={handleToggleSavedRecipes}>{showSavedRecipes ? 'Hide Saved' : 'Show Saved'} Recipes</button>
      </div>

      {showSavedRecipes && (
        <div>
          <h3>Saved Recipes:</h3>
          {savedRecipes.map((recipe, index) => (
            <div key={index}>
              {recipe.Name}
              <Link to={`/recipe/${recipe.RecipeId}`}>View</Link>
              <button onClick={() => handleRemoveRecipe(recipe.RecipeId)}>Remove</button>
            </div>
          ))}
        </div>
      )}
       
       {recipes.length > 0 && (
  <>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Ingredients</th>
          <th>Actions</th> {/* Add this header */}
        </tr>
      </thead>
      <tbody>
        {currentRecipes.map((recipe, index) => (
          <tr key={index}>
            <td>
              <Link to={`/recipe/${recipe.RecipeId}`}>{recipe.Name}</Link>
            </td>
            <td>{recipe.RecipeIngredientParts}</td>
            <td>
              {/* Add the Save Recipe button */}
              <button onClick={() => handleSaveRecipe(recipe)}>
                Save Recipe
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
          <div className="pagination">
            <button onClick={goToPreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={goToNextPage} disabled={currentPage >= totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );

              }
export default RecipeFinder;