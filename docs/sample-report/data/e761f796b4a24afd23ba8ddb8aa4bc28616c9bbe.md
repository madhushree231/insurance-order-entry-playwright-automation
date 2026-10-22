# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: workflow\review.spec.js >> Review and validation @workflow >> TC-DOC-03 missing KYC blocks submission @regression
- Location: tests\workflow\review.spec.js:6:3

# Error details

```
Error: Validation passed with no KYC document uploaded (DEF-DOC-001)

expect(received).toMatch(expected)

Expected pattern: /document|kyc/i
Received string:  ""
```

# Page snapshot

```yaml
- generic [active] [ref=f17e1]:
  - navigation [ref=f17e2]:
    - generic [ref=f17e3]:
      - link "Insurance Order Entry Demo Platform QA Automation Training App" [ref=f17e4] [cursor=pointer]:
        - /url: http://34.14.182.252:8081/dashboard
        - generic [aria-hidden] [ref=f17e5]: IO
        - generic [ref=f17e6]:
          - generic [ref=f17e7]: Insurance Order Entry Demo Platform
          - generic [ref=f17e8]: QA Automation Training App
      - generic [ref=f17e9]:
        - list [ref=f17e10]:
          - listitem [ref=f17e11]:
            - link "Dashboard" [ref=f17e12] [cursor=pointer]:
              - /url: http://34.14.182.252:8081/dashboard
          - listitem [ref=f17e13]:
            - link "Applications" [ref=f17e14] [cursor=pointer]:
              - /url: http://34.14.182.252:8081/applications
          - listitem [ref=f17e15]:
            - link "Products" [ref=f17e16] [cursor=pointer]:
              - /url: http://34.14.182.252:8081/products
          - listitem [ref=f17e17]:
            - link "Support" [ref=f17e18] [cursor=pointer]:
              - /url: http://34.14.182.252:8081/support
        - generic [ref=f17e19]:
          - link "Demo Agent Florida" [ref=f17e20] [cursor=pointer]:
            - /url: http://34.14.182.252:8081/profile
          - button "Logout" [ref=f17e22] [cursor=pointer]
  - main [ref=f17e23]:
    - alert [ref=f17e24]: Application validation passed.
    - generic [ref=f17e26]:
      - link "← Back to Documents" [ref=f17e27] [cursor=pointer]:
        - /url: http://34.14.182.252:8081/applications/286/documents
      - link "Application Summary" [ref=f17e28] [cursor=pointer]:
        - /url: http://34.14.182.252:8081/applications/286
    - generic [ref=f17e29]:
      - generic [ref=f17e31]:
        - generic [ref=f17e32]: "Application #286"
        - heading "Review Application" [level=1] [ref=f17e33]
        - paragraph [ref=f17e34]: Review the application details and resolve any blocking validation errors before submission.
      - generic [ref=f17e35]:
        - generic [ref=f17e38]:
          - heading "Submission Validation" [level=2] [ref=f17e39]
          - generic [ref=f17e40]: No blocking validation errors found.
          - generic [ref=f17e41]:
            - link "Back to Documents" [ref=f17e42] [cursor=pointer]:
              - /url: http://34.14.182.252:8081/applications/286/documents
            - button "Run Validation" [ref=f17e43] [cursor=pointer]
          - button "Submit Application" [ref=f17e45] [cursor=pointer]
        - generic [ref=f17e48]:
          - heading "Application Snapshot" [level=2] [ref=f17e49]
          - generic [ref=f17e50]:
            - term [ref=f17e51]: Client
            - definition [ref=f17e52]: Qa Applicant
            - term [ref=f17e53]: Calculated Age
            - definition [ref=f17e54]: "42"
            - term [ref=f17e55]: Product
            - definition [ref=f17e56]: Elite Legacy Whole Life
            - term [ref=f17e57]: Sum Assured
            - definition [ref=f17e58]: $1,000,000.00
            - term [ref=f17e59]: Premium Payment Frequency
            - definition [ref=f17e60]: MONTHLY
            - term [ref=f17e61]: Premium Payment Term
            - definition [ref=f17e62]: 15 years
            - term [ref=f17e63]: Coverage Term
            - definition [ref=f17e64]: WHOLE_LIFE
            - term [ref=f17e65]: Base Policy Premium
            - definition [ref=f17e66]: $508.33
            - term [ref=f17e67]: Rider Premium
            - definition [ref=f17e68]: $0.00
            - term [ref=f17e69]: Total Modal Premium
            - definition [ref=f17e70]: $508.33
            - term [ref=f17e71]: Status
            - definition [ref=f17e72]: DRAFT
  - contentinfo [ref=f17e73]:
    - generic [ref=f17e74]:
      - generic [ref=f17e75]: TalentFarm QA Automation Lab
      - generic [ref=f17e76]: Insurance Order Entry Demo
```

# Test source

```ts
  1  | const { test, expect } = require('../../fixtures/auth.fixture');
  2  | const { ReviewPage } = require('../../pages/ReviewPage');
  3  | const { completeSteps } = require('../../utils/testHelpers');
  4  | 
  5  | test.describe('Review and validation @workflow', () => {
  6  |   test('TC-DOC-03 missing KYC blocks submission @regression', async ({ agentPage: page, draftId }) => {
  7  |     test.setTimeout(120000);
  8  |     await completeSteps(page, draftId, ['client', 'address', 'kyc', 'product', 'beneficiary']);
  9  |     const review = new ReviewPage(page);
  10 |     await review.goto(draftId);
  11 |     await review.runValidation();
  12 |     const errors = (await review.blockingErrors()).join(' | ');
> 13 |     expect(errors, 'Validation passed with no KYC document uploaded (DEF-DOC-001)').toMatch(/document|kyc/i);
     |                                                                                     ^ Error: Validation passed with no KYC document uploaded (DEF-DOC-001)
  14 |   });
  15 | 
  16 |   test('TC-DOC-04 submit disabled while errors remain @regression', async ({ agentPage: page, draftId }) => {
  17 |     const review = new ReviewPage(page);
  18 |     await review.goto(draftId);
  19 |     await review.runValidation();
  20 |     expect(await review.hasBlockingErrors(), 'An empty draft passed validation').toBe(true);
  21 |     expect(await review.canSubmit(), 'Submit is enabled on an empty draft (DEF-WF-002)').toBe(false);
  22 |   });
  23 | });
  24 | 
```