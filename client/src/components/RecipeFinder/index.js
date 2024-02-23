import React, {useState} from 'react';
import './recipeFinder.css';

const serverURL = ' ';

const RecipeFinder = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = React.useState([]);

  const getRecipes = () => {
    callApiGetRecipes().then(res => {
      console.log('callApiFindRecipes returned: ', res);
      var parsed = JSON.parse(res.express);
      console.log('callApiFindRecipes parsed: ', parsed);
      setRecipes(parsed);
    });
  };

  const callApiGetRecipes = async () => {
    const url = serverURL + '/api/getRecipes';
    console.log(url);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log('User settings: ', body);
    return body;
  };

  const handleIngredientChange = e => {
    setIngredients(e.target.value);
  };

  return (
    <div className="container">
      <div className="heading-text">Search for Recipes</div>
      <div className="ingredient-input">
        <input
          type="text"
          id="text-input"
          placeholder="Enter Ingredients"
          value={ingredients}
          onChange={handleIngredientChange}
        />
        <button onClick={getRecipes}>Search</button>
      </div>
      {recipes.length > 0 && (
        <div>
          {recipes.map((recipe, index) => (
            <div key={index}>
              <p>{recipe.Name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeFinder;
