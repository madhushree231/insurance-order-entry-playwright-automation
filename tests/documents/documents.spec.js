const { test, expect } = require('../../fixtures/auth.fixture');
const { DocumentUploadPage } = require('../../pages/DocumentUploadPage');
const { validPdf, exeFile } = require('../../utils/fileUploadHelper');

test.describe('Documents @documents', () => {
  test('TC-DOC-01 valid PDF uploads @smoke', async ({ agentPage: page, draftId }) => {
    const d = new DocumentUploadPage(page);
    await d.goto(draftId);
    await d.uploadFile(validPdf());
    expect(await d.documentCount(), 'The PDF was not recorded').toBeGreaterThan(0);
  });

  test('TC-DOC-02 unsupported file type rejected @regression', async ({ agentPage: page, draftId }) => {
    const d = new DocumentUploadPage(page);
    await d.goto(draftId);
    await d.uploadFile(exeFile());
    expect(await d.documentCount(), 'An .exe file was accepted as a KYC document (DEF-DOC-002)').toBe(0);
  });

  test('TC-DOC-05 continue skips step validation @regression', async ({ agentPage: page, draftId }) => {
    const d = new DocumentUploadPage(page);
    await d.goto(draftId);
    await d.clickContinueToReview();
    await expect(page, 'Continue to Review moved on with no documents uploaded (own finding)').toHaveURL(/documents/);
  });
});
