describe('Recipe App', () => {
  beforeEach(() => {
    // Assuming the recipe page is the root page
    cy.visit('/');
  });
  it('displays the homepage title', () => {
    cy.contains('Mindful Meals');
  });
});
