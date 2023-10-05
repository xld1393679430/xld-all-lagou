import express from 'express'

const app = express()

app.listen(3000, () => {
	console.log('app is running 3000 port');
})

export default app