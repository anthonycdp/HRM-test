class PIMPage {
  get pageTitle() { return cy.get('.oxd-topbar-header-breadcrumb h6'); }
  get addButton() { return cy.get('.oxd-button--secondary').contains('Add'); }
  get searchForm() { return cy.get('.oxd-form').first(); }
  get employeeNameInput() { return cy.get('[placeholder="Type for hints..."]').first(); }
  get employeeIdInput() { return cy.get('.oxd-input').eq(1); }
  get employmentStatusDropdown() { return cy.get('.oxd-select-text').first(); }
  get jobTitleDropdown() { return cy.get('.oxd-select-text').eq(2); }
  get searchButton() { return cy.get('[type="submit"]'); }
  get resetButton() { return cy.get('.oxd-button--ghost'); }
  get recordsTable() { return cy.get('.oxd-table'); }
  get tableRows() { return cy.get('.oxd-table-row'); }
  get recordsFoundText() { return cy.get('.oxd-text--span'); }
  get deleteConfirmButton() { return cy.get('.oxd-button--label-danger'); }
  get configurationDropdown() { return cy.get('.oxd-topbar-body-nav-tab--parent'); }
  get dataImportOption() { return cy.get('.oxd-dropdown-menu').contains('Data Import'); }

  get firstNameInput() { return cy.get('[name="firstName"]'); }
  get middleNameInput() { return cy.get('[name="middleName"]'); }
  get lastNameInput() { return cy.get('[name="lastName"]'); }
  get employeeIdField() { return cy.get('.oxd-input').eq(4); }
  get createLoginToggle() { return cy.get('.oxd-switch-input'); }
  get usernameField() { return cy.get('[name="username"]'); }
  get passwordField() { return cy.get('[name="password"]'); }
  get confirmPasswordField() { return cy.get('[name="confirmPassword"]'); }
  get saveButton() { return cy.get('[type="submit"]'); }
  get cancelButton() { return cy.get('.oxd-button--ghost'); }
  get profilePicture() { return cy.get('.oxd-file-input'); }

  get personalDetailsTab() { return cy.get('.orangehrm-tabs-item').contains('Personal Details'); }

  visit() {
    cy.navigateToMenu('PIM');
    return this;
  }

  verifyPIMPageLoaded() {
    this.pageTitle.should('contain.text', 'PIM');
    cy.url().should('include', '/pim');
    return this;
  }

  clickAddEmployee() {
    this.addButton.click();
    cy.waitForPageLoad();
    return this;
  }

  searchEmployeeByName(employeeName) {
    this.employeeNameInput.type(employeeName);
    cy.get('.oxd-autocomplete-dropdown').should('be.visible');
    cy.get('.oxd-autocomplete-option').first().click();
    this.searchButton.click();
    cy.waitForPageLoad();
    return this;
  }

  searchEmployeeById(employeeId) {
    this.employeeIdInput.clear().type(employeeId);
    this.searchButton.click();
    cy.waitForPageLoad();
    return this;
  }

  resetSearch() {
    this.resetButton.click();
    return this;
  }

  verifyEmployeeInTable(employeeName) {
    this.recordsTable.should('contain.text', employeeName);
    return this;
  }

  fillEmployeeForm(employeeData) {
    const fields = ['firstName', 'middleName', 'lastName', 'employeeId'];
    const inputs = [this.firstNameInput, this.middleNameInput, this.lastNameInput, this.employeeIdField];
    
    fields.forEach((field, index) => {
      if (employeeData[field]) {
        inputs[index].clear().type(employeeData[field]);
      }
    });
    return this;
  }

  enableCreateLogin() {
    this.createLoginToggle.click();
    return this;
  }

  fillLoginDetails(username, password) {
    this.usernameField.clear().type(username);
    this.passwordField.clear().type(password);
    this.confirmPasswordField.clear().type(password);
    return this;
  }

  saveEmployee() {
    this.saveButton.click();
    cy.waitForPageLoad();
    return this;
  }

  cancelEmployee() {
    this.cancelButton.click();
    return this;
  }

  uploadProfilePicture(fileName) {
    this.profilePicture.selectFile(`cypress/fixtures/${fileName}`, { force: true });
    return this;
  }

  editEmployee(rowIndex = 0) {
    this.tableRows.eq(rowIndex + 1).within(() => {
      cy.get('.oxd-icon-button').eq(1).click();
    });
    cy.waitForPageLoad();
    return this;
  }

  deleteEmployee(rowIndex = 0) {
    this.tableRows.eq(rowIndex + 1).within(() => {
      cy.get('.oxd-icon-button').eq(2).click();
    });
    this.deleteConfirmButton.click();
    cy.waitForPageLoad();
    return this;
  }

  selectEmploymentStatus(status) {
    this.employmentStatusDropdown.click();
    cy.get('.oxd-select-option').contains(status).click();
    return this;
  }

  selectJobTitle(jobTitle) {
    this.jobTitleDropdown.click();
    cy.get('.oxd-select-option').contains(jobTitle).click();
    return this;
  }

  navigateToTab(tabName) {
    cy.get('.orangehrm-tabs-item').contains(tabName).click();
    cy.waitForPageLoad();
    return this;
  }

  verifyEmployeeDetailsLoaded() {
    this.personalDetailsTab.should('be.visible');
    return this;
  }

  verifyRecordsCount(expectedCount) {
    this.recordsFoundText.should('contain.text', `(${expectedCount}) Records Found`);
    return this;
  }

  verifyNoRecordsFound() {
    this.recordsFoundText.should('contain.text', 'No Records Found');
    return this;
  }

  navigateToDataImport() {
    this.configurationDropdown.click();
    this.dataImportOption.click();
    return this;
  }

  verifyPageElements() {
    [this.addButton, this.searchForm, this.searchButton, this.resetButton].forEach(el => el.should('be.visible'));
    return this;
  }
}

export default PIMPage;