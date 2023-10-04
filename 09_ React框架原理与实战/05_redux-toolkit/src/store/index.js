import { configureStore } from '@reduxjs/toolkit'
import TodosReducer, { TODOS } from './todo.slice'

export default configureStore({
	reducer: {
		[TODOS]: TodosReducer
	},
	devTools: process.env.NODE_ENV !== 'production'
})