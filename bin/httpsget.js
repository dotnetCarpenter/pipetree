#!/usr/bin/env node

'use strict'

const https		= require('follow-redirects').https
const url			= require('url')
const listen	= require('../lib/root').listen

const searchPattern = {
	// extremely lenient URL matcher - https://tools.ietf.org/html/rfc3986
	// non-capture groups and lazy quantifier (*?) are for performance
	// <protocall>? <domain-prefix>? <domain> <TLD> 
	// where sections marked with ? is optional
	// <protocall> must start with letter
	// <domain-prefix> must be //
	// <domain> is at least one character and none of the reserved characters; space, :, /, ?, # or @
	// <TLD> is not a space and at least one character
	url: p => /^(?:\w+\:)?(?:\/{2})?[^\s\:\/\?#\[\]@]+?\.\S+?$/.test(p)
}

main()

/** FIXME: un-do chaos
 * 1. pass url directly - search for https? argv[2] is not equal uri
 * 2. listen for url on stdin
 */
function main() {
	const url = searchParameters(process.argv, searchPattern.url)

	if( url.length ) setup(url[0])
	else { // listen for piped input
		listen.start()
		process.stdin.on('end', () => {
			setup(listen.collect())
		})
	}
}

function setup(parameters) {
	const uri = url.parse(parameters)
	const options = {
		hostname: uri.hostname, //'api.github.com',
		path: uri.path, //'/repos/jasmine/jasmine/releases',
		method: 'GET',
		headers: {
			'User-Agent': 'dotnetCarpenter/pipetree',
			'Accept': 'application/vnd.github.v3+json'
		}
	}
	const req = https.get(options, res => {
	/*	console.log('statusCode:', res.statusCode)
		console.log('headers:', res.headers)*/

		
		res.pipe(process.stdout)
	})

	req.on('error', (e) => {
		console.error(JSON.stringify(e))
	})
}

function searchParameters(param, pattern) {
	return param.filter(pattern)
}