'use strict'; // eslint-disable-line

const path = require('path');

module.exports = {
  preset: '@wearegenki/test',
  rootDir: path.resolve(__dirname, '..'),
  coverageDirectory: '<rootDir>/test/coverage',
  transform: {}, // don't use babel to transpile
};
