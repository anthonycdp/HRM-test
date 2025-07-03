class AdminPage {
  get pageTitle() { return cy.get('.oxd-topbar-header-breadcrumb h6'); }
  get addButton() { return cy.get('.oxd-button--secondary').contains('Add'); }
  get searchForm() { return cy.get('.oxd-form').first(); }
  get usernameSearchInput() { return cy.get('.oxd-input').eq(1); }
  get userRoleDropdown() { return cy.get('.oxd-select-text').first(); }
  get employeeNameInput() { return cy.get('[placeholder="Type for hints..."]'); }
  get statusDropdown() { return cy.get('.oxd-select-text').eq(1); }
  get searchButton() { return cy.get('[type="submit"]'); }
  get resetButton() { return cy.get('.oxd-button--ghost'); }
  get recordsTable() { return cy.get('.oxd-table'); }
  get tableRows() { return cy.get('.oxd-table-row'); }
  get recordsFoundText() { return cy.get('.oxd-text--span'); }
  get deleteConfirmButton() { return cy.get('.oxd-button--label-danger'); }

  get userRoleSelect() { return cy.get('.oxd-select-text').first(); }
  get employeeNameField() { return cy.get('[placeholder="Type for hints..."]'); }
  get statusSelect() { return cy.get('.oxd-select-text').eq(1); }
  get usernameField() { return cy.get('.oxd-input').eq(1); }
  get passwordField() { return cy.get('[type="password"]').first(); }
  get confirmPasswordField() { return cy.get('[type="password"]').last(); }
  get saveButton() { return cy.get('[type="submit"]'); }
  get cancelButton() { return cy.get('.oxd-button--ghost'); }

  get userManagementMenu() { return cy.get('.oxd-topbar-body-nav-tab').contains('User Management'); }
  get jobMenu() { return cy.get('.oxd-topbar-body-nav-tab').contains('Job'); }
  get organizationMenu() { return cy.get('.oxd-topbar-body-nav-tab').contains('Organization'); }
  get qualificationsMenu() { return cy.get('.oxd-topbar-body-nav-tab').contains('Qualifications'); }
  get nationalitiesMenu() { return cy.get('.oxd-topbar-body-nav-tab').contains('Nationalities'); }
  get corporateBrandingMenu() { return cy.get('.oxd-topbar-body-nav-tab').contains('Corporate Branding'); }
  get configurationMenu() { return cy.get('.oxd-topbar-body-nav-tab').contains('Configuration'); }

  get usersDropdown() { return cy.get('.oxd-dropdown-menu').contains('Users'); }
  get jobTitlesDropdown() { return cy.get('.oxd-dropdown-menu').contains('Job Titles'); }
  get payGradesDropdown() { return cy.get('.oxd-dropdown-menu').contains('Pay Grades'); }
  get employmentStatusDropdown() { return cy.get('.oxd-dropdown-menu').contains('Employment Status'); }
  get jobCategoriesDropdown() { return cy.get('.oxd-dropdown-menu').contains('Job Categories'); }
  get workShiftsDropdown() { return cy.get('.oxd-dropdown-menu').contains('Work Shifts'); }

  visit() {
    cy.navigateToMenu('Admin');
    return this;
  }

  verifyAdminPageLoaded() {
    this.pageTitle.should('contain.text', 'Admin');
    cy.url().should('include', '/admin');
    return this;
  }

  clickAddUser() {
    this.addButton.click();
    cy.waitForPageLoad();
    return this;
  }

  searchUserByUsername(username) {
    this.usernameSearchInput.clear().type(username);
    this.searchButton.click();
    cy.waitForPageLoad();
    return this;
  }

  searchUserByEmployeeName(employeeName) {
    this.employeeNameInput.type(employeeName);
    cy.get('.oxd-autocomplete-dropdown').should('be.visible');
    cy.get('.oxd-autocomplete-option').first().click();
    this.searchButton.click();
    cy.waitForPageLoad();
    return this;
  }

  resetSearch() {
    this.resetButton.click();
    return this;
  }

  selectUserRole(role) {
    this.userRoleSelect.click();
    cy.get('.oxd-select-option').contains(role).click();
    return this;
  }

  selectUserStatus(status) {
    this.statusSelect.click();
    cy.get('.oxd-select-option').contains(status).click();
    return this;
  }

  fillAddUserForm(userData) {
    if (userData.userRole) this.selectUserRole(userData.userRole);
    if (userData.employeeName) {
      this.employeeNameField.type(userData.employeeName);
      cy.get('.oxd-autocomplete-dropdown').should('be.visible');
      cy.get('.oxd-autocomplete-option').first().click();
    }
    if (userData.status) this.selectUserStatus(userData.status);
    if (userData.username) this.usernameField.clear().type(userData.username);
    if (userData.password) {
      this.passwordField.clear().type(userData.password);
      this.confirmPasswordField.clear().type(userData.password);
    }
    return this;
  }

  saveUser() {
    this.saveButton.click();
    cy.waitForPageLoad();
    return this;
  }

  cancelUser() {
    this.cancelButton.click();
    return this;
  }

  editUser(rowIndex = 0) {
    this.tableRows.eq(rowIndex + 1).within(() => {
      cy.get('.oxd-icon-button').eq(1).click();
    });
    cy.waitForPageLoad();
    return this;
  }

  deleteUser(rowIndex = 0) {
    this.tableRows.eq(rowIndex + 1).within(() => {
      cy.get('.oxd-icon-button').eq(2).click();
    });
    this.deleteConfirmButton.click();
    cy.waitForPageLoad();
    return this;
  }

  verifyUserInTable(username) {
    this.recordsTable.should('contain.text', username);
    return this;
  }

  navigateToUserManagement() {
    this.userManagementMenu.click();
    this.usersDropdown.click();
    return this;
  }

  navigateToJob() {
    this.jobMenu.click();
    return this;
  }

  navigateToJobTitles() {
    this.navigateToJob();
    this.jobTitlesDropdown.click();
    return this;
  }

  navigateToPayGrades() {
    this.navigateToJob();
    this.payGradesDropdown.click();
    return this;
  }

  navigateToEmploymentStatus() {
    this.navigateToJob();
    this.employmentStatusDropdown.click();
    return this;
  }

  navigateToJobCategories() {
    this.navigateToJob();
    this.jobCategoriesDropdown.click();
    return this;
  }

  navigateToWorkShifts() {
    this.navigateToJob();
    this.workShiftsDropdown.click();
    return this;
  }

  navigateToOrganization() {
    this.organizationMenu.click();
    return this;
  }

  navigateToQualifications() {
    this.qualificationsMenu.click();
    return this;
  }

  navigateToNationalities() {
    this.nationalitiesMenu.click();
    return this;
  }

  navigateToCorporateBranding() {
    this.corporateBrandingMenu.click();
    return this;
  }

  navigateToConfiguration() {
    this.configurationMenu.click();
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

  verifyPageElements() {
    [this.addButton, this.searchForm, this.searchButton, this.resetButton].forEach(el => el.should('be.visible'));
    return this;
  }

  verifyAdminMenuItems() {
    [this.userManagementMenu, this.jobMenu, this.organizationMenu, this.qualificationsMenu].forEach(el => el.should('be.visible'));
    return this;
  }

  verifyPageTitle(title) {
    this.pageTitle.should('contain.text', title);
    return this;
  }
}

export default AdminPage;