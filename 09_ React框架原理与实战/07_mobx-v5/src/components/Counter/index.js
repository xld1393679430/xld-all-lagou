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
    const { counter } = this.props;
    const { count, users, price, username, changeUserName, totalPrice, increment, decrement } = counter;
    const _users = toJS(users);
    return (
      <div>
        <button onClick={increment}>count + 1</button>
        <button onClick={decrement}>count - 1</button>
        <div>
          <p>count: {count}</p>
          <p>price: {price}</p>
          <p>totalPrice count * price = {totalPrice}</p>
        </div>

        <hr />
        <input type="text" value={username} onChange={(e) => changeUserName(e.target.value)} />
        <p>username（输入admin或其他查看效果）： {username}</p>
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
