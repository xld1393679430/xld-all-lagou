import createDomElement from "./createDomElement";
import unmountNode from "./unmountNode";

export default function mountNativeElement(virtualDom, container, oldDom) {
  const newElement = createDomElement(virtualDom);

  if (oldDom) {
    container.insertBefore(newElement, oldDom);
  } else {
    container.appendChild(newElement);
  }

  // 判断旧的dom是否存在，存在则删除
  if (oldDom) {
    unmountNode(oldDom);
  }

  const component = virtualDom.component;
  if (component) {
    component.setDom(newElement);
  }
}
