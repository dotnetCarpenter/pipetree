#!/usr/bin/env node

"use strict"

const select = require("./select")
const listen = require("./listen")

// map/filter functions
const filters = {
	tags								: data => data.tag_name,
	name								: data => data.name,
	id									: data => data.id,
	browser_download_url: data => data["assets"][0]["browser_download_url"],
}

// const getTags = filters.name
//const getTags = filters.tags
const getTags = select.querySelectorAll("tag_name")
const getTag  = select.querySelector("tag_name")

listen.start()
select.use = () => {
	console.time("arrayMap")
	const tagsA = listen.collectJSON().map(getTags)
	console.timeEnd("arrayMap")

	console.time("querySelectorAll")
	const tags = getTags(listen.collectJSON())
	console.timeEnd("querySelectorAll")

	console.time("querySelector")
	const tag = getTag(listen.collectJSON())
	console.timeEnd("querySelector")

	console.log(tagsA)
	console.log(tags)
	console.log(tag)
	

	/*const readable = new Stream.Readable()
	const buffer = new Buffer(tags)
	readable.push(buffer)
	readable.pipe(process.stdout, { end: true })*/

	/*console.log(
		`https://api.github.com/repos/jasmine/jasmine/releases/${tags[0]}`
	)*/
}
select.start()
