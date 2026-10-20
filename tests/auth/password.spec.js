const { test, expect } = require('../../fixtures/auth.fixture');
const { csrfToken } = require('../../utils/testHelpers');

test.describe('Password rules @auth', () => {
  test('TC-AUTH-05 weak password rejected at registration @regression', async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}/register`);
    const names = ['name', 'email', 'mobile', 'agent_license_number', 'password', 'password_confirmation'];
    for (const n of names) {
      const found = await page.locator(`form [name="${n}"]`).count();
      test.skip(found === 0, `Registration field "${n}" not found, field names need updating`);
    }
    const u = Date.now().toString().slice(-6);
    const token = await csrfToken(page);
    // Posted directly so the browser's own checks cannot hide a missing server rule.
    const response = await page.request.post(`${process.env.BASE_URL}/register`, {
      form: {
        _token: token,
        name: 'Weak Password Agent',
        email: `weak${u}@insurance.test`,
        mobile: `+1555${u}0`,
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
    for (const n of ['current_password', 'password', 'password_confirmation']) {
      const found = await page.locator(`form [name="${n}"]`).count();
      test.skip(found === 0, `Change password field "${n}" not found, field names need updating`);
    }
    const current = process.env.OE_AGENT_PASSWORD || process.env.OE_SEED_PASSWORD;
    await page.locator('[name="current_password"]').fill(current);
    await page.locator('[name="password"]').fill(current);
    await page.locator('[name="password_confirmation"]').fill(current);
    await page.locator('form [type="submit"]').last().click();
    await expect(page.locator('.alert-danger, .invalid-feedback').first(),
      'Changing to the same password was accepted (DEF-AUTH-006)').toBeVisible();
  });
});
