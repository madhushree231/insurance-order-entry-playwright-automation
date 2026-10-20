const base = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { users } = require('./users');

async function loginAs(page, user) {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(user.email, user.password);
}

const test = base.test.extend({
  /** A page already signed in as the main agent. */
  agentPage: async ({ page }, use) => {
    await loginAs(page, users.agent);
    await base.expect(page).toHaveURL(/dashboard/);
    await use(page);
  },

  /** A fresh draft owned by the main agent. Gives the application id. */
  draftId: async ({ agentPage }, use) => {
    const dashboard = new DashboardPage(agentPage);
    await dashboard.goto();
    const id = await dashboard.startNewApplication();
    await use(id);
  },
});

module.exports = { test, expect: base.expect, loginAs };
