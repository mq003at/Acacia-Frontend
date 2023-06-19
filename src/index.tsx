import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <head>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Pathway Extreme" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poltawski Nowy" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Playfair Display" />

    </head>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
