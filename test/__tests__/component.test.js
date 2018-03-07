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

  it('should getValue() correctly', () => {
    const render = component.render({
      id: 'woo',
      label: 'aaa',
      placeholder: 'aaa',
    });
    return render.then((renderResult) => {
      // console.log('@@ renderResult', renderResult);
      // console.log('@@ CHECK 000', markoComponents.init, markoComponents);
      // console.log('@@ CHECK 111', !!renderResult.appendTo);
      // console.log('@@ CHECK 222', !!renderResult.getComponent);
      // console.log('@@ CHECK 333', renderResult.appendTo(document.body));
      // console.log('@@ CHECK 444', renderResult.getComponent());

      // require('marko/components').init(); // eslint-disable-line

      renderResult.appendTo(document.body);
      expect(renderResult.getComponent().getValue()).toBe('woo');
    });
  });
});
