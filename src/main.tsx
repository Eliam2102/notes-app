// En tu index.js o main.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Asegúrate de que App es el componente que contiene tu layout
import './App.css'; // Asegúrate de que el path al archivo CSS es correcto

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
