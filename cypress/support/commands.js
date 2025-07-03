Cypress.Commands.add('login', (username, password) => {
  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  cy.get('body', { timeout: 15000 }).should('be.visible');
  cy.get('[name="username"]', { timeout: 15000 }).should('be.visible').clear().type(username);
  cy.get('[name="password"]', { timeout: 15000 }).should('be.visible').clear().type(password);
  cy.get('[type="submit"]', { timeout: 15000 }).should('be.visible').click();
  cy.wait(3000);
});

Cypress.Commands.add('loginWithFixture', userType => {
  cy.fixture('users').then(users => {
    const user = users[userType];
    cy.login(user.username, user.password);
  });
});

Cypress.Commands.add('navigateToMenu', menuItem => {
  cy.get('.oxd-main-menu-item').contains(menuItem).click();
  cy.url().should('include', menuItem.toLowerCase());
});

Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible');
  cy.wait(1000);
  cy.get('body').then($body => {
    if ($body.find('.oxd-loading-spinner').length > 0) {
      cy.get('.oxd-loading-spinner').should('not.exist');
    }
  });
});

Cypress.Commands.add('logout', () => {
  cy.get('.oxd-userdropdown-tab').click();
  cy.get('[role="menuitem"]').contains('Logout').click();
  cy.url().should('include', '/auth/login');
});

Cypress.Commands.add('fillEmployeeForm', employeeData => {
  const fields = [
    { key: 'firstName', selector: '[name="firstName"]' },
    { key: 'lastName', selector: '[name="lastName"]' },
    { key: 'employeeId', selector: '[name="employeeId"]' }
  ];
  fields.forEach(field => {
    if (employeeData[field.key]) {
      cy.get(field.selector).clear().type(employeeData[field.key]);
    }
  });
});

Cypress.Commands.add('searchEmployee', employeeName => {
  cy.get('[placeholder="Type for hints..."]').clear().type(employeeName);
  cy.get('.oxd-autocomplete-dropdown').should('be.visible');
  cy.get('.oxd-autocomplete-option').first().click();
});

Cypress.Commands.add('verifyToastMessage', message => {
  cy.get('.oxd-toast-content').should('be.visible').and('contain.text', message);
});

Cypress.Commands.add('selectDropdownOption', (dropdownSelector, optionText) => {
  cy.get(dropdownSelector).click();
  cy.get('.oxd-select-dropdown').should('be.visible');
  cy.get('.oxd-select-option').contains(optionText).click();
});

Cypress.Commands.add('uploadFile', (fileSelector, fileName) => {
  cy.get(fileSelector).selectFile(`cypress/fixtures/${fileName}`, { force: true });
});

Cypress.Commands.add('verifyTableContains', (tableSelector, searchText) => {
  cy.get(tableSelector).should('be.visible');
  cy.get(`${tableSelector} .oxd-table-row`).should('contain.text', searchText);
});

Cypress.Commands.add('clickButton', buttonText => {
  cy.get('button').contains(buttonText).click();
});

Cypress.Commands.add('verifyPageTitle', expectedTitle => {
  cy.get('.oxd-topbar-header-breadcrumb h6').should('contain.text', expectedTitle);
});

Cypress.Commands.add('generateRandomEmployeeId', () => {
  const randomId = Math.floor(Math.random() * 10000) + 1000;
  return cy.wrap(randomId.toString());
});

Cypress.Commands.add('setupApiInterceptors', () => {
  try {
    const interceptors = [
      { method: 'POST', url: '**/auth/validate', fixture: 'auth-response.json', alias: 'loginApi' },
      { method: 'GET', url: '**/pim/employees**', fixture: 'employees-response.json', alias: 'employeeListApi' },
      { method: 'POST', url: '**/pim/employees', fixture: 'employee-create-response.json', alias: 'createEmployeeApi' },
      { method: 'GET', url: '**/dashboard/employees/action-summary', fixture: 'dashboard-response.json', alias: 'dashboardApi' }
    ];
    interceptors.forEach(int => {
      cy.intercept(int.method, int.url, { fixture: int.fixture }).as(int.alias);
    });
  } catch (e) {
    cy.log('API interceptors not set up - using real APIs');
  }
});

Cypress.Commands.add('waitForApi', alias => {
  cy.wait(`@${alias}`);
});

Cypress.Commands.add('waitForElement', (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should('be.visible');
});

Cypress.Commands.add('checkPerformance', () => {
  const startTime = Cypress.env('testStartTime');
  if (startTime) {
    const duration = Date.now() - startTime;
    const emoji = duration > 30000 ? '⚠️' : '✅';
    const msg = duration > 30000 ? 'Consider optimization' : 'Test completed';
    cy.log(`${emoji} ${msg} in ${Math.round(duration)}ms`);
  }
});

Cypress.Commands.add('cleanupTestData', () => {
  cy.window({ log: false }).then(win => {
    if (win?.testCleanup && typeof win.testCleanup === 'function') {
      try {
        win.testCleanup();
        cy.log('✅ Test data cleanup completed');
      } catch (e) {
        cy.log('⚠️ Test cleanup had minor issues (ignored)');
      }
    }
  });
});