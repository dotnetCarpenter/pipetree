"use strict"

/// <reference path="../typings/index.d.ts" />

const fs			= require("fs")
const tap			= require("tap")
const select	= require("../lib/root").select

const releases	= parseFile("releases.json")
const latest		= parseFile("lastestversion.json")
const small			= parseFile("releases.small.json")

function parseFile(filename) {
	return JSON.parse(fs.readFileSync(`${__dirname}/fixtures/${filename}`))
}

tap.test("select.breadthFirst && select.querySelectorAll", t => {
	t.plan(3)

	const getTags = select.querySelectorAll("tag_name")
	let expected = [ "v2.5.2", "v2.5.1", "v2.5.0", "v2.4.1", "v2.4.0", "v2.3.4", "v2.3.3", "v2.3.2", "v2.3.1", "v2.3.0", "v2.2.1", "v2.2.0", "v2.1.3", "v2.1.2", "v2.1.1", "v2.1.0", "v2.0.2", "v2.0.1", "v2.0.0", "v1.3.1" ]
	let actual = getTags(releases)
	t.same(actual, expected, "should collect all occurances of 'tag_name'")

	expected = [ "v2.5.2" ]
	actual = getTags(latest)
	t.same(actual, expected, "should collect all occurances of 'tag_name'")

	// this test is made because breadthFirstCollect never hits the last line
	// 'return ret' if the JSON data has a depth above 1
	expected = [ "v2.5.2" ]
	actual = getTags(small)
	t.same(actual, expected, "should collect all occurances of 'tag_name'")
})

tap.test("select.breadthFirst && select.querySelector", t => {
	t.plan(2)

	const getTag  = select.querySelector("tag_name")

	let expected = "v2.5.2"
	let actual = getTag(releases)
	t.same(actual, expected, "should find the first occurance of 'tag_name'")

	// explicitly set search strategy to breadth-first (which is the default)
	// to get 100% code coverage
	select.searchStrategy = select.breadthFirst
	expected = "v2.5.2"
	actual = getTag(latest)
	t.same(actual, expected, "should find the first occurance of 'tag_name'")	
})

tap.test("select.deepFirst && select.querySelectorAll", t => {
	t.plan(2)

	select.searchStrategy = select.deepFirst
	const getTags  = select.querySelectorAll("tag_name")

	let expected = [ "v2.5.2", "v2.5.1", "v2.5.0", "v2.4.1", "v2.4.0", "v2.3.4", "v2.3.3", "v2.3.2", "v2.3.1", "v2.3.0", "v2.2.1", "v2.2.0", "v2.1.3", "v2.1.2", "v2.1.1", "v2.1.0", "v2.0.2", "v2.0.1", "v2.0.0", "v1.3.1" ]
	let actual = getTags(releases)
	t.same(actual, expected, "should find the first occurance of 'tag_name'")

	expected = [ "v2.5.2" ]
	actual = getTags(latest)
	t.same(actual, expected, "should find the first occurance of 'tag_name'")
})

tap.test("select.deepFirst && select.querySelector", t => {
	t.plan(2)

	const getTag  = select.querySelector("tag_name")
	select.searchStrategy = select.deepFirst

	let expected = "v2.5.2"
	let actual = getTag(releases)
	t.same(actual, expected, "should find the first occurance of 'tag_name'")

	expected = "v2.5.2"
	actual = getTag(latest)
	t.same(actual, expected, "should find the first occurance of 'tag_name'")
})

tap.test("select.searchStrategies", t => {
	t.plan(1)

	const expected = {
		breadthFirst: 1,
		deepFirst: 2
	}
	const actual = select.searchStrategies
	t.same(actual, expected, "should give breadthFirst and deepFirst as strategies")
})
