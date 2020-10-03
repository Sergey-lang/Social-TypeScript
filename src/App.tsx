import React from 'react';
import './App.css';
import {Header} from './component/Header/Header';
import {Navbar} from './component/Navbar/Navbar';
import {Profile} from './component/Profile/Profile';
import {Dialogs} from './component/Dialogs/Dialogs';
import {Route} from 'react-router-dom';
import {StoreReduxType} from './Redux/redux-store';
import {DialogsContainer} from './component/Dialogs/DialogsContainer';

type AppPropsType = {
    store: StoreReduxType
}

export const App: React.FC<AppPropsType> = (props) => {
    // const state = props.store.getState()
    return (
        <div className='all_wrapper'>
            <Header/>
            <div className='app_wrapper'>
                <Navbar/>
                <Route path='/profile'
                       render={() => <Profile store={props.store}/>}
                />
                <Route path='/dialogs'
                       render={() => <DialogsContainer store={props.store}/>}/>
            </div>
        </div>
    );
}

