/// <reference types="cypress" />
// ***********************************************************
// This file can be used to load plugins and extend Cypress behavior
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // Example: Modify the viewport size for specific tests
  on('before:browser:launch', (browser, launchOptions) => {
    if (browser.name === 'chrome' && browser.isHeadless) {
      launchOptions.args.push('--window-size=1280,720');
      return launchOptions;
    }
  });

  return config;
};