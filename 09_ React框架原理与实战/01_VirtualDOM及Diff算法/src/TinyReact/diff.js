import createDomElement from "./createDomElement";
import diffComponent from "./diffComponent";
import mountElement from "./mountElement";
import unmountNode from "./unmountNode";
import updateNodeElement from "./updateNodeElement";
import updateTextNode from "./updateTextNode";

export default function diff(virtualDom, container, oldDom) {
  const oldVirtualDom = oldDom && oldDom._virtualDom;
  const oldComponent = oldVirtualDom && oldVirtualDom.component
  if (!oldDom) {
    mountElement(virtualDom, container);
  } else if (virtualDom.type !== oldVirtualDom.type && typeof virtualDom.type !== "function") {
    const newElement = createDomElement(virtualDom);
    oldDom.parentNode.replaceChild(newElement, oldDom);
  } else if (typeof virtualDom.type === "function") {
    diffComponent(virtualDom, oldComponent, oldDom, container);
  } else if (oldVirtualDom && virtualDom.type === oldVirtualDom.type) {
    if (virtualDom.type === "text") {
      // 更新内容
      updateTextNode(virtualDom, oldVirtualDom, oldDom);
    } else {
      // 更新元素节点属性
      updateNodeElement(oldDom, virtualDom, oldVirtualDom);
    }

    // 对比子节点
    virtualDom.children.forEach((child, index) => {
      diff(child, oldDom, oldDom.childNodes[index]);
    });

    // 删除节点
    let oldChildNodes = oldDom.childNodes;
    if (oldChildNodes.length > virtualDom.children.length) {
      for (let i = oldChildNodes.length - 1; i > virtualDom.children.length - 1; i--) {
        unmountNode(oldChildNodes[i]);
      }
    }
  }
}
