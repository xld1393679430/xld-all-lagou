import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import TodoExtra from "./TodoExtra";
import "./index.css";

@inject('todos')
@observer
class Index extends Component {
  render() {
    const { todos } = this.props

    console.log(todos, 2222)

    return (
      <section className="todoapp">
        <AddTodo />

        <TodoList />

        <TodoExtra />
      </section>
    );
  }
}

export default Index;
