# Correções Específicas de Login

Este arquivo detalha as correções aplicadas especificamente à funcionalidade de login.

## 1. Correção de Erro de Sincronia em Testes de Login

- **Data da Correção:** 2025-07-03
- **Arquivos Relevantes:** `cypress/e2e/01-login.cy.js`, `cypress/pages/LoginPage.js`

### Problema

Os testes de login falhavam intermitentemente com o erro `cy.then() failed because you are mixing up async and sync code`. O erro era causado por uma má prática no `LoginPage.js`, onde os métodos retornavam `this` após executarem comandos Cypress.

### Solução

A solução envolveu a remoção de todas as instâncias de `return this;` do `LoginPage.js` e a refatoração dos testes em `01-login.cy.js` para chamar os métodos do Page Object em linhas separadas, em vez de encadeá-los.

Para uma explicação técnica completa do problema e da solução, consulte o arquivo **[FIXES.md](./FIXES.md)**.
