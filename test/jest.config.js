'use strict'; // eslint-disable-line

const path = require('path');

const { libDir } = require('@wearegenki/test');

module.exports = {
  preset: '@wearegenki/test',
  rootDir: path.resolve(__dirname, '..'),
  coverageDirectory: '<rootDir>/test/coverage',

  // marko specific setup
  browser: true, // use browser field in package.json
  resolver: `${libDir}/marko/resolver.js`,
  transform: {
    // '^.+\\.jsx?$': 'babel-jest', // don't use babel to transpile
    '^.+\\.(html|marko)$': `${libDir}/marko/transform.js`,
  },
};
