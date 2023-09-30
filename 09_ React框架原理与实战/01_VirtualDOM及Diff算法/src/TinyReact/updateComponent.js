import diff from "./diff"

export default function updateComponent(virtualDom, oldComponent, oldDom, container) {
	oldComponent.updateProps(virtualDom.props)
	let nextVirtualDom = oldComponent.render()
	nextVirtualDom.component = oldComponent
	diff(nextVirtualDom, container, oldDom)
}