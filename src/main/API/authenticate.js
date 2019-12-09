const Storage = require('../Storage');
const sleep = require('../utils/sleep');

exports.authenticate = async (platformName) => {
  const storage = new Storage('authentication');
  storage.set(platformName, 'Bearer 123');

  await sleep(500);
  return true;
}

exports.unauthenticate = async (platformName) => {
  const storage = new Storage('authentication');
  storage.delete(platformName);

  await sleep(500);
  return true;
}

exports.hasToken = (platformName) => {
  const storage = new Storage('authentication');
  return Boolean(storage.get(platformName));
}

exports.getToken = (platformName) => {
  const storage = new Storage('authentication');
  return storage.get(platformName);
}
