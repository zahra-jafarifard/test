const { app, BrowserWindow, Notification, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const { autoUpdater } = require("electron-updater");

const path = require("path");
let win;
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
      enableRemoteModule: true,
    },
  });
  isDev && win.webContents.openDevTools();
  isDev
    ? win.loadURL("http://localhost:3000")
    : win.loadURL(`file://${path.join(__dirname, "../build/index.html")}`);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("closeApp", () => {
  app.quit();
});

win.once("ready-to-show", () => {
  autoUpdater.checkForUpdatesAndNotify();
});

autoUpdater.on("update-available", () => {
  win.webContents.send("update_available");
  new Notification({
    title: "پیام جدید ",
    body: "update-available",
    icon: path.join(__dirname, "success-icon.png"),
  }).show();
});

autoUpdater.on("update-downloaded", () => {
  win.webContents.send("update_downloaded");
  new Notification({
    title: "پیام جدید ",
    body: "update_downloaded",
    icon: path.join(__dirname, "success-icon.png"),
  }).show();
});

ipcMain.on("restart_app", () => {
  autoUpdater.quitAndInstall();
});

ipcMain.handle("showSuccessNotification", (e, body, icon) => {
  app.setAppUserModelId(" Exhub ");
  new Notification({
    title: "پیام جدید ",
    body: " سایت با موفقیت به روز رسانی شد.",
    icon: path.join(__dirname, "success-icon.png"),
  }).show();
});
ipcMain.handle("showErrorNotification", (e, body, icon) => {
  app.setAppUserModelId(" Exhub ");
  new Notification({
    title: "پیام جدید ",
    body: "عدم به روز رسانی سایت",
    icon: path.join(__dirname, "failure-icon.png"),
  }).show();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
