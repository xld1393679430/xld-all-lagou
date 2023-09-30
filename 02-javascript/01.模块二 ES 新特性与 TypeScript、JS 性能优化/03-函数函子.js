class Container {
	static of(value) {
		return new Container(value)
	}

	constructor(value) {
		this._value = value
	}

	map(fn) {
		return Container.of(fn(this._value))
	}

	get value() {
		return this._value
	}
}

const r = Container.of(5).map(x => x + 1).map(x => x * x)

console.log(r); // Container { _value: 36 }

console.log(r.value) // 36

