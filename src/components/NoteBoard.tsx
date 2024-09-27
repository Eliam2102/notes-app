import React, { useContext, useState } from 'react';
import Note from './Note';
import NoteCollection from './NoteCollection';
import NoteForm from './NoteForm';
import { NotesContext } from '../context/NoteContext';
import '../assets/styles/NoteBoard.css';

const NoteBoard: React.FC = () => {
  const { state } = useContext(NotesContext);
  const [showForm, setShowForm] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);

  const handleEdit = (note) => {
    setNoteToEdit(note);
    setShowForm(true);
  };

  return (
    <div className="note-board">
      <button className="add-note-btn" onClick={() => {
        setNoteToEdit(null); // Limpiar la edición cuando agregamos una nueva nota
        setShowForm(true);
      }}>
        Agregar Nota
      </button>

      {showForm && (
        <NoteForm
          closeModal={() => setShowForm(false)}
          noteToEdit={noteToEdit}
        />
      )}

      <div className="notes-grid">
        {state.notes.map(note => (
          <Note key={note.id} note={note} onEdit={handleEdit} />
        ))}
        {state.collections.map(collection => (
          <NoteCollection key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  );
};

export default NoteBoard;