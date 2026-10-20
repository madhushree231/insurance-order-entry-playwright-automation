const { test, expect } = require('../../fixtures/auth.fixture');
const { AddressContactPage } = require('../../pages/AddressContactPage');
const data = require('../../fixtures/applicationData');
const { completeSteps, csrfToken, formValues } = require('../../utils/testHelpers');
const { expectStepRejected } = require('../../utils/assertions');

const STEP = /address-contact/;

async function fillAddress(page, id, { residential = {}, contact = {} } = {}) {
  await completeSteps(page, id, ['client']);
  const p = new AddressContactPage(page);
  await p.goto(id);
  await p.fillResidential({ ...data.residential, ...residential });
  await p.copyResidentialToMailing();
  await p.fillContact({ ...data.contact(), ...contact });
  return p;
}

test.describe('Address and contact @client', () => {
  test('TC-ADDR-01 same-as-residential copies all fields @regression', async ({ agentPage: page, draftId }) => {
    const p = await fillAddress(page, draftId);
    const mailing = await p.mailingValues();
    expect(mailing.street).toBe(data.residential.street);
    expect(mailing.city).toBe(data.residential.city);
    expect(mailing.state).toBe(data.residential.state);
    expect(mailing.zip, 'Postal code was not copied to mailing address (DEF-ADDR-001)').toBe(data.residential.zip);
  });

  test('TC-ADDR-02 ZIP with letters rejected @regression', async ({ agentPage: page, draftId }) => {
    const p = await fillAddress(page, draftId, { residential: { zip: 'ABCDE' } });
    await p.save();
    await expectStepRejected(page, p.errorAlert, STEP, 'ZIP ABCDE was accepted (DEF-ADDR-004)');
  });

  test('TC-ADDR-03 state longer than 2 characters rejected @regression', async ({ agentPage: page, draftId }) => {
    // State is a dropdown in the UI, so the bad value is posted directly.
    const p = await fillAddress(page, draftId);
    const values = await formValues(page, p.form);
    const stateKey = await p.residentialState.getAttribute('name');
    values[stateKey] = 'Californiaaaaa';
    values._token = await csrfToken(page);
    const response = await page.request.post(`${process.env.BASE_URL}/applications/${draftId}/address-contact`, { form: values });
    expect(response.url(), 'State Californiaaaaa was accepted (DEF-ADDR-003)').toMatch(STEP);
  });

  test('TC-ADDR-04 invalid email rejected @regression', async ({ agentPage: page, draftId }) => {
    const p = await fillAddress(page, draftId, { contact: { email: 'agent@' } });
    await p.save();
    await expectStepRejected(page, p.errorAlert, STEP, 'Email agent@ was accepted (DEF-CONTACT-001)');
  });

  test('TC-ADDR-05 short phone number rejected @regression', async ({ agentPage: page, draftId }) => {
    const p = await fillAddress(page, draftId, { contact: { mobile: '12345' } });
    await p.save();
    await expectStepRejected(page, p.errorAlert, STEP, 'Phone 12345 was accepted (DEF-CONTACT-002)');
  });
});
