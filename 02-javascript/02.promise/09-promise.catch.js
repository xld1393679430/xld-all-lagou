const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

/**
 * 最终版
 */
class MyPromise {
  status = PENDING;
  value = undefined;
  reason = undefined;
  successCbs = [];
  failCbs = [];

  constructor(exec) {
    try {
      exec(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  resolve = (value) => {
    if (this.status !== PENDING) {
      return;
    }
    this.status = FULFILLED;
    this.value = value;
    while (this.successCbs.length) {
      this.successCbs.shift()();
    }
  };

  reject = (reason) => {
    if (this.status !== PENDING) {
      return;
    }
    this.status = REJECTED;
    this.reason = reason;
    while (this.failCbs.length) {
      this.failCbs.shift()();
    }
  };

  then(successCb, failCb) {
    successCb = successCb ? successCb : (value) => value;
    failCb = failCb
      ? failCb
      : (reason) => {
          throw reason;
        };
    const promise = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const result = successCb(this.value);
            this.resolvePromise(promise, result, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const result = failCb(this.reason);
            this.resolvePromise(promise, result, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      } else {
        this.successCbs.push(() => {
          setTimeout(() => {
            try {
              const result = successCb(this.value);
              this.resolvePromise(promise, result, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
        this.failCbs.push(() => {
          setTimeout(() => {
            try {
              const result = failCb(this.reason);
              this.resolvePromise(promise, result, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });

    return promise;
  }

  catch(failCb) {
	return this.then(undefined, failCb)
  }

  finally(cb) {
    return this.then(
      (value) => {
        return MyPromise.resove(cb()).then(() => value);
      },
      (error) => {
        return MyPromise.resove(cb()).then(() => {
          throw error;
        });
      }
    );
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

  static all(array) {
    let result = [];
    let index = 0;
    return new MyPromise((resolve, reject) => {
      function addData(key, value) {
        result[key] = value;
        index++;
        if (index === array.length) {
          resolve(result);
        }
      }

      for (let i = 0; i < array.length; i++) {
        let current = array[i];
        if (current instanceof MyPromise) {
          current.then(
            (value) => addData(i, value),
            (reason) => reject(reason)
          );
        } else {
          addData(i, current);
        }
      }
    });
  }

  static resove(value) {
    if (value instanceof MyPromise) {
      return value;
    }
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(value) {
    if (value instanceof MyPromise) {
      return value;
    }
    return new MyPromise((_, reject) => reject(value));
  }
}

console.log("start");

const p1 = new MyPromise((resolve) => {
  setTimeout(() => {
    resolve("p1");
  }, 2000);
});

p1.then(res => {
	console.log(res, 1)
	throw new Error("失败")
}).catch(error => {
	console.log(error, 2)
})
