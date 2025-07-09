class DashboardPage {
  constructor() {
    this.url = 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index';
    this.elements = {
      dashboardTitle: () => cy.get('.oxd-topbar-header-breadcrumb-module'),
      timeAtWorkWidget: () => cy.get('.orangehrm-dashboard-widget-name').contains('Time at Work'),
      myActionsWidget: () => cy.get('.orangehrm-dashboard-widget-name').contains('My Actions'),
      quickLaunchWidget: () => cy.get('.orangehrm-dashboard-widget-name').contains('Quick Launch'),
      employeesOnLeaveWidget: () => cy.get('.orangehrm-dashboard-widget-name').contains('Employees on Leave Today'),
      employeeDistributionWidget: () => cy.get('.orangehrm-dashboard-widget-name').contains('Employee Distribution'),
      userDropdown: () => cy.get('.oxd-userdropdown'),
      userDropdownMenu: () => cy.get('.oxd-dropdown-menu'),
      logoutOption: () => cy.get('.oxd-dropdown-menu').contains('Logout'),
      sideMenu: () => cy.get('.oxd-sidepanel'),
      searchInput: () => cy.get('.oxd-sidepanel-body input[placeholder="Search"]'),
      menuItems: {
        admin: () => cy.get('.oxd-sidepanel-body').contains('Admin'),
        pim: () => cy.get('.oxd-sidepanel-body').contains('PIM'),
        leave: () => cy.get('.oxd-sidepanel-body').contains('Leave'),
        time: () => cy.get('.oxd-sidepanel-body').contains('Time'),
        recruitment: () => cy.get('.oxd-sidepanel-body').contains('Recruitment'),
        myInfo: () => cy.get('.oxd-sidepanel-body').contains('My Info'),
        performance: () => cy.get('.oxd-sidepanel-body').contains('Performance'),
        dashboard: () => cy.get('.oxd-sidepanel-body').contains('Dashboard'),
        directory: () => cy.get('.oxd-sidepanel-body').contains('Directory'),
        maintenance: () => cy.get('.oxd-sidepanel-body').contains('Maintenance'),
        claim: () => cy.get('.oxd-sidepanel-body').contains('Claim'),
        buzz: () => cy.get('.oxd-sidepanel-body').contains('Buzz')
      }
    };
  }

  visit() {
    cy.visit(this.url);
  }

  verifyDashboardIsDisplayed() {
    this.elements.dashboardTitle().should('be.visible').and('contain', 'Dashboard');
  }

  navigateTo(menuItem) {
    this.elements.menuItems[menuItem]().click();
  }

  searchMenu(searchText) {
    this.elements.searchInput().clear().type(searchText);
  }

  logout() {
    this.elements.userDropdown().click();
    this.elements.logoutOption().click();
  }

  verifyWidgetIsDisplayed(widgetName) {
    cy.get('.orangehrm-dashboard-widget-name').contains(widgetName).should('be.visible');
  }

  verifyAllWidgetsAreDisplayed() {
    this.elements.timeAtWorkWidget().should('be.visible');
    this.elements.myActionsWidget().should('be.visible');
    this.elements.quickLaunchWidget().should('be.visible');
  }

  verifyPageTitle(expectedTitle) {
    this.elements.dashboardTitle().should('contain', expectedTitle);
  }
}

export default new DashboardPage();