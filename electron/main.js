const{app, BrowserWindow}=require('electron')
const ejse=require("ejs-electron")
function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true // node enable
        }
      });
      win.loadFile('index.ejs').then(function(){
          win.maximize();
          win.webContents.openDevTools();
      })

}
app.whenReady().then(createWindow)