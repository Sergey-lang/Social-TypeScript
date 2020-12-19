import React, {ComponentType} from 'react'
import './App.css'
import HeaderContainer from '../u3-Pages/Header/HeaderContainer'
import {Navbar} from '../u3-Pages/Navbar/Navbar'
import {Route, withRouter} from 'react-router-dom'
import DialogsContainer from '../u3-Pages/Dialogs/DialogsContainer'
import UsersContainer from '../u3-Pages/Users/UsersContainer'
import ProfileContainer from '../u3-Pages/Profile/ProfileContainer'
import LoginReduxForm from '../u3-Pages/Login/Login'
import {AppStateType} from '../u4-redux/store'
import {connect} from 'react-redux'
import {initializeApp} from '../u4-redux/app-reducer'
import {compose} from 'redux'
import {Preloader} from '../u2-components/Preloader/Preloader'

type PropsType = MapStateType & MapDispatch

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
                <Route path="/profile/:userid?" render={() => <ProfileContainer/>}/>
                <Route path="/dialogs" render={() => <DialogsContainer/>}/>
                <Route path="/users" render={() => <UsersContainer/>}/>
                <Route path="/login" render={() => <LoginReduxForm/>}/>
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
