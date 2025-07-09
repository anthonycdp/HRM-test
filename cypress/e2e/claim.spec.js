import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import ClaimPage from '../pages/ClaimPage';

describe('Claim Module', () => {
  let userData;

  before(() => {
    cy.fixture('users').then((data) => {
      userData = data;
    });
  });

  beforeEach(() => {
    cy.handleNetworkErrors();
    cy.safeLogin(userData.admin.username, userData.admin.password);
    cy.safeNavigateTo('Claim');
    cy.waitForStableState();
    cy.get('body').then($body => {
      if ($body.find('.oxd-topbar-header-breadcrumb-module').length > 0) {
        cy.verifyPageTitle('Claim');
      }
    });
  });

  context('Submit Claim', () => {
    it('should navigate to submit claim page', () => {
      ClaimPage.navigateToSubmitClaimIfExists();
    });

    it('should display submit claim form', () => {
      ClaimPage.verifySubmitClaimForm();
    });

    it('should validate required fields when submitting empty form', () => {
      ClaimPage.validateRequiredFieldsOnEmptySubmit();
    });

    it('should display event dropdown functionality', () => {
      ClaimPage.verifyEventDropdownFunctionality();
    });

    it('should display cancel functionality', () => {
      ClaimPage.verifyCancelFunctionality();
    });
  });

  context('Assign Claim', () => {
    it('should display assign claim interface', () => {
      ClaimPage.verifyAssignClaimInterface();
    });

    it('should display form elements for assigning claims', () => {
      ClaimPage.verifyAssignClaimFormElements();
    });

    it('should validate employee selection requirement', () => {
      ClaimPage.validateEmployeeSelectionRequirement();
    });
  });

  context('My Claims', () => {
    it('should navigate to my claims page', () => {
      ClaimPage.navigateToMyClaimsIfExists();
    });

    it('should display claims table interface', () => {
      ClaimPage.verifyClaimsTableInterface();
    });

    it('should display search functionality', () => {
      ClaimPage.verifySearchFunctionality();
    });

    it('should display filter options', () => {
      ClaimPage.verifyFilterOptions();
    });

    it('should display reset functionality', () => {
      ClaimPage.verifyResetFunctionality();
    });
  });

  context('Employee Claims', () => {
    it('should navigate to employee claims page', () => {
      ClaimPage.navigateToEmployeeClaimsIfExists();
    });

    it('should display employee claims interface', () => {
      ClaimPage.verifyEmployeeClaimsInterface();
    });

    it('should display claim management options', () => {
      ClaimPage.verifyClaimManagementOptions();
    });
  });

  context('UI Validations', () => {
    it('should display navigation tabs', () => {
      ClaimPage.verifyNavigationTabs();
    });

    it('should display proper form elements', () => {
      ClaimPage.verifyFormElements();
    });

    it('should be responsive on tablet devices', () => {
      ClaimPage.verifyResponsiveDesign(768, 1024);
    });

    it('should maintain layout on mobile devices', () => {
      ClaimPage.verifyResponsiveDesign(375, 667);
    });

    it('should display consistent button styling', () => {
      ClaimPage.verifyButtonStyling();
    });
  });
});