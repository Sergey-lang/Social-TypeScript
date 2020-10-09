import React from 'react';
import './App.css';
import {Header} from './component/Header/Header';
import {Navbar} from './component/Navbar/Navbar';
import {Profile} from './component/Profile/Profile';
import {Route} from 'react-router-dom';
import {DialogsContainer} from './component/Dialogs/DialogsContainer';

export const App: React.FC = () => {
    return (
        <div className='all_wrapper'>
            <Header/>
            <div className='app_wrapper'>
                <Navbar/>
                <Route path='/profile'
                       render={() => <Profile/>}
                />
                <Route path='/dialogs'
                       render={() => <DialogsContainer/>}
                />
            </div>
        </div>
    );
}

