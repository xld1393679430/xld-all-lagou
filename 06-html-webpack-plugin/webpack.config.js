const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: "none",
	entry: "./src/main.js",
	output: {
		filename: "bundle.js",
		path: path.join(__dirname, 'dist'),
	},
	module: {
		
	},
	plugins: [
		// 用于生成index.html
		new HtmlWebpackPlugin({
			title: "Webpack Plugin Sample",
			meta: {
				viewport: 'width=device-width'
			},
			template: './src/index.html'
		}),
		// 用于生成about.html
		new HtmlWebpackPlugin({
			filename: 'about.html'
		})
	]
}