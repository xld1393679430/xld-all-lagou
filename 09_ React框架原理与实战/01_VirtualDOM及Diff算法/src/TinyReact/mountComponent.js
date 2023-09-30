import isFunction from "./isFunction";
import isFunctionComponent from "./isFunctionComponent";
import mountNativeElement from "./mountNativeElement";

export default function mountComponent(virtualDom, container, oldDom) {
  let nextVirtualDom = null;
  let component = null;
  // 函数组件
  if (isFunctionComponent(virtualDom)) {
    nextVirtualDom = buildFunctionComponent(virtualDom);
  } 
  // 类组件
  else {
    nextVirtualDom = buildClassComponent(virtualDom);
    component = nextVirtualDom.component
  }

  if (isFunction(nextVirtualDom)) {
    mountComponent(nextVirtualDom, container, oldDom);
  } else {
    mountNativeElement(nextVirtualDom, container, oldDom);
  }

  if (component) {
    component.componentDidMount()
    if (component.props && component.props.ref) {
      component.props.ref(component)
    }
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
