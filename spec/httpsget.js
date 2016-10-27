"use strict"

const tap 		= require("tap")
const url			= require("url")
//const listen	= require("../lib/root").listen
const exec		= require("child_process").exec


tap.test("httpsget report to stderr if an error happens", t => {
	t.plan(1)

	exec(
		"node ../bin/httpsget https://this.url.is.invalid",
		{ cwd: __dirname },
    (error, stdout, stderr) => {

			let expected = {
				address: /\w+/,
				code: /\w+/,
				errno: /\w+/,
				port: 443,
				syscall: /\w+/
			}
			let actual = JSON.parse(stderr)

      t.match(actual, expected, "clientError")

    }
  )
})
