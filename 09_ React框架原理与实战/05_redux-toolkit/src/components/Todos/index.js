import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { TODOS, addTodo } from "../../store/todo.slice"

let index = 1

const Index = () => {
	const dispatch = useDispatch()
	const todos = useSelector(state => state[TODOS])

	const handleAdd = () => {
		dispatch(addTodo({ title: "任务" + index }))
		index += 1
	}

	return (
		<div>
			<button onClick={handleAdd}>添加任务</button>
			<ul>
			{
				todos.map((item, index) => {
					return <li key={index}>{item.title}</li>
				})
			}
			</ul>
		</div>
	)
}

export default Index