import { root } from "../../index";
import App from "../../App";

let state = [],
  setters = [],
  stateIndex = 0,
  prevDepths = [],
  effectIndex = 0;

const getObjectType = (obj) => Object.prototype.toString.call(obj);

function render() {
  stateIndex = 0;
  effectIndex = 0;
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

function useEffect(callback, depth) {
  if (getObjectType(callback) !== "[object Function]") {
    throw new Error("useEffect第一个参数必须是函数");
  }
  if (typeof depth === "undefined") {
    callback();
  } else {
    if (getObjectType(depth) !== "[object Array]") {
      throw new Error("useEffect第二个参数必须是数组");
    }
    const prevDepth = prevDepths[effectIndex];
    const hasChanged = prevDepth ? depth.some((dep, index) => dep !== prevDepth[index]) : true;
    if (hasChanged) {
      callback();
    }
    prevDepths[effectIndex] = depth;
    effectIndex += 1;
  }
}

const Index = () => {
  const [count, setCount] = useState(0);
  const [age, setAge] = useState(100);

  useEffect(() => {
    console.log("count");
  }, []);

  useEffect(() => {
    console.log("age");
  }, []);

  return (
    <div>
      <p>
        count: {count} -- age{age}
      </p>
      <button onClick={() => setCount(count + 1)}>setCount</button>
      <button onClick={() => setAge(age + 1)}>setAge</button>
    </div>
  );
};

export default Index;
