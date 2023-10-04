import { action, observable, makeObservable } from "mobx";

class CounterStore {
  constructor() {
    this.count = 0;

    makeObservable(this, {
      count: observable,
      increment: action,
      decrement: action.bound, // 可以使用箭头函数或者action.bound 使this永远指向该类的实例对象
    });
  }

  increment = () => {
    this.count += 1;
  };

  decrement() {
    this.count -= 1;
  };
}

export default CounterStore;
