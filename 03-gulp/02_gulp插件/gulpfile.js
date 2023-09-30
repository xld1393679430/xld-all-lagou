const { src, dest } = require("gulp")
const cleanCss = require("gulp-clean-css") // css压缩插件
const rename = require("gulp-rename") // 重命名插件

// 使用gulp插来压缩css文件
exports.default = () => {
	return src("./*.css")
	.pipe(cleanCss())
	.pipe(rename({
		extname: ".min.css"
	}))
	.pipe(dest("dist"))
}