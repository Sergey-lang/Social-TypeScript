import React from 'react';
import {Redirect} from 'react-router-dom';
import {GlobalStateType} from '../Redux/redux-store';
import {connect} from 'react-redux';

type MapStateDedirectType = {
   isAuth: boolean
}
type DispatchStateType = {}
const mapStateRedirect = (state: GlobalStateType) => ({
   isAuth: state.authState.isAuth
} as MapStateDedirectType)

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {

   const RedirectComponent: React.FC<MapStateDedirectType & DispatchStateType> = (props) => {
      let {isAuth,...restProps} = props
      if (!isAuth) return <Redirect to='/login'/>
      return <WrappedComponent {...restProps as WCP}/>
   }

   let ConnectedAuthRedirectComponent = connect<MapStateDedirectType, DispatchStateType, WCP, GlobalStateType>(mapStateRedirect, {})(RedirectComponent)

   return ConnectedAuthRedirectComponent
}