import isFunction from "./isFunction";
import isFunctionComponent from "./isFunctionComponent";
import mountNativeElement from "./mountNativeElement";

export default function mountComponent(virtualDom, container, oldDom) {
  let nextVirtualDom = null;
  // 判读类组件还是函数组件
  if (isFunctionComponent(virtualDom)) {
    nextVirtualDom = buildFunctionComponent(virtualDom);
  } else {
    nextVirtualDom = buildClassComponent(virtualDom);
  }
  if (isFunction(nextVirtualDom)) {
    mountComponent(nextVirtualDom, container, oldDom);
  } else {
    mountNativeElement(nextVirtualDom, container, oldDom);
  }
}

function buildFunctionComponent(virtualDom) {
  return virtualDom.type(virtualDom.props || {});
}

function buildClassComponent(virtualDom) {
  const component = new virtualDom.type(virtualDom.props || {});
  const nextVirtualDom = component.render();
  nextVirtualDom.component = component;
  return nextVirtualDom;
}
