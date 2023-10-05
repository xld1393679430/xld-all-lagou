import React, { useState, useEffect } from 'react'

const Index = () => {
	const [state, setState] = useState(null)

	useEffect(() => {

	}, [])

	return (
		<div>
			<p>Home</p>
			<button onClick={() => alert('hello')}>hello</button>
		</div>
	)
}

export default Index