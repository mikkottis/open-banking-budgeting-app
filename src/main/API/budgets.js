const uuid = require('uuid');

const Storage = require('../Storage');
const sleep = require('../utils/sleep');

exports.createBudget = async (budget) => {
  const storage = new Storage('budgets');
  storage.set(uuid.v4(), budget);

  await sleep(500);
  return true;
}

exports.getBudgets = () => {
  const storage = new Storage('budgets');
  return storage.getAll();
}

exports.getBudget = (budgetId) => {
  const storage = new Storage('budgets');
  return storage.get(budgetId);
}

exports.deleteBudget = (budgetId) => {
  const storage = new Storage('budgets');
  return storage.delete(budgetId);
}
