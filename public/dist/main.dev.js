"use strict";

var _require = require("electron"),
    app = _require.app,
    BrowserWindow = _require.BrowserWindow,
    ipcMain = _require.ipcMain;

var _require2 = require("electron-updater"),
    autoUpdater = _require2.autoUpdater;

var mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadFile("public/index.html");
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
  mainWindow.once("ready-to-show", function () {
    autoUpdater.checkForUpdatesAndNotify();
  });
}

app.on("ready", function () {
  createWindow();
});
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
ipcMain.on("app_version", function (event) {
  event.sender.send("app_version", {
    version: app.getVersion()
  });
});
autoUpdater.on("update-available", function () {
  mainWindow.webContents.send("update_available");
});
autoUpdater.on("update-downloaded", function () {
  mainWindow.webContents.send("update_downloaded");
});
ipcMain.on("restart_app", function () {
  autoUpdater.quitAndInstall();
});