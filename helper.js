// FIXME: Handle the various input types; input, select, textarea, etc.

'use strict'; // eslint-disable-line

module.exports = function bind(out, state, component, event) {
  console.log('HELPER', [out, state, component, event]);
  // console.log('@@ 11 OUT', out);
  // console.log('@@ 22 STATE', state);
  // console.log('@@ 33 COMPONENT', component);
  // console.log('@@ 33', event);
  // console.log('\n------------------------\n');

  // out.on('input', function onInput(key, event) { // eslint-disable-line
  //   console.log('YES!!', key, event);
  //   this.setState(key, event.target.value);
  // });

  // eslint-disable-next-line
  // out.on('input', () => {
  //   console.log('YES!!');
  // });

  // out.write(state);
  // out.write('here 11');
};
