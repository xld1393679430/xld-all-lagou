const fs = require("fs")
const { Transform } = require("stream")

// 将test.css文件进行压缩，去除空格和注释
exports.default = () => {
	// 文件读取流
	const read = fs.createReadStream("./test.css")

	// 文件转换率
	const transform = new Transform({
		transform: (chunk, encoding, callback) => {
			// 核心转换过程时间
			// chunk => 读取流中读取到的内容（Buffer）
			const input = chunk.toString()
			const output = input.replace(/\s+/g, "").replace(/\/\*.+?\*\//g, "")
			callback(null, output)
		}
	})

	// 文件写入流
	const write = fs.createWriteStream("./test.mim.css")

	read
		.pipe(transform)
		.pipe(write)

	return read
}