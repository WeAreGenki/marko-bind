var resolvedHelperModulePath = require.resolve('./tag-body-helper');

module.exports = function transform(el, context) {
  var bodyExpressionAttr = el.getAttribute('tag-body');
  if (bodyExpressionAttr != null) {
    el.removeAttribute('tag-body');

    var builder = context.builder;

    var bodyExpression = bodyExpressionAttr.value;
    if (!bodyExpression) {
      bodyExpression = builder.memberExpression(
        builder.identifier('data'),
        builder.identifier('renderBody')
      );
    }

    el.appendChild(
      builder.node(function(node, codegen) {
        var builder = codegen.builder;
        var helperModulePath = builder.literal(
          codegen.getRequirePath(resolvedHelperModulePath)
        );
        var tagBodyHelperVar = codegen.context.addStaticVar(
          '__tagBody',
          builder.require(helperModulePath)
        );

        return builder.functionCall(tagBodyHelperVar, [
          builder.identifier('out'),
          bodyExpression,
        ]);
      })
    );
  }
};
