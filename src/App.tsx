import React from 'react'
import './App.css'
import HeaderContainer from './component/Header/HeaderContainer'
import {Navbar} from './component/Navbar/Navbar'
import {Route} from 'react-router-dom'
import DialogsContainer from './component/Dialogs/DialogsContainer'
import UsersContainer from './component/Users/UsersContainer'
import ProfileContainer from './component/Profile/ProfileContainer'
import LoginReduxForm from './component/Login/Login';

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
