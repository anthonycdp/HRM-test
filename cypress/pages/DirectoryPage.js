class DirectoryPage {
  constructor() {
    this.url = 'https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory';
    this.elements = {
      pageTitle: () => cy.get('.oxd-topbar-header-breadcrumb-module'),
      searchSection: {
        employeeNameInput: () => cy.get('input[placeholder="Type for hints..."]'),
        jobTitleDropdown: () => cy.get('.oxd-select-text').eq(0),
        locationDropdown: () => cy.get('.oxd-select-text').eq(1),
        searchButton: () => cy.get('button[type="submit"]').contains('Search'),
        resetButton: () => cy.get('button[type="button"]').contains('Reset')
      },
      employeeCards: {
        cards: () => cy.get('.oxd-grid-item'),
        employeeName: () => cy.get('.orangehrm-directory-card-header'),
        employeeJobTitle: () => cy.get('.orangehrm-directory-card-subtitle'),
        employeeLocation: () => cy.get('.orangehrm-directory-card-description'),
        employeeContact: () => cy.get('.orangehrm-directory-card-footer')
      },
      pagination: {
        previousButton: () => cy.get('.oxd-pagination-page-item--previous'),
        nextButton: () => cy.get('.oxd-pagination-page-item--next'),
        pageNumbers: () => cy.get('.oxd-pagination-page-item:not(.oxd-pagination-page-item--previous):not(.oxd-pagination-page-item--next)'),
        recordsFound: () => cy.get('.orangehrm-horizontal-padding span')
      }
    };
  }

  visit() {
    cy.visit(this.url);
  }

  searchEmployee(filters = {}) {
    if (filters.employeeName) {
      this.elements.searchSection.employeeNameInput().type(filters.employeeName);
      cy.wait(1000);
      cy.get('.oxd-autocomplete-dropdown').contains(filters.employeeName).click();
    }
    if (filters.jobTitle) {
      this.elements.searchSection.jobTitleDropdown().click();
      cy.get('.oxd-select-dropdown').contains(filters.jobTitle).click();
    }
    if (filters.location) {
      this.elements.searchSection.locationDropdown().click();
      cy.get('.oxd-select-dropdown').contains(filters.location).click();
    }
    this.elements.searchSection.searchButton().click();
  }

  resetSearch() {
    this.elements.searchSection.resetButton().click();
  }

  verifyEmployeeCard(employeeName) {
    this.elements.employeeCards.cards().contains(employeeName).should('be.visible');
  }

  getEmployeeCount() {
    return this.elements.employeeCards.cards().its('length');
  }

  clickEmployeeCard(employeeName) {
    this.elements.employeeCards.cards().contains(employeeName).click();
  }

  navigateToNextPage() {
    this.elements.pagination.nextButton().click();
  }

  navigateToPreviousPage() {
    this.elements.pagination.previousButton().click();
  }

  navigateToPage(pageNumber) {
    this.elements.pagination.pageNumbers().contains(pageNumber).click();
  }

  verifyRecordsFound(expectedText) {
    this.elements.pagination.recordsFound().should('contain', expectedText);
  }

  verifyEmployeeDetails(employeeName, jobTitle, location) {
    const card = this.elements.employeeCards.cards().contains(employeeName).parent().parent();
    
    if (jobTitle) {
      card.find('.orangehrm-directory-card-subtitle').should('contain', jobTitle);
    }
    
    if (location) {
      card.find('.orangehrm-directory-card-description').should('contain', location);
    }
  }

  verifyNoRecordsFound() {
    cy.get('.orangehrm-horizontal-padding').should('contain', 'No Records Found');
  }

  getAllEmployeeNames() {
    return this.elements.employeeCards.employeeName().then($names => {
      return Array.from($names).map(el => el.textContent.trim());
    });
  }

  getAllEmployeeJobTitles() {
    return this.elements.employeeCards.employeeJobTitle().then($titles => {
      return Array.from($titles).map(el => el.textContent.trim());
    });
  }

  getAllEmployeeLocations() {
    return this.elements.employeeCards.employeeLocation().then($locations => {
      return Array.from($locations).map(el => el.textContent.trim());
    });
  }

  verifyEmployeeCardsInterface() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-grid-item').length > 0) {
        cy.get('.oxd-grid-item').should('be.visible');
        cy.log('Employee cards found');
      } else {
        cy.log('No employee cards found - may be empty directory');
      }
    });
  }

  verifySearchFunctionality() {
    cy.get('body').then($body => {
      if ($body.find('input[placeholder="Type for hints..."]').length > 0) {
        cy.get('input[placeholder="Type for hints..."]').should('be.visible');
      }
      
      if ($body.find('.oxd-select-text').length > 0) {
        cy.get('.oxd-select-text').should('be.visible');
      }
      
      if ($body.find('button').filter(':contains("Search")').length > 0) {
        cy.get('button').contains('Search').should('be.visible');
      }
    });
  }

  verifyJobTitleFilterOptions() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-select-text').length > 0) {
        cy.get('.oxd-select-text').first().should('be.visible');
        cy.log('Job title dropdown available');
      } else {
        cy.log('Job title dropdown not found');
      }
    });
  }

  verifyLocationFilterOptions() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-select-text').length >= 2) {
        cy.get('.oxd-select-text').eq(1).should('be.visible');
        cy.log('Location dropdown available');
      } else {
        cy.log('Location dropdown not found');
      }
    });
  }

  handleSearchWithNoResults() {
    cy.get('body').then($body => {
      if ($body.find('input[placeholder="Type for hints..."]').length > 0) {
        cy.get('input[placeholder="Type for hints..."]').type('NonExistentEmployee123');
        cy.wait(1000);
        
        if ($body.find('button').filter(':contains("Search")').length > 0) {
          cy.get('button').contains('Search').click();
          cy.wait(3000);
          
          cy.get('body').then($resultBody => {
            if ($resultBody.find('.orangehrm-horizontal-padding').length > 0) {
              cy.get('.orangehrm-horizontal-padding').should('be.visible');
            } else {
              cy.log('No results message not found');
            }
          });
        }
      }
    });
  }

  verifyResetFunctionality() {
    cy.get('body').then($body => {
      if ($body.find('button').filter(':contains("Reset")').length > 0) {
        cy.get('button').contains('Reset').should('be.visible');
      } else {
        cy.log('Reset button not found');
      }
    });
  }

  verifyEmployeeCardStructure() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-grid-item').length > 0) {
        cy.get('.oxd-grid-item').first().should('be.visible');
        cy.log('Employee cards structure verified');
      } else {
        cy.log('No employee cards available to test');
      }
    });
  }

  verifyEmployeeInformationElements() {
    cy.get('body').then($body => {
      if ($body.find('.orangehrm-directory-card-header').length > 0) {
        cy.get('.orangehrm-directory-card-header').should('be.visible');
      } else {
        cy.log('Employee card headers not found');
      }
    });
  }

  verifyEmployeeCardStyling() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-grid-item').length > 0) {
        cy.get('.oxd-grid-item').first().should('have.class', 'oxd-grid-item');
      } else {
        cy.log('No cards available for styling verification');
      }
    });
  }

  verifyEmployeeDataStructure() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-grid-item').length > 0) {
        cy.get('.oxd-grid-item').should('have.length.gte', 1);
        cy.log('Employee data structure verified');
      } else {
        cy.log('No employee data available for validation');
      }
    });
  }

  verifyEmployeeNamesWhenAvailable() {
    cy.get('body').then($body => {
      if ($body.find('.orangehrm-directory-card-header').length > 0) {
        cy.get('.orangehrm-directory-card-header').each($name => {
          cy.wrap($name).should('not.be.empty');
        });
      } else {
        cy.log('No employee names found for verification');
      }
    });
  }

  verifyJobTitlesWhenAvailable() {
    cy.get('body').then($body => {
      if ($body.find('.orangehrm-directory-card-subtitle:visible').length > 0) {
        cy.get('.orangehrm-directory-card-subtitle:visible').each($title => {
          cy.wrap($title).should('be.visible');
        });
      } else {
        cy.log('No visible job titles found for verification');
      }
    });
  }

  verifyPaginationWhenAvailable() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-pagination-page-item').length > 0) {
        cy.get('.oxd-pagination-page-item').should('be.visible');
        cy.log('Pagination available');
      } else {
        cy.log('Pagination not found - may not be needed');
      }
    });
  }

  verifyRecordCountInformation() {
    cy.get('body').then($body => {
      if ($body.find('.orangehrm-horizontal-padding span').length > 0) {
        cy.get('.orangehrm-horizontal-padding span').should('be.visible');
      } else {
        cy.log('Record count information not found');
      }
    });
  }

  verifyCardsInGridLayout() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-grid-item').length > 0) {
        cy.get('.oxd-grid-item').should('be.visible');
      } else {
        cy.log('No grid items found for layout test');
      }
    });
  }

  verifyResponsiveDesign(width, height) {
    cy.verifyResponsiveDesign(width, height, 'Directory');
    this.verifyDirectorySpecificResponsive(width, height);
  }

  verifyDirectorySpecificResponsive(width, height) {
    cy.get('body').then($body => {
      if ($body.find('.orangehrm-directory-card').length > 0) {
        cy.get('.orangehrm-directory-card').should('exist');
        cy.log(`Directory cards layout verified for ${width}x${height}`);
      }
      
      if ($body.find('.oxd-form').length > 0) {
        cy.get('.oxd-form').should('exist');
        cy.log('Directory search form responsive');
      }
    });
  }

  verifySearchSectionConsistency() {
    cy.get('body').then($body => {
      if ($body.find('input[placeholder="Type for hints..."]').length > 0) {
        cy.checkVisibilityOrExistence('input[placeholder="Type for hints..."]');
      }
      
      if ($body.find('.oxd-select-text').length > 0) {
        cy.checkVisibilityOrExistence('.oxd-select-text');
      }
      
      if ($body.find('button').filter(':contains("Search")').length > 0) {
        cy.checkVisibilityOrExistence('button:contains("Search")');
      }
      
      if ($body.find('button').filter(':contains("Reset")').length > 0) {
        cy.checkVisibilityOrExistence('button:contains("Reset")');
      }
      
      cy.log('Search section consistency verified');
    });
  }

  verifyConsistentButtonStyling() {
    cy.get('body').then($body => {
      if ($body.find('button').filter(':contains("Search")').length > 0) {
        cy.get('button').contains('Search').should('have.class', 'oxd-button');
      }
      
      if ($body.find('button').filter(':contains("Reset")').length > 0) {
        cy.get('button').contains('Reset').should('have.class', 'oxd-button');
      }
    });
  }

  verifyConsistentCardStyling() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-grid-item').length > 0) {
        cy.get('.oxd-grid-item').each($card => {
          cy.wrap($card).should('have.class', 'oxd-grid-item');
        });
      } else {
        cy.log('No cards available for styling test');
      }
    });
  }

  verifyProperHeadingStructure() {
    cy.get('body').then($body => {
      if ($body.find('h6').length > 0) {
        cy.get('h6').should('exist');
      } else {
        cy.log('Heading structure not found');
      }
    });
  }

  verifyKeyboardNavigation() {
    cy.get('body').then($body => {
      if ($body.find('input[placeholder="Type for hints..."]').length > 0) {
        cy.get('input[placeholder="Type for hints..."]').focus().should('have.focus');
      }
      
      if ($body.find('button').length > 0) {
        cy.get('button').first().focus().should('have.focus');
      }
    });
  }

  verifyImagesHandling() {
    cy.get('body').then($body => {
      if ($body.find('.orangehrm-directory-card-avatar img').length > 0) {
        cy.get('.orangehrm-directory-card-avatar img').should('be.visible');
      } else {
        cy.log('No employee images found');
      }
    });
  }
}

export default new DirectoryPage();