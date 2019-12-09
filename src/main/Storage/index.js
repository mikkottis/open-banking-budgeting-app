const electron = require('electron');
const path = require('path');
const fs = require('fs');

const parseFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  return JSON.parse(fs.readFileSync(filePath));
}

const writeFile = (path, data) => {
  fs.writeFileSync(path, JSON.stringify(data));
}

class Storage {
  constructor(storageName) {
    const userDataPath = (electron.app || electron.remote.app).getPath('userData');

    this.path = path.join(userDataPath, `${storageName}.json`);
    this.data = parseFile(this.path);
  }
  
  get(key) {
    return this.data[key];
  }

  set(key, val) {
    this.data[key] = val;
    writeFile(this.path, this.data)
  }

  delete(key) {
    delete this.data[key];

    if (Object.entries(this.data).length === 0) {
      fs.unlinkSync(this.path);
      return;
    }

    writeFile(this.path, this.data)
  }
}

module.exports = Storage;
