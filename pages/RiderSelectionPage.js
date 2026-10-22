const { clickAndSettle } = require('../utils/navigation');

/**
 * Rider selection step. Each rider row has a checkbox (rider-selected-N) and a
 * benefit amount field (rider-coverage-amount-N). Rows are read from the page,
 * so tests do not depend on rider ids or names.
 */
class RiderSelectionPage {
  constructor(page) {
    this.page = page;
    this.root = page.getByTestId('riders-page');
    this.form = page.getByTestId('rider-selection-form');
    this.rows = page.locator('[data-testid^="rider-row-"]');
    this.checkboxes = page.locator('[data-testid^="rider-selected-"]');
    this.summary = page.getByTestId('rider-premium-summary');
    this.saveAndContinue = page.getByTestId('rider-save-continue-button');
    this.errorAlert = page.locator('[data-testid="validation-error-alert"], [data-testid="riders-page"] .alert-danger').first();
  }

  async goto(applicationId) {
    await this.page.goto(`${process.env.BASE_URL}/applications/${applicationId}/riders`);
  }

  rowsMatching(pattern) {
    return this.rows.filter({ hasText: pattern });
  }

  checkboxIn(row) {
    return row.locator('[data-testid^="rider-selected-"]');
  }

  coverageIn(row) {
    return row.locator('[data-testid^="rider-coverage-amount-"]');
  }

  /** Ticks a rider row and fills its benefit amount. */
  async selectRow(row, coverage = 50000) {
    await this.checkboxIn(row).check();
    if (coverage !== null && (await this.coverageIn(row).count())) {
      await this.coverageIn(row).fill(String(coverage));
    }
  }

  async selectIndex(index, coverage = 50000) {
    await this.selectRow(this.rows.nth(index), coverage);
  }

  async selectAll(coverage = 50000) {
    const count = await this.rows.count();
    for (let i = 0; i < count; i += 1) await this.selectIndex(i, coverage);
  }

  async save() {
    await clickAndSettle(this.page, this.saveAndContinue);
  }

  /** "Current rider premium: $12.50" -> 12.5 */
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
