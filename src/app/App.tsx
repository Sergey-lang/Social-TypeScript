import React from 'react'
import './App.css'
import HeaderContainer from '../features/Header/HeaderContainer'
import {Navbar} from '../features/Navbar/Navbar'
import {Route} from 'react-router-dom'
import DialogsContainer from '../features/Dialogs/DialogsContainer'
import UsersContainer from '../features/Users/UsersContainer'
import ProfileContainer from '../features/Profile/ProfileContainer'
import LoginReduxForm from '../features/Login/Login';

export const App: React.FC = () => {
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
