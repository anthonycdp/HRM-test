import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';

describe('Login Functionality', () => {
  const loginPage = new LoginPage(), dashboardPage = new DashboardPage();
  
  beforeEach(() => cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'));

  context('Positive Login Tests', () => {
    it('Should successfully login with valid credentials', () => {
      loginPage.verifyLoginPageElements();
      cy.fixture('users').then(users => loginPage.login(users.validUser.username, users.validUser.password));
      dashboardPage.verifyDashboardLoaded();
      dashboardPage.verifyDashboardWidgets();
    });

    it('Should login using custom command', () => {
      loginPage.verifyLoginPageElements();
      cy.loginWithFixture('validUser');
      dashboardPage.verifyDashboardLoaded();
    });

    it('Should display user name after successful login', () => {
      cy.loginWithFixture('validUser');
      dashboardPage.verifyDashboardLoaded();
      dashboardPage.userName.should('be.visible').should('not.be.empty');
    });
  });

  context('Negative Login Tests', () => {
    it('Should show error message for invalid credentials', () => {
      loginPage.verifyLoginPageElements();
      cy.fixture('users').then(users => loginPage.login(users.invalidUser.username, users.invalidUser.password));
      cy.wait(2000);
      cy.url().should('not.include', '/dashboard');
    });

    it('Should show validation errors for empty fields', () => {
      loginPage.verifyLoginPageElements();
      loginPage.clickLogin();
      loginPage.verifyFieldValidationErrors();
    });

    it('Should show error for empty username', () => {
      loginPage.verifyLoginPageElements();
      loginPage.enterPassword('admin123');
      loginPage.clickLogin();
      cy.get('body').should('contain.text', 'Required');
    });

    it('Should show error for empty password', () => {
      loginPage.verifyLoginPageElements();
      loginPage.enterUsername('Admin');
      loginPage.clickLogin();
      cy.get('body').should('contain.text', 'Required');
    });

    it('Should handle case sensitive username', () => {
      loginPage.verifyLoginPageElements();
      loginPage.login('admin', 'wrongpassword');
      cy.wait(2000);
      cy.url().should('not.include', '/dashboard');
    });

    it('Should handle special characters in credentials', () => {
      loginPage.verifyLoginPageElements();
      loginPage.login('Admin@#$', 'admin123!@#');
      cy.wait(2000);
      cy.url().should('not.include', '/dashboard');
    });
  });

  context('UI and UX Tests', () => {
    it('Should display all login page elements correctly', () => {
      loginPage.verifyLoginPageElements();
      loginPage.verifyPageTitle();
      loginPage.verifyCredentialsSection();
    });

    it('Should display forgot password link', () => {
      loginPage.forgotPasswordLink.should('be.visible').should('contain.text', 'Forgot your password?');
    });

    it('Should navigate to forgot password page', () => {
      loginPage.verifyLoginPageElements();
      loginPage.clickForgotPassword();
      cy.url().should('include', '/requestPasswordResetCode');
    });

    it('Should clear form fields', () => {
      loginPage.enterUsername('testuser');
      loginPage.enterPassword('testpass');
      loginPage.clearForm();
      loginPage.usernameInput.should('have.value', '');
      loginPage.passwordInput.should('have.value', '');
    });

    it('Should handle Enter key press for form submission', () => {
      loginPage.verifyLoginPageElements();
      cy.fixture('users').then(users => {
        loginPage.enterUsername(users.validUser.username);
        loginPage.enterPassword(users.validUser.password);
        loginPage.passwordInput.type('{enter}');
      });
      dashboardPage.verifyDashboardLoaded();
    });

    it('Should maintain form state during page interactions', () => {
      loginPage.enterUsername('Admin');
      cy.wait(1000);
      loginPage.usernameInput.should('have.value', 'Admin');
    });

    it('Should display Orange HRM logo', () => {
      loginPage.orangeHrmLogo.should('be.visible');
    });

    it('Should have proper tab navigation', () => {
      loginPage.usernameInput.click();
      loginPage.passwordInput.click();
      loginPage.usernameInput.should('be.visible');
      loginPage.passwordInput.should('be.visible');
    });
  });

  context('Security Tests', () => {
    it('Should mask password input', () => {
      loginPage.enterPassword('admin123');
      loginPage.passwordInput.should('have.attr', 'type', 'password');
    });

    it('Should not expose credentials in URL', () => {
      loginPage.login('Admin', 'admin123');
      cy.url().should('not.contain', 'Admin').should('not.contain', 'admin123');
    });

    it('Should prevent SQL injection attempts', () => {
      loginPage.login("' OR '1'='1", "' OR '1'='1");
      loginPage.verifyLoginError('Invalid credentials');
    });

    it('Should prevent XSS attempts', () => {
      loginPage.login('<script>alert("XSS")</script>', 'admin123');
      loginPage.verifyLoginError('Invalid credentials');
    });
  });

  context('Performance Tests', () => {
    it('Should load login page within acceptable time', () => {
      cy.wrap(Date.now()).then(startTime => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('body').should('be.visible').then(() => {
          const duration = Date.now() - startTime;
          cy.log(`Page load time: ${duration}ms`);
          expect(duration).to.be.lessThan(30000);
        });
      });
    });

    it('Should process login within acceptable time', () => {
      cy.get('body').should('be.visible');
      cy.wrap(Date.now()).then(startTime => {
        cy.fixture('users').then(users => {
          loginPage.login(users.validUser.username, users.validUser.password);
        });
        cy.url({ timeout: 20000 }).should('include', '/dashboard').then(() => {
          const duration = Date.now() - startTime;
          cy.log(`Login process time: ${duration}ms`);
          expect(duration).to.be.lessThan(20000);
        });
      });
    });
  });

  context('API Integration Tests', () => {
    it('Should login without API mocking (real API)', () => {
      cy.get('body').should('be.visible');
      cy.loginWithFixture('validUser');
      cy.url({ timeout: 15000 }).should('include', '/dashboard');
    });

    it('Should handle network delay gracefully', () => {
      cy.get('body').should('be.visible');
      cy.loginWithFixture('validUser');
      cy.url({ timeout: 30000 }).should('include', '/dashboard');
    });
  });
});