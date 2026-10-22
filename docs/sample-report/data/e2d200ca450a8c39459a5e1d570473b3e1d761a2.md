# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth\login.spec.js >> Authentication @auth >> TC-AUTH-07 MFA agent must enter OTP @regression
- Location: tests\auth\login.spec.js:46:3

# Error details

```
Error: MFA agent signed in with no OTP step and landed on http://34.14.182.252:8081/applications/113/client (MFA not enforced)

expect(locator).toBeVisible() failed

Locator: locator('input[name*="otp" i], input[name*="code" i], input[autocomplete="one-time-code"]').first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - MFA agent signed in with no OTP step and landed on http://34.14.182.252:8081/applications/113/client (MFA not enforced) locator('input[name*="otp" i], input[name*="code" i], input[autocomplete="one-time-code"]').first() with timeout 10000ms
  - waiting for locator('input[name*="otp" i], input[name*="code" i], input[autocomplete="one-time-code"]').first()

```

```yaml
- navigation:
  - link "Insurance Order Entry Demo Platform QA Automation Training App":
    - /url: http://34.14.182.252:8081/dashboard
  - list:
    - listitem:
      - link "Dashboard":
        - /url: http://34.14.182.252:8081/dashboard
    - listitem:
      - link "Applications":
        - /url: http://34.14.182.252:8081/applications
    - listitem:
      - link "Products":
        - /url: http://34.14.182.252:8081/products
    - listitem:
      - link "Support":
        - /url: http://34.14.182.252:8081/support
  - link "MFA Agent":
    - /url: http://34.14.182.252:8081/profile
  - button "Logout"
- main:
  - link "← Back":
    - /url: http://34.14.182.252:8081/applications
  - link "Application Summary":
    - /url: http://34.14.182.252:8081/applications/113
  - heading "Client / Insured Information" [level=1]
  - text: First Name
  - textbox
  - text: Middle Name
  - textbox
  - text: Last Name
  - textbox
  - text: Date of Birth
  - textbox
  - text: Gender
  - combobox:
    - option "MALE" [selected]
    - option "FEMALE"
    - option "NON_BINARY"
  - text: Marital Status
  - combobox:
    - option "SINGLE" [selected]
    - option "MARRIED"
    - option "DIVORCED"
    - option "WIDOWED"
  - text: Nationality
  - textbox: United States
  - text: Occupation
  - textbox
  - text: Employer Name
  - textbox
  - text: Employer Address
  - textbox
  - button "Save and Continue"
  - link "Back":
    - /url: http://34.14.182.252:8081/applications/113
- contentinfo: TalentFarm QA Automation Lab Insurance Order Entry Demo
```

# Test source

```ts
  1  | const fs = require('fs');
  2  | const { test, expect, loginAs } = require('../../fixtures/auth.fixture');
  3  | const { LoginPage } = require('../../pages/LoginPage');
  4  | const { DashboardPage } = require('../../pages/DashboardPage');
  5  | const { users } = require('../../fixtures/users');
  6  | 
  7  | const OTP_INPUT = 'input[name*="otp" i], input[name*="code" i], input[autocomplete="one-time-code"]';
  8  | 
  9  | test.describe('Authentication @auth', () => {
  10 |   test('TC-AUTH-01 valid agent signs in @smoke', async ({ page }) => {
  11 |     await loginAs(page, users.agent);
  12 |     await expect(page, 'Valid agent is still on the login page').not.toHaveURL(/\/login/);
  13 |     await new DashboardPage(page).goto();
  14 |     await expect(page.getByTestId('dashboard-page')).toBeVisible();
  15 |   });
  16 | 
  17 |   test('TC-AUTH-02 wrong password shows an error @regression', async ({ page }) => {
  18 |     const login = new LoginPage(page);
  19 |     await login.goto();
  20 |     await login.login(users.agent.email, 'WrongPass@1');
  21 |     await expect(page).toHaveURL(/login/);
  22 |     await expect(login.errorMessage.first()).toBeVisible();
  23 |   });
  24 | 
  25 |   test('TC-AUTH-03 dashboard blocked without login and after logout @smoke', async ({ page }) => {
  26 |     await page.goto(`${process.env.BASE_URL}/dashboard`);
  27 |     await expect(page, 'Dashboard opened with no session').toHaveURL(/login/);
  28 | 
  29 |     await loginAs(page, users.agent);
  30 |     await expect(page).not.toHaveURL(/\/login/);
  31 |     await new LoginPage(page).logout();
  32 |     await page.goto(`${process.env.BASE_URL}/dashboard`);
  33 |     await expect(page, 'Dashboard still opens after logout').toHaveURL(/login/);
  34 |   });
  35 | 
  36 |   test('TC-AUTH-04 locked agent sees a locked message @regression', async ({ page }) => {
  37 |     const login = new LoginPage(page);
  38 |     await login.goto();
  39 |     await login.login(users.locked.email, users.locked.password);
  40 |     await expect(page, 'Locked agent got past the login page').toHaveURL(/login/);
  41 |     const text = await login.errorText();
  42 |     expect(text, `Locked agent saw "${text}" instead of a locked account message (DEF-AUTH-001)`)
  43 |       .toMatch(/lock/i);
  44 |   });
  45 | 
  46 |   test('TC-AUTH-07 MFA agent must enter OTP @regression', async ({ page }) => {
  47 |     await loginAs(page, users.mfa);
  48 | 
  49 |     // An MFA agent should be stopped at an OTP step before reaching any app page.
  50 |     const otpInput = page.locator(OTP_INPUT).first();
  51 |     await expect(
  52 |       otpInput,
  53 |       `MFA agent signed in with no OTP step and landed on ${page.url()} (MFA not enforced)`,
> 54 |     ).toBeVisible({ timeout: 10000 });
     |       ^ Error: MFA agent signed in with no OTP step and landed on http://34.14.182.252:8081/applications/113/client (MFA not enforced)
  55 | 
  56 |     await otpInput.fill('000000');
  57 |     await page.locator('form button[type="submit"]').first().click();
  58 |     await expect(page, 'A wrong OTP was accepted').toHaveURL(/otp|verify/);
  59 | 
  60 |     const logPath = process.env.OE_LOG_PATH;
  61 |     test.skip(!logPath || !fs.existsSync(logPath), 'OE_LOG_PATH not readable, correct OTP not checked');
  62 |     const codes = fs.readFileSync(logPath, 'utf8').match(/\b\d{6}\b/g) || [];
  63 |     test.skip(codes.length === 0, 'No OTP found in the log');
  64 |     await page.locator(OTP_INPUT).first().fill(codes[codes.length - 1]);
  65 |     await page.locator('form button[type="submit"]').first().click();
  66 |     await expect(page).not.toHaveURL(/otp|verify|login/);
  67 |   });
  68 | });
```