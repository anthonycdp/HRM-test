import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import AdminPage from '../pages/AdminPage';

describe('Admin Module - Refactored with POM', () => {
  let userData;

  before(() => {
    cy.fixture('users').then((data) => {
      userData = data;
    });
  });

  beforeEach(() => {
    cy.login(userData.admin.username, userData.admin.password);
    DashboardPage.navigateTo('admin');
    AdminPage.verifyPageTitle('Admin');
  });

  context('User Management - Add User', () => {
    it('should navigate to add user page', () => {
      AdminPage.clickAddUser();
      AdminPage.verifyUrlContains('/admin/saveSystemUser');
      AdminPage.verifyAddUserPageTitle();
    });

    it('should validate required fields when adding user', () => {
      AdminPage.clickAddUser();
      AdminPage.clickSaveOnAddUserForm();
      AdminPage.verifyRequiredFieldError();
    });

    it('should validate password match', () => {
      AdminPage.clickAddUser();
      AdminPage.fillMinimalUserForm('testuser123', 'Test@123', 'Test@456');
      AdminPage.clickSaveOnAddUserForm();
      AdminPage.verifyPasswordMismatchError();
    });
  });

  context('User Management - Search User', () => {
    it('should search user by username', () => {
      AdminPage.searchUser(userData.admin.username);
      AdminPage.verifyUserInTable(userData.admin.username);
      AdminPage.verifyTableRowCount(1);
    });

    it('should search user by role', () => {
      AdminPage.searchUser(null, 'Admin');
      cy.waitForLoading();
      AdminPage.verifyTableHasAtLeastOneRow();
    });

    it('should search user by status', () => {
      AdminPage.searchUser(null, null, null, 'Enabled');
      cy.waitForLoading();
      AdminPage.verifyTableHasAtLeastOneRow();
    });

    it('should show no records for non-existent user', () => {
      AdminPage.searchUser('NonExistentUser123');
      AdminPage.verifyNoRecordsFound();
    });

    it('should reset search filters', () => {
      AdminPage.searchUser('TestUser');
      AdminPage.resetSearch();
      AdminPage.verifyUsernameFieldIsEmpty();
      AdminPage.verifyTableHasAtLeastOneRow();
    });
  });

  context('User Management - Edit User', () => {
    it('should navigate to edit user page', () => {
      AdminPage.navigateToEditUser(userData.admin.username);
      AdminPage.verifyUrlContains('/admin/saveSystemUser');
      AdminPage.verifyEditUserPageTitle();
    });

    it('should cancel edit operation', () => {
      AdminPage.navigateToEditUser(userData.admin.username);
      AdminPage.changeUsernameAndCancel('TestChange');
      AdminPage.verifyUrlContains('/admin/viewSystemUsers');
      AdminPage.verifyUserInTable(userData.admin.username);
    });
  });

  context('User Management - Delete User', () => {
    it('should show action buttons for each user', () => {
      AdminPage.searchUser(userData.admin.username);
      AdminPage.verifyActionButtonsInFirstRow();
    });

    it('should verify delete functionality is available', () => {
      AdminPage.searchUser(userData.admin.username);
      AdminPage.verifyDeleteFunctionalityAvailable();
    });
  });

  context('Bulk Actions', () => {
    it('should display checkboxes for user selection', () => {
      AdminPage.verifyCheckboxesInTable();
    });

    it('should show bulk action interface', () => {
      AdminPage.verifyBulkActionInterface();
    });
  });

  context('UI Validations', () => {
    it('should display correct table headers', () => {
      AdminPage.verifyTableHeaders();
    });

    it('should display pagination when available', () => {
      AdminPage.verifyPaginationWhenAvailable();
    });

    it('should display user table with data', () => {
      AdminPage.verifyUserTableWithData();
    });

    it('should display action buttons for each user', () => {
      AdminPage.verifyActionButtonsCount();
    });
  });
});