const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs/promises');
const isDev = require('electron-is-dev');

let mainWindow;

const DATA_FILE = path.join(app.getPath('userData'), 'data.json');

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch (error) {
    if (error.code === 'ENOENT') {
      const initialData = { months: {} };
      await fs.writeFile(DATA_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    }
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    titleBarStyle: 'hiddenInset',
  });

  const startUrl = isDev 
    ? 'http://localhost:3000' 
    : `file://${path.join(__dirname, '.next/server/app/index.html')}`;

  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// IPC Handlers for Data Persistence
ipcMain.handle('get-data', async () => {
  try {
    await ensureDataFile();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to read data in main process:', error);
    return { months: {} };
  }
});

ipcMain.handle('save-data', async (event, body) => {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(body, null, 2), 'utf-8');
    return { success: true };
  } catch (error) {
    console.error('Failed to save data in main process:', error);
    return { error: error.message };
  }
});

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
