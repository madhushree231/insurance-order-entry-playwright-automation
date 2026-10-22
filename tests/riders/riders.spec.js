const { test, expect } = require('../../fixtures/auth.fixture');
const { RiderSelectionPage } = require('../../pages/RiderSelectionPage');
const { ReviewPage } = require('../../pages/ReviewPage');
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
    await r.selectIndex(0);
    await r.save();
    await r.goto(draftId);
    expect(await r.checkedCount(), 'Selected rider was not saved').toBe(1);
  });

  test('TC-RID-02 rider premium added to total @regression', async ({ agentPage: page, draftId }) => {
    const r = await openRiders(page, draftId);
    await r.selectIndex(0);
    await r.selectIndex(1);
    await r.save();
    await r.goto(draftId);
    const riderPremium = await r.summaryPremium();
    expect(riderPremium, 'Rider premium is zero after selecting two riders').toBeGreaterThan(0);

    const review = new ReviewPage(page);
    await review.goto(draftId);
    const base = 508.33; // Elite Legacy 1,000,000 monthly at 6.10 per 1,000
    expect(await review.totalPremiumValue(), 'Total premium does not include the rider premium')
      .toBeCloseTo(base + riderPremium, 2);
  });

  test('TC-RID-03 rider coverage above base face value rejected @regression', async ({ agentPage: page, draftId }) => {
    const r = await openRiders(page, draftId, { sumAssured: 500000 });
    await r.selectIndex(0, 600000);
    await r.save();
    await expect(page, 'Rider coverage 600,000 on a 500,000 policy was accepted (DEF-RIDER-002)').toHaveURL(/riders/);
  });

  test('TC-RID-04 both waiver riders cannot be selected @regression', async ({ agentPage: page, draftId }) => {
    const r = await openRiders(page, draftId);
    const waivers = r.rowsMatching(/waiver/i);
    test.skip((await waivers.count()) < 2, 'Fewer than two waiver riders listed');
    await r.selectRow(waivers.nth(0));
    if (await r.checkboxIn(waivers.nth(1)).isDisabled()) return;
    await r.selectRow(waivers.nth(1));
    await r.save();
    await expect(page, 'Both waiver riders were saved together (DEF-RIDER-001)').toHaveURL(/riders/);
  });

  test('TC-RID-05 maximum rider count enforced @regression', async ({ agentPage: page, draftId }) => {
    const r = await openRiders(page, draftId);
    await r.selectAll();
    await r.save();
    await expect(page, 'All nine riders were saved with no maximum count check (DEF-RIDER-003)').toHaveURL(/riders/);
  });
});
