import TinyReact from "./TinyReact";

const virtualDOM = (
  <div className="container">
    <h1>你好 Tiny React</h1>
    <h2 data-test="test">(编码必杀技)</h2>
    <div>
      嵌套1 <div>嵌套1.1</div>
    </div>
    <h3>(观察：这个将会被改变)</h3>
    {2 == 1 && <div> 2 == 1 </div>}
    {2 == 2 && <div> 2 == 2 </div>}
    <button onClick={() => alert("你好")}>点击</button>
    <h3>这个将会被删除</h3>
    <input type="text" value="123" />
  </div>
);

const root = document.getElementById("root");

// 渲染html标签
// TinyReact.render(virtualDOM, root);

function Demo(){
  return <div>Hello</div>
}

function Head() {
  return (
    <Demo />
  )
}

// 渲染函数组件
TinyReact.render(<Head />, root);
