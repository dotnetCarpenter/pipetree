"use strict"

/// <reference path="../typings/index.d.ts" />

const fs			= require("fs")
const tap			= require("tap")
const select	= require("../lib/root").select

const releases	= parseFile("releases.json")
const latest		= parseFile("lastestversion.json")

function parseFile(filename) {
	return JSON.parse(fs.readFileSync(`${__dirname}/fixtures/${filename}`))
}

tap.test("select.querySelectorAll", t => {
	t.plan(2)

	const getTags = select.querySelectorAll("tag_name")
	let expected = [ 'v2.5.2', 'v2.5.1', 'v2.5.0', 'v2.4.1', 'v2.4.0', 'v2.3.4', 'v2.3.3', 'v2.3.2', 'v2.3.1', 'v2.3.0', 'v2.2.1', 'v2.2.0', 'v2.1.3', 'v2.1.2', 'v2.1.1', 'v2.1.0', 'v2.0.2', 'v2.0.1', 'v2.0.0', 'v1.3.1' ]
	let actual = getTags(releases)
	t.same(actual, expected, "should collect all occurances of 'tag_name'")

	expected = [ 'v2.5.2' ]
	actual = getTags(latest)
	t.same(actual, expected, "should collect all occurances of 'tag_name'")

})

tap.test("select.querySelector", t => {
	t.plan(2)

	const getTag  = select.querySelector("tag_name")
	let expected = "v2.5.2"
	let actual = getTag(releases)
	t.same(actual, expected, "should find the first occurance of 'tag_name'")

	expected = "v2.5.2"
	actual = getTag(latest)
	t.same(actual, expected, "should find the first occurance of 'tag_name'")
})
