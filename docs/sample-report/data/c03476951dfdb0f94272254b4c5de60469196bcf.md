# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth\password.spec.js >> Password rules @auth >> TC-AUTH-06 new password cannot match current password @regression
- Location: tests\auth\password.spec.js:25:3

# Error details

```
Error: Changing to the same password was accepted (DEF-AUTH-006)

expect(locator).toBeVisible() failed

Locator: locator('.alert-danger, .invalid-feedback').first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Changing to the same password was accepted (DEF-AUTH-006) locator('.alert-danger, .invalid-feedback').first() with timeout 10000ms
  - waiting for locator('.alert-danger, .invalid-feedback').first()

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
  - link "Demo Agent Florida":
    - /url: http://34.14.182.252:8081/profile
  - button "Logout"
- main:
  - alert: Password changed successfully.
  - heading "Agent Dashboard" [level=1]
  - paragraph: Track drafts, submitted applications, and policy order entry work.
  - link "Start New Application":
    - /url: http://34.14.182.252:8081/applications/new
  - text: Draft 174 Submitted 9 Under Review 0 Approved 0 Requires Info 0
  - heading "Recent Applications" [level=2]
  - link "View all":
    - /url: http://34.14.182.252:8081/applications
  - table:
    - rowgroup:
      - row "Reference Client Product Status Updated":
        - columnheader "Reference"
        - columnheader "Client"
        - columnheader "Product"
        - columnheader "Status"
        - columnheader "Updated"
        - columnheader
    - rowgroup:
      - 'row "Draft #244 Not selected DRAFT 22 Oct 2026 Open"':
        - 'cell "Draft #244"'
        - cell
        - cell "Not selected"
        - cell "DRAFT"
        - cell "22 Oct 2026"
        - cell "Open":
          - link "Open":
            - /url: http://34.14.182.252:8081/applications/244
      - 'row "Draft #243 Not selected DRAFT 22 Oct 2026 Open"':
        - 'cell "Draft #243"'
        - cell
        - cell "Not selected"
        - cell "DRAFT"
        - cell "22 Oct 2026"
        - cell "Open":
          - link "Open":
            - /url: http://34.14.182.252:8081/applications/243
      - 'row "Draft #242 Not selected DRAFT 22 Oct 2026 Open"':
        - 'cell "Draft #242"'
        - cell
        - cell "Not selected"
        - cell "DRAFT"
        - cell "22 Oct 2026"
        - cell "Open":
          - link "Open":
            - /url: http://34.14.182.252:8081/applications/242
      - 'row "Draft #241 Not selected DRAFT 22 Oct 2026 Open"':
        - 'cell "Draft #241"'
        - cell
        - cell "Not selected"
        - cell "DRAFT"
        - cell "22 Oct 2026"
        - cell "Open":
          - link "Open":
            - /url: http://34.14.182.252:8081/applications/241
      - 'row "Draft #240 Not selected DRAFT 22 Oct 2026 Open"':
        - 'cell "Draft #240"'
        - cell
        - cell "Not selected"
        - cell "DRAFT"
        - cell "22 Oct 2026"
        - cell "Open":
          - link "Open":
            - /url: http://34.14.182.252:8081/applications/240
      - 'row "Draft #239 Not selected DRAFT 22 Oct 2026 Open"':
        - 'cell "Draft #239"'
        - cell
        - cell "Not selected"
        - cell "DRAFT"
        - cell "22 Oct 2026"
        - cell "Open":
          - link "Open":
            - /url: http://34.14.182.252:8081/applications/239
      - 'row "Draft #238 Qa Applicant Elite Legacy Whole Life DRAFT 22 Oct 2026 Open"':
        - 'cell "Draft #238"'
        - cell "Qa Applicant"
        - cell "Elite Legacy Whole Life"
        - cell "DRAFT"
        - cell "22 Oct 2026"
        - cell "Open":
          - link "Open":
            - /url: http://34.14.182.252:8081/applications/238
      - row "WL2026102235925 Qa Applicant Elite Legacy Whole Life SUBMITTED 22 Oct 2026 Open":
        - cell "WL2026102235925"
        - cell "Qa Applicant"
        - cell "Elite Legacy Whole Life"
        - cell "SUBMITTED"
        - cell "22 Oct 2026"
        - cell "Open":
          - link "Open":
            - /url: http://34.14.182.252:8081/applications/237
      - 'row "Draft #236 Qa Applicant Elite Legacy Whole Life DRAFT 22 Oct 2026 Open"':
        - 'cell "Draft #236"'
        - cell "Qa Applicant"
        - cell "Elite Legacy Whole Life"
        - cell "DRAFT"
        - cell "22 Oct 2026"
        - cell "Open":
          - link "Open":
            - /url: http://34.14.182.252:8081/applications/236
      - 'row "Draft #235 Qa Applicant Elite Legacy Whole Life DRAFT 22 Oct 2026 Open"':
        - 'cell "Draft #235"'
        - cell "Qa Applicant"
        - cell "Elite Legacy Whole Life"
        - cell "DRAFT"
        - cell "22 Oct 2026"
        - cell "Open":
          - link "Open":
            - /url: http://34.14.182.252:8081/applications/235
- contentinfo: TalentFarm QA Automation Lab Insurance Order Entry Demo
```

# Test source

```ts
  1  | const { test, expect } = require('../../fixtures/auth.fixture');
  2  | const { csrfToken } = require('../../utils/testHelpers');
  3  | 
  4  | test.describe('Password rules @auth', () => {
  5  |   test('TC-AUTH-05 weak password rejected at registration @regression', async ({ page }) => {
  6  |     await page.goto(`${process.env.BASE_URL}/register`);
  7  |     await expect(page.getByTestId('agent-registration-form')).toBeVisible();
  8  |     const u = Date.now().toString().slice(-6);
  9  |     const token = await csrfToken(page);
  10 |     // Posted directly so the browser's own checks cannot hide a missing server rule.
  11 |     const response = await page.request.post(`${process.env.BASE_URL}/register`, {
  12 |       form: {
  13 |         _token: token,
  14 |         email: `weak${u}@insurance.test`,
  15 |         phone_number: `555${u}0`,
  16 |         agent_license_number: `LIC-QA-${u}`,
  17 |         password: 'abc123',
  18 |         password_confirmation: 'abc123',
  19 |       },
  20 |     });
  21 |     expect(response.url(), 'Weak password abc123 was accepted at registration (DEF-AUTH-002)')
  22 |       .toMatch(/register/);
  23 |   });
  24 | 
  25 |   test('TC-AUTH-06 new password cannot match current password @regression', async ({ agentPage: page }) => {
  26 |     await page.goto(`${process.env.BASE_URL}/change-password`);
  27 |     const current = process.env.OE_AGENT_PASSWORD || process.env.OE_SEED_PASSWORD;
  28 |     await page.getByTestId('change-password-current').fill(current);
  29 |     await page.getByTestId('change-password-new').fill(current);
  30 |     await page.getByTestId('change-password-confirm').fill(current);
  31 |     await page.getByTestId('change-password-submit').click();
  32 |     await page.waitForLoadState();
  33 |     await expect(page.locator('.alert-danger, .invalid-feedback').first(),
> 34 |       'Changing to the same password was accepted (DEF-AUTH-006)').toBeVisible();
     |                                                                    ^ Error: Changing to the same password was accepted (DEF-AUTH-006)
  35 |   });
  36 | });
  37 | 
```