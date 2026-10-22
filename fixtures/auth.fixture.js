const base = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { users } = require('./users');

/**
 * Signs in and waits until the app has left the login page. After login the
 * app may resume the agent's last draft instead of showing the dashboard,
 * so tests must not assume where it lands.
 */
async function loginAs(page, user) {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(user.email, user.password);
  await page.waitForURL((url) => !url.pathname.startsWith('/login'), { timeout: 15000 })
    .catch(() => {});
}

const test = base.test.extend({
  /** A page signed in as the main agent, sitting on the dashboard. */
  agentPage: async ({ page }, use) => {
    await loginAs(page, users.agent);
    await base.expect(page, 'Main agent could not sign in').not.toHaveURL(/\/login/);
    await new DashboardPage(page).goto();
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