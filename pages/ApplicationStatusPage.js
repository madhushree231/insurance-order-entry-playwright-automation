class ApplicationStatusPage {
  constructor(page) {
    this.page = page;
    this.body = page.locator('main, body').first();
  }

  async goto(applicationId) {
    return this.page.goto(`${process.env.BASE_URL}/applications/${applicationId}/status`);
  }

  async text() {
    return (await this.body.innerText()).toUpperCase();
  }
}

module.exports = { ApplicationStatusPage };
