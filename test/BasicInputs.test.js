'use strict'; // eslint-disable-line

const InputText = require('./fixtures/InputText');
// const InputSelect = require('./fixtures/InputSelect');

describe('Basic text input component', () => {
  it('should have a renderToString function', () => {
    expect(InputText.renderToString).toBeDefined();
  });

  it('should render correctly', () => {
    InputText.renderToString({
      id: 'txtMoo',
      label: 'Moo',
      placeholder: 'E.g: cow',
    }, (err, html) => {
      if (err) throw err;
      expect(html).toMatchSnapshot();
    });
  });

  it.skip('should have an input', async () => {
    const renderResult = await InputText.render({
      id: 'oom',
      label: 'aaa',
      placeholder: 'aaa',
    });
    const browserContext = renderResult.appendTo(document.body).getComponent();
    expect(browserContext.input).toBeDefined();
  });

  it.skip('should getValue() correctly', async () => {
    const renderResult = await InputText.render({
      id: 'woo',
      label: 'bbb',
      placeholder: 'bbb',
    });
    const browserContext = renderResult.appendTo(document.body).getComponent();
    expect(browserContext.getValue()).toBe('woo');
  });
});
