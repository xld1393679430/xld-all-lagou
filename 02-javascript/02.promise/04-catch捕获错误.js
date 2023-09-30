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
		try {
			exec(this.resolve, this.reject);
		} catch (error) {
			console.log(2222)
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
		const promise = new MyPromise((resolve, reject) => {
			if (this.status === FULFILLED) {
				setTimeout(() => {
					try {
						const result = successCb(this.value);
						this.resolvePromise(promise, result, resolve, reject);
					} catch (error) {
						reject(error)
					}
				});
			} else if (this.status === REJECTED) {
				setTimeout(() => {
					try {
						const result = failCb(this.reason);
						this.resolvePromise(promise, result, resolve, reject);
					} catch (error) {
						reject(error)
					}
				});
			} else {
				this.successCbs.push(() => {
					setTimeout(() => {
						try {
							const result = successCb(this.value);
							this.resolvePromise(promise, result, resolve, reject);
						} catch (error) {
							reject(error)
						}
					});
				});
				this.failCbs.push(() => {
					setTimeout(() => {
						try {
							const result = failCb(this.reason);
							this.resolvePromise(promise, result, resolve, reject);
						} catch (error) {
							reject(error)
						}
					});
				});
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
	setTimeout(() => {
		reject("失败")
	})
});

p.then(
	(res) => {
		console.log(res, 1);
	},
	(err) => {
		console.log(err, 2);
		return 1000
	}
).then(res => {
	console.log(res, 3);
})

console.log("end");
