/**
 * Handle inputs with dynamic attribute expressions
 *
 * In a separate module so it's imported it only when necessary.
 */

'use strict'; // eslint-disable-line

let setupDone = false;

module.exports = function setup(component, nodes, event) {
  console.log('TODO: RUNTIME DYNAMIC ATTRIBUTES');

  console.log('component', component);
  console.log('nodes', nodes);
  console.log('event', event);

  if (!setupDone) {
    nodes.forEach(function (node) { // eslint-disable-line prefer-arrow-callback, func-names
      console.log(node);
      // const attribute = node.getAttribute('__bind');
      // console.log(attribute);
    });
    setupDone = true;
  }
};
