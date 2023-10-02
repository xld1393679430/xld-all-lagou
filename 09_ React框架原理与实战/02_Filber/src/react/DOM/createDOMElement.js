import updateNodeElement from "./updateNodeElement";

export default function createDomElement(virtualDom) {
  let newElement = null;
  if (virtualDom.type === "text") {
    newElement = document.createTextNode(virtualDom.props.textContent);
  } else {
    newElement = document.createElement(virtualDom.type);
    updateNodeElement(newElement, virtualDom)
  }

  return newElement;
}
