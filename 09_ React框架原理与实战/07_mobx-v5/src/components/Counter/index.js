import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("counter")
@observer
class Index extends Component {
  render() {
    console.log(222, this.props.counter);
    const { count, increment, decrement } = this.props.counter;
    return (
      <div>
        <button onClick={increment}>+1</button>
        <span>{count}</span>
        <button onClick={decrement}>-1</button>
      </div>
    );
  }
}
export default Index;
