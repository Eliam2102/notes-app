import React from 'react';
import '../assets/styles/AppBar.css';
import GreetComponent from './GreetComponent';
const AppBar: React.FC = () => {
  return (
    <div className="app-bar">
      <h1>Mis Notas</h1>
      <GreetComponent/>
      <h2>Bienvenido, crea y organiza tus notas</h2>
    </div>
  );
};

export default AppBar;
