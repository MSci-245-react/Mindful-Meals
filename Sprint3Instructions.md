## Sprint-3 Progress

During this sprint our team primarily worked on features looking to incorporate firebase authentication and current user. For example, implementing a review feature that saves the current user who submitted a review, or accessing the current recipes allergies and saved recipes and having them displayed on their individual profile page. In addition, we added additional functional features that will overall boost the functionality of our website.

## Functionalities

### SignIn/SignOut/SignUp

This functionality does exactly the title, it allows users to signin and signout of our website. The functionality was modified this sprint to force users to signIn or create an account before being able to access the rest of the website.

To test the SignIn function use email: "test@test.ca" and password: "testing". To test the SignUp functionality you can make whatever account you'd like and then can test the function by logging in using the account. Finally to tese the SignOut function, once in the website you can click the signout tab and click logout.

### Profile Page

This functionality showcases the users profile which will be catered to each individual user. On the profile page users can save their dietary restrictions, allergies, and view their saved recipes.

### Nutritional Information

This function allows the users to filter through ingredients by typing the ingredient out in the search bar in real time. In addition, it allows users to add various ingredients to their "grocery cart"

To test this functionality, we simulate user input by typing in “Butter” into the search field, imitating a user’s search action to verify the component's response capability. It also checks if the search input field is rendered.

### Grocery Cart

This function serves as a grocery list for the user. It was initially supposed to contain pricing for each ingrdedient however, given the time constraint we were unable to find a grocery API and map the price of each ingredient to the name. However, it can still serve as a grocery list for the user.

To test this feature navigate to the Nutritional Information page. Click on the Add to Cart button for any of the ingredients. To check if the cart has been updated click on the grocery cart button at the top of the page. There it should update as ingredients are added and removed.

### Recipe Finder

This function has had additional filters added to the list. On the backend the recipe function filters out recipes the user is allergic to which were taken from the backend. Additionally, the user can also create a list of ingredients they don't want to eat/have and filter out recipes that include those recipes.

To test the allergy filter, ensure no allergies are selected. Then, click search recipes, you will see a tofu dish containing soy. Navigate back to the profile page and click soy and save the allergy. Navigate back to the recipe finder and click search recipes again. The tofu dish is then filtered out due to the allergy.

To test the recipe finder filtering out ingredients the user doesn't want, click the search recipes button when the list of ingredients to filter out is empty. Then type in onion and click the do not add button. You should see onion appear in the list of ingredients to not add by clicking the button. Click search recipes again and the recipes with onions should be filtered out.

### Saved Recipes

This functionality allows users to save recipes they are interested in to their profile page.

To test this functionality, navigate to the Recipe Finder page. Click search recipes to display the table of recipes. Click the save recipe button for any of the recipes. If you then navigate back to the profile page and click "show displayed recipes" the recipe that you saved should appear with a link to that recipe's page.

### Review

This functionality allows users to leave reviews on various recipes. The functionality is tied in with firebase to get the credentials of the current user.

To test this feature, navigate first to the recipe page and click search recipes. Click the link to any of the recipes and on that recipes page there is a review portion that shows reviews of the recipe and an input box for the recipes. Type in any review you want and click submit review. Navigate out of the page and back in our reload the page (you may need to sign back in). On the review section of that recipe your review should be displayed along with your username.

### Featured Recipes

This is a simple aesthetic feature that displays featured recipes.
