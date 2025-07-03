class DashboardPage {
  get pageTitle() { return cy.get('.oxd-topbar-header-breadcrumb h6'); }
  get userDropdown() { return cy.get('.oxd-userdropdown-tab'); }
  get logoutOption() { return cy.get('[role="menuitem"]').contains('Logout'); }
  get userProfileImage() { return cy.get('.oxd-userdropdown-img'); }
  get userName() { return cy.get('.oxd-userdropdown-name'); }
  get mainMenu() { return cy.get('.oxd-main-menu'); }
  get dashboardWidgets() { return cy.get('.orangehrm-dashboard-widget'); }
  get timeAtWorkWidget() { return cy.get('.orangehrm-dashboard-widget').contains('Time at Work'); }
  get myActionsWidget() { return cy.get('.orangehrm-dashboard-widget').contains('My Actions'); }
  get quickLaunchWidget() { return cy.get('.orangehrm-dashboard-widget').contains('Quick Launch'); }
  get buzzLatestPostsWidget() { return cy.get('.orangehrm-dashboard-widget').contains('Buzz Latest Posts'); }
  get employeesOnLeaveWidget() { return cy.get('.orangehrm-dashboard-widget').contains('Employees on Leave Today'); }
  get employeeDistributionWidget() { return cy.get('.orangehrm-dashboard-widget').contains('Employee Distribution by Sub Unit'); }
  get pendingTimesheetsWidget() { return cy.get('.orangehrm-dashboard-widget').contains('Pending Timesheets'); }
  get adminMenu() { return cy.get('.oxd-main-menu-item').contains('Admin'); }
  get pimMenu() { return cy.get('.oxd-main-menu-item').contains('PIM'); }
  get leaveMenu() { return cy.get('.oxd-main-menu-item').contains('Leave'); }
  get timeMenu() { return cy.get('.oxd-main-menu-item').contains('Time'); }
  get recruitmentMenu() { return cy.get('.oxd-main-menu-item').contains('Recruitment'); }
  get myInfoMenu() { return cy.get('.oxd-main-menu-item').contains('My Info'); }
  get performanceMenu() { return cy.get('.oxd-main-menu-item').contains('Performance'); }
  get dashboardMenu() { return cy.get('.oxd-main-menu-item').contains('Dashboard'); }
  get directoryMenu() { return cy.get('.oxd-main-menu-item').contains('Directory'); }
  get maintenanceMenu() { return cy.get('.oxd-main-menu-item').contains('Maintenance'); }
  get claimMenu() { return cy.get('.oxd-main-menu-item').contains('Claim'); }
  get buzzMenu() { return cy.get('.oxd-main-menu-item').contains('Buzz'); }

  verifyDashboardLoaded() {
    cy.url().should('include', '/dashboard');
    cy.waitForPageLoad();
    cy.get('body').then(($body) => {
      if ($body.find('.oxd-topbar-header-breadcrumb').length > 0) {
        cy.get('.oxd-topbar-header-breadcrumb').should('be.visible');
      } else {
        cy.get('body').should('contain.text', 'Dashboard');
      }
    });
    
  }

  verifyDashboardWidgets() {
    cy.get('body').then(($body) => {
      if ($body.find('.orangehrm-dashboard-widget').length > 0) {
        this.dashboardWidgets.should('have.length.greaterThan', 0);
      } else {
        cy.get('body').should('contain.text', 'Dashboard');
      }
    });
    
  }

  verifyMainMenuItems() {
    [this.adminMenu, this.pimMenu, this.leaveMenu, this.timeMenu, this.recruitmentMenu, this.myInfoMenu, this.performanceMenu, this.dashboardMenu, this.directoryMenu].forEach(menu => menu.should('be.visible'));
    
  }

  clickUserDropdown() {
    this.userDropdown.click();
    
  }

  logout() {
    this.clickUserDropdown();
    this.logoutOption.click();
    
  }

  navigateToMenu(menuItem) {
    cy.get('.oxd-main-menu-item').contains(menuItem).click();
    cy.waitForPageLoad();
    
  }

  verifyUserName(expectedName) {
    this.userName.should('contain.text', expectedName);
    
  }

  verifyUserProfileImage() {
    this.userProfileImage.should('be.visible');
    
  }

  waitForDashboardLoad() {
    cy.waitForPageLoad();
    this.dashboardWidgets.should('be.visible');
    
  }

  verifyWidgetContent(widgetName) {
    cy.get('.orangehrm-dashboard-widget').contains(widgetName).should('be.visible');
    
  }

  clickQuickLaunchItem(itemName) {
    this.quickLaunchWidget.within(() => {
      cy.get('.oxd-sheet').contains(itemName).click();
    });
    
  }

  verifyPageHeader() {
    this.pageTitle.should('be.visible');
    this.userDropdown.should('be.visible');
    
  }

  verifyPageTitle(expectedTitle) {
    cy.get('body').then(($body) => {
      if ($body.find('.oxd-topbar-header-breadcrumb h6').length > 0) {
        this.pageTitle.should('contain.text', expectedTitle);
      } else {
        cy.title().should('contain', expectedTitle);
      }
    });
    
  }

  getMenuItemCount() {
    return cy.get('.oxd-main-menu-item').then(items => items.length);
  }
}

export default DashboardPage;