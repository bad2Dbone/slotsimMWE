const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var mainWindow = null;


exports.setMainWindow = (window) => {

  mainWindow = window;

}

// menu array variable
exports.menuTemplate = [
  //File menu
  {
    label: "File",
    submenu: [
      {
        label: "Exit",
        click: () => {
          //mainWindow.close();
          app.quit();
        }
      }
    ]
  },

  // view menu
  {
    label: "View",
    submenu: [
      {
        label: "Reload",
        accelerator: "F5",
        click: (item, focusedWindow) => {
          if (focusedWindow) {
            // on reload, start fresh and close any old
            // open secondary windows
            if (focusedWindow.id === 1) {
              BrowserWindow.getAllWindows().forEach(win => {
                if (win.id > 1) win.close();
              });
            }
            focusedWindow.reload();
          }
        }
      },
      {
        label: "Toggle Dev Tools",
        accelerator: "Control+Shift+I",
        click: () => {
          mainWindow.webContents.toggleDevTools();
        }
      }
    ]
  },

  // help menu
  {
    label: 'Help',
    submenu: [

      // about window
      {
        label: 'About',
        click: () => {
          const { createAboutWindow } = require("./electron")
          createAboutWindow();
        }
      }
    ]
  }
];

