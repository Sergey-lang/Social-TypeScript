import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {AppStateType} from '../app/store';

type MapStateRedirectType = {
   isAuth: boolean
}
type DispatchStateType = {}
const mapStateRedirect = (state: AppStateType) => ({
   isAuth: state.authState.isAuth
} as MapStateRedirectType)

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {

   const RedirectComponent: React.FC<MapStateRedirectType & DispatchStateType> = (props) => {
      let {isAuth, ...restProps} = props
      if (!isAuth) return <Redirect to='/login'/>
      return <WrappedComponent {...restProps as WCP}/>
   }

   let ConnectedAuthRedirectComponent = connect<MapStateRedirectType, DispatchStateType, WCP, AppStateType>(mapStateRedirect, {})(RedirectComponent)

   return ConnectedAuthRedirectComponent
}
