# Guia de Solução de Problemas (Troubleshooting)

Este documento ajuda a resolver problemas e erros comuns que podem ocorrer durante o desenvolvimento e a execução dos testes.

## 1. Erro: `cy.then() failed because you are mixing up async and sync code`

- **Sintoma:** O teste falha com uma mensagem de erro indicando que você está misturando código síncrono e assíncrono. Isso geralmente acontece de forma intermitente e pode parecer difícil de rastrear.

- **Causa Comum:** A causa mais provável é um anti-padrão nos seus **Page Objects**. Se os métodos do seu Page Object executam um ou mais comandos `cy` (que são assíncronos) e depois retornam um valor síncrono como `this` (`return this;`), isso corrompe a cadeia de comandos do Cypress.

  **Exemplo do Problema (Anti-Padrão):**

  ```javascript
  // Em um Page Object (ex: LoginPage.js)
  class LoginPage {
    login(username, password) {
      cy.get('#username').type(username);
      cy.get('#password').type(password);
      cy.get('#login-button').click();
      return this; // <-- Este é o problema!
    }
  }
  ```

- **Solução:**

  1.  **Remova `return this;` dos seus Page Objects:** Revise todos os métodos nos seus arquivos de Page Object e remova qualquer linha que contenha `return this;`.

  2.  **Ajuste as Chamadas nos Testes:** Como resultado da remoção do `return this;`, você não poderá mais encadear chamadas de método do Page Object. Em vez disso, chame cada método em sua própria linha.

     **Código Corrigido no Teste:**

     ```javascript
     // Antes (com erro)
     loginPage.enterUsername('user').enterPassword('pass').clickLogin();

     // Depois (corrigido)
     loginPage.enterUsername('user');
     loginPage.enterPassword('pass');
     loginPage.clickLogin();
     ```

- **Referência:** Para mais detalhes sobre esta correção específica no projeto, consulte o arquivo **[FIXES.md](./FIXES.md)**.
