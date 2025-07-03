# Projeto de Automação de Testes para OrangeHRM com Cypress

Este repositório contém uma suíte de testes de automação de ponta a ponta (E2E) para o site de demonstração do OrangeHRM, desenvolvida com [Cypress](https://www.cypress.io/).

## Visão Geral

O objetivo deste projeto é garantir a qualidade e a estabilidade das principais funcionalidades do OrangeHRM, incluindo:

- Login e Autenticação
- Gerenciamento do Dashboard
- Módulo de Gerenciamento de Informações Pessoais (PIM)
- Funcionalidades Administrativas

O projeto utiliza o padrão de Page Objects para organizar o código de forma clara e manutenível.

## Começando

Para configurar e executar o projeto em seu ambiente local, siga as instruções detalhadas no nosso **[Guia de Início Rápido (Quick Start)](./QUICK_START.md)**.

## Estrutura do Projeto

```
HRM-test/
├── cypress/
│   ├── e2e/         # Arquivos de teste (specs)
│   ├── fixtures/    # Dados de teste (massa de dados)
│   ├── pages/       # Page Objects
│   └── support/     # Comandos customizados e configurações
├── cypress.config.js # Configuração principal do Cypress
└── package.json      # Dependências e scripts do projeto
```

## Comandos Disponíveis

O projeto possui uma série de scripts para facilitar a execução dos testes em diferentes cenários (interativo, headless, por navegador, etc.).

Para uma lista completa e detalhada de todos os comandos, consulte o arquivo **[COMANDOS.md](./COMANDOS.md)**.

## Solução de Problemas e Correções

- Para soluções de problemas comuns e erros conhecidos, consulte o **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)**.
- Para um histórico detalhado das correções implementadas no projeto, veja o **[FIXES.md](./FIXES.md)**.

## Contribuições

Contribuições são bem-vindas! Se você deseja contribuir, por favor, siga os seguintes passos:

1.  Faça um fork do repositório.
2.  Crie uma nova branch para a sua feature ou correção (`git checkout -b minha-feature`).
3.  Implemente suas alterações e adicione novos testes, se aplicável.
4.  Certifique-se de que todos os testes estão passando (`npm run test`).
5.  Faça um commit das suas alterações (`git commit -m 'Adiciona minha feature'`).
6.  Envie para a sua branch (`git push origin minha-feature`).
7.  Abra um Pull Request.
