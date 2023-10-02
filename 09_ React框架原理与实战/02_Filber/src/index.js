import React, { render, Component } from "./react";

const root = document.getElementById("root");

const jsx = (
  <div>
    <p>Hello React</p>
    <p>Hello Filber</p>
  </div>
);

// 1, 渲染基础节点
// render(jsx, root)

// 4, 更新基础节点
render(jsx, root);
setTimeout(() => {
  const jsx2 = (
    <div>
      <div>Hello React222</div>
      <p>Hello Filber222</p>
    </div>
  );
  render(jsx2, root);
}, 2000);

class Greating extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title } = this.props;
    return <div>Hello Greating. title: {title}</div>;
  }
}

// 2,渲染类组件
// render(<Greating title={"我是title"} />, root)

function FnComponent({ title }) {
  return <div>Hello Function Component. title: {title}</div>;
}

// 3,渲染函数组件
// render(<FnComponent title={"我是title"} />, root);
