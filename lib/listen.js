'use strict'

const buffer = require("buffer")

class	Listen {
	constructor(fd = process.stdin) {
		this.collector
		this.fileDescriptor = fd
		this.fromEncoding = "utf8"
		this.toEncoding = "utf8"
	}

/*	set to(fd) {
		this.fileDescriptor = fd
	}*/
	/*get to() {
		return this.fileDescriptor
	}*/

	/*set encoding(enc) {
		this.fileEncoding = enc
	}*/

	start(collectType = Listen.collectString()) {
		this.collector = collectType
		this.setupFileDescriptor(this.fileDescriptor)
	}

	setupFileDescriptor(fd) {
		//if(this.fileEncoding) fd.setEncoding(this.fileEncoding)
		fd.on('data', this.collector)
				
	}

	collect() {
		return this.collector()
	}

	collectJSON() {
		return JSON.parse(this.collector())
	}

	static collectBuffer() {
		let chunk
		return data => data ?
			chunk = buffer.transcode(Buffer.from(data), this.fromEncoding, this.toEncoding) :
			chunk
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
