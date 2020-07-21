const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");

const { Menu } = require("electron");
const { menuTemplate, setMainWindow } = require('./menus');

const IPCServer = require("./IPCServer");

// message passing infrastructure
require("./MainRouter");

let mainWindow;
let aboutWindow;

function createWindow() {
  
  // create IPC server for communication with children
  if (!global.ipcServer) {
    // ipc server not yet created
    global.ipcServer = new IPCServer();
    global.ipcServer.init();
  } 
  
  mainWindow = new BrowserWindow({ 
    width: 1600, 
    height: 1200, 
    webPreferences: { 
      nodeIntegration: true, 
      enableRemoteModule: true
    }, 
    icon: path.join(__dirname, 'favicon.ico')
  });
  
  // load content into window
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // assign window object reference
  setMainWindow(mainWindow);
  mainWindow.openDevTools();
  mainWindow.on("closed", () => (mainWindow = null));
}


exports.createAboutWindow = function() {
  aboutWindow = new BrowserWindow({ width: 400, height: 300, autoHideMenuBar: true, webPreferences: { nodeIntegration: true, enableRemoteModule: true}, icon: path.join(__dirname, 'favicon.ico')});
  aboutWindow.loadURL(
      `file://${path.join(__dirname, "/about.html")}`
  );

  // assign window object reference
  //setMainWindow(aboutWindow);
  
  aboutWindow.on("closed", () => (aboutWindow = null));
}


app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// initialize custom menu for the electron app
const menus = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menus);