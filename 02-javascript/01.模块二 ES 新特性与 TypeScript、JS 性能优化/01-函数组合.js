/**
 * 取数组翻转后的第一位并将其大写
 */

const array = ["one", "two", "three"];
const reverse = arr => arr.reverse()
const first = arr => arr[0]
const toUpper = s => s.toUpperCase()

// const componse = function(...fns) {
// 	return function(arr) {
// 		return fns.reduce((acc, fn) => {
// 			return fn(acc)
// 		}, arr)
// 	}
// }

// const f = componse(reverse, first, toUpper)

// const result = f(array)


// 使用箭头函数优化
const componse = (...fns) => arr => fns.reduce((acc, fn) => fn(acc), arr)

// 将数组翻转后取
const f = componse(reverse, first, toUpper)

const result = f(array)

console.log(result, '--result--')