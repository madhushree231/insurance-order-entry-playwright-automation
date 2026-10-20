const { request: pwRequest } = require('@playwright/test');
const { test, expect, loginAs } = require('../../fixtures/auth.fixture');
const { users, seeded } = require('../../fixtures/users');
const { getToken, loginRequest } = require('../../utils/apiClient');
const { applicationIdByReference, formValues, csrfToken } = require('../../utils/testHelpers');
const { ClientInformationPage } = require('../../pages/ClientInformationPage');
const { DashboardPage } = require('../../pages/DashboardPage');
const data = require('../../fixtures/applicationData');
const { daysFromToday } = require('../../utils/dataGenerator');

const BASE = () => process.env.BASE_URL;

test.describe('HTTP layer @api', () => {
  test('TC-API-01 health check responds @smoke', async ({ request }) => {
    const res = await request.get(`${BASE()}/up`);
    expect(res.status()).toBe(200);
  });

  test('TC-API-02 protected routes redirect without session @smoke', async ({ request }) => {
    for (const path of ['/dashboard', '/applications', '/profile']) {
      const res = await request.get(`${BASE()}${path}`, { maxRedirects: 0 });
      expect(res.status(), `${path} did not redirect`).toBe(302);
      expect(res.headers().location, `${path} did not send the user to login`).toMatch(/\/login/);
    }
  });

  test('TC-API-03 invalid login creates no session @regression', async () => {
    const ctx = await pwRequest.newContext();
    const res = await loginRequest(ctx, users.agent.email, 'WrongPass@1');
    expect(res.status()).toBe(302);
    expect(res.headers().location).toMatch(/\/login/);
    const dash = await ctx.get(`${BASE()}/dashboard`, { maxRedirects: 0 });
    expect(dash.status(), 'A failed login still opened the dashboard').toBe(302);
    await ctx.dispose();
  });

  test('TC-API-04 post without CSRF token rejected @regression', async ({ agentPage: page, draftId }) => {
    const res = await page.request.post(`${BASE()}/applications/${draftId}/client`, {
      form: { first_name: 'NoToken' },
      maxRedirects: 0,
    });
    expect(res.status(), 'A POST with no CSRF token was not rejected').toBe(419);
  });

  test('TC-API-05 server rejects future DOB sent directly @regression', async ({ agentPage: page, draftId }) => {
    const client = new ClientInformationPage(page);
    await client.goto(draftId);
    await client.fill(data.client());
    const values = await formValues(page, client.form);
    const dobKey = await client.dateOfBirth.getAttribute('name');
    const future = daysFromToday(365);
    values[dobKey] = future;
    values._token = await csrfToken(page);
    await page.request.post(`${BASE()}/applications/${draftId}/client`, { form: values });

    await client.goto(draftId);
    expect(await client.dateOfBirth.inputValue(), 'Server saved a future DOB posted directly (DEF-API-002, DEF-CLI-001)')
      .not.toBe(future);
  });

  test('TC-API-06 validate endpoint returns errors for empty draft @regression', async ({ agentPage: page, draftId }) => {
    const token = await getToken(page.request, `/applications/${draftId}/review`);
    const res = await page.request.post(`${BASE()}/applications/${draftId}/validate`, { form: { _token: token } });
    expect(res.ok()).toBe(true);
    const html = await res.text();
    expect(html, 'Validate on an empty draft returned no errors').toContain('review-validation-errors');
  });

  test('TC-API-07 submit endpoint refuses incomplete draft @regression', async ({ agentPage: page, draftId }) => {
    const token = await getToken(page.request, `/applications/${draftId}/review`);
    await page.request.post(`${BASE()}/applications/${draftId}/submit`, { form: { _token: token } });
    const dashboard = new DashboardPage(page);
    await dashboard.gotoApplicationsList();
    await expect(dashboard.statusFor(draftId), 'An empty draft was submitted directly (DEF-WF-003)').toContainText(/DRAFT/i);
  });

  test('TC-API-08 another agent application not returned @regression', async ({ browser }) => {
    const ctx2 = await browser.newContext();
    const p2 = await ctx2.newPage();
    await loginAs(p2, users.draftAgent);
    const otherId = await applicationIdByReference(p2, seeded.draftAgentDraft);
    await ctx2.close();

    const ctx = await pwRequest.newContext();
    await loginRequest(ctx, users.agent.email, users.agent.password);
    const res = await ctx.get(`${BASE()}/applications/${otherId}/review`, { maxRedirects: 0 });
    expect([403, 404], `Got ${res.status()} for another agent's application (DEF-API-001)`).toContain(res.status());
    await ctx.dispose();
  });
});
