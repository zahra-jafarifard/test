"use strict";

var _require = require("electron"),
    app = _require.app,
    BrowserWindow = _require.BrowserWindow,
    Notification = _require.Notification,
    ipcMain = _require.ipcMain;

var isDev = require("electron-is-dev");

var _require2 = require("electron-updater"),
    autoUpdater = _require2.autoUpdater;

var path = require("path");

function createWindow() {
  var win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  isDev && win.webContents.openDevTools();
  isDev ? win.loadURL("http://localhost:3000") : win.loadURL("file://".concat(path.join(__dirname, "../build/index.html")));
  win.once("ready-to-show", function () {
    autoUpdater.checkForUpdatesAndNotify();
  });
}

app.whenReady().then(createWindow);
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
ipcMain.handle("closeApp", function () {
  app.quit();
});
ipcMain.handle("showSuccessNotification", function (e, body, icon) {
  app.setAppUserModelId(" Exhub ");
  new Notification({
    title: "پیام جدید ",
    body: " سایت با موفقیت به روز رسانی شد.",
    icon: path.join(__dirname, "success-icon.png")
  }).show();
});
ipcMain.handle("showErrorNotification", function (e, body, icon) {
  app.setAppUserModelId(" Exhub ");
  new Notification({
    title: "پیام جدید ",
    body: "عدم به روز رسانی سایت",
    icon: path.join(__dirname, "failure-icon.png")
  }).show();
});
app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
autoUpdater.on("update-available", function () {
  mainWindow.webContents.send("update_available");
});
autoUpdater.on("update-downloaded", function () {
  mainWindow.webContents.send("update_downloaded");
});
ipcMain.on('restart_app', function () {
  autoUpdater.quitAndInstall();
});