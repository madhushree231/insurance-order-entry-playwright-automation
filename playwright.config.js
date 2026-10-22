require('dotenv').config();

// Avoid double slashes when BASE_URL ends with '/'
process.env.BASE_URL = (process.env.BASE_URL || '').trim().replace(/\/+$/, '');
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 90000,
  expect: { timeout: 10000 },
  // One worker: the app appears to end an agent's other sessions when the
  // same agent signs in again, so parallel tests on one account log each
  // other out.
  workers: 1,
  retries: 1,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    ['json', { outputFile: 'reports/results.json' }],
  ],
  outputDir: 'reports/test-results',
  use: {
    baseURL: process.env.BASE_URL,
    headless: process.env.HEADLESS !== 'false',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
