import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import LeavePage from '../pages/LeavePage';

describe('Leave Module - Refactored with POM', () => {
  let userData;

  before(() => {
    cy.fixture('users').then((data) => {
      userData = data;
    });
  });

  beforeEach(() => {
    cy.login(userData.admin.username, userData.admin.password);
    DashboardPage.navigateTo('leave');
    LeavePage.verifyPageTitle('Leave');
  });

  context('Apply Leave', () => {
    it('should navigate to apply leave page', () => {
      LeavePage.clickApplyLeaveIfExists();
      cy.url().should('include', '/leave');
    });

    it('should display leave form elements', () => {
      LeavePage.clickApplyLeaveIfExists();
      LeavePage.verifyApplyLeaveFormElements();
    });

    it('should show leave type dropdown options', () => {
      LeavePage.clickApplyLeaveIfExists();
      LeavePage.verifyLeaveTypeDropdownVisible();
    });

    it('should validate required fields', () => {
      LeavePage.clickApplyLeaveIfExists();
      LeavePage.verifyAndClickSubmitApply();
    });

    it('should have cancel functionality', () => {
      LeavePage.clickApplyLeaveIfExists();
      LeavePage.verifyCancelButtonExists();
    });
  });

  context('My Leave', () => {
    it('should navigate to my leave page', () => {
      LeavePage.clickMyLeaveIfExists();
      cy.url().should('include', '/leave');
    });

    it('should display leave table when available', () => {
      LeavePage.clickMyLeaveIfExists();
      LeavePage.verifyLeaveTableExists();
    });

    it('should display search filters', () => {
      LeavePage.clickMyLeaveIfExists();
      LeavePage.verifySearchFiltersExist();
    });
  });

  context('Leave List', () => {
    it('should display leave list table', () => {
      LeavePage.verifyLeaveTableExists();
    });

    it('should display search functionality', () => {
      LeavePage.verifySearchFunctionality();
    });

    it('should handle search with date range', () => {
      LeavePage.searchWithDateRange('2025-01-01', '2025-12-31');
    });

    it('should display reset functionality', () => {
      LeavePage.verifyResetButtonExists();
    });
  });

  context('Leave Navigation', () => {
    it('should display navigation elements', () => {
      LeavePage.verifyNavigationElementsExist();
    });

    it('should have assign leave option', () => {
      LeavePage.verifyAssignLeaveButton();
    });

    it('should have entitlements dropdown', () => {
      LeavePage.verifyEntitlementsDropdown();
    });

    it('should have reports dropdown', () => {
      LeavePage.verifyReportsDropdown();
    });
  });

  context('UI Validations', () => {
    it('should display correct page title', () => {
      LeavePage.verifyPageTitle('Leave');
    });

    it('should display table headers when table exists', () => {
      LeavePage.verifyTableHeadersExist();
    });

    it('should display consistent button styling', () => {
      LeavePage.verifyButtonStyling();
    });

    it('should be responsive on mobile view', () => {
      LeavePage.verifyResponsiveDesign(375, 667);
    });

    it('should be responsive on tablet view', () => {
      LeavePage.verifyResponsiveDesign(768, 1024);
    });
  });
});