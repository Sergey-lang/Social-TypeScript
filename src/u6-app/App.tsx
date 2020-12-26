import React, {ComponentType} from 'react'
import './App.css'
import HeaderContainer from '../u3-pages/Header/HeaderContainer'
import {Navbar} from '../u3-pages/Navbar/Navbar'
import {Route, withRouter} from 'react-router-dom'
import {AppStateType} from '../u4-redux/store'
import {connect} from 'react-redux'
import {initializeApp} from '../u4-redux/app-reducer'
import {compose} from 'redux'
import {Preloader} from '../u2-components/Preloader/Preloader'
import {withSuspense} from '../u7-hoc/withSuspense'

type PropsType = MapStateType & MapDispatch

const Login = React.lazy(() => import('../u3-pages/Login/Login'))
const ProfileContainer = React.lazy(() => import('../u3-pages/Profile/ProfileContainer'))
const DialogsContainer = React.lazy(() => import('../u3-pages/Dialogs/DialogsContainer'))
const UsersContainer = React.lazy(() => import('../u3-pages/Users/UsersContainer'))

class App extends React.Component<PropsType> {

   componentDidMount() {
      this.props.initializeApp()
   }

   render() {

      if (this.props.initialized) {
         return <Preloader/>
      }

      return (
          <div className="app">
             <HeaderContainer/>
             <div className="appContainer">
                <Navbar/>
                <Route path="/profile/:userid?" render={withSuspense(ProfileContainer)}/>
                <Route path="/dialogs" render={withSuspense(DialogsContainer)}/>
                <Route path="/users" render={withSuspense(UsersContainer)}/>
                <Route path="/login" render={withSuspense(Login)}/>
             </div>
          </div>
      )
   }
}

type MapDispatch = {
   initializeApp: () => void
}

type MapStateType = {
   initialized: boolean
}

const mapState = (state: AppStateType): MapStateType => ({
   initialized: state.app.initialized
})

export default compose<ComponentType>(
    withRouter,
    connect<MapStateType, MapDispatch, {}, AppStateType>(mapState, {initializeApp}),
)(App)
