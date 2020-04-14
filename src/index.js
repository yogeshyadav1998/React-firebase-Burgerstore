import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerreducer from './store/reducers/burgerbuilder';
import orderreducer from './store/reducers/orders';
import authreducer from './store/reducers/auth';

const rootreducer = combineReducers({
    burgerbuilder: burgerreducer,
    order: orderreducer,
    auth: authreducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore( rootreducer, composeEnhancers(applyMiddleware(thunk)));

const app =(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
