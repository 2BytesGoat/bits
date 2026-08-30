// Monkeypatch lightningcss to trace the empty-selector error
const path = "/var/home/giani/Documents/other/bits/node_modules/lightningcss/node/index.js"
const orig = require(path)
const Module = require("module")
const origResolve = Module._resolveFilename
Module._resolveFilename = function (request, ...args) {
  if (request === "lightningcss") {
    return require.resolve("/var/home/giani/Documents/other/bits/trace-lightning-shim.cjs")
  }
  return origResolve.call(this, request, ...args)
}
