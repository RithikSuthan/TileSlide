const { app, BrowserWindow } = require('electron');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadURL(`file://${path.join(__dirname, 'dist/TileSlide/index.html')}`);

  console.log('Electron window created');

  win.on('closed', () => {
    win = null;
    console.log('Electron window closed');
  });
}

app.on('ready', () => {
  createWindow();
  console.log('Electron app is ready');
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    console.log('Electron app quit');
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
