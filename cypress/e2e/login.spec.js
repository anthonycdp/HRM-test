import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';

describe('Login Functionality - Refactored with POM', () => {
  let userData;

  before(() => {
    cy.fixture('users').then((data) => {
      userData = data;
    });
  });

  beforeEach(() => {
    LoginPage.visit();
  });

  context('Positive Tests', () => {
    it('should login successfully with valid credentials', () => {
      LoginPage.login(userData.admin.username, userData.admin.password);
      DashboardPage.verifyDashboardIsDisplayed();
      cy.verifyUrl('/dashboard/index');
    });

    it('should display all login page elements', () => {
      LoginPage.verifyLoginPageIsDisplayed();
      LoginPage.verifyLogoVisible();
      LoginPage.verifyForgotPasswordLinkVisible();
    });

    it('should redirect to dashboard after successful login', () => {
      LoginPage.login(userData.admin.username, userData.admin.password);
      DashboardPage.verifyPageTitle('Dashboard');
      DashboardPage.verifyAllWidgetsAreDisplayed();
    });
  });

  context('Negative Tests', () => {
    it('should show error message with invalid username', () => {
      LoginPage.login(userData.invalidUser.username, userData.admin.password);
      LoginPage.verifyErrorMessage('Invalid credentials');
    });

    it('should show error message with invalid password', () => {
      LoginPage.login(userData.admin.username, userData.invalidUser.password);
      LoginPage.verifyErrorMessage('Invalid credentials');
    });

    it('should show error message with empty username', () => {
      LoginPage.fillPassword(userData.admin.password);
      LoginPage.clickLogin();
      cy.verifyRequiredFieldError('input[name="username"]');
    });

    it('should show error message with empty password', () => {
      LoginPage.fillUsername(userData.admin.username);
      LoginPage.clickLogin();
      cy.verifyRequiredFieldError('input[name="password"]');
    });

    it('should show error message with both fields empty', () => {
      LoginPage.clickLogin();
      cy.verifyRequiredFieldError('input[name="username"]');
      cy.verifyRequiredFieldError('input[name="password"]');
    });
  });

  context('UI Tests', () => {
    it('should allow typing in username field', () => {
      const testUsername = 'TestUser123';
      LoginPage.fillUsername(testUsername);
      LoginPage.verifyUsernameValue(testUsername);
    });

    it('should mask password field', () => {
      LoginPage.verifyPasswordFieldType();
    });

    it('should clear fields when refreshing page', () => {
      LoginPage.fillUsername('TestUser');
      LoginPage.fillPassword('TestPass');
      cy.reload();
      LoginPage.verifyFieldsAreClear();
    });

    it('should allow focus on form elements', () => {
      LoginPage.focusUsernameField();
      LoginPage.focusPasswordField();
      LoginPage.focusLoginButton();
    });
  });

  context('Forgot Password Link', () => {
    it('should navigate to forgot password page when clicked', () => {
      LoginPage.clickForgotPasswordLink();
      cy.verifyUrl('/auth/requestPasswordResetCode');
      LoginPage.verifyForgotPasswordPage();
    });
  });

  context('Session Management', () => {
    it('should logout successfully', () => {
      LoginPage.login(userData.admin.username, userData.admin.password);
      DashboardPage.logout();
      LoginPage.verifyLoginPageIsDisplayed();
    });

    it('should not access dashboard without login', () => {
      LoginPage.visitDashboardDirectly();
      cy.verifyUrl('/auth/login');
      LoginPage.verifyLoginPageIsDisplayed();
    });
  });
});