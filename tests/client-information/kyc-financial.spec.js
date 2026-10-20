const { test, expect } = require('../../fixtures/auth.fixture');
const { KycFinancialPage } = require('../../pages/KycFinancialPage');
const { ProductConfigurationPage } = require('../../pages/ProductConfigurationPage');
const { ReviewPage } = require('../../pages/ReviewPage');
const data = require('../../fixtures/applicationData');
const { completeSteps } = require('../../utils/testHelpers');
const { expectStepRejected } = require('../../utils/assertions');

const STEP = /kyc-financial/;

async function fillKyc(page, id, overrides) {
  await completeSteps(page, id, ['client', 'address']);
  const p = new KycFinancialPage(page);
  await p.goto(id);
  await p.fill({ ...data.kyc(), ...overrides });
  await p.save();
  return p;
}

test.describe('KYC, financial and compliance @client', () => {
  test('TC-KYC-01 valid KYC details save @smoke', async ({ agentPage: page, draftId }) => {
    await fillKyc(page, draftId, {});
    await expect(page).toHaveURL(/product/);
  });

  test('TC-KYC-02 SSN masked after entry @regression', async ({ agentPage: page, draftId }) => {
    await fillKyc(page, draftId, { idNumber: '123456789' });
    const review = new ReviewPage(page);
    await review.goto(draftId);
    const body = await page.locator('body').innerText();
    expect(body, 'Full SSN 123456789 is visible on review (DEF-CLI-002)').not.toContain('123456789');
    const p = new KycFinancialPage(page);
    await p.goto(draftId);
    expect(await p.idNumber.inputValue(), 'Full SSN is shown in the KYC field after saving (DEF-CLI-002)')
      .not.toBe('123456789');
  });

  test('TC-KYC-03 short SSN rejected @regression', async ({ agentPage: page, draftId }) => {
    const p = await fillKyc(page, draftId, { idNumber: '12345' });
    await expectStepRejected(page, p.errorAlert, STEP, 'SSN 12345 was accepted');
  });

  test('TC-KYC-04 PEP Yes requires details @regression', async ({ agentPage: page, draftId }) => {
    const p = await fillKyc(page, draftId, { pep: 'Yes', pepDetails: '' });
    await expectStepRejected(page, p.errorAlert, STEP, 'PEP Yes saved with no details');
  });

  test('TC-KYC-05 declaration required @regression', async ({ agentPage: page, draftId }) => {
    const p = await fillKyc(page, draftId, { declare: false });
    await expectStepRejected(page, p.errorAlert, STEP, 'KYC saved without the declaration');
  });

  test('TC-KYC-06 unaffordable premium is blocked @regression', async ({ agentPage: page, draftId }) => {
    await completeSteps(page, draftId, ['client', 'address', 'kyc'], { kyc: { annualIncome: '20000' } });
    const product = new ProductConfigurationPage(page);
    await product.goto(draftId);
    await product.configure({ ...data.product, sumAssured: 5000000, frequency: 'ANNUAL' });
    await product.save();

    // The rule may fire on the product step or on review. Either is fine.
    let messages = '';
    if (/\/product/.test(page.url())) {
      messages = await page.locator('body').innerText();
    } else {
      const review = new ReviewPage(page);
      await review.goto(draftId);
      await review.runValidation();
      messages = (await review.blockingErrors()).join(' | ');
    }
    expect(messages, 'Annual premium 30,500 on income 20,000 was not flagged (DEF-FIN-001)')
      .toMatch(/afford|income/i);
  });
});
