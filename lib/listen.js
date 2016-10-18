'use strict'

class	Listen {
	constructor() {
		this.collect
		this.fileDescriptor = process.stdin
		this.fileEncoding = "utf8"
	}

	set to(fd) {
		this.fileDescriptor = fd
	}
	/*get to() {
		return fileDescriptor
	}*/

	set encoding(enc) {
		this.fileEncoding = enc
	}

	start(collectType = Listen.collectString()) {
		this.collect = collectType
		this.setupFileDescriptor(this.fileDescriptor)
	}

	setupFileDescriptor(fd) {
		if(this.fileEncoding) fd.setEncoding(this.fileEncoding)
		fd.on('data', this.collect)
	}

	collect() {
		return this.collect()
	}

	collectJSON() {
		return JSON.parse(this.collect())
	}

	static collectString() {
		let chunk = ''
		return data => data ? chunk += data.toString().trim() :	chunk
	}
}

module.exports = {
	listen: new Listen,
	Listen: Listen
}
