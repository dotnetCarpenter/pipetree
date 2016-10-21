"use strict"

const tap 		= require("tap")
const url			= require("url")
//const listen	= require("../lib/root").listen
const exec		= require("child_process").exec


tap.test("httpsget report to stderr if an error happens", t => {
	exec(
		"httpsget https://this.url.is.invalid",
    (error, stdout, stderr) => {

      const expected 	= new Error
      const actual		= error

      t.match(actual, expected, "error is an instance of Error")
    }
  )
})
