module.exports = function tagBody(out, bodyContent) {
  if (bodyContent == null) {
    return;
  }

  if (typeof bodyContent === 'function') {
    bodyContent(out);
  } else {
    out.write(bodyContent);
  }
};
