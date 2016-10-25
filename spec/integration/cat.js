#!/usr/bin/env node

"use strict"

const fs = require("fs")

fs.createReadStream(process.argv[2])
	.on("error", console.error)
	.pipe(process.stdout)

/*
const files = process.argv.slice(2)
const pipe = (stream, fileDescriptor) => stream.pipe(fileDescriptor)

forEach(files, (file, i, files) => {
	const stream = fs.createReadStream(file)
		.on("error", err => {
			console.error(`cat: ${err.message}`)
			console.log(files)
		})

	if(i === 0)	pipe(stream, process.stdout)
	else files[i-1].on('end', pipe.bind(null, stream, process.stdout))

	return stream
})

function forEach(arr, f) {
	const r = []
	arr.forEach((file, i, files) => {
		const trans = r.concat(files).slice(0, files.length)
		r.push( f(file, i, trans) )
	})
}
*/
