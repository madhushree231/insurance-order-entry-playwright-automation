# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: client-information\client.spec.js >> Client information @client >> TC-CLI-03 client under 18 rejected @regression
- Location: tests\client-information\client.spec.js:32:3

# Error details

```
Error: A 17 year old client was accepted

expect(received).toMatch(expected)

Expected pattern: /\/client/
Received string:  "http://34.14.182.252:8081/applications/259/address-contact"
```

# Page snapshot

```yaml
- generic [active] [ref=f7e1]:
  - navigation [ref=f7e2]:
    - generic [ref=f7e3]:
      - link "Insurance Order Entry Demo Platform QA Automation Training App" [ref=f7e4] [cursor=pointer]:
        - /url: http://34.14.182.252:8081/dashboard
        - generic [aria-hidden] [ref=f7e5]: IO
        - generic [ref=f7e6]:
          - generic [ref=f7e7]: Insurance Order Entry Demo Platform
          - generic [ref=f7e8]: QA Automation Training App
      - generic [ref=f7e9]:
        - list [ref=f7e10]:
          - listitem [ref=f7e11]:
            - link "Dashboard" [ref=f7e12] [cursor=pointer]:
              - /url: http://34.14.182.252:8081/dashboard
          - listitem [ref=f7e13]:
            - link "Applications" [ref=f7e14] [cursor=pointer]:
              - /url: http://34.14.182.252:8081/applications
          - listitem [ref=f7e15]:
            - link "Products" [ref=f7e16] [cursor=pointer]:
              - /url: http://34.14.182.252:8081/products
          - listitem [ref=f7e17]:
            - link "Support" [ref=f7e18] [cursor=pointer]:
              - /url: http://34.14.182.252:8081/support
        - generic [ref=f7e19]:
          - link "Demo Agent Florida" [ref=f7e20] [cursor=pointer]:
            - /url: http://34.14.182.252:8081/profile
          - button "Logout" [ref=f7e22] [cursor=pointer]
  - main [ref=f7e23]:
    - alert [ref=f7e24]: Client information saved.
    - generic [ref=f7e26]:
      - link "← Back to Client Information" [ref=f7e27] [cursor=pointer]:
        - /url: http://34.14.182.252:8081/applications/259/client
      - link "Application Summary" [ref=f7e28] [cursor=pointer]:
        - /url: http://34.14.182.252:8081/applications/259
    - generic [ref=f7e29]:
      - generic [ref=f7e30]:
        - heading "Address and Contact Information" [level=1] [ref=f7e31]
        - paragraph [ref=f7e32]: US address, ZIP, phone, and email details.
      - generic [ref=f7e33]:
        - generic [ref=f7e34]:
          - strong [ref=f7e36]: Residential Address
          - generic [ref=f7e38]:
            - generic [ref=f7e39]:
              - generic [ref=f7e40]: Street Address *
              - textbox "123 Main Street" [ref=f7e41]
            - generic [ref=f7e42]:
              - generic [ref=f7e43]: Apt / Suite
              - textbox "Apt 4B" [ref=f7e44]
            - generic [ref=f7e45]:
              - generic [ref=f7e46]: City *
              - textbox "Austin" [ref=f7e47]
            - generic [ref=f7e48]:
              - generic [ref=f7e49]: State *
              - combobox [ref=f7e50]:
                - option "Select state" [selected]
                - option "Alabama (AL)"
                - option "Alaska (AK)"
                - option "Arizona (AZ)"
                - option "Arkansas (AR)"
                - option "California (CA)"
                - option "Colorado (CO)"
                - option "Connecticut (CT)"
                - option "Delaware (DE)"
                - option "District of Columbia (DC)"
                - option "Florida (FL)"
                - option "Georgia (GA)"
                - option "Hawaii (HI)"
                - option "Idaho (ID)"
                - option "Illinois (IL)"
                - option "Indiana (IN)"
                - option "Iowa (IA)"
                - option "Kansas (KS)"
                - option "Kentucky (KY)"
                - option "Louisiana (LA)"
                - option "Maine (ME)"
                - option "Maryland (MD)"
                - option "Massachusetts (MA)"
                - option "Michigan (MI)"
                - option "Minnesota (MN)"
                - option "Mississippi (MS)"
                - option "Missouri (MO)"
                - option "Montana (MT)"
                - option "Nebraska (NE)"
                - option "Nevada (NV)"
                - option "New Hampshire (NH)"
                - option "New Jersey (NJ)"
                - option "New Mexico (NM)"
                - option "New York (NY)"
                - option "North Carolina (NC)"
                - option "North Dakota (ND)"
                - option "Ohio (OH)"
                - option "Oklahoma (OK)"
                - option "Oregon (OR)"
                - option "Pennsylvania (PA)"
                - option "Rhode Island (RI)"
                - option "South Carolina (SC)"
                - option "South Dakota (SD)"
                - option "Tennessee (TN)"
                - option "Texas (TX)"
                - option "Utah (UT)"
                - option "Vermont (VT)"
                - option "Virginia (VA)"
                - option "Washington (WA)"
                - option "West Virginia (WV)"
                - option "Wisconsin (WI)"
                - option "Wyoming (WY)"
            - generic [ref=f7e51]:
              - generic [ref=f7e52]: ZIP Code *
              - textbox "73301" [ref=f7e53]
              - generic [ref=f7e54]: Use 12345 or 12345-6789.
        - generic [ref=f7e55]:
          - generic [ref=f7e56]:
            - strong [ref=f7e57]: Mailing Address
            - generic [ref=f7e58]:
              - checkbox "Same as residential" [ref=f7e59]
              - generic [ref=f7e60]: Same as residential
          - generic [ref=f7e63]:
            - generic [ref=f7e64]:
              - generic [ref=f7e65]: Street Address
              - textbox "PO Box or street address" [ref=f7e66]
            - generic [ref=f7e67]:
              - generic [ref=f7e68]: Apt / Suite
              - textbox "Suite 200" [ref=f7e69]
            - generic [ref=f7e70]:
              - generic [ref=f7e71]: City
              - textbox "Dallas" [ref=f7e72]
            - generic [ref=f7e73]:
              - generic [ref=f7e74]: State
              - combobox [ref=f7e75]:
                - option "Select state" [selected]
                - option "Alabama (AL)"
                - option "Alaska (AK)"
                - option "Arizona (AZ)"
                - option "Arkansas (AR)"
                - option "California (CA)"
                - option "Colorado (CO)"
                - option "Connecticut (CT)"
                - option "Delaware (DE)"
                - option "District of Columbia (DC)"
                - option "Florida (FL)"
                - option "Georgia (GA)"
                - option "Hawaii (HI)"
                - option "Idaho (ID)"
                - option "Illinois (IL)"
                - option "Indiana (IN)"
                - option "Iowa (IA)"
                - option "Kansas (KS)"
                - option "Kentucky (KY)"
                - option "Louisiana (LA)"
                - option "Maine (ME)"
                - option "Maryland (MD)"
                - option "Massachusetts (MA)"
                - option "Michigan (MI)"
                - option "Minnesota (MN)"
                - option "Mississippi (MS)"
                - option "Missouri (MO)"
                - option "Montana (MT)"
                - option "Nebraska (NE)"
                - option "Nevada (NV)"
                - option "New Hampshire (NH)"
                - option "New Jersey (NJ)"
                - option "New Mexico (NM)"
                - option "New York (NY)"
                - option "North Carolina (NC)"
                - option "North Dakota (ND)"
                - option "Ohio (OH)"
                - option "Oklahoma (OK)"
                - option "Oregon (OR)"
                - option "Pennsylvania (PA)"
                - option "Rhode Island (RI)"
                - option "South Carolina (SC)"
                - option "South Dakota (SD)"
                - option "Tennessee (TN)"
                - option "Texas (TX)"
                - option "Utah (UT)"
                - option "Vermont (VT)"
                - option "Virginia (VA)"
                - option "Washington (WA)"
                - option "West Virginia (WV)"
                - option "Wisconsin (WI)"
                - option "Wyoming (WY)"
            - generic [ref=f7e76]:
              - generic [ref=f7e77]: ZIP Code
              - textbox "75201" [ref=f7e78]
        - generic [ref=f7e79]:
          - strong [ref=f7e81]: Contact Information
          - generic [ref=f7e83]:
            - generic [ref=f7e84]:
              - generic [ref=f7e85]: Primary Email *
              - textbox "name@example.com" [ref=f7e86]
            - generic [ref=f7e87]:
              - generic [ref=f7e88]: Mobile Phone *
              - textbox "(212) 555-1212" [ref=f7e89]
            - generic [ref=f7e90]:
              - generic [ref=f7e91]: Alternate Phone
              - textbox "312-555-1212" [ref=f7e92]
            - generic [ref=f7e93]:
              - generic [ref=f7e94]: Preferred Contact Mode *
              - combobox [ref=f7e95]:
                - option "Select mode" [selected]
                - option "Email"
                - option "Phone"
                - option "Postal Mail"
        - generic [ref=f7e96]:
          - link "Back" [ref=f7e97] [cursor=pointer]:
            - /url: http://34.14.182.252:8081/applications/259/client
          - button "Save and Continue" [ref=f7e98] [cursor=pointer]
  - contentinfo [ref=f7e99]:
    - generic [ref=f7e100]:
      - generic [ref=f7e101]: TalentFarm QA Automation Lab
      - generic [ref=f7e102]: Insurance Order Entry Demo
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
     |                               ^ Error: A 17 year old client was accepted
  11 | }
  12 | 
  13 | module.exports = { expectStepRejected };
```