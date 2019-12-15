const { app } = require('electron');
const path = require('path');
const fs = require('fs');

const parseFile = (path) => {
  if (!fs.existsSync(path)) {
    return {};
  }

  return JSON.parse(fs.readFileSync(path));
}

const writeFile = (path, data) => {
  fs.writeFileSync(path, JSON.stringify(data));
}

const unlinkFile = (path) => {
  if (!fs.existsSync(path)) {
    return;
  }

  fs.unlinkSync(path);
}

class Storage {
  constructor(storageName) {
    const appDataPath = `${app.getPath('appData')}/open-banking-budgeting-app`;

    this.path = path.join(appDataPath, `${storageName}.json`);
    this.data = parseFile(this.path);
  }
  
  get(key) {
    return this.data[key];
  }

  getAll() {
    return this.data;
  }

  set(key, val) {
    this.data[key] = val;
    writeFile(this.path, this.data)
  }

  delete(key) {
    delete this.data[key];

    if (Object.entries(this.data).length === 0) {
      unlinkFile(this.path);
      return;
    }

    writeFile(this.path, this.data)
  }
}

module.exports = Storage;
