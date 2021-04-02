import React from 'react'
import {Header} from './Header'
import {AppStateType} from '../../redux/store'
import {connect} from 'react-redux'
import {getAuthUserData, logout} from '../../redux/auth-reducer'

type OwnPropsType = MapStateType & MapDispatchType

class HeaderContainer extends React.Component<OwnPropsType> {
   render() {
      return <Header login={this.props.login}
                     isAuth={this.props.isAuth}
                     logout={this.props.logout}
      />
   }
}

type MapStateType = {
   isAuth: boolean
   login: string | null
}

type MapDispatchType = {
   getAuthUserData: () => void
   logout: () => void
}

const mapState = (state: AppStateType): MapStateType => ({
   isAuth: state.authState.isAuth,
   login: state.authState.login,
})

export default connect<MapStateType, MapDispatchType, {}, AppStateType>(
    mapState,
    {getAuthUserData, logout}
)(HeaderContainer)
