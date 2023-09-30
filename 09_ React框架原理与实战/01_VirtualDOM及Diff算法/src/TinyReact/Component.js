import diff from "./diff";

export default class Component {
	constructor(props) {
		this.props = props;
	}

	setState(state) {
		this.state = Object.assign({}, this.state, state)
		let virtualDOM = this.render()
		let oldDom = this.getDom()
		let container = oldDom.parentNode
		diff(virtualDOM, container, oldDom)
	}

	setDom(dom) {
		this._dom = dom
	}

	getDom() {
		return this._dom
	}
}