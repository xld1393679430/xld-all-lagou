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
    console.log("componentWillReciveProps:::", nextProps);
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  changeMessage() {
    this.setState({
      message: "修改后的message",
    });
  }

  render() {
    const { title, hideBtn } = this.props;
    const { message } = this.state;

    return (
      <div>
        <div>title: {title}</div>
        <div>message: {message}</div>
        {hideBtn ? null : <button onClick={this.changeMessage}>改变mssage</button>}
      </div>
    );
  }
}

// 4,渲染类组件
// TinyReact.render(<Alert title="Hello Alert" />, root);

// 5, 更新类组件(组件是否是同一个组件)
// TinyReact.render(<Alert title="Hello Alert" />, root);
// setTimeout(() => {
//   TinyReact.render(<Alert title="Hello Alert222" />, root);

//   // TinyReact.render(<Demo />, root);
// }, 2000);

class DemoRef extends TinyReact.Component {
  constructor(props) {
    super(props);
    this.clickRef = this.clickRef.bind(this);
    this.clickRef2 = this.clickRef2.bind(this);
  }

  clickRef() {
    console.log(this.input.value);
  }

  clickRef2() {
    console.log(this.alertComent);
  }

  render() {
    return (
      <div>
        <input type="text" ref={(input) => (this.input = input)} />
        <button onClick={this.clickRef}>查看 input ref</button>

        <hr />
        <Alert hideBtn={true} ref={(com) => (this.alertComent = com)} />
        <button onClick={this.clickRef2}>查看组件ref</button>
      </div>
    );
  }
}

// 5, ref
// TinyReact.render(<DemoRef />, root);

class DemoKey extends TinyReact.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      persons: [
        {
          id: 1,
          name: "111",
        },
        {
          id: 2,
          name: "222",
        },
        {
          id: 3,
          name: "333",
        },
        {
          id: 4,
          name: "444",
        },
      ],
    };
  }

  handleChange() {
    const newState = JSON.parse(JSON.stringify(this.state));
    // newState.persons.push(newState.persons.shift())
    // newState.persons.splice(1, 0, { id: 9999, name: "999" });

    newState.persons.pop();
    this.setState(newState);
  }

  render() {
    const { persons } = this.state;
    return (
      <div>
        <ul>
          {persons.map((item, index) => {
            return <ol key={item.id}>{item.name}</ol>;
          })}
        </ul>
        <button onClick={this.handleChange}>改变列表</button>
      </div>
    );
  }
}

// 6, key
TinyReact.render(<DemoKey />, root);
