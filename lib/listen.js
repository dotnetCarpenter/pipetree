'use strict'

let collect
let fileDescriptor = process.stdin
let fileEncoding = 'utf8'

function start(collectType = collectString()) {
	collect = collectType
	setupFileDescriptor(fileDescriptor)
}

function collectString() {
	let chunk = ''
	return data => data ? chunk += data.toString().trim() :	chunk
}

function setupFileDescriptor(fd) {
	if(fileEncoding) fd.setEncoding(fileEncoding)
	fd.on('data', collect)
}

module.exports = {
	start,
	collect: () => collect(),
	collectJSON: () => JSON.parse(collect()),
	set to(fd) {
		fileDescriptor = fd
	},
/*get to() {
		return fileDescriptor
	},*/
	set encoding(enc) {
		fileEncoding = enc
	}
}