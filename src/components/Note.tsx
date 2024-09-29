import React, { useContext, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Box, Modal, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import { NotesContext } from '../context/NoteContext'; // Asegúrate de que este import está correcto
import '../assets/styles/Notes.css';

type NoteProps = {
  note: {
    id: number;
    title: string;
    description: string;
    category?: string;
    tags?: string[];
    createdAt?: string;
    color: string;
  };
  onEdit: (note: unknown) => void;
};

const Note: React.FC<NoteProps> = ({ note, onEdit }) => {
  const { dispatch } = useContext(NotesContext); // Reintroduzco el uso del contexto
  const [open, setOpen] = useState(false);

  // Función para eliminar la nota
  const handleDelete = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ¡elimínalo!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: 'DELETE_NOTE', id: note.id }); // Lógica de eliminación usando dispatch

        Swal.fire({
          title: "¡Eliminado!",
          text: "Tu nota ha sido eliminada.",
          icon: "success"
        });
      }
    });
  };

  // Funciones para abrir y cerrar el modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Preview de la nota */}
      <div className="note" style={{ backgroundColor: note.color }} onClick={handleOpen}>
        <div className="note-header">
          <h3>{note.title}</h3>
        </div>
        <p>{note.description.length > 100 ? `${note.description.substring(0, 100)}...` : note.description}</p>
      </div>

      {/* Modal de Material UI */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyles}>
          {/* Botón de cerrar */}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={closeButtonStyles}
          >
            <CloseIcon />
          </IconButton>

          {/* Contenido del modal */}
          <Typography variant="h6" component="h2" style={{ fontFamily: 'Noto Sans' }}>
            {note.title}
          </Typography>
          <Typography sx={{ mt: 2 }} style={{ fontFamily: 'Noto Sans' }}>
            {note.description}
          </Typography>
          {note.category && (
            <Typography sx={{ mt: 2 }} style={{ fontFamily: 'Noto Sans' }}>
              <strong>Categoría:</strong> {note.category}
            </Typography>
          )}
          {note.tags && (
            <Typography sx={{ mt: 2 }} style={{ fontFamily: 'Noto Sans' }}>
              <strong>Etiquetas:</strong> {note.tags.join(', ')}
            </Typography>
          )}
          {note.createdAt && (
            <Typography sx={{ mt: 2 }} style={{ fontFamily: 'Noto Sans' }}>
              <strong>Fecha de creación:</strong> {new Date(note.createdAt).toLocaleString()}
            </Typography>
          )}

          {/* Botones de Editar y Eliminar */}
          <div style={{ marginTop: '20px' }}>
            <button className="edit-btn" onClick={() => onEdit(note)}><FaEdit /> Editar</button>
            <button className="delete-btn" onClick={handleDelete}><FaTrash /> Eliminar</button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

// Estilos del modal
const modalStyles = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
  zIndex: 1
};

// Estilos del botón de cierre
const closeButtonStyles = {
  position: 'absolute',
  right: 8,
  top: 8,
  color: '#000',
};

export default Note;
