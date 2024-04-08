import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './recipeFinder.css';
import {withFirebase} from '../Firebase';

const serverURL = '';

const RecipeFinder = ({firebase}) => {
  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [dietaryRestrictionsArray, setDietaryRestrictionsArray] = useState([]);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [userAllergiesString, setUserAllergiesString] = useState('');
  const [userAllergiesArray, setUserAllergiesArray] = useState([]);

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
    userAllergiesArray,
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
      const recipeDietaryRestrictionsLower = recipe.Keywords.toLowerCase();
      const dietaryRestrictionsMatch =
        !Array.isArray(dietaryRestrictionsArray) ||
        dietaryRestrictionsArray.length === 0 ||
        dietaryRestrictionsArray.every(restriction =>
          recipeDietaryRestrictionsLower.includes(restriction.toLowerCase()),
        );

      // Check for allergies
      const allergensMatch =
        !Array.isArray(userAllergiesArray) ||
        userAllergiesArray.length === 0 ||
        !userAllergiesArray.some(allergen =>
          recipeIngredientsLower.includes(allergen.toLowerCase()),
        );

      // Return true if all conditions pass
      return ingredientsMatch && dietaryRestrictionsMatch && allergensMatch;
    });
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = firebase.auth.currentUser;
        if (user) {
          const response = await fetch(`/api/getUserData`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: user.email}),
          });

          if (response.ok) {
            const userData = await response.json();
            setUserId(userData.id);
            setUserName(userData.userName);
            setUserAllergiesString(userData.allergies);
            console.log('User Data:', userData);
          } else {
            console.error('Failed to fetch user profile:', response.statusText);
          }
        } else {
          console.error('No user signed in.');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
      }
    };

    fetchUserProfile();
  }, []);

  const sendSavedRecipe = recipe => {
    callApiAddSavedRecipe(recipe)
      .then(res => {
        console.log('Recipe saved:', res);
      })
      .catch(err => {
        console.error('Error saving recipe:', err);
      });
  };

  const callApiAddSavedRecipe = async recipe => {
    const url = `${serverURL}/api/addSavedRecipe`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipeId: recipe.RecipeId,
        userId: userId,
        userName: userName,
        recipeName: recipe.Name,
      }),
    });
    const body = await response.json();
    if (!response.ok) throw Error(body.message || 'Failed to save recipe');
    return body;
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

  const allergyStringToArray = userAllergiesString => {
    const resultArray = userAllergiesString.split(',');
    const trimmedArray = resultArray.map(element => element.trim());
    setUserAllergiesArray(trimmedArray);
  };

  useEffect(() => {
    allergyStringToArray(userAllergiesString);
  }, [userAllergiesString]);

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
    <div className="container_recipe">
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
      <ul>
        {userAllergiesArray.map((allergen, index) => (
          <li key={index}>{allergen}</li>
        ))}
      </ul>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRecipes.map((recipe, index) => (
                <tr key={index}>
                  <td>
                    <Link to={`/recipe/${recipe.RecipeId}`}>{recipe.Name}</Link>
                  </td>
                  <td>
                    {recipe.RecipeIngredientParts.replace('c(', '')
                      .replace(')', '')
                      .replaceAll('"', '')}
                  </td>
                  <td>
                    {/* Add the Save Recipe button */}
                    <button onClick={() => sendSavedRecipe(recipe)}>
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
export default withFirebase(RecipeFinder);
