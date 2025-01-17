import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import ordersReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';

const logger = store => {
    return next => {
        return action => {
            const result = next(action);
            return result;
        }
    }
}

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: ordersReducer,
    auth: authReducer
});

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose; // this added for redux devtool to be able to recognize my redux store

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
