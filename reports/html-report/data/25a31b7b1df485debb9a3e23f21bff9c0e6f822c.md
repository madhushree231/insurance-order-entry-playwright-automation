# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\http.spec.js >> HTTP layer @api >> TC-API-01 health check responds @smoke
- Location: tests\api\http.spec.js:14:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

# Test source

```ts
  1  | const { request: pwRequest } = require('@playwright/test');
  2  | const { test, expect, loginAs } = require('../../fixtures/auth.fixture');
  3  | const { users, seeded } = require('../../fixtures/users');
  4  | const { getToken, loginRequest } = require('../../utils/apiClient');
  5  | const { applicationIdByReference, formValues, csrfToken } = require('../../utils/testHelpers');
  6  | const { ClientInformationPage } = require('../../pages/ClientInformationPage');
  7  | const { DashboardPage } = require('../../pages/DashboardPage');
  8  | const data = require('../../fixtures/applicationData');
  9  | const { daysFromToday } = require('../../utils/dataGenerator');
  10 | 
  11 | const BASE = () => process.env.BASE_URL;
  12 | 
  13 | test.describe('HTTP layer @api', () => {
  14 |   test('TC-API-01 health check responds @smoke', async ({ request }) => {
  15 |     const res = await request.get(`${BASE()}/up`);
> 16 |     expect(res.status()).toBe(200);
     |                          ^ Error: expect(received).toBe(expected) // Object.is equality
  17 |   });
  18 | 
  19 |   test('TC-API-02 protected routes redirect without session @smoke', async ({ request }) => {
  20 |     for (const path of ['/dashboard', '/applications', '/profile']) {
  21 |       const res = await request.get(`${BASE()}${path}`, { maxRedirects: 0 });
  22 |       expect(res.status(), `${path} did not redirect`).toBe(302);
  23 |       expect(res.headers().location, `${path} did not send the user to login`).toMatch(/\/login/);
  24 |     }
  25 |   });
  26 | 
  27 |   test('TC-API-03 invalid login creates no session @regression', async () => {
  28 |     const ctx = await pwRequest.newContext();
  29 |     const res = await loginRequest(ctx, users.agent.email, 'WrongPass@1');
  30 |     expect(res.status()).toBe(302);
  31 |     expect(res.headers().location).toMatch(/\/login/);
  32 |     const dash = await ctx.get(`${BASE()}/dashboard`, { maxRedirects: 0 });
  33 |     expect(dash.status(), 'A failed login still opened the dashboard').toBe(302);
  34 |     await ctx.dispose();
  35 |   });
  36 | 
  37 |   test('TC-API-04 post without CSRF token rejected @regression', async ({ agentPage: page, draftId }) => {
  38 |     const res = await page.request.post(`${BASE()}/applications/${draftId}/client`, {
  39 |       form: { first_name: 'NoToken' },
  40 |       maxRedirects: 0,
  41 |     });
  42 |     expect(res.status(), 'A POST with no CSRF token was not rejected').toBe(419);
  43 |   });
  44 | 
  45 |   test('TC-API-05 server rejects future DOB sent directly @regression', async ({ agentPage: page, draftId }) => {
  46 |     const client = new ClientInformationPage(page);
  47 |     await client.goto(draftId);
  48 |     await client.fill(data.client());
  49 |     const values = await formValues(page, client.form);
  50 |     const dobKey = await client.dateOfBirth.getAttribute('name');
  51 |     const future = daysFromToday(365);
  52 |     values[dobKey] = future;
  53 |     values._token = await csrfToken(page);
  54 |     await page.request.post(`${BASE()}/applications/${draftId}/client`, { form: values });
  55 | 
  56 |     await client.goto(draftId);
  57 |     expect(await client.dateOfBirth.inputValue(), 'Server saved a future DOB posted directly (DEF-API-002, DEF-CLI-001)')
  58 |       .not.toBe(future);
  59 |   });
  60 | 
  61 |   test('TC-API-06 validate endpoint returns errors for empty draft @regression', async ({ agentPage: page, draftId }) => {
  62 |     const token = await getToken(page.request, `/applications/${draftId}/review`);
  63 |     const res = await page.request.post(`${BASE()}/applications/${draftId}/validate`, { form: { _token: token } });
  64 |     expect(res.ok()).toBe(true);
  65 |     const html = await res.text();
  66 |     expect(html, 'Validate on an empty draft reported no blocking errors').not.toContain('review-validation-passed');
  67 |   });
  68 | 
  69 |   test('TC-API-07 submit endpoint refuses incomplete draft @regression', async ({ agentPage: page, draftId }) => {
  70 |     const token = await getToken(page.request, `/applications/${draftId}/review`);
  71 |     await page.request.post(`${BASE()}/applications/${draftId}/submit`, { form: { _token: token } });
  72 |     const dashboard = new DashboardPage(page);
  73 |     await dashboard.goto();
  74 |     await expect(dashboard.statusFor(draftId), 'An empty draft was submitted directly (DEF-WF-003)').toContainText(/DRAFT/i);
  75 |   });
  76 | 
  77 |   test('TC-API-08 another agent application not returned @regression', async ({ browser }) => {
  78 |     const ctx2 = await browser.newContext();
  79 |     const p2 = await ctx2.newPage();
  80 |     await loginAs(p2, users.draftAgent);
  81 |     const otherId = await applicationIdByReference(p2, seeded.draftAgentDraft);
  82 |     await ctx2.close();
  83 | 
  84 |     const ctx = await pwRequest.newContext();
  85 |     await loginRequest(ctx, users.agent.email, users.agent.password);
  86 |     const res = await ctx.get(`${BASE()}/applications/${otherId}/review`, { maxRedirects: 0 });
  87 |     expect([403, 404], `Got ${res.status()} for another agent's application (DEF-API-001)`).toContain(res.status());
  88 |     await ctx.dispose();
  89 |   });
  90 | });
  91 | 
```