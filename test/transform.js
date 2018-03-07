'use strict'; // eslint-disable-line

const compiler = require('marko/compiler');

module.exports = {
  process(src, filePath) {
    return compiler.compileFile(filePath);
  },
};
