import diff from "./diff";

export default function updateComponent(virtualDom, oldComponent, oldDom, container) {
  oldComponent.componentWillReciveProps(virtualDom.props);

  const shouldUpdate = oldComponent.shouldComponentUpdate(virtualDom.props);
  if (shouldUpdate) {
    // 未更新前的props
    let prevProps = oldComponent.props;

    oldComponent.componentWillUpdate(virtualDom.props);
    // 组件更新
    oldComponent.updateProps(virtualDom.props);
    // 获取组件返回的最新的virtualDom
    let nextVirtualDom = oldComponent.render();
    // 更新component 组件实例对象
    nextVirtualDom.component = oldComponent;
    diff(nextVirtualDom, container, oldDom);

    oldComponent.componentDidUpdate(prevProps);
  }
}
