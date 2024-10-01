import React, { useContext, useState } from 'react';
import Note from './Note';
import NoteCollection from './NoteCollection';
import NoteForm from './NoteForm';
import { NotesContext } from '../context/NoteContext';
import '../assets/styles/NoteBoard.css';
import iconAddNote from '../assets/img/add_note.png'

const NoteBoard: React.FC = () => {
  const { state } = useContext(NotesContext);
  const [showForm, setShowForm] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);

  const handleEdit = (note: React.SetStateAction<null>) => {
    setNoteToEdit(note);
    setShowForm(true);
  };

  return (
    <div className="note-board">
      <div className='btn-add'>
        <button className="add-note-btn" onClick={() => {
          setNoteToEdit(null); 
          setShowForm(true);
        }}>
          <img src={iconAddNote} alt="guardarNota" /><span>Agregar Nota</span>
        </button>
      </div>

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
