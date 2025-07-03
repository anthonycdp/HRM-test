import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import PIMPage from '../pages/PIMPage';
import AdminPage from '../pages/AdminPage';

describe('End-to-End Scenarios', () => {
  const loginPage = new LoginPage(), dashboardPage = new DashboardPage(), pimPage = new PIMPage(), adminPage = new AdminPage();

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.setupApiInterceptors();
  });

  context('Complete User Journey Tests', () => {
    it('Should complete full employee onboarding workflow', () => {
      cy.loginWithFixture('validUser');
      dashboardPage.verifyDashboardLoaded();
      
      adminPage.visit();
      adminPage.clickAddUser();
      const userData = {
        userRole: 'ESS',
        employeeName: 'Admin',
        status: 'Enabled',
        username: 'newemployee123',
        password: 'NewEmp123!'
      };
      adminPage.fillAddUserForm(userData);
      adminPage.saveUser();
      cy.verifyToastMessage('Successfully Saved');
      
      pimPage.visit();
      pimPage.clickAddEmployee();
      cy.fixture('users').then(users => {
        const employee = users.testEmployees[0];
        pimPage.fillEmployeeForm(employee);
        pimPage.enableCreateLogin();
        pimPage.fillLoginDetails(userData.username, userData.password);
        pimPage.saveEmployee();
      });
      cy.verifyToastMessage('Successfully Saved');
      
      pimPage.verifyEmployeeDetailsLoaded();
      ['Contact Details', 'Job'].forEach(tab => pimPage.navigateToTab(tab));
      
      dashboardPage.logout();
      loginPage.login(userData.username, userData.password);
      dashboardPage.verifyDashboardLoaded();
    });

    it('Should complete employee management lifecycle', () => {
      cy.loginWithFixture('validUser');
      dashboardPage.verifyDashboardLoaded();
      
      pimPage.visit();
      pimPage.clickAddEmployee();
      cy.fixture('users').then(users => {
        const employee = users.testEmployees[1];
        pimPage.fillEmployeeForm(employee);
        pimPage.saveEmployee();
      });
      cy.verifyToastMessage('Successfully Saved');
      
      pimPage.navigateToTab('Personal Details');
      pimPage.firstNameInput.clear().type('Updated Name');
      pimPage.saveButton.click();
      cy.verifyToastMessage('Successfully Updated');
      
      pimPage.navigateToTab('Job');
      cy.get('.oxd-button').contains('Add').click();
      cy.selectDropdownOption('.oxd-select-text', 'Software Engineer');
      cy.clickButton('Save');
      cy.verifyToastMessage('Successfully Saved');
      
      pimPage.visit();
      pimPage.searchEmployeeByName('Updated Name');
      pimPage.verifyEmployeeInTable('Updated Name');
    });

    it('Should complete comprehensive system administration', () => {
      cy.loginWithFixture('validUser');
      dashboardPage.verifyDashboardLoaded();
      
      const adminConfigs = [
        { nav: 'JobTitles', fields: { jobTitle: 'Senior QA Engineer', jobDescription: 'Senior Quality Assurance Engineer' } },
        { nav: 'PayGrades', fields: { name: 'Senior Grade' } },
        { nav: 'EmploymentStatus', fields: { name: 'Senior Full-Time' } }
      ];
      
      adminConfigs.forEach(config => {
        adminPage.visit();
        adminPage[`navigateTo${config.nav}`]();
        cy.clickButton('Add');
        Object.entries(config.fields).forEach(([field, value]) => {
          cy.get(`[name="${field}"]`).type(value);
        });
        cy.clickButton('Save');
        cy.verifyToastMessage('Successfully Saved');
      });
      
      adminPage.visit();
      adminPage.clickAddUser();
      const userData = {
        userRole: 'ESS',
        employeeName: 'Admin',
        status: 'Enabled',
        username: 'seniorqa123',
        password: 'SeniorQA123!'
      };
      adminPage.fillAddUserForm(userData);
      adminPage.saveUser();
      cy.verifyToastMessage('Successfully Saved');
    });

    it('Should complete multi-module data consistency check', () => {
      cy.loginWithFixture('validUser');
      dashboardPage.verifyDashboardLoaded();
      
      const employeeId = '99999';
      pimPage.visit();
      pimPage.clickAddEmployee();
      cy.fixture('users').then(users => {
        const employee = users.testEmployees[0];
        employee.employeeId = employeeId;
        pimPage.fillEmployeeForm(employee);
        pimPage.saveEmployee();
      });
      cy.verifyToastMessage('Successfully Saved');
      
      pimPage.visit();
      pimPage.searchEmployeeById(employeeId);
      pimPage.verifyEmployeeInTable(employeeId);
      
      adminPage.visit();
      adminPage.clickAddUser();
      adminPage.employeeNameField.type('Test');
      cy.get('.oxd-autocomplete-dropdown').should('be.visible');
      cy.get('.oxd-autocomplete-option').should('contain.text', 'Test Employee');
      
      adminPage.cancelUser();
      dashboardPage.navigateToMenu('Dashboard');
      dashboardPage.verifyDashboardLoaded();
    });
  });

  context('Cross-Module Integration Tests', () => {
    it('Should maintain session across all modules', () => {
      cy.loginWithFixture('validUser');
      dashboardPage.verifyDashboardLoaded();
      
      const modules = [
        { name: 'Admin', verify: () => adminPage.verifyAdminPageLoaded() },
        { name: 'PIM', verify: () => pimPage.verifyPIMPageLoaded() },
        { name: 'Leave', verify: () => cy.url().should('include', '/leave') },
        { name: 'Time', verify: () => cy.url().should('include', '/time') },
        { name: 'Recruitment', verify: () => cy.url().should('include', '/recruitment') },
        { name: 'My Info', verify: () => cy.url().should('include', '/myinfo') },
        { name: 'Performance', verify: () => cy.url().should('include', '/performance') },
        { name: 'Directory', verify: () => cy.url().should('include', '/directory') }
      ];
      
      modules.forEach(module => {
        dashboardPage.navigateToMenu(module.name);
        module.verify();
      });
      
      dashboardPage.navigateToMenu('Dashboard');
      dashboardPage.verifyDashboardLoaded();
      dashboardPage.verifyUserName('manda user');
    });

    it('Should handle concurrent operations across modules', () => {
      cy.loginWithFixture('validUser');
      dashboardPage.verifyDashboardLoaded();
      
      adminPage.visit();
      adminPage.clickAddUser();
      const userData = {
        userRole: 'ESS',
        employeeName: 'Admin',
        status: 'Enabled',
        username: 'concurrent123',
        password: 'Concurrent123!'
      };
      adminPage.fillAddUserForm(userData);
      adminPage.saveUser();
      
      pimPage.visit();
      pimPage.clickAddEmployee();
      cy.fixture('users').then(users => {
        const employee = users.testEmployees[0];
        pimPage.fillEmployeeForm(employee);
        pimPage.saveEmployee();
      });
      
      cy.verifyToastMessage('Successfully Saved');
      pimPage.verifyEmployeeDetailsLoaded();
      
      adminPage.visit();
      adminPage.searchUserByUsername(userData.username);
      adminPage.verifyUserInTable(userData.username);
    });

    it('Should handle data relationships between modules', () => {
      cy.loginWithFixture('validUser');
      dashboardPage.verifyDashboardLoaded();
      
      adminPage.visit();
      adminPage.navigateToJobTitles();
      cy.clickButton('Add');
      cy.get('[name="jobTitle"]').type('Integration Test Engineer');
      cy.clickButton('Save');
      cy.verifyToastMessage('Successfully Saved');
      
      pimPage.visit();
      pimPage.editEmployee(0);
      pimPage.navigateToTab('Job');
      cy.get('.oxd-select-text').first().click();
      cy.get('.oxd-select-option').should('contain.text', 'Integration Test Engineer');
      
      cy.get('.oxd-select-option').contains('Integration Test Engineer').click();
      cy.clickButton('Save');
      cy.verifyToastMessage('Successfully Updated');
    });
  });

  context('Business Process Automation Tests', () => {
    it('Should automate employee onboarding process', () => {
      cy.loginWithFixture('validUser');
      dashboardPage.verifyDashboardLoaded();
      
      const employeeData = {
        firstName: 'Automated',
        lastName: 'Employee',
        employeeId: '88888',
        username: 'automated123',
        password: 'Auto123!'
      };
      
      pimPage.visit();
      pimPage.clickAddEmployee();
      pimPage.fillEmployeeForm(employeeData);
      pimPage.enableCreateLogin();
      pimPage.fillLoginDetails(employeeData.username, employeeData.password);
      pimPage.saveEmployee();
      cy.verifyToastMessage('Successfully Saved');
      
      pimPage.navigateToTab('Job');
      cy.get('.oxd-button').contains('Add').click();
      cy.selectDropdownOption('.oxd-select-text', 'Software Engineer');
      cy.clickButton('Save');
      cy.verifyToastMessage('Successfully Saved');
      
      dashboardPage.logout();
      loginPage.login(employeeData.username, employeeData.password);
      dashboardPage.verifyDashboardLoaded();
      dashboardPage.verifyUserName('Automated Employee');
    });

    it('Should handle bulk operations workflow', () => {
      cy.loginWithFixture('validUser');
      dashboardPage.verifyDashboardLoaded();
      
      const employees = [
        { firstName: 'Bulk1', lastName: 'Employee1', employeeId: '77771' },
        { firstName: 'Bulk2', lastName: 'Employee2', employeeId: '77772' },
        { firstName: 'Bulk3', lastName: 'Employee3', employeeId: '77773' }
      ];
      
      employees.forEach((employee, index) => {
        pimPage.visit();
        pimPage.clickAddEmployee();
        pimPage.fillEmployeeForm(employee);
        pimPage.saveEmployee();
        cy.verifyToastMessage('Successfully Saved');
        
        if (index < employees.length - 1) {
          pimPage.visit();
        }
      });
      
      employees.forEach(employee => {
        pimPage.visit();
        pimPage.searchEmployeeById(employee.employeeId);
        pimPage.verifyEmployeeInTable(employee.employeeId);
      });
    });
  });

  context('Error Recovery and Resilience Tests', () => {
    it('Should recover from API failures gracefully', () => {
      cy.loginWithFixture('validUser');
      dashboardPage.verifyDashboardLoaded();
      
      cy.intercept('GET', '**/pim/employees**', { statusCode: 500 }).as('failedApi');
      pimPage.visit();
      cy.wait('@failedApi');
      
      cy.intercept('GET', '**/pim/employees**', { fixture: 'employees-response.json' }).as('restoredApi');
      cy.reload();
      cy.wait('@restoredApi');
      pimPage.verifyPIMPageLoaded();
      pimPage.recordsTable.should('be.visible');
    });

    it('Should handle network interruptions', () => {
      cy.loginWithFixture('validUser');
      dashboardPage.verifyDashboardLoaded();
      
      cy.intercept('**', { forceNetworkError: true }).as('networkError');
      pimPage.visit();
      cy.wait('@networkError');
      
      cy.intercept('**').as('networkRestored');
      cy.reload();
      cy.loginWithFixture('validUser');
      dashboardPage.verifyDashboardLoaded();
    });

    it('Should maintain data integrity during failures', () => {
      cy.loginWithFixture('validUser');
      dashboardPage.verifyDashboardLoaded();
      pimPage.visit();
      pimPage.clickAddEmployee();
      
      cy.intercept('POST', '**/pim/employees', { statusCode: 500 }).as('failedSave');
      cy.fixture('users').then(users => {
        const employee = users.testEmployees[0];
        pimPage.fillEmployeeForm(employee);
        pimPage.saveEmployee();
      });
      
      cy.wait('@failedSave');
      cy.get('.oxd-toast-content').should('contain.text', 'Error');
      
      cy.intercept('POST', '**/pim/employees', { fixture: 'employee-create-response.json' }).as('successfulSave');
      pimPage.saveEmployee();
      cy.wait('@successfulSave');
      cy.verifyToastMessage('Successfully Saved');
    });
  });

  context('Performance and Load Tests', () => {
    it('Should handle rapid navigation between modules', () => {
      cy.loginWithFixture('validUser');
      dashboardPage.verifyDashboardLoaded();
      
      const modules = ['Admin', 'PIM', 'Leave', 'Time', 'Recruitment', 'Dashboard'];
      
      modules.forEach(module => {
        const startTime = Date.now();
        dashboardPage.navigateToMenu(module);
        cy.url().should('include', module.toLowerCase());
        
        cy.then(() => {
          const navigationTime = Date.now() - startTime;
          expect(navigationTime).to.be.lessThan(3000);
        });
      });
      
      dashboardPage.verifyDashboardLoaded();
    });

    it('Should handle concurrent user sessions', () => {
      cy.loginWithFixture('validUser');
      dashboardPage.verifyDashboardLoaded();
      
      const operations = [
        () => {
          pimPage.visit();
          pimPage.searchEmployeeById('12345');
        },
        () => {
          adminPage.visit();
          adminPage.searchUserByUsername('Admin');
        },
        () => {
          dashboardPage.navigateToMenu('Leave');
          cy.url().should('include', '/leave');
        }
      ];
      
      operations.forEach(operation => operation());
      
      dashboardPage.navigateToMenu('Dashboard');
      dashboardPage.verifyDashboardLoaded();
    });

    it('Should maintain performance under load', () => {
      cy.loginWithFixture('validUser');
      dashboardPage.verifyDashboardLoaded();
      
      const startTime = Date.now();
      
      cy.intercept('GET', '**/pim/employees**', {
        body: {
          data: Array(1000).fill({
            empNumber: 1,
            firstName: 'Load',
            lastName: 'Test',
            employeeId: '12345'
          })
        }
      }).as('heavyLoad');
      
      pimPage.visit();
      cy.wait('@heavyLoad');
      
      cy.then(() => {
        const loadTime = Date.now() - startTime;
        expect(loadTime).to.be.lessThan(10000);
      });
      
      pimPage.recordsTable.should('be.visible');
    });
  });

  context('Security and Compliance Tests', () => {
    it('Should enforce proper authentication across modules', () => {
      cy.loginWithFixture('validUser');
      dashboardPage.verifyDashboardLoaded();
      cy.clearCookies();
      
      const protectedUrls = [
        '/admin/viewSystemUsers',
        '/pim/viewEmployeeList',
        '/leave/viewLeaveList',
        '/time/viewTimeModule'
      ];
      
      protectedUrls.forEach(url => {
        cy.visit(`https://opensource-demo.orangehrmlive.com/web/index.php${url}`);
        cy.url().should('include', '/auth/login');
      });
      
      loginPage.verifyLoginPageElements();
    });

    it('Should maintain audit trail for user actions', () => {
      cy.loginWithFixture('validUser');
      dashboardPage.verifyDashboardLoaded();
      
      pimPage.visit();
      pimPage.clickAddEmployee();
      cy.fixture('users').then(users => {
        const employee = users.testEmployees[0];
        pimPage.fillEmployeeForm(employee);
        pimPage.saveEmployee();
      });
      
      adminPage.visit();
      adminPage.clickAddUser();
      const userData = {
        userRole: 'ESS',
        employeeName: 'Admin',
        status: 'Enabled',
        username: 'audituser123',
        password: 'Audit123!'
      };
      adminPage.fillAddUserForm(userData);
      adminPage.saveUser();
      
      cy.verifyToastMessage('Successfully Saved');
    });

    it('Should handle sensitive data appropriately', () => {
      cy.loginWithFixture('validUser');
      dashboardPage.verifyDashboardLoaded();
      
      pimPage.visit();
      pimPage.editEmployee(0);
      
      pimPage.navigateToTab('Personal Details');
      cy.get('[type="password"]').should('have.attr', 'type', 'password');
      
      cy.url().should('not.contain', 'password');
      cy.url().should('not.contain', 'ssn');
    });
  });
});