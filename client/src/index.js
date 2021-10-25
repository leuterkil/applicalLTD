import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import configureStore from './Store/store';
import { Provider } from 'react-redux';
import { checkLoggedIn } from './util/session';

const renderApp = (preloadedState) => {
  const store = configureStore(preloadedState);

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
  window.getState = store.getState;
};

(async () => renderApp(await checkLoggedIn()))();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
