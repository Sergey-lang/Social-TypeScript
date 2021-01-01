import {store} from './u4-redux/store';
import * as serviceWorker from './serviceWorker';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import App from './u6-app/App';
import React from 'react';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your u6-app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();