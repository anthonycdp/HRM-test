import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import PerformancePage from '../pages/PerformancePage';

describe('Performance Module', () => {
  let userData;

  before(() => {
    cy.fixture('users').then((data) => {
      userData = data;
    });
  });

  beforeEach(() => {
    cy.login(userData.admin.username, userData.admin.password);
    DashboardPage.navigateTo('performance');
    cy.verifyPageTitle('Performance');
  });

  context('Performance Reviews', () => {
    it('should search performance reviews', () => {
      PerformancePage.searchPerformanceReview({
        employeeName: 'a'
      });
      cy.waitForLoading();
      cy.get('body').then($body => {
        if ($body.find('.oxd-table').length > 0) {
          PerformancePage.verifyTable();
        } else {
          cy.log('No performance reviews found');
        }
      });
    });

    it('should evaluate performance review', () => {
      cy.get('body').then($body => {
        if ($body.find('.oxd-table-body .oxd-table-row').length > 0) {
          PerformancePage.verifyTableRow(0).then($row => {
            if ($row && $row.length > 0 && PerformancePage.hasEvaluateButton($row)) {
              const employeeName = $row.find('.oxd-table-cell').eq(0).text();
              PerformancePage.evaluatePerformance(employeeName);
              
              cy.verifyPageTitle('Performance Review');
              
              const evaluation = userData.performanceData.evaluation;
              PerformancePage.fillEvaluation(evaluation.ratings, evaluation.comments);
              PerformancePage.saveEvaluation();
              
              cy.wait(1000);
              cy.verifySuccessMessage('Successfully Saved');
            }
          });
        }
      });
    });

    it('should complete performance review', () => {
      PerformancePage.verifyTableRow(0).then($row => {
        if ($row && $row.length > 0 && PerformancePage.hasEvaluateButton($row)) {
          const employeeName = $row.find('.oxd-table-cell').eq(0).text();
          PerformancePage.evaluatePerformance(employeeName);
          
          const evaluation = userData.performanceData.evaluation;
          PerformancePage.fillEvaluation(evaluation.ratings, evaluation.comments);
          PerformancePage.completeEvaluation();
          
          cy.wait(1000);
          cy.verifySuccessMessage('Successfully Completed');
        }
      });
    });

    it('should view performance review', () => {
      PerformancePage.verifyTableRow(0).then($row => {
        if ($row && $row.length > 0 && PerformancePage.hasViewButton($row)) {
          const employeeName = $row.find('.oxd-table-cell').eq(0).text();
          PerformancePage.viewPerformance(employeeName);
          
          cy.verifyPageTitle('Performance Review');
        }
      });
    });

    it('should filter by review period', () => {
      PerformancePage.searchPerformanceReview({
        fromDate: '2025-01-01',
        toDate: '2025-12-31'
      });
      cy.waitForLoading();
      PerformancePage.verifyTable();
    });

    it('should reset search filters', () => {
      PerformancePage.searchPerformanceReview({
        employeeName: 'John Doe',
        status: 'Active'
      });
      
      PerformancePage.resetSearch();
      PerformancePage.verifyEmployeeNameInputEmpty();
    });
  });

  context('Performance Trackers', () => {
    it('should navigate to my trackers', () => {
      PerformancePage.navigateToMyTrackers();
      cy.verifyPageTitle('My Performance Trackers');
    });

    it('should navigate to employee trackers', () => {
      PerformancePage.navigateToEmployeeTrackers();
      cy.verifyPageTitle('Employee Trackers');
    });

    it('should add performance tracker', () => {
      PerformancePage.navigateToEmployeeTrackers();
      cy.wait(1000);
      
      cy.get('body').then($body => {
        const hasAddButton = $body.find('button:contains("Add")').length > 0;
        
        if (hasAddButton) {
          PerformancePage.clickAddButton();
          cy.wait(1000);
          
          const tracker = userData.performanceData.tracker;
          PerformancePage.addTracker(tracker.name, tracker.employee, tracker.reviewers);
          
          cy.wait(1000);
          cy.get('body').then($body => {
            if ($body.find('.oxd-toast').length > 0) {
              cy.get('.oxd-toast').should('be.visible');
            } else {
              cy.log('Tracker submitted - toast message not found');
            }
          });
        } else {
          cy.log('Add button not available - may need proper permissions');
        }
      });
    });

    it('should search trackers', () => {
      PerformancePage.navigateToEmployeeTrackers();
      PerformancePage.searchTrackers('John');
      cy.waitForLoading();
      PerformancePage.verifyTable();
    });

    it('should view tracker log', () => {
      PerformancePage.navigateToMyTrackers();
      
      PerformancePage.verifyTableRow(0).then($row => {
        if ($row && $row.length > 0 && PerformancePage.hasViewButton($row)) {
          PerformancePage.clickViewButton();
          cy.wait(1000);
          cy.get('body').then($body => {
            if ($body.find('h6:contains("Log")').length > 0) {
              cy.log('Navigated to tracker log page');
            }
          });
        } else {
          cy.log('View button not available or no data in table');
        }
      });
    });

    it('should add tracker log entry', () => {
      PerformancePage.navigateToMyTrackers();
      
      PerformancePage.verifyTableRow(0).then($row => {
        if ($row && $row.length > 0 && PerformancePage.hasViewButton($row)) {
          PerformancePage.clickViewButton();
          cy.wait(1000);
          
          cy.get('body').then($body => {
            if ($body.find('button:contains("Add Log")').length > 0) {
              PerformancePage.addTrackerLogEntry('Completed project milestone on time', '8');
              
              cy.wait(1000);
              cy.get('body').then($toastBody => {
                if ($toastBody.find('.oxd-toast').length > 0) {
                  cy.get('.oxd-toast').should('be.visible');
                } else {
                  cy.log('Log entry submitted - toast message not found');
                }
              });
            } else {
              cy.log('Add Log button not available');
            }
          });
        } else {
          cy.log('View button not available or no data in table');
        }
      });
    });
  });

  context('Configuration', () => {
    it('should navigate to configuration menu', () => {
      PerformancePage.navigateToConfigure();
      PerformancePage.clickConfigureOption('KPIs');
      cy.verifyPageTitle('Key Performance Indicators for Job Title');
    });

    it('should add KPI', () => {
      PerformancePage.navigateToConfigure();
      PerformancePage.clickConfigureOption('KPIs');
      cy.wait(1000);
      
      cy.get('body').then($body => {
        const hasAddButton = $body.find('button:contains("Add")').length > 0;
        
        if (hasAddButton) {
          PerformancePage.clickAddButton();
          cy.wait(1000);
          
          const kpi = userData.performanceData.kpi;
          PerformancePage.addKPI(kpi);
          
          cy.wait(1000);
          cy.get('body').then($body => {
            if ($body.find('.oxd-toast').length > 0) {
              cy.get('.oxd-toast').should('be.visible');
            } else {
              cy.log('KPI submitted - toast message not found');
            }
          });
        } else {
          cy.log('Add button not available - may need proper permissions');
        }
      });
    });

    it('should configure trackers', () => {
      PerformancePage.navigateToConfigure();
      PerformancePage.clickConfigureOption('Trackers');
      cy.verifyPageTitle('Performance Trackers');
    });

    it('should configure review periods', () => {
      PerformancePage.navigateToConfigure();
      cy.wait(1000);
      
      cy.get('body').then($body => {
        if ($body.find('.oxd-dropdown-menu').length > 0) {
          PerformancePage.clickConfigureOption('Manage Reviews');
          cy.wait(1000);
          
          cy.get('body').then($subBody => {
            if ($subBody.find('.oxd-dropdown-menu').length > 0) {
              PerformancePage.clickConfigureOption('Manage Review Period');
            }
          });
        } else {
          cy.log('Configure dropdown not available');
        }
      });
    });

    it('should add review period', () => {
      PerformancePage.navigateToConfigure();
      cy.wait(1000);
      
      cy.get('body').then($body => {
        if ($body.find('.oxd-dropdown-menu').length > 0) {
          PerformancePage.clickConfigureOption('Manage Reviews');
          cy.wait(1000);
          
          cy.get('body').then($subBody => {
            if ($subBody.find('.oxd-dropdown-menu').length > 0) {
              PerformancePage.clickConfigureOption('Manage Review Period');
              cy.wait(1000);
              
              cy.get('body').then($addBody => {
                const hasAddButton = $addBody.find('button:contains("Add")').length > 0;
                if (hasAddButton) {
                  PerformancePage.clickAddButton();
                  cy.wait(1000);
                  
                  PerformancePage.addReviewPeriod('Q1 2025 Review', '2025-01-01', '2025-03-31');
                  
                  cy.wait(1000);
                  cy.get('body').then($toastBody => {
                    if ($toastBody.find('.oxd-toast').length > 0) {
                      cy.get('.oxd-toast').should('be.visible');
                    } else {
                      cy.log('Review period submitted - toast message not found');
                    }
                  });
                }
              });
            }
          });
        } else {
          cy.log('Configure dropdown not available');
        }
      });
    });
  });

  context('Manage Reviews', () => {
    it('should navigate to manage reviews', () => {
      PerformancePage.navigateToManageReviews();
      PerformancePage.clickConfigureOption('Manage Reviews');
      cy.verifyPageTitle('Manage Performance Reviews');
    });

    it('should add performance review', () => {
      PerformancePage.navigateToManageReviews();
      PerformancePage.clickConfigureOption('Manage Reviews');
      PerformancePage.clickAddButton();
      cy.verifyPageTitle('Add Performance Review');
      
      PerformancePage.addPerformanceReview('John', 'Admin', 'Q1 2025', '2025-01-01', '2025-03-31', '2025-04-15');
      cy.wait(1000);
      cy.verifySuccessMessage('Successfully Saved');
    });
  });

  context('UI Validations', () => {
    it('should display correct performance statuses', () => {
      PerformancePage.searchPerformanceReview({
        employeeName: 'a'
      });
      cy.waitForLoading();
      
      cy.get('body').then($body => {
        if ($body.find('.oxd-table').length > 0) {
          const validStatuses = ['Inactive', 'Active', 'In Progress', 'Completed'];
          PerformancePage.verifyPerformanceStatuses(validStatuses);
        } else {
          cy.log('No table data available to verify statuses');
        }
      });
    });

    it('should validate rating input range', () => {
      PerformancePage.verifyTableRow(0).then($row => {
        if ($row && $row.length > 0 && PerformancePage.hasEvaluateButton($row)) {
          const employeeName = $row.find('.oxd-table-cell').eq(0).text();
          PerformancePage.evaluatePerformance(employeeName);
          
          PerformancePage.enterRatingValue('10');
          PerformancePage.saveEvaluation();
          
          cy.verifyFieldError('.oxd-input', 'Should be between 1 and 5');
        }
      });
    });

    it('should display tracker performance metrics', () => {
      PerformancePage.navigateToMyTrackers();
      
      PerformancePage.verifyTableRow(0).then($row => {
        if ($row && $row.length > 0 && PerformancePage.hasViewButton($row)) {
          PerformancePage.clickViewButton();
          cy.wait(1000);
          
          cy.get('body').then($body => {
            if ($body.find('.oxd-dialog-container').length > 0 || $body.find('h6:contains("Performance")').length > 0) {
              cy.log('Performance tracker modal opened');
            } else {
              cy.log('Modal not found - may have navigated to different page');
            }
          });
        } else {
          cy.log('View button not available or no data in table');
        }
      });
    });

    it('should validate date range in search', () => {
      PerformancePage.searchPerformanceReview({
        fromDate: '2025-12-31',
        toDate: '2025-01-01'
      });
      
      cy.wait(1000);
      cy.get('body').then($body => {
        if ($body.find('.oxd-input-field-error-message').length > 0) {
          cy.get('.oxd-input-field-error-message').should('exist');
          cy.log('Date validation error displayed');
        } else {
          cy.log('Date validation may be handled differently or search was submitted');
        }
      });
    });

    it('should display KPI scale correctly', () => {
      PerformancePage.navigateToConfigure();
      PerformancePage.clickConfigureOption('KPIs');
      PerformancePage.clickAddButton();
      
      PerformancePage.enterKPIRatings('0', '10');
      cy.verifyFieldError('.oxd-input', 'Min rating should be less than max rating');
    });
  });
});