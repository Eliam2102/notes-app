import React, { useState, useContext } from 'react';
import { NotesContext } from '../context/NoteContext';
import '../assets/styles/NoteForm.css';


// Almacenamos los colores ya usados para evitar duplicados
const usedColors = new Set<string>();

// Función para generar un color pastel aleatorio
const generateRandomPastelColor = (): string => {
  // Generar componentes RGB aleatorios en un rango pastel
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // Ajustar la luminosidad para que sea más pastel
  const pastelR = Math.min(255, Math.floor((r + 255) / 2));
  const pastelG = Math.min(255, Math.floor((g + 255) / 2));
  const pastelB = Math.min(255, Math.floor((b + 255) / 2));

  const newColor = `#${((1 << 24) + (pastelR << 16) + (pastelG << 8) + pastelB).toString(16).slice(1).toUpperCase()}`;

  // Verificar si el color ya ha sido usado
  if (usedColors.has(newColor)) {
    return generateRandomPastelColor(); // Generar otro color si ya existe
  }

  // Guardamos el color generado para no repetirlo
  usedColors.add(newColor);
  return newColor;
};

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

  // Generar un color pastel único solo si es una nueva nota
  const noteColor = noteToEdit?.color || generateRandomPastelColor();

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
          createdAt: noteToEdit.createdAt,
          color: noteToEdit.color,
        },
      });
    } else {
      // Agregar nueva nota con un color pastel único
      dispatch({
        type: 'ADD_NOTE',
        note: {
          title,
          description,
          category,
          tags: tags.split(', '),
          createdAt: currentTimestamp,
          color: noteColor,
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
