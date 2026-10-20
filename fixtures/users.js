/** Every account comes from .env. Nothing is hard-coded in tests. */
const seed = process.env.OE_SEED_PASSWORD;

const users = {
  agent: { email: process.env.OE_AGENT_EMAIL, password: process.env.OE_AGENT_PASSWORD || seed },
  draftAgent: { email: process.env.OE_AGENT2_EMAIL, password: seed },
  submittedAgent: { email: process.env.OE_SUBMITTED_EMAIL, password: seed },
  locked: { email: process.env.OE_LOCKED_EMAIL, password: seed },
  newAgent: { email: process.env.OE_NEW_AGENT_EMAIL, password: seed },
  mfa: { email: process.env.OE_MFA_EMAIL, password: seed },
};

/** Seeded application references from ApplicationSeeder.php */
const seeded = {
  draftAgentDraft: 'WL202605170002',
  submittedApp: 'WL202605170003',
};

module.exports = { users, seeded };
