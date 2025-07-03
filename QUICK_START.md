# Guia de Início Rápido (Quick Start)

Este guia fornece as instruções essenciais para configurar e executar os testes de automação do OrangeHRM em seu ambiente local.

## Pré-requisitos

- **Node.js:** Certifique-se de ter o Node.js instalado (versão 16.0.0 ou superior). Você pode verificar sua versão com o comando `node -v`.
- **NPM:** O NPM (Node Package Manager) é instalado junto com o Node.js.

## Passo a Passo

### 1. Clonar o Repositório

Se você ainda não o fez, clone o repositório do projeto para a sua máquina local.

```bash
git clone https://github.com/your-repo/orange-hrm-cypress-tests.git
cd orange-hrm-cypress-tests
```

### 2. Instalar as Dependências

Execute o comando abaixo na raiz do projeto para instalar o Cypress e outras dependências necessárias.

```bash
npm install
```

### 3. Abrir o Cypress Test Runner

Após a instalação, a maneira mais fácil de começar é abrir o Cypress Test Runner. Ele fornece uma interface visual para executar e depurar os testes.

```bash
npm run cy:open
```

Ao executar este comando pela primeira vez, o Cypress pode levar alguns instantes para inicializar. Uma vez aberto, você verá a lista de todos os testes de E2E. Clique em um arquivo de teste (spec) para executá-lo.

### 4. Executar Todos os Testes via Linha de Comando

Para uma execução completa de todos os testes em um navegador visível (headed mode), utilize o seguinte comando:

```bash
npm run test
```

Se preferir executar em modo headless (sem interface gráfica), ideal para ambientes de CI/CD, use:

```bash
npm run test:headless
```

## Próximos Passos

Com o ambiente configurado, você está pronto para explorar, executar e desenvolver novos testes. Para uma lista completa de todos os comandos disponíveis, consulte o arquivo **[COMANDOS.md](./COMANDOS.md)**.
