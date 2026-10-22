# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: client-information\kyc-financial.spec.js >> KYC, financial and compliance @client >> TC-KYC-06 unaffordable premium is blocked @regression
- Location: tests\client-information\kyc-financial.spec.js:53:3

# Error details

```
Error: Annual premium 30,500 on income 20,000 was not flagged (DEF-FIN-001)

expect(received).toMatch(expected)

Expected pattern: /afford|income/i
Received string:  ""
```

# Page snapshot

```yaml
- generic [active] [ref=f15e1]:
  - navigation [ref=f15e2]:
    - generic [ref=f15e3]:
      - link "Insurance Order Entry Demo Platform QA Automation Training App" [ref=f15e4] [cursor=pointer]:
        - /url: http://34.14.182.252:8081/dashboard
        - generic [aria-hidden] [ref=f15e5]: IO
        - generic [ref=f15e6]:
          - generic [ref=f15e7]: Insurance Order Entry Demo Platform
          - generic [ref=f15e8]: QA Automation Training App
      - generic [ref=f15e9]:
        - list [ref=f15e10]:
          - listitem [ref=f15e11]:
            - link "Dashboard" [ref=f15e12] [cursor=pointer]:
              - /url: http://34.14.182.252:8081/dashboard
          - listitem [ref=f15e13]:
            - link "Applications" [ref=f15e14] [cursor=pointer]:
              - /url: http://34.14.182.252:8081/applications
          - listitem [ref=f15e15]:
            - link "Products" [ref=f15e16] [cursor=pointer]:
              - /url: http://34.14.182.252:8081/products
          - listitem [ref=f15e17]:
            - link "Support" [ref=f15e18] [cursor=pointer]:
              - /url: http://34.14.182.252:8081/support
        - generic [ref=f15e19]:
          - link "Demo Agent Florida" [ref=f15e20] [cursor=pointer]:
            - /url: http://34.14.182.252:8081/profile
          - button "Logout" [ref=f15e22] [cursor=pointer]
  - main [ref=f15e23]:
    - alert [ref=f15e24]: Application validation passed.
    - generic [ref=f15e26]:
      - link "← Back to Documents" [ref=f15e27] [cursor=pointer]:
        - /url: http://34.14.182.252:8081/applications/270/documents
      - link "Application Summary" [ref=f15e28] [cursor=pointer]:
        - /url: http://34.14.182.252:8081/applications/270
    - generic [ref=f15e29]:
      - generic [ref=f15e31]:
        - generic [ref=f15e32]: "Application #270"
        - heading "Review Application" [level=1] [ref=f15e33]
        - paragraph [ref=f15e34]: Review the application details and resolve any blocking validation errors before submission.
      - generic [ref=f15e35]:
        - generic [ref=f15e38]:
          - heading "Submission Validation" [level=2] [ref=f15e39]
          - generic [ref=f15e40]: No blocking validation errors found.
          - generic [ref=f15e41]:
            - link "Back to Documents" [ref=f15e42] [cursor=pointer]:
              - /url: http://34.14.182.252:8081/applications/270/documents
            - button "Run Validation" [ref=f15e43] [cursor=pointer]
          - button "Submit Application" [ref=f15e45] [cursor=pointer]
        - generic [ref=f15e48]:
          - heading "Application Snapshot" [level=2] [ref=f15e49]
          - generic [ref=f15e50]:
            - term [ref=f15e51]: Client
            - definition [ref=f15e52]: Qa Applicant
            - term [ref=f15e53]: Calculated Age
            - definition [ref=f15e54]: "42"
            - term [ref=f15e55]: Product
            - definition [ref=f15e56]: Elite Legacy Whole Life
            - term [ref=f15e57]: Sum Assured
            - definition [ref=f15e58]: $5,000,000.00
            - term [ref=f15e59]: Premium Payment Frequency
            - definition [ref=f15e60]: ANNUAL
            - term [ref=f15e61]: Premium Payment Term
            - definition [ref=f15e62]: 15 years
            - term [ref=f15e63]: Coverage Term
            - definition [ref=f15e64]: WHOLE_LIFE
            - term [ref=f15e65]: Base Policy Premium
            - definition [ref=f15e66]: $30,500.00
            - term [ref=f15e67]: Rider Premium
            - definition [ref=f15e68]: $0.00
            - term [ref=f15e69]: Total Modal Premium
            - definition [ref=f15e70]: $30,500.00
            - term [ref=f15e71]: Status
            - definition [ref=f15e72]: DRAFT
  - contentinfo [ref=f15e73]:
    - generic [ref=f15e74]:
      - generic [ref=f15e75]: TalentFarm QA Automation Lab
      - generic [ref=f15e76]: Insurance Order Entry Demo
```

# Test source

```ts
  1  | const { test, expect } = require('../../fixtures/auth.fixture');
  2  | const { KycFinancialPage } = require('../../pages/KycFinancialPage');
  3  | const { ProductConfigurationPage } = require('../../pages/ProductConfigurationPage');
  4  | const { ReviewPage } = require('../../pages/ReviewPage');
  5  | const data = require('../../fixtures/applicationData');
  6  | const { completeSteps } = require('../../utils/testHelpers');
  7  | const { expectStepRejected } = require('../../utils/assertions');
  8  | 
  9  | const STEP = /kyc-financial/;
  10 | 
  11 | async function fillKyc(page, id, overrides) {
  12 |   await completeSteps(page, id, ['client', 'address']);
  13 |   const p = new KycFinancialPage(page);
  14 |   await p.goto(id);
  15 |   await p.fill({ ...data.kyc(), ...overrides });
  16 |   await p.save();
  17 |   return p;
  18 | }
  19 | 
  20 | test.describe('KYC, financial and compliance @client', () => {
  21 |   test('TC-KYC-01 valid KYC details save @smoke', async ({ agentPage: page, draftId }) => {
  22 |     await fillKyc(page, draftId, {});
  23 |     await expect(page).toHaveURL(/product/);
  24 |   });
  25 | 
  26 |   test('TC-KYC-02 SSN masked after entry @regression', async ({ agentPage: page, draftId }) => {
  27 |     await fillKyc(page, draftId, { idNumber: '123456789' });
  28 |     const review = new ReviewPage(page);
  29 |     await review.goto(draftId);
  30 |     const body = await page.locator('body').innerText();
  31 |     expect(body, 'Full SSN 123456789 is visible on review (DEF-CLI-002)').not.toContain('123456789');
  32 |     const p = new KycFinancialPage(page);
  33 |     await p.goto(draftId);
  34 |     expect(await p.idNumber.inputValue(), 'Full SSN is shown in the KYC field after saving (DEF-CLI-002)')
  35 |       .not.toBe('123456789');
  36 |   });
  37 | 
  38 |   test('TC-KYC-03 short SSN rejected @regression', async ({ agentPage: page, draftId }) => {
  39 |     const p = await fillKyc(page, draftId, { idNumber: '12345' });
  40 |     await expectStepRejected(page, p.errorAlert, STEP, 'SSN 12345 was accepted');
  41 |   });
  42 | 
  43 |   test('TC-KYC-04 PEP Yes requires details @regression', async ({ agentPage: page, draftId }) => {
  44 |     const p = await fillKyc(page, draftId, { pep: 'Yes', pepDetails: '' });
  45 |     await expectStepRejected(page, p.errorAlert, STEP, 'PEP Yes saved with no details');
  46 |   });
  47 | 
  48 |   test('TC-KYC-05 declaration required @regression', async ({ agentPage: page, draftId }) => {
  49 |     const p = await fillKyc(page, draftId, { declare: false });
  50 |     await expectStepRejected(page, p.errorAlert, STEP, 'KYC saved without the declaration');
  51 |   });
  52 | 
  53 |   test('TC-KYC-06 unaffordable premium is blocked @regression', async ({ agentPage: page, draftId }) => {
  54 |     await completeSteps(page, draftId, ['client', 'address', 'kyc'], { kyc: { annualIncome: '20000' } });
  55 |     const product = new ProductConfigurationPage(page);
  56 |     await product.goto(draftId);
  57 |     await product.configure({ ...data.product, sumAssured: 5000000, frequency: 'ANNUAL' });
  58 |     await product.save();
  59 | 
  60 |     // The rule may fire on the product step or on review. Either is fine.
  61 |     let messages = '';
  62 |     if (/\/product/.test(page.url())) {
  63 |       messages = await page.locator('body').innerText();
  64 |     } else {
  65 |       const review = new ReviewPage(page);
  66 |       await review.goto(draftId);
  67 |       await review.runValidation();
  68 |       messages = (await review.blockingErrors()).join(' | ');
  69 |     }
  70 |     expect(messages, 'Annual premium 30,500 on income 20,000 was not flagged (DEF-FIN-001)')
> 71 |       .toMatch(/afford|income/i);
     |        ^ Error: Annual premium 30,500 on income 20,000 was not flagged (DEF-FIN-001)
  72 |   });
  73 | });
  74 | 
```