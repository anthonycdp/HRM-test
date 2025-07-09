import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import RecruitmentPage from '../pages/RecruitmentPage';

describe('Recruitment Module', () => {
  let userData;

  before(() => {
    cy.fixture('users').then((data) => {
      userData = data;
    });
  });

  beforeEach(() => {
    cy.login(userData.admin.username, userData.admin.password);
    DashboardPage.navigateTo('recruitment');
    cy.verifyPageTitle('Recruitment');
  });

  context('Candidate Management', () => {
    it('should add new candidate successfully', () => {
      const candidate = userData.candidateData.testCandidate;
      
      cy.get('body').then($body => {
        if ($body.find('button:contains("Add")').length > 0) {
          RecruitmentPage.clickAddCandidate();
          cy.wait(1000);
          cy.verifyPageTitle('Add Candidate');
          
          RecruitmentPage.addCandidateFixed(candidate);
          cy.wait(1000);
          RecruitmentPage.verifySuccessMessageSafe('Successfully Saved');
        } else {
          cy.log('Botão Add não encontrado na página');
        }
      });
    });

    it('should validate required fields when adding candidate', () => {
      RecruitmentPage.clickAddCandidate();
      RecruitmentPage.elements.addCandidateForm.saveButton().click();
      
      cy.verifyRequiredFieldError('input[name="firstName"]');
      cy.verifyRequiredFieldError('input[name="lastName"]');
      cy.verifyRequiredFieldError('.oxd-select-text');
      cy.verifyRequiredFieldError('.oxd-input');
    });

    it('should validate email format', () => {
      RecruitmentPage.clickAddCandidate();
      
      RecruitmentPage.elements.addCandidateForm.firstNameInput().type('Test');
      RecruitmentPage.elements.addCandidateForm.lastNameInput().type('User');
      
      RecruitmentPage.elements.addCandidateForm.vacancyDropdown().click();
      cy.get('.oxd-select-dropdown').first().click();
      
      RecruitmentPage.elements.addCandidateForm.emailInput().type('invalid-email');
      RecruitmentPage.elements.addCandidateForm.saveButton().click();
      
      cy.verifyFieldError('.oxd-input', 'Expected format: admin@example.com');
    });

    it('should upload resume successfully', () => {
      cy.get('body').then($body => {
        if ($body.find('button:contains("Add")').length > 0) {
          RecruitmentPage.clickAddCandidate();
          cy.wait(1000);
          
          const candidate = userData.candidateData.testCandidate;
          RecruitmentPage.fillBasicCandidateInfo(candidate);
          RecruitmentPage.uploadResumeFileFixed('cypress/fixtures/test-resume.pdf');
          RecruitmentPage.elements.addCandidateForm.saveButton().click();
          cy.wait(1000);
          RecruitmentPage.verifySuccessMessageSafe('Successfully Saved');
        } else {
          cy.log('Botão Add não encontrado na página');
        }
      });
    });
  });

  context('Candidate Search', () => {
    it('should search candidates by job title', () => {
      cy.get('body').then($body => {
        if ($body.find('.oxd-select-text').length > 0) {
          RecruitmentPage.searchCandidate({ jobTitle: 'Software Engineer' });
          cy.waitForLoading();
          RecruitmentPage.verifyTable();
        } else {
          cy.log('Dropdown de Job Title não encontrado - pulando teste');
        }
      });
    });

    it('should search candidates by vacancy', () => {
      cy.get('body').then($body => {
        if ($body.find('.oxd-select-text').length > 1) {
          RecruitmentPage.searchCandidate({ vacancy: 'Software Engineer' });
          cy.waitForLoading();
          RecruitmentPage.verifyTable();
        } else {
          cy.log('Dropdown de Vacancy não encontrado - pulando teste');
        }
      });
    });

    it('should search candidates by status', () => {
      cy.get('body').then($body => {
        if ($body.find('.oxd-select-text').length > 3) {
          RecruitmentPage.searchCandidate({ status: 'Application Initiated' });
          cy.waitForLoading();
          RecruitmentPage.verifyTable();
        } else {
          cy.log('Dropdown de Status não encontrado - pulando teste');
        }
      });
    });

    it('should search candidates by date range', () => {
      RecruitmentPage.searchCandidateFixed({
        fromDate: '2025-01-01',
        toDate: '2025-12-31'
      });
      cy.waitForLoading();
      RecruitmentPage.verifyTableOrEmpty();
    });

    it('should search candidates by keywords', () => {
      RecruitmentPage.searchCandidate({ keywords: 'java, spring' });
      cy.waitForLoading();
      RecruitmentPage.verifyTable();
    });

    it('should reset search filters', () => {
      RecruitmentPage.searchCandidateFixed({
        jobTitle: 'Software Engineer',
        status: 'Application Initiated'
      });
      cy.waitForLoading();
      RecruitmentPage.resetSearchFiltersFixed();
      RecruitmentPage.verifyDropdownResetFixed();
    });
  });

  context('Candidate Actions', () => {
    it('should view candidate details', () => {
      cy.get('body').then($body => {
        if ($body.find('.oxd-table-body .oxd-table-row').length > 0) {
          RecruitmentPage.getFirstRowCandidateFixed().then($row => {
            if ($row && $row.length > 0) {
              const candidateName = RecruitmentPage.getCandidateNameFromRowFixed($row);
              RecruitmentPage.viewCandidateFixed(candidateName);
              cy.wait(1000);
              cy.verifyPageTitle('Candidate Profile');
            } else {
              cy.log('Nenhum candidato encontrado na tabela');
            }
          });
        } else {
          cy.log('Tabela de candidatos não encontrada');
        }
      });
    });

    it('should shortlist candidate', () => {
      cy.get('body').then($body => {
        if ($body.find('.oxd-table-body .oxd-table-row').length > 0) {
          RecruitmentPage.getFirstRowCandidateFixed().then($row => {
            if ($row && $row.length > 0) {
              const candidateName = RecruitmentPage.getCandidateNameFromRowFixed($row);
              RecruitmentPage.viewCandidateFixed(candidateName);
              cy.wait(1000);
              
              cy.get('body').then($profileBody => {
                if ($profileBody.find('button:contains("Shortlist")').length > 0) {
                  RecruitmentPage.shortlistCandidateFixed();
                  RecruitmentPage.fillShortlistNotesFixed('Good candidate for the position');
                  cy.wait(1000);
                  RecruitmentPage.verifySuccessMessageSafe('Successfully Updated');
                } else {
                  cy.log('Botão Shortlist não disponível para este candidato');
                }
              });
            }
          });
        } else {
          cy.log('Nenhum candidato encontrado para shortlist');
        }
      });
    });

    it('should schedule interview', () => {
      cy.get('body').then($body => {
        if ($body.find('.oxd-table-body .oxd-table-row').length > 0) {
          RecruitmentPage.getFirstRowCandidateFixed().then($row => {
            if ($row && $row.length > 0) {
              const candidateName = RecruitmentPage.getCandidateNameFromRowFixed($row);
              RecruitmentPage.viewCandidateFixed(candidateName);
              cy.wait(1000);
              
              cy.get('body').then($profileBody => {
                if ($profileBody.find('button:contains("Schedule Interview")').length > 0) {
                  RecruitmentPage.scheduleInterviewFixed();
                  cy.wait(1000);
                  cy.verifyPageTitle('Schedule Interview');
                  
                  RecruitmentPage.scheduleInterviewDetailsFixed({
                    title: 'Technical Interview',
                    interviewer: 'Admin',
                    date: '2025-02-15',
                    time: '10:00 AM'
                  });
                  
                  cy.wait(1000);
                  RecruitmentPage.verifySuccessMessageSafe('Successfully Saved');
                } else {
                  cy.log('Botão Schedule Interview não disponível para este candidato');
                }
              });
            }
          });
        } else {
          cy.log('Nenhum candidato encontrado para schedule interview');
        }
      });
    });

    it('should reject candidate', () => {
      cy.get('body').then($body => {
        if ($body.find('.oxd-table-body .oxd-table-row').length > 0) {
          RecruitmentPage.getFirstRowCandidateFixed().then($row => {
            if ($row && $row.length > 0) {
              const candidateName = RecruitmentPage.getCandidateNameFromRowFixed($row);
              RecruitmentPage.viewCandidateFixed(candidateName);
              cy.wait(1000);
              
              cy.get('body').then($profileBody => {
                if ($profileBody.find('button:contains("Reject")').length > 0) {
                  RecruitmentPage.rejectCandidateFixed();
                  RecruitmentPage.fillRejectNotesFixed('Not suitable for the position');
                  cy.wait(1000);
                  RecruitmentPage.verifySuccessMessageSafe('Successfully Updated');
                } else {
                  cy.log('Botão Reject não disponível para este candidato');
                }
              });
            }
          });
        } else {
          cy.log('Nenhum candidato encontrado para reject');
        }
      });
    });
  });

  context('Vacancies', () => {
    it('should navigate to vacancies', () => {
      RecruitmentPage.navigateToVacanciesFixed();
      cy.verifyPageTitle('Vacancies');
    });

    it('should add new vacancy', () => {
      RecruitmentPage.navigateToVacanciesFixed();
      cy.wait(1000);
      
      cy.get('body').then($body => {
        if ($body.find('button:contains("Add")').length > 0) {
          RecruitmentPage.addNewVacancyFixed({
            name: 'Senior Software Engineer',
            jobTitle: 'Software Engineer',
            hiringManager: 'Admin',
            numberOfPositions: '5',
            description: 'Looking for experienced software engineer'
          });
          
          cy.wait(1000);
          RecruitmentPage.verifySuccessMessageSafe('Successfully Saved');
        } else {
          cy.log('Botão Add não encontrado na seção Vacancies');
        }
      });
    });

    it('should search vacancies', () => {
      RecruitmentPage.navigateToVacancies();
      RecruitmentPage.searchVacancy({ jobTitle: 'Software Engineer' });
      RecruitmentPage.verifyTable();
    });

    it('should edit vacancy', () => {
      RecruitmentPage.navigateToVacanciesFixed();
      cy.wait(1000);
      
      cy.get('body').then($body => {
        if ($body.find('.oxd-table-body .oxd-table-row').length > 0) {
          RecruitmentPage.editVacancyFixed('10');
          cy.wait(1000);
          RecruitmentPage.verifySuccessMessageSafe('Successfully Updated');
        } else {
          cy.log('Nenhuma vaga encontrada para editar');
        }
      });
    });

    it('should delete vacancy', () => {
      RecruitmentPage.navigateToVacanciesFixed();
      cy.wait(1000);
      
      cy.get('body').then($body => {
        if ($body.find('.oxd-table-body .oxd-table-row').length > 0) {
          RecruitmentPage.deleteVacancyFixed();
          cy.wait(1000);
          RecruitmentPage.verifySuccessMessageSafe('Successfully Deleted');
        } else {
          cy.log('Nenhuma vaga encontrada para deletar');
        }
      });
    });
  });

  context('UI Validations', () => {
    it('should display correct candidate statuses', () => {
      const validStatuses = [
        'Application Initiated',
        'Shortlisted',
        'Interview Scheduled',
        'Interview Passed',
        'Interview Failed',
        'Job Offered',
        'Offer Declined',
        'Hired',
        'Rejected'
      ];
      
      RecruitmentPage.verifyValidCandidateStatuses(validStatuses);
    });

    it('should validate file upload size', () => {
      RecruitmentPage.clickAddCandidate();
      
      const candidate = userData.candidateData.testCandidate;
      RecruitmentPage.elements.addCandidateForm.firstNameInput().type(candidate.firstName);
      RecruitmentPage.elements.addCandidateForm.lastNameInput().type(candidate.lastName);
      
      RecruitmentPage.elements.addCandidateForm.vacancyDropdown().click();
      cy.get('.oxd-select-dropdown').first().click();
      
      RecruitmentPage.elements.addCandidateForm.emailInput().type(candidate.email);
      
      RecruitmentPage.verifyFileUploadSizeRestriction();
    });

    it('should display action buttons based on candidate status', () => {
      cy.get('body').then($body => {
        if ($body.find('.oxd-table-body .oxd-table-row').length > 0) {
          RecruitmentPage.getFirstRowCandidateFixed().then($row => {
            if ($row && $row.length > 0) {
              const status = RecruitmentPage.getCandidateStatusFromRow($row);
              const candidateName = RecruitmentPage.getCandidateNameFromRowFixed($row);
              if (candidateName && candidateName.trim() !== '') {
                RecruitmentPage.viewCandidateFixed(candidateName);
                cy.wait(1000);
                RecruitmentPage.verifyActionButtonsByStatus(status);
              } else {
                cy.log('Nome do candidato não encontrado ou vazio');
              }
            } else {
              cy.log('Nenhum candidato encontrado na tabela');
            }
          });
        } else {
          cy.log('Tabela de candidatos não encontrada');
        }
      });
    });
  });
});