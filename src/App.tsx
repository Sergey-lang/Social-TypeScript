import React from 'react';
import './App.css';
import {Header} from './component/Header/Header';
import {Navbar} from './component/Navbar/Navbar';
import {Profile} from './component/Profile/Profile';
import {Dialogs} from './component/Dialogs/Dialogs';
import {Route} from 'react-router-dom';
import {store, StoreType} from './Redux/State';

type AppPropsType = {
    store: StoreType
}

export const App: React.FC<AppPropsType> = (props) => {
    const state = store.getState()
    return (
        <div className='all_wrapper'>
            <Header/>
            <div className='app_wrapper'>
                <Navbar/>
                <Route path='/profile'
                       render={() => <Profile
                           profilePage={state.profilePage}
                           dispatch={store.dispatch.bind(store)}
                           sidebar={state.sidebar}
                       />}
                />
                <Route path='/dialogs'
                       render={() => <Dialogs
                           dialogPage={state.dialogPage}
                           dispatch={store.dispatch.bind(store)}
                       />}/>
            </div>
        </div>
    );
}

