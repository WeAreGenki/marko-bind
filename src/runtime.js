'use strict';

/**
 * Bind the value from an input event to a component state.
 * @param {MarkoComponent} component The parent Marko component class.
 * @param {string} key Key of the state data object to update.
 * @param {Function} [cb] Optional function to run on input events.
 * @param {Event} event An event emit by the bound input element.
 * @param {(HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement)} el The input
 * element which emit the event.
 */
module.exports = function bind(component, key, cb, event, el) {
  // console.log('\n//------------------------------------------//');
  // console.log('RUNTIME COMP', component);
  // console.log('RUNTIME  KEY', key);
  // console.log('RUNTIME   CB', cb);
  // console.log('RUNTIME EVNT', event);
  // console.log('RUNTIME   EL', el);
  // console.log('RUNTIME  TAG', el.tagName);
  // console.log('RUNTIME TYPE', el.type);
  // console.log('//------------------------------------------//\n');

  var value;
  var selected;

  if (el.tagName === 'SELECT') {
    // select
    // XXX: el.selectedOptions would be better but isn't supported in IE
    value = []
      .filter.call(el.options, function (opt) { return opt.selected; })
      .map(function (opt) { return opt.value; });

    selected = value[0];

    if (!el.multiple) value = value[0];
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

  if (selected) {
    // without update() the value assignment doesn't work
    component.update();
    el.value = selected; // eslint-disable-line no-param-reassign
  }

  // run callback function (with context this = component)
  if (typeof cb === 'function') cb.call(component);
};
