import { configureStore } from '@reduxjs/toolkit'
import TodosReducer, { TODOS } from './todo.slice'
import PrepareReducer, { PREPARE } from './prepare.slice'

export default configureStore({
	reducer: {
		[TODOS]: TodosReducer,
		[PREPARE]: PrepareReducer
	},
	devTools: process.env.NODE_ENV !== 'production'
})