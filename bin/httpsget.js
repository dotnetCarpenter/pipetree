#!/usr/bin/env node

"use strict"

const https			= require("follow-redirects").https
var urlParseLax = require("url-parse-lax")
const listen		= require("../lib/root").listen

const searchPattern = {
	url: p => !!urlParseLax(p).hostname// && !searchPattern.buffer(p)
	/*, buffer: p => /(?:^--buffer$)|(?:^-b$)/.test(p)*/
}

main()

function main() {
	const url = searchParameters(process.argv, searchPattern.url)
	//const buffer = searchParameters(process.argv, searchPattern.buffer)

	if( url.length ) get(url[0])
	else { // listen for piped input
		/*if( buffer.length ) listen.start(listen.collectBuffer)
		else*/
		listen.start()
		process.stdin.on("end", () => {
			get(listen.collect())
		})
	}
}

function get(parameters) {
	const uri = urlParseLax(parameters)
	const options = {
		hostname: uri.hostname,
		path: uri.path,
		port: uri.port || 443,
		method: "GET",
		headers: {
			"User-Agent": "dotnetCarpenter/pipetree",
			"Accept": "application/vnd.github.v3+json"
		}
	}
	const req = https.get(options, res => {
	/*	console.log("statusCode:", res.statusCode)
		console.log("headers:", res.headers)*/
		res.pipe(process.stdout)
	})

	req.on("error", (e) => {
		console.error(JSON.stringify(e))
	})
}

function searchParameters(param, pattern) {
	return param.filter(pattern)
}
