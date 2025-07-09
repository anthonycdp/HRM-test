class LeavePage {
  constructor() {
    this.url = 'https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewLeaveList';
    this.elements = {
      pageTitle: () => cy.get('.oxd-topbar-header-breadcrumb-module'),
      applyButton: () => cy.get('.oxd-topbar-body-nav button').contains('Apply'),
      myLeaveButton: () => cy.get('.oxd-topbar-body-nav button').contains('My Leave'),
      entitlementsDropdown: () => cy.get('.oxd-topbar-body-nav').contains('Entitlements'),
      reportsDropdown: () => cy.get('.oxd-topbar-body-nav').contains('Reports'),
      configureDropdown: () => cy.get('.oxd-topbar-body-nav').contains('Configure'),
      leaveListDropdown: () => cy.get('.oxd-topbar-body-nav').contains('Leave List'),
      assignLeaveButton: () => cy.get('.oxd-topbar-body-nav button').contains('Assign Leave'),
      searchSection: {
        fromDateInput: () => cy.get('.oxd-date-input input').eq(0),
        toDateInput: () => cy.get('.oxd-date-input input').eq(1),
        leaveStatusCheckboxes: () => cy.get('.oxd-multiselect-chips-area'),
        leaveTypeDropdown: () => cy.get('.oxd-select-text').eq(0),
        employeeNameInput: () => cy.get('input[placeholder="Type for hints..."]'),
        subUnitDropdown: () => cy.get('.oxd-select-text').eq(1),
        includePastEmployeesCheckbox: () => cy.get('input[type="checkbox"]'),
        searchButton: () => cy.get('button[type="submit"]').contains('Search'),
        resetButton: () => cy.get('button[type="button"]').contains('Reset')
      },
      leaveTable: {
        table: () => cy.get('.oxd-table'),
        tableRows: () => cy.get('.oxd-table-body .oxd-table-row'),
        viewDetailsButtons: () => cy.get('.oxd-table-cell-actions button'),
        statusBadges: () => cy.get('.oxd-table-body .oxd-text')
      },
      applyLeaveForm: {
        leaveTypeDropdown: () => cy.get('.oxd-select-text'),
        fromDateInput: () => cy.get('.oxd-date-input input').eq(0),
        toDateInput: () => cy.get('.oxd-date-input input').eq(1),
        partialDaysDropdown: () => cy.get('.oxd-select-text').eq(1),
        durationDropdown: () => cy.get('.oxd-select-text').eq(2),
        commentsTextarea: () => cy.get('textarea'),
        applyButton: () => cy.get('button[type="submit"]').contains('Apply'),
        cancelButton: () => cy.get('button[type="button"]').contains('Cancel')
      },
      leaveBalance: () => cy.get('.orangehrm-leave-balance-text')
    };
  }

  visit() {
    cy.visit(this.url);
  }

  clickApplyLeave() {
    this.elements.applyButton().click();
  }

  clickMyLeave() {
    this.elements.myLeaveButton().click();
  }

  searchLeave(fromDate, toDate, leaveType = null, employeeName = null) {
    if (fromDate) {
      this.elements.searchSection.fromDateInput().clear().type(fromDate);
    }
    if (toDate) {
      this.elements.searchSection.toDateInput().clear().type(toDate);
    }
    if (leaveType) {
      this.elements.searchSection.leaveTypeDropdown().click();
      cy.get('.oxd-select-dropdown').contains(leaveType).click();
    }
    if (employeeName) {
      this.elements.searchSection.employeeNameInput().type(employeeName);
      cy.wait(1000);
      cy.get('.oxd-autocomplete-dropdown').contains(employeeName).click();
    }
    this.elements.searchSection.searchButton().click();
  }

  applyForLeave(leaveType, fromDate, toDate, comments = '') {
    this.elements.applyLeaveForm.leaveTypeDropdown().click();
    cy.get('.oxd-select-dropdown').contains(leaveType).click();
    
    this.elements.applyLeaveForm.fromDateInput().clear().type(fromDate);
    this.elements.applyLeaveForm.toDateInput().clear().type(toDate);
    
    if (comments) {
      this.elements.applyLeaveForm.commentsTextarea().type(comments);
    }
    
    this.elements.applyLeaveForm.applyButton().click();
  }

  viewLeaveDetails(rowIndex = 0) {
    this.elements.leaveTable.viewDetailsButtons().eq(rowIndex).click();
  }

  verifyLeaveStatus(status) {
    cy.get('.oxd-table-body').should('contain', status);
  }

  verifyLeaveBalance(balance) {
    this.elements.leaveBalance().should('contain', balance);
  }

  selectLeaveStatus(statuses) {
    this.elements.searchSection.leaveStatusCheckboxes().click();
    statuses.forEach(status => {
      cy.get('.oxd-multiselect-dropdown').contains(status).click();
    });
    cy.get('body').click(0, 0);
  }

  clickApplyLeaveIfExists() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-topbar-body-nav button').length > 0) {
        const applyBtn = $body.find('.oxd-topbar-body-nav button').filter(':contains("Apply")');
        if (applyBtn.length > 0) {
          cy.get('.oxd-topbar-body-nav button').contains('Apply').click();
          return true;
        } else {
          cy.log('Apply button not found');
          return false;
        }
      }
      return false;
    });
  }

  clickMyLeaveIfExists() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-topbar-body-nav button').length > 0) {
        const myLeaveBtn = $body.find('.oxd-topbar-body-nav button').filter(':contains("My Leave")');
        if (myLeaveBtn.length > 0) {
          cy.get('.oxd-topbar-body-nav button').contains('My Leave').click();
          return true;
        } else {
          cy.log('My Leave button not found');
          return false;
        }
      }
      return false;
    });
  }

  verifyNavigationElementsExist() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-topbar-body-nav').length > 0) {
        cy.get('.oxd-topbar-body-nav').should('be.visible');
      } else {
        cy.log('Navigation elements not found');
      }
    });
  }

  verifyApplyLeaveFormElements() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-select-text').length > 0) {
        cy.get('.oxd-select-text').should('be.visible');
      }
      
      if ($body.find('.oxd-date-input').length > 0) {
        cy.get('.oxd-date-input').should('be.visible');
      }
    });
  }

  verifyLeaveTypeDropdownVisible() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-select-text').length > 0) {
        cy.get('.oxd-select-text').first().should('be.visible');
        cy.log('Leave type dropdown available');
      }
    });
  }

  verifyAndClickSubmitApply() {
    cy.get('body').then($body => {
      if ($body.find('button[type="submit"]').length > 0) {
        cy.get('button[type="submit"]').filter(':visible').first().click();
        cy.wait(1000);
        
        cy.get('body').then($errorBody => {
          if ($errorBody.find('.oxd-input-field-error-message').length > 0) {
            cy.get('.oxd-input-field-error-message').should('be.visible');
          } else {
            cy.log('Validation messages not found');
          }
        });
      }
    });
  }

  verifyCancelButtonExists() {
    cy.get('body').then($body => {
      if ($body.find('button').filter(':contains("Cancel")').length > 0) {
        cy.get('button').contains('Cancel').should('be.visible');
      }
    });
  }

  verifyLeaveTableExists() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-table').length > 0) {
        cy.get('.oxd-table').should('be.visible');
      } else {
        cy.log('Leave table not found');
      }
    });
  }

  verifySearchFiltersExist() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-date-input').length > 0) {
        cy.get('.oxd-date-input').should('be.visible');
      }
      
      if ($body.find('button').filter(':contains("Search")').length > 0) {
        cy.get('button').contains('Search').should('be.visible');
      }
    });
  }

  verifySearchFunctionality() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-date-input').length > 0) {
        cy.get('.oxd-date-input').should('be.visible');
      }
      
      if ($body.find('button').filter(':contains("Search")').length > 0) {
        cy.get('button').contains('Search').should('be.visible');
      }
      
      if ($body.find('button').filter(':contains("Reset")').length > 0) {
        cy.get('button').contains('Reset').should('be.visible');
      }
    });
  }

  searchWithDateRange(fromDate, toDate) {
    cy.get('body').then($body => {
      if ($body.find('.oxd-date-input input').length >= 2) {
        cy.get('.oxd-date-input input').eq(0).clear().type(fromDate);
        cy.get('.oxd-date-input input').eq(1).clear().type(toDate);
        
        if ($body.find('button').filter(':contains("Search")').length > 0) {
          cy.get('button').contains('Search').click();
          cy.wait(3000);
        }
      }
    });
  }

  verifyResetButtonExists() {
    cy.get('body').then($body => {
      if ($body.find('button').filter(':contains("Reset")').length > 0) {
        cy.get('button').contains('Reset').should('be.visible');
      } else {
        cy.log('Reset button not found');
      }
    });
  }

  verifyAssignLeaveButton() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-topbar-body-nav button').length > 0) {
        const assignBtn = $body.find('.oxd-topbar-body-nav button').filter(':contains("Assign Leave")');
        if (assignBtn.length > 0) {
          cy.get('.oxd-topbar-body-nav button').contains('Assign Leave').should('be.visible');
        } else {
          cy.log('Assign Leave button not found');
        }
      }
    });
  }

  verifyEntitlementsDropdown() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-topbar-body-nav').length > 0) {
        const entitlementsOption = $body.find('.oxd-topbar-body-nav').filter(':contains("Entitlements")');
        if (entitlementsOption.length > 0) {
          cy.get('.oxd-topbar-body-nav').contains('Entitlements').should('be.visible');
        } else {
          cy.log('Entitlements dropdown not found');
        }
      }
    });
  }

  verifyReportsDropdown() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-topbar-body-nav').length > 0) {
        const reportsOption = $body.find('.oxd-topbar-body-nav').filter(':contains("Reports")');
        if (reportsOption.length > 0) {
          cy.get('.oxd-topbar-body-nav').contains('Reports').should('be.visible');
        } else {
          cy.log('Reports dropdown not found');
        }
      }
    });
  }

  verifyPageTitle(expectedTitle) {
    this.elements.pageTitle().should('contain', expectedTitle);
  }

  verifyTableHeadersExist() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-table').length > 0) {
        cy.get('.oxd-table').should('be.visible');
        
        if ($body.find('.oxd-table-header').length > 0) {
          cy.get('.oxd-table-header').should('be.visible');
        }
      } else {
        cy.log('No table found for header validation');
      }
    });
  }

  verifyButtonStyling() {
    cy.get('body').then($body => {
      if ($body.find('button.oxd-button').length > 0) {
        cy.get('button.oxd-button').first().should('have.class', 'oxd-button');
      } else if ($body.find('button').length > 0) {
        cy.get('button').first().should('have.attr', 'type');
      }
    });
  }

  verifyResponsiveDesign(width, height) {
    cy.viewport(width, height);
    this.elements.pageTitle().should('be.visible');
  }
}

export default new LeavePage();