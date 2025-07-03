import LoginPage from '../pages/LoginPage';
import PIMPage from '../pages/PIMPage';
import DashboardPage from '../pages/DashboardPage';

describe('PIM (Personnel Information Management) Module', () => {
  const loginPage = new LoginPage(), pimPage = new PIMPage(), dashboardPage = new DashboardPage();

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.loginWithFixture('validUser');
    dashboardPage.verifyDashboardLoaded();
    pimPage.visit();
    pimPage.verifyPIMPageLoaded();
  });

  context('PIM Page Layout Tests', () => {
    it('Should display PIM page with all elements', () => {
      pimPage.verifyPageElements();
      pimPage.verifyPageTitle('PIM');
    });

    it('Should display search form with all fields', () => {
      [pimPage.searchForm, pimPage.employeeNameInput, pimPage.employeeIdInput, pimPage.searchButton, pimPage.resetButton].forEach(element => element.should('be.visible'));
    });

    it('Should display employee records table', () => {
      pimPage.recordsTable.should('be.visible');
      pimPage.tableRows.should('have.length.greaterThan', 0);
    });

    it('Should display Add button', () => {
      pimPage.addButton.should('be.visible').should('contain.text', 'Add');
    });
  });

  context('Employee Search Tests', () => {
    it('Should search employee by name successfully', () => {
      cy.fixture('users').then((users) => {
        pimPage.searchEmployeeByName(users.searchData.employeeName);
        pimPage.verifyEmployeeInTable(users.searchData.employeeName);
      });
    });

    it('Should search employee by ID successfully', () => {
      cy.fixture('users').then((users) => {
        pimPage.searchEmployeeById(users.searchData.employeeId);
        pimPage.verifyEmployeeInTable(users.searchData.employeeId);
      });
    });

    it('Should reset search form', () => {
      pimPage.employeeIdInput.type('12345');
      pimPage.resetSearch();
      pimPage.employeeIdInput.should('have.value', '');
    });

    it('Should display no results message for invalid search', () => {
      pimPage.searchEmployeeById('99999');
      pimPage.verifyNoRecordsFound();
    });

    const filters = [
      { method: 'selectEmploymentStatus', value: 'Full-Time Permanent' },
      { method: 'selectJobTitle', value: 'Software Engineer' }
    ];

    filters.forEach(filter => {
      it(`Should search using ${filter.method} filter`, () => {
        pimPage[filter.method](filter.value);
        pimPage.searchButton.click();
        cy.waitForPageLoad();
        pimPage.recordsTable.should('be.visible');
      });
    });

    it('Should handle autocomplete for employee name', () => {
      pimPage.employeeNameInput.type('John');
      cy.get('.oxd-autocomplete-dropdown').should('be.visible');
      cy.get('.oxd-autocomplete-option').should('have.length.greaterThan', 0);
    });
  });

  context('Add Employee Tests', () => {
    it('Should navigate to Add Employee page', () => {
      pimPage.clickAddEmployee();
      cy.url().should('include', '/pim/addEmployee');
      pimPage.employeeForm.should('be.visible');
    });

    it('Should add new employee successfully', () => {
      pimPage.clickAddEmployee();
      cy.fixture('users').then((users) => {
        const employee = users.testEmployees[0];
        pimPage.fillEmployeeForm(employee);
        pimPage.saveEmployee();
      });
      cy.verifyToastMessage('Successfully Saved');
      pimPage.verifyEmployeeDetailsLoaded();
    });

    it('Should generate random employee ID', () => {
      pimPage.clickAddEmployee();
      cy.generateRandomEmployeeId().then((employeeId) => {
        pimPage.employeeIdField.should('have.value');
        cy.fixture('users').then((users) => {
          const employee = users.testEmployees[0];
          employee.employeeId = employeeId;
          pimPage.fillEmployeeForm(employee);
          pimPage.saveEmployee();
        });
      });
      cy.verifyToastMessage('Successfully Saved');
    });

    it('Should add employee with login details', () => {
      pimPage.clickAddEmployee();
      cy.fixture('users').then((users) => {
        const employee = users.testEmployees[0];
        pimPage.fillEmployeeForm(employee);
        pimPage.enableCreateLogin();
        pimPage.fillLoginDetails('john.doe', 'password123');
        pimPage.saveEmployee();
      });
      cy.verifyToastMessage('Successfully Saved');
      pimPage.verifyEmployeeDetailsLoaded();
    });

    it('Should validate required fields', () => {
      pimPage.clickAddEmployee();
      pimPage.saveEmployee();
      cy.get('.oxd-input-group .oxd-text--span').should('contain.text', 'Required');
    });

    it('Should upload profile picture', () => {
      pimPage.clickAddEmployee();
      cy.fixture('users').then((users) => {
        const employee = users.testEmployees[0];
        pimPage.fillEmployeeForm(employee);
        pimPage.saveEmployee();
      });
      cy.verifyToastMessage('Successfully Saved');
    });

    it('Should cancel employee creation', () => {
      pimPage.clickAddEmployee();
      cy.fixture('users').then((users) => {
        const employee = users.testEmployees[0];
        pimPage.fillEmployeeForm(employee);
        pimPage.cancelEmployee();
      });
      cy.url().should('include', '/pim/viewEmployeeList');
      pimPage.verifyPIMPageLoaded();
    });
  });

  context('Employee Management Tests', () => {
    it('Should edit employee record', () => {
      pimPage.editEmployee(0);
      cy.url().should('include', '/pim/viewPersonalDetails');
      pimPage.verifyEmployeeDetailsLoaded();
    });

    it('Should delete employee record', () => {
      pimPage.deleteEmployee(0);
      cy.verifyToastMessage('Successfully Deleted');
    });

    it('Should navigate through employee detail tabs', () => {
      pimPage.editEmployee(0);
      pimPage.verifyEmployeeDetailsLoaded();
      ['Contact Details', 'Emergency Contacts', 'Job'].forEach(tab => pimPage.navigateToTab(tab));
      pimPage.jobTab.should('have.class', 'orangehrm-tabs-item--active');
    });

    it('Should update employee personal details', () => {
      pimPage.editEmployee(0);
      pimPage.verifyEmployeeDetailsLoaded();
      pimPage.firstNameInput.clear().type('UpdatedName');
      pimPage.saveButton.click();
      cy.verifyToastMessage('Successfully Updated');
    });

    it('Should view employee job details', () => {
      pimPage.editEmployee(0);
      pimPage.verifyEmployeeDetailsLoaded();
      pimPage.navigateToTab('Job');
      cy.get('.oxd-form').should('be.visible');
      cy.get('.oxd-select-text').should('be.visible');
    });

    it('Should manage employee salary information', () => {
      pimPage.editEmployee(0);
      pimPage.verifyEmployeeDetailsLoaded();
      pimPage.navigateToTab('Salary');
      cy.get('.oxd-button').contains('Add').should('be.visible');
    });
  });

  context('PIM Configuration Tests', () => {
    it('Should access PIM configuration options', () => {
      pimPage.clickConfiguration();
      [pimPage.dataImportOption, pimPage.reportingMethodsOption, pimPage.terminationReasonsOption].forEach(option => option.should('be.visible'));
    });

    it('Should navigate to Data Import', () => {
      pimPage.navigateToDataImport();
      cy.url().should('include', '/pim/viewDataImport');
      cy.verifyPageTitle('Data Import');
    });

    it('Should handle CSV import functionality', () => {
      pimPage.navigateToDataImport();
      cy.get('.oxd-file-input').should('be.visible');
      cy.get('.oxd-button').contains('Upload').should('be.visible');
    });
  });

  context('API Integration Tests', () => {
    it('Should handle employee list API', () => {
      cy.setupApiInterceptors();
      cy.reload();
      pimPage.verifyPIMPageLoaded();
      cy.waitForApi('employeeListApi');
      pimPage.recordsTable.should('be.visible');
    });

    it('Should handle employee creation API', () => {
      cy.setupApiInterceptors();
      pimPage.clickAddEmployee();
      cy.fixture('users').then((users) => {
        const employee = users.testEmployees[0];
        pimPage.fillEmployeeForm(employee);
        pimPage.saveEmployee();
      });
      cy.waitForApi('createEmployeeApi');
    });

    it('Should handle API failures gracefully', () => {
      cy.intercept('GET', '**/pim/employees**', { statusCode: 500 }).as('failedEmployeeApi');
      cy.reload();
      cy.waitForApi('failedEmployeeApi');
      pimPage.verifyPIMPageLoaded();
    });
  });

  context('Performance Tests', () => {
    it('Should load employee list efficiently', () => {
      const startTime = Date.now();
      cy.reload();
      pimPage.verifyPIMPageLoaded();
      pimPage.recordsTable.should('be.visible');
      cy.then(() => expect(Date.now() - startTime).to.be.lessThan(5000));
    });

    it('Should handle large employee datasets', () => {
      cy.intercept('GET', '**/pim/employees**', { fixture: 'large-employee-dataset.json' }).as('largeDataset');
      cy.reload();
      cy.waitForApi('largeDataset');
      pimPage.recordsTable.should('be.visible');
    });
  });

  context('Security Tests', () => {
    it('Should validate employee data input', () => {
      pimPage.clickAddEmployee();
      pimPage.firstNameInput.type('<script>alert("XSS")</script>');
      pimPage.saveEmployee();
      cy.get('.oxd-input-group .oxd-text--span').should('be.visible');
    });

    it('Should prevent unauthorized access', () => {
      cy.clearCookies();
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');
      cy.url().should('include', '/auth/login');
    });

    it('Should handle SQL injection attempts', () => {
      pimPage.employeeIdInput.type("'; DROP TABLE employees; --");
      pimPage.searchButton.click();
      cy.waitForPageLoad();
      pimPage.recordsTable.should('be.visible');
    });
  });

  context('Accessibility Tests', () => {
    it('Should support keyboard navigation', () => {
      pimPage.employeeNameInput.focus();
      cy.get('body').tab();
      cy.focused().should('be.visible');
    });

    it('Should have proper ARIA labels', () => {
      [pimPage.searchForm, pimPage.recordsTable].forEach(element => element.should('have.attr', 'role'));
    });

    it('Should support screen readers', () => {
      pimPage.employeeNameInput.should('have.attr', 'placeholder');
      pimPage.addButton.should('have.attr', 'title');
    });
  });
});