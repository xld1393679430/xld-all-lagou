import mountNativeElement from "./mountNativeElement";

export default function mountElement(virtualDOM, container) {
	// 比较是普通标签还是组件
	mountNativeElement(virtualDOM, container)
}