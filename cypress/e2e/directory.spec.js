import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import DirectoryPage from '../pages/DirectoryPage';

describe('Directory Module', () => {
  let userData;

  before(() => {
    cy.fixture('users').then((data) => {
      userData = data;
    });
  });

  beforeEach(() => {
    cy.handleNetworkErrors();
    cy.safeLogin(userData.admin.username, userData.admin.password);
    cy.safeNavigateTo('Directory');
    cy.waitForStableState();
    cy.verifyPageTitle('Directory');
  });

  context('Employee Search', () => {
    it('should display employee cards interface', () => {
      DirectoryPage.verifyEmployeeCardsInterface();
    });

    it('should display search functionality', () => {
      DirectoryPage.verifySearchFunctionality();
    });

    it('should display job title filter options', () => {
      DirectoryPage.verifyJobTitleFilterOptions();
    });

    it('should display location filter options', () => {
      DirectoryPage.verifyLocationFilterOptions();
    });

    it('should handle search with no results', () => {
      DirectoryPage.handleSearchWithNoResults();
    });

    it('should display reset functionality', () => {
      DirectoryPage.verifyResetFunctionality();
    });
  });

  context('Employee Cards Display', () => {
    it('should display employee card structure when available', () => {
      DirectoryPage.verifyEmployeeCardStructure();
    });

    it('should display employee information elements', () => {
      DirectoryPage.verifyEmployeeInformationElements();
    });

    it('should display employee card styling', () => {
      DirectoryPage.verifyEmployeeCardStyling();
    });
  });

  context('Data Validation', () => {
    it('should verify employee data structure', () => {
      DirectoryPage.verifyEmployeeDataStructure();
    });

    it('should verify employee names when available', () => {
      DirectoryPage.verifyEmployeeNamesWhenAvailable();
    });

    it('should verify job titles when available', () => {
      DirectoryPage.verifyJobTitlesWhenAvailable();
    });
  });

  context('Pagination', () => {
    it('should display pagination when available', () => {
      DirectoryPage.verifyPaginationWhenAvailable();
    });

    it('should display record count information', () => {
      DirectoryPage.verifyRecordCountInformation();
    });
  });

  context('Responsive Design', () => {
    it('should display cards in grid layout', () => {
      cy.viewport(1280, 720);
      DirectoryPage.verifyCardsInGridLayout();
    });

    it('should be responsive on mobile view', () => {
      DirectoryPage.verifyResponsiveDesign(375, 667);
    });

    it('should be responsive on tablet view', () => {
      DirectoryPage.verifyResponsiveDesign(768, 1024);
    });
  });

  context('UI Consistency', () => {
    it('should display search section consistently', () => {
      DirectoryPage.verifySearchSectionConsistency();
    });

    it('should maintain consistent button styling', () => {
      DirectoryPage.verifyConsistentButtonStyling();
    });

    it('should maintain consistent card styling when available', () => {
      DirectoryPage.verifyConsistentCardStyling();
    });
  });

  context('Accessibility', () => {
    it('should have proper heading structure', () => {
      DirectoryPage.verifyProperHeadingStructure();
    });

    it('should support keyboard navigation', () => {
      DirectoryPage.verifyKeyboardNavigation();
    });

    it('should handle images properly when present', () => {
      DirectoryPage.verifyImagesHandling();
    });
  });
});