# Histórico de Correções (Fixes)

Este documento registra as principais correções aplicadas ao projeto, detalhando o problema, a causa raiz e a solução implementada.

## 1. Erro de Sincronia no Cypress (`cy.then()`)

- **Data da Correção:** 2025-07-03
- **Arquivos Afetados:** `cypress/e2e/01-login.cy.js`, `cypress/pages/LoginPage.js`, `cypress/pages/DashboardPage.js`

### Problema

Os testes falhavam com a mensagem: `cy.then() failed because you are mixing up async and sync code.` Este erro ocorria de forma intermitente, principalmente nos testes de performance e em outras suítes que dependiam dos Page Objects.

### Causa Raiz

A investigação revelou duas causas principais:

1.  **Uso Incorreto de `cy.then()`:** Nos testes de performance, a função `cy.then()` era chamada de forma isolada, sem estar encadeada a um comando Cypress anterior. Isso quebrava a fila de execução assíncrona do Cypress.

2.  **Anti-Padrão em Page Objects:** A causa mais profunda do problema era um anti-padrão nos arquivos de Page Object (`LoginPage.js` e `DashboardPage.js`). Os métodos nestas classes (ex: `login()`, `verifyDashboardLoaded()`) executavam comandos `cy` e, ao final, retornavam `this` (`return this;`). Isso misturava o código assíncrono do Cypress com um retorno síncrono, corrompendo a cadeia de comandos e causando o erro.

### Solução

A correção foi realizada em duas etapas:

1.  **Remoção do `return this;`:** Todas as ocorrências de `return this;` foram removidas dos métodos nos arquivos `LoginPage.js` e `DashboardPage.js`. Isso garante que os métodos dos Page Objects não retornem valores síncronos, alinhando-os com as boas práticas do Cypress.

2.  **Refatoração das Chamadas Encadeadas:** Como consequência da remoção do `return this;`, o encadeamento de métodos (ex: `loginPage.verifyElements().clickSomething()`) não era mais possível. Todas as chamadas encadeadas nos arquivos de teste (`*.cy.js`) foram refatoradas para que cada método seja chamado em sua própria linha, de forma sequencial.

Essa abordagem resolveu o problema de sincronia de forma definitiva e tornou o código mais robusto e alinhado com as práticas recomendadas pelo Cypress.
