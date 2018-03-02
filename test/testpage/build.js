/* eslint-disable no-console */

'use strict';

const lasso = require('lasso');

lasso.configure({
  plugins: ['lasso-marko'],
  urlPrefix: '/',
  outputDir: __dirname,
  bundlingEnabled: true,
  minify: false,
  fingerprintsEnabled: false,
});

lasso
  .lassoPage({
    name: 'testpage',
    dependencies: ['require-run: ./test/testpage/entry'],
  })
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    throw err;
  });
