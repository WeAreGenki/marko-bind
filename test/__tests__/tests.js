// REF: https://gist.github.com/jasonmacdonald/b417d2e9dce32843cbde08fba5320cfe

const { renderMarkoComponent } = require('@wearegenki/test/lib/marko');
const inputText = require('./components/input-text.marko');
const inputSelect = require('./components/input-select.marko');

test('marko components render correctly', () => {
  let component = renderMarkoComponent(inputText);
  expect(component.state.text).toBeDefined();

  component = renderMarkoComponent(inputSelect);
  expect(component.state.selected).toBeDefined();
});

describe('basic text input', () => {
  let component;

  beforeEach(() => {
    // component = renderMarkoComponent(inputText);
  });

  test('event sets component state', () => {
    component = renderMarkoComponent(inputText);

    // wrapper
    //   .find('input')
    //   .simulate('change', { target: { value: 'My new value' }});

    expect(component.state.text).toBeDefined();
  });
});
