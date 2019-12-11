const Storage = require('../Storage');

exports.createTransactionCategory = async (creditorId, budgetId) => {
  const storage = new Storage('transactionCategories');
  storage.set(creditorId, budgetId);

  return true;
}

exports.getTransactionCategory = (creditorId) => {
  const storage = new Storage('transactionCategories');
  return storage.get(creditorId);
}
