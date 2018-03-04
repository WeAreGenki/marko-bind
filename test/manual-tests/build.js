'use strict'; // eslint-disable-line

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
      name: 'index',
      dependencies: ['require-run: ./test/manual-tests/client'],
    });

    console.log('\nTest page build result:', result);
  } catch (err) {
    throw err;
  }
})();
