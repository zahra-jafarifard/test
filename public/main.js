const { app, BrowserWindow, Notification, ipcMain , autoUpdater } = require("electron");
const isDev = require("electron-is-dev");

const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
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

// var autoUpdater = require("auto-updater");

const server = "https://vercel.com/zahra-jafarifard/test";
const url = `${server}/update/${process.platform}/${app.getVersion()}`;
autoUpdater.setFeedURL({ url });

// autoUpdater.setFeedURL(url);

console.log("url: " + url);

autoUpdater
  .on("error", function (err) {
    console.log(err);
  })
  .on("checking-for-update", function () {
    console.log("Checking for update");
  })
  .on("update-available", function () {
    console.log("Update available");
  })
  .on("update-not-available", function () {
    console.log("Update not available");
  })
  .on("update-downloaded", function () {
    console.log("Update downloaded");
  });

setInterval(() => {
  autoUpdater.checkForUpdates();
}, 10000);

// ipcMain.handle("openTelmisSite", () => {
//   // shell.openExternal("https://telmis.ir");
//   require("shell").openExternal("http://www.google.com");
// });

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
