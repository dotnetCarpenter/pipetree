#!/usr/bin/env node

"use strict"

const select = require("../../lib/root").select
const listen = require("../../lib/root").listen

// get a function to traverse a tree - this one returns the first occurance
// of the field "browser_download_url"
const getTag  = select.querySelector("tag_name")

// start listening for piped input
listen.start()

// use this anonymous function when the piped input is read
select.use = () => {
	// set the search strategy - this can must be set
	// before calling the querySelector function to take effect
	select.searchStrategy = select.deepFirst

	// use the querySelector from select on the parsed JSON piped input
	const tag = getTag(listen.collectJSON())
	console.log(tag)
}

// attach select to handle the "listen" output when read
select.start()
