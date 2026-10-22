const { clickAndSettle } = require('../utils/navigation');
class ReviewPage {
  constructor(page) {
    this.page = page;
    this.root = page.getByTestId('review-page');

    // Error list: test id when present, otherwise the danger alert in the validation card.
    this.validationErrors = page.locator('[data-testid="review-validation-errors"], [data-testid="review-page"] .alert-danger').first();
    this.validationErrorItems = this.validationErrors.locator('li');
    this.validationSuccess = page.getByTestId('review-validation-passed');
    this.validateButton = page.getByTestId('review-validate-button');
    this.submitButton = page.getByTestId('review-submit-application-button');
    this.backButton = page.getByTestId('review-back-button');

    this.snapshot = page.getByTestId('review-application-snapshot');
    this.calculatedAge = page.getByTestId('review-client-calculated-age');
    this.totalPremium = page.getByTestId('review-total-premium');

    // Confirmation, reached after submitting.
    this.confirmationPage = page.getByTestId('submission-confirmation-page');
    this.confirmationReference = page.getByTestId('confirmation-reference-number');
    this.viewStatusLink = page.getByTestId('confirmation-view-status-link');
    this.dashboardLink = page.getByTestId('confirmation-dashboard-link');
  }

  async goto(applicationId) {
    await this.page.goto(
      `${process.env.BASE_URL}/applications/${applicationId}/review`,
    );
  }

  async runValidation() {
    await clickAndSettle(this.page, this.validateButton);
  }

  async blockingErrors() {
    if (!(await this.validationErrors.isVisible())) return [];
    const items = await this.validationErrorItems.allInnerTexts();
    if (items.length) return items.map((t) => t.trim());
    return [(await this.validationErrors.innerText()).trim()];
  }

  async hasBlockingErrors() {
    return (await this.validationErrors.isVisible()) || !(await this.validationSuccess.isVisible());
  }

  /** True when validation reported no blocking errors. */
  async validationPassed() {
    return this.validationSuccess.isVisible();
  }

  /** Submit is disabled while blocking errors remain. */
  async canSubmit() {
    return this.submitButton.isEnabled();
  }

  async submit() {
    await clickAndSettle(this.page, this.submitButton);
  }

  /** Reads a snapshot value by its label, e.g. 'Sum Assured'. */
  snapshotValue(label) {
    return this.snapshot
      .locator('dt')
      .filter({ hasText: label })
      .locator('+ dd');
  }

  async ageValue() {
    return Number.parseInt((await this.calculatedAge.innerText()).trim(), 10);
  }

  async totalPremiumValue() {
    const text = (await this.totalPremium.innerText()).trim();
    return Number.parseFloat(text.replace(/[$,]/g, ''));
  }

  async status() {
    return (await this.snapshotValue('Status').innerText()).trim();
  }

  // --- confirmation ---

  async wasSubmitted() {
    return this.confirmationPage.isVisible();
  }

  /** e.g. WL2026090462898 */
  async submissionReference() {
    return (await this.confirmationReference.innerText()).trim();
  }
}

module.exports = { ReviewPage };
