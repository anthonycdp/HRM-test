<div align="center">

# 🧪 OrangeHRM Test Suite

![Cypress](https://img.shields.io/badge/Cypress-14.5.1-17202C?style=for-the-badge&logo=cypress&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-18+-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

*End-to-end test automation project for OrangeHRM system using Cypress*

[Get Started](#-installation) • [Documentation](#-main-features) • [Usage](#-running-tests) • [License](#-license)

</div>

---

## 📋 Overview

This project contains a comprehensive E2E test automation suite for the OrangeHRM system using Cypress. The tests were developed to validate all main modules and functionalities with focus on:

- Complete module coverage (11 modules)
- Page Object Model pattern implementation
- Custom commands for reusability
- Automated reporting with screenshots and videos
- Cross-browser testing support

## 🎯 Objectives

- Demonstrate proficiency in test automation using Cypress
- Implement comprehensive E2E testing for HRM system
- Apply Page Object Model design pattern
- Create maintainable and scalable test architecture
- Ensure robust error handling and reporting

## 🛠️ Technologies and Tools

- **Cypress** v14.5.1 - E2E testing framework
- **JavaScript** ES6+ - Programming language
- **Node.js** 18+ - JavaScript runtime
- **Page Object Model** - Design pattern for maintainability

## 📁 Project Structure

```
cypress/
├── e2e/                    # Test files
│   ├── admin.spec.js       # Admin module tests
│   ├── buzz.spec.js        # Buzz module tests
│   ├── claim.spec.js       # Claim module tests
│   ├── directory.spec.js   # Directory module tests
│   ├── leave.spec.js       # Leave module tests
│   ├── login.spec.js       # Login tests
│   ├── performance.spec.js # Performance module tests
│   ├── pim.spec.js         # PIM module tests
│   ├── recruitment.spec.js # Recruitment module tests
│   ├── smoke.spec.js       # Smoke tests
│   └── time.spec.js        # Time module tests
├── fixtures/               # Test data
│   └── users.json         # Users and test data
├── pages/                  # Page Objects
│   ├── LoginPage.js
│   ├── DashboardPage.js
│   ├── AdminPage.js
│   └── ...
└── support/               # Custom commands
    ├── commands.js        # Reusable commands
    └── e2e.js            # Global configurations
```

## 📦 Prerequisites

- **Node.js** (version 18 or higher)
- **npm** or **yarn**
- **Browser** Chrome or Firefox

## 🚀 Installation

1. Clone the repository:
```bash
git clone https://github.com/anthonycdp/hrm-test.git
cd hrm-test
```

2. Install dependencies:
```bash
npm install
```

## 💻 Usage

### Running Tests

#### Interactive Mode (GUI)
```bash
npm run cypress:open
```

#### Headless Mode (Terminal)
```bash
npm test
# or
npm run cypress:run
```

#### Browser Specific
```bash
npm run test:chrome
npm run cypress:run:firefox
```

#### Headed Mode
```bash
npm run test:headed
npm run cypress:run:headed
```

#### Specific Tests
```bash
npx cypress run --spec "cypress/e2e/login.spec.js"
npx cypress run --spec "cypress/e2e/admin.spec.js"
```

## 🧪 Main Features

### Module Coverage

| Module | Description | Status |
|--------|-------------|---------|
| **Admin** | User management and settings | ✅ |
| **Buzz** | Corporate social network | ✅ |
| **Claim** | Reimbursement requests | ✅ |
| **Directory** | Employee directory | ✅ |
| **Leave** | Leave and vacation management | ✅ |
| **Login** | Authentication and security | ✅ |
| **Performance** | Performance evaluations | ✅ |
| **PIM** | Personal information management | ✅ |
| **Recruitment** | Recruitment process | ✅ |
| **Smoke** | Basic functionality tests | ✅ |
| **Time** | Time tracking and timesheet | ✅ |

### Test Types
- **Functional positive** - Main workflows
- **Functional negative** - Validations and errors
- **Interface (UI)** - Visual elements
- **Responsiveness** - Different resolutions
- **Accessibility** - WCAG standards
- **Performance** - Loading times
- **Security** - Access validations

## 🔍 Validations Implemented

### Test Configuration
- **Base URL**: https://opensource-demo.orangehrmlive.com
- **Timeouts**: 15s default, 45s for loading
- **Capture**: Automatic screenshots and videos
- **Viewport**: 1280x720
- **Retries**: 2x in run mode, 1x in open mode

### Custom Commands
- **Login/logout automation** (`cy.login()`)
- **Module navigation** (`cy.navigateTo()`)
- **Field validations** (`cy.verifyFieldError()`)
- **Loading verifications** (`cy.waitForLoading()`)
- **Success verifications** (`cy.verifySuccessMessage()`)

### Best Practices
- Page Object Model pattern implementation
- Dynamic waits over static waits
- Conditional verifications to avoid unnecessary failures
- Fixed methods for greater robustness in unstable elements

## 📊 Project Statistics

- **Total Modules**: 11 HRM modules tested
- **Test Cases**: 100+ automated test cases
- **Custom Commands**: 5+ reusable commands
- **Page Objects**: 10+ page object classes
- **Test Types**: 7 different validation types
- **Browser Support**: Chrome, Firefox

## 🎓 Best Practices and Learnings

### Implemented
- **Page Object Model** for code organization and reusability
- **Custom commands** for common operations
- **Data-driven testing** with fixtures
- **Automated reporting** with visual evidence
- **Cross-browser testing** support
- **Robust error handling** and retry mechanisms

### Development Process
1. **Requirements Analysis**: Understanding HRM module functionalities
2. **Test Planning**: Defining test cases and coverage
3. **Framework Setup**: Cypress configuration and structure
4. **Page Objects Creation**: Maintainable element selectors
5. **Test Implementation**: Writing comprehensive test cases
6. **Optimization**: Performance and reliability improvements

## 🔧 Troubleshooting

### Common Issues

#### Timeout Errors
**Solution**: Increase timeouts in `cypress.config.js`, check internet connection, confirm site accessibility

#### Selector Problems
**Solution**: Selectors may change between OrangeHRM versions, update PageObjects as needed, use more specific selectors

#### Quick Test
```bash
# Quick test to verify everything works
npx cypress run --spec "cypress/e2e/smoke.spec.js"
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contribution

This project was developed as a demonstration of skills in:
- **E2E test automation** with Cypress
- **Page Object Model** design pattern
- **Test architecture** and maintainability
- **Cross-browser testing** strategies
- **Automated reporting** and documentation

## 👤 Author

<div align="center">

**Anthony Coelho**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/anthonycdp)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/anthonycoelhoqae/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:anthonycoelho.dp@hotmail.com)

*QA Engineer specialized in test automation and Cypress*

</div>

---

<div align="center">

### If this project was useful to you, consider giving it a star!

### Contributions are welcome!

**Version**: 1.0.0

</div>