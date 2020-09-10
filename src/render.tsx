import { addNewMessage, updateNewPostText, addNewPost, RootStateType } from './Redux/State';
import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

export const rerenderEntireTree = (state: RootStateType) => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App state={state}
                    addNewPost={addNewPost}
                    updateNewPostText={updateNewPostText}
                    addNewMessage={addNewMessage}
                />
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}