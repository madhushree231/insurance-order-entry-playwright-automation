const { expect } = require('@playwright/test');

/**
 * Checks that a wizard step refused the input. Some fields are blocked in the
 * browser (required, pattern) and others on the server (error alert). Either
 * counts as rejected. Moving on to the next step is a failure.
 * Call after the page object's save(), which waits for the page to settle.
 */
async function expectStepRejected(page, alert, stepPattern, message) {
  expect(page.url(), message).toMatch(stepPattern);
  const browserBlocked = await page.locator('form :invalid').count();
  if (browserBlocked > 0) return;
  await expect(alert, message).toBeVisible();
}

module.exports = { expectStepRejected };
