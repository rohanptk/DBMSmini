import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { CurrentUserProvider } from './context/CurrentUserContext';
import 'react-toastify/dist/ReactToastify.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { BooksProvider } from './context/BooksContext';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <CurrentUserProvider>
        <BooksProvider>
          <App />
        </BooksProvider>
      </CurrentUserProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
