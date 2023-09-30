import mountElement from "./mountElement";
import updateComponent from "./updateComponent";

export default function diffComponent(virtualDom, oldComponent, oldDom, container) {
	if (isSameComponent(virtualDom, oldComponent)) {
		updateComponent(virtualDom, oldComponent, oldDom, container)
	} else {
		mountElement(virtualDom, container, oldDom)
	}
}

function isSameComponent(virtualDom, oldComponent) {
	return oldComponent &&  virtualDom.type === oldComponent.constructor
}