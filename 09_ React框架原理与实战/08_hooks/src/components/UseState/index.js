import { root } from "../../index";
import App from "../../App";

let state = [],
  setters = [],
  stateIndex = 0;

function render() {
  stateIndex = 0;
  root.render(<App />);
}

function createSetter(index) {
  return function (newState) {
    state[index] = newState;
    render();
  };
}
function useState(initialState) {
  if (state[stateIndex] === undefined) {
    state[stateIndex] = initialState;
  }

  setters.push(createSetter(stateIndex));

  const value = state[stateIndex];
  const setValue = setters[stateIndex];

  stateIndex += 1;

  return [value, setValue];
}

const Index = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("张三");
  return (
    <div>
      <p>
        count: {count} -- name: {name}
      </p>
      <button onClick={() => setCount(count + 1)}>setCount</button>
      <button onClick={() => setName("李四")}>setName</button>
    </div>
  );
};

export default Index;
