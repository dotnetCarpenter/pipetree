#!/usr/bin/env node

"use strict"

const select = require("../../lib/root").select
const listen = require("../../lib/root").listen

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

	select.searchStrategy = select.breadthFirst
	console.time("breadthFirstquerySelectorAll")
	const btags = getTags(listen.collectJSON())
	console.timeEnd("breadthFirstquerySelectorAll")

	console.time("breadthFirstquerySelector")
	const btag = getTag(listen.collectJSON())
	console.timeEnd("breadthFirstquerySelector")

	select.searchStrategy = select.deepFirst
	console.time("deepFirstquerySelectorAll")
	const dtags = getTags(listen.collectJSON())
	console.timeEnd("deepFirstquerySelectorAll")

	console.time("deepFirstquerySelector")
	const dtag = getTag(listen.collectJSON())
	console.timeEnd("deepFirstquerySelector")
/*
	console.log(tagsA)
	console.log(btags)
	console.log(btag)
	console.log(dtags)
	console.log(dtag)
*/
	/*const readable = new Stream.Readable()
	const buffer = new Buffer(tags)
	readable.push(buffer)
	readable.pipe(process.stdout, { end: true })*/

	/*console.log(
		`https://api.github.com/repos/jasmine/jasmine/releases/${tags[0]}`
	)*/
}
select.start()
