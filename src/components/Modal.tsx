import React, { useState } from 'react';

interface ModalProps {
  data:   | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ data, onClose }) => {
  const [title, setTitle] = useState(data?.title || '');
  const [content, setContent] = useState(data?.content || '');

  const handleSave = () => {
    // Guardar cambios
    onClose();
  };

  return (
    <div className="modal">
      <h2>{data ? 'Editar Nota' : 'Agregar Nota'}</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Contenido"
      ></textarea>
      <button onClick={handleSave}>Guardar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default Modal;
