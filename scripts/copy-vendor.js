const fs = require("fs"), path = require("path");
const src = path.join(__dirname, "..", "node_modules", "sql.js", "dist");
const dst = path.join(__dirname, "..", "www", "vendor");
fs.mkdirSync(dst, { recursive: true });
for (const f of ["sql-wasm.js", "sql-wasm.wasm"]) fs.copyFileSync(path.join(src, f), path.join(dst, f));
console.log("sql.js copied to www/vendor");
