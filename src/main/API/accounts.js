const accounts = require('./data/accounts.json');

exports.getAccounts = (platformName) => {
  return accounts[platformName.toLowerCase()];
}

exports.getAccount = (platformName, resourceId) => {
  return accounts[platformName.toLowerCase()].find(account => account.resourceId === resourceId);
}
