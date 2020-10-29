import React from 'react'
import { Header } from './Header'
import axios from 'axios'
import { setUserData } from '../../Redux/auth-reducer'
import { AppStateType } from '../../Redux/redux-store'
import { connect } from 'react-redux'

type DataType = {
	id: number | null
	email: string | null
	login: string | null
}

type AuthResponsType = {
	data: DataType
	resultCode: number
	message: Array<string>
}
type OwnPropsType = MapStateType & MapDispatchType

export class HeaderContainer extends React.Component<OwnPropsType> {
	componentDidMount() {
		axios
			.get<AuthResponsType>(
				`https://social-network.samuraijs.com/api/1.0/auth/me`,
				{
					withCredentials: true,
				}
			)
			.then((response) => {
				if (response.data.resultCode === 0) {
					let { id, email, login } = response.data.data
					this.props.setUserData(id, email, login)
				}
			})
	}

	render() {
		return <Header login={this.props.login} isAuth={this.props.isAuth} />
	}
}

type MapStateType = {
	isAuth: boolean
	login: string | null
}

type MapDispatchType = {
	setUserData: Function
}

const mapState = (state: AppStateType): MapStateType => ({
	isAuth: state.authState.isAuth,
	login: state.authState.login,
})

export default connect<MapStateType, MapDispatchType, {}, AppStateType>(
	mapState,
	{ setUserData }
)(HeaderContainer)
