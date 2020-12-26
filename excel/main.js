const{app, BrowserWindow}=require('electron')
const ejs=require("ejs-electron");
function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true ,// node enable
          enableRemoteModule:true
        },
      });
      
      win.loadFile('index.ejs').then(function(){
          win.maximize();
          win.webContents.openDevTools();
      })

}
app.whenReady().then(createWindow)