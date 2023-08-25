import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/style/App.css'
import ErrorBoundary from './ErrorBoundary';

import { Navigate, BrowserRouter, Route, Routes } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
        <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
