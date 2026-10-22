# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: beneficiaries\beneficiaries.spec.js >> Beneficiaries @beneficiary >> TC-BEN-07 duplicate beneficiary blocked @regression
- Location: tests\beneficiaries\beneficiaries.spec.js:59:3

# Error details

```
Error: The same beneficiary was saved twice

expect(received).toBe(expected) // Object.is equality

Expected: 1
Received: 2
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
    - alert [ref=f8e24]: Beneficiary saved.
    - generic [ref=f8e26]:
      - link "← Back to Riders" [ref=f8e27] [cursor=pointer]:
        - /url: http://34.14.182.252:8081/applications/251/riders
      - link "Application Summary" [ref=f8e28] [cursor=pointer]:
        - /url: http://34.14.182.252:8081/applications/251
    - generic [ref=f8e29]:
      - generic [ref=f8e30]:
        - generic [ref=f8e31]:
          - generic [ref=f8e32]: "Application #251"
          - heading "Beneficiaries" [level=1] [ref=f8e33]
          - paragraph [ref=f8e34]: Add or update primary and secondary beneficiaries for the policy.
        - link "Back to Application" [ref=f8e35] [cursor=pointer]:
          - /url: http://34.14.182.252:8081/applications/251
      - generic [ref=f8e36]: "Primary allocation: 100.00% | Secondary allocation: 0.00%"
      - generic [ref=f8e37]:
        - strong [ref=f8e39]: Existing Beneficiaries
        - table [ref=f8e42]:
          - rowgroup [ref=f8e43]:
            - row [ref=f8e44]:
              - columnheader "Level" [ref=f8e45]
              - columnheader "Type" [ref=f8e46]
              - columnheader "Name" [ref=f8e47]
              - columnheader "Designation" [ref=f8e48]
              - columnheader "Relationship" [ref=f8e49]
              - columnheader "Age" [ref=f8e50]
              - columnheader "Allocation" [ref=f8e51]
              - columnheader "Email" [ref=f8e52]
              - columnheader "Phone" [ref=f8e53]
              - columnheader "Action" [ref=f8e54]
          - rowgroup [ref=f8e55]:
            - row [ref=f8e56]:
              - cell "PRIMARY" [ref=f8e57]
              - cell "INDIVIDUAL" [ref=f8e58]
              - cell "Duplicate Test" [ref=f8e59]
              - cell "Revocable" [ref=f8e60]
              - cell "SPOUSE" [ref=f8e62]
              - cell "39" [ref=f8e63]
              - cell "50.00%" [ref=f8e64]
              - cell "-" [ref=f8e65]
              - cell "-" [ref=f8e66]
              - cell [ref=f8e67]:
                - link "Edit" [ref=f8e68] [cursor=pointer]:
                  - /url: http://34.14.182.252:8081/applications/251/beneficiaries?edit=85
                - button "Remove" [ref=f8e70] [cursor=pointer]
            - row [ref=f8e71]:
              - cell "PRIMARY" [ref=f8e72]
              - cell "INDIVIDUAL" [ref=f8e73]
              - cell "Duplicate Test" [ref=f8e74]
              - cell "Revocable" [ref=f8e75]
              - cell "SPOUSE" [ref=f8e77]
              - cell "39" [ref=f8e78]
              - cell "50.00%" [ref=f8e79]
              - cell "-" [ref=f8e80]
              - cell "-" [ref=f8e81]
              - cell [ref=f8e82]:
                - link "Edit" [ref=f8e83] [cursor=pointer]:
                  - /url: http://34.14.182.252:8081/applications/251/beneficiaries?edit=86
                - button "Remove" [ref=f8e85] [cursor=pointer]
      - generic [ref=f8e86]:
        - generic [ref=f8e87]:
          - strong [ref=f8e89]: Add Beneficiary
          - generic [ref=f8e91]:
            - generic [ref=f8e92]:
              - generic [ref=f8e93]: Beneficiary Level *
              - combobox [ref=f8e94]:
                - option "Select" [selected]
                - option "Primary"
                - option "Secondary"
            - generic [ref=f8e95]:
              - generic [ref=f8e96]: Beneficiary Type *
              - combobox [ref=f8e97]:
                - option "Individual" [selected]
                - option "Trust"
                - option "Organization"
            - generic [ref=f8e98]:
              - generic [ref=f8e99]: Relationship *
              - combobox [ref=f8e100]:
                - option "Select" [selected]
                - option "Spouse"
                - option "Child"
                - option "Parent"
                - option "Sibling"
                - option "Trust"
                - option "Organization"
                - option "Other"
            - generic [ref=f8e101]:
              - generic [ref=f8e102]: Allocation % *
              - spinbutton [ref=f8e103]: "100"
            - generic [ref=f8e104]:
              - generic [ref=f8e105]: Beneficiary Designation *
              - combobox [ref=f8e106]:
                - option "Revocable" [selected]
                - option "Irrevocable"
              - generic [ref=f8e107]: Irrevocable beneficiaries cannot be changed or removed in this demo without beneficiary consent.
            - generic [ref=f8e108]:
              - generic [ref=f8e109]: Phone
              - textbox "(212) 555-1212" [ref=f8e110]
            - generic [ref=f8e111]:
              - generic [ref=f8e112]: Email
              - textbox [ref=f8e113]
            - generic [ref=f8e114]:
              - generic [ref=f8e115]: Country
              - textbox [ref=f8e116]: US
        - generic [ref=f8e117]:
          - strong [ref=f8e119]: Individual Beneficiary Details
          - generic [ref=f8e121]:
            - generic [ref=f8e122]:
              - generic [ref=f8e123]: First Name *
              - textbox [ref=f8e124]
            - generic [ref=f8e125]:
              - generic [ref=f8e126]: Middle Name
              - textbox [ref=f8e127]
            - generic [ref=f8e128]:
              - generic [ref=f8e129]: Last Name *
              - textbox [ref=f8e130]
            - generic [ref=f8e131]:
              - generic [ref=f8e132]: Date of Birth *
              - textbox [ref=f8e133]
            - generic [ref=f8e134]:
              - generic [ref=f8e135]: Gender
              - combobox [ref=f8e136]:
                - option "Select" [selected]
                - option "Male"
                - option "Female"
                - option "Non-binary"
        - generic [ref=f8e137]:
          - strong [ref=f8e139]: Address Details
          - generic [ref=f8e141]:
            - generic [ref=f8e142]:
              - generic [ref=f8e143]: Address Line 1
              - textbox [ref=f8e144]
            - generic [ref=f8e145]:
              - generic [ref=f8e146]: City
              - textbox [ref=f8e147]
            - generic [ref=f8e148]:
              - generic [ref=f8e149]: State
              - textbox [ref=f8e150]
            - generic [ref=f8e151]:
              - generic [ref=f8e152]: Postal Code
              - textbox [ref=f8e153]
        - generic [ref=f8e154]:
          - strong [ref=f8e156]: Minor Beneficiary Guardian Details
          - generic [ref=f8e158]:
            - generic [ref=f8e159]:
              - generic [ref=f8e160]: Guardian Name
              - textbox [ref=f8e161]
            - generic [ref=f8e162]:
              - generic [ref=f8e163]: Guardian Relationship
              - textbox [ref=f8e164]
            - generic [ref=f8e165]:
              - generic [ref=f8e166]: Guardian Contact
              - textbox [ref=f8e167]
            - generic [ref=f8e168]:
              - generic [ref=f8e169]: Guardian Address
              - textbox [ref=f8e170]
            - generic [ref=f8e172]:
              - checkbox "Legal acknowledgement completed for minor beneficiary" [ref=f8e173]
              - generic [ref=f8e174]: Legal acknowledgement completed for minor beneficiary
        - generic [ref=f8e175]:
          - link "Back" [ref=f8e176] [cursor=pointer]:
            - /url: http://34.14.182.252:8081/applications/251/riders
          - generic [ref=f8e177]:
            - button "Save Beneficiary" [ref=f8e178] [cursor=pointer]
            - link "Continue" [ref=f8e179] [cursor=pointer]:
              - /url: http://34.14.182.252:8081/applications/251/documents
  - contentinfo [ref=f8e180]:
    - generic [ref=f8e181]:
      - generic [ref=f8e182]: TalentFarm QA Automation Lab
      - generic [ref=f8e183]: Insurance Order Entry Demo
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
  24 |     await expect(page, 'Wizard moved on with only 60% allocated (DEF-BEN-001)').toHaveURL(/beneficiaries/);
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
> 64 |     expect(await b.beneficiaryCount(), 'The same beneficiary was saved twice').toBe(1);
     |                                                                                ^ Error: The same beneficiary was saved twice
  65 |   });
  66 | });
  67 | 
```