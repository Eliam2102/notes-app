import React, { useContext } from 'react';
import { NotesContext } from '../context/NoteContext';
import '../assets/styles/NoteCollection.css';

type NoteCollectionProps = {
  collection: {
    id: number;
    notes: {
      id: number;
      title: string;
      description: string;
    }[];
  };
};

const NoteCollection: React.FC<NoteCollectionProps> = ({ collection }) => {
  const { dispatch } = useContext(NotesContext);

  const handleDrop = (e: React.DragEvent) => {
    const noteId = parseInt(e.dataTransfer.getData('noteId'));
    dispatch({ type: 'ADD_TO_COLLECTION', noteId, collectionId: collection.id });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="note-collection" onDrop={handleDrop} onDragOver={handleDragOver}>
      <h3>Colección</h3>
      <div className="note-stack">
        {collection.notes.map(note => (
          <div key={note.id} className="stacked-note">
            <h4>{note.title}</h4>
            <p>{note.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteCollection;
