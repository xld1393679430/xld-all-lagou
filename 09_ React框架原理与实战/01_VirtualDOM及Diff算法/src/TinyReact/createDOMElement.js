import mountElement from "./mountElement";
import updateNodeElement from "./updateNodeElement";

export default function createDomElement(virtualDom) {
  let newElement = null;
  if (virtualDom.type === "text") {
    newElement = document.createTextNode(virtualDom.props.textContent);
  } else {
    newElement = document.createElement(virtualDom.type);
    updateNodeElement(newElement, virtualDom)
  }

  newElement._virtualDom = virtualDom

  // 递归创建子节点
  virtualDom.children.forEach((child) => {
    mountElement(child, newElement);
  });

  return newElement;
}
