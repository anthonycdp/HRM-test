class LoginPage {
  get usernameInput() { return cy.get('[name="username"]'); }
  get passwordInput() { return cy.get('[name="password"]'); }
  get loginButton() { return cy.get('[type="submit"]'); }
  get forgotPasswordLink() { return cy.get('.oxd-text--p').contains('Forgot your password?'); }
  get loginErrorMessage() { return cy.get('.oxd-alert-content-text'); }
  get usernameErrorMessage() { return cy.get('[name="username"]').parent().find('.oxd-text--span'); }
  get passwordErrorMessage() { return cy.get('[name="password"]').parent().find('.oxd-text--span'); }
  get loginForm() { return cy.get('.oxd-form'); }
  get loginCard() { return cy.get('.oxd-sheet'); }
  get orangeHrmLogo() { return cy.get('.orangehrm-login-logo img'); }
  get loginPageTitle() { return cy.get('.oxd-text--h5'); }
  get credentialsSection() { return cy.get('.oxd-sheet').contains('Username'); }

  visit() {
    cy.visit('/web/index.php/auth/login');
    cy.waitForPageLoad();

  }

  enterUsername(username) {
    this.usernameInput.clear().type(username);

  }

  enterPassword(password) {
    this.passwordInput.clear().type(password);

  }

  clickLogin() {
    this.loginButton.click();

  }

  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLogin();

  }

  clickForgotPassword() {
    this.forgotPasswordLink.click();

  }

  verifyLoginPageElements() {
    cy.get('[name="username"]', { timeout: 10000 }).should('be.visible');
    cy.get('[name="password"]', { timeout: 10000 }).should('be.visible');
    cy.get('[type="submit"]', { timeout: 10000 }).should('be.visible');

  }

  verifyLoginError(expectedMessage) {
    cy.get('body').then(($body) => {
      if ($body.find('.oxd-alert-content-text').length > 0) {
        cy.get('.oxd-alert-content-text').should('be.visible');
      } else {
        cy.get('body').should('contain.text', 'Invalid credentials');
      }
    });

  }

  verifyFieldValidationErrors() {
    cy.get('.oxd-input-group').should('have.length.greaterThan', 0);
    cy.get('.oxd-text--span').contains('Required').should('be.visible');

  }

  verifyPageTitle() {
    this.loginPageTitle.should('contain.text', 'Login');

  }

  verifyCredentialsSection() {
    this.credentialsSection.should('be.visible');

  }

  clearForm() {
    this.usernameInput.clear();
    this.passwordInput.clear();

  }
}

export default LoginPage;