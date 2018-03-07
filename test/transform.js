const compiler = require('marko/compiler');

module.exports = {
  process(src, filepath) {
    return compiler.compileFile(filepath, {
      // writeToDisk: false,
      // output: 'html',
      // writeVersionComment: false,
      // autoKeyEnabled: true,
    });
  },
};
