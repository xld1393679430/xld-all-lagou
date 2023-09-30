const fs = require("fs")
const path = require("path")
const { marked } = require("marked")
const puppeteer = require("puppeteer")
const { cosmiconfigSync } = require("cosmiconfig")
/**
 * md文件转图片
 * @param {*} input  输入md文件路径 (可能是相对路径，也可能是绝对路径)
 * @param {*} output 输入图片路径
 * @param {*} width  输入图片宽度
 * @returns
 */
module.exports = async (input, options) => {
  if (typeof input !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof input}`)
  }

  options = Object.assign({}, options)

  // 1, 读取input文件对应的文件内容
  const filename = path.resolve(process.cwd(), input)
  if (!fs.existsSync(filename)) {
    throw new Error(`文件不存在`)
  }
  const stat = fs.statSync(filename)
  if (stat.isDirectory()) {
    throw new Error(`给定路径名称不是一个文件`)
  }
  const contents = fs.readFileSync(input, "utf8")
  // 2, 使用marked 将md文件转换成html
  const fragment = marked(contents)
  // 加载配置文件中的模版 配置文件名称 .md2pngrc
  const explorer = cosmiconfigSync("md2png")
  const { config = {} } = explorer.search(process.cwd()) || {}
  // 为markdown添加样式
  const html = config.template.replace("${fragment}", fragment)
  const width = Number(options.width || 800)
  // 3, html -> 图片
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width, height: width })
  await page.setContent(html)
  await page.screenshot({ path: options.output, fullPage: true })
  process.exit()
}
