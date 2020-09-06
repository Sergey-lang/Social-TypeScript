import React from 'react';
import './App.css';
import Header from './component/Header/Header';
import Navbar from './component/Navbar/Navbar';
import Profile from './component/Profile/Profile';
import Dialogs from './component/Dialogs/Dialogs';
import {BrowserRouter, Route} from 'react-router-dom';
import {RootStateType} from './Redux/State';

type AppPropsType = {
    state: RootStateType
    addNewPost: (postText: string) => void
    addNewMessage: (messageText: string) => void
}

function App(props: AppPropsType) {
    return (
        <BrowserRouter>
            <div className='all_wrapper'>
                <Header/>
                <div className='app_wrapper'>
                    <Navbar/>
                    <Route path='/profile'
                           render={() => <Profile
                               profilePage={props.state.profilePage}
                               addNewPost={props.addNewPost}
                           />}
                    />
                    <Route path='/dialogs'
                           render={() => <Dialogs
                               dialogPage={props.state.dialogPage}
                               addNewMessage={props.addNewMessage}
                           />}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
