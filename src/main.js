const {app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width:800,
        height:600,
        frame:false,
        });
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
  
};

//open window on app open
app.whenReady().then(()=> {
    createWindow();
    //open windwow if no open windows
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

//close window on app close
app.on('window-all-closed', () => {
    app.quit();
});

//listen for interaction with window header
const { ipcMain } = require('electron');
ipcMain.on('close-window', () => mainWindow.close());
