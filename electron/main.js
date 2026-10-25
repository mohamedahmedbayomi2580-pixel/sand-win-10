const { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage, shell } = require("electron");
const path = require("path");
app.setAppUserModelId("com.sanad.app");
if (!app.requestSingleInstanceLock()) app.quit();
ipcMain.on("docs", (e) => { e.returnValue = app.getPath("documents"); });
let win, tray, quitting = false;
function createWindow() {
  win = new BrowserWindow({
    width: 560, height: 880, minWidth: 360, title: "سند", autoHideMenuBar: true,
    icon: path.join(__dirname, "..", "www", "icon.png"),
    webPreferences: { preload: path.join(__dirname, "preload.js"), contextIsolation: true, sandbox: false, backgroundThrottling: false }
  });
  win.loadFile(path.join(__dirname, "..", "www", "index.html"));
  // روابط الإنترنت (مثل واتساب) تُفتح في المتصفح الافتراضي
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/i.test(url)) { shell.openExternal(url); return { action: "deny" }; }
    return { action: "allow" };
  });
  // الإغلاق يخفي النافذة فقط ليستمر التطبيق في الخلفية وتصل التذكيرات
  win.on("close", (e) => { if (!quitting) { e.preventDefault(); win.hide(); } });
}
app.on("second-instance", () => { if (win) { win.show(); win.focus(); } });
app.whenReady().then(() => {
  createWindow();
  const icon = nativeImage.createFromPath(path.join(__dirname, "..", "www", "icon.png")).resize({ width: 16, height: 16 });
  tray = new Tray(icon);
  tray.setToolTip("سند");
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: "فتح سند", click: () => win.show() },
    { label: "خروج", click: () => { quitting = true; app.quit(); } }
  ]));
  tray.on("click", () => win.show());
  app.setLoginItemSettings({ openAtLogin: true });
});
app.on("before-quit", () => { quitting = true; });
