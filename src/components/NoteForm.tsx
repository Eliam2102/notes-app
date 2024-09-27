import React, { useState, useContext } from 'react';
import { NotesContext } from '../context/NoteContext';
import '../assets/styles/NoteForm.css';
import { colorPalette } from '../assets/utils/colors';

type NoteFormProps = {
  closeModal: () => void;
  noteToEdit?: {
    id: number;
    title: string;
    description: string;
    category?: string;
    tags?: string[];
    createdAt?: string;
    color?: string;
  };
};

const NoteForm: React.FC<NoteFormProps> = ({ closeModal, noteToEdit }) => {
  const { dispatch } = useContext(NotesContext);
  
  // Estados para los campos de la nota
  const [title, setTitle] = useState(noteToEdit?.title || '');
  const [description, setDescription] = useState(noteToEdit?.description || '');
  const [category, setCategory] = useState(noteToEdit?.category || '');
  const [tags, setTags] = useState(noteToEdit?.tags?.join(', ') || '');

  // Generar un color aleatorio solo si es una nueva nota
  const noteColor = noteToEdit?.color || colorPalette[Math.floor(Math.random() * colorPalette.length)];

  const handleSubmit = () => {
    const currentTimestamp = new Date().toISOString();

    if (noteToEdit) {
      // Editar nota existente, manteniendo el color original
      dispatch({
        type: 'EDIT_NOTE',
        note: {
          id: noteToEdit.id,
          title,
          description,
          category,
          tags: tags.split(', '),
          createdAt: noteToEdit.createdAt, // Mantener la fecha de creación original
          color: noteToEdit.color, // Mantener el color original
        },
      });
    } else {
      // Agregar nueva nota con un color aleatorio
      dispatch({
        type: 'ADD_NOTE',
        note: {
          title,
          description,
          category,
          tags: tags.split(', '),
          createdAt: currentTimestamp,
          color: noteColor, // Usar color aleatorio solo para nuevas notas
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
