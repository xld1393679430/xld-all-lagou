/**
 * lodash的fp模块
 */

const fp = require("lodash/fp")

const f = fp.flowRight(fp.join("-"), fp.map(fp.toLower), fp.split(" "))

const result = f("Hello World")

console.log(result); // log: hello-world
