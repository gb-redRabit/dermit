const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = app.isPackaged ? false : require("electron-is-dev");
const path = require("path");
const fetch = require("electron-fetch").default;
const Store = require("electron-store");

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

Store.initRenderer();

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    // frame: false,
    // fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
ipcMain.on("api", (event, data) => {
  fetch(data)
    .then((res) => res.text())
    .then((body) => event.reply("apiSend", body));
});
ipcMain.on("apiTwo", (event, data) => {
  fetch(data)
    .then((res) => res.text())
    .then((body) => event.reply("apiSendTwo", body));
});
ipcMain.on("start", (event, data) => {
  fetch("https://api.docchi.pl/v1/series/list")
    .then((res) => res.text())
    .then((body) => event.reply("startOn", body));
});

ipcMain.on("getAnime", (event, data) => {
  fetch(`https://api.docchi.pl/v1/series/find/${data}`)
    .then((res) => res.text())
    .then((body) => event.reply("onAnime", body));
});

ipcMain.on("getEpisodes", (event, data) => {
  fetch(`https://api.docchi.pl/v1/episodes/find/${data}`)
    .then((res) => res.text())
    .then((body) => event.reply("onEpisodes", body));
});

ipcMain.on("getProfile", (event, data) => {
  fetch(`https://api.docchi.pl/v1/user/profile/${data}`)
    .then((res) => res.text())
    .then((body) => event.reply("onProfile", body));
});

ipcMain.on("getListProfilet", (event, data) => {
  fetch(`https://api.docchi.pl/v1/user/list/find/${data}`)
    .then((res) => res.text())
    .then((body) => event.reply("onListProfilet", body));
});
ipcMain.on("close", () => {
  app.quit();
});
