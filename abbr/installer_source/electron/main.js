const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const { autoUpdater } = require('electron-updater');

let mainWindow;
function createWindow(){
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 760,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    },
    icon: path.join(__dirname, 'icons', 'icon.ico')
  });

  const startUrl = `file://${path.join(__dirname,'renderer','index.html')}`;
  mainWindow.loadURL(startUrl);

  if(isDev) mainWindow.webContents.openDevTools();

  mainWindow.on('closed', ()=> mainWindow = null);
}

app.on('ready', ()=>{
  createWindow();
  if(!isDev){
    autoUpdater.checkForUpdatesAndNotify();
  }
});

app.on('window-all-closed', ()=> { if(process.platform !== 'darwin') app.quit(); });
app.on('activate', ()=> { if(mainWindow === null) createWindow(); });

autoUpdater.on('update-available', () => { if(mainWindow) mainWindow.webContents.send('update-available'); });
autoUpdater.on('update-downloaded', () => { if(mainWindow) mainWindow.webContents.send('update-downloaded'); });

ipcMain.handle('show-open-dialog', async () => {
  const res = await dialog.showOpenDialog({ properties:['openFile'], filters:[{name:'Excel/CSV', extensions:['xlsx','csv','xls']}] });
  return res;
});
