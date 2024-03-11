import React, {useState} from 'react';
import './recipeFinder.css';

const serverURL = ' ';

const RecipeFinder = () => {
  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [dietaryRestrictionsArray, setDietaryRestrictionsArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const lastRowIndex = currentPage * itemsPerPage;
  const firstRowIndex = lastRowIndex - itemsPerPage;
  const currentRecipes = recipes.slice(firstRowIndex, lastRowIndex);
  const totalPages = Math.ceil(recipes.length / itemsPerPage);

  const getRecipes = () => {
    callApiGetRecipes().then(res => {
      console.log('callApiFindRecipes returned: ', res);
      const parsed = JSON.parse(res.express);
      console.log('callApiFindRecipes parsed: ', parsed);
      // filter the parsed recipes based on all ingredients
      const filtered = filterRecipes(
        parsed,
        ingredientsArray,
        dietaryRestrictionsArray,
      );
      setRecipes(filtered);
    });
  };

  const callApiGetRecipes = async () => {
    const url = `${serverURL}/api/getRecipes`;
    console.log(url);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw Error(`HTTP error! status: ${response.status}`);
    const body = await response.json();
    console.log('User settings: ', body);
    return body;
  };

  const filterRecipes = (
    recipes,
    ingredientsArray,
    dietaryRestrictionsArray,
  ) => {
    return recipes.filter(recipe => {
      // Check for ingredients
      const recipeIngredientsLower = recipe.RecipeIngredientParts.toLowerCase();
      const ingredientsMatch =
        !Array.isArray(ingredientsArray) ||
        ingredientsArray.length === 0 ||
        ingredientsArray.every(ingredient =>
          recipeIngredientsLower.includes(ingredient.toLowerCase()),
        );

      // Check for dietary restrictions
      const recipeDietaryRestrictionsLower = recipe.KeyWords.toLowerCase();
      const dietaryRestrictionsMatch =
        !Array.isArray(dietaryRestrictionsArray) ||
        dietaryRestrictionsArray.length === 0 ||
        dietaryRestrictionsArray.every(restriction =>
          recipeDietaryRestrictionsLower.includes(restriction.toLowerCase()),
        );

      // Return true if both checks pass
      return ingredientsMatch && dietaryRestrictionsMatch;
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

  // Corrected the function name based on the provided context
  const handleIngredientChange = e => {
    setIngredientInput(e.target.value);
  };

  // Function to add the ingredientInput to the ingredients array
  const addIngredient = () => {
    if (ingredientInput.trim()) {
      setIngredientsArray(prevIngredients => [
        ...prevIngredients,
        ingredientInput.trim(),
      ]);
      setIngredientInput(''); // Clear the input after adding
    }
  };

  const clearSearch = () => {
    setRecipes([]);
  };

  const clearIngredients = () => {
    setIngredientsArray([]);
    setIngredientInput('');
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
      </div>
      {recipes.length > 0 && (
        <>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Ingredients</th>
              </tr>
            </thead>
            <tbody>
              {currentRecipes.map((recipe, index) => (
                <tr key={index}>
                  <td>{recipe.Name}</td>
                  <td>
                    {recipe.RecipeIngredientParts.replace('c(', '')
                      .replace(')', '')
                      .replaceAll('"', '')}
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

export default RecipeFinder;
