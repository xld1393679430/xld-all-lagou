import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUser } from '../../store/actions/user.action';

const Index = ({ user, dispatch }) => {

	console.log(2222, user);

	return (
		<div>
			<p>List</p>
			<hr /> 
			<Link to={'/'}>to home</Link>

		</div>
	)
}

const loadData = (store) => {
	return store.dispatch(fetchUser())
}

const mapStateToProps = (state) => {
	console.log(4444, state);
	return {
		user: state.user
	}
}

export default {
	component: connect(mapStateToProps)(Index),
	loadData,
}