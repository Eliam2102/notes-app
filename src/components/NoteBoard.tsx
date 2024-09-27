import React, { useContext, useState } from 'react';
import Note from './Note';
import NoteCollection from './NoteCollection';
import NoteForm from './NoteForm';
import { NotesContext } from '../context/NoteContext';
import '../assets/styles/NoteBoard.css';

const NoteBoard: React.FC = () => {
  const { state } = useContext(NotesContext);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="note-board">
      <button className="add-note-btn" onClick={() => setShowForm(true)}>
        Agregar Nota
      </button>
      {showForm && <NoteForm closeModal={() => setShowForm(false)} />}
      <div className="notes-grid">
        {state.notes.map(note => (
          <Note key={note.id} note={note} />
        ))}
        {state.collections.map(collection => (
          <NoteCollection key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  );
};

export default NoteBoard;
