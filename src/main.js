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
        mainWindow.close();
    });
    ipcMain.on('min-window', () => {
        mainWindow.minimize();
    });
    ipcMain.on('max-window', () => {
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
        }
    });
    ipcMain.on('pin-window', () => {
        if (mainWindow.isAlwaysOnTop()== false) {
            mainWindow.setAlwaysOnTop(true, 'screen')
        } else {
            mainWindow.setAlwaysOnTop(false, 'screen')
        }
    });
    ipcMain.on('dev-clicked', () => {
        mainWindow.webContents.toggleDevTools();
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


