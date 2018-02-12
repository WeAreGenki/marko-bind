/**
 * marko-bind
 * @overview An easy way to do reactive data binding in MarkoJS.
 * @author Max Milton <max@wearegenki.com>
 *
 * Copyright 2018 We Are Genki
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const runtimeModulePath = require.resolve('./runtime');
const runtimeDynamicModulePath = require.resolve('./runtime-dynamic');

const dynamicallyBound = [];
let dynamicRuntimeLoaded = false;

module.exports = function transform(el, context) {
  const attribute = el.getAttribute('bind');

  if (!attribute || !attribute.argument) return;

  el.removeAttribute('bind');

  const { builder } = context;

  // figure out what the attribute refers to
  let toExpression = builder.parseExpression(attribute.argument);

  // console.log('\n@@--------------------------------------------------------@@');
  // console.log('@@ ATTR', attribute);
  // console.log('@@ EXPRESSION', toExpression);
  // console.log('@@ EL', el);
  // console.log('@@--------------------------------------------------------@@\n');

  if (toExpression.type === 'Literal') {
    // TODO: Resolve nested state
    //  ↳ Check if marko already has something for this
    //  ↳ Or we can use https://github.com/developit/dlv

    // if the attribute is a string then assume it's a child of the state object
    toExpression = builder.memberExpression('state', toExpression.value);
  } else if (toExpression.type !== 'MemberExpression') {
    // dynamic attribute expression which must be handled at runtime

    dynamicallyBound.push(el);

    // create an attribute we can parse at runtime
    el.setAttributeValue('__bind', builder.literal(toExpression.name));

    if (!dynamicRuntimeLoaded) {
      // import additional runtime module
      context.importModule('__bindDynamic', runtimeDynamicModulePath);

      // call the runtime setup module after all the nodes are in place
      const astNodes = context.root.body.array;
      const lastNode = astNodes[astNodes.length - 1];
      // console.log('dynamicallyBound', dynamicallyBound);
      lastNode.appendChild(builder.node(() =>
        builder.functionCall(builder.identifier('__bindDynamic'), [
          builder.identifier('component'),
          builder.arrayExpression(dynamicallyBound),
        ])
      )); // eslint-disable-line function-paren-newline

      // call the runtime setup module before any dynamic bind() inputs
      // console.log('dynamicallyBound', dynamicallyBound);
      // el.prependChild(builder.node(() =>
      // // el.appendChild(builder.node(() =>
      //   builder.functionCall(builder.identifier('__bindDynamic'), [
      //     builder.identifier('component'),
      //     builder.arrayExpression(dynamicallyBound),
      //   ])
      // ));

      dynamicRuntimeLoaded = true;
    }

    return; // exit early because the rest is for non-dynamic element setup
  }

  context.importModule('__bind', runtimeModulePath);

  // set up event binding
  const eventMethod = builder.memberExpression(
    builder.identifier('__component'),
    builder.identifier('d')
  );
  const eventArgs = [
    builder.identifier('__bind'), // this is run when the event emits
    builder.arrayExpression([
      builder.identifier('component'),
      builder.literal(toExpression.property.name), // state object key
      attribute.value || 'null', // optional callback
    ]),
  ];
  const propValue = builder.functionCall(eventMethod, eventArgs);

  function checkBindConflicts(attribute, event) {
    // TODO
    const conflict = false;
    if (conflict) console.log('x');
  }

  /** Handle cases for the various input types */

  const tag = el.tagName;
  const type = el.getAttribute('type');

  // console.log('####  TAG', tag);
  // console.log('#### TYPE', type);

  if (tag === 'select') {
    // select
    checkBindConflicts('value', 'onchange');
    /**
     * NOTE: The "value" attribute doesn't actually do anything, it's necessary to
     * set el.value at runtime to correctly update the input.
     */
    // const attrValue = el.getAttribute('multiple')
    //   ? `${toExpression}[0]`
    //   : toExpression;
    // el.setAttributeValue('value', attrValue);
    el.setPropertyValue('onchange', propValue, false);
  } else if (tag === 'input' && type === 'checkbox') {
    // checkbox
    checkBindConflicts('checked', 'onchange');
    el.setAttributeValue('checked', toExpression);
    el.setPropertyValue('onchange', propValue, false);
  } else if (tag === 'input' && type === 'radio') {
    // radio
    // XXX: Currently the same as checkbox.
    checkBindConflicts('checked', 'onchange');
    el.setAttributeValue('checked', toExpression);
    el.setPropertyValue('onchange', propValue, false);
  } else if (tag === 'input' || tag === 'textarea') {
    // generic input + textarea
    checkBindConflicts('value', 'oninput');
    el.setAttributeValue('value', toExpression);
    el.setPropertyValue('oninput', propValue, false);
  } else {
    throw new Error(`${el.tagString}\n ↳ "bind()" is not supported on this element type.`);
  }
};
