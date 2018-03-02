'use strict';

module.exports = {
  globalSetup: './setup.js',
  globalTeardown: './teardown.js',
  testEnvironment: './puppeteer_environment.js',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/manual-testing/',
  ],
};
