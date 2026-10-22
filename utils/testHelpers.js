const { expect } = require('@playwright/test');
const { ClientInformationPage } = require('../pages/ClientInformationPage');
const { AddressContactPage } = require('../pages/AddressContactPage');
const { KycFinancialPage } = require('../pages/KycFinancialPage');
const { ProductConfigurationPage } = require('../pages/ProductConfigurationPage');
const { BeneficiaryPage } = require('../pages/BeneficiaryPage');
const { DocumentUploadPage } = require('../pages/DocumentUploadPage');
const { DashboardPage } = require('../pages/DashboardPage');
const data = require('../fixtures/applicationData');

/**
 * Completes wizard steps on a draft so a test can start where it needs to.
 * steps: any of client, address, kyc, product, beneficiary, document
 */
async function completeSteps(page, id, steps, overrides = {}) {
  if (steps.includes('client')) {
    const p = new ClientInformationPage(page);
    await p.goto(id);
    await p.fill({ ...data.client(), ...overrides.client });
    await p.save();
    await expect(page).toHaveURL(/address-contact/);
  }
  if (steps.includes('address')) {
    const p = new AddressContactPage(page);
    await p.goto(id);
    await p.fillResidential(data.residential);
    await p.copyResidentialToMailing();
    await p.fillContact(data.contact());
    await p.save();
    await expect(page).toHaveURL(/kyc-financial/);
  }
  if (steps.includes('kyc')) {
    const p = new KycFinancialPage(page);
    await p.goto(id);
    await p.fill({ ...data.kyc(), ...overrides.kyc });
    await p.save();
    await expect(page).toHaveURL(/product/);
  }
  if (steps.includes('product')) {
    const p = new ProductConfigurationPage(page);
    await p.goto(id);
    await p.configure({ ...data.product, ...overrides.product });
    await p.save();
    await expect(page).toHaveURL(/riders/);
  }
  if (steps.includes('beneficiary')) {
    const p = new BeneficiaryPage(page);
    await p.goto(id);
    await p.addBeneficiary(data.beneficiary(overrides.beneficiary));
  }
  if (steps.includes('document')) {
    const p = new DocumentUploadPage(page);
    await p.goto(id);
    await p.uploadSimulated({ type: 'KYC_ID', fileName: `kyc-${data.unique()}.pdf` });
  }
}

/** Finds the id of an application by its reference on the applications list. */
async function applicationIdByReference(page, reference) {
  const dashboard = new DashboardPage(page);
  await dashboard.gotoApplicationsList();
  let link = page.locator('tr', { hasText: reference }).locator('a').first();
  if ((await link.count()) === 0) {
    await dashboard.goto();
    link = page.locator('tr', { hasText: reference }).locator('a').first();
  }
  if ((await link.count()) === 0) throw new Error(`Application ${reference} is not listed for this agent`);
  const href = await link.getAttribute('href');
  const match = href && href.match(/applications\/(\d+)/);
  if (!match) throw new Error(`Could not find application ${reference} on the applications list`);
  return match[1];
}

/** CSRF token from the current page. */
async function csrfToken(page) {
  const meta = page.locator('meta[name="csrf-token"]');
  if (await meta.count()) return meta.getAttribute('content');
  return page.locator('input[name="_token"]').first().inputValue();
}

/** All named fields of a form as a plain object, so a test can post it with one value changed. */
async function formValues(page, formLocator) {
  return formLocator.evaluate((form) => {
    const out = {};
    new FormData(form).forEach((value, key) => {
      if (typeof value === 'string') out[key] = value;
    });
    return out;
  });
}

module.exports = { completeSteps, applicationIdByReference, csrfToken, formValues };
