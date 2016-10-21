"use strict"

const zlib = require("zlib")
const listen = require("../../lib/root").listen

process.stdin.setEncoding("latin1")
/*listen.to(process.stdin) is the default */
listen.start()

