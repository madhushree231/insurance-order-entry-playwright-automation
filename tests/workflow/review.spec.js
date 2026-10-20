const { test, expect } = require('../../fixtures/auth.fixture');
const { ReviewPage } = require('../../pages/ReviewPage');
const { completeSteps } = require('../../utils/testHelpers');

test.describe('Review and validation @workflow', () => {
  test('TC-DOC-03 missing KYC blocks submission @regression', async ({ agentPage: page, draftId }) => {
    test.setTimeout(120000);
    await completeSteps(page, draftId, ['client', 'address', 'kyc', 'product', 'beneficiary']);
    const review = new ReviewPage(page);
    await review.goto(draftId);
    await review.runValidation();
    const errors = (await review.blockingErrors()).join(' | ');
    expect(errors, 'Validation passed with no KYC document uploaded (DEF-DOC-001)').toMatch(/document|kyc/i);
  });

  test('TC-DOC-04 submit disabled while errors remain @regression', async ({ agentPage: page, draftId }) => {
    const review = new ReviewPage(page);
    await review.goto(draftId);
    await review.runValidation();
    expect(await review.hasBlockingErrors(), 'An empty draft passed validation').toBe(true);
    expect(await review.canSubmit(), 'Submit is enabled on an empty draft (DEF-WF-002)').toBe(false);
  });
});
