// ***********************************************
// This file defines custom commands for Cypress.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Custom command to fill out the contact form
Cypress.Commands.add('fillContactForm', (name, email, phone, service, message) => {
  cy.get('#name').type(name);
  cy.get('#email').type(email);
  if (phone) cy.get('#phone').type(phone);
  cy.get('#service').select(service);
  if (message) cy.get('#message').type(message);
});

// Custom command to check if an element is in viewport
Cypress.Commands.add('isInViewport', { prevSubject: true }, (subject) => {
  const bottom = Cypress.$(cy.state('window')).height();
  const rect = subject[0].getBoundingClientRect();
  
  expect(rect.top).to.be.lessThan(bottom);
  expect(rect.bottom).to.be.greaterThan(0);
  
  return subject;
});

// Custom command to switch language
Cypress.Commands.add('switchLanguage', (language) => {
  cy.get('#language-selector').select(language);
});