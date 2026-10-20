const { test, expect } = require('../../fixtures/auth.fixture');
const { ClientInformationPage } = require('../../pages/ClientInformationPage');
const { ReviewPage } = require('../../pages/ReviewPage');
const data = require('../../fixtures/applicationData');
const { yearsAgo, daysFromToday } = require('../../utils/dataGenerator');
const { expectStepRejected } = require('../../utils/assertions');

const STEP = /\/client/;

async function saveClient(page, id, overrides) {
  const p = new ClientInformationPage(page);
  await p.goto(id);
  await p.fill({ ...data.client(), ...overrides });
  await p.save();
  return p;
}

test.describe('Client information @client', () => {
  test('TC-CLI-01 valid client details save @smoke', async ({ agentPage: page, draftId }) => {
    await saveClient(page, draftId, {});
    await expect(page).toHaveURL(/address-contact/);
  });

  test('TC-CLI-02 mandatory client fields enforced @regression', async ({ agentPage: page, draftId }) => {
    const p = new ClientInformationPage(page);
    await p.goto(draftId);
    await p.fill({ ...data.client(), firstName: '', lastName: '', dob: '' });
    await p.save();
    await expectStepRejected(page, p.validationAlert, STEP, 'Client step saved with empty mandatory fields');
  });

  test('TC-CLI-03 client under 18 rejected @regression', async ({ agentPage: page, draftId }) => {
    const p = await saveClient(page, draftId, { dob: yearsAgo(17) });
    await expectStepRejected(page, p.validationAlert, STEP, 'A 17 year old client was accepted');
  });

  test('TC-CLI-04 client exactly 18 accepted @regression', async ({ agentPage: page, draftId }) => {
    await saveClient(page, draftId, { dob: yearsAgo(18) });
    await expect(page, 'A client who turned 18 today was refused').toHaveURL(/address-contact/);
  });

  test('TC-CLI-05 client over 65 rejected @regression', async ({ agentPage: page, draftId }) => {
    const p = await saveClient(page, draftId, { dob: yearsAgo(66) });
    await expectStepRejected(page, p.validationAlert, STEP, 'A 66 year old client was accepted');
  });

  test('TC-CLI-06 future DOB rejected @regression', async ({ agentPage: page, draftId }) => {
    const p = await saveClient(page, draftId, { dob: daysFromToday(1) });
    await expectStepRejected(page, p.validationAlert, STEP, 'A future date of birth was accepted (DEF-CLI-001)');
  });

  test('TC-CLI-07 age correct when birthday is today @regression', async ({ agentPage: page, draftId }) => {
    await saveClient(page, draftId, { dob: yearsAgo(30) });
    const review = new ReviewPage(page);
    await review.goto(draftId);
    expect(await review.ageValue(), 'Age is wrong for a client whose birthday is today (DEF-CLI-003)').toBe(30);
  });

  test('TC-CLI-08 name with digits or symbols rejected @regression', async ({ agentPage: page, draftId }) => {
    const p = await saveClient(page, draftId, { firstName: 'J0hn$' });
    await expectStepRejected(page, p.validationAlert, STEP, 'First name J0hn$ was accepted (DEF-CLI-004)');
  });
});
