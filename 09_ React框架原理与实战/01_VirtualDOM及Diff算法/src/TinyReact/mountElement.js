import isFunction from "./isFunction";
import mountComponent from "./mountComponent";
import mountNativeElement from "./mountNativeElement";

export default function mountElement(virtualDom, container, oldDom) {
  // 组件
  if (isFunction(virtualDom)) {
    mountComponent(virtualDom, container, oldDom);
  }
  // NativeElement
  else {
    mountNativeElement(virtualDom, container, oldDom);
  }
}
