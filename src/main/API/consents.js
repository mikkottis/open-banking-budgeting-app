const Storage = require('../Storage');
const sleep = require('../utils/sleep');

const formatConsent = (resourceIds) => {
  const accounts = [];
  const balances = [];
  const transactions = [];

  resourceIds.forEach(resourceId => {
    accounts.push({ resourceId });
    balances.push({ resourceId });
    transactions.push({ resourceId });
  });

  return {
    accounts,
    balances,
    transactions
  }
}

exports.createConsent = async (platformName, resourceIds) => {
  const storage = new Storage('consents');
  storage.set(platformName.toLowerCase(), formatConsent(resourceIds));

  await sleep(500);
  return true;
}

exports.deleteConsent = (platformName) => {
  const storage = new Storage('consents');
  storage.delete(platformName.toLowerCase());

  return true;
}

exports.getConsent = (platformName) => {
  const storage = new Storage('consents');
  return storage.get(platformName.toLowerCase());
}
