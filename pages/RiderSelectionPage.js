const { clickAndSettle } = require('../utils/navigation');
/**
 * Rider selection step. Riders are read row by row from the table, so the
 * tests do not depend on hard-coded rider codes.
 */
class RiderSelectionPage {
  constructor(page) {
    this.page = page;
    this.root = page.getByTestId('riders-page');
    this.table = page.getByTestId('riders-table');
    this.rows = this.table.locator('tbody tr');
    this.checkboxes = page.locator('[data-testid^="rider-checkbox-"]');
    this.summary = page.getByTestId('riders-total-premium-summary');
    this.saveAndContinue = page.getByTestId('rider-save-continue-button');
    this.errorAlert = page.getByTestId('validation-error-alert');
  }

  async goto(applicationId) {
    await this.page.goto(`${process.env.BASE_URL}/applications/${applicationId}/riders`);
  }

  /** Rows whose text matches the pattern, e.g. /waiver/i */
  rowsMatching(pattern) {
    return this.rows.filter({ hasText: pattern });
  }

  checkboxIn(row) {
    return row.locator('[data-testid^="rider-checkbox-"]');
  }

  async checkRow(index) {
    await this.checkboxIn(this.rows.nth(index)).check();
  }

  async checkAll() {
    const count = await this.checkboxes.count();
    for (let i = 0; i < count; i += 1) {
      const box = this.checkboxes.nth(i);
      if (await box.isEnabled()) await box.check();
    }
  }

  async save() {
    await clickAndSettle(this.page, this.saveAndContinue);
  }

  /** Premium shown in the fourth column of a row. */
  async rowPremium(row) {
    const text = await row.locator('td').nth(3).innerText();
    return Number.parseFloat(text.replace(/[^0-9.]/g, '')) || 0;
  }

  async selectedPremiumSum() {
    let sum = 0;
    const count = await this.rows.count();
    for (let i = 0; i < count; i += 1) {
      const row = this.rows.nth(i);
      const box = this.checkboxIn(row);
      if ((await box.count()) && (await box.isChecked())) sum += await this.rowPremium(row);
    }
    return Math.round(sum * 100) / 100;
  }

  async summaryPremium() {
    const text = await this.summary.innerText();
    const match = text.match(/\$?([\d,]+\.\d{2})/);
    return match ? Number.parseFloat(match[1].replace(/,/g, '')) : 0;
  }

  async checkedCount() {
    let n = 0;
    const count = await this.checkboxes.count();
    for (let i = 0; i < count; i += 1) if (await this.checkboxes.nth(i).isChecked()) n += 1;
    return n;
  }
}

module.exports = { RiderSelectionPage };
