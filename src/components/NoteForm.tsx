import React, { useState, useContext } from 'react';
import { NotesContext } from '../context/NoteContext';
import '../assets/styles/NoteForm.css';
import { colorPalette } from '../assets/utils/colors'; // Ajusta la ruta según la ubicación de tu archivo

type NoteFormProps = {
  closeModal: () => void;
  noteToEdit?: {
    id: number;
    title: string;
    description: string;
    category?: string;
    tags?: string[];
    createdAt?: string;
  };
};

const NoteForm: React.FC<NoteFormProps> = ({ closeModal, noteToEdit }) => {
  const { dispatch } = useContext(NotesContext);
  const [title, setTitle] = useState(noteToEdit?.title || '');
  const [description, setDescription] = useState(noteToEdit?.description || '');
  const [category, setCategory] = useState(noteToEdit?.category || '');
  const [tags, setTags] = useState(noteToEdit?.tags?.join(', ') || '');


  //Quie colores randoms asi que por cada una qeu se cree se agregara un color diferente.
  // colors.ts (puedes crear un archivo separado para la paleta de colores)
  const getRandomColor = (): string => {
    return colorPalette[Math.floor(Math.random() * colorPalette.length)];
  };

  //Función para poder Agregar una nota incluyedno la fecha y creación de la misma
  const handleSubmit = () => {
    const currentTimestamp = new Date().toISOString(); // Obtener la fecha y hora actual en formato ISO
    const noteColor = getRandomColor();
    if (noteToEdit) {
      dispatch({
        type: 'EDIT_NOTE',
        note: {
          id: noteToEdit.id,
          title,
          description,
          category,
          tags: tags.split(', '),
          createdAt: noteToEdit.createdAt,
        },
      });
    } else {
      dispatch({
        type: 'ADD_NOTE',
        note: {
          title,
          description,
          category,
          tags: tags.split(', '),
          createdAt: currentTimestamp,
          color: noteColor 
        },
      });
    }
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="note-form">
        <h3>{noteToEdit ? 'Editar Nota' : 'Agregar Nota'}</h3>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Categoría (Opcional)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Etiquetas (separadas por comas, opcional)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <div className="actions">
          <button onClick={handleSubmit}>Guardar</button>
          <button onClick={closeModal}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default NoteForm;
