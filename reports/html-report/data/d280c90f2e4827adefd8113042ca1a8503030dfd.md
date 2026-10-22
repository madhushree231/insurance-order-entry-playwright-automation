# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard\dashboard.spec.js >> Dashboard @dashboard >> TC-DASH-04 new agent sees empty state @regression
- Location: tests\dashboard\dashboard.spec.js:47:3

# Error details

```
Error: New agent has applications: {"draft":1,"submitted":0,"underReview":0,"approved":0,"requiresInfo":0}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- generic [active] [ref=f2e1]:
  - navigation [ref=f2e2]:
    - generic [ref=f2e3]:
      - link "Insurance Order Entry Demo Platform QA Automation Training App" [ref=f2e4] [cursor=pointer]:
        - /url: http://34.14.182.252:8081/dashboard
        - generic [aria-hidden] [ref=f2e5]: IO
        - generic [ref=f2e6]:
          - generic [ref=f2e7]: Insurance Order Entry Demo Platform
          - generic [ref=f2e8]: QA Automation Training App
      - generic [ref=f2e9]:
        - list [ref=f2e10]:
          - listitem [ref=f2e11]:
            - link "Dashboard" [ref=f2e12] [cursor=pointer]:
              - /url: http://34.14.182.252:8081/dashboard
          - listitem [ref=f2e13]:
            - link "Applications" [ref=f2e14] [cursor=pointer]:
              - /url: http://34.14.182.252:8081/applications
          - listitem [ref=f2e15]:
            - link "Products" [ref=f2e16] [cursor=pointer]:
              - /url: http://34.14.182.252:8081/products
          - listitem [ref=f2e17]:
            - link "Support" [ref=f2e18] [cursor=pointer]:
              - /url: http://34.14.182.252:8081/support
        - generic [ref=f2e19]:
          - link "New Agent" [ref=f2e20] [cursor=pointer]:
            - /url: http://34.14.182.252:8081/profile
          - button "Logout" [ref=f2e22] [cursor=pointer]
  - main [ref=f2e23]:
    - generic [ref=f2e24]:
      - generic [ref=f2e25]:
        - heading "Agent Dashboard" [level=1] [ref=f2e26]
        - paragraph [ref=f2e27]: Track drafts, submitted applications, and policy order entry work.
      - link "Start New Application" [ref=f2e28] [cursor=pointer]:
        - /url: http://34.14.182.252:8081/applications/new
    - generic [ref=f2e29]:
      - generic [ref=f2e32]:
        - generic [ref=f2e33]: Draft
        - generic [ref=f2e34]: "1"
      - generic [ref=f2e37]:
        - generic [ref=f2e38]: Submitted
        - generic [ref=f2e39]: "0"
      - generic [ref=f2e42]:
        - generic [ref=f2e43]: Under Review
        - generic [ref=f2e44]: "0"
      - generic [ref=f2e47]:
        - generic [ref=f2e48]: Approved
        - generic [ref=f2e49]: "0"
      - generic [ref=f2e52]:
        - generic [ref=f2e53]: Requires Info
        - generic [ref=f2e54]: "0"
    - generic [ref=f2e55]:
      - generic [ref=f2e56]:
        - heading "Recent Applications" [level=2] [ref=f2e57]
        - link "View all" [ref=f2e58] [cursor=pointer]:
          - /url: http://34.14.182.252:8081/applications
      - table [ref=f2e60]:
        - rowgroup [ref=f2e61]:
          - row [ref=f2e62]:
            - columnheader "Reference" [ref=f2e63]
            - columnheader "Client" [ref=f2e64]
            - columnheader "Product" [ref=f2e65]
            - columnheader "Status" [ref=f2e66]
            - columnheader "Updated" [ref=f2e67]
            - columnheader [ref=f2e68]
        - rowgroup [ref=f2e69]:
          - row [ref=f2e70]:
            - 'cell "Draft #47" [ref=f2e71]'
            - cell [ref=f2e72]
            - cell "Not selected" [ref=f2e73]
            - cell "DRAFT" [ref=f2e74]
            - cell "03 Jun 2026" [ref=f2e76]
            - cell [ref=f2e77]:
              - link "Open" [ref=f2e78] [cursor=pointer]:
                - /url: http://34.14.182.252:8081/applications/47
  - contentinfo [ref=f2e79]:
    - generic [ref=f2e80]:
      - generic [ref=f2e81]: TalentFarm QA Automation Lab
      - generic [ref=f2e82]: Insurance Order Entry Demo
```

# Test source

```ts
  1  | const { test, expect, loginAs } = require('../../fixtures/auth.fixture');
  2  | const { DashboardPage } = require('../../pages/DashboardPage');
  3  | const { users, seeded } = require('../../fixtures/users');
  4  | const { applicationIdByReference } = require('../../utils/testHelpers');
  5  | 
  6  | test.describe('Dashboard @dashboard', () => {
  7  |   test('TC-DASH-01 dashboard shows status tiles @smoke', async ({ agentPage: page }) => {
  8  |     const d = new DashboardPage(page);
  9  |     await d.goto();
  10 |     for (const tile of [d.draftTile, d.submittedTile, d.underReviewTile, d.approvedTile, d.requiresInfoTile]) {
  11 |       await expect(tile).toBeVisible();
  12 |     }
  13 |     await expect(d.newApplicationButton).toBeVisible();
  14 |     const counts = await d.counts();
  15 |     for (const [name, value] of Object.entries(counts)) {
  16 |       expect(Number.isInteger(value), `${name} tile is not a number`).toBe(true);
  17 |     }
  18 |   });
  19 | 
  20 |   test('TC-DASH-02 new draft appears on dashboard @regression', async ({ agentPage: page }) => {
  21 |     const d = new DashboardPage(page);
  22 |     await d.goto();
  23 |     const before = await d.counts();
  24 |     const id = await d.startNewApplication();
  25 |     await d.goto();
  26 |     const after = await d.counts();
  27 |     expect(after.draft).toBeGreaterThan(before.draft);
  28 |     await expect(d.statusFor(id)).toContainText(/DRAFT/i);
  29 |   });
  30 | 
  31 |   test('TC-DASH-03 agent cannot open another agent application @regression', async ({ browser }) => {
  32 |     const ctx2 = await browser.newContext();
  33 |     const p2 = await ctx2.newPage();
  34 |     await loginAs(p2, users.draftAgent);
  35 |     const otherId = await applicationIdByReference(p2, seeded.draftAgentDraft);
  36 |     await ctx2.close();
  37 | 
  38 |     const ctx1 = await browser.newContext();
  39 |     const page = await ctx1.newPage();
  40 |     await loginAs(page, users.agent);
  41 |     const response = await page.goto(`${process.env.BASE_URL}/applications/${otherId}`);
  42 |     expect([403, 404], `Agent opened another agent's application ${otherId} (DEF-API-001)`)
  43 |       .toContain(response.status());
  44 |     await ctx1.close();
  45 |   });
  46 | 
  47 |   test('TC-DASH-04 new agent sees empty state @regression', async ({ page }) => {
  48 |     await loginAs(page, users.newAgent);
  49 |     const d = new DashboardPage(page);
  50 |     await d.goto();
  51 |     const counts = await d.counts();
> 52 |     expect(Object.values(counts).every((v) => v === 0), `New agent has applications: ${JSON.stringify(counts)}`).toBe(true);
     |                                                                                                                  ^ Error: New agent has applications: {"draft":1,"submitted":0,"underReview":0,"approved":0,"requiresInfo":0}
  53 |   });
  54 | });
  55 | 
```