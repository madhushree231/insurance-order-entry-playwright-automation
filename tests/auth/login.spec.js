const fs = require('fs');
const { test, expect, loginAs } = require('../../fixtures/auth.fixture');
const { LoginPage } = require('../../pages/LoginPage');
const { DashboardPage } = require('../../pages/DashboardPage');
const { users } = require('../../fixtures/users');

test.describe('Authentication @auth', () => {
  test('TC-AUTH-01 valid agent signs in @smoke', async ({ page }) => {
    await loginAs(page, users.agent);
    await expect(page, 'Valid agent is still on the login page').not.toHaveURL(/\/login/);
    await new DashboardPage(page).goto();
    await expect(page.getByTestId('dashboard-page')).toBeVisible();
  });

  test('TC-AUTH-02 wrong password shows an error @regression', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users.agent.email, 'WrongPass@1');
    await expect(page).toHaveURL(/login/);
    await expect(login.errorMessage.first()).toBeVisible();
  });

  test('TC-AUTH-03 dashboard blocked without login and after logout @smoke', async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}/dashboard`);
    await expect(page, 'Dashboard opened with no session').toHaveURL(/login/);

    await loginAs(page, users.agent);
    await expect(page).not.toHaveURL(/\/login/);
    await new LoginPage(page).logout();
    await page.goto(`${process.env.BASE_URL}/dashboard`);
    await expect(page, 'Dashboard still opens after logout').toHaveURL(/login/);
  });

  test('TC-AUTH-04 locked agent sees a locked message @regression', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users.locked.email, users.locked.password);
    await expect(page, 'Locked agent got past the login page').toHaveURL(/login/);
    const text = await login.errorText();
    expect(text, `Locked agent saw "${text}" instead of a locked account message (DEF-AUTH-001)`)
      .toMatch(/lock/i);
  });

  test('TC-AUTH-07 MFA agent must enter OTP @regression', async ({ page }) => {
    await loginAs(page, users.mfa);
    await expect(page, 'MFA agent went straight to the dashboard without an OTP').not.toHaveURL(/dashboard/);

    const logPath = process.env.OE_LOG_PATH;
    test.skip(!logPath || !fs.existsSync(logPath), 'OE_LOG_PATH not set or not readable, OTP step not checked');

    const otpInput = page.locator('input[name*="otp" i], input[name*="code" i]').first();
    await otpInput.fill('000000');
    await page.locator('form button[type="submit"]').first().click();
    await expect(page, 'A wrong OTP was accepted').not.toHaveURL(/dashboard/);

    const log = fs.readFileSync(logPath, 'utf8');
    const codes = log.match(/\b\d{6}\b/g) || [];
    test.skip(codes.length === 0, 'No OTP found in the log');
    await otpInput.fill(codes[codes.length - 1]);
    await page.locator('form button[type="submit"]').first().click();
    await expect(page).toHaveURL(/dashboard/);
  });
});