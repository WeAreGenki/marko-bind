const template = require('./template.marko');

module.exports = (req, res) => {
  res.marko(template, {});
};
