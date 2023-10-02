import React, { render, Component } from './react'

const root = document.getElementById('root')

const jsx = (
	<div>
		<p>Hello React</p>
		<p>Hello Filber</p>
	</div>
)

// 1, 渲染基础节点
// render(jsx, root)

class Greating extends Component {
	constructor(props) {
		super(props)
	}
  
	render() {
		return (
			<div>Hello Greating</div>
		)
	}
}

// 2,渲染类组件
render(<Greating />, root)