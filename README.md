<div align="center">

# 🧪 OrangeHRM Cypress Test Suite

**Projeto de automação de testes E2E para o sistema OrangeHRM usando Cypress**

![Cypress](https://img.shields.io/badge/Cypress-14.5.1-17202C?style=for-the-badge&logo=cypress&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-18+-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Tests](https://img.shields.io/badge/Tests-100+-brightgreen?style=for-the-badge)]()
[![Modules](https://img.shields.io/badge/Modules-11-blue?style=for-the-badge)]()

</div>

---

## 📋 Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Navegador** Chrome ou Firefox

## 🚀 Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/anthonycdp/hrm-test.git
cd hrm-test
```

2. **Instale as dependências:**
```bash
npm install
```

## ▶️ Execução dos Testes

### Interface Gráfica (Modo Interativo)
```bash
npm run cypress:open
```

### Modo Headless (Terminal)
```bash
npm test
# ou
npm run cypress:run
```

### Executar com navegador específico
```bash
npm run test:chrome
npm run cypress:run:firefox
```

### Executar com interface visível
```bash
npm run test:headed
npm run cypress:run:headed
```

### Executar testes específicos
```bash
npx cypress run --spec "cypress/e2e/login.spec.js"
npx cypress run --spec "cypress/e2e/admin.spec.js"
```

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Cypress** | v14.5.1 | Framework de testes E2E |
| **JavaScript** | ES6+ | Linguagem de programação |
| **Node.js** | 18+ | Runtime JavaScript |

## 📁 Estrutura do Projeto

```
cypress/
├── e2e/                    # Arquivos de teste
│   ├── admin.spec.js       # Testes do módulo Admin
│   ├── buzz.spec.js        # Testes do módulo Buzz
│   ├── claim.spec.js       # Testes do módulo Claim
│   ├── directory.spec.js   # Testes do módulo Directory
│   ├── leave.spec.js       # Testes do módulo Leave
│   ├── login.spec.js       # Testes de login
│   ├── performance.spec.js # Testes do módulo Performance
│   ├── pim.spec.js         # Testes do módulo PIM
│   ├── recruitment.spec.js # Testes do módulo Recruitment
│   ├── smoke.spec.js       # Testes básicos de smoke
│   └── time.spec.js        # Testes do módulo Time
├── fixtures/               # Dados de teste
│   └── users.json         # Usuários e dados de teste
├── pages/                  # Page Objects
│   ├── LoginPage.js
│   ├── DashboardPage.js
│   ├── AdminPage.js
│   ├── BuzzPage.js
│   └── ...
└── support/               # Comandos customizados
    ├── commands.js        # Comandos reutilizáveis
    └── e2e.js            # Configurações globais
```

## 🎯 Cobertura de Testes

### 📊 Módulos Testados

| Módulo | Descrição | Status |
|--------|-----------|---------|
| **Admin** | Gerenciamento de usuários e configurações | ✅ |
| **Buzz** | Rede social corporativa | ✅ |
| **Claim** | Solicitações de reembolso | ✅ |
| **Directory** | Diretório de funcionários | ✅ |
| **Leave** | Gestão de licenças e férias | ✅ |
| **Login** | Autenticação e segurança | ✅ |
| **Performance** | Avaliações de desempenho | ✅ |
| **PIM** | Informações pessoais dos funcionários | ✅ |
| **Recruitment** | Processo de recrutamento | ✅ |
| **Smoke** | Testes básicos de funcionalidade | ✅ |
| **Time** | Controle de ponto e timesheet | ✅ |

**📈 Total: 11 módulos com 100+ casos de teste**

### 🧪 Tipos de Teste
- ✅ **Funcionais positivos** - Fluxos principais
- ❌ **Funcionais negativos** - Validações e erros
- 🎨 **Interface (UI)** - Elementos visuais
- 📱 **Responsividade** - Diferentes resoluções
- ♿ **Acessibilidade** - Padrões WCAG
- ⚡ **Performance** - Tempos de carregamento
- 🔒 **Segurança** - Validações de acesso

## ⚙️ Configuração

### 🔐 Dados de Login
Os testes usam as credenciais padrão do ambiente demo:
- **Username:** `Admin`
- **Password:** `admin123`
- **URL:** https://opensource-demo.orangehrmlive.com

### 🛠️ Configurações do Cypress
As configurações estão no arquivo `cypress.config.js`:
- **URL base:** https://opensource-demo.orangehrmlive.com
- **Timeouts:** 15s padrão, 45s para carregamento
- **Captura:** Screenshots e vídeos automática
- **Viewport:** 1280x720
- **Retries:** 2x em modo run, 1x em modo open
- **Security:** Web security desabilitada para testes cross-origin

## 📊 Relatórios

Os testes geram automaticamente:
- 📸 **Screenshots** de falhas em `cypress/screenshots/`
- 🎥 **Vídeos** de execução em `cypress/videos/`
- 📋 **Relatórios** detalhados no terminal

## 🔧 Padrões e Boas Práticas

### 🏗️ Page Object Model
- ✨ Separação clara entre testes e elementos da página
- 🔄 Reutilização de código através de Page Objects
- 🛠️ Manutenibilidade e escalabilidade

### 🎛️ Comandos Customizados
O projeto inclui comandos customizados para:
- 🔐 Login/logout automatizado (`cy.login()`)
- 🧭 Navegação entre módulos (`cy.navigateTo()`)
- ✅ Validações de campos (`cy.verifyFieldError()`)
- ⏳ Verificações de loading (`cy.waitForLoading()`)
- 🎉 Verificações de sucesso (`cy.verifySuccessMessage()`)

### ⚡ Otimizações Implementadas
- 🕐 Uso de `cy.wait(1000)` padronizado para esperas necessárias
- 🎯 Priorização de esperas dinâmicas sobre waits estáticos
- 🛡️ Verificações condicionais para evitar falhas desnecessárias
- 🔧 Métodos `Fixed` para maior robustez em elementos instáveis

## ❗ Solução de Problemas

### ✅ Problemas Resolvidos

<details>
<summary><strong>Testes não aparecem no Cypress</strong></summary>

**Causa:** Configuração incorreta do `specPattern` no `cypress.config.js`  
**Solução:** Configuração atualizada para reconhecer arquivos `.spec.js`
</details>

<details>
<summary><strong>Erro "Cypress.Commands.add() clearLocalStorage"</strong></summary>

**Causa:** Conflito com comando nativo do Cypress  
**Solução:** Comando removido, usando `cy.clearLocalStorage()` nativo
</details>

<details>
<summary><strong>Erro com dependências cypress-file-upload e cypress-real-events</strong></summary>

**Causa:** Dependências desnecessárias causando conflitos  
**Solução:** Removidas e substituídas por comandos nativos do Cypress
</details>

### 🔧 Troubleshooting Comum

**Erros de timeout:**
- Aumente os timeouts em `cypress.config.js`
- Verifique conexão com a internet
- Confirme se o site está acessível

**Problemas de seletores:**
- Os seletores podem mudar entre versões do OrangeHRM
- Atualize os PageObjects conforme necessário
- Use seletores mais específicos

**Teste rápido:**
```bash
# Teste rápido para verificar se tudo funciona
npx cypress run --spec "cypress/e2e/smoke.spec.js"
```

## 📈 Execução em CI/CD

Para integração contínua:
```bash
npx cypress run --record --key=<your-key>
```

## 🤝 Contribuição

1. 🍴 Fork o projeto
2. 🌿 Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push para a branch (`git push origin feature/AmazingFeature`)
5. 🔄 Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">

**⭐ Se este projeto te ajudou, considere dar uma estrela!**

</div>