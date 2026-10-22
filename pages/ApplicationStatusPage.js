class ApplicationStatusPage {
  constructor(page) {
    this.page = page;
    this.root = page.getByTestId('status-page');
    this.currentStatus = page.getByTestId('status-current-value');
    this.reference = page.getByTestId('status-reference-number');
    this.historyTable = page.getByTestId('status-history-table');
  }

  async goto(applicationId) {
    return this.page.goto(`${process.env.BASE_URL}/applications/${applicationId}/status`);
  }

  async status() {
    return (await this.currentStatus.innerText()).trim().toUpperCase();
  }
}

module.exports = { ApplicationStatusPage };
