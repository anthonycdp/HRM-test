const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    pageLoadTimeout: 30000,
    video: true,
    screenshotOnRunFailure: true,
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',
    chromeWebSecurity: false,
    headed: true,
    retries: { runMode: 2, openMode: 0 },
    env: {
      apiUrl: 'https://opensource-demo.orangehrmlive.com/web',
      defaultUsername: 'Admin',
      defaultPassword: 'admin123',
      shortTimeout: 5000,
      mediumTimeout: 10000,
      longTimeout: 30000,
      enableApiMocking: true,
      enablePerformanceMonitoring: true,
      enableAccessibilityTesting: false
    },
    setupNodeEvents(on, config) {
      on('task', {
        log: message => (console.log(message), null),
        generateRandomEmployeeId: () => Math.floor(Math.random() * 10000) + 1000,
        getCurrentTimestamp: () => new Date().toISOString()
      });
      
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome') {
          launchOptions.args.push('--disable-web-security', '--disable-features=VizDisplayCompositor', '--no-sandbox');
          return launchOptions;
        }
      });
      
      on('after:spec', (spec, results) => {
        console.log(`Test file: ${spec.name}`);
        console.log(`Tests: ${results.stats.tests}`);
        console.log(`Passed: ${results.stats.passes}`);
        console.log(`Failed: ${results.stats.failures}`);
      });
      
      if (config.env.NODE_ENV === 'development') {
        config.baseUrl = 'http://localhost:3000';
      }
      
      return config;
    },
    excludeSpecPattern: ['**/examples/*.js', '**/temp/*.js']
  },
  component: {
    devServer: { framework: 'react', bundler: 'webpack' },
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/component.js'
  }
});