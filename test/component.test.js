'use strict'; // eslint-disable-line

const component = require('./fixtures/component');

describe('component', () => {
  it('should have a renderToString function', () => {
    expect(component.renderToString).toBeDefined();
  });

  it('should render correctly', () => {
    component.renderToString({
      id: 'txtMoo',
      label: 'Moo',
      placeholder: 'E.g: cow',
    }, (err, html) => {
      if (err) throw err;
      expect(html).toMatchSnapshot();
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('should have an input', async () => {
    const renderResult = await component.render({
      id: 'oom',
      label: 'aaa',
      placeholder: 'aaa',
    });
    const browserContext = renderResult.appendTo(document.body).getComponent();
    expect(browserContext.input).toBeDefined();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('should getValue() correctly', async () => {
    const renderResult = await component.render({
      id: 'woo',
      label: 'bbb',
      placeholder: 'bbb',
    });
    const browserContext = renderResult.appendTo(document.body).getComponent();
    expect(browserContext.getValue()).toBe('woo');
  });
});
