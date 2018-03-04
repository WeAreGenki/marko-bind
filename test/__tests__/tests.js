require('marko/node-require');
const { renderMarkoComponent } = require('@wearegenki/test/lib/marko');
const inputText = require('./components/input-text.marko');
// const inputSelect = require('./components/input-select.marko');

test('marko component rendered correctly', () => {
  console.log('### 00', renderMarkoComponent);
  console.log('### 11', inputText);
  const component = renderMarkoComponent(inputText);
  console.log('### 22', component);
  expect(component.state.text).toBeDefined();
});
