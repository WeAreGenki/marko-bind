'use strict'; // eslint-disable-line

const resolvedHelperModulePath = require.resolve('./helper');

module.exports = function transform(el, context) {
  const attribute = el.getAttribute('bind');

  if (!attribute || !attribute.argument) return;

  el.removeAttribute('bind');

  const { builder } = context;

  let toExpression = builder.parseExpression(attribute.argument);

  if (toExpression.type === 'Literal') {
    toExpression = builder.memberExpression('state', toExpression.value);
  } else if (toExpression.type !== 'MemberExpression') {
    // Needs to be handled at runtime
    el.setAttributeValue('__bind', toExpression);
    return;
  }

  el.setAttributeValue('value', toExpression);

  const helperModulePath = builder.literal(context.getRequirePath(resolvedHelperModulePath));
  context.addStaticVar('__bind', builder.require(helperModulePath));

  const eventMethod = builder.functionCall(builder.identifier('__bind'), [
    builder.identifier('out'),
    toExpression,
    builder.identifier('component'),
  ]);

  // console.log('!! bindHelperVar', bindHelperVar);
  // console.log('!! eventMethod', eventMethod);
  // console.log('!! toExpression', toExpression);

  // const eventArgs = [eventMethod.callee.name, toExpression];

  el.setPropertyValue('oninput', eventMethod, false);

  console.log('\n\n@@', toExpression);
  // console.log('\n\n@ EL', el);
  // console.log('\n\n@ ATTRS', el.attributes);
  console.log('\n\n----------------\n\n');
};
