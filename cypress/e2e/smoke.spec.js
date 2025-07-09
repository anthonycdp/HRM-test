import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';

describe('Smoke Test - Refactored with POM', () => {
  it('should load the login page successfully', () => {
    LoginPage.visit();
    LoginPage.verifyLoginPageIsDisplayed();
  });

  it('should login with valid credentials', () => {
    cy.login('Admin', 'admin123');
    cy.url().should('include', '/dashboard/index');
    DashboardPage.verifyPageTitle('Dashboard');
  });
});