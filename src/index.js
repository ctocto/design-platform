import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

import App from './app/App';
import appReducer from './app/reducers/';

const store = createStore(
  appReducer,
  applyMiddleware(logger),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('App'));
