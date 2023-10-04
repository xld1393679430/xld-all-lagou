import React, { Component, useEffect } from "react";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";

@inject("counter")
@observer
class Index extends Component {
  componentDidMount() {
    const { getData } = this.props.counter;
    getData();
  }

  render() {
    const { count, users, increment, decrement } = this.props.counter;
    const _users = toJS(users);
    return (
      <div>
        <button onClick={increment}>+1</button>
        <span>{count}</span>
        <button onClick={decrement}>-1</button>
        <hr />
        <ul>
          {_users.map((item) => {
            return <li key={item.id}>{item.login}</li>;
          })}
        </ul>
      </div>
    );
  }
}
export default Index;
