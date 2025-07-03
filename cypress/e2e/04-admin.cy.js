import LoginPage from '../pages/LoginPage';
import AdminPage from '../pages/AdminPage';
import DashboardPage from '../pages/DashboardPage';

describe('Admin Module Functionality', () => {
  const loginPage = new LoginPage(), adminPage = new AdminPage(), dashboardPage = new DashboardPage();

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.loginWithFixture('validUser');
    dashboardPage.verifyDashboardLoaded();
    adminPage.visit();
    adminPage.verifyAdminPageLoaded();
  });

  context('Admin Page Layout Tests', () => {
    it('Should display Admin page with all elements', () => {
      adminPage.verifyPageElements();
      adminPage.verifyPageTitle('Admin');
    });

    it('Should display admin menu items', () => {
      adminPage.verifyAdminMenuItems();
    });

    it('Should display user management table', () => {
      adminPage.recordsTable.should('be.visible');
      adminPage.tableRows.should('have.length.greaterThan', 0);
    });

    it('Should display search form', () => {
      adminPage.searchForm.should('be.visible');
      adminPage.usernameSearchInput.should('be.visible');
      adminPage.userRoleDropdown.should('be.visible');
      adminPage.statusDropdown.should('be.visible');
    });
  });

  context('User Search Tests', () => {
    it('Should search user by username', () => {
      adminPage.searchUserByUsername('Admin');
      adminPage.verifyUserInTable('Admin');
    });

    it('Should search user by employee name', () => {
      adminPage.searchUserByEmployeeName('Admin');
      adminPage.recordsTable.should('be.visible');
    });

    ['Admin', 'Enabled'].forEach(filter => {
      it(`Should filter by ${filter.toLowerCase()}`, () => {
        if (filter === 'Admin') {
          adminPage.selectUserRole(filter);
        } else {
          adminPage.selectUserStatus(filter);
        }
        adminPage.searchButton.click();
        cy.waitForPageLoad();
        adminPage.recordsTable.should('be.visible');
      });
    });

    it('Should reset search filters', () => {
      adminPage.searchUserByUsername('Admin');
      adminPage.selectUserRole('Admin');
      adminPage.resetSearch();
      adminPage.usernameSearchInput.should('have.value', '');
    });

    it('Should display no results for invalid search', () => {
      adminPage.searchUserByUsername('NonExistentUser');
      adminPage.verifyNoRecordsFound();
    });

    it('Should handle autocomplete for employee name', () => {
      adminPage.employeeNameInput.type('Admin');
      cy.get('.oxd-autocomplete-dropdown').should('be.visible');
      cy.get('.oxd-autocomplete-option').should('have.length.greaterThan', 0);
    });
  });

  context('Add User Tests', () => {
    it('Should navigate to Add User page', () => {
      adminPage.clickAddUser();
      cy.url().should('include', '/admin/saveSystemUser');
      adminPage.userRoleSelect.should('be.visible');
    });

    it('Should add new user successfully', () => {
      adminPage.clickAddUser();
      const userData = {
        userRole: 'Admin',
        employeeName: 'Admin',
        status: 'Enabled',
        username: 'newuser123',
        password: 'Password123!'
      };
      adminPage.fillAddUserForm(userData);
      adminPage.saveUser();
      cy.verifyToastMessage('Successfully Saved');
    });

    it('Should validate required fields', () => {
      adminPage.clickAddUser();
      adminPage.saveUser();
      cy.get('.oxd-input-group .oxd-text--span').should('contain.text', 'Required');
    });

    it('Should validate username uniqueness', () => {
      adminPage.clickAddUser();
      const userData = {
        userRole: 'Admin',
        employeeName: 'Admin',
        status: 'Enabled',
        username: 'Admin',
        password: 'Password123!'
      };
      adminPage.fillAddUserForm(userData);
      adminPage.saveUser();
      cy.get('.oxd-input-group .oxd-text--span').should('contain.text', 'Already exists');
    });

    it('Should validate password strength', () => {
      adminPage.clickAddUser();
      const userData = {
        userRole: 'Admin',
        employeeName: 'Admin',
        status: 'Enabled',
        username: 'newuser456',
        password: '123'
      };
      adminPage.fillAddUserForm(userData);
      adminPage.saveUser();
      cy.get('.oxd-input-group .oxd-text--span').should('contain.text', 'Should have at least 7 characters');
    });

    it('Should cancel user creation', () => {
      adminPage.clickAddUser();
      const userData = {
        userRole: 'Admin',
        employeeName: 'Admin',
        status: 'Enabled',
        username: 'canceluser',
        password: 'Password123!'
      };
      adminPage.fillAddUserForm(userData);
      adminPage.cancelUser();
      cy.url().should('include', '/admin/viewSystemUsers');
      adminPage.verifyAdminPageLoaded();
    });
  });

  context('User Management Tests', () => {
    it('Should edit user record', () => {
      adminPage.editUser(0);
      cy.url().should('include', '/admin/saveSystemUser');
      adminPage.userRoleSelect.should('be.visible');
    });

    it('Should delete user record', () => {
      adminPage.deleteUser(0);
      cy.verifyToastMessage('Successfully Deleted');
    });

    ['Disabled', 'ESS'].forEach((value, index) => {
      it(`Should update user ${index === 0 ? 'status' : 'role'}`, () => {
        adminPage.editUser(0);
        if (index === 0) {
          adminPage.selectUserStatus(value);
        } else {
          adminPage.selectUserRole(value);
        }
        adminPage.saveUser();
        cy.verifyToastMessage('Successfully Updated');
      });
    });
  });

  context('User Management Navigation Tests', () => {
    const navTests = [
      { name: 'User Management', method: 'navigateToUserManagement', url: '/admin/viewSystemUsers', title: null },
      { name: 'Job Titles', method: 'navigateToJobTitles', url: '/admin/viewJobTitleList', title: 'Job Titles' },
      { name: 'Pay Grades', method: 'navigateToPayGrades', url: '/admin/viewPayGrades', title: 'Pay Grades' },
      { name: 'Employment Status', method: 'navigateToEmploymentStatus', url: '/admin/employmentStatus', title: 'Employment Status' },
      { name: 'Job Categories', method: 'navigateToJobCategories', url: '/admin/jobCategory', title: 'Job Categories' },
      { name: 'Work Shifts', method: 'navigateToWorkShifts', url: '/admin/workShift', title: 'Work Shifts' },
      { name: 'Nationalities', method: 'navigateToNationalities', url: '/admin/nationality', title: 'Nationalities' },
      { name: 'Corporate Branding', method: 'navigateToCorporateBranding', url: '/admin/viewThemes', title: 'Corporate Branding' },
      { name: 'Configuration', method: 'navigateToConfiguration', url: '/admin/viewConfigurationList', title: 'Configuration' }
    ];

    navTests.forEach(test => {
      it(`Should navigate to ${test.name}`, () => {
        adminPage[test.method]();
        cy.url().should('include', test.url);
        if (test.title) {
          cy.verifyPageTitle(test.title);
        } else {
          adminPage.verifyAdminPageLoaded();
        }
      });
    });
  });

  context('Job Title Management Tests', () => {
    it('Should add new job title', () => {
      adminPage.navigateToJobTitles();
      cy.clickButton('Add');
      cy.get('[name="jobTitle"]').type('Test Engineer');
      cy.get('[name="jobDescription"]').type('Testing and quality assurance');
      cy.clickButton('Save');
      cy.verifyToastMessage('Successfully Saved');
    });

    it('Should edit job title', () => {
      adminPage.navigateToJobTitles();
      cy.get('.oxd-table-row').first().within(() => {
        cy.get('.oxd-icon-button').eq(1).click();
      });
      cy.get('[name="jobTitle"]').clear().type('Updated Job Title');
      cy.clickButton('Save');
      cy.verifyToastMessage('Successfully Updated');
    });

    it('Should delete job title', () => {
      adminPage.navigateToJobTitles();
      cy.get('.oxd-table-row').first().within(() => {
        cy.get('.oxd-icon-button').eq(2).click();
      });
      cy.clickButton('Yes, Delete');
      cy.verifyToastMessage('Successfully Deleted');
    });
  });

  context('Pay Grade Management Tests', () => {
    it('Should add new pay grade', () => {
      adminPage.navigateToPayGrades();
      cy.clickButton('Add');
      cy.get('[name="name"]').type('Grade A');
      cy.clickButton('Save');
      cy.verifyToastMessage('Successfully Saved');
    });

    it('Should add currencies to pay grade', () => {
      adminPage.navigateToPayGrades();
      cy.get('.oxd-table-row').first().within(() => {
        cy.get('.oxd-icon-button').eq(1).click();
      });
      cy.clickButton('Add');
      cy.selectDropdownOption('.oxd-select-text', 'USD - United States Dollar');
      cy.get('[name="minSalary"]').type('50000');
      cy.get('[name="maxSalary"]').type('100000');
      cy.clickButton('Save');
      cy.verifyToastMessage('Successfully Saved');
    });
  });

  context('Employment Status Management Tests', () => {
    it('Should add new employment status', () => {
      adminPage.navigateToEmploymentStatus();
      cy.clickButton('Add');
      cy.get('[name="name"]').type('Contract');
      cy.clickButton('Save');
      cy.verifyToastMessage('Successfully Saved');
    });

    it('Should edit employment status', () => {
      adminPage.navigateToEmploymentStatus();
      cy.get('.oxd-table-row').first().within(() => {
        cy.get('.oxd-icon-button').eq(1).click();
      });
      cy.get('[name="name"]').clear().type('Updated Status');
      cy.clickButton('Save');
      cy.verifyToastMessage('Successfully Updated');
    });
  });

  context('Security Tests', () => {
    it('Should validate user input for XSS', () => {
      adminPage.clickAddUser();
      const userData = {
        userRole: 'Admin',
        employeeName: 'Admin',
        status: 'Enabled',
        username: '<script>alert("XSS")</script>',
        password: 'Password123!'
      };
      adminPage.fillAddUserForm(userData);
      adminPage.saveUser();
      cy.get('.oxd-input-group .oxd-text--span').should('be.visible');
    });

    it('Should prevent unauthorized access', () => {
      cy.clearCookies();
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
      cy.url().should('include', '/auth/login');
    });

    it('Should validate password confirmation', () => {
      adminPage.clickAddUser();
      adminPage.userRoleSelect.click();
      cy.get('.oxd-select-option').contains('Admin').click();
      adminPage.employeeNameField.type('Admin');
      cy.get('.oxd-autocomplete-option').first().click();
      adminPage.statusSelect.click();
      cy.get('.oxd-select-option').contains('Enabled').click();
      adminPage.usernameField.type('testuser');
      adminPage.passwordField.type('Password123!');
      adminPage.confirmPasswordField.type('DifferentPassword');
      adminPage.saveUser();
      cy.get('.oxd-input-group .oxd-text--span').should('contain.text', 'Passwords do not match');
    });
  });

  context('Performance Tests', () => {
    it('Should load Admin page efficiently', () => {
      const startTime = Date.now();
      cy.reload();
      adminPage.verifyAdminPageLoaded();
      cy.then(() => {
        const loadTime = Date.now() - startTime;
        expect(loadTime).to.be.lessThan(5000);
      });
    });

    it('Should handle large user datasets', () => {
      cy.intercept('GET', '**/admin/users**', {
        body: {
          data: Array(100).fill({
            id: 1,
            username: 'testuser',
            role: 'Admin',
            status: 'Enabled'
          })
        }
      }).as('largeUserDataset');
      cy.reload();
      cy.wait('@largeUserDataset');
      adminPage.recordsTable.should('be.visible');
    });
  });

  context('Accessibility Tests', () => {
    it('Should support keyboard navigation', () => {
      adminPage.usernameSearchInput.focus();
      cy.get('body').tab();
      cy.focused().should('be.visible');
    });

    it('Should have proper ARIA labels', () => {
      adminPage.searchForm.should('have.attr', 'role');
      adminPage.recordsTable.should('have.attr', 'role');
    });

    it('Should support screen readers', () => {
      adminPage.addButton.should('have.text', 'Add');
      adminPage.searchButton.should('have.attr', 'type', 'submit');
    });
  });
});