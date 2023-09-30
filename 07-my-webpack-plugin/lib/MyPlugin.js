// 删除打包后bundle.js中的注释

class MyPlugin {
	apply(compiler) {
		console.log('MyPlugin 启动')

		compiler.hooks.emit.tap('MyPlugin', context => {
			// context:可以理解为此次打包的上下文
			for (const name in context.assets) {
				
				if (name.endsWith('.js')) {
					const content = context.assets[name].source()

					const withoutComments = content.replace(/\/\*+\*\//g, '')
					
					context.assets[name] = {
						source: () => withoutComments,
						size: () => withoutComments.length,
					}
				}
				
			}
		})
	}
}

module.exports = MyPlugin