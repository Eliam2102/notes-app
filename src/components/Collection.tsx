import React, { useState } from 'react';
import Note from './Note';

interface CollectionProps {
  id: string;
  title: string;
  notes: NoteType[];
  onEditCollection: () => void;
  onDeleteCollection: () => void;
}

const Collection: React.FC<CollectionProps> = ({ id, title, notes, onEditCollection, onDeleteCollection }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="collection"
      draggable
      onDragEnd={handleDrag}
      style={{ top: position.y, left: position.x, position: 'absolute' }}
    >
      <h2>{title}</h2>
      <div className="collection-notes">
        {notes.map((note) => (
          <Note key={note.id} {...note} />
        ))}
      </div>
      <div className="collection-controls">
        <button onClick={onEditCollection}>Editar Colección</button>
        <button onClick={onDeleteCollection}>Eliminar Colección</button>
      </div>
    </div>
  );
};

export default Collection;
