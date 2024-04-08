import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FeaturedRecipes.css';

const FeaturedRecipes = () => {
 
  const [featuredRecipes, setFeaturedRecipes] = useState([
    
    {
      id: 1,
      name: 'Low-Fat Berry Blue Frozen Dessert',
      image: 'https://img.sndimg.com/food/image/upload/q_92,fl_progressive,w_1200,c_scale/v1/img/recipes/38/YUeirxMLQaeE1h3v3qnM_229%20berry%20blue%20frzn%20dess.jpg', 
      description: 'A delicious dessert with fresh berries and yogurt.'
    }, 
    {
        id: 2,
        name: 'Butter Pecan Cookies',
        image: 'https://sugarspunrun.com/wp-content/uploads/2023/07/butter-pecan-cookies-3-of-6.jpg', 
        description: 'Make and share this Butter Pecan Cookies recipe from Food.com.'
      }, 
      {
        id: 3,
        name: 'Bourbon Pecan Pound Cake',
        image: 'https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/14/71/70/jvLvhaeT6GtFnOA7OjPQ-bourbon-pecan-pound-cake.jpg', 
        description: 'Make and share this Bourbon Pecan Pound Cake recipe from Food.com.'
      }, 
      {
        id: 4,
        name: 'Brazilian Empadinhas',
        image: 'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/82/82.jpg', 
        description: 'The empanadas in Brazil are different from those in other  Latin american countries and are called empadas or empadinhas. They look more like mini pies.'
      }, 
      {
        id: 5,
        name: 'Yorkshire Pudding',
        image: 'https://www.thekitchenmagpie.com/wp-content/uploads/images/2019/11/Yorkshirepudding1.jpg', 
        description: 'You have not lived until you have experienced the mouth watering taste of these yorkshire puddings.  Warning! They must be flooded with gravy!'
      }, 
      {
        id: 6, 
        name: 'Tofu-Vegetable Kebabs',
        image: 'https://thebusybaker.ca/wp-content/uploads/2020/07/marinated-tofu-veggie-skewers-fb-ig-4-scaled.jpg', 
        description: 'This dish is best prepared a day in advance to allow the ingredients to soak in  the marinade overnight.'
      }, 
      {
        id: 7, 
        name: 'Black Bean, Corn, and Tomato Salad',
        image: 'https://www.wellplated.com/wp-content/uploads/2020/06/Black-Bean-Corn-Tomato-Salad.jpg', 
        description: 'This is easy, delicious, colorful, delicious, uses currently-in-season fresh corn and tomatoes, and, oh yes, is really good. The salad tastes even better the second day!'
      }, 
      {
        id: 8, 
        name: 'Chanfana Ou Lampantana',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR088661xI7hw0A6aB8yoM07Woc7MRLvMOoIMtDoOF31w&s', 
        description: 'This dish was typical of the Beira provinces in Mozambique where it was served at large gatherings.  This dish is best prepared a day in advance and reheated.'
      }, 
    // ... other recipes
  ]);
  
  
  return (
    <div className="featured-recipes-container">
      <h1>Featured Recipes</h1>
      <div className="recipes-list">
        {featuredRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.name} className="recipe-image" />
            <h3>{recipe.name}</h3>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedRecipes;
