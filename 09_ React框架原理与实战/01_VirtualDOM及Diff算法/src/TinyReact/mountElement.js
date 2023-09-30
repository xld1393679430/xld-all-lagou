import isFunction from "./isFunction";
import mountComponent from "./mountComponent";
import mountNativeElement from "./mountNativeElement";

export default function mountElement(virtualDOM, container) {
  // 组件
  if (isFunction(virtualDOM)) {
    mountComponent(virtualDOM, container);
  }
  // NativeElement
  else {
    mountNativeElement(virtualDOM, container);
  }
}
