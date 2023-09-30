export default function updateTextNode(virtualDom, oldVirtualDom, oldDom) {
	if (virtualDom.props.textContent !== oldVirtualDom.props.textContent) {
		oldDom.textContent = virtualDom.props.textContent
		oldDom._virtualDom = virtualDom
	}
}