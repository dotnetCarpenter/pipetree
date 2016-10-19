#!/usr/bin/env node

"use strict"

/**
 * # How to run #
 * cat ../spec/fixtures/releases.json | ./lastVersion.js
 * OR
 * ./run.sh
 */

const select = require("../lib/root").select
const listen = require("../lib/root").listen

// map/filter functions
const filters = {
	tags: data => data.tag_name,
	name: data => data.name,
	id: data => data.id,
	browser_download_url: data => data["assets"][0]["browser_download_url"],
}

// const getTags = filters.name
//const getTags = filters.tags
const getTags = select.querySelectorAll("tag_name")
const getTag = select.querySelector("tag_name")

const benchmarks = [
	arrayMap,
	breadthFirstquerySelectorAll,
	breadthFirstquerySelector,
	deepFirstquerySelectorAll,
	deepFirstquerySelector
]

function arrayMap() {
	console.time("arrayMap")
	const tagsA = listen.collectJSON().map(getTags)
	console.timeEnd("arrayMap")
	//console.log(tagsA)
}
function breadthFirstquerySelectorAll() {
	select.searchStrategy = select.breadthFirst
	console.time("breadthFirstquerySelectorAll")
	const btags = getTags(listen.collectJSON())
	console.timeEnd("breadthFirstquerySelectorAll")
	//console.log(btags)
}
function breadthFirstquerySelector() {
	select.searchStrategy = select.breadthFirst	
	console.time("breadthFirstquerySelector")
	const btag = getTag(listen.collectJSON())
	console.timeEnd("breadthFirstquerySelector")
	//console.log(btag)
}
function deepFirstquerySelectorAll() {
	select.searchStrategy = select.deepFirst
	console.time("deepFirstquerySelectorAll")
	const dtags = getTags(listen.collectJSON())
	console.timeEnd("deepFirstquerySelectorAll")
	//console.log(dtags)
}
function deepFirstquerySelector() {
	console.time("deepFirstquerySelector")
	const dtag = getTag(listen.collectJSON())
	console.timeEnd("deepFirstquerySelector")
	//console.log(dtag)
}

select.use = () => {
		const testrun = shuffle(benchmarks)
		testrun.forEach(test => { test() })
		/*const readable = new Stream.Readable()
		const buffer = new Buffer(tags)
		readable.push(buffer)
		readable.pipe(process.stdout, { end: true })*/

	/*console.log(
		`https://api.github.com/repos/jasmine/jasmine/releases/${tags[0]}`
	)*/
}
select.start()
listen.start()

function shuffle(input) {
	const output = []
	output.push.apply(output, input)
	for (let i = output.length-1; i >=0; i--) {		
		const randomIndex = Math.floor(Math.random()*(i+1)); 
		const itemAtIndex = output[randomIndex]; 
			
		output[randomIndex] = output[i]; 
		output[i] = itemAtIndex;
	}
	return output;
}       
