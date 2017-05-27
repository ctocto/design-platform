import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { enableBatching } from 'redux-batched-actions';
import thunk from 'redux-thunk';
import { AppContainer } from 'react-hot-loader';

import App from './app/App';
import appReducer from './app/reducers/';
import DevTools from './app/containers/DevTools';

const logger = createLogger({
  level: 'info',
});

const monitorReducer = (state = {}, action) => state;

const enhancer = compose(
  applyMiddleware(thunk.withExtraArgument(), logger),
  // applyMiddleware(thunk.withExtraArgument()),
  DevTools.instrument(monitorReducer, {
    maxAge: 50,
    shouldCatchErrors: true,
  }),
);

const store = createStore(
  enableBatching(appReducer),
  enhancer,
);

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <div style={{ width: '100%', height: '100%' }}>
          <Component />
          <DevTools />
        </div>
      </Provider>
    </AppContainer>
  , document.getElementById('App'));
};

render(App);


if (module.hot) {
  module.hot.accept('./app/App', () => {
    render(App);
  });
}
