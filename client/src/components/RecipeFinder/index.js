import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './recipeFinder.css';

const serverURL = '';


const RecipeFinder = () => {
  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState(() => {
    // Retrieve saved recipes from localStorage or set to empty array
    const localData = localStorage.getItem('savedRecipes');
    return localData ? JSON.parse(localData) : [];
  });
  const [showSavedRecipes, setShowSavedRecipes] = useState(false);
  const [dietaryRestrictionsArray, setDietaryRestrictionsArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [allergensArray, setAllergensArray] = useState(() => {
    try {
      const serializedAllergens = localStorage.getItem('allergens');
      if (serializedAllergens === null) {
        return [];
      }
      return JSON.parse(serializedAllergens);
    } catch (e) {
      console.warn('Error loading allergens from localStorage:', e);
      return []; // Return an empty array if an error occurs
    }
  });
  const [showAllergensDropdown, setShowAllergensDropdown] = useState(false);
  

  // Save savedRecipes to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  useEffect(() => {
    localStorage.setItem('allergens', JSON.stringify(allergensArray));
  }, [allergensArray]);

  

  const lastRowIndex = currentPage * itemsPerPage;
  const firstRowIndex = lastRowIndex - itemsPerPage;
  const currentRecipes = recipes.slice(firstRowIndex, lastRowIndex);
  const totalPages = Math.ceil(recipes.length / itemsPerPage);

  const getRecipes = async () => {
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
      const result = await response.json();
      const parsed = JSON.parse(result.express);
      const filtered = filterRecipes(parsed);
      setRecipes(filtered);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };


  const Landing = () => {
    const buttonContainerStyle = {
      display: 'flex',
      justifyContent: 'center',
      // add other styles as needed
    };
  
    return (
      <div style={buttonContainerStyle}>
        {/* content */}
      </div>
    );
  };

  const filterRecipes = (recipes) => {
    return recipes.filter(recipe => {
      const recipeIngredientsLower = recipe.RecipeIngredientParts.toLowerCase();
      const containsAllergen = allergensArray.some(allergen => 
        recipeIngredientsLower.includes(allergen.toLowerCase())
      );
      const ingredientsMatch = ingredientsArray.length === 0 || ingredientsArray.every(ingredient =>
        recipeIngredientsLower.includes(ingredient.toLowerCase())
      );
      const dietaryRestrictionsMatch = dietaryRestrictionsArray.length === 0 || dietaryRestrictionsArray.every(restriction =>
        recipe.Keywords.toLowerCase().includes(restriction.toLowerCase())
      );
      return ingredientsMatch && dietaryRestrictionsMatch && !containsAllergen;
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

  const handleSaveRecipe = recipe => {
    const isAlreadySaved = savedRecipes.some(
      savedRecipe => savedRecipe.RecipeId === recipe.RecipeId,
    );

  const handleSaveRecipe = (recipe) => {
    const isAlreadySaved = savedRecipes.some(savedRecipe => savedRecipe.RecipeId === recipe.RecipeId);
    if (!isAlreadySaved) {
      const newSavedRecipes = [...savedRecipes, recipe];
      setSavedRecipes(newSavedRecipes);
    }
  };

  const toggleAllergensDropdown = () => {
    setShowAllergensDropdown(prevState => !prevState); // Toggles the state
};

  // Add Allergen Function
  const addAllergen = () => {
    if (ingredientInput.trim() && !allergensArray.includes(ingredientInput)) {
      setAllergensArray(prev => [...prev, ingredientInput]);
      setIngredientInput('');
    }
  };
  
  const handleRemoveAllergen = (index) => {
    setAllergensArray(prevAllergens => prevAllergens.filter((_, i) => i !== index));
  };

  const handleRemoveRecipe = recipeId => {
    const updatedSavedRecipes = savedRecipes.filter(
      recipe => recipe.RecipeId !== recipeId,
    );
  
  const handleRemoveRecipe = (recipeId) => {
    const updatedSavedRecipes = savedRecipes.filter(recipe => recipe.RecipeId !== recipeId);
    setSavedRecipes(updatedSavedRecipes);
    localStorage.setItem('savedRecipes', JSON.stringify(updatedSavedRecipes));
  };

    // No need to manually save to localStorage here since useEffect will handle it
  };
  const handleToggleSavedRecipes = () => {
    setShowSavedRecipes(!showSavedRecipes);
  };

  const handleIngredientChange = e => {
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

  const saveAllergensToLocalStorage = (allergens) => {
    try {
      const serializedAllergens = JSON.stringify(allergens);
      localStorage.setItem('allergens', serializedAllergens);
    } catch (error) {
      console.error('Error saving allergens to localStorage', error);
    }
  };
  
  // Load from localStorage
  const loadAllergensFromLocalStorage = () => {
    try {
      const serializedAllergens = localStorage.getItem('allergens');
      return serializedAllergens ? JSON.parse(serializedAllergens) : [];
    } catch (error) {
      console.error('Error loading allergens from localStorage', error);
      return []; // Fallback to empty array in case of error
    }
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
          value={ingredientInput}
          onChange={handleIngredientChange}
        />
        <button onClick={addIngredient}>Add</button>
        <button onClick={clearIngredients}>Clear</button>
        <button onClick={() => addAllergen(ingredientInput)}>Add as Allergen</button>
      </div>
    
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

 {/* Allergens Button and Dropdown */}
<div className="allergens-section">
  <button className="allergens-dropdown-btn" onClick={toggleAllergensDropdown}>
    Allergens
  </button>
  {showAllergensDropdown && (
    <div className="allergens-dropdown-content">
      {allergensArray.map((allergen, index) => (
        <div key={index} className="allergen-item">
          {allergen}
          <button className="allergen-remove-btn" onClick={() => handleRemoveAllergen(index)}>
            &times;
          </button>
        </div>
      ))}
    </div>
  )}
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
        <button onClick={handleToggleSavedRecipes}>
          {showSavedRecipes ? 'Hide Saved' : 'Show Saved'} Recipes
        </button>
      </div>
      

      {showSavedRecipes && (
        <div>
          <h3>Saved Recipes:</h3>
          {savedRecipes.map((recipe, index) => (
            <div key={index}>
              {recipe.Name}
              <Link to={`/recipe/${recipe.RecipeId}`}>View</Link>
              <button onClick={() => handleRemoveRecipe(recipe.RecipeId)}>
                Remove
              </button>
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
};

  }
export default RecipeFinder;
