// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Cannot read properties of undefined')) {
    return false;
  }
  if (err.message.includes('response')) {
    return false;
  }
  if (err.message.includes('Request failed with status code')) {
    return false;
  }
  if (err.message.includes('status code 500')) {
    return false;
  }
  if (err.message.includes('status code 404')) {
    return false;
  }
  if (err.message.includes('Network Error')) {
    return false;
  }
  if (err.message.includes('fetch')) {
    return false;
  }
  if (err.message.includes('Promise') && err.message.includes('rejected')) {
    return false;
  }
  return true;
});

Cypress.on('window:before:load', (win) => {
  win.addEventListener('unhandledrejection', (event) => {
    console.log('Unhandled promise rejection:', event.reason);
    event.preventDefault();
  });
});
