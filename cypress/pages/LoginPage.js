class LoginPage {
  constructor() {
    this.url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
    this.elements = {
      usernameInput: () => cy.get('input[name="username"]'),
      passwordInput: () => cy.get('input[name="password"]'),
      loginButton: () => cy.get('button[type="submit"]'),
      errorMessage: () => cy.get('.oxd-alert-content'),
      forgotPasswordLink: () => cy.get('.orangehrm-login-forgot-header'),
      logo: () => cy.get('.orangehrm-login-branding img'),
      loginTitle: () => cy.get('.orangehrm-login-title')
    };
  }

  visit() {
    cy.visit(this.url);
  }

  fillUsername(username) {
    this.elements.usernameInput().clear().type(username);
  }

  fillPassword(password) {
    this.elements.passwordInput().clear().type(password);
  }

  clickLogin() {
    this.elements.loginButton().click();
  }

  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.clickLogin();
  }

  verifyErrorMessage(message) {
    this.elements.errorMessage().should('be.visible').and('contain', message);
  }

  verifyLoginPageIsDisplayed() {
    this.elements.loginTitle().should('be.visible');
    this.elements.usernameInput().should('be.visible');
    this.elements.passwordInput().should('be.visible');
    this.elements.loginButton().should('be.visible');
  }

  verifyForgotPasswordPage() {
    cy.get('.orangehrm-forgot-password-title').should('be.visible');
  }

  clickForgotPasswordLink() {
    this.elements.forgotPasswordLink().click();
  }

  verifyLogoVisible() {
    this.elements.logo().should('be.visible');
  }

  verifyForgotPasswordLinkVisible() {
    this.elements.forgotPasswordLink().should('be.visible');
  }

  verifyPasswordFieldType() {
    this.elements.passwordInput().should('have.attr', 'type', 'password');
  }

  verifyFieldsAreClear() {
    this.elements.usernameInput().should('have.value', '');
    this.elements.passwordInput().should('have.value', '');
  }

  verifyUsernameValue(expectedValue) {
    this.elements.usernameInput().should('have.value', expectedValue);
  }

  verifyPasswordValue(expectedValue) {
    this.elements.passwordInput().should('have.value', expectedValue);
  }

  focusUsernameField() {
    this.elements.usernameInput().focus().should('have.focus');
  }

  focusPasswordField() {
    this.elements.passwordInput().focus().should('have.focus');
  }

  focusLoginButton() {
    this.elements.loginButton().focus().should('have.focus');
  }

  visitDashboardDirectly() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
  }
}

export default new LoginPage();