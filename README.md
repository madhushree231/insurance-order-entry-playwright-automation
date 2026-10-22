# Insurance Order Entry – Playwright Automation

Playwright (JavaScript) tests for the Insurance Order Entry agent platform. Built for TalentFarm Assignment 2, Submission 2.

The test cases are in `docs/Test_Case_Design_Sheet.xlsx`. Every test name starts with its test case ID, for example `TC-BEN-02`, and failure messages name the seeded defect code they relate to.

## Setup

You need Node.js 18 or later and access to the Order Entry app.

```
npm install
npx playwright install chromium
copy .env.example .env
```

Open `.env` and fill in the base URL, your agent account and the seed password. The VM IP changes each session, so update `BASE_URL` when it does.

## Running

```
npx playwright test                    # everything
npx playwright test --grep @smoke      # quick check
npx playwright test tests/api          # HTTP layer only
npx playwright test -g "TC-BEN-02"     # one test
npx playwright test --headed           # watch it run
npx playwright show-report reports/html-report
```

Reports, screenshots, videos and traces go to `reports/`. Screenshots and videos are kept for failed tests. Open a trace with `npx playwright show-trace <path-to-trace.zip>`.

## Structure

```
pages/        page objects, one per screen
fixtures/     users, test data, signed-in page and fresh draft fixtures
utils/        HTTP helper, dates, file uploads, assertions, wizard helper
tests/        auth, dashboard, client-information, product-selection,
              riders, beneficiaries, documents, workflow, api
docs/         test case design sheet, saved HTML of each page (page-snapshots)
```

Each test that changes data creates its own draft, so tests do not depend on each other. The only exception is `TC-WF-04`, which checks the application submitted by `TC-WF-01`.

## Accounts

All accounts are read from `.env`. The seeded ones come from the app's `UserSeeder.php`: draft agent, submitted agent, locked agent, new agent and MFA agent. Use your own agent as `OE_AGENT_EMAIL` so other activity does not interfere with your drafts.

## Known limitations

- Tests run with one worker. Signing in as the same agent from a second browser seems to end the first session, so parallel tests on one account log each other out.
- After login the app opens the agent's latest draft rather than the dashboard. Tests open the dashboard themselves after signing in.
- The app has no `/api` routes (confirmed with `php artisan route:list`). The API tests check the same risks through the app's web routes using Playwright's request context.
- `TC-AUTH-07` reads the OTP from the Laravel log, so it only runs fully on the lab VM with `OE_LOG_PATH` set. Otherwise it checks the OTP page appears and skips the rest.
- `TC-RID-03` and `TC-RID-04` skip with a reason if the page has no rider coverage field or fewer than two waiver riders.
- `TC-AUTH-05` and `TC-AUTH-06` skip if the form field names differ from what the test expects.
- Some tests are expected to fail because they detect seeded defects. A failure message names the defect code. These are app defects, not automation problems.

## Troubleshooting

- Every test times out at login: check `BASE_URL` matches the current VM IP and port 8081.
- `Cannot find module 'dotenv'`: run `npm install`.
- Browser not found: run `npx playwright install chromium`.
- Locked agent tests behave oddly: the seed data may have been reset or changed by an admin. Check `/admin/users`.
