'use strict';

module.exports = {
  root: true,
  extends: [
    '@wearegenki/eslint-config',
  ],
  parserOptions: {
    ecmaVersion: 6,
  },
  rules: {
    // runtime should be es3
    'no-var': 'off',
    'vars-on-top': 'off',
    'prefer-destructuring': 'off',
    'prefer-arrow-callback': 'off',
  },
};
