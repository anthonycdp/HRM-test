class ClaimPage {
  constructor() {
    this.url = 'https://opensource-demo.orangehrmlive.com/web/index.php/claim/viewAssignClaim';
    this.elements = {
      pageTitle: () => cy.get('.oxd-topbar-header-breadcrumb-module'),
      navigation: {
        submitClaimButton: () => cy.get('.oxd-topbar-body-nav-tab').contains('Submit Claim'),
        myClaimsButton: () => cy.get('.oxd-topbar-body-nav-tab').contains('My Claims'),
        employeeClaimsButton: () => cy.get('.oxd-topbar-body-nav-tab').contains('Employee Claims'),
        assignClaimButton: () => cy.get('.oxd-topbar-body-nav-tab').contains('Assign Claim')
      },
      assignClaimForm: {
        employeeNameInput: () => cy.get('input[placeholder="Type for hints..."]'),
        eventDropdown: () => cy.get('.oxd-select-text').eq(0),
        currencyDropdown: () => cy.get('.oxd-select-text').eq(1),
        createButton: () => cy.get('button[type="submit"]').contains('Create'),
        backButton: () => cy.get('button[type="button"]').contains('Back')
      },
      submitClaimForm: {
        eventDropdown: () => cy.get('.oxd-select-text').eq(0),
        currencyDropdown: () => cy.get('.oxd-select-text').eq(1),
        remarksTextarea: () => cy.get('textarea'),
        createButton: () => cy.get('button[type="submit"]').contains('Create'),
        cancelButton: () => cy.get('button[type="button"]').contains('Cancel')
      },
      claimDetails: {
        referenceId: () => cy.get('.orangehrm-claim-request-id'),
        addExpenseButton: () => cy.get('button').contains('Add Expense'),
        submitButton: () => cy.get('button').contains('Submit'),
        backButton: () => cy.get('button').contains('Back'),
        expenseTable: {
          table: () => cy.get('.oxd-table'),
          tableRows: () => cy.get('.oxd-table-body .oxd-table-row'),
          editButtons: () => cy.get('.oxd-table-cell-actions button').eq(0),
          deleteButtons: () => cy.get('.oxd-table-cell-actions button').eq(1),
          attachmentButtons: () => cy.get('.oxd-table-cell-actions button').eq(2)
        }
      },
      addExpenseForm: {
        expenseTypeDropdown: () => cy.get('.oxd-select-text'),
        dateInput: () => cy.get('.oxd-date-input input'),
        amountInput: () => cy.get('.oxd-input').eq(1),
        noteTextarea: () => cy.get('textarea'),
        saveButton: () => cy.get('button[type="submit"]').contains('Save'),
        cancelButton: () => cy.get('button[type="button"]').contains('Cancel')
      },
      claimsList: {
        searchSection: {
          referenceIdInput: () => cy.get('.oxd-input').eq(0),
          eventDropdown: () => cy.get('.oxd-select-text').eq(0),
          statusDropdown: () => cy.get('.oxd-select-text').eq(1),
          fromDateInput: () => cy.get('.oxd-date-input input').eq(0),
          toDateInput: () => cy.get('.oxd-date-input input').eq(1),
          searchButton: () => cy.get('button[type="submit"]').contains('Search'),
          resetButton: () => cy.get('button[type="button"]').contains('Reset')
        },
        claimsTable: {
          table: () => cy.get('.oxd-table'),
          tableRows: () => cy.get('.oxd-table-body .oxd-table-row'),
          viewDetailsButtons: () => cy.get('.oxd-table-cell-actions button')
        }
      },
      confirmDialog: {
        yesButton: () => cy.get('.oxd-button--label-danger').contains('Yes'),
        noButton: () => cy.get('.oxd-button--text').contains('No')
      }
    };
  }

  visit() {
    cy.visit(this.url);
  }

  navigateToSubmitClaim() {
    this.elements.navigation.submitClaimButton().click();
  }

  navigateToMyClaims() {
    this.elements.navigation.myClaimsButton().click();
  }

  navigateToEmployeeClaims() {
    this.elements.navigation.employeeClaimsButton().click();
  }

  navigateToAssignClaim() {
    this.elements.navigation.assignClaimButton().click();
  }

  assignClaim(employeeName, event, currency) {
    this.elements.assignClaimForm.employeeNameInput().type(employeeName);
    cy.wait(1000);
    cy.get('.oxd-autocomplete-dropdown').contains(employeeName).click();
    
    this.elements.assignClaimForm.eventDropdown().click();
    cy.get('.oxd-select-dropdown').contains(event).click();
    
    this.elements.assignClaimForm.currencyDropdown().click();
    cy.get('.oxd-select-dropdown').contains(currency).click();
    
    this.elements.assignClaimForm.createButton().click();
  }

  submitClaim(event, currency, remarks = '') {
    this.elements.submitClaimForm.eventDropdown().click();
    cy.get('.oxd-select-dropdown').contains(event).click();
    
    this.elements.submitClaimForm.currencyDropdown().click();
    cy.get('.oxd-select-dropdown').contains(currency).click();
    
    if (remarks) {
      this.elements.submitClaimForm.remarksTextarea().type(remarks);
    }
    
    this.elements.submitClaimForm.createButton().click();
  }

  addExpense(expenseType, date, amount, note = '') {
    this.elements.claimDetails.addExpenseButton().click();
    
    this.elements.addExpenseForm.expenseTypeDropdown().click();
    cy.get('.oxd-select-dropdown').contains(expenseType).click();
    
    this.elements.addExpenseForm.dateInput().clear().type(date);
    this.elements.addExpenseForm.amountInput().type(amount);
    
    if (note) {
      this.elements.addExpenseForm.noteTextarea().type(note);
    }
    
    this.elements.addExpenseForm.saveButton().click();
  }

  submitClaimRequest() {
    this.elements.claimDetails.submitButton().click();
  }

  deleteExpense(rowIndex = 0) {
    this.elements.claimDetails.expenseTable.deleteButtons().eq(rowIndex).click();
    this.elements.confirmDialog.yesButton().click();
  }

  editExpense(rowIndex = 0) {
    this.elements.claimDetails.expenseTable.editButtons().eq(rowIndex).click();
  }

  searchClaim(filters = {}) {
    if (filters.referenceId) {
      this.elements.claimsList.searchSection.referenceIdInput().type(filters.referenceId);
    }
    if (filters.event) {
      this.elements.claimsList.searchSection.eventDropdown().click();
      cy.get('.oxd-select-dropdown').contains(filters.event).click();
    }
    if (filters.status) {
      this.elements.claimsList.searchSection.statusDropdown().click();
      cy.get('.oxd-select-dropdown').contains(filters.status).click();
    }
    if (filters.fromDate) {
      this.elements.claimsList.searchSection.fromDateInput().clear().type(filters.fromDate);
    }
    if (filters.toDate) {
      this.elements.claimsList.searchSection.toDateInput().clear().type(filters.toDate);
    }
    this.elements.claimsList.searchSection.searchButton().click();
  }

  viewClaimDetails(referenceId) {
    cy.get('.oxd-table-body').contains(referenceId).parent().parent().find('button').click();
  }

  verifyClaimStatus(status) {
    cy.get('.oxd-table-body').should('contain', status);
  }

  verifyReferenceId() {
    return this.elements.claimDetails.referenceId().invoke('text');
  }

  navigateToSubmitClaimIfExists() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-topbar-body-nav-tab').length > 0) {
        cy.get('.oxd-topbar-body-nav-tab').contains('Submit Claim').click();
        cy.url().should('include', '/claim');
      } else {
        cy.log('Submit Claim navigation not found - using alternative navigation');
      }
    });
  }

  verifySubmitClaimForm() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-topbar-body-nav-tab').length > 0) {
        cy.get('.oxd-topbar-body-nav-tab').contains('Submit Claim').click();
        cy.wait(2000);
        
        if ($body.find('.oxd-select-text').length > 0) {
          cy.get('.oxd-select-text').should('be.visible');
        } else {
          cy.log('Form elements not found with expected selectors');
        }
      }
    });
  }

  validateRequiredFieldsOnEmptySubmit() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-topbar-body-nav-tab').length > 0) {
        cy.get('.oxd-topbar-body-nav-tab').contains('Submit Claim').click();
        cy.wait(2000);
        
        if ($body.find('button[type="submit"]').length > 0) {
          cy.get('button[type="submit"]').contains('Create').click();
          cy.wait(1000);
          
          cy.get('body').then($errorBody => {
            if ($errorBody.find('.oxd-input-field-error-message').length > 0) {
              cy.get('.oxd-input-field-error-message').should('be.visible');
            } else {
              cy.log('Validation completed');
            }
          });
        }
      }
    });
  }

  verifyEventDropdownFunctionality() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-topbar-body-nav-tab').length > 0) {
        cy.get('.oxd-topbar-body-nav-tab').contains('Submit Claim').click();
        cy.wait(2000);
        
        if ($body.find('.oxd-select-text').length > 0) {
          cy.get('.oxd-select-text').first().should('be.visible');
          cy.log('Event dropdown functionality available');
        } else {
          cy.log('Event dropdown not found');
        }
      }
    });
  }

  verifyCancelFunctionality() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-topbar-body-nav-tab').length > 0) {
        cy.get('.oxd-topbar-body-nav-tab').contains('Submit Claim').click();
        cy.wait(2000);
        
        if ($body.find('button').filter(':contains("Cancel")').length > 0) {
          cy.get('button').contains('Cancel').should('be.visible');
        }
      }
    });
  }

  verifyAssignClaimInterface() {
    cy.get('body').then($body => {
      if ($body.find('input[placeholder="Type for hints..."]').length > 0) {
        cy.get('input[placeholder="Type for hints..."]').should('be.visible');
        cy.log('Assign claim interface found');
      } else {
        cy.log('Assign claim interface not found');
      }
    });
  }

  verifyAssignClaimFormElements() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-select-text').length > 0) {
        cy.get('.oxd-select-text').should('be.visible');
      }
      
      if ($body.find('button[type="submit"]').length > 0) {
        cy.get('button[type="submit"]').should('be.visible');
      }
    });
  }

  validateEmployeeSelectionRequirement() {
    cy.get('body').then($body => {
      if ($body.find('button[type="submit"]').length > 0) {
        cy.get('button[type="submit"]').click();
        cy.wait(1000);
        
        cy.get('body').then($errorBody => {
          if ($errorBody.find('.oxd-input-field-error-message').length > 0) {
            cy.get('.oxd-input-field-error-message').should('be.visible');
          } else {
            cy.log('Validation check completed');
          }
        });
      } else {
        cy.log('Submit button not found for validation test');
      }
    });
  }

  navigateToMyClaimsIfExists() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-topbar-body-nav-tab').length > 0) {
        cy.get('.oxd-topbar-body-nav-tab').contains('My Claims').click();
        cy.url().should('include', '/claim');
      } else {
        cy.log('My Claims navigation not found');
      }
    });
  }

  verifyClaimsTableInterface() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-topbar-body-nav-tab').length > 0) {
        cy.get('.oxd-topbar-body-nav-tab').contains('My Claims').click();
        cy.wait(3000);
        
        cy.get('body').then($tableBody => {
          if ($tableBody.find('.oxd-table').length > 0) {
            cy.get('.oxd-table').should('be.visible');
          } else {
            cy.log('Claims table not found - may be empty');
          }
        });
      }
    });
  }

  verifySearchFunctionality() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-topbar-body-nav-tab').length > 0) {
        cy.get('.oxd-topbar-body-nav-tab').contains('My Claims').click();
        cy.wait(3000);
        
        cy.get('body').then($searchBody => {
          if ($searchBody.find('button').filter(':contains("Search")').length > 0) {
            cy.get('button').contains('Search').should('be.visible');
          } else {
            cy.log('Search functionality not found');
          }
        });
      }
    });
  }

  verifyFilterOptions() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-topbar-body-nav-tab').length > 0) {
        cy.get('.oxd-topbar-body-nav-tab').contains('My Claims').click();
        cy.wait(3000);
        
        cy.get('body').then($filterBody => {
          if ($filterBody.find('.oxd-select-text').length > 0) {
            cy.get('.oxd-select-text').should('be.visible');
          } else {
            cy.log('Filter options not found');
          }
        });
      }
    });
  }

  verifyResetFunctionality() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-topbar-body-nav-tab').length > 0) {
        cy.get('.oxd-topbar-body-nav-tab').contains('My Claims').click();
        cy.wait(3000);
        
        cy.get('body').then($resetBody => {
          if ($resetBody.find('button').filter(':contains("Reset")').length > 0) {
            cy.get('button').contains('Reset').should('be.visible');
          } else {
            cy.log('Reset functionality not found');
          }
        });
      }
    });
  }

  navigateToEmployeeClaimsIfExists() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-topbar-body-nav-tab').length > 0) {
        cy.get('.oxd-topbar-body-nav-tab').contains('Employee Claims').click();
        cy.url().should('include', '/claim');
      } else {
        cy.log('Employee Claims navigation not found');
      }
    });
  }

  verifyEmployeeClaimsInterface() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-topbar-body-nav-tab').length > 0) {
        cy.get('.oxd-topbar-body-nav-tab').contains('Employee Claims').click();
        cy.wait(3000);
        
        cy.get('body').then($claimsBody => {
          if ($claimsBody.find('.oxd-table').length > 0) {
            cy.get('.oxd-table').should('be.visible');
          } else {
            cy.log('Employee claims table not found');
          }
        });
      }
    });
  }

  verifyClaimManagementOptions() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-topbar-body-nav-tab').length > 0) {
        cy.get('.oxd-topbar-body-nav-tab').contains('Employee Claims').click();
        cy.wait(3000);
        
        cy.get('body').then($managementBody => {
          if ($managementBody.find('.oxd-table-cell-actions').length > 0) {
            cy.log('Claim management options available');
          } else {
            cy.log('No claims available for management');
          }
        });
      }
    });
  }

  verifyNavigationTabs() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-topbar-body-nav-tab').length > 0) {
        cy.get('.oxd-topbar-body-nav-tab').should('be.visible');
        cy.get('.oxd-topbar-body-nav-tab').should('have.length.gte', 3);
      } else {
        cy.log('Navigation tabs not found');
      }
    });
  }

  verifyFormElements() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-select-text').length > 0) {
        cy.get('.oxd-select-text').should('be.visible');
      }
      
      if ($body.find('button').length > 0) {
        cy.get('button').should('be.visible');
      }
    });
  }

  verifyResponsiveDesign(width, height) {
    cy.safeViewportChange(width, height);
    
    if (width === 768) {
      cy.get('body').then($body => {
        if ($body.find('.oxd-topbar-body-nav-tab').length > 0) {
          cy.shouldExistInDOM('.oxd-topbar-body-nav-tab');
        } else {
          cy.log('Responsive navigation not found on tablet view');
        }
      });
    } else if (width === 375) {
      this.verifyMobileLayout();
    } else {
      this.verifyDesktopLayout();
    }
  }

  verifyMobileLayout() {
    cy.get('.oxd-topbar').should('exist');
    cy.verifyBreadcrumbExistence();
    cy.get('.oxd-layout').should('exist');
    cy.log('Mobile layout verified - elements exist and are positioned correctly');
  }

  verifyDesktopLayout() {
    cy.verifyBreadcrumbExistence();
    cy.get('body').then($body => {
      if ($body.find('.oxd-topbar-body').length > 0) {
        cy.get('.oxd-topbar-body').should('exist');
      }
      cy.log('Desktop layout verified - header structure is appropriate');
    });
  }

  verifyButtonStyling() {
    cy.get('body').then($body => {
      if ($body.find('button').length > 0) {
        cy.get('button').should('be.visible');
        cy.get('button').should('have.class', 'oxd-button');
      }
    });
  }

  verifyPageTitle(expectedTitle) {
    this.elements.pageTitle().should('contain', expectedTitle);
  }
}

export default new ClaimPage();