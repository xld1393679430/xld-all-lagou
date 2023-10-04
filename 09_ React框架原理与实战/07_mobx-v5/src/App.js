import React from "react";
import Counter from "./components/Counter";
import Todos from "./components/Todos";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        {/* <Counter /> */}
        <Todos />
      </div>
    );
  }
}

export default App;
