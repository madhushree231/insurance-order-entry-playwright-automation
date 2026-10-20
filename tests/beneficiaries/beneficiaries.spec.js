const { test, expect } = require('../../fixtures/auth.fixture');
const { BeneficiaryPage } = require('../../pages/BeneficiaryPage');
const data = require('../../fixtures/applicationData');
const { yearsAgo } = require('../../utils/dataGenerator');

async function open(page, id) {
  const b = new BeneficiaryPage(page);
  await b.goto(id);
  return b;
}

test.describe('Beneficiaries @beneficiary', () => {
  test('TC-BEN-01 valid primary beneficiary added @smoke', async ({ agentPage: page, draftId }) => {
    const b = await open(page, draftId);
    await b.addBeneficiary(data.beneficiary());
    expect(await b.beneficiaryCount()).toBe(1);
    expect((await b.allocationTotals()).primary).toBeCloseTo(100, 2);
  });

  test('TC-BEN-02 primary below 100 percent blocks progression @regression', async ({ agentPage: page, draftId }) => {
    const b = await open(page, draftId);
    await b.addBeneficiary(data.beneficiary({ allocation: 60 }));
    await b.clickContinue();
    await expect(page, 'Wizard moved on with only 60% allocated (DEF-BEN-001)').toHaveURL(/beneficiaries/);
  });

  test('TC-BEN-03 primary above 100 percent blocked @regression', async ({ agentPage: page, draftId }) => {
    const b = await open(page, draftId);
    await b.addBeneficiary(data.beneficiary({ allocation: 70 }));
    await b.addBeneficiary(data.beneficiary({ allocation: 50, relationship: 'CHILD', firstName: 'Second' }));
    const total = (await b.allocationTotals()).primary;
    const rejected = await b.wasRejected();
    expect(rejected || total <= 100, `Primary allocation reached ${total}% with no error (DEF-BEN-001)`).toBe(true);
  });

  test('TC-BEN-04 minor beneficiary needs guardian @regression', async ({ agentPage: page, draftId }) => {
    const b = await open(page, draftId);
    await b.addBeneficiary(data.beneficiary({ relationship: 'CHILD', dob: yearsAgo(10) }));
    expect(await b.wasRejected(), 'Minor beneficiary saved with no guardian (DEF-BEN-002)').toBe(true);
  });

  test('TC-BEN-05 beneficiary type shows matching fields @regression', async ({ agentPage: page, draftId }) => {
    const b = await open(page, draftId);
    for (const type of BeneficiaryPage.TYPES) {
      await b.type.selectOption(type);
      for (const other of BeneficiaryPage.TYPES) {
        expect(await b.isSectionVisible(other), `${other} panel visibility wrong when ${type} selected`)
          .toBe(other === type);
      }
    }
  });

  test('TC-BEN-06 trust needs trust and trustee names @regression', async ({ agentPage: page, draftId }) => {
    const b = await open(page, draftId);
    await b.addBeneficiary({ level: 'PRIMARY', type: 'TRUST', relationship: 'TRUST', allocation: 100, designation: 'REVOCABLE' });
    expect(await b.wasRejected(), 'Trust saved with no trust or trustee name (DEF-BEN-003)').toBe(true);
  });

  test('TC-BEN-07 duplicate beneficiary blocked @regression', async ({ agentPage: page, draftId }) => {
    const b = await open(page, draftId);
    const same = data.beneficiary({ allocation: 50, firstName: 'Duplicate' });
    await b.addBeneficiary(same);
    await b.addBeneficiary(same);
    expect(await b.beneficiaryCount(), 'The same beneficiary was saved twice').toBe(1);
  });
});
