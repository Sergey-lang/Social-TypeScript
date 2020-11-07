import React from 'react'
import {AppStateType} from '../../Redux/redux-store'
import {connect} from 'react-redux'
import {Login} from './Login';

type OwnPropsType = MapStateType & MapDispatchType

export class HeaderContainer extends React.Component<OwnPropsType> {
	componentDidMount() {

	}

	render() {
		return <Login />
	}
}

type MapStateType = {
	isAuth: boolean
}

type MapDispatchType = {

}

const mapState = (state: AppStateType): MapStateType => ({
	isAuth: state.authState.isAuth
})

export default connect<MapStateType, MapDispatchType, {}, AppStateType>(
	mapState,
	{ }
)(HeaderContainer)
