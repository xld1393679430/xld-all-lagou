import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import TodosReducer, { TODOS } from './todo.slice'
import PrepareReducer, { PREPARE } from './prepare.slice'
import logger from './middlewares/logger'

export default configureStore({
	reducer: {
		[TODOS]: TodosReducer,
		[PREPARE]: PrepareReducer
	},
	middleware: [...getDefaultMiddleware(), logger],
	devTools: process.env.NODE_ENV !== 'production'
})