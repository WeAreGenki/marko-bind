'use strict'; // eslint-disable-line

const runtimeModulePath = require.resolve('./runtime');
const runtimeDynamicModulePath = require.resolve('./runtime-dynamic');

let dynamicRuntimeLoaded = false;

module.exports = function transform(el, context) {
  const attribute = el.getAttribute('bind');

  if (!attribute || !attribute.argument) return;

  el.removeAttribute('bind');

  const { builder } = context;

  // figure out what the attribute refers to
  let toExpression = builder.parseExpression(attribute.argument);

  if (toExpression.type === 'Literal') {
    // TODO: Resolve nested state -- can use https://github.com/developit/dlv

    // if the attribute is a string then assume it's a child of the state object
    toExpression = builder.memberExpression('state', toExpression.value);
  } else if (toExpression.type !== 'MemberExpression') {
    // dynamic attribute expression which needs to be handled at runtime

    // create an attribute we can parse at runtime
    el.setAttributeValue('__bind', builder.literal(toExpression.name));


    if (!dynamicRuntimeLoaded) {
      // import the additional runtime
      context.importModule('__bindDynamic', runtimeDynamicModulePath);

      // call the dynamic runtime after all the nodes are in place
      const astNodes = context.root.body.array;
      const lastNode = astNodes[astNodes.length - 1];
      lastNode.appendChild(builder.node(() =>
        builder.functionCall(builder.identifier('__bindDynamic'))));

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
