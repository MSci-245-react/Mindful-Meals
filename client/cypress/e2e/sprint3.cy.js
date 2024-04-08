describe('Recipe App', () => {
  beforeEach(() => {
    // Assuming the recipe page is the root page
    cy.visit('/SignIn');
  });
  it('checks if sign in works then checks if returned recipe links work then checks if review function works', () => {
    cy.get('input[placeholder = "Email"]')
      .should('be.visible')
      .type('test@test.ca');

    cy.get('input[placeholder = "Password"]')
      .should('be.visible')
      .type('testing');

    cy.contains('Sign In').click();

    cy.wait(5000);

    cy.contains('Recipe Finder').click();

    cy.wait(5000);

    cy.contains('Search Recipes').click();

    cy.get('tbody').should('be.visible');

    cy.get('tbody tr:first td a').first().click();

    cy.contains('Low-Fat Berry Blue Frozen Dessert');

    cy.get('input[placeholder="Enter Review Title"]').should('be.visible');

    cy.get('input[placeholder="Enter Review Title"]')
      .type('Review Title')
      .should('have.value', 'Review Title');

    cy.get('input[placeholder="Enter Review Body"]').should('be.visible');

    cy.get('input[placeholder="Enter Review Body"]')
      .type('Review Body')
      .should('have.value', 'Review Body');

    cy.contains('Submit Review').click();

    cy.get('input[placeholder="Enter Review Title"]').should('have.value', '');

    cy.get('input[placeholder="Enter Review Body"]').should('have.value', '');
  });
});
