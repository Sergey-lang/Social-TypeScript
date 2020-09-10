import {addNewMessage, updateNewPostText, addNewPost, RootStateType, updateNewMessageText} from './Redux/State';
import ReactDOM from 'react-dom';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {App} from './App';

export const rerenderEntireTree = (state: RootStateType) => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App state={state}
                     addNewPost={addNewPost}
                     addNewMessage={addNewMessage}
                     updateNewPostText={updateNewPostText}
                     updateNewMessageText={updateNewMessageText}
                />
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}