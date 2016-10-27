"use strict"
// usage: .config/isWindows.js && tap spec/*.js || tap spec/*.js --100
process.exit(process.platform === "win32" ? "0" : "1")
