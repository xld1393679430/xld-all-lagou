import { action, observable } from "mobx"
import { observer } from "mobx-react"

class Counter {
	@observable 
	count = 0

	@action
	increment = () => {
		this.count += 1
	}

	@action
	decrement = () => {
		this.count -= 1
	}
}

const counter = new Counter()

export default counter;