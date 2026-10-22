# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: documents\documents.spec.js >> Documents @documents >> TC-DOC-05 continue skips step validation @regression
- Location: tests\documents\documents.spec.js:20:3

# Error details

```
Error: Continue to Review moved on with no documents uploaded (own finding)

expect(page).toHaveURL(expected) failed

Expected pattern: /documents/
Received string:  "http://34.14.182.252:8081/applications/274/review"
Timeout: 10000ms

Call log:
  - Continue to Review moved on with no documents uploaded (own finding) with timeout 10000ms
    23 × locator resolved to <html lang="en">…</html>
       - unexpected value "http://34.14.182.252:8081/applications/274/review"

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
  - alert:
    - text: "Please review the following:"
    - list:
      - listitem: Client information is required.
      - listitem: RESIDENTIAL address is required.
      - listitem: MAILING address is required.
      - listitem: Contact information is required.
      - listitem: KYC details are required.
      - listitem: Financial profile is required.
      - listitem: Compliance declaration is required.
      - listitem: Insurance product must be selected.
  - link "← Back to Documents":
    - /url: http://34.14.182.252:8081/applications/274/documents
  - link "Application Summary":
    - /url: http://34.14.182.252:8081/applications/274
  - text: "Application #274"
  - heading "Review Application" [level=1]
  - paragraph: Review the application details and resolve any blocking validation errors before submission.
  - heading "Submission Validation" [level=2]
  - text: "Blocking validation errors found:"
  - list:
    - listitem: Client information is required.
    - listitem: RESIDENTIAL address is required.
    - listitem: MAILING address is required.
    - listitem: Contact information is required.
    - listitem: KYC details are required.
    - listitem: Financial profile is required.
    - listitem: Compliance declaration is required.
    - listitem: Insurance product must be selected.
  - link "Back to Documents":
    - /url: http://34.14.182.252:8081/applications/274/documents
  - button "Run Validation"
  - button "Submit Application" [disabled]
  - heading "Application Snapshot" [level=2]
  - term: Client
  - definition: Pending
  - term: Calculated Age
  - definition: Pending
  - term: Product
  - definition: Not selected
  - term: Sum Assured
  - definition: Pending
  - term: Premium Payment Frequency
  - definition: MONTHLY
  - term: Premium Payment Term
  - definition: Pending
  - term: Coverage Term
  - definition: WHOLE_LIFE
  - term: Base Policy Premium
  - definition: $0.00
  - term: Rider Premium
  - definition: $0.00
  - term: Total Modal Premium
  - definition: $0.00
  - term: Status
  - definition: DRAFT
- contentinfo: TalentFarm QA Automation Lab Insurance Order Entry Demo
```

# Test source

```ts
  1  | const { test, expect } = require('../../fixtures/auth.fixture');
  2  | const { DocumentUploadPage } = require('../../pages/DocumentUploadPage');
  3  | const { validPdf, exeFile } = require('../../utils/fileUploadHelper');
  4  | 
  5  | test.describe('Documents @documents', () => {
  6  |   test('TC-DOC-01 valid PDF uploads @smoke', async ({ agentPage: page, draftId }) => {
  7  |     const d = new DocumentUploadPage(page);
  8  |     await d.goto(draftId);
  9  |     await d.uploadFile(validPdf());
  10 |     expect(await d.documentCount(), 'The PDF was not recorded').toBeGreaterThan(0);
  11 |   });
  12 | 
  13 |   test('TC-DOC-02 unsupported file type rejected @regression', async ({ agentPage: page, draftId }) => {
  14 |     const d = new DocumentUploadPage(page);
  15 |     await d.goto(draftId);
  16 |     await d.uploadFile(exeFile());
  17 |     expect(await d.documentCount(), 'An .exe file was accepted as a KYC document (DEF-DOC-002)').toBe(0);
  18 |   });
  19 | 
  20 |   test('TC-DOC-05 continue skips step validation @regression', async ({ agentPage: page, draftId }) => {
  21 |     const d = new DocumentUploadPage(page);
  22 |     await d.goto(draftId);
  23 |     await d.clickContinueToReview();
> 24 |     await expect(page, 'Continue to Review moved on with no documents uploaded (own finding)').toHaveURL(/documents/);
     |                                                                                                ^ Error: Continue to Review moved on with no documents uploaded (own finding)
  25 |   });
  26 | });
  27 | 
```