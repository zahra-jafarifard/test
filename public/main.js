<<<<<<< HEAD
const { app, BrowserWindow, Notification, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const { autoUpdater } = require("electron-updater");

const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
=======
const { app, BrowserWindow, ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
>>>>>>> 34ef77f2021b3843e85f762442be988eccd5ff38
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
<<<<<<< HEAD
  isDev && win.webContents.openDevTools();
  isDev
    ? win.loadURL("http://localhost:3000")
    : win.loadURL(`file://${path.join(__dirname, "../build/index.html")}`);

  win.once("ready-to-show", () => {
=======
  mainWindow.loadFile("public/index.html");
  mainWindow.on("closed", function () {
    mainWindow = null;
  });

  mainWindow.once("ready-to-show", () => {
>>>>>>> 34ef77f2021b3843e85f762442be988eccd5ff38
    autoUpdater.checkForUpdatesAndNotify();
  });
}

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

<<<<<<< HEAD
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("closeApp", () => {
  app.quit();
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
=======
app.on("activate", function () {
  if (mainWindow === null) {
>>>>>>> 34ef77f2021b3843e85f762442be988eccd5ff38
    createWindow();
  }
});

<<<<<<< HEAD
=======
ipcMain.on("app_version", (event) => {
  event.sender.send("app_version", { version: app.getVersion() });
});

>>>>>>> 34ef77f2021b3843e85f762442be988eccd5ff38
autoUpdater.on("update-available", () => {
  mainWindow.webContents.send("update_available");
});

autoUpdater.on("update-downloaded", () => {
  mainWindow.webContents.send("update_downloaded");
});

<<<<<<< HEAD

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});
=======
ipcMain.on("restart_app", () => {
  autoUpdater.quitAndInstall();
});
>>>>>>> 34ef77f2021b3843e85f762442be988eccd5ff38
