# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: client-information\client.spec.js >> Client information @client >> TC-CLI-07 age correct when birthday is today @regression
- Location: tests\client-information\client.spec.js:52:3

# Error details

```
Error: Age is wrong for a client whose birthday is today (DEF-CLI-003)

expect(received).toBe(expected) // Object.is equality

Expected: 30
Received: 31
```

# Page snapshot

```yaml
- generic [active] [ref=f8e1]:
  - navigation [ref=f8e2]:
    - generic [ref=f8e3]:
      - link "Insurance Order Entry Demo Platform QA Automation Training App" [ref=f8e4] [cursor=pointer]:
        - /url: http://34.14.182.252:8081/dashboard
        - generic [aria-hidden] [ref=f8e5]: IO
        - generic [ref=f8e6]:
          - generic [ref=f8e7]: Insurance Order Entry Demo Platform
          - generic [ref=f8e8]: QA Automation Training App
      - generic [ref=f8e9]:
        - list [ref=f8e10]:
          - listitem [ref=f8e11]:
            - link "Dashboard" [ref=f8e12] [cursor=pointer]:
              - /url: http://34.14.182.252:8081/dashboard
          - listitem [ref=f8e13]:
            - link "Applications" [ref=f8e14] [cursor=pointer]:
              - /url: http://34.14.182.252:8081/applications
          - listitem [ref=f8e15]:
            - link "Products" [ref=f8e16] [cursor=pointer]:
              - /url: http://34.14.182.252:8081/products
          - listitem [ref=f8e17]:
            - link "Support" [ref=f8e18] [cursor=pointer]:
              - /url: http://34.14.182.252:8081/support
        - generic [ref=f8e19]:
          - link "Demo Agent Florida" [ref=f8e20] [cursor=pointer]:
            - /url: http://34.14.182.252:8081/profile
          - button "Logout" [ref=f8e22] [cursor=pointer]
  - main [ref=f8e23]:
    - alert [ref=f8e24]:
      - generic [ref=f8e25]: "Please review the following:"
      - list [ref=f8e26]:
        - listitem [ref=f8e27]: RESIDENTIAL address is required.
        - listitem [ref=f8e28]: MAILING address is required.
        - listitem [ref=f8e29]: Contact information is required.
        - listitem [ref=f8e30]: KYC details are required.
        - listitem [ref=f8e31]: Financial profile is required.
        - listitem [ref=f8e32]: Compliance declaration is required.
        - listitem [ref=f8e33]: Insurance product must be selected.
    - generic [ref=f8e35]:
      - link "← Back to Documents" [ref=f8e36] [cursor=pointer]:
        - /url: http://34.14.182.252:8081/applications/263/documents
      - link "Application Summary" [ref=f8e37] [cursor=pointer]:
        - /url: http://34.14.182.252:8081/applications/263
    - generic [ref=f8e38]:
      - generic [ref=f8e40]:
        - generic [ref=f8e41]: "Application #263"
        - heading "Review Application" [level=1] [ref=f8e42]
        - paragraph [ref=f8e43]: Review the application details and resolve any blocking validation errors before submission.
      - generic [ref=f8e44]:
        - generic [ref=f8e47]:
          - heading "Submission Validation" [level=2] [ref=f8e48]
          - generic [ref=f8e49]:
            - generic [ref=f8e50]: "Blocking validation errors found:"
            - list [ref=f8e51]:
              - listitem [ref=f8e52]: RESIDENTIAL address is required.
              - listitem [ref=f8e53]: MAILING address is required.
              - listitem [ref=f8e54]: Contact information is required.
              - listitem [ref=f8e55]: KYC details are required.
              - listitem [ref=f8e56]: Financial profile is required.
              - listitem [ref=f8e57]: Compliance declaration is required.
              - listitem [ref=f8e58]: Insurance product must be selected.
          - generic [ref=f8e59]:
            - link "Back to Documents" [ref=f8e60] [cursor=pointer]:
              - /url: http://34.14.182.252:8081/applications/263/documents
            - button "Run Validation" [ref=f8e61] [cursor=pointer]
          - generic [ref=f8e62]:
            - button "Submit Application" [disabled]
        - generic [ref=f8e65]:
          - heading "Application Snapshot" [level=2] [ref=f8e66]
          - generic [ref=f8e67]:
            - term [ref=f8e68]: Client
            - definition [ref=f8e69]: Qa Applicant
            - term [ref=f8e70]: Calculated Age
            - definition [ref=f8e71]: "31"
            - term [ref=f8e72]: Product
            - definition [ref=f8e73]: Not selected
            - term [ref=f8e74]: Sum Assured
            - definition [ref=f8e75]: Pending
            - term [ref=f8e76]: Premium Payment Frequency
            - definition [ref=f8e77]: MONTHLY
            - term [ref=f8e78]: Premium Payment Term
            - definition [ref=f8e79]: Pending
            - term [ref=f8e80]: Coverage Term
            - definition [ref=f8e81]: WHOLE_LIFE
            - term [ref=f8e82]: Base Policy Premium
            - definition [ref=f8e83]: $0.00
            - term [ref=f8e84]: Rider Premium
            - definition [ref=f8e85]: $0.00
            - term [ref=f8e86]: Total Modal Premium
            - definition [ref=f8e87]: $0.00
            - term [ref=f8e88]: Status
            - definition [ref=f8e89]: DRAFT
  - contentinfo [ref=f8e90]:
    - generic [ref=f8e91]:
      - generic [ref=f8e92]: TalentFarm QA Automation Lab
      - generic [ref=f8e93]: Insurance Order Entry Demo
```

# Test source

```ts
  1  | const { test, expect } = require('../../fixtures/auth.fixture');
  2  | const { ClientInformationPage } = require('../../pages/ClientInformationPage');
  3  | const { ReviewPage } = require('../../pages/ReviewPage');
  4  | const data = require('../../fixtures/applicationData');
  5  | const { yearsAgo, daysFromToday } = require('../../utils/dataGenerator');
  6  | const { expectStepRejected } = require('../../utils/assertions');
  7  | 
  8  | const STEP = /\/client/;
  9  | 
  10 | async function saveClient(page, id, overrides) {
  11 |   const p = new ClientInformationPage(page);
  12 |   await p.goto(id);
  13 |   await p.fill({ ...data.client(), ...overrides });
  14 |   await p.save();
  15 |   return p;
  16 | }
  17 | 
  18 | test.describe('Client information @client', () => {
  19 |   test('TC-CLI-01 valid client details save @smoke', async ({ agentPage: page, draftId }) => {
  20 |     await saveClient(page, draftId, {});
  21 |     await expect(page).toHaveURL(/address-contact/);
  22 |   });
  23 | 
  24 |   test('TC-CLI-02 mandatory client fields enforced @regression', async ({ agentPage: page, draftId }) => {
  25 |     const p = new ClientInformationPage(page);
  26 |     await p.goto(draftId);
  27 |     await p.fill({ ...data.client(), firstName: '', lastName: '', dob: '' });
  28 |     await p.save();
  29 |     await expectStepRejected(page, p.validationAlert, STEP, 'Client step saved with empty mandatory fields');
  30 |   });
  31 | 
  32 |   test('TC-CLI-03 client under 18 rejected @regression', async ({ agentPage: page, draftId }) => {
  33 |     const p = await saveClient(page, draftId, { dob: yearsAgo(17) });
  34 |     await expectStepRejected(page, p.validationAlert, STEP, 'A 17 year old client was accepted');
  35 |   });
  36 | 
  37 |   test('TC-CLI-04 client exactly 18 accepted @regression', async ({ agentPage: page, draftId }) => {
  38 |     await saveClient(page, draftId, { dob: yearsAgo(18) });
  39 |     await expect(page, 'A client who turned 18 today was refused').toHaveURL(/address-contact/);
  40 |   });
  41 | 
  42 |   test('TC-CLI-05 client over 65 rejected @regression', async ({ agentPage: page, draftId }) => {
  43 |     const p = await saveClient(page, draftId, { dob: yearsAgo(66) });
  44 |     await expectStepRejected(page, p.validationAlert, STEP, 'A 66 year old client was accepted');
  45 |   });
  46 | 
  47 |   test('TC-CLI-06 future DOB rejected @regression', async ({ agentPage: page, draftId }) => {
  48 |     const p = await saveClient(page, draftId, { dob: daysFromToday(1) });
  49 |     await expectStepRejected(page, p.validationAlert, STEP, 'A future date of birth was accepted (DEF-CLI-001)');
  50 |   });
  51 | 
  52 |   test('TC-CLI-07 age correct when birthday is today @regression', async ({ agentPage: page, draftId }) => {
  53 |     await saveClient(page, draftId, { dob: yearsAgo(30) });
  54 |     const review = new ReviewPage(page);
  55 |     await review.goto(draftId);
> 56 |     expect(await review.ageValue(), 'Age is wrong for a client whose birthday is today (DEF-CLI-003)').toBe(30);
     |                                                                                                        ^ Error: Age is wrong for a client whose birthday is today (DEF-CLI-003)
  57 |   });
  58 | 
  59 |   test('TC-CLI-08 name with digits or symbols rejected @regression', async ({ agentPage: page, draftId }) => {
  60 |     const p = await saveClient(page, draftId, { firstName: 'J0hn$' });
  61 |     await expectStepRejected(page, p.validationAlert, STEP, 'First name J0hn$ was accepted (DEF-CLI-004)');
  62 |   });
  63 | });
  64 | 
```