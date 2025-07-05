# Testing Documentation for J.O Transportation Website

This document provides information on how to run tests and what they cover for the J.O Transportation website.

## Test Setup

The project uses two testing frameworks:

1. **Jest** - For unit testing JavaScript functionality
2. **Cypress** - For end-to-end (E2E) testing of the user interface

## Prerequisites

Before running tests, make sure you have Node.js and npm installed. Then install the dependencies:

```bash
npm install
```

## Running Unit Tests

Unit tests are written using Jest and test the core JavaScript functionality in isolation.

### Run all unit tests:

```bash
npm test
```

### Run tests in watch mode (for development):

```bash
npm run test:watch
```

### Generate test coverage report:

```bash
npm run test:coverage
```

The coverage report will be generated in the `coverage` directory.

## Running E2E Tests

E2E tests are written using Cypress and test the website as a user would interact with it in a browser.

### Start a local server:

Before running Cypress tests, you need to serve the website locally. You can use any static file server, for example:

```bash
# Using npx and serve (if you don't have it installed)
npx serve -s .

# Or if you have Python installed
python -m http.server 8080
```

### Open Cypress Test Runner:

```bash
npm run cypress:open
```

This will open the Cypress Test Runner, where you can select and run tests interactively.

### Run Cypress tests headlessly:

```bash
npm run cypress:run
```

## Test Coverage

### Unit Tests (Jest)

1. **Form Validation** (`tests/script.test.js`)
   - Required fields validation
   - Email format validation
   - Phone format validation
   - Message content validation
   - Form submission

2. **Language Switching** (`tests/script.test.js`)
   - Changing language
   - RTL support for Arabic

3. **Firebase Integration** (`tests/firebase-init.test.js`)
   - Firebase initialization
   - App Check in production
   - Analytics tracking
   - Event tracking
   - Outbound link tracking

### E2E Tests (Cypress)

1. **Homepage** (`cypress/integration/homepage.spec.js`)
   - Page title and structure
   - Header and navigation
   - Hero section
   - Section navigation
   - Mobile menu
   - Language switching
   - RTL layout

2. **Contact Form** (`cypress/integration/homepage.spec.js`)
   - Form validation
   - Form submission

3. **Responsive Design** (`cypress/integration/homepage.spec.js`)
   - Mobile layout
   - Tablet layout
   - Desktop layout

## Adding New Tests

### Unit Tests

1. Create a new test file in the `tests` directory with the `.test.js` extension
2. Import the necessary testing utilities
3. Write your tests using Jest's `describe` and `test` functions
4. Run the tests using `npm test`

### E2E Tests

1. Create a new test file in the `cypress/integration` directory with the `.spec.js` extension
2. Write your tests using Cypress's `describe` and `it` functions
3. Run the tests using `npm run cypress:open` or `npm run cypress:run`

## Mocking

The tests use various mocking strategies:

1. **DOM Mocking** - Jest tests use JSDOM to simulate a browser environment
2. **API Mocking** - EmailJS and Firebase are mocked to avoid making real API calls
3. **Browser API Mocking** - localStorage, sessionStorage, and other browser APIs are mocked

## Continuous Integration

These tests can be integrated into a CI/CD pipeline by adding the following to your GitHub Actions workflow:

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm ci
      - name: Run unit tests
        run: npm test
      - name: Run E2E tests
        run: npm run cypress:run
```

## Troubleshooting

### Common Issues:

1. **Tests fail with "Cannot find module"**
   - Make sure you've run `npm install`
   - Check that the path to the module is correct

2. **Cypress cannot connect to the server**
   - Make sure your local server is running on port 8080
   - Check that the `baseUrl` in `cypress.json` matches your server URL

3. **Jest tests fail with DOM-related errors**
   - Check that the DOM structure in your tests matches the actual HTML structure
   - Make sure you're properly mocking browser APIs in `tests/setup.js`