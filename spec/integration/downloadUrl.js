#!/usr/bin/env node

"use strict"

const select = require("../../lib/root").select
const listen = require("../../lib/root").listen

// get a function to traverse a tree - this one returns the first occurance
// of the field "browser_download_url"
const getDownloadUrl = select.querySelector("browser_download_url")

// use this anonymous function when the piped input is read
select.use = () => {
	// use the querySelector from select on the parsed JSON piped input
	const downloadUrl = getDownloadUrl( listen.collectJSON() )
	console.log(downloadUrl)
}

// attach select to handle the "listen" output when read
select.start()
// start listening for piped input
listen.start()
