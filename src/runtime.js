// TODO: Handle the various inputs and their edge cases
//  ↳ REF: https://github.com/vuejs/vue/blob/master/src/platforms/web/compiler/directives/model.js

'use strict'; // eslint-disable-line

module.exports = function bind(key, event) {
  this.setState(key, event.target.value);
};
