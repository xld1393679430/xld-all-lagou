const obj = {
	first: "a",
	last: "b",
	get full() {
		return this.first + " " + this.last
	}
}

// Object.assign不能正确的拷贝getter 和 setter属性 需要借助getOwnPropertyDescriptors
const o1 = Object.assign({}, obj)
console.log(o1);
o1.first = "哈哈"
console.log(o1.full);

const descriptors = Object.getOwnPropertyDescriptors(obj)
const o2 = Object.defineProperties({}, descriptors)
console.log(descriptors);
console.log(o2);
o2.first = "呵呵"
console.log(o2.full);