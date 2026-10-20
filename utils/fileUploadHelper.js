/** Builds upload files in memory so the repo does not need binary fixtures. */
const PDF = Buffer.from('%PDF-1.4\n1 0 obj<<>>endobj\ntrailer<<>>\n%%EOF\n');

module.exports = {
  validPdf: () => ({ name: 'kyc-id.pdf', mimeType: 'application/pdf', buffer: PDF }),
  exeFile: () => ({ name: 'tool.exe', mimeType: 'application/octet-stream', buffer: Buffer.from('MZ fake exe') }),
};
