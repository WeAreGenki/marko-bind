let setupDone = false;

module.exports = function render(input, out) {
  console.log('RENDER INPUT', input);
  console.log('RENDER OUT', out);

  if (!setupDone) {
    // TODO: Do setup (?)

    console.log('DO SETUP');

    setupDone = true;
  }

  input.renderBody(out);
};
