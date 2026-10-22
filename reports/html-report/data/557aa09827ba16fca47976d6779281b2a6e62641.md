# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: workflow\submission.spec.js >> Submission and status @workflow >> TC-WF-03 submitted application is read-only @regression
- Location: tests\workflow\submission.spec.js:23:3

# Error details

```
Error: A submitted application was edited (DEF-WF-005)

expect(received).toBe(expected) // Object.is equality

Expected: "Edited 1792659548435"
Received: "Edited 1792674775651"
```

# Page snapshot

```yaml
- generic [active] [ref=f6e1]:
  - navigation [ref=f6e2]:
    - generic [ref=f6e3]:
      - link "Insurance Order Entry Demo Platform QA Automation Training App" [ref=f6e4] [cursor=pointer]:
        - /url: http://34.14.182.252:8081/dashboard
        - generic [aria-hidden] [ref=f6e5]: IO
        - generic [ref=f6e6]:
          - generic [ref=f6e7]: Insurance Order Entry Demo Platform
          - generic [ref=f6e8]: QA Automation Training App
      - generic [ref=f6e9]:
        - list [ref=f6e10]:
          - listitem [ref=f6e11]:
            - link "Dashboard" [ref=f6e12] [cursor=pointer]:
              - /url: http://34.14.182.252:8081/dashboard
          - listitem [ref=f6e13]:
            - link "Applications" [ref=f6e14] [cursor=pointer]:
              - /url: http://34.14.182.252:8081/applications
          - listitem [ref=f6e15]:
            - link "Products" [ref=f6e16] [cursor=pointer]:
              - /url: http://34.14.182.252:8081/products
          - listitem [ref=f6e17]:
            - link "Support" [ref=f6e18] [cursor=pointer]:
              - /url: http://34.14.182.252:8081/support
        - generic [ref=f6e19]:
          - link "Submitted Agent" [ref=f6e20] [cursor=pointer]:
            - /url: http://34.14.182.252:8081/profile
          - button "Logout" [ref=f6e22] [cursor=pointer]
  - main [ref=f6e23]:
    - generic [ref=f6e25]:
      - link "← Back" [ref=f6e26] [cursor=pointer]:
        - /url: http://34.14.182.252:8081/applications
      - link "Application Summary" [ref=f6e27] [cursor=pointer]:
        - /url: http://34.14.182.252:8081/applications/3
    - generic [ref=f6e29]:
      - heading "Client / Insured Information" [level=1] [ref=f6e30]
      - generic [ref=f6e31]:
        - generic [ref=f6e32]:
          - generic [ref=f6e33]:
            - generic [ref=f6e34]: First Name
            - textbox [ref=f6e35]: Vikram
          - generic [ref=f6e36]:
            - generic [ref=f6e37]: Middle Name
            - textbox [ref=f6e38]
          - generic [ref=f6e39]:
            - generic [ref=f6e40]: Last Name
            - textbox [ref=f6e41]: Rao
          - generic [ref=f6e42]:
            - generic [ref=f6e43]: Date of Birth
            - textbox [ref=f6e44]: 1979-04-02
          - generic [ref=f6e45]:
            - generic [ref=f6e46]: Gender
            - combobox [ref=f6e47]:
              - option "MALE" [selected]
              - option "FEMALE"
              - option "NON_BINARY"
          - generic [ref=f6e48]:
            - generic [ref=f6e49]: Marital Status
            - combobox [ref=f6e50]:
              - option "SINGLE"
              - option "MARRIED" [selected]
              - option "DIVORCED"
              - option "WIDOWED"
          - generic [ref=f6e51]:
            - generic [ref=f6e52]: Nationality
            - textbox [ref=f6e53]: United States
          - generic [ref=f6e54]:
            - generic [ref=f6e55]: Occupation
            - textbox [ref=f6e56]: Edited 1792674775651
          - generic [ref=f6e57]:
            - generic [ref=f6e58]: Employer Name
            - textbox [ref=f6e59]: Acme Financial Group
          - generic [ref=f6e60]:
            - generic [ref=f6e61]: Employer Address
            - textbox [ref=f6e62]: 200 Market Street, San Francisco, CA
        - generic [ref=f6e63]:
          - button "Save and Continue" [ref=f6e64] [cursor=pointer]
          - link "Back" [ref=f6e65] [cursor=pointer]:
            - /url: http://34.14.182.252:8081/applications/3
  - contentinfo [ref=f6e66]:
    - generic [ref=f6e67]:
      - generic [ref=f6e68]: TalentFarm QA Automation Lab
      - generic [ref=f6e69]: Insurance Order Entry Demo
```

# Test source

```ts
  1  | const { test, expect, loginAs } = require('../../fixtures/auth.fixture');
  2  | const { BeneficiaryPage } = require('../../pages/BeneficiaryPage');
  3  | const { ClientInformationPage } = require('../../pages/ClientInformationPage');
  4  | const { DashboardPage } = require('../../pages/DashboardPage');
  5  | const { ApplicationStatusPage } = require('../../pages/ApplicationStatusPage');
  6  | const data = require('../../fixtures/applicationData');
  7  | const { users, seeded } = require('../../fixtures/users');
  8  | const { applicationIdByReference } = require('../../utils/testHelpers');
  9  | 
  10 | test.describe('Submission and status @workflow', () => {
  11 |   test('TC-WF-02 draft resume keeps beneficiaries @regression', async ({ agentPage: page, draftId, context }) => {
  12 |     const b = new BeneficiaryPage(page);
  13 |     await b.goto(draftId);
  14 |     await b.addBeneficiary(data.beneficiary());
  15 |     expect(await b.beneficiaryCount()).toBe(1);
  16 | 
  17 |     await context.clearCookies();
  18 |     await loginAs(page, users.agent);
  19 |     await b.goto(draftId);
  20 |     expect(await b.beneficiaryCount(), 'Beneficiary missing after resuming the draft (DEF-WF-001)').toBe(1);
  21 |   });
  22 | 
  23 |   test('TC-WF-03 submitted application is read-only @regression', async ({ page }) => {
  24 |     await loginAs(page, users.submittedAgent);
  25 |     const id = await applicationIdByReference(page, seeded.submittedApp);
  26 |     const client = new ClientInformationPage(page);
  27 |     await client.goto(id);
  28 | 
  29 |     if (!(await client.firstName.isVisible()) || !(await client.firstName.isEditable())) return;
  30 | 
  31 |     const before = await client.occupation.inputValue();
  32 |     await client.occupation.fill(`Edited ${Date.now()}`);
  33 |     await client.save();
  34 |     await client.goto(id);
> 35 |     expect(await client.occupation.inputValue(), 'A submitted application was edited (DEF-WF-005)').toBe(before);
     |                                                                                                     ^ Error: A submitted application was edited (DEF-WF-005)
  36 |   });
  37 | 
  38 |   test('TC-WF-05 status page matches dashboard @regression', async ({ page }) => {
  39 |     await loginAs(page, users.submittedAgent);
  40 |     const id = await applicationIdByReference(page, seeded.submittedApp);
  41 |     const dashboard = new DashboardPage(page);
  42 |     await dashboard.goto();
  43 |     const listed = (await dashboard.statusFor(id).innerText()).trim().toUpperCase();
  44 | 
  45 |     const status = new ApplicationStatusPage(page);
  46 |     await status.goto(id);
  47 |     expect(await status.status(), 'Status page and dashboard show different statuses')
  48 |       .toBe(listed);
  49 |   });
  50 | });
  51 | 
```