import React from 'react';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {AppStateType, store} from './Redux/redux-store';
import ReactDOM from 'react-dom';
import {App} from './App';
import {Provider} from './StoreContext';
import './index.css';

export const rerenderEntireTree = (state: AppStateType) => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
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

