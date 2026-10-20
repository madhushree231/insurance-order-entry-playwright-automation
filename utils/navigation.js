/**
 * Clicks a submit control and waits for the resulting page load. When the
 * browser blocks the submit (required or pattern attributes) no navigation
 * happens, so the wait gives up quietly after a short time.
 */
async function clickAndSettle(page, locator, timeout = 10000) {
  const navigated = page.waitForEvent('framenavigated', { timeout }).catch(() => null);
  await locator.click();
  const frame = await navigated;
  if (frame) await page.waitForLoadState('load');
}

module.exports = { clickAndSettle };
