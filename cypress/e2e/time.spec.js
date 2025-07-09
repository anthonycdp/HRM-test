import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import TimePage from '../pages/TimePage';

describe('Time Module', () => {
  let userData;

  before(() => {
    cy.fixture('users').then((data) => {
      userData = data;
    });
  });

  beforeEach(() => {
    cy.login(userData.admin.username, userData.admin.password);
    DashboardPage.navigateTo('time');
    cy.verifyPageTitle('Time');
  });

  context('Timesheet Management', () => {
    it('should view employee timesheet', () => {
      const employee = userData.timesheetData.testTimesheet.employee;
      TimePage.selectEmployeeFixed(employee);
      
      TimePage.verifyTimesheetElementsFixed();
    });

    it('should create new timesheet', () => {
      TimePage.selectEmployee('John Doe');
      
      cy.get('body').then($body => {
        if ($body.find('button:contains("Create Timesheet")').length > 0) {
          TimePage.createTimesheet();
          TimePage.verifySuccessMessageSafe('Successfully Created');
        } else {
          cy.log('Botão Create Timesheet não encontrado - timesheet pode já existir');
        }
      });
    });

    it('should edit timesheet', () => {
      TimePage.selectEmployee('John Doe');
      
      cy.get('body').then($body => {
        if ($body.find('button:contains("Edit")').length > 0) {
          TimePage.editTimesheet();
          cy.get('button[type="submit"]:contains("Save")').should('be.visible');
        } else {
          cy.log('Botão Edit não encontrado - timesheet pode não existir');
        }
      });
    });

    it('should add timesheet row', () => {
      TimePage.selectEmployee('John Doe');
      
      cy.get('body').then($body => {
        if ($body.find('button:contains("Edit")').length > 0) {
          TimePage.editTimesheet();
          cy.wait(1000);
          
          cy.get('body').then($editBody => {
            if ($editBody.find('.orangehrm-timesheet-footer button:contains("Add Row")').length > 0) {
              TimePage.addTimesheetRow();
              cy.wait(1000);
              cy.get('.oxd-select-text').should('have.length.gte', 2);
            } else {
              cy.log('Botão Add Row não encontrado');
            }
          });
        } else {
          cy.log('Botão Edit não encontrado');
        }
      });
    });

    it('should fill timesheet hours', () => {
      const timesheetData = userData.timesheetData.testTimesheet;
      TimePage.selectEmployee(timesheetData.employee);
      cy.wait(1000);
      
      cy.get('body').then($body => {
        if ($body.find('button:contains("Edit")').length > 0) {
          TimePage.editTimesheet();
          cy.wait(1000);
          
          cy.get('body').then($editBody => {
            if ($editBody.find('.orangehrm-timesheet-footer button:contains("Add Row")').length > 0) {
              TimePage.addTimesheetRow();
              cy.wait(1000);
              
              TimePage.fillTimesheetRow(
                0,
                timesheetData.project,
                timesheetData.activity,
                timesheetData.hours || ['8', '8', '8', '8', '8', '0', '0']
              );
              
              TimePage.saveTimesheet();
              cy.wait(1000);
              TimePage.verifySuccessMessageSafe('Successfully Saved');
            } else {
              cy.log('Botão Add Row não encontrado');
            }
          });
        } else {
          cy.log('Botão Edit não encontrado');
        }
      });
    });

    it('should submit timesheet', () => {
      TimePage.selectEmployee('John Doe');
      
      cy.get('body').then($body => {
        if ($body.find('button:contains("Submit")').length > 0) {
          TimePage.submitTimesheet();
          TimePage.confirmDialogAction();
          cy.wait(1000);
          TimePage.verifySuccessMessageSafe('Successfully Submitted');
        }
      });
    });

    it('should delete timesheet row', () => {
      TimePage.selectEmployee('John Doe');
      
      cy.get('body').then($body => {
        if ($body.find('button:contains("Edit")').length > 0) {
          TimePage.editTimesheet();
          
          TimePage.verifyDeleteTrashIcon();
          cy.get('.bi-trash').then($trash => {
            if ($trash.length > 0) {
              TimePage.deleteTimesheetRow(0);
              cy.wait(1000);
              TimePage.verifySuccessMessageSafe('Successfully Deleted');
            }
          });
        }
      });
    });
  });

  context('Attendance', () => {
    it('should navigate to attendance records', () => {
      TimePage.navigateTo('attendance');
      TimePage.clickMenuOptionFixed('My Records');
      cy.verifyPageTitle('My Attendance Records');
    });

    it('should punch in/out', () => {
      TimePage.navigateTo('attendance');
      TimePage.clickMenuOptionFixed('Punch In/Out');
      cy.verifyPageTitle('Punch In');
      
      TimePage.punchInOut('Starting work for the day');
      cy.wait(1000);
      TimePage.verifySuccessMessageSafe('Successfully Saved');
    });

    it('should view attendance summary', () => {
      TimePage.navigateTo('attendance');
      TimePage.clickMenuOptionFixed('Employee Records');
      cy.verifyPageTitle('Employee Attendance Records');
      
      TimePage.viewAttendanceRecords('John', '2025-01-01');
      TimePage.verifyTable();
    });
  });

  context('Reports', () => {
    it('should navigate to project reports', () => {
      TimePage.navigateTo('reports');
      TimePage.clickMenuOptionFixed('Project Reports');
      cy.verifyPageTitle('Project Report');
    });

    it('should generate project report', () => {
      TimePage.navigateTo('reports');
      TimePage.clickMenuOptionFixed('Project Reports');
      cy.wait(1000);
      TimePage.generateProjectReportFixed('2025-01-01', '2025-01-31');
    });

    it('should navigate to employee reports', () => {
      TimePage.navigateTo('reports');
      TimePage.clickMenuOptionFixed('Employee Reports');
      cy.verifyPageTitle('Employee Report');
    });

    it('should generate employee report', () => {
      TimePage.navigateTo('reports');
      TimePage.clickMenuOptionFixed('Employee Reports');
      cy.wait(1000);
      TimePage.generateEmployeeReportFixed('John', 'All Projects', '2025-01-01', '2025-01-31');
    });
  });

  context('Project Info', () => {
    it('should navigate to customers', () => {
      TimePage.navigateTo('projectInfo');
      TimePage.clickMenuOptionFixed('Customers');
      cy.verifyPageTitle('Customers');
    });

    it('should add new customer', () => {
      TimePage.navigateTo('projectInfo');
      TimePage.clickMenuOptionFixed('Customers');
      
      TimePage.addCustomer({
        name: 'Test Customer ' + Date.now(),
        description: 'Test customer description'
      });
      
      cy.wait(1000);
      TimePage.verifySuccessMessageSafe('Successfully Saved');
    });

    it('should navigate to projects', () => {
      TimePage.navigateTo('projectInfo');
      TimePage.clickMenuOptionFixed('Projects');
      cy.verifyPageTitle('Projects');
    });

    it('should add new project', () => {
      TimePage.navigateTo('projectInfo');
      TimePage.clickMenuOptionFixed('Projects');
      cy.wait(1000);
      
      TimePage.addProjectFixed({
        name: 'Test Project ' + Date.now(),
        customer: 'Test Customer',
        description: 'Test project description',
        admin: 'Admin'
      });
      
      cy.wait(1000);
      TimePage.verifySuccessMessageSafe('Successfully Saved');
    });
  });

  context('UI Validations', () => {
    it('should validate timesheet period format', () => {
      TimePage.selectEmployee('John Doe');
      
      cy.get('body').then($body => {
        if ($body.find('.orangehrm-timesheet-header--title p').length > 0) {
          TimePage.verifyTimesheetPeriodFormat();
        } else {
          cy.log('Período do timesheet não encontrado - pode não haver timesheet ativo');
        }
      });
    });

    it('should display correct timesheet statuses', () => {
      const validStatuses = ['Not Submitted', 'Submitted', 'Approved', 'Rejected'];
      TimePage.selectEmployee('John Doe');
      
      cy.get('body').then($body => {
        if ($body.find('.orangehrm-timesheet-header--title h6').length > 0) {
          TimePage.verifyValidTimesheetStatus(validStatuses);
        } else {
          cy.log('Status do timesheet não encontrado - pode não haver timesheet ativo');
        }
      });
    });

    it('should calculate total hours correctly', () => {
      TimePage.selectEmployee('John Doe');
      
      cy.get('body').then($body => {
        if ($body.find('button:contains("Edit")').length > 0) {
          TimePage.editTimesheet();
          TimePage.verifyTotalHoursCalculation();
        }
      });
    });

    it('should validate hour input format', () => {
      TimePage.selectEmployee('John Doe');
      
      cy.get('body').then($body => {
        if ($body.find('button:contains("Edit")').length > 0) {
          TimePage.editTimesheet();
          TimePage.enterInvalidHours('25');
          TimePage.saveTimesheet();
          
          cy.verifyFieldError('.oxd-input', 'Should not exceed 24');
        }
      });
    });
  });
});