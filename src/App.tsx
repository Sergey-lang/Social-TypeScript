import React from 'react';
import './App.css';
import {Header} from './component/Header/Header';
import {Navbar} from './component/Navbar/Navbar';
import {Route} from 'react-router-dom';
import {DialogsContainer} from './component/Dialogs/DialogsContainer';
import UsersContainer from './component/Users/UsersContainer';
import ProfileContainer from './component/Profile/ProfileContainer';

export const App: React.FC = () => {
    return (
        <div className='all_wrapper'>
            <Header/>
            <div className='app_wrapper'>
                <Navbar/>
                <Route path='/profile'
                       render={() => <ProfileContainer/>}
                />
                <Route path='/dialogs'
                       render={() => <DialogsContainer/>}
                />
                <Route path='/users'
                       render={() => <UsersContainer/>}
                />
            </div>
        </div>
    );
}
