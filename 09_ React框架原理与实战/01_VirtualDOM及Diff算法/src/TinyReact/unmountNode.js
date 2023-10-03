export default function unmountNode(node) {
  const virtualDom = node._virtualDom;
  // 1,文本节点可以直接删除
  if (virtualDom.type === "text") {
    node.remove();
    return;
  }
  // 2, 判断节点是否是有组件生成的
  let component = virtualDom.component;
  // 执行组件的componentWillUnmount
  if (component) {
    component.componentWillUnmount();
  }
  // 清除节点的ref属性
  if (virtualDom.props && virtualDom.props.ref) {
    virtualDom.props.ref(null);
  }
  // 清楚节点的事件处理函数
  Object.keys(virtualDom.props).forEach((propsName) => {
    if (propsName.slice(0, 2) === "on") {
      const enventName = propsName.toLowerCase().slice(0, 2);
      const eventHandler = virtualDom.props[enventName];
      node.removeEventListener(enventName, eventHandler);
    }
  });

  // 递归删除子节点
  if (node.childNodes.length > 0) {
    for (let i = 0; i < node.childNodes.length; i++) {
      unmountNode(node.childNodes[i]);
      i--;
    }
  }

  // 删除节点
  node.remove();
}
