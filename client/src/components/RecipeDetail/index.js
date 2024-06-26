import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import ReviewRating from './reivewRating';
import './recipeDetail.css';
import {withFirebase} from '../Firebase';

const serverURL = '';

const RecipeDetail = ({firebase}) => {
  let {RecipeId} = useParams();
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [reviewTitle, setreviewTitle] = useState('');
  const [reviewBody, setreviewBody] = useState('');
  const [rating, setRating] = useState('');
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [reviews, setReviews] = useState([]);

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
        findRecipe(parsed, RecipeId);
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

  const sendReview = () => {
    callApiAddReview().then(res => {
      console.log('sending review');
    });
  };

  const callApiAddReview = async () => {
    const url = `${serverURL}/api/addReview`;
    console.log(url);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipeId: RecipeId,
        userId: userId,
        userName: userName,
        reviewTitle: reviewTitle,
        reviewBody: reviewBody,
        rating: rating,
      }),
    });
    const body = await response.json();
    console.log(body);
    if (response.status !== 200) throw Error(body.message);
    console.log('Review added successfully: ', body);
    return body;
  };

  useEffect(() => {
    const callApiGetReviews = async () => {
      const url = `${serverURL}/api/getReviews`;
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
        findReview(parsed, RecipeId);
      } catch (error) {
        console.error('Fetching error:', error);
      }
    };

    const findReview = (reviews, recipeId) => {
      const id = Number(recipeId);
      const foundReviews = reviews.filter(review => review.recipeId === id);
      setReviews(foundReviews);
    };

    callApiGetReviews();
  }, [RecipeId]);

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

  const handleReviewTitleChange = e => {
    setreviewTitle(e.target.value);
  };

  const handleReviewBodyChange = e => {
    setreviewBody(e.target.value);
  };

  const handleRatingChange = e => {
    setRating(e.target.value);
  };

  const handleSubmit = e => {
    sendReview();
    setreviewTitle('');
    setreviewBody('');
  };

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
            <div className="review">
              <h3 className="headings">Write a Review</h3>
              <input
                type="text"
                id="text-input"
                className="review-title"
                placeholder="Enter Review Title"
                value={reviewTitle}
                onChange={handleReviewTitleChange}
              />
              <input
                type="text"
                id="text-input"
                placeholder="Enter Review Body"
                className="review-body"
                value={reviewBody}
                onChange={handleReviewBodyChange}
              />
              <ReviewRating onChange={handleRatingChange} rating={rating} />
              <button className="submit-button" onClick={handleSubmit}>
                Submit Review
              </button>{' '}
            </div>
            <div>
              <h3 className="headings">Reviews</h3>
              {reviews.map((review, index) => (
                <article key={index} className="review-box">
                  <h4>{review.reviewTitle}</h4>
                  <p>{review.reviewBody}</p>
                  <p>
                    Rating: <span>{review.rating}/5</span>
                  </p>
                  <p>
                    Author: <span>{review.userName}</span>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p>Loading recipe details...</p>
      )}
    </div>
  );
};

export default withFirebase(RecipeDetail);
