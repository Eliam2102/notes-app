import React, { useEffect, useState } from 'react';
import { FaPlus, FaTrash, FaSearch } from 'react-icons/fa';
import { fetchTime } from '../API/timeApi';

interface ToolbarProps {
    onAdd: () => void;
    onSearch: (query: string) => void;
  }
  
  const Toolbar: React.FC<ToolbarProps> = ({ onAdd, onSearch }) => {
    const [time, setTime] = useState({ hours: '', minutes: '', seconds: '' });
  
    useEffect(() => {
      const updateTime = async () => {
        const currentTime = await fetchTime(); // Usa la función modularizada
        setTime(currentTime);
      };
  
      updateTime(); // Llama a la función una vez al montar
      const interval = setInterval(updateTime, 1000); // Actualiza cada segundo
      return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
    }, []);
  
    return (
      <div className="toolbar">
        <h1>Bienvenido</h1>
        <div className="time-display">
          {`${time.hours}:${time.minutes}:${time.seconds}`}
        </div>
        <button onClick={onAdd}><FaPlus />Agregar Nota</button>
        <button onClick={onAdd}><FaTrash />Eliminar Nota</button>
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
    );
  };
  
  export default Toolbar;
