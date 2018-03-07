'use strict'; // eslint-disable-line

const resolve = require('path').resolve;

module.exports = {
  rootDir: resolve(__dirname, '..'),
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/\\.cache/',
    '/static/',
  ],
  transform: {
    '^.+\\.(marko)$': '<rootDir>/test/transform.js',
  },
  moduleFileExtensions: ['js', 'marko'],
  coverageDirectory: '<rootDir>/test/coverage',
  collectCoverageFrom: ['src/**/*.js'],
  // coverageThreshold: {
  //   global: {
  //     branches: 0,
  //     functions: 0,
  //     lines: 0,
  //     statements: 0,
  //   },
  // },
  coverageReporters: ['text'],
};
