class ProductCatalogPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(`${process.env.BASE_URL}/products`);
  }

  productName(name) {
    return this.page.getByText(name, { exact: false }).first();
  }
}

module.exports = { ProductCatalogPage };
