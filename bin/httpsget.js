#!/usr/bin/env node

'use strict'

const https		= require('follow-redirects').https
const url			= require('url')
const listen	= require('./listen')

function setup(parameters) {
	const uri = url.parse(parameters)
	const options = {
		hostname: uri.hostname, //'api.github.com',
		path: uri.path, //'/repos/jasmine/jasmine/releases',
		method: 'GET',
		headers: {
			'User-Agent': 'dotnetCarpenter',
			'Accept': 'application/vnd.github.v3+json'
		}
	}
	const req = https.request(options, res => {
	/*	console.log('statusCode:', res.statusCode)
		console.log('headers:', res.headers)*/

		res.pipe(process.stdout)
	})
	req.end()

	req.on('error', (e) => {
		res.pipe(process.stderr)
	})
}

//FIXME: un-do chaos
function main() {
	const parameter = process.argv[2]

	if( /^http/.test(parameter) ) setup(parameter)
	else { // listen for piped input
		listen.start()
		process.stdin.on('end', () => {
			setup(listen.collect())
		})
	}
}

main()
