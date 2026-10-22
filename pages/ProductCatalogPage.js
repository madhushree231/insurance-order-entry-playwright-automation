class ProductCatalogPage {
  constructor(page) {
    this.page = page;
    this.root = page.getByTestId('product-catalog-page');
    this.cards = page.locator('[data-testid^="product-card-"]');
  }

  static CODES = ['WL_SECURE_BASIC', 'WL_WEALTH_BUILDER', 'WL_ELITE_LEGACY', 'WL_FLEXI_PAY'];

  async goto() {
    await this.page.goto(`${process.env.BASE_URL}/products`);
  }

  card(code) {
    return this.page.getByTestId(`product-card-${code}`);
  }
}

module.exports = { ProductCatalogPage };
