# Comandos do Projeto

Este arquivo centraliza os comandos essenciais para interagir com o projeto de automação de testes do OrangeHRM.

## Instalação

Para configurar o ambiente de desenvolvimento, instale as dependências do Node.js.

```bash
npm install
```

## Execução dos Testes

Os testes podem ser executados de várias maneiras, utilizando os scripts definidos no `package.json`.

### Abrir o Cypress Test Runner (Modo Interativo)

Este comando abre a interface gráfica do Cypress, permitindo que você execute testes de forma interativa e visualize o passo a passo da execução.

```bash
npm run cy:open
```

### Executar Todos os Testes (Headless)

Este comando executa todos os testes em modo headless (sem interface gráfica), ideal para integração contínua.

```bash
npm run test:headless
```

### Executar Todos os Testes (Com Browser)

Executa todos os testes em um navegador visível (headed mode).

```bash
npm run cy:run
```

### Executar Testes por Navegador

Você pode especificar o navegador no qual os testes serão executados.

- **Chrome:**
  ```bash
  npm run cy:run:chrome
  ```
- **Firefox:**
  ```bash
  npm run cy:run:firefox
  ```
- **Edge:**
  ```bash
  npm run cy:run:edge
  ```

### Executar Testes por Funcionalidade (Spec)

É possível executar suítes de testes específicas para cada funcionalidade.

- **Login:**
  ```bash
  npm run test:login
  ```
- **Dashboard:**
  ```bash
  npm run test:dashboard
  ```
- **PIM (Personal Information Management):**
  ```bash
  npm run test:pim
  ```
- **Admin:**
  ```bash
  npm run test:admin
  ```
- **End-to-End (E2E):**
  ```bash
  npm run test:e2e
  ```

## Comandos Úteis do Cypress

O Cypress oferece comandos CLI para gerenciar a ferramenta.

### Verificar a Instalação do Cypress

Garante que o Cypress está instalado corretamente e pode ser executado.

```bash
npm run verify
```

### Obter Informações do Ambiente

Exibe informações detalhadas sobre a versão do Cypress e do Node.js.

```bash
npm run info
```
