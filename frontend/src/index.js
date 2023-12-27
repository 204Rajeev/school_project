import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './css/fonts.css';
import { AuthProvider } from './AuthContext';
import StudentProvider from './StudentProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <StudentProvider>
      <App />
    </StudentProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
