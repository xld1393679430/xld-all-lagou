import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("todos")
@observer
class Index extends Component {
  render() {
    const { list, unFinishedCount, deleteTodo, changeCompleted, currentFilter, changeFilter, FILTERS } =
      this.props.todos;

    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{unFinishedCount}</strong> item left
        </span>
        <ul className="filters">
          {FILTERS.map((item) => (
            <li key={item}>
              <button onClick={() => changeFilter(item)} className={currentFilter === item ? "selected" : ""}>
                {item}
              </button>
            </li>
          ))}
        </ul>

        <button className="clear-completed">Clear completed</button>
      </footer>
    );
  }
}

export default Index;
