import React, { useState } from 'react';

interface NoteProps {
  id: string;
  title: string;
  content: string;
  onEdit: () => void;
  onDelete: () => void;
}

const Note: React.FC<NoteProps> = ({ id, title, content, onEdit, onDelete }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="note"
      draggable
      onDragEnd={handleDrag}
      style={{ top: position.y, left: position.x }}
    >
      <h2>{title}</h2>
      <p>{content}</p>
      <button onClick={onEdit}>Editar</button>
      <button onClick={onDelete}>Eliminar</button>
    </div>
  );
};

export default Note;
