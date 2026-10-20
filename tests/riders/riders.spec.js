const { test, expect } = require('../../fixtures/auth.fixture');
const { RiderSelectionPage } = require('../../pages/RiderSelectionPage');
const { completeSteps } = require('../../utils/testHelpers');

async function openRiders(page, id, product) {
  await completeSteps(page, id, ['client', 'address', 'kyc', 'product'], { product });
  const r = new RiderSelectionPage(page);
  await r.goto(id);
  return r;
}

test.describe('Riders @rider', () => {
  test('TC-RID-01 eligible rider can be added @smoke', async ({ agentPage: page, draftId }) => {
    const r = await openRiders(page, draftId);
    await r.checkRow(0);
    await r.save();
    await r.goto(draftId);
    expect(await r.checkedCount(), 'Selected rider was not saved').toBe(1);
  });

  test('TC-RID-02 rider premium added to total @regression', async ({ agentPage: page, draftId }) => {
    const r = await openRiders(page, draftId);
    await r.checkRow(0);
    await r.checkRow(1);
    await r.save();
    await r.goto(draftId);
    expect(await r.summaryPremium(), 'Rider total does not equal the sum of selected riders')
      .toBeCloseTo(await r.selectedPremiumSum(), 2);
  });

  test('TC-RID-03 rider coverage above base face value rejected @regression', async ({ agentPage: page, draftId }) => {
    const r = await openRiders(page, draftId, { sumAssured: 500000 });
    const coverage = r.rows.first().locator('input[type="number"], input[name*="coverage" i]');
    test.skip((await coverage.count()) === 0, 'No rider coverage field on the page');
    await r.checkRow(0);
    await coverage.first().fill('600000');
    await r.save();
    await expect(r.errorAlert, 'Rider coverage 600,000 on a 500,000 policy was accepted (DEF-RIDER-002)').toBeVisible();
  });

  test('TC-RID-04 both waiver riders cannot be selected @regression', async ({ agentPage: page, draftId }) => {
    const r = await openRiders(page, draftId);
    const waivers = r.rowsMatching(/waiver/i);
    test.skip((await waivers.count()) < 2, 'Fewer than two waiver riders listed');
    await r.checkboxIn(waivers.nth(0)).check();
    const second = r.checkboxIn(waivers.nth(1));
    if (await second.isDisabled()) return;
    await second.check();
    await r.save();
    await expect(r.errorAlert, 'Both waiver riders were saved together (DEF-RIDER-001)').toBeVisible();
  });

  test('TC-RID-05 maximum rider count enforced @regression', async ({ agentPage: page, draftId }) => {
    const r = await openRiders(page, draftId);
    await r.checkAll();
    await r.save();
    await expect(r.errorAlert, 'Every rider was saved with no maximum count check (DEF-RIDER-003)').toBeVisible();
  });
});
