import React, { useContext } from 'react';
import { NotesContext } from '../context/NoteContext';
import '../assets/styles/Notes.css';
import Swal from 'sweetalert2';
import { FaTrash } from 'react-icons/fa6';
import {FaEdit} from 'react-icons/fa' ;


type NoteProps = {
  note: {
    id: number;
    title: string;
    description: string;
    category?: string;
    tags?: string[];
    createdAt?: string; 
    color: string;
  };
};

const Note: React.FC<NoteProps> = ({ note }) => {
  const { dispatch } = useContext(NotesContext);

const handleDelete = () => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "¡No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, ¡elimínalo!"
  }).then((result) => {
    if (result.isConfirmed) {
      // Aquí puedes despachar la acción de eliminación
      dispatch({ type: 'DELETE_NOTE', id: note.id });

      // Mostrar un mensaje de éxito
      Swal.fire({
        title: "¡Eliminado!",
        text: "Tu nota ha sido eliminada.",
        icon: "success"
      });
    }
  });
};

  return (
    <div className="note" style={{ backgroundColor: note.color }}>
      <div className="note-header">
        <h3>{note.title}</h3>
        <div className="note-actions">
          <button className="edit-btn"><FaEdit/></button>
          <button className="delete-btn" onClick={handleDelete}><FaTrash/></button>
        </div>
      </div>
      <p>{note.description}</p>
      {note.category && <p><strong>Categoría:</strong> {note.category}</p>}
      {note.tags && <p><strong>Etiquetas:</strong> {note.tags.join(', ')}</p>}
      {note.createdAt && <p><strong>Fecha de creación:</strong> {new Date(note.createdAt).toLocaleString()}</p>}
    </div>
  );
};

export default Note;
