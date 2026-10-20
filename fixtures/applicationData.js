const { yearsAgo } = require('../utils/dataGenerator');

const unique = () => Date.now().toString().slice(-6);

const client = () => ({
  firstName: 'Qa',
  lastName: 'Applicant',
  dob: '1985-06-15',
  gender: 'MALE',
  maritalStatus: 'SINGLE',
  nationality: 'United States',
  occupation: 'Engineer',
  employerName: 'Test Employer',
  employerAddress: '1 Test Street',
});

const residential = { street: '123 Main Street', city: 'Austin', state: 'TX', zip: '73301' };

const contact = () => ({ email: `qa${unique()}@example.com`, mobile: '2125551212', mode: 'EMAIL' });

const kyc = () => ({
  idType: 'SSN',
  idNumber: '123456789',
  issueDate: '2020-01-01',
  expiryDate: '2030-01-01',
  annualIncome: '120000',
  netWorth: '500000',
  sourceOfFunds: 'SALARY',
  riskProfile: 'MODERATE',
  pep: 'No',
  declare: true,
});

const ELITE = '3';
const product = { productId: ELITE, sumAssured: 1000000, frequency: 'MONTHLY', paymentTerm: '15' };

const beneficiary = (overrides = {}) => ({
  level: 'PRIMARY',
  type: 'INDIVIDUAL',
  relationship: 'SPOUSE',
  allocation: 100,
  designation: 'REVOCABLE',
  firstName: `Nominee${unique()}`,
  lastName: 'Test',
  dob: '1987-03-20',
  ...overrides,
});

module.exports = { client, residential, contact, kyc, product, beneficiary, ELITE, yearsAgo, unique };
