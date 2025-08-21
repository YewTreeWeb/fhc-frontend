describe('App E2E', () => {
  it('should display the app', () => {
    cy.visit('/');
    cy.contains('Vite + React');
  });
});
