"use strict";

var _require = require("electron"),
    app = _require.app,
    BrowserWindow = _require.BrowserWindow,
<<<<<<< HEAD
    Notification = _require.Notification,
    ipcMain = _require.ipcMain;

var isDev = require("electron-is-dev");

var _require2 = require("electron-updater"),
    autoUpdater = _require2.autoUpdater;

var path = require("path");

function createWindow() {
  var win = new BrowserWindow({
=======
    ipcMain = _require.ipcMain;

var _require2 = require("electron-updater"),
    autoUpdater = _require2.autoUpdater;

var mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
>>>>>>> 34ef77f2021b3843e85f762442be988eccd5ff38
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
<<<<<<< HEAD
  isDev && win.webContents.openDevTools();
  isDev ? win.loadURL("http://localhost:3000") : win.loadURL("file://".concat(path.join(__dirname, "../build/index.html")));
  win.once("ready-to-show", function () {
=======
  mainWindow.loadFile("public/index.html");
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
  mainWindow.once("ready-to-show", function () {
>>>>>>> 34ef77f2021b3843e85f762442be988eccd5ff38
    autoUpdater.checkForUpdatesAndNotify();
  });
}

<<<<<<< HEAD
app.whenReady().then(createWindow);
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
=======
app.on("ready", function () {
  createWindow();
>>>>>>> 34ef77f2021b3843e85f762442be988eccd5ff38
});
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
<<<<<<< HEAD
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
=======
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
>>>>>>> 34ef77f2021b3843e85f762442be988eccd5ff38
autoUpdater.on("update-available", function () {
  mainWindow.webContents.send("update_available");
});
autoUpdater.on("update-downloaded", function () {
  mainWindow.webContents.send("update_downloaded");
});
<<<<<<< HEAD
ipcMain.on('restart_app', function () {
=======
ipcMain.on("restart_app", function () {
>>>>>>> 34ef77f2021b3843e85f762442be988eccd5ff38
  autoUpdater.quitAndInstall();
});