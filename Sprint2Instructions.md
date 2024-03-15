## Sprint-2 Progress

During this sprint our team worked on improving the functionalities of existing features while also adding additional features all with the goal of improving user experience and usability.

## Functionalities

### Recipe Finder

This function which serves to allow the user to search for different recipes with ingredient and dietary constraints was improved in two major ways. The resulting recipes now display the first four rows rather than all at once to improve the user interface. Secondly, each recipe can now also be clicked to view additional details including specific ingredient requirements and recipe instructions.

To test, you can use the same test as sprint1 and click whichever recipe to view additional details.

### Nutritional Information - Search Filter

This function allows the users to filter through ingredients by typing the ingredient out in the search bar in real time.

To test this functionality, we simulate user input by typing in “Butter” into the search field, imitating a user’s search action to verify the component's response capability. It also checks if the search input field is rendered.

### Saved Recipes

In the Recipe Finder page, each recipe has a save recipe button to save a particular recipe. There is an additional functionality that allows the user to access all their saved recipes.

To test this functionality, we save a recipe from the filtered list and then check if that recipe shows up after the saved recipes button is clicked

### Profile Page

This function occurs after the user successfully signs into their account. Once the user signs in, they get access to their personal information such as email and password. They are able to modify their biography and add dietary restrictions to their profile. This information is then stored into the database so that it is personalized every time they login and the system generates recipes according to their needs. The user can also delete their account which removes the user from the backend.
