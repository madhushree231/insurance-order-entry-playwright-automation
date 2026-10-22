const { expect } = require('@playwright/test');

/**
 * Checks that a wizard step refused the input. A successful save always moves
 * to the next step, so staying on the same step means the input was rejected,
 * whether the browser blocked it or the server sent the page back with errors.
 * Call after the page object's save(), which waits for the page to settle.
 */
async function expectStepRejected(page, alert, stepPattern, message) {
  expect(page.url(), message).toMatch(stepPattern);
}

module.exports = { expectStepRejected };