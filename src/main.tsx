import 'reflect-metadata';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'es6-shim';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
