# Projeto de Automação de Testes para OrangeHRM

![Cypress](https://img.shields.io/badge/Cypress-14.5.1-blue?style=for-the-badge&logo=cypress&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-16.0+-green?style=for-the-badge&logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

---

## 🎯 Visão Geral

Este repositório contém uma suíte de testes de automação de ponta a ponta (E2E) para o site de demonstração do **OrangeHRM**. O projeto foi desenvolvido com **Cypress** para garantir a qualidade e a estabilidade das principais funcionalidades da plataforma, como:

-   ✅ Login e Autenticação
-   ✅ Gerenciamento do Dashboard
-   ✅ Módulo de Gerenciamento de Informações Pessoais (PIM)
-   ✅ Funcionalidades Administrativas

O código é estruturado utilizando o padrão **Page Objects** para promover a clareza, a reutilização e a manutenibilidade dos testes.

---

## 🚀 Começando

Para configurar e executar o projeto em seu ambiente local, siga as instruções detalhadas no nosso **[GUIA DE INÍCIO RÁPIDO](./QUICK_START.md)**.

---

## 📂 Estrutura do Projeto

A estrutura de pastas segue as convenções do Cypress, organizando os testes, dados e Page Objects de forma lógica.

```sh
HRM-test/
├── cypress/
│   ├── e2e/         # Arquivos de teste (specs)
│   ├── fixtures/    # Massa de dados (JSON)
│   ├── pages/       # Page Objects
│   └── support/     # Comandos customizados e configurações
├── cypress.config.js # Configuração principal do Cypress
└── package.json      # Dependências e scripts do projeto
```

---

## 🛠️ Comandos Disponíveis

O projeto possui uma série de scripts para facilitar a execução dos testes em diferentes cenários.

Para uma lista completa de todos os comandos e suas descrições, consulte o arquivo **[COMANDOS.md](./COMANDOS.md)**.