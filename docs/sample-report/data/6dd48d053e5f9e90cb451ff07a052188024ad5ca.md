# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: beneficiaries\beneficiaries.spec.js >> Beneficiaries @beneficiary >> TC-BEN-02 primary below 100 percent blocks progression @regression
- Location: tests\beneficiaries\beneficiaries.spec.js:20:3

# Error details

```
Error: Wizard moved on with only 60% allocated (DEF-BEN-001)

expect(page).toHaveURL(expected) failed

Expected pattern: /beneficiaries/
Received string:  "http://34.14.182.252:8081/applications/246/documents"
Timeout: 10000ms

Call log:
  - Wizard moved on with only 60% allocated (DEF-BEN-001) with timeout 10000ms
    23 × locator resolved to <html lang="en">…</html>
       - unexpected value "http://34.14.182.252:8081/applications/246/documents"

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
  - link "← Back to Beneficiaries":
    - /url: http://34.14.182.252:8081/applications/246/beneficiaries
  - link "Application Summary":
    - /url: http://34.14.182.252:8081/applications/246
  - heading "Upload Document" [level=1]
  - text: Document Type
  - combobox:
    - option "KYC_ID" [selected]
    - option "ADDRESS_PROOF"
    - option "INCOME_PROOF"
    - option "OTHER"
  - text: Upload File
  - button "Choose File"
  - text: Simulated File Name
  - textbox "simulated-upload.pdf"
  - button "Upload Document"
  - heading "Uploaded Documents" [level=2]
  - table:
    - rowgroup:
      - row "Type File Size KB Status":
        - columnheader "Type"
        - columnheader "File"
        - columnheader "Size KB"
        - columnheader "Status"
        - columnheader
    - rowgroup:
      - row "No documents uploaded.":
        - cell "No documents uploaded."
  - link "Continue to Review":
    - /url: http://34.14.182.252:8081/applications/246/review
- contentinfo: TalentFarm QA Automation Lab Insurance Order Entry Demo
```

# Test source

```ts
  1  | const { test, expect } = require('../../fixtures/auth.fixture');
  2  | const { BeneficiaryPage } = require('../../pages/BeneficiaryPage');
  3  | const data = require('../../fixtures/applicationData');
  4  | const { yearsAgo } = require('../../utils/dataGenerator');
  5  | 
  6  | async function open(page, id) {
  7  |   const b = new BeneficiaryPage(page);
  8  |   await b.goto(id);
  9  |   return b;
  10 | }
  11 | 
  12 | test.describe('Beneficiaries @beneficiary', () => {
  13 |   test('TC-BEN-01 valid primary beneficiary added @smoke', async ({ agentPage: page, draftId }) => {
  14 |     const b = await open(page, draftId);
  15 |     await b.addBeneficiary(data.beneficiary());
  16 |     expect(await b.beneficiaryCount()).toBe(1);
  17 |     expect((await b.allocationTotals()).primary).toBeCloseTo(100, 2);
  18 |   });
  19 | 
  20 |   test('TC-BEN-02 primary below 100 percent blocks progression @regression', async ({ agentPage: page, draftId }) => {
  21 |     const b = await open(page, draftId);
  22 |     await b.addBeneficiary(data.beneficiary({ allocation: 60 }));
  23 |     await b.clickContinue();
> 24 |     await expect(page, 'Wizard moved on with only 60% allocated (DEF-BEN-001)').toHaveURL(/beneficiaries/);
     |                                                                                 ^ Error: Wizard moved on with only 60% allocated (DEF-BEN-001)
  25 |   });
  26 | 
  27 |   test('TC-BEN-03 primary above 100 percent blocked @regression', async ({ agentPage: page, draftId }) => {
  28 |     const b = await open(page, draftId);
  29 |     await b.addBeneficiary(data.beneficiary({ allocation: 70 }));
  30 |     await b.addBeneficiary(data.beneficiary({ allocation: 50, relationship: 'CHILD', firstName: 'Second' }));
  31 |     const total = (await b.allocationTotals()).primary;
  32 |     const rejected = await b.wasRejected();
  33 |     expect(rejected || total <= 100, `Primary allocation reached ${total}% with no error (DEF-BEN-001)`).toBe(true);
  34 |   });
  35 | 
  36 |   test('TC-BEN-04 minor beneficiary needs guardian @regression', async ({ agentPage: page, draftId }) => {
  37 |     const b = await open(page, draftId);
  38 |     await b.addBeneficiary(data.beneficiary({ relationship: 'CHILD', dob: yearsAgo(10) }));
  39 |     expect(await b.wasRejected(), 'Minor beneficiary saved with no guardian (DEF-BEN-002)').toBe(true);
  40 |   });
  41 | 
  42 |   test('TC-BEN-05 beneficiary type shows matching fields @regression', async ({ agentPage: page, draftId }) => {
  43 |     const b = await open(page, draftId);
  44 |     for (const type of BeneficiaryPage.TYPES) {
  45 |       await b.type.selectOption(type);
  46 |       for (const other of BeneficiaryPage.TYPES) {
  47 |         expect(await b.isSectionVisible(other), `${other} panel visibility wrong when ${type} selected`)
  48 |           .toBe(other === type);
  49 |       }
  50 |     }
  51 |   });
  52 | 
  53 |   test('TC-BEN-06 trust needs trust and trustee names @regression', async ({ agentPage: page, draftId }) => {
  54 |     const b = await open(page, draftId);
  55 |     await b.addBeneficiary({ level: 'PRIMARY', type: 'TRUST', relationship: 'TRUST', allocation: 100, designation: 'REVOCABLE' });
  56 |     expect(await b.wasRejected(), 'Trust saved with no trust or trustee name (DEF-BEN-003)').toBe(true);
  57 |   });
  58 | 
  59 |   test('TC-BEN-07 duplicate beneficiary blocked @regression', async ({ agentPage: page, draftId }) => {
  60 |     const b = await open(page, draftId);
  61 |     const same = data.beneficiary({ allocation: 50, firstName: 'Duplicate' });
  62 |     await b.addBeneficiary(same);
  63 |     await b.addBeneficiary(same);
  64 |     expect(await b.beneficiaryCount(), 'The same beneficiary was saved twice').toBe(1);
  65 |   });
  66 | });
  67 | 
```