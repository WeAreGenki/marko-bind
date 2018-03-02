'use strict';

module.exports = {
  root: true,
  extends: ['@wearegenki/eslint-config'],
  parserOptions: {
    ecmaVersion: 6,
  },
  rules: {
    /**
     * Runtimes are to be written in es5 but there are some extra cross-browser
     * caveats to take notice of.
     */
    'func-names': 'off', // no arrow functions so we need oldschool anonymous functions
    'no-var': 'off', // let/const not supported in IE10
    'prefer-destructuring': 'off', // not supported in IE
    'prefer-arrow-callback': 'off', // arrow functions not supported in IE10
  },
};
