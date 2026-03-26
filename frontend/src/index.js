import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Safety check for corrupted user data from previous bug
if (localStorage.getItem('user') === 'undefined') {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
