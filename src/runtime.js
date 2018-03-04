/**
 * Runtime to handle setting the component state from an input event.
 */

'use strict'; // eslint-disable-line

/**
 * Bind the value from an input event to a component state.
 * @param {MarkoComponent} component The parent Marko component class.
 * @param {string} key Key of the state data object to update.
 * @param {Function} [cb] Optional function to run on input events.
 * @param {Event} event An event emit by the bound input element.
 * @param {(HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement)} el The input
 * element which emit the event.
 */
// module.exports = function bind(component, key, cb, event, el) {
module.exports = function bind(component, key, cb, event, el, ...bonus) {
  var selected;
  var value;
  var assignment;

  /* eslint-disable no-console */ // FIXME: REMOVE; DEBUGGING ONLY!!
  console.log('\n//------------------------------------------//');
  console.log('RUNTIME COMP', component);
  console.log('RUNTIME  KEY', key);
  console.log('RUNTIME   CB', cb);
  console.log('RUNTIME EVNT', event);
  console.log('RUNTIME   EL', el);
  console.log('RUNTIME  TAG', el.tagName);
  console.log('RUNTIME TYPE', el.type);
  console.log('RUNTIME BONUS', bonus);
  console.log('//------------------------------------------//\n');

  if (el.tagName === 'SELECT') {
    // select
    // XXX: el.selectedOptions would be better but isn't supported in IE
    selected = []
      .filter.call(el.options, function (opt) { return opt.selected; })
      .map(function (opt) { return opt.value; });

    value = el.multiple ? selected : selected[0];
    assignment = selected[0];
  } else if (el.type === 'checkbox') {
    // checkbox
    value = el.checked;
  } else if (el.type === 'radio') {
    // radio
    // FIXME: Merge with checkbox if they're the same
    value = el.checked;
  } else {
    // generic input and textarea
    value = el.value;
  }

  component.setState(key, value);

  if (assignment) {
    // without update() the value assignment doesn't work
    component.update();
    el.value = assignment; // eslint-disable-line no-param-reassign
  }

  // run callback function (with context this = component)
  if (typeof cb === 'function') cb.call(component);
};
