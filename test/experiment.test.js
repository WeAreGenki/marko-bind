/* eslint-disable */
/* globals test */

var expect = require('chai').expect;

test('variant-danger', function(context) {
  var output = context.render({ variant: 'danger' });
  expect(output.html).to.contain('app-button-danger');
});

// A similar test can be done using jQuery selectors (powered by cheerio):
test('variant-info', function(context) {
  var output = context.render({ variant: 'info' });
  expect(output.$('button').attr('class')).to.equal(
    'app-button app-button-info'
  );
});

// Async test:
test('my async test', function(context, done) {
  setTimeout(function() {
    done();
  }, 100);
});

// Use test.only to only run a single test:
test.only('foo', function(context) {
  // ...
});

// Use test.skip to skip tests
test.skip('bar', function(context) {
  // ...
});
