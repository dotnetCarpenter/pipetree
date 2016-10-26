'use strict'

const strategyEnum = {
	breadthFirst: 1,
	deepFirst: 2
}
const strategies = {
	1: [ breadthFirst, breadthFirstCollect ],
	2: [ deepFirst, deepFirstCollect ]
}
let useOnEnd
// default strategy is breadthFirst
let strategy = 1|0

function setup(f) {
	process.stdin.on('end', f)
}

function main() {
	setup(useOnEnd)
}

function querySelector(query) {
	return data => strategies[strategy][0](data, query)
	//return data => deepFirst(data, query)
	//return data => breadthFirst(data, query)
}

function querySelectorAll(query) {
	return data => strategies[strategy][1](data, query)
	//return data => deepFirstCollect(data, query)
	//return data => breadthFirstCollect(data, query)
}

function breadthFirst(data, query, queue = []) {
	let ret

	iterate(data, (key, value) => {
		if(typeof value === 'object') queue.push( value )
		if(Object.is(key, query)) return ret = value
	})
//	console.log(`breadthFirst: ret = ${ret} and queue.length = ${queue.length}`)

	if(ret) { return ret }	
	if(queue.length) {return breadthFirst(queue.shift(), query, queue)}
}

function deepFirst(data, query) {
	let ret

	iterate(data, (key, value) => {
		if(typeof value === 'object') return ret = deepFirst(value, query)
		if(Object.is(key, query)) return ret = value
	})

	return ret
}

function breadthFirstCollect(data, query, queue = [], ret = []) {
	if(data == null) return ret
	iterate(data, (key, value) => {
		if(typeof value === 'object') queue.push( value )
		if(Object.is(key, query)) ret.push(value)
	})

	//console.log(`breadthFirstCollect: ret = ${ret} and queue.length = ${queue.length}`)

	if(queue.length) return breadthFirstCollect(queue.shift(), query, queue, ret)

	return ret
}

function deepFirstCollect(data, query, ret = []) {
	if(data == null) return ret
	iterate(data, (key, value) => {
		if(typeof value === 'object') deepFirstCollect(value, query, ret)
		if(Object.is(key, query)) ret.push(value)
	})
	return ret
}

function iterate(it, f) {
	for(const value in it)
		if( it.hasOwnProperty(value) && f(value, it[value]) ) return
}

module.exports = {
	set use(f) {
		useOnEnd = f
	},
	set searchStrategy(s) {
		strategy = s|0
	},
	get searchStrategies() {
		return strategyEnum
	},
	get breadthFirst() {
		return strategyEnum.breadthFirst
	},
	get deepFirst() {
		return strategyEnum.deepFirst
	},
	start: main,
	querySelector,
	querySelectorAll
}
