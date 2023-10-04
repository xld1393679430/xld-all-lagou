import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("todos")
@observer
class Index extends Component {
  render() {
    const { filterList, deleteTodo, changeCompleted } = this.props.todos;
    
    return (
      <section className="main">
        <input className="toggle-all" type="checkbox" />
        <ul className="todo-list">
          {filterList.map((item, index) => (
            <li className={item.isCompleted ? "completed" : ""} key={index}>
              <div className="view">
                <input
                  checked={item.isCompleted}
                  onChange={(e) => changeCompleted(index, e.target.checked)}
                  className="toggle"
                  type="checkbox"
                />
                <label>{item.taskName}</label>
                <button onClick={() => deleteTodo(index)} className="destroy"></button>
              </div>
              <input className="edit" />
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default Index;
