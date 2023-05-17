const { app, BrowserWindow, Notification, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const { autoUpdater } = require("electron-updater");

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

autoUpdater.on("update-available", () => {
  win.webContents.send("update_available");
  new Notification({
    title: "پیام جدید ",
    body: " bbb",
    icon: path.join(__dirname, "success-icon.png"),
  }).show();
});
autoUpdater.on("update-downloaded", () => {
  win.webContents.send("update_downloaded");
  new Notification({
    title: "پیام جدید ",
    body: " ccc",
    icon: path.join(__dirname, "success-icon.png"),
  }).show();
});

const server = "https://test-tau-nine-79.vercel.app";
const url = `${server}/update/${
  process.platform
}/${app.getVersion()}?update=true`;
autoUpdater.setFeedURL({ url });

// autoUpdater.setFeedURL(url);

console.log("url: " + url);

autoUpdater
  .on("error", function (err) {
    console.log(err);
    new Notification({
      title: "پیام جدید ",
      body: " 3333",
      icon: path.join(__dirname, "success-icon.png"),
    }).show();
  })
  .on("checking-for-update", function () {
    console.log("Checking for update");
    new Notification({
      title: "پیام جدید ",
      body: " 4444",
      icon: path.join(__dirname, "success-icon.png"),
    }).show();
  })
  .on("update-available", function () {
    console.log("Update available");
    new Notification({
      title: "پیام جدید ",
      body: " 5555",
      icon: path.join(__dirname, "success-icon.png"),
    }).show();
  })
  .on("update-not-available", function () {
    console.log("Update not available");
    new Notification({
      title: "پیام جدید ",
      body: " 6666",
      icon: path.join(__dirname, "success-icon.png"),
    }).show();
  })
  .on("update-downloaded", function () {
    console.log("Update downloaded");
    new Notification({
      title: "پیام جدید ",
      body: " 7777",
      icon: path.join(__dirname, "success-icon.png"),
    }).show();
  });

setInterval(() => {
  autoUpdater.checkForUpdates();

  new Notification({
    title: "پیام جدید ",
    body: " 33aaaaaadddd33",
    icon: path.join(__dirname, "success-icon.png"),
  }).show();
}, 10000);

app.on("ready", function () {
  autoUpdater.checkForUpdatesAndNotify();
});
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
