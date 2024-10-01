import React, { useContext, useState } from 'react';
import { Box, Modal, Typography, IconButton, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import { NotesContext } from '../context/NoteContext';
import '../assets/styles/Notes.css';
import iconDelete from '../assets/img/delete-btn.png';
import iconEdit from '../assets/img/edit-btn.png';


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
  const { dispatch } = useContext(NotesContext);
  const [open, setOpen] = useState(false);
  
  const handleDelete = () => {
    handleClose();
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
        dispatch({ type: 'DELETE_NOTE', id: note.id });
        Swal.fire({
          title: "¡Eliminado!",
          text: "Tu nota ha sido eliminada.",
          icon: "success"
        });
      }
    });
  };

  const handleEdit = () => {
    handleClose();
    Swal.fire({
      title: "¿Editar esta nota?",
      text: "Puedes cambiar el contenido de esta nota.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ¡editar!",
    }).then((result) => {
      if (result.isConfirmed) {
        onEdit(note);
        Swal.fire({
          title: "¡Regresando!",
          text: "Por favor, revisa que no olvides nada",
          icon: "question"
        });
      }
    });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Preview de la nota */}
      <div className="note" style={{ backgroundColor: note.color }}>
        <div className="note-content" onClick={handleOpen}>
          <div className="note-header">
            <h3>{note.title}</h3>
          </div>
          <p>
            {note.description.length > 580
              ? `${note.description.substring(0, 580)}...`
              : note.description}
          </p>
        </div>

        {/* Íconos de acción (solo visibles en hover) */}
        <div className="action-icons">
          <Tooltip title ="Editar nota" arrow>
          <button className="icon-btn" onClick={handleEdit}>
            <img src={iconEdit} alt="Edit" />
          </button>
          </Tooltip>
          <Tooltip title="Eliminar nota" arrow>
          <button className="icon-btn" onClick={handleDelete}>
            <img src={iconDelete} alt="Delete" />
          </button>
          </Tooltip>
        </div>
      </div>

      {/* Modal para ver el contenido completo de la nota */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: '8px',
            maxHeight: { xs: '90vh', sm: '80vh' },
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            p: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Box
            sx={{
              width: { xs: 'calc(100% - 5px)', sm: 'calc(100% - 5px)', md: 600 },
              mx: 'auto',
              p: 2,
            }}
          >
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: '#000',
              }}
            >
              <CloseIcon />
            </IconButton>

            <Typography variant="h6" component="h2" style={{ fontFamily: 'Noto Sans' }}>
              {note.title}
            </Typography>

            <Typography
              sx={{ mt: 2 }}
              style={{
                fontFamily: 'Noto Sans',
                whiteSpace: 'pre-wrap',
                overflowY: 'auto',
                maxHeight: '300px'
              }}
            >
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
                <strong>Fecha de creación:</strong>{' '}
                {new Date(note.createdAt).toLocaleString()}
              </Typography>
            )}

            <div className="modal-buttons">
              <button className="edit-btn" onClick={handleEdit}>
                <img src={iconEdit} alt="Edit" /> Editar
              </button>
              <button className="delete-btn" onClick={handleDelete}>
                <img src={iconDelete} alt="Delete" />Eliminar
              </button>
            </div>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Note;
