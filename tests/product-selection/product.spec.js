const { test, expect } = require('../../fixtures/auth.fixture');
const { ProductConfigurationPage } = require('../../pages/ProductConfigurationPage');
const { ProductCatalogPage } = require('../../pages/ProductCatalogPage');
const { ReviewPage } = require('../../pages/ReviewPage');
const data = require('../../fixtures/applicationData');
const { completeSteps } = require('../../utils/testHelpers');

const STEP = /\/product/;

async function openProduct(page, id) {
  await completeSteps(page, id, ['client', 'address', 'kyc']);
  const p = new ProductConfigurationPage(page);
  await p.goto(id);
  return p;
}

test.describe('Product configuration @product', () => {
  test('TC-PROD-01 catalog lists Whole Life products @smoke', async ({ agentPage: page }) => {
    const catalog = new ProductCatalogPage(page);
    await catalog.goto();
    for (const code of ProductCatalogPage.CODES) {
      await expect(catalog.card(code), `Product ${code} missing from the catalog`).toBeVisible();
    }
  });

  test('TC-PROD-02 sum assured below minimum rejected @regression', async ({ agentPage: page, draftId }) => {
    const p = await openProduct(page, draftId);
    await p.configure({ ...data.product, sumAssured: 499999 });
    await p.save();
    expect(page.url(), 'Sum assured 499,999 was accepted for Elite Legacy (DEF-PROD-002)').toMatch(STEP);
  });

  test('TC-PROD-03 sum assured above maximum rejected @regression', async ({ agentPage: page, draftId }) => {
    const p = await openProduct(page, draftId);
    await p.configure({ ...data.product, sumAssured: 5000001 });
    await p.save();
    expect(page.url(), 'Sum assured 5,000,001 was accepted for Elite Legacy (DEF-PROD-003)').toMatch(STEP);
  });

  test('TC-PROD-04 premium matches published rate @smoke', async ({ agentPage: page, draftId }) => {
    const p = await openProduct(page, draftId);
    await p.configure(data.product);
    const expected = ProductConfigurationPage.expectedPremium(data.ELITE, 1000000, 'MONTHLY');
    await expect.poll(() => p.premiumValue(), { message: 'Premium does not match 6.10 per 1,000 monthly' })
      .toBeCloseTo(expected, 2);
  });

  test('TC-PROD-05 premium recalculates after frequency change @regression', async ({ agentPage: page, draftId }) => {
    const p = await openProduct(page, draftId);
    await p.configure(data.product);
    await p.save();
    await expect(page).toHaveURL(/riders/);

    await p.goto(draftId);
    await p.configure({ frequency: 'ANNUAL' });
    await p.save();
    await expect(page).toHaveURL(/riders/);

    const review = new ReviewPage(page);
    await review.goto(draftId);
    expect(await review.totalPremiumValue(),
      'Premium did not change to the annual figure after switching frequency (DEF-PROD-001, DEF-PROD-004)')
      .toBeCloseTo(6100, 2);
  });

  test('TC-PROD-06 review premium matches product step @regression', async ({ agentPage: page, draftId }) => {
    const p = await openProduct(page, draftId);
    await p.configure(data.product);
    const shown = await p.premiumValue();
    await p.save();
    const review = new ReviewPage(page);
    await review.goto(draftId);
    expect(await review.totalPremiumValue(), 'Review premium differs from the product step').toBeCloseTo(shown, 2);
  });
});
