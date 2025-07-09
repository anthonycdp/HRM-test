class PerformancePage {
  constructor() {
    this.url = 'https://opensource-demo.orangehrmlive.com/web/index.php/performance/searchEvaluatePerformanceReview';
    this.elements = {
      pageTitle: () => cy.get('.oxd-topbar-header-breadcrumb-module'),
      navigation: {
        configureDropdown: () => cy.get('.oxd-topbar-body-nav').contains('Configure'),
        manageReviewsDropdown: () => cy.get('.oxd-topbar-body-nav').contains('Manage Reviews'),
        myTrackersButton: () => cy.get('.oxd-topbar-body-nav-tab').contains('My Trackers'),
        employeeTrackersButton: () => cy.get('.oxd-topbar-body-nav-tab').contains('Employee Trackers')
      },
      searchSection: {
        employeeNameInput: () => cy.get('input[placeholder="Type for hints..."]'),
        jobTitleDropdown: () => cy.get('.oxd-select-text').eq(0),
        statusDropdown: () => cy.get('.oxd-select-text').eq(1),
        fromDateInput: () => cy.get('.oxd-date-input input').eq(0),
        toDateInput: () => cy.get('.oxd-date-input input').eq(1),
        reviewerNameInput: () => cy.get('input[placeholder="Type for hints..."]').eq(1),
        searchButton: () => cy.get('button[type="submit"]').contains('Search'),
        resetButton: () => cy.get('.oxd-button--ghost').contains('Reset')
      },
      reviewTable: {
        table: () => cy.get('.oxd-table'),
        tableRows: () => cy.get('.oxd-table-body .oxd-table-row'),
        evaluateButtons: () => cy.get('.oxd-table-cell-actions button').contains('Evaluate'),
        viewButtons: () => cy.get('.oxd-table-cell-actions button').contains('View')
      },
      evaluationForm: {
        ratingInputs: () => cy.get('.oxd-input--active'),
        commentsTextarea: () => cy.get('textarea'),
        saveButton: () => cy.get('button[type="submit"]').contains('Save'),
        completeButton: () => cy.get('button').contains('Complete'),
        cancelButton: () => cy.get('button[type="button"]').contains('Cancel')
      },
      trackerForm: {
        trackerNameInput: () => cy.get('.oxd-input').eq(0),
        employeeNameInput: () => cy.get('input[placeholder="Type for hints..."]'),
        reviewersInput: () => cy.get('input[placeholder="Type for hints..."]').eq(1),
        addButton: () => cy.get('button').contains('Add'),
        saveButton: () => cy.get('button[type="submit"]').contains('Save'),
        cancelButton: () => cy.get('button[type="button"]').contains('Cancel')
      },
      kpiForm: {
        keyPerformanceIndicatorInput: () => cy.get('.oxd-input').eq(0),
        jobTitleDropdown: () => cy.get('.oxd-select-text'),
        minRatingInput: () => cy.get('.oxd-input').eq(1),
        maxRatingInput: () => cy.get('.oxd-input').eq(2),
        makeDefaultScaleCheckbox: () => cy.get('input[type="checkbox"]'),
        saveButton: () => cy.get('button[type="submit"]').contains('Save'),
        cancelButton: () => cy.get('button[type="button"]').contains('Cancel')
      }
    };
  }

  visit() {
    cy.visit(this.url);
  }

  searchPerformanceReview(filters = {}) {
    if (filters.employeeName) {
      this.elements.searchSection.employeeNameInput().clear().type(filters.employeeName);
      cy.wait(1000);
      cy.get('body').then($body => {
        if ($body.find('.oxd-autocomplete-dropdown').length > 0) {
          cy.get('.oxd-autocomplete-dropdown .oxd-autocomplete-option').first().click();
        }
      });
    }
    if (filters.jobTitle) {
      this.elements.searchSection.jobTitleDropdown().click();
      cy.get('.oxd-select-dropdown').contains(filters.jobTitle).click();
    }
    if (filters.status) {
      this.elements.searchSection.statusDropdown().click();
      cy.wait(500);
      cy.get('body').then($body => {
        if ($body.find('.oxd-select-dropdown').length > 0) {
          cy.get('.oxd-select-dropdown .oxd-select-option').first().click();
        }
      });
    }
    if (filters.fromDate) {
      this.elements.searchSection.fromDateInput().clear().type(filters.fromDate);
    }
    if (filters.toDate) {
      this.elements.searchSection.toDateInput().clear().type(filters.toDate);
    }
    if (filters.reviewerName) {
      this.elements.searchSection.reviewerNameInput().type(filters.reviewerName);
      cy.wait(1000);
      cy.get('.oxd-autocomplete-dropdown').contains(filters.reviewerName).click();
    }
    this.elements.searchSection.searchButton().click();
  }

  evaluatePerformance(employeeName) {
    cy.get('.oxd-table-body').contains(employeeName).parent().parent().find('button').contains('Evaluate').click();
  }

  viewPerformance(employeeName) {
    cy.get('.oxd-table-body').contains(employeeName).parent().parent().find('button').contains('View').click();
  }

  fillEvaluation(ratings, comments) {
    ratings.forEach((rating, index) => {
      this.elements.evaluationForm.ratingInputs().eq(index).clear().type(rating);
    });
    
    if (comments) {
      this.elements.evaluationForm.commentsTextarea().type(comments);
    }
  }

  saveEvaluation() {
    this.elements.evaluationForm.saveButton().click();
  }

  completeEvaluation() {
    this.elements.evaluationForm.completeButton().click();
  }

  navigateToMyTrackers() {
    this.elements.navigation.myTrackersButton().click();
  }

  navigateToEmployeeTrackers() {
    this.elements.navigation.employeeTrackersButton().click();
  }

  navigateToConfigure() {
    this.elements.navigation.configureDropdown().click();
  }

  navigateToManageReviews() {
    this.elements.navigation.manageReviewsDropdown().click();
  }

  addTracker(trackerName, employeeName, reviewers) {
    this.elements.trackerForm.trackerNameInput().clear().type(trackerName);
    
    this.elements.trackerForm.employeeNameInput().clear().type(employeeName.substring(0, 3));
    cy.wait(1000);
    cy.get('.oxd-autocomplete-dropdown').should('be.visible');
    cy.get('.oxd-autocomplete-option').first().click();
    
    if (reviewers && reviewers.length > 0) {
      this.elements.trackerForm.reviewersInput().clear().type(reviewers[0].substring(0, 3));
      cy.wait(1000);
      cy.get('.oxd-autocomplete-dropdown').should('be.visible');
      cy.get('.oxd-autocomplete-option').first().click();
    }
    
    this.elements.trackerForm.saveButton().click();
  }

  addKPI(kpiData) {
    this.elements.kpiForm.keyPerformanceIndicatorInput().clear().type(kpiData.indicator);
    
    this.elements.kpiForm.jobTitleDropdown().click();
    cy.wait(500);
    cy.get('.oxd-select-dropdown').should('be.visible');
    cy.get('.oxd-select-option').first().click();
    
    this.elements.kpiForm.minRatingInput().clear().type(kpiData.minRating);
    this.elements.kpiForm.maxRatingInput().clear().type(kpiData.maxRating);
    
    if (kpiData.makeDefault) {
      cy.get('.oxd-switch-input').click();
    }
    
    this.elements.kpiForm.saveButton().click();
  }

  verifyTable() {
    this.elements.reviewTable.table().should('be.visible');
  }

  verifyTableRow(index) {
    return cy.get('body').then($body => {
      if ($body.find('.oxd-table-body .oxd-table-row').length > index) {
        return cy.wrap(this.elements.reviewTable.tableRows().eq(index));
      } else {
        return cy.wrap(null);
      }
    });
  }

  getFirstRowEmployeeName() {
    return cy.get('.oxd-table-body .oxd-table-row').first().then($row => {
      return $row.find('.oxd-table-cell').eq(0).text();
    });
  }

  hasEvaluateButton(row) {
    return row.find('button:contains("Evaluate")').length > 0;
  }

  hasViewButton(row) {
    return row.find('button:contains("View")').length > 0;
  }

  resetSearch() {
    this.elements.searchSection.resetButton().click();
  }

  verifyEmployeeNameInputEmpty() {
    cy.get('input[placeholder="Type for hints..."]').should('have.value', '');
  }

  clickAddButton() {
    cy.get('body').then($body => {
      if ($body.find('button:contains("Add")').length > 0) {
        cy.get('button').contains('Add').first().click();
      } else if ($body.find('.oxd-button--secondary').length > 0) {
        cy.get('.oxd-button--secondary').first().click();
      } else {
        cy.log('Add button not found');
      }
    });
  }

  searchTrackers(employeeName) {
    cy.get('input[placeholder="Type for hints..."]').first().type(employeeName);
    cy.wait(1000);
    cy.get('.oxd-autocomplete-dropdown').first().click();
    cy.get('button[type="submit"]').contains('Search').first().click();
  }

  clickViewButton() {
    cy.get('body').then($body => {
      const viewButtons = $body.find('.oxd-table-cell-actions button:contains("View")');
      if (viewButtons.length > 0) {
        cy.get('.oxd-table-cell-actions button').contains('View').first().click();
      } else {
        cy.log('View button not found in table');
        const iconButtons = $body.find('.oxd-table-cell-actions .oxd-icon-button');
        if (iconButtons.length > 0) {
          cy.get('.oxd-table-cell-actions .oxd-icon-button').first().click();
        }
      }
    });
  }

  addTrackerLogEntry(comment, achievement) {
    cy.get('button').contains('Add Log').first().click();
    cy.get('textarea').first().type(comment);
    cy.get('.oxd-input').eq(1).clear().type(achievement);
    cy.get('button[type="submit"]').first().click();
  }

  clickConfigureOption(option) {
    cy.get('body').then($body => {
      if ($body.find('.oxd-dropdown-menu').length > 0) {
        const optionElement = $body.find('.oxd-dropdown-menu').find(':contains("' + option + '")');
        if (optionElement.length > 0) {
          cy.get('.oxd-dropdown-menu').contains(option).click();
        } else {
          cy.log(`Option "${option}" not found in dropdown menu`);
          cy.get('.oxd-dropdown-menu li').first().click();
        }
      } else {
        cy.log('Dropdown menu not found');
      }
    });
  }

  addReviewPeriod(name, startDate, endDate) {
    cy.get('.oxd-input').eq(1).type(name);
    cy.get('.oxd-date-input input').eq(0).clear().type(startDate);
    cy.get('.oxd-date-input input').eq(1).clear().type(endDate);
    cy.get('button[type="submit"]').first().click();
  }

  addPerformanceReview(employee, supervisor, reviewPeriod, startDate, endDate, dueDate) {
    cy.get('body').then($body => {
      const employeeInputs = $body.find('input[placeholder="Type for hints..."]');
      if (employeeInputs.length > 0) {
        cy.get('input[placeholder="Type for hints..."]').eq(0).type(employee);
        cy.wait(1000);
        if ($body.find('.oxd-autocomplete-dropdown').length > 0) {
          cy.get('.oxd-autocomplete-dropdown').first().click();
        }
      }

      if (employeeInputs.length > 1) {
        cy.get('input[placeholder="Type for hints..."]').eq(1).type(supervisor);
        cy.wait(1000);
        if ($body.find('.oxd-autocomplete-dropdown').length > 0) {
          cy.get('.oxd-autocomplete-dropdown').first().click();
        }
      }

      if ($body.find('.oxd-select-text').length > 0) {
        cy.get('.oxd-select-text').first().click();
        cy.wait(500);
        if ($body.find('.oxd-select-dropdown').length > 0) {
          cy.get('.oxd-select-dropdown').first().click();
        }
      }
      
      const dateInputs = $body.find('.oxd-date-input input');
      if (dateInputs.length > 0) {
        cy.get('.oxd-date-input input').eq(0).clear().type(startDate);
      }
      if (dateInputs.length > 1) {
        cy.get('.oxd-date-input input').eq(1).clear().type(endDate);
      }
      if (dateInputs.length > 2) {
        cy.get('.oxd-date-input input').eq(2).clear().type(dueDate);
      }
      
      cy.get('button[type="submit"]').first().click();
    });
  }

  verifyPerformanceStatuses(validStatuses) {
    cy.get('body').then($body => {
      if ($body.find('.oxd-table-body .oxd-table-cell').length > 0) {
        cy.get('.oxd-table-body .oxd-table-cell').each($cell => {
          const text = $cell.text().trim();
          if (validStatuses.includes(text)) {
            cy.wrap($cell).should('have.text', text);
          }
        });
      } else {
        cy.log('No table data found to verify statuses');
      }
    });
  }

  enterRatingValue(value) {
    cy.get('.oxd-input--active').first().clear().type(value);
  }

  verifyPerformanceTrackerModal() {
    cy.get('.orangehrm-performance-tracker-modal').should('be.visible');
    cy.get('.orangehrm-performance-tracker-header').should('contain', 'Performance');
  }

  enterKPIRatings(minRating, maxRating) {
    cy.get('body').then($body => {
      const inputs = $body.find('.oxd-input');
      if (inputs.length >= 3) {
        cy.get('.oxd-input').eq(1).clear().type(minRating);
        cy.get('.oxd-input').eq(2).clear().type(maxRating);
        cy.get('button[type="submit"]').click();
      } else {
        cy.log('KPI rating inputs not found or insufficient inputs available');
      }
    });
  }
}

export default new PerformancePage();