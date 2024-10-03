import React, { useEffect } from 'react';
import '../assets/styles/AppBar.css';
import GreetComponent from './GreetComponent';

const AppBar: React.FC = () => {
  useEffect(() => {
    // Función para activar la animación
    const startAnimation = () => {
      const pencil = document.querySelector('.pencil') as HTMLElement;
      const scribble = document.querySelector('.scribble') as HTMLElement;

      // Activar las clases para la animación
      pencil.classList.add('active');
      scribble.classList.add('active');

      // Quitar las clases después de la duración de la animación
      setTimeout(() => {
        pencil.classList.remove('active');
        scribble.classList.remove('active');
      }, 2500); // 2.5 segundos para la animación
    };

    // Inicia la animación cuando se carga el componente
    startAnimation();

    // Repetir la animación cada 4 segundos
    const interval = setInterval(startAnimation, 4000);

    return () => clearInterval(interval); // Limpiar el intervalo si el componente se desmonta
  }, []);

  return (
    <div className="app-bar">
      <h1>Mis Notas</h1>
      <GreetComponent/>
      <h2>Bienvenido, crea y organiza tus notas</h2>

      {/* Lápiz y garabato */}
      <div className="animation-container">
        <div className="pencil"></div>
        <div className="scribble"></div>
      </div>
    </div>
  );
};

export default AppBar;
