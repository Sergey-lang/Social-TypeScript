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
                           addNewPost={props.store.addNewPost.bind(props.store)}
                           updateNewPostText={props.store.updateNewPostText.bind(props.store)}
                           sidebar={state.sidebar}
                       />}
                />
                <Route path='/dialogs'
                       render={() => <Dialogs
                           dialogPage={state.dialogPage}
                           addNewMessage={props.store.addNewMessage.bind(props.store)}
                           updateNewMessageText={props.store.updateNewMessageText.bind(props.store)}
                       />}/>
            </div>
        </div>
    );
}

