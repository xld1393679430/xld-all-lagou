const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected"

/**
 * 这版本不可用 只是实现了Promise的状态控制和then方法
 */
class MyPromise {
	status = PENDING;
	value = undefined;
	reason = undefined;
	successCbs = [];
	failCbs = [];

	constructor(exec) {
		exec(this.resolve, this.reject)
	}

	resolve = (value) => {
		if (this.status !== PENDING) {
			return
		}
		this.status = FULFILLED
		this.value = value
		while(this.successCbs.length) {
			this.successCbs.shift()(this.value)
		}
	}

	reject = (reason) => {
		if (this.status !== PENDING) {
			return
		}
		this.status = REJECTED
		this.reason = reason
		while(this.failCbs.length) {
			this.failCbs.shift()(this.reason)
		}
	}

	then(successCb, failCb) {
		if (this.status === FULFILLED) {
			successCb(this.value)
		} else if (this.status === REJECTED) {
			failCb(this.reason)
		} else {
			this.successCbs.push(successCb)
			this.failCbs.push(failCb)
		}
	}
}


console.log("start")
const p = new MyPromise((resolve, reject) => {
	setTimeout(() => {
		// resolve("成功");
		reject("失败")
	}, 1000)
})

p.then(res => {
	console.log(res, 1)	
}, (reason) => {
	console.log(reason, 2)
})
p.then(res => {
	console.log(res, 3)
}, (reason) => {
	console.log(reason, 4)
})
console.log("end")