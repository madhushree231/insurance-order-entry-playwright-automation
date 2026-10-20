const { test, expect, loginAs } = require('../../fixtures/auth.fixture');
const { DashboardPage } = require('../../pages/DashboardPage');
const { users, seeded } = require('../../fixtures/users');
const { applicationIdByReference } = require('../../utils/testHelpers');

test.describe('Dashboard @dashboard', () => {
  test('TC-DASH-01 dashboard shows status tiles @smoke', async ({ agentPage: page }) => {
    const d = new DashboardPage(page);
    await d.goto();
    for (const tile of [d.draftTile, d.submittedTile, d.underReviewTile, d.approvedTile, d.requiresInfoTile]) {
      await expect(tile).toBeVisible();
    }
    await expect(d.newApplicationButton).toBeVisible();
    const counts = await d.counts();
    for (const [name, value] of Object.entries(counts)) {
      expect(Number.isInteger(value), `${name} tile is not a number`).toBe(true);
    }
  });

  test('TC-DASH-02 new draft appears on dashboard @regression', async ({ agentPage: page }) => {
    const d = new DashboardPage(page);
    await d.goto();
    const before = await d.counts();
    const id = await d.startNewApplication();
    await d.goto();
    const after = await d.counts();
    expect(after.draft).toBeGreaterThan(before.draft);
    await expect(d.statusFor(id)).toContainText(/DRAFT/i);
  });

  test('TC-DASH-03 agent cannot open another agent application @regression', async ({ browser }) => {
    const ctx2 = await browser.newContext();
    const p2 = await ctx2.newPage();
    await loginAs(p2, users.draftAgent);
    const otherId = await applicationIdByReference(p2, seeded.draftAgentDraft);
    await ctx2.close();

    const ctx1 = await browser.newContext();
    const page = await ctx1.newPage();
    await loginAs(page, users.agent);
    const response = await page.goto(`${process.env.BASE_URL}/applications/${otherId}`);
    expect([403, 404], `Agent opened another agent's application ${otherId} (DEF-API-001)`)
      .toContain(response.status());
    await ctx1.close();
  });

  test('TC-DASH-04 new agent sees empty state @regression', async ({ page }) => {
    await loginAs(page, users.newAgent);
    const d = new DashboardPage(page);
    await d.goto();
    const counts = await d.counts();
    expect(Object.values(counts).every((v) => v === 0), `New agent has applications: ${JSON.stringify(counts)}`).toBe(true);
  });
});
