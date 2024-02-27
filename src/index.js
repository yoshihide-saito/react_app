import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Todo from './todo'
import Dialog from './dialog'
import reportWebVitals from './reportWebVitals';
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='main'>
    <Todo />
    <Dialog />
  </div>
);

reportWebVitals();
