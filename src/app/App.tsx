import React, {ComponentType} from 'react'
import './App.css'
import HeaderContainer from '../features/Header/HeaderContainer'
import {Navbar} from '../features/Navbar/Navbar'
import {Route, withRouter} from 'react-router-dom'
import DialogsContainer from '../features/Dialogs/DialogsContainer'
import UsersContainer from '../features/Users/UsersContainer'
import ProfileContainer from '../features/Profile/ProfileContainer'
import LoginReduxForm from '../features/Login/Login';
import {AppStateType} from '../redux/store';
import {connect} from 'react-redux';
import {initializeApp} from '../redux/app-reducer';
import {compose} from 'redux';
import {Preloader} from '../common/Preloader/Preloader';

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
   connect<MapStateType, MapDispatch, {}, AppStateType>(mapState, {initializeApp}),
   withRouter,
)(App)
