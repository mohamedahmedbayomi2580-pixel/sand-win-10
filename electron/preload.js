const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs"), path = require("path");
const root = ipcRenderer.sendSync("docs");
const abs = (p) => path.join(root, p);
contextBridge.exposeInMainWorld("sanadNative", {
  wasm: async () => new Uint8Array(await fs.promises.readFile(path.join(__dirname, "..", "www", "vendor", "sql-wasm.wasm"))),
  mkdir: async (p) => { await fs.promises.mkdir(abs(p), { recursive: true }); },
  exists: async (p) => fs.existsSync(abs(p)),
  write: async (p, u) => { await fs.promises.mkdir(path.dirname(abs(p)), { recursive: true }); await fs.promises.writeFile(abs(p), Buffer.from(u)); },
  read: async (p) => new Uint8Array(await fs.promises.readFile(abs(p)))
});
