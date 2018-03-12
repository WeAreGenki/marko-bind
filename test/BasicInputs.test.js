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

  // it('should have an input', async () => {
  //   const renderResult = await InputText.render({
  //     id: 'oom',
  //     label: 'aaa',
  //     placeholder: 'aaa',
  //   });
  //   const context = await mount(renderResult);
  //   expect(context.input).toBeDefined();
  // });

  // it.skip('should getValue() correctly', async () => {
  //   const renderResult = await InputText.render({
  //     id: 'woo',
  //     label: 'bbb',
  //     placeholder: 'bbb',
  //   });
  //   const context = await mount(renderResult);
  //   expect(context.getValue()).toBe('woo');
  // });
});
