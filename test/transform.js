'use strict'; // eslint-disable-line

const compiler = require('marko/compiler');

module.exports = {
  process(src, filepath) {
    return compiler.compileFile(src, filepath, {
      // writeToDisk: false,
      // output: 'html',
      // writeVersionComment: false,
      // autoKeyEnabled: true,
    });
  },
};
