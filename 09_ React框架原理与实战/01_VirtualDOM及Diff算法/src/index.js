import TinyReact from "./TinyReact";

const root = document.getElementById("root");

const virtualDom = (
  <div className="container">
    <h1>你好 Tiny React</h1>
    <h2 data-test="test">节点属性会被更新</h2>
    <div>
      嵌套1 <div>嵌套1.1</div>
    </div>
    <h3>(观察：这个将会被改变)</h3>
    {2 == 1 && <div> 2 == 1 </div>}
    {2 == 2 && <div> 2 == 2 </div>}
    <button onClick={() => alert("你好")}>点击</button>
    <h3>这个将会被删除</h3>
    <div>
      <input type="text" value="123" />
    </div>
  </div>
);

const virtualDom2 = (
  <div className="container">
    <h1>你好 Tiny React</h1>
    <h2 data-test="test222">节点属性会被更新</h2>
    <div>
      嵌套1 <div>嵌套1.1</div>
    </div>
    <h3>(观察：这个将会被改变222)</h3>
    {2 == 1 && <div> 2 == 1 </div>}
    {2 == 2 && <div> 2 == 2 </div>}
    <button onClick={() => alert("你好222")}>点击</button>
    <div>
      <input type="text" value="222" />
    </div>
  </div>
);

// 1,渲染html
// TinyReact.render(virtualDom, root);

// 2,更新html
// TinyReact.render(virtualDom, root);
// setTimeout(() => {
//   TinyReact.render(virtualDom2, root);
// }, 2000);

function Demo() {
  return <div>Hello Demo</div>;
}

function Head(props) {
  return (
    <div>
      <p>{props.title}</p>
      <Demo />
    </div>
  );
}

// 3,渲染函数组件
// TinyReact.render(<Head title="Hello Head" />, root);

class Alert extends TinyReact.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "default title",
    };
    this.changeMessage = this.changeMessage.bind(this);
  }

  componentWillReciveProps(nextProps) {
    console.log('componentWillReciveProps:::', nextProps);
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  changeMessage() {
    this.setState({
      message: "修改后的message",
    });
  }

  render() {
    const { title } = this.props;
    const { message } = this.state;

    return (
      <div>
        <div>title: {title}</div>
        <div>message: {message}</div>
        <button onClick={this.changeMessage}>改变mssage</button>
      </div>
    );
  }
}

// 4,渲染类组件
// TinyReact.render(<Alert title="Hello Alert" />, root);

// 5, 更新类组件(组件是否是同一个组件)
TinyReact.render(<Alert title="Hello Alert" />, root);
setTimeout(() => {
  TinyReact.render(<Alert title="Hello Alert222" />, root);

  // TinyReact.render(<Demo />, root);
}, 2000);
