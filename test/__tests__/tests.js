const { renderMarkoComponent } = require('@wearegenki/test/lib/marko');
const inputText = require('./components/input-text.marko');
// import inputSelect = require('./components/input-select.marko');

test('marko component rendered correctly', () => {
  const component = renderMarkoComponent(inputText);
  console.log('###', component);
  expect(component.state.text).toBeDefined();
});
