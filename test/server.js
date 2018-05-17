'use strict'; // eslint-disable-line

require('marko/express');
require('marko/node-require').install({
  compilerOptions: {
    // output: 'html',
    // checkUpToDate: true,
    writeToDisk: false,
    // preserveWhitespace: true,
    // writeVersionComment: false,
    autoKeyEnabled: false,
  },
});

const express = require('express');
const lasso = require('lasso');
const { serveStatic } = require('lasso/middleware');
const template = require('./template');

const port = process.env.PORT || 12345;

lasso.configure({
  plugins: [{
    plugin: 'lasso-marko',
    config: {
      // output: 'html',
      // checkUpToDate: true,
      writeToDisk: false,
      // preserveWhitespace: true,
      // writeVersionComment: false,
      autoKeyEnabled: false,
    },
  }],
  outputDir: `${__dirname}/.cache`,
  urlPrefix: '/.cache',
  bundlingEnabled: false,
  minify: false,
  fingerprintsEnabled: false,

  // inPlaceDeploymentEnabled: true, // what's this?
});

const app = express();

app.use(serveStatic());

app.get('/', template);

app.listen(port, (err) => {
  if (err) throw err;
});
