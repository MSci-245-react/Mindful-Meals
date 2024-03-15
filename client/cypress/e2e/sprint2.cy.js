describe('Recipe App', () => {
  beforeEach(() => {
    // Assuming the recipe page is the root page
    cy.visit('/RecipeFinder');
  });
  it('checks if returned recipe links work', () => {
    cy.contains('Search Recipes').click();

    cy.get('tbody').should('be.visible');

    cy.get('tbody tr:first td a').first().click();

    cy.contains('Low-Fat Berry Blue Frozen Dessert');
  });
});
