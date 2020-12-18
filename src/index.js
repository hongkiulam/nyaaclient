// * Instantiating Electron
// * reference [https://github.com/codediodeio/electron-forge-svelte]
const { app, BrowserWindow, ipcMain } = require("electron");
const rimraf = require("rimraf");
const path = require("path");

// Live Reload
require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "../node_modules", ".bin", "electron"),
  awaitWriteFinish: true,
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  app.allowRendererProcessReuse = true;
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../public/index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
process.on("exit", () => {
  app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// setup electron store (persistent storage)
// const store = new Store({
//   accessPropertiesByDotNotation: false,
// });
// if (!store.get("savedSearches")) {
//   store.set("savedSearches", []);
//   store.set("torrents", []);
// }

// ipcMain.handle("get", (event, key) => store.get(key));
// ipcMain.handle("set", (event, key, value) => {
//   store.set(key, value);
// });
ipcMain.on("rimraf", (event, path) => {
  if (path && path.includes("/tmp/webtorrent/")) {
    rimraf(path, (err) => {
      if (err) {
        event.reply("rimraf-error", err);
      }
      event.reply("rimraf-done", "done");
    });
  }
});
