const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { MpvEngine } = require('./engine/mpvEngine');
const { probeMediaFile } = require('./engine/mediaProbe');

let mainWindow = null;
let mpvEngine = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 960,
    minHeight: 620,
    frame: false,
    backgroundColor: '#111214',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.loadFile(path.join(__dirname, '..', 'src', 'index.html'));

  const mpvDir = app.isPackaged
    ? path.join(process.resourcesPath, 'mpv')
    : path.join(__dirname, '..', 'resources', 'mpv');

  mpvEngine = new MpvEngine({
    mpvDir,
    onEvent: (evt) => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('mpv:event', evt);
      }
    }
  });
}

// Native Windows 11 window controls
ipcMain.on('win:minimize', () => mainWindow && mainWindow.minimize());
ipcMain.on('win:maximize', () => {
  if (!mainWindow) return;
  mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
});
ipcMain.on('win:close', () => mainWindow && mainWindow.close());

// Native file / folder / subtitle dialogs
ipcMain.handle('dialog:openFiles', async () => {
  const res = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'multiSelections'],
    filters: [
      { name: 'Media Files', extensions: ['mp4','mkv','avi','mov','webm','wmv','flv','mpeg','mpg','ts','m2ts','3gp','vob','ogv','mp3','aac','flac','wav','wma','alac','ogg','opus','aiff','m4a','ape','ac3','dts'] },
      { name: 'All Files (Probe by Header)', extensions: ['*'] }
    ]
  });
  return res.canceled ? [] : res.filePaths;
});

ipcMain.handle('dialog:openFolder', async () => {
  const res = await dialog.showOpenDialog(mainWindow, { properties: ['openDirectory'] });
  return res.canceled ? null : res.filePaths[0];
});

ipcMain.handle('media:probe', async (_e, filePath) => {
  const mpvDir = app.isPackaged
    ? path.join(process.resourcesPath, 'mpv')
    : path.join(__dirname, '..', 'resources', 'mpv');
  return probeMediaFile(filePath, mpvDir);
});

// Decoupled libmpv / mpv IPC commands
ipcMain.handle('mpv:command', async (_e, args) => mpvEngine ? mpvEngine.command(args) : null);
ipcMain.handle('mpv:setProperty', async (_e, name, value) => mpvEngine ? mpvEngine.setProperty(name, value) : null);
ipcMain.handle('mpv:getProperty', async (_e, name) => mpvEngine ? mpvEngine.getProperty(name) : null);
ipcMain.handle('mpv:getMediaInfo', async () => mpvEngine ? mpvEngine.getMediaInfo() : null);

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (mpvEngine) mpvEngine.dispose();
  if (process.platform !== 'darwin') app.quit();
});
