const { test, expect, loginAs } = require('../../fixtures/auth.fixture');
const { DashboardPage } = require('../../pages/DashboardPage');
const { ProductConfigurationPage } = require('../../pages/ProductConfigurationPage');
const { RiderSelectionPage } = require('../../pages/RiderSelectionPage');
const { ReviewPage } = require('../../pages/ReviewPage');
const data = require('../../fixtures/applicationData');
const { users } = require('../../fixtures/users');
const { completeSteps } = require('../../utils/testHelpers');

test.describe.serial('End to end submission @e2e @workflow', () => {
  let submittedId;
  let submittedBefore;

  test('TC-WF-01 full application submits @smoke', async ({ agentPage: page }) => {
    test.setTimeout(180000);
    const dashboard = new DashboardPage(page);
    await dashboard.goto();
    submittedBefore = (await dashboard.counts()).submitted;
    const id = await dashboard.startNewApplication();

    await completeSteps(page, id, ['client', 'address', 'kyc']);

    const product = new ProductConfigurationPage(page);
    await product.goto(id);
    await product.configure(data.product);
    const expected = ProductConfigurationPage.expectedPremium(data.ELITE, data.product.sumAssured, 'MONTHLY');
    expect(await product.premiumValue(), 'Premium does not match the published rate').toBeCloseTo(expected, 2);
    await product.save();

    const riders = new RiderSelectionPage(page);
    await riders.goto(id);
    await riders.selectIndex(0);
    await riders.save();

    await completeSteps(page, id, ['beneficiary', 'document']);

    const review = new ReviewPage(page);
    await review.goto(id);
    await review.runValidation();
    const errors = await review.blockingErrors();
    expect(errors, `Complete application still has errors: ${errors.join(', ')}`).toHaveLength(0);
    expect(await review.canSubmit()).toBe(true);

    await review.submit();
    expect(await review.wasSubmitted(), 'Confirmation page not reached').toBe(true);
    expect(await review.submissionReference(), 'No WL reference on confirmation (DEF-WF-004)').toMatch(/^WL\d+$/);
    submittedId = id;
  });

  test('TC-WF-04 dashboard shows Submitted after submit @regression', async ({ page }) => {
    await loginAs(page, users.agent);
    const dashboard = new DashboardPage(page);
    await dashboard.goto();
    await expect(dashboard.statusFor(submittedId), 'Dashboard status wrong after submit (DEF-STATUS-001)')
      .toContainText(/SUBMITTED/i);
    await dashboard.goto();
    expect((await dashboard.counts()).submitted).toBe(submittedBefore + 1);
  });
});
