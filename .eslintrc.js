// https://eslint.org/docs/user-guide/configuring

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
    'no-var': 'off', // runtimes should be es3
  },
};
