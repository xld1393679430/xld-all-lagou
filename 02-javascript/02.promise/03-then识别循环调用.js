const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

/**
 */
class MyPromise {
  status = PENDING;
  value = undefined;
  reason = undefined;
  successCbs = [];
  failCbs = [];

  constructor(exec) {
    exec(this.resolve, this.reject);
  }

  resolve = (value) => {
    if (this.status !== PENDING) {
      return;
    }
    this.status = FULFILLED;
    this.value = value;
    while (this.successCbs.length) {
      this.successCbs.shift()(this.value);
    }
  };

  reject = (reason) => {
    if (this.status !== PENDING) {
      return;
    }
    this.status = REJECTED;
    this.reason = reason;
    while (this.failCbs.length) {
      this.failCbs.shift()(this.reason);
    }
  };

  then(successCb, failCb) {
    const promise = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          const result = successCb(this.value);
          this.resolvePromise(promise, result, resolve, reject);
        });
      } else if (this.status === REJECTED) {
        const result = failCb(this.reason);
        reject(result);
      } else {
        this.successCbs.push(successCb);
        this.failCbs.push(failCb);
      }
    });

    return promise;
  }

  resolvePromise(promise, result, resolve, reject) {
    if (promise === result) {
      return reject(new TypeError("Promise 禁止循环调用"));
    }
    if (result instanceof MyPromise) {
      result.then(resolve, reject);
    } else {
      resolve(result);
    }
  }
}

console.log("start");
const p = new MyPromise((resolve, reject) => {
  resolve("成功");
});

const other = function () {
  return new MyPromise((resolve) => resolve("other"));
};

const p1 = p.then((res) => {
  console.log(res, 1);
  return p1;
});

p1.then(
  () => {},
  (error) => {
    console.log(error);
	console.log(error.message);
  }
);
console.log("end");
