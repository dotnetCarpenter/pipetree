"use strict"

const tap = require("tap")
const exec = require("child_process").exec

tap.test("downloadUrl should", t => {
	t.plan(1)

	exec(
		"cat ./fixtures/releases.json | node ./integration/downloadUrl.js",
		{ cwd: __dirname },
		(error, stdout, stderr) => {

			const expected 	= "https://github.com/jasmine/jasmine/releases/download/v2.5.2/jasmine-standalone-2.5.2.zip"
			const actual		= stdout

			t.match(actual, expected, "return the first browser_download_url found")
		}
	)
})

tap.test("lastVersion should", t => {
	t.plan(1)

	exec(
		"cat ./fixtures/latestversion.json | node ./integration/lastVersion.js",
		{ cwd: __dirname },
		(error, stdout, stderr) => {

			const expected 	= "v2.5.2"
			const actual		= stdout

			t.match(actual, expected, "return the first tag_name found")
		}
	)
})
