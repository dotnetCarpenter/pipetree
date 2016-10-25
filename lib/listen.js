'use strict'

class	Listen {
	constructor(fd = process.stdin) {
		this.collect
		this.fileDescriptor = fd
		//this.fileEncoding = "utf8"
	}

	set to(fd) {
		this.fileDescriptor = fd
	}
	/*get to() {
		return this.fileDescriptor
	}*/

	/*set encoding(enc) {
		this.fileEncoding = enc
	}*/

	start(collectType = Listen.collectString()) {
		this.collect = collectType
		this.setupFileDescriptor(this.fileDescriptor)
	}

	setupFileDescriptor(fd) {
		//if(this.fileEncoding) fd.setEncoding(this.fileEncoding)
		fd.on('data', this.collect)
		// seems that buffer is not needed and it's difficult to setup		
	}

	collect() {
		return this.collect()
	}

	collectJSON() {
		return JSON.parse(this.collect())
	}

	/*static collectBuffer() {
		let buffer = new Buffer(0)
		return data => data ? Buffer.concat([new Buffer(data)]) : buffer
	}*/

	static collectString() {
		let chunk = ''
		return data => data ? chunk += data.toString().trim() :	chunk
	}
}

module.exports = {
	listen: new Listen,
	Listen: Listen
}
