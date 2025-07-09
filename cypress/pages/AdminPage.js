class AdminPage {
  constructor() {
    this.url = 'https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers';
    this.elements = {
      pageTitle: () => cy.get('.oxd-topbar-header-breadcrumb-module'),
      addButton: () => cy.get('button').contains('Add'),
      searchSection: {
        usernameInput: () => cy.get('.oxd-form').find('input').eq(0),
        userRoleDropdown: () => cy.get('.oxd-select-text').eq(0),
        employeeNameInput: () => cy.get('input[placeholder="Type for hints..."]'),
        statusDropdown: () => cy.get('.oxd-select-text').eq(1),
        searchButton: () => cy.get('button[type="submit"]').contains('Search'),
        resetButton: () => cy.get('button[type="button"]').contains('Reset')
      },
      userTable: {
        table: () => cy.get('.oxd-table'),
        tableRows: () => cy.get('.oxd-table-body .oxd-table-row'),
        editButtons: () => cy.get('.oxd-table-cell-actions button').eq(1),
        deleteButtons: () => cy.get('.oxd-table-cell-actions button').eq(0),
        checkboxes: () => cy.get('.oxd-table-row .oxd-checkbox-input'),
        deleteSelectedButton: () => cy.get('button').contains('Delete Selected')
      },
      addUserForm: {
        userRoleDropdown: () => cy.get('.oxd-select-text').first(),
        statusDropdown: () => cy.get('.oxd-select-text').eq(1),
        employeeNameInput: () => cy.get('input[placeholder="Type for hints..."]'),
        usernameInput: () => cy.get('input').eq(1),
        passwordInput: () => cy.get('input[type="password"]').eq(0),
        confirmPasswordInput: () => cy.get('input[type="password"]').eq(1),
        saveButton: () => cy.get('button[type="submit"]'),
        cancelButton: () => cy.get('button[type="button"]').contains('Cancel')
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

  clickAddUser() {
    this.elements.addButton().click();
  }

  searchUser(username, userRole = null, employeeName = null, status = null) {
    if (username) {
      this.elements.searchSection.usernameInput().clear().type(username);
    }
    if (userRole) {
      this.elements.searchSection.userRoleDropdown().click();
      cy.get('.oxd-select-dropdown').contains(userRole).click();
    }
    if (employeeName) {
      this.elements.searchSection.employeeNameInput().clear().type(employeeName);
    }
    if (status) {
      this.elements.searchSection.statusDropdown().click();
      cy.get('.oxd-select-dropdown').contains(status).click();
    }
    this.elements.searchSection.searchButton().click();
  }

  resetSearch() {
    this.elements.searchSection.resetButton().click();
  }

  addUser(userRole, employeeName, username, password, status) {
    this.elements.addUserForm.userRoleDropdown().click();
    cy.get('.oxd-select-dropdown').contains(userRole).click();
    this.elements.addUserForm.employeeNameInput().type('a');
    cy.wait(3000);
    cy.get('body').then($body => {
      if ($body.find('.oxd-autocomplete-option').length > 0) {
        cy.get('.oxd-autocomplete-option').first().click();
      } else {
        this.elements.addUserForm.employeeNameInput().clear();
      }
    });

    this.elements.addUserForm.statusDropdown().click();
    cy.get('.oxd-select-dropdown').contains(status).click();
    this.elements.addUserForm.usernameInput().type(username);
    this.elements.addUserForm.passwordInput().type(password);
    this.elements.addUserForm.confirmPasswordInput().type(password);
    this.elements.addUserForm.saveButton().click();
  }

  deleteUser(username) {
    this.searchUser(username);
    this.elements.userTable.deleteButtons().first().click();
    this.elements.confirmDialog.yesButton().click();
  }

  editUser(username) {
    this.searchUser(username);
    this.elements.userTable.editButtons().first().click();
  }

  verifyUserInTable(username) {
    cy.get('.oxd-table-body').should('contain', username);
  }

  verifyNoRecordsFound() {
    cy.get('.oxd-text--span').should('contain', 'No Records Found');
  }

  verifyAddUserPageTitle() {
    cy.get('h6').should('contain', 'Add User');
  }

  verifyEditUserPageTitle() {
    cy.get('h6').should('contain', 'Edit User');
  }

  clickSaveOnAddUserForm() {
    this.elements.addUserForm.saveButton().click();
  }

  verifyRequiredFieldError() {
    cy.get('.oxd-input-field-error-message').should('contain', 'Required');
  }

  verifyPasswordMismatchError() {
    cy.get('.oxd-input-field-error-message').should('contain', 'Passwords do not match');
  }

  fillUserRoleDropdown(role) {
    this.elements.addUserForm.userRoleDropdown().click();
    cy.get('.oxd-select-dropdown').contains(role).click();
  }

  fillEmployeeNameWithAutocomplete() {
    this.elements.addUserForm.employeeNameInput().type('a');
    cy.wait(2000);
    cy.get('body').then($body => {
      if ($body.find('.oxd-autocomplete-option').length > 0) {
        cy.get('.oxd-autocomplete-option').first().click();
      }
    });
  }

  fillStatusDropdown(status) {
    this.elements.addUserForm.statusDropdown().click();
    cy.get('.oxd-select-dropdown').contains(status).click();
  }

  fillUsername(username) {
    this.elements.addUserForm.usernameInput().type(username);
  }

  fillPassword(password) {
    this.elements.addUserForm.passwordInput().type(password);
  }

  fillConfirmPassword(confirmPassword) {
    this.elements.addUserForm.confirmPasswordInput().type(confirmPassword);
  }

  clickCancelButton() {
    this.elements.addUserForm.cancelButton().click();
  }

  clearUsername() {
    this.elements.addUserForm.usernameInput().clear();
  }

  verifyTableRowCount(expectedCount) {
    if (expectedCount === 1) {
      cy.get('.oxd-table-body .oxd-table-row').should('have.length', 1);
    } else {
      cy.get('.oxd-table-body .oxd-table-row').should('have.length.gte', expectedCount);
    }
  }

  verifyTableHasAtLeastOneRow() {
    cy.get('.oxd-table-body .oxd-table-row').should('have.length.gte', 1);
  }

  verifyActionButtonsInFirstRow() {
    cy.get('.oxd-table-body .oxd-table-row').first().within(() => {
      cy.get('.oxd-table-cell-actions').should('be.visible');
      cy.get('.oxd-table-cell-actions button').should('have.length.gte', 1);
    });
  }

  verifyDeleteFunctionalityAvailable() {
    cy.get('.oxd-table-body .oxd-table-row').first().within(() => {
      cy.get('.oxd-table-cell-actions button').then($buttons => {
        cy.log(`Found ${$buttons.length} action buttons`);
        const hasDeleteButton = Array.from($buttons).some(btn => 
          btn.title?.toLowerCase().includes('delete') || 
          btn.className?.includes('delete') ||
          btn.querySelector('i')?.className?.includes('trash')
        );
        expect(hasDeleteButton).to.be.true;
      });
    });
  }

  verifyCheckboxesInTable() {
    cy.get('.oxd-table-body .oxd-table-row').should('have.length.gte', 1);
    cy.get('.oxd-table-body .oxd-table-row').first().within(() => {
      cy.get('.oxd-checkbox-input', { timeout: 10000 }).should('exist');
    });
  }

  verifyBulkActionInterface() {
    cy.get('.oxd-table-body .oxd-table-row').should('exist');
    cy.get('.oxd-table-header .oxd-checkbox-wrapper').should('be.visible');
  }

  verifyTableHeaders() {
    cy.get('.oxd-table-header').should('contain', 'Username');
    cy.get('.oxd-table-header').should('contain', 'User Role');
    cy.get('.oxd-table-header').should('contain', 'Employee Name');
    cy.get('.oxd-table-header').should('contain', 'Status');
  }

  verifyPaginationWhenAvailable() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-pagination').length > 0) {
        cy.get('.oxd-pagination').should('be.visible');
        cy.get('.oxd-pagination-page-item').should('exist');
      } else {
        cy.get('.oxd-table-body .oxd-table-row').should('have.length.gte', 1);
      }
    });
  }

  verifyUserTableWithData() {
    cy.get('.oxd-table').should('be.visible');
    cy.get('.oxd-table-body .oxd-table-row').should('have.length.gte', 1);
  }

  verifyActionButtonsCount() {
    cy.get('.oxd-table-body .oxd-table-row').first().within(() => {
      cy.get('.oxd-table-cell-actions button').should('have.length', 2);
    });
  }

  verifyPageTitle(expectedTitle) {
    this.elements.pageTitle().should('contain', expectedTitle);
  }

  verifyUrlContains(urlPart) {
    cy.url().should('include', urlPart);
  }

  verifyUsernameFieldIsEmpty() {
    this.elements.searchSection.usernameInput().should('have.value', '');
  }

  navigateToEditUser(username) {
    this.searchUser(username);
    this.editUser(username);
  }

  fillMinimalUserForm(username, password, confirmPassword) {
    this.fillUserRoleDropdown('Admin');
    this.fillEmployeeNameWithAutocomplete();
    this.fillStatusDropdown('Enabled');
    this.fillUsername(username);
    this.fillPassword(password);
    this.fillConfirmPassword(confirmPassword);
  }

  changeUsernameAndCancel(newUsername) {
    this.clearUsername();
    this.fillUsername(newUsername);
    this.clickCancelButton();
  }
}

export default new AdminPage();