const { test, expect } = require('../../fixtures/auth.fixture');
const { csrfToken } = require('../../utils/testHelpers');

test.describe('Password rules @auth', () => {
  test('TC-AUTH-05 weak password rejected at registration @regression', async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}/register`);
    await expect(page.getByTestId('agent-registration-form')).toBeVisible();
    const u = Date.now().toString().slice(-6);
    const token = await csrfToken(page);
    // Posted directly so the browser's own checks cannot hide a missing server rule.
    const response = await page.request.post(`${process.env.BASE_URL}/register`, {
      form: {
        _token: token,
        email: `weak${u}@insurance.test`,
        phone_number: `555${u}0`,
        agent_license_number: `LIC-QA-${u}`,
        password: 'abc123',
        password_confirmation: 'abc123',
      },
    });
    expect(response.url(), 'Weak password abc123 was accepted at registration (DEF-AUTH-002)')
      .toMatch(/register/);
  });

  test('TC-AUTH-06 new password cannot match current password @regression', async ({ agentPage: page }) => {
    await page.goto(`${process.env.BASE_URL}/change-password`);
    const current = process.env.OE_AGENT_PASSWORD || process.env.OE_SEED_PASSWORD;
    await page.getByTestId('change-password-current').fill(current);
    await page.getByTestId('change-password-new').fill(current);
    await page.getByTestId('change-password-confirm').fill(current);
    await page.getByTestId('change-password-submit').click();
    await page.waitForLoadState();
    await expect(page.locator('.alert-danger, .invalid-feedback').first(),
      'Changing to the same password was accepted (DEF-AUTH-006)').toBeVisible();
  });
});
