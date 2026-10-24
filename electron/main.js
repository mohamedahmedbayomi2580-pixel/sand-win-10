const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
app.setAppUserModelId("com.sanad.app");
ipcMain.on("docs", (e) => { e.returnValue = app.getPath("documents"); });
function createWindow() {
  const w = new BrowserWindow({
    width: 560, height: 880, minWidth: 360, title: "سند", icon: path.join(__dirname, "..", "www", "icon.png"), autoHideMenuBar: true,
    webPreferences: { preload: path.join(__dirname, "preload.js"), contextIsolation: true, sandbox: false }
  });
  w.loadFile(path.join(__dirname, "..", "www", "index.html"));
}
app.whenReady().then(createWindow);
app.on("window-all-closed", () => app.quit());
