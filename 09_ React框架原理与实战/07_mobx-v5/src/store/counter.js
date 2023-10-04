import { action, autorun, computed, configure, observable, runInAction } from "mobx";

// 通过配置强制程序使用action函数更改应用程序中的状态
configure({ enforceActions: "observed" });

class Counter {
  constructor() {
    // 检查 username 发生变化自动执行autorun的回调函数
    autorun(() => {
      try {
        uniqueUserName(this.username);
        console.log("用户名可以使用");
      } catch (error) {
        console.log(error.message);
      }
    }, { delay: 500 });
  }
  @observable count = 0;
  @observable price = 10;
  @observable username = "";

  @observable users = [];

  @computed
  get totalPrice() {
    return this.count * this.price;
  }

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

  @action.bound
  changeUserName(username) {
    this.username = username;
  }
}

const counter = new Counter();

function uniqueUserName(username) {
  return new Promise((resolve, reject) => {
    if (username === "admin") {
      reject("用户名已存在");
    } else {
      resolve();
    }
  });
}

export default counter;
