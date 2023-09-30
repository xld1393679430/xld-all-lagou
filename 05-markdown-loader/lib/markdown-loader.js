const { marked } = require("marked")

module.exports = source => {
	console.log(source, '---source')

	// 直接返回字符串会报错： You may need an additional loader to handle the result of these loaders.
	// 需要返回一个JavaScript代码 如下
	// return 'hello ->' 

	// 返回这样的返回JavaScript代码 不会报错
	// return `console.log("hello ->")`

	const html = marked(source)
	//  直接返回html需要配合html-loader
	return html;

}