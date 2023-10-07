import Home from '../pages/home/index'
import List from '../pages/list/index'

export default [
	{
		path: '/',
		component: Home,
		exact: true,
	},
	{
		path: '/list',
		component: List,
	},
]