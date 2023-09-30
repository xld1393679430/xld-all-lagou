import mountElement from "./mountElement";

export default function diffComponent(virtualDom, oldComponent, oldDom, container) {
	if (isSameComponent(virtualDom, oldComponent)) {
	} else {
		mountElement(virtualDom, container, oldDom)
	}
}

function isSameComponent(virtualDom, oldComponent) {
	return oldComponent &&  virtualDom.type === oldComponent.constructor
}