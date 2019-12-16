const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
require('electron-reload')
let mainWindow

Menu.setApplicationMenu(false);

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    },
  })

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../../build/index.html')}`,
  )

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
