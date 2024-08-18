import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store/index';
import { BrowserRouter } from 'react-router-dom';
import { WebSocketProvider } from './components/WebSocketProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId="299202774446-le94146tvol2vbmq9peap1pi9b43pr9d.apps.googleusercontent.com">
      <Provider store={store}>
        <WebSocketProvider>
          <App />
        </WebSocketProvider>
      </Provider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
