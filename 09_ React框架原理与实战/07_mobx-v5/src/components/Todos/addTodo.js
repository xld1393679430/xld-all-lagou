import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("todos")
@observer
class Index extends Component {
  handleAdd = (e) => {
    const { addTodo } = this.props.todos;
    if (e.key === "Enter") {
      const taskName = e.target.value;
      if (taskName.trim().length === 0) {
        return;
      }
      addTodo(taskName);
      e.target.value = "";
    }
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input onKeyUp={this.handleAdd} className="new-todo" placeholder="What needs to be done?" />
      </header>
    );
  }
}

export default Index;
