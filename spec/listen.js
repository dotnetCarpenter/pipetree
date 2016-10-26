"use strict"

const tap			= require("tap")
const fs			= require("fs")
const listen	= require("../lib/root").listen
const Listen	= require("../lib/root").Listen

tap.test("Listen object", t => {
	t.plan(1)

	let expected = new Listen 
	let actual = listen
	t.same(actual, expected, "listen is a shorthand for 'new Listen")

})

/*tap.test("Listen to another file descriptor", t => {
	t.plan(1)
	const listen = new Listen()
	const fileName = __dirname + "/fixtures/jasmine.zip" 
	
	let expected = fs.readFileSync(fileName)
	
	fs.open(fileName, 'r', 438, (err, fd) => {
		listen.to = fd
		listen.start()
		fd.on("end", doTest)
	})

	function doTest() {
		let actual = listen.collect()
		t.same(actual, expected)
	}
})
*/