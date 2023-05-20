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

var win;

function createWindow() {
  win = new BrowserWindow({
    width: 1120,
    height: 930,
    transparent: true,
    isResizable: false,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
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
autoUpdater.on("update-available", function () {
  win.webContents.send("update_available");
  new Notification({
    title: "پیام جدید ",
    body: "update-available",
    icon: path.join(__dirname, "success-icon.png")
  }).show();
});
autoUpdater.on("update-downloaded", function () {
  win.webContents.send("update_downloaded");
  new Notification({
    title: "پیام جدید ",
    body: "update_downloaded",
    icon: path.join(__dirname, "success-icon.png")
  }).show();
});
ipcMain.on("restart_app", function () {
  autoUpdater.quitAndInstall();
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