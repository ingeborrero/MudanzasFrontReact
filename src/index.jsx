import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import App from './routes/App';
import reducers from './reducers';
import initialState from './initialState.json';
import Store from './store';

import './index.css';

// eslint-disable-next-line no-underscore-dangle
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;
// const store = createStore(reducers, initialState, applyMiddleware(reduxThunk));
const store = Store();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('App'),
);
