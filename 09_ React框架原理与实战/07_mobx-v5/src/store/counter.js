import { action, configure, observable, runInAction } from "mobx";

// 通过配置强制程序使用action函数更改应用程序中的状态
configure({ enforceActions: "observed" });

class Counter {
  @observable count = 0;

  @observable users = [];

  @action
  increment = () => {
    this.count += 1;
  };

  // 可以通过bound 或是使用箭头函数绑定this
  @action.bound
  decrement() {
    this.count -= 1;
  }

  @action.bound async getData() {
    const users = await fetch("https://api.github.com/users").then((res) => res.json());
    // 异步action改变observable需要在runInAction回调里操作
	runInAction(() => {
      this.users = users;
    });
  }
}

const counter = new Counter();

export default counter;
