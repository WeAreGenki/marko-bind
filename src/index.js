'use strict'; // eslint-disable-line

const runtimeModulePath = require.resolve('./runtime');
const runtimeDynamicModulePath = require.resolve('./runtime-dynamic');

const dynamicEls = [];
let dynamicRuntimeLoaded = false;

module.exports = function transform(el, context) {
  const attribute = el.getAttribute('bind');

  if (!attribute || !attribute.argument) return;

  el.removeAttribute('bind');

  const { builder } = context;

  // figure out what the attribute refers to
  let toExpression = builder.parseExpression(attribute.argument);

  if (toExpression.type === 'Literal') {
    // TODO: Resolve nested state
    //  ↳ Check if marko already has something for this
    //  ↳ Or we can use https://github.com/developit/dlv

    // if the attribute is a string then assume it's a child of the state object
    toExpression = builder.memberExpression('state', toExpression.value);
  } else if (toExpression.type !== 'MemberExpression') {
    // dynamic attribute expression which must be handled at runtime

    // console.log('@@ EL', el);
    dynamicEls.push(el);

    // create an attribute we can parse at runtime
    el.setAttributeValue('__bind', builder.literal(toExpression.name));

    if (!dynamicRuntimeLoaded) {
      // import additional runtime module
      context.importModule('__bindDynamic', runtimeDynamicModulePath);

      // call the runtime setup module after all the nodes are in place
      const astNodes = context.root.body.array;
      const lastNode = astNodes[astNodes.length - 1];
      console.log('dynamicEls', dynamicEls);
      lastNode.appendChild(builder.node(() =>
        builder.functionCall(builder.identifier('__bindDynamic'), [
          builder.identifier('component'),
          builder.arrayExpression(dynamicEls),
        ]),
      )); // eslint-disable-line function-paren-newline

      dynamicRuntimeLoaded = true;
    }

    return; // exit early because the rest is for compile-time setup
  }

  // FIXME: Handle the various input types; input, select, textarea, etc.

  el.setAttributeValue('value', toExpression);

  context.importModule('__bind', runtimeModulePath);

  // set up event binding
  const eventMethod = builder.memberExpression(
    builder.identifier('__component'),
    builder.identifier('d'),
  );
  const eventArgs = [
    builder.identifier('__bind'), // this is run when events emit
    builder.arrayExpression([
      builder.literal(toExpression.property.name),
    ]),
  ];
  const propValue = builder.functionCall(eventMethod, eventArgs);

  el.setPropertyValue('oninput', propValue, false);
};
