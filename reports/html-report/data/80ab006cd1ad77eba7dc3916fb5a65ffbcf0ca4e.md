# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: client-information\kyc-financial.spec.js >> KYC, financial and compliance @client >> TC-KYC-04 PEP Yes requires details @regression
- Location: tests\client-information\kyc-financial.spec.js:43:3

# Error details

```
Error: PEP Yes saved with no details

expect(received).toMatch(expected)

Expected pattern: /kyc-financial/
Received string:  "http://34.14.182.252:8081/applications/268/product"
```

# Page snapshot

```yaml
- generic [active] [ref=f11e1]:
  - navigation [ref=f11e2]:
    - generic [ref=f11e3]:
      - link "Insurance Order Entry Demo Platform QA Automation Training App" [ref=f11e4] [cursor=pointer]:
        - /url: http://34.14.182.252:8081/dashboard
        - generic [aria-hidden] [ref=f11e5]: IO
        - generic [ref=f11e6]:
          - generic [ref=f11e7]: Insurance Order Entry Demo Platform
          - generic [ref=f11e8]: QA Automation Training App
      - generic [ref=f11e9]:
        - list [ref=f11e10]:
          - listitem [ref=f11e11]:
            - link "Dashboard" [ref=f11e12] [cursor=pointer]:
              - /url: http://34.14.182.252:8081/dashboard
          - listitem [ref=f11e13]:
            - link "Applications" [ref=f11e14] [cursor=pointer]:
              - /url: http://34.14.182.252:8081/applications
          - listitem [ref=f11e15]:
            - link "Products" [ref=f11e16] [cursor=pointer]:
              - /url: http://34.14.182.252:8081/products
          - listitem [ref=f11e17]:
            - link "Support" [ref=f11e18] [cursor=pointer]:
              - /url: http://34.14.182.252:8081/support
        - generic [ref=f11e19]:
          - link "Demo Agent Florida" [ref=f11e20] [cursor=pointer]:
            - /url: http://34.14.182.252:8081/profile
          - button "Logout" [ref=f11e22] [cursor=pointer]
  - main [ref=f11e23]:
    - alert [ref=f11e24]: KYC, financial, and compliance information saved.
    - generic [ref=f11e26]:
      - link "← Back to KYC & Financial" [ref=f11e27] [cursor=pointer]:
        - /url: http://34.14.182.252:8081/applications/268/kyc-financial
      - link "Application Summary" [ref=f11e28] [cursor=pointer]:
        - /url: http://34.14.182.252:8081/applications/268
    - generic [ref=f11e29]:
      - generic [ref=f11e31]:
        - generic [ref=f11e32]: "Application #268"
        - heading "Product & Policy Configuration" [level=1] [ref=f11e33]
        - paragraph [ref=f11e34]: Select the product, sum assured, premium payment frequency, premium payment term, and coverage term.
      - generic [ref=f11e37]:
        - generic [ref=f11e38]:
          - generic [ref=f11e39]:
            - generic [ref=f11e40]: Product
            - combobox "Product" [ref=f11e41]:
              - option "Select product" [selected]
              - option "Elite Legacy Whole Life"
              - option "FlexiPay Whole Life"
              - option "SecureLife Whole Life"
              - option "WealthBuilder Whole Life"
          - generic [ref=f11e42]:
            - generic [ref=f11e43]: Sum Assured
            - spinbutton "Sum Assured" [ref=f11e44]
          - generic [ref=f11e45]:
            - generic [ref=f11e46]: Premium Payment Frequency
            - combobox "Premium Payment Frequency" [ref=f11e47]:
              - option "Monthly" [selected]
              - option "Quarterly"
              - option "Semi-Annual"
              - option "Annual"
          - generic [ref=f11e48]:
            - generic [ref=f11e49]: Premium Payment Term
            - combobox "Premium Payment Term" [ref=f11e50]:
              - option "Select term" [selected]
              - option "10 years"
              - option "15 years"
              - option "20 years"
              - option "25 years"
              - option "30 years"
          - generic [ref=f11e51]:
            - generic [ref=f11e52]: Coverage Term
            - combobox "Coverage Term" [ref=f11e53]:
              - option "Whole Life" [selected]
              - option "To Age 100"
        - generic [ref=f11e55]:
          - generic [ref=f11e56]: Estimated Total Modal Premium
          - generic [ref=f11e57]: Pending
          - generic [ref=f11e58]: Select a product to estimate premium.
        - button "Save and Continue" [ref=f11e60] [cursor=pointer]
  - contentinfo [ref=f11e61]:
    - generic [ref=f11e62]:
      - generic [ref=f11e63]: TalentFarm QA Automation Lab
      - generic [ref=f11e64]: Insurance Order Entry Demo
```

# Test source

```ts
  1  | const { expect } = require('@playwright/test');
  2  | 
  3  | /**
  4  |  * Checks that a wizard step refused the input. A successful save always moves
  5  |  * to the next step, so staying on the same step means the input was rejected,
  6  |  * whether the browser blocked it or the server sent the page back with errors.
  7  |  * Call after the page object's save(), which waits for the page to settle.
  8  |  */
  9  | async function expectStepRejected(page, alert, stepPattern, message) {
> 10 |   expect(page.url(), message).toMatch(stepPattern);
     |                               ^ Error: PEP Yes saved with no details
  11 | }
  12 | 
  13 | module.exports = { expectStepRejected };
```