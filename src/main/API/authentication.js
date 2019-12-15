const Storage = require('../Storage');
const sleep = require('../utils/sleep');

const { deleteConsent } = require('./consents');

exports.authenticate = async (platformName) => {
  const storage = new Storage('authentication');
  storage.set(platformName.toLowerCase(), 'Bearer 123');

  await sleep(500);
  return true;
}

exports.unauthenticate = async (platformName) => {
  const storage = new Storage('authentication');
  storage.delete(platformName.toLowerCase());
  deleteConsent(platformName);

  await sleep(500);
  return true;
}

exports.hasToken = (platformName) => {
  const storage = new Storage('authentication');
  return Boolean(storage.get(platformName.toLowerCase()));
}
