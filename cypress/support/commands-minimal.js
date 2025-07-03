Cypress.Commands.add('login', (username, password) => {
  cy.get('[name="username"]').clear().type(username);
  cy.get('[name="password"]').clear().type(password);
  cy.get('[type="submit"]').click();
});

Cypress.Commands.add('loginWithFixture', userType => {
  cy.fixture('users').then(users => {
    const user = users[userType];
    cy.login(user.username, user.password);
  });
});

Cypress.Commands.add('navigateToMenu', menuItem => {
  cy.get('.oxd-main-menu-item').contains(menuItem).click();
});

Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('.oxd-layout-container').should('be.visible');
});

Cypress.Commands.add('verifyToastMessage', message => {
  cy.get('.oxd-toast-content').should('be.visible').and('contain.text', message);
});

Cypress.Commands.add('verifyPageTitle', expectedTitle => {
  cy.get('.oxd-topbar-header-breadcrumb h6').should('contain.text', expectedTitle);
});