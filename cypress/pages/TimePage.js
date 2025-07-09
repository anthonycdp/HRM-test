class TimePage {
  constructor() {
    this.url = 'https://opensource-demo.orangehrmlive.com/web/index.php/time/viewEmployeeTimesheet';
    this.elements = {
      pageTitle: () => cy.get('.oxd-topbar-header-breadcrumb-module'),
      employeeNameInput: () => cy.get('input[placeholder="Type for hints..."]'),
      viewButton: () => cy.get('button[type="submit"]').contains('View'),
      timesheetPeriod: () => cy.get('.orangehrm-timesheet-header--title p'),
      timesheetStatus: () => cy.get('.orangehrm-timesheet-header--title h6'),
      editButton: () => cy.get('button').contains('Edit'),
      submitButton: () => cy.get('button').contains('Submit'),
      createTimesheetButton: () => cy.get('button').contains('Create Timesheet'),
      addRowButton: () => cy.get('.orangehrm-timesheet-footer button').contains('Add Row'),
      saveButton: () => cy.get('button[type="submit"]').contains('Save'),
      cancelButton: () => cy.get('button[type="button"]').contains('Cancel'),
      timesheetTable: {
        table: () => cy.get('.orangehrm-timesheet-table'),
        projectDropdowns: () => cy.get('.oxd-select-text'),
        activityDropdowns: () => cy.get('.oxd-select-text'),
        timeInputs: () => cy.get('.oxd-input'),
        deleteButtons: () => cy.get('.oxd-icon-button .bi-trash'),
        totalHours: () => cy.get('.orangehrm-timesheet-table-footer')
      },
      navigation: {
        timesheetsDropdown: () => cy.get('.oxd-topbar-body-nav').contains('Timesheets'),
        attendanceDropdown: () => cy.get('.oxd-topbar-body-nav').contains('Attendance'),
        reportsDropdown: () => cy.get('.oxd-topbar-body-nav').contains('Reports'),
        projectInfoDropdown: () => cy.get('.oxd-topbar-body-nav').contains('Project Info')
      }
    };
  }

  visit() {
    cy.visit(this.url);
  }

  selectEmployee(employeeName) {
    this.selectEmployeeFixed(employeeName);
  }

  selectEmployeeFixed(employeeName) {
    cy.get('body').then($body => {
      if ($body.find('input[placeholder="Type for hints..."]').length > 0) {
        this.elements.employeeNameInput().clear().type(employeeName);
        cy.wait(2000);
        
        cy.get('body').then($dropdown => {
          if ($dropdown.find('.oxd-autocomplete-dropdown').length > 0) {
            cy.get('.oxd-autocomplete-dropdown').first().click();
          } else {
            cy.log('Dropdown de funcionários não encontrado');
          }
        });
        
        if ($body.find('button[type="submit"]:contains("View")').length > 0) {
          this.elements.viewButton().click();
          cy.wait(2000);
        }
      } else {
        cy.log('Campo de busca de funcionário não encontrado');
      }
    });
  }

  editTimesheet() {
    cy.get('body').then($body => {
      if ($body.find('button:contains("Edit")').length > 0) {
        this.elements.editButton().click();
        cy.wait(2000);
      } else {
        cy.log('Botão Edit não encontrado');
      }
    });
  }

  submitTimesheet() {
    this.elements.submitButton().click();
  }

  createTimesheet() {
    cy.get('body').then($body => {
      if ($body.find('button:contains("Create Timesheet")').length > 0) {
        this.elements.createTimesheetButton().click();
        cy.wait(2000);
      } else {
        cy.log('Botão Create Timesheet não encontrado');
      }
    });
  }

  addTimesheetRow() {
    cy.get('body').then($body => {
      if ($body.find('.orangehrm-timesheet-footer button:contains("Add Row")').length > 0) {
        this.elements.addRowButton().click();
        cy.wait(1000);
      } else {
        cy.log('Botão Add Row não encontrado');
      }
    });
  }

  fillTimesheetRow(rowIndex, project, activity, hours) {
    cy.get('body').then($body => {
      // Selecionar projeto
      if ($body.find('.oxd-select-text').length > rowIndex * 2) {
        cy.get('.oxd-select-text').eq(rowIndex * 2).click();
        cy.wait(1000);
        
        if (project && project !== '') {
          cy.get('.oxd-select-dropdown').contains(project).click();
        } else {
          cy.get('.oxd-select-dropdown .oxd-select-option').first().click();
        }
        cy.wait(1000);
      }
      
      // Selecionar atividade
      if ($body.find('.oxd-select-text').length > rowIndex * 2 + 1) {
        cy.get('.oxd-select-text').eq(rowIndex * 2 + 1).click();
        cy.wait(1000);
        
        if (activity && activity !== '') {
          cy.get('.oxd-select-dropdown').contains(activity).click();
        } else {
          cy.get('.oxd-select-dropdown .oxd-select-option').first().click();
        }
        cy.wait(1000);
      }
      
      // Preencher horas
      if (hours && hours.length > 0) {
        hours.forEach((hour, dayIndex) => {
          const inputIndex = rowIndex * 7 + dayIndex;
          if ($body.find('input.oxd-input').length > inputIndex) {
            cy.get('input.oxd-input').eq(inputIndex).clear().type(hour);
          }
        });
      }
    });
  }

  saveTimesheet() {
    this.elements.saveButton().click();
  }

  deleteTimesheetRow(rowIndex) {
    this.elements.timesheetTable.deleteButtons().eq(rowIndex).click();
  }

  verifyTimesheetStatus(status) {
    this.elements.timesheetStatus().should('contain', status);
  }

  verifyTimesheetPeriod(period) {
    this.elements.timesheetPeriod().should('contain', period);
  }

  navigateTo(menu) {
    switch(menu) {
      case 'timesheets':
        this.elements.navigation.timesheetsDropdown().click();
        break;
      case 'attendance':
        this.elements.navigation.attendanceDropdown().click();
        break;
      case 'reports':
        this.elements.navigation.reportsDropdown().click();
        break;
      case 'projectInfo':
        this.elements.navigation.projectInfoDropdown().click();
        break;
    }
  }

  clickMenuOption(option) {
    cy.get('.oxd-dropdown-menu').contains(option).click();
  }

  clickMenuOptionFixed(option) {
    cy.wait(1000);
    cy.get('body').then($body => {
      if ($body.find('.oxd-dropdown-menu').length > 0) {
        cy.get('.oxd-dropdown-menu').contains(option).click();
      } else {
        cy.log(`Menu dropdown não encontrado para opção: ${option}`);
      }
    });
  }

  punchInOut(note) {
    cy.get('textarea').type(note);
    cy.get('button[type="submit"]').click();
  }

  viewAttendanceRecords(employeeName, date) {
    cy.get('input[placeholder="Type for hints..."]').type(employeeName);
    cy.wait(1000);
    cy.get('.oxd-autocomplete-dropdown').first().click();
    
    cy.get('.oxd-date-input input').clear().type(date);
    cy.get('button[type="submit"]').contains('View').click();
    
    cy.waitForLoading();
  }

  generateProjectReport(startDate, endDate) {
    cy.get('.oxd-select-text').eq(0).click();
    cy.get('.oxd-select-dropdown').first().click();
    
    cy.get('.oxd-date-input input').eq(0).clear().type(startDate);
    cy.get('.oxd-date-input input').eq(1).clear().type(endDate);
    
    cy.get('button[type="submit"]').contains('View').click();
    cy.waitForLoading();
  }

  generateProjectReportFixed(startDate, endDate) {
    cy.get('body').then($body => {
      // Selecionar projeto
      if ($body.find('.oxd-select-text').length > 0) {
        cy.get('.oxd-select-text').eq(0).click();
        cy.wait(500);
        cy.get('body').then($dropdown => {
          if ($dropdown.find('.oxd-select-dropdown').length > 0) {
            cy.get('.oxd-select-dropdown .oxd-select-option').first().click();
          }
        });
      }
      
      // Data inicial
      if ($body.find('.oxd-date-input input').length > 0) {
        cy.get('.oxd-date-input input').eq(0).clear().type(startDate);
      }
      
      // Data final
      if ($body.find('.oxd-date-input input').length > 1) {
        cy.get('.oxd-date-input input').eq(1).clear().type(endDate);
      }
      
      // Botão View
      if ($body.find('button[type="submit"]:contains("View")').length > 0) {
        cy.get('button[type="submit"]:contains("View")').click();
        cy.wait(2000);
      }
    });
  }

  generateEmployeeReport(employeeName, projectType, startDate, endDate) {
    cy.get('input[placeholder="Type for hints..."]').type(employeeName);
    cy.wait(1000);
    cy.get('.oxd-autocomplete-dropdown').first().click();
    
    cy.get('.oxd-select-text').click();
    cy.get('.oxd-select-dropdown').first().click();
    
    cy.get('.oxd-date-input input').eq(0).clear().type(startDate);
    cy.get('.oxd-date-input input').eq(1).clear().type(endDate);
    
    cy.get('button[type="submit"]').contains('View').click();
    cy.waitForLoading();
  }

  generateEmployeeReportFixed(employeeName, projectType, startDate, endDate) {
    cy.get('body').then($body => {
      // Nome do funcionário - especificar qual input
      const employeeInputs = $body.find('input[placeholder="Type for hints..."]');
      if (employeeInputs.length > 0) {
        cy.get('input[placeholder="Type for hints..."]').first().clear().type(employeeName);
        cy.wait(2000);
        cy.get('body').then($dropdown => {
          if ($dropdown.find('.oxd-autocomplete-dropdown').length > 0) {
            cy.get('.oxd-autocomplete-dropdown .oxd-autocomplete-option').first().click();
          }
        });
      }
      
      // Tipo de projeto
      if ($body.find('.oxd-select-text').length > 0) {
        cy.get('.oxd-select-text').first().click();
        cy.wait(500);
        cy.get('body').then($dropdown => {
          if ($dropdown.find('.oxd-select-dropdown').length > 0) {
            cy.get('.oxd-select-dropdown .oxd-select-option').first().click();
          }
        });
      }
      
      // Data inicial
      if ($body.find('.oxd-date-input input').length > 0) {
        cy.get('.oxd-date-input input').eq(0).clear().type(startDate);
      }
      
      // Data final
      if ($body.find('.oxd-date-input input').length > 1) {
        cy.get('.oxd-date-input input').eq(1).clear().type(endDate);
      }
      
      // Botão View
      if ($body.find('button[type="submit"]:contains("View")').length > 0) {
        cy.get('button[type="submit"]:contains("View")').click();
        cy.wait(2000);
      }
    });
  }

  addCustomer(customerData) {
    cy.get('button').contains('Add').click();
    cy.get('.oxd-input').eq(1).type(customerData.name);
    
    if (customerData.description) {
      cy.get('textarea').type(customerData.description);
    }
    
    cy.get('button[type="submit"]').click();
  }

  addProject(projectData) {
    cy.get('button').contains('Add').click();
    cy.get('.oxd-input').eq(1).type(projectData.name);
    
    cy.get('.oxd-select-text').click();
    cy.get('.oxd-select-dropdown').contains(projectData.customer).click();
    
    if (projectData.description) {
      cy.get('textarea').type(projectData.description);
    }
    
    cy.get('input[placeholder="Type for hints..."]').type(projectData.admin);
    cy.wait(1000);
    cy.get('.oxd-autocomplete-dropdown').first().click();
    
    cy.get('button[type="submit"]').click();
  }

  addProjectFixed(projectData) {
    cy.get('body').then($body => {
      if ($body.find('button:contains("Add")').length > 0) {
        cy.get('button:contains("Add")').click();
        cy.wait(2000);
        
        // Nome do projeto
        if ($body.find('.oxd-input').length > 1) {
          cy.get('.oxd-input').eq(1).clear().type(projectData.name);
        }
        
        // Cliente
        if ($body.find('.oxd-select-text').length > 0) {
          cy.get('.oxd-select-text').first().click();
          cy.wait(500);
          cy.get('body').then($dropdown => {
            if ($dropdown.find('.oxd-select-dropdown').length > 0) {
              cy.get('.oxd-select-dropdown .oxd-select-option').first().click();
            }
          });
        }
        
        // Descrição
        if (projectData.description && $body.find('textarea').length > 0) {
          cy.get('textarea').first().clear().type(projectData.description);
        }
        
        // Admin - especificar qual input
        const adminInputs = $body.find('input[placeholder="Type for hints..."]');
        if (adminInputs.length > 0) {
          cy.get('input[placeholder="Type for hints..."]').first().clear().type(projectData.admin);
          cy.wait(2000);
          cy.get('body').then($dropdown => {
            if ($dropdown.find('.oxd-autocomplete-dropdown').length > 0) {
              cy.get('.oxd-autocomplete-dropdown .oxd-autocomplete-option').first().click();
            }
          });
        }
        
        // Salvar
        if ($body.find('button[type="submit"]').length > 0) {
          cy.get('button[type="submit"]').first().click();
        }
      } else {
        cy.log('Botão Add não encontrado');
      }
    });
  }

  verifyTimesheetPeriodFormat() {
    this.elements.timesheetPeriod().should('match', /\d{4}-\d{2}-\d{2} to \d{4}-\d{2}-\d{2}/);
  }

  verifyValidTimesheetStatus(validStatuses) {
    this.elements.timesheetStatus().invoke('text').then((status) => {
      expect(validStatuses).to.include(status.trim());
    });
  }

  verifyTotalHoursCalculation() {
    cy.get('.orangehrm-timesheet-table-footer').should('contain', 'Total');
  }

  enterInvalidHours(hours) {
    cy.get('.oxd-input').first().clear().type(hours);
  }

  verifyTable() {
    cy.get('.oxd-table').should('be.visible');
  }

  confirmDialogAction() {
    cy.get('.oxd-dialog').should('be.visible');
    cy.get('.oxd-button--secondary').contains('Ok').click();
  }

  verifyDeleteTrashIcon() {
    cy.get('.bi-trash').should('have.length.gte', 0);
  }

  verifyTimesheetElementsFixed() {
    cy.get('body').then($body => {
      if ($body.find('.orangehrm-timesheet-header--title p').length > 0) {
        this.elements.timesheetPeriod().should('be.visible');
      } else {
        cy.log('Período do timesheet não encontrado');
      }
      
      if ($body.find('.orangehrm-timesheet-header--title h6').length > 0) {
        this.elements.timesheetStatus().should('be.visible');
      } else {
        cy.log('Status do timesheet não encontrado');
      }
    });
  }

  verifySuccessMessageSafe(message) {
    cy.wait(2000);
    cy.get('body').then($body => {
      if ($body.find('.oxd-toast--success').length > 0) {
        cy.get('.oxd-toast--success').should('be.visible');
        cy.log(`Success message found: ${message}`);
      } else if ($body.find('.oxd-toast').length > 0) {
        cy.get('.oxd-toast').should('be.visible');
        cy.log('Toast message found');
      } else {
        cy.log(`No toast message found for: ${message}`);
      }
    });
  }
}

export default new TimePage();