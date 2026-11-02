const {app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width:800,
        height:600,
        frame:false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
            //note: this may be insecure, change later
        }
        });
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
    //mainWindow.webContents.openDevTools();

    //listen for interaction with window header
    ipcMain.on('close-window', () => {
        mainWindow.close()
    });
};

//open window on app open
app.whenReady().then(()=> {
    createWindow();
    //open a window if no open windows
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

//close window on app close
app.on('window-all-closed', () => {
    app.quit();
});


