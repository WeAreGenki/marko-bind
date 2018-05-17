'use strict'; // eslint-disable-line

// const { mount } = require('@wearegenki/test/lib/marko/helpers');

const InputText = require('./fixtures/InputText.marko');
// const InputSelect = require('./fixtures/InputSelect.marko');

describe('Basic text input component', () => {
  beforeAll(async () => {
    console.log('@@@@@ InputText', InputText);
    console.log('@@@@@ InputText', await InputText);
  });

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

describe('Puppeteer setup', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:12345/');
  });

  it('should load server', async () => {
    // console.log(await page.content());
    await page.waitForSelector('#target1');
  });
});
