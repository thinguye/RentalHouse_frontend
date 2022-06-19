import React from 'react';
import ReactDOM from 'react-dom';
import { unregister } from './registerServiceWorker';

import { BrowserRouter} from 'react-router-dom';
import './assets/base.css';
import Main from './Main';
import configureStore from './config/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();
const rootElement = document.getElementById('root');

const renderApp = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </Provider>,
    rootElement
  );
};

renderApp(Main);

if (module.hot) {
  module.hot.accept('./Main', () => {
    const NextApp = require('./Main').default;
    renderApp(NextApp);
  });
}
unregister();

