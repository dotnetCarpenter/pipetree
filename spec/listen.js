"use strict"

const tap			= require("tap")
const listen	= require("../lib/root").listen
const Listen	= require("../lib/root").Listen

tap.test("Listen object", t => {
	t.plan(1)

	let expected = new Listen 
	let actual = listen
	t.same(actual, expected, "listen is a shorthand for 'new Listen")

})
