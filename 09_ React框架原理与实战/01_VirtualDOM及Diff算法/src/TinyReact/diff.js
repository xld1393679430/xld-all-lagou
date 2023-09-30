import createDomElement from "./createDomElement";
import diffComponent from "./diffComponent";
import mountElement from "./mountElement";
import unmountNode from "./unmountNode";
import updateNodeElement from "./updateNodeElement";
import updateTextNode from "./updateTextNode";

export default function diff(virtualDom, container, oldDom) {
  const oldVirtualDom = oldDom && oldDom._virtualDom;
  const oldComponent = oldVirtualDom && oldVirtualDom.component;
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

    // 1，将拥有key属性的子元素放置在一个单独的对象中
    let keyedElements = {};
    for (let i = 0, len = oldDom.childNodes.length; i < len; i++) {
      let domElement = oldDom.childNodes[i];
      if (domElement.nodeType === 1) {
        let key = domElement.getAttribute("key");
        if (key) {
          keyedElements[key] = domElement;
        }
      }
    }

    let hasNoKey = Object.keys(keyedElements).length === 0;
    if (hasNoKey) {
      // 对比子节点
      virtualDom.children.forEach((child, index) => {
        diff(child, oldDom, oldDom.childNodes[index]);
      });
    } else {
      // 2,循环 virtualDom 的子元素 获取子元素的key属性
      virtualDom.children.forEach((child, index) => {
        let key = child.props.key;
        if (key) {
          let domElement = keyedElements[key];
          if (domElement) {
            if (oldDom.childNodes[index] && oldDom.childNodes[index] !== domElement) {
              oldDom.insertBefore(domElement, oldDom.childNodes[index]);
            }
          } else {
            // 新增元素
            mountElement(child, oldDom, oldDom.childNodes[index])
          }
        }
      });
    }

    // 删除节点
    let oldChildNodes = oldDom.childNodes;
    if (oldChildNodes.length > virtualDom.children.length) {
      if (hasNoKey) {
        for (let i = oldChildNodes.length - 1; i > virtualDom.children.length - 1; i--) {
          unmountNode(oldChildNodes[i]);
        }
      } else {
        // 通过key属性删除节点
        for (let i = 0; i < oldChildNodes.length; i++) {
          let oldChild = oldChildNodes[i]
          let oldChildKey = oldChild._virtualDom.props.key
          let found = false
          for (let n = 0; i < virtualDom.children.length; n++)  {
            if (oldChildKey === virtualDom.children[n].props.key) {
              found = true;
              break;
            }
          }

          if (!found) {
            unmountNode(oldChild)
          }
        }
      }
    }
  }
}
