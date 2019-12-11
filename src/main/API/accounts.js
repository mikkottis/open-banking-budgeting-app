const accounts = require('./data/accounts.json');

exports.getAccounts = (platformName) => {
  return accounts[platformName.toLowerCase()];
}

exports.getAccount = (platformName, accountId) => {
  return accounts[platformName.toLowerCase()].find(account => account.resourceId === accountId);
}
