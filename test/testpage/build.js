/* eslint-disable no-console */

'use strict';

const path = require('path');
const lasso = require('lasso');

(async () => {
  try {
    lasso.configure({
      plugins: ['lasso-marko'],
      urlPrefix: '/static/',
      outputDir: path.join(__dirname, 'static'),
      bundlingEnabled: true,
      minify: false,
      fingerprintsEnabled: false,
    });

    const result = await lasso.lassoPage({
      name: 'test',
      dependencies: ['require-run: ./test/testpage/entry'],
    });

    console.log('\nTest page build result:', result);
  } catch (err) {
    throw err;
  }
})();
