const transactions = require('./data/transactions.json');

exports.getTransactions = (accountId) => {
  return transactions[accountId];
}

exports.getTransaction = (accountId, transactionId) => {
  return transactions[accountId].find(transaction => transaction.resourceId === transactionId);
}
