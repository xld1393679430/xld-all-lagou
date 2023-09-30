#!/usr/bin/env node

const program = require("commander")
const pkg = require("../package.json")
const md2png = require("..")

program
  .version(pkg.version)
  .usage("<input>") // md文件路径
  .option("-o, --output <output>", "输出图片文件路径")
  .option("-w, --width <width>", "输出图片宽度")
  .on("--help", console.log)

program.parse(process.argv)
  .args.length || program.help()


const [input] = program.args
const { output, width } = program.opts();

console.log(input, output, width, 222);
//TODO
console.log(md2png(input, { output, width }));

