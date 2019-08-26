const { BrowserWindow, app } = require('electron');

function createWindow() {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('static/index.html');
}

app.on('ready', createWindow);
