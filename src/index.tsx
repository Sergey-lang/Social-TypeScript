import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {addNewMessage, addNewPost, state, subscriber, updateNewMessageText, updateNewPostText} from './Redux/State';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {App} from './App';

export const rerenderEntireTree = () => {
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
rerenderEntireTree()
subscriber(rerenderEntireTree)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

