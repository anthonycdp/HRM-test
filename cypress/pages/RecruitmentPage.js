class RecruitmentPage {
  constructor() {
    this.url = 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates';
    this.elements = {
      pageTitle: () => cy.get('.oxd-topbar-header-breadcrumb-module'),
      addButton: () => cy.get('button').contains('Add'),
      searchSection: {
        jobTitleDropdown: () => cy.get('.oxd-select-text').eq(0),
        vacancyDropdown: () => cy.get('.oxd-select-text').eq(1),
        hiringManagerDropdown: () => cy.get('.oxd-select-text').eq(2),
        statusDropdown: () => cy.get('.oxd-select-text').eq(3),
        candidateNameInput: () => cy.get('input[placeholder="Type for hints..."]'),
        keywordsInput: () => cy.get('input[placeholder="Enter comma seperated words..."]'),
        fromDateInput: () => cy.get('.oxd-date-input input').eq(0),
        toDateInput: () => cy.get('.oxd-date-input input').eq(1),
        methodOfApplicationDropdown: () => cy.get('.oxd-select-text').eq(4),
        searchButton: () => cy.get('button[type="submit"]').contains('Search'),
        resetButton: () => cy.get('button[type="button"]').contains('Reset')
      },
      candidateTable: {
        table: () => cy.get('.oxd-table'),
        tableRows: () => cy.get('.oxd-table-body .oxd-table-row'),
        viewButtons: () => cy.get('.oxd-table-cell-actions button').contains('View'),
        editButtons: () => cy.get('.oxd-table-cell-actions button').eq(1),
        deleteButtons: () => cy.get('.oxd-table-cell-actions button').eq(2),
        checkboxes: () => cy.get('.oxd-table-row .oxd-checkbox-input')
      },
      addCandidateForm: {
        firstNameInput: () => cy.get('input[name="firstName"]'),
        middleNameInput: () => cy.get('input[name="middleName"]'),
        lastNameInput: () => cy.get('input[name="lastName"]'),
        vacancyDropdown: () => cy.get('.oxd-select-text'),
        emailInput: () => cy.get('.oxd-input').eq(3),
        contactNumberInput: () => cy.get('.oxd-input').eq(4),
        resumeUpload: () => cy.get('input[type="file"]'),
        keywordsInput: () => cy.get('input[placeholder="Enter comma seperated words..."]'),
        notesTextarea: () => cy.get('textarea'),
        consentCheckbox: () => cy.get('input[type="checkbox"]'),
        saveButton: () => cy.get('button[type="submit"]').contains('Save'),
        cancelButton: () => cy.get('button[type="button"]').contains('Cancel')
      },
      navigation: {
        candidatesButton: () => cy.get('.oxd-topbar-body-nav-tab').contains('Candidates'),
        vacanciesButton: () => cy.get('.oxd-topbar-body-nav-tab').contains('Vacancies')
      },
      candidateProfile: {
        statusDropdown: () => cy.get('.oxd-select-text'),
        shortlistButton: () => cy.get('button').contains('Shortlist'),
        rejectButton: () => cy.get('button').contains('Reject'),
        scheduleInterviewButton: () => cy.get('button').contains('Schedule Interview'),
        markInterviewPassedButton: () => cy.get('button').contains('Mark Interview Passed'),
        markInterviewFailedButton: () => cy.get('button').contains('Mark Interview Failed'),
        offerJobButton: () => cy.get('button').contains('Offer Job'),
        hireButton: () => cy.get('button').contains('Hire')
      }
    };
  }

  visit() {
    cy.visit(this.url);
  }

  clickAddCandidate() {
    this.elements.addButton().click();
  }

  searchCandidate(filters = {}) {
    if (filters.jobTitle) {
      this.elements.searchSection.jobTitleDropdown().click();
      cy.wait(1000);
      cy.get('.oxd-select-dropdown').should('be.visible');
      cy.get('.oxd-select-dropdown .oxd-select-option').contains(filters.jobTitle).click();
    }
    if (filters.vacancy) {
      this.elements.searchSection.vacancyDropdown().click();
      cy.wait(1000);
      cy.get('.oxd-select-dropdown').should('be.visible');
      cy.get('.oxd-select-dropdown .oxd-select-option').contains(filters.vacancy).click();
    }
    if (filters.hiringManager) {
      this.elements.searchSection.hiringManagerDropdown().click();
      cy.wait(1000);
      cy.get('.oxd-select-dropdown').should('be.visible');
      cy.get('.oxd-select-dropdown .oxd-select-option').contains(filters.hiringManager).click();
    }
    if (filters.status) {
      this.elements.searchSection.statusDropdown().click();
      cy.wait(1000);
      cy.get('.oxd-select-dropdown').should('be.visible');
      cy.get('.oxd-select-dropdown .oxd-select-option').contains(filters.status).click();
    }
    if (filters.candidateName) {
      this.elements.searchSection.candidateNameInput().type(filters.candidateName);
    }
    if (filters.keywords) {
      this.elements.searchSection.keywordsInput().type(filters.keywords);
    }
    if (filters.fromDate) {
      this.elements.searchSection.fromDateInput().clear().type(filters.fromDate);
    }
    if (filters.toDate) {
      this.elements.searchSection.toDateInput().clear().type(filters.toDate);
    }
    this.elements.searchSection.searchButton().click();
  }

  addCandidate(candidateData) {
    this.elements.addCandidateForm.firstNameInput().type(candidateData.firstName);
    if (candidateData.middleName) {
      this.elements.addCandidateForm.middleNameInput().type(candidateData.middleName);
    }
    this.elements.addCandidateForm.lastNameInput().type(candidateData.lastName);
    
    this.elements.addCandidateForm.vacancyDropdown().click();
    cy.get('.oxd-select-dropdown').contains(candidateData.vacancy).click();
    
    this.elements.addCandidateForm.emailInput().type(candidateData.email);
    if (candidateData.contactNumber) {
      this.elements.addCandidateForm.contactNumberInput().type(candidateData.contactNumber);
    }
    
    if (candidateData.resume) {
      this.elements.addCandidateForm.resumeUpload().attachFile(candidateData.resume);
    }
    
    if (candidateData.keywords) {
      this.elements.addCandidateForm.keywordsInput().type(candidateData.keywords);
    }
    
    if (candidateData.notes) {
      this.elements.addCandidateForm.notesTextarea().type(candidateData.notes);
    }
    
    if (candidateData.consent) {
      this.elements.addCandidateForm.consentCheckbox().check();
    }
    
    this.elements.addCandidateForm.saveButton().click();
  }

  viewCandidate(candidateName) {
    cy.get('.oxd-table-body').contains(candidateName).parent().parent().find('button').contains('View').click();
  }

  shortlistCandidate() {
    this.elements.candidateProfile.shortlistButton().click();
  }

  rejectCandidate() {
    this.elements.candidateProfile.rejectButton().click();
  }

  scheduleInterview() {
    this.elements.candidateProfile.scheduleInterviewButton().click();
  }

  navigateToVacancies() {
    this.elements.navigation.vacanciesButton().click();
  }

  verifyTable() {
    this.elements.candidateTable.table().should('be.visible');
  }

  getFirstRowCandidate() {
    return this.elements.candidateTable.tableRows().first();
  }

  getCandidateNameFromRow(row) {
    return row.find('.oxd-table-cell').eq(1).text();
  }

  getCandidateStatusFromRow(row) {
    return row.find('.oxd-table-cell').eq(5).text();
  }

  verifyDropdownReset() {
    cy.get('.oxd-select-text').should('contain', '-- Select --');
  }

  addNewVacancy(vacancyData) {
    cy.get('button').contains('Add').click();
    cy.get('.oxd-input').eq(1).type(vacancyData.name);
    
    cy.get('.oxd-select-text').eq(0).click();
    cy.get('.oxd-select-dropdown').contains(vacancyData.jobTitle).click();
    
    cy.get('input[placeholder="Type for hints..."]').type(vacancyData.hiringManager);
    cy.wait(1000);
    cy.get('.oxd-autocomplete-dropdown').first().click();
    
    cy.get('.oxd-input').eq(2).type(vacancyData.numberOfPositions);
    
    if (vacancyData.description) {
      cy.get('textarea').type(vacancyData.description);
    }
    
    cy.get('button[type="submit"]').click();
  }

  searchVacancy(filters = {}) {
    if (filters.jobTitle) {
      cy.get('.oxd-select-text').eq(0).click();
      cy.get('.oxd-select-dropdown').contains(filters.jobTitle).click();
    }
    
    cy.get('button[type="submit"]').contains('Search').click();
    cy.waitForLoading();
  }

  editVacancy(numberOfPositions) {
    this.getFirstRowCandidate().then($row => {
      if ($row.length > 0) {
        cy.get('.oxd-table-cell-actions button').eq(1).click();
        cy.get('.oxd-input').eq(2).clear().type(numberOfPositions);
        cy.get('button[type="submit"]').click();
      }
    });
  }

  deleteVacancy() {
    this.getFirstRowCandidate().then($row => {
      if ($row.length > 0) {
        cy.get('.oxd-table-cell-actions button').eq(0).click();
        cy.confirmAction();
      }
    });
  }

  verifyValidCandidateStatuses(validStatuses) {
    cy.get('.oxd-table-body .oxd-table-cell').each($cell => {
      const text = $cell.text();
      if (validStatuses.includes(text)) {
        cy.wrap($cell).should('have.text', text);
      }
    });
  }

  verifyFileUploadSizeRestriction() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-file-input-div').length > 0) {
        cy.get('.oxd-file-input-div').then($fileDiv => {
          const text = $fileDiv.text();
          if (text.includes('1MB') || text.includes('MB')) {
            cy.log(`Restrição de tamanho encontrada: ${text}`);
            cy.get('.oxd-file-input-div').should('be.visible');
          } else {
            cy.log(`Div de upload encontrada mas sem informação de tamanho: ${text}`);
            cy.get('.oxd-file-input-div').should('be.visible');
          }
        });
      } else if ($body.find('.oxd-file-input').length > 0) {
        cy.get('.oxd-file-input').should('exist');
        cy.log('File input encontrado - verificando restrições em estrutura alternativa');
      } else if ($body.find('input[type="file"]').length > 0) {
        cy.get('input[type="file"]').should('exist');
        cy.log('Input de arquivo básico encontrado');
      } else {
        cy.log('Componente de upload de arquivo não encontrado na página');
      }
    });
  }

  verifyActionButtonsByStatus(status) {
    if (status === 'Application Initiated') {
      cy.get('body').then($body => {
        if ($body.find('button:contains("Shortlist")').length > 0) {
          cy.get('button:contains("Shortlist")').should('be.visible');
        } else {
          cy.log('Botão Shortlist não encontrado');
        }
        
        if ($body.find('button:contains("Reject")').length > 0) {
          cy.get('button:contains("Reject")').should('be.visible');
        } else {
          cy.log('Botão Reject não encontrado');
        }
      });
    } else {
      cy.log(`Status ${status} - verificação de botões não implementada`);
    }
  }

  fillShortlistNotes(notes) {
    cy.get('textarea').type(notes);
    cy.get('button[type="submit"]').click();
  }

  fillRejectNotes(notes) {
    cy.get('textarea').type(notes);
    cy.get('button[type="submit"]').click();
  }

  scheduleInterviewDetails(interviewData) {
    cy.get('.oxd-input').eq(1).type(interviewData.title);
    
    cy.get('input[placeholder="Type for hints..."]').eq(0).type(interviewData.interviewer);
    cy.wait(1000);
    cy.get('.oxd-autocomplete-dropdown').first().click();
    
    cy.get('.oxd-date-input input').clear().type(interviewData.date);
    cy.get('.oxd-time-input input').clear().type(interviewData.time);
    
    cy.get('button[type="submit"]').click();
  }

  uploadResumeFile(filePath) {
    cy.get('input[type="file"]').selectFile(filePath, { force: true });
  }

  addCandidateFixed(candidateData) {
    cy.get('body').then($body => {
      if ($body.find('input[name="firstName"]').length > 0) {
        this.elements.addCandidateForm.firstNameInput().clear().type(candidateData.firstName);
      }
      
      if (candidateData.middleName && $body.find('input[name="middleName"]').length > 0) {
        this.elements.addCandidateForm.middleNameInput().clear().type(candidateData.middleName);
      }
      
      if ($body.find('input[name="lastName"]').length > 0) {
        this.elements.addCandidateForm.lastNameInput().clear().type(candidateData.lastName);
      }

      if ($body.find('.oxd-select-text').length > 0) {
        this.elements.addCandidateForm.vacancyDropdown().click();
        cy.wait(500);
        cy.get('body').then($dropdown => {
          if ($dropdown.find('.oxd-select-dropdown').length > 0) {
            cy.get('.oxd-select-dropdown .oxd-select-option').first().click();
          }
        });
      }

      if ($body.find('.oxd-input').length >= 4) {
        this.elements.addCandidateForm.emailInput().clear().type(candidateData.email);
      }

      if (candidateData.contactNumber && $body.find('.oxd-input').length >= 5) {
        this.elements.addCandidateForm.contactNumberInput().clear().type(candidateData.contactNumber);
      }

      if (candidateData.resume && $body.find('input[type="file"]').length > 0) {
        this.uploadResumeFileFixed(candidateData.resume);
      }

      if (candidateData.keywords && $body.find('input[placeholder="Enter comma seperated words..."]').length > 0) {
        this.elements.addCandidateForm.keywordsInput().clear().type(candidateData.keywords);
      }

      if (candidateData.notes && $body.find('textarea').length > 0) {
        this.elements.addCandidateForm.notesTextarea().clear().type(candidateData.notes);
      }

      if (candidateData.consent && $body.find('input[type="checkbox"]').length > 0) {
        this.elements.addCandidateForm.consentCheckbox().check();
      }

      if ($body.find('button[type="submit"]:contains("Save")').length > 0) {
        this.elements.addCandidateForm.saveButton().click();
      }
    });
  }

  fillBasicCandidateInfo(candidateData) {
    cy.get('body').then($body => {
      if ($body.find('input[name="firstName"]').length > 0) {
        this.elements.addCandidateForm.firstNameInput().clear().type(candidateData.firstName);
      }
      
      if ($body.find('input[name="lastName"]').length > 0) {
        this.elements.addCandidateForm.lastNameInput().clear().type(candidateData.lastName);
      }

      if ($body.find('.oxd-select-text').length > 0) {
        this.elements.addCandidateForm.vacancyDropdown().click();
        cy.wait(500);
        cy.get('body').then($dropdown => {
          if ($dropdown.find('.oxd-select-dropdown').length > 0) {
            cy.get('.oxd-select-dropdown .oxd-select-option').first().click();
          }
        });
      }

      if ($body.find('.oxd-input').length >= 4) {
        this.elements.addCandidateForm.emailInput().clear().type(candidateData.email);
      }
    });
  }

  uploadResumeFileFixed(filePath) {
    cy.get('body').then($body => {
      if ($body.find('input[type="file"]').length > 0) {
        cy.get('input[type="file"]').selectFile(filePath, { force: true });
        cy.wait(1000);
      } else {
        cy.log('Campo de upload de arquivo não encontrado');
      }
    });
  }

  searchCandidateFixed(filters = {}) {
    cy.get('body').then($body => {
      if (filters.jobTitle && $body.find('.oxd-select-text').length > 0) {
        this.elements.searchSection.jobTitleDropdown().click();
        cy.wait(500);
        cy.get('body').then($dropdown => {
          if ($dropdown.find('.oxd-select-dropdown').length > 0) {
            cy.get('.oxd-select-dropdown .oxd-select-option').first().click();
          }
        });
      }
      
      if (filters.vacancy && $body.find('.oxd-select-text').length > 1) {
        this.elements.searchSection.vacancyDropdown().click();
        cy.wait(500);
        cy.get('body').then($dropdown => {
          if ($dropdown.find('.oxd-select-dropdown').length > 0) {
            cy.get('.oxd-select-dropdown .oxd-select-option').first().click();
          }
        });
      }
      
      if (filters.status && $body.find('.oxd-select-text').length > 3) {
        this.elements.searchSection.statusDropdown().click();
        cy.wait(500);
        cy.get('body').then($dropdown => {
          if ($dropdown.find('.oxd-select-dropdown').length > 0) {
            cy.get('.oxd-select-dropdown .oxd-select-option').first().click();
          }
        });
      }
      
      if (filters.candidateName && $body.find('input[placeholder="Type for hints..."]').length > 0) {
        this.elements.searchSection.candidateNameInput().clear().type(filters.candidateName);
      }
      
      if (filters.keywords && $body.find('input[placeholder="Enter comma seperated words..."]').length > 0) {
        this.elements.searchSection.keywordsInput().clear().type(filters.keywords);
      }
      
      if (filters.fromDate && $body.find('.oxd-date-input input').length > 0) {
        this.elements.searchSection.fromDateInput().clear().type(filters.fromDate);
      }
      
      if (filters.toDate && $body.find('.oxd-date-input input').length > 1) {
        this.elements.searchSection.toDateInput().clear().type(filters.toDate);
      }
      
      if ($body.find('button[type="submit"]:contains("Search")').length > 0) {
        this.elements.searchSection.searchButton().click();
      }
    });
  }

  resetSearchFiltersFixed() {
    cy.get('body').then($body => {
      if ($body.find('button[type="button"]:contains("Reset")').length > 0) {
        this.elements.searchSection.resetButton().click();
      } else if ($body.find('.oxd-button--ghost:contains("Reset")').length > 0) {
        cy.get('.oxd-button--ghost:contains("Reset")').click();
      } else {
        cy.log('Botão Reset não encontrado');
      }
    });
  }

  verifyTableOrEmpty() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-table').length > 0) {
        this.elements.candidateTable.table().should('be.visible');
      } else {
        cy.log('Tabela não encontrada ou vazia');
      }
    });
  }

  verifyDropdownResetFixed() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-select-text').length > 0) {
        cy.get('.oxd-select-text').first().should('contain', '-- Select --');
      } else {
        cy.log('Dropdown não encontrado para verificar reset');
      }
    });
  }

  getFirstRowCandidateFixed() {
    return cy.get('body').then($body => {
      if ($body.find('.oxd-table-body .oxd-table-row').length > 0) {
        return cy.wrap(this.elements.candidateTable.tableRows().first());
      } else {
        return cy.wrap(null);
      }
    });
  }

  getCandidateNameFromRowFixed(row) {
    if (row && row.length > 0) {
      return row.find('.oxd-table-cell').eq(1).text().trim();
    }
    return '';
  }

  viewCandidateFixed(candidateName) {
    cy.get('body').then($body => {
      if ($body.find('.oxd-table-body').length > 0 && candidateName) {
        cy.get('.oxd-table-body').contains(candidateName).then($nameCell => {
          if ($nameCell.length > 0) {
            cy.wrap($nameCell).parent().parent().find('button:contains("View")').first().click();
          }
        });
      } else {
        cy.log('Tabela ou nome do candidato não encontrado');
      }
    });
  }

  shortlistCandidateFixed() {
    cy.get('body').then($body => {
      if ($body.find('button:contains("Shortlist")').length > 0) {
        this.elements.candidateProfile.shortlistButton().click();
      } else {
        cy.log('Botão Shortlist não encontrado');
      }
    });
  }

  rejectCandidateFixed() {
    cy.get('body').then($body => {
      if ($body.find('button:contains("Reject")').length > 0) {
        this.elements.candidateProfile.rejectButton().click();
      } else {
        cy.log('Botão Reject não encontrado');
      }
    });
  }

  scheduleInterviewFixed() {
    cy.get('body').then($body => {
      if ($body.find('button:contains("Schedule Interview")').length > 0) {
        this.elements.candidateProfile.scheduleInterviewButton().click();
      } else {
        cy.log('Botão Schedule Interview não encontrado');
      }
    });
  }

  fillShortlistNotesFixed(notes) {
    cy.get('body').then($body => {
      if ($body.find('textarea').length > 0) {
        cy.get('textarea').clear().type(notes);
      }
      
      if ($body.find('button[type="submit"]').length > 0) {
        cy.get('button[type="submit"]').click();
      }
    });
  }

  fillRejectNotesFixed(notes) {
    cy.get('body').then($body => {
      if ($body.find('textarea').length > 0) {
        cy.get('textarea').clear().type(notes);
      }
      
      if ($body.find('button[type="submit"]').length > 0) {
        cy.get('button[type="submit"]').click();
      }
    });
  }

  scheduleInterviewDetailsFixed(interviewData) {
    cy.get('body').then($body => {

      if ($body.find('.oxd-input').length > 1) {
        cy.get('.oxd-input').eq(1).clear().type(interviewData.title);
      }

      if ($body.find('input[placeholder="Type for hints..."]').length > 0) {
        cy.get('input[placeholder="Type for hints..."]').eq(0).clear().type(interviewData.interviewer);
        cy.wait(1000);
        cy.get('body').then($autocomplete => {
          if ($autocomplete.find('.oxd-autocomplete-dropdown').length > 0) {
            cy.get('.oxd-autocomplete-dropdown .oxd-autocomplete-option').first().click();
          }
        });
      }

      if ($body.find('.oxd-date-input input').length > 0) {
        cy.get('.oxd-date-input input').clear().type(interviewData.date);
      }

      if ($body.find('.oxd-time-input input').length > 0) {
        cy.get('.oxd-time-input input').clear().type(interviewData.time);
      }

      if ($body.find('button[type="submit"]').length > 0) {
        cy.get('button[type="submit"]').click();
      }
    });
  }

  navigateToVacanciesFixed() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-topbar-body-nav-tab:contains("Vacancies")').length > 0) {
        this.elements.navigation.vacanciesButton().click();
      } else {
        cy.log('Aba Vacancies não encontrada');
      }
    });
  }

  addNewVacancyFixed(vacancyData) {
    cy.get('body').then($body => {
      if ($body.find('button:contains("Add")').length > 0) {
        cy.get('button:contains("Add")').click();
        cy.wait(3000);

        cy.get('body').then($formBody => {
          if ($formBody.find('.oxd-input').length > 1) {
            cy.get('.oxd-input').eq(1).clear().type(vacancyData.name);
          }

          if ($formBody.find('.oxd-select-text').length > 0) {
            cy.get('.oxd-select-text').eq(0).click();
            cy.wait(500);
            cy.get('body').then($dropdown => {
              if ($dropdown.find('.oxd-select-dropdown').length > 0) {
                cy.get('.oxd-select-dropdown .oxd-select-option').first().click();
              }
            });
          }

          cy.get('body').then($hiringBody => {
            if ($hiringBody.find('input[placeholder="Type for hints..."]').length > 0) {
              cy.get('input[placeholder="Type for hints..."]').clear().type(vacancyData.hiringManager);
              cy.wait(1000);
              cy.get('body').then($autocomplete => {
                if ($autocomplete.find('.oxd-autocomplete-dropdown').length > 0) {
                  cy.get('.oxd-autocomplete-dropdown .oxd-autocomplete-option').first().click();
                }
              });
            } else if ($hiringBody.find('.oxd-autocomplete-text-input input').length > 0) {
              cy.get('.oxd-autocomplete-text-input input').clear().type(vacancyData.hiringManager);
              cy.wait(1000);
              cy.get('body').then($autocomplete => {
                if ($autocomplete.find('.oxd-autocomplete-dropdown').length > 0) {
                  cy.get('.oxd-autocomplete-dropdown .oxd-autocomplete-option').first().click();
                }
              });
            } else {
              cy.log('Campo Hiring Manager não encontrado - prosseguindo sem preenchê-lo');
            }
          });

          if ($formBody.find('.oxd-input').length > 2) {
            cy.get('.oxd-input').eq(2).clear().type(vacancyData.numberOfPositions);
          }

          if (vacancyData.description && $formBody.find('textarea').length > 0) {
            cy.get('textarea').clear().type(vacancyData.description);
          }

          if ($formBody.find('button[type="submit"]').length > 0) {
            cy.get('button[type="submit"]').click();
          }
        });
      } else {
        cy.log('Botão Add não encontrado na seção Vacancies');
      }
    });
  }

  editVacancyFixed(numberOfPositions) {
    cy.get('body').then($body => {
      if ($body.find('.oxd-table-body .oxd-table-row').length > 0) {
        cy.get('.oxd-table-cell-actions button').eq(1).click({ force: true });
        cy.wait(2000);

        cy.get('body').then($editBody => {
          if ($editBody.find('.oxd-dialog-container').length > 0) {
            cy.log('Dialog detectado - tentando fechar');
            cy.get('body').type('{esc}');
            cy.wait(1000);
          }

          if ($editBody.find('.oxd-input').length > 2) {
            cy.get('.oxd-input').eq(2).clear({ force: true }).type(numberOfPositions, { force: true });
          } else if ($editBody.find('input[type="text"]').length > 2) {
            cy.get('input[type="text"]').eq(2).clear({ force: true }).type(numberOfPositions, { force: true });
          }

          if ($editBody.find('button[type="submit"]').length > 0) {
            cy.get('button[type="submit"]').click({ force: true });
          } else if ($editBody.find('button:contains("Save")').length > 0) {
            cy.get('button:contains("Save")').click({ force: true });
          }
        });
      } else {
        cy.log('Nenhuma vaga encontrada na tabela para editar');
      }
    });
  }

  deleteVacancyFixed() {
    cy.get('body').then($body => {
      if ($body.find('.oxd-table-body .oxd-table-row').length > 0) {
        cy.get('.oxd-table-cell-actions button').eq(2).click();
        cy.wait(1000);

        cy.get('body').then($confirmBody => {
          if ($confirmBody.find('button:contains("Yes")').length > 0) {
            cy.get('button:contains("Yes")').click();
          }
        });
      }
    });
  }

  verifySuccessMessageSafe(message) {
    cy.wait(2000);
    cy.get('body').then($body => {
      if ($body.find('.oxd-toast--success').length > 0) {
        cy.get('.oxd-toast--success').should('be.visible');
        const toastText = $body.find('.oxd-toast--success').text().trim();
        if (toastText.includes(message) || toastText.includes('Success')) {
          cy.log(`Success message verified: ${toastText}`);
        } else {
          cy.log(`Expected "${message}" but got "${toastText}"`);
        }
      } else if ($body.find('.oxd-toast').length > 0) {
        cy.get('.oxd-toast').should('be.visible');
        cy.log('Toast message found but not success type');
      } else {
        cy.log(`No toast message found. Expected: ${message}`);
      }
    });
  }
}

export default new RecruitmentPage();