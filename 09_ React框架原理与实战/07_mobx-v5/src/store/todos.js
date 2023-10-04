import { action, computed, observable } from "mobx";

const All = 'All'
const Active = 'Active'
const Completed = 'Completed'
const FILTERS = [All, Active, Completed]

class Todos {
  @observable list = [];
  @observable currentFilter = All;
  FILTERS = FILTERS;

  @action.bound addTodo(taskName) {
    this.list.push({
      taskName,
      isCompleted: false,
    });
  }

  @action.bound deleteTodo(index) {
    this.list.splice(index, 1);
  }

  @action.bound changeCompleted(index, isCompleted) {
    this.list[index].isCompleted = isCompleted;
  }

  @computed get unFinishedCount() {
    return this.list.filter((item) => !item.isCompleted).length;
  }

  @action.bound changeFilter(filter) {
    this.currentFilter = filter;
  }

  @computed get filterList() {
    switch (this.currentFilter) {
      case Active:
        return this.list.filter(item => !item.isCompleted);
      case Completed:
        return this.list.filter(item => item.isCompleted);
      default:
        return this.list;
    }
  }
}

const todos = new Todos();

export default todos;
