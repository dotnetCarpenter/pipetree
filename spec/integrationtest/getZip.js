#!/usr/bin/env node

"use strict"

import tap from "tap"
import select from "../../lib/select"
import listen from "../../lib/listen"

tap.test("getZip should", t => {
	t.plan(1)

	const expected = "https://github.com/jasmine/jasmine/releases/download/v2.5.2/jasmine-standalone-2.5.2.zip"
	
	// get a function to traverse a tree - this one returns the first occurance
	// of the field "browser_download_url"
	const getDownloadUrl = select.querySelector("browser_download_url")

	// start listening for piped input
	listen.start()

	// use this function when the piped input is read
	select.use = () => {
		// use the 
		const actual = getDownloadUrl( listen.collectJSON() )
		t.equal(actual, expected, "return the first browser_download_url found")
	}

	// attach start to handle the "listen" output
	select.start()

})
