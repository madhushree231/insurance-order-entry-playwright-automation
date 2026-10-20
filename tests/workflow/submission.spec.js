const { test, expect, loginAs } = require('../../fixtures/auth.fixture');
const { BeneficiaryPage } = require('../../pages/BeneficiaryPage');
const { ClientInformationPage } = require('../../pages/ClientInformationPage');
const { DashboardPage } = require('../../pages/DashboardPage');
const { ApplicationStatusPage } = require('../../pages/ApplicationStatusPage');
const data = require('../../fixtures/applicationData');
const { users, seeded } = require('../../fixtures/users');
const { applicationIdByReference } = require('../../utils/testHelpers');

test.describe('Submission and status @workflow', () => {
  test('TC-WF-02 draft resume keeps beneficiaries @regression', async ({ agentPage: page, draftId, context }) => {
    const b = new BeneficiaryPage(page);
    await b.goto(draftId);
    await b.addBeneficiary(data.beneficiary());
    expect(await b.beneficiaryCount()).toBe(1);

    await context.clearCookies();
    await loginAs(page, users.agent);
    await b.goto(draftId);
    expect(await b.beneficiaryCount(), 'Beneficiary missing after resuming the draft (DEF-WF-001)').toBe(1);
  });

  test('TC-WF-03 submitted application is read-only @regression', async ({ page }) => {
    await loginAs(page, users.submittedAgent);
    const id = await applicationIdByReference(page, seeded.submittedApp);
    const client = new ClientInformationPage(page);
    await client.goto(id);

    if (!(await client.firstName.isVisible()) || !(await client.firstName.isEditable())) return;

    const before = await client.occupation.inputValue();
    await client.occupation.fill(`Edited ${Date.now()}`);
    await client.save();
    await client.goto(id);
    expect(await client.occupation.inputValue(), 'A submitted application was edited (DEF-WF-005)').toBe(before);
  });

  test('TC-WF-05 status page matches dashboard @regression', async ({ page }) => {
    await loginAs(page, users.submittedAgent);
    const id = await applicationIdByReference(page, seeded.submittedApp);
    const dashboard = new DashboardPage(page);
    await dashboard.gotoApplicationsList();
    const listed = (await dashboard.statusFor(id).innerText()).trim().toUpperCase();

    const status = new ApplicationStatusPage(page);
    await status.goto(id);
    expect(await status.text(), `Status page does not show ${listed}`).toContain(listed.replace('_', ' '));
  });
});
