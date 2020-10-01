import React from 'react';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {store, AppStateType} from './Redux/redux-store';
import ReactDOM from 'react-dom';
import {App} from './App';
import './index.css';

export const rerenderEntireTree = (state: AppStateType) => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App store={store}/>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

rerenderEntireTree(store.getState())
store.subscribe(() => {
    let state = store.getState()
    rerenderEntireTree(state)
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

