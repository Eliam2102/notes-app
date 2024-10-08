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
        {/* para los colores random, ponemos el style para que reciba el colo igual que la nota asi mismo el qeu recibe la nota lo recibe */}
        <div className="note-content" onClick={handleOpen} style={{ backgroundColor: note.color }}>
          {/* Título de la nota en la parte superior */}
          <div className="note-header">
            <h4>{note.title}</h4>
          </div>

          {/* Descripción de la nota */}
          <p>
            {/* limitamos a que muestre nada  más hasta 650 caracteres en el preview */}
            {note.description.length > 650
              ? `${note.description.substring(0, 650)}...`
              : note.description}
          </p>
        </div>
        <div>
          <h3>{note.title}</h3>
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

      <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: note.color,
          boxShadow: 24,
          borderRadius: '8px',
          maxHeight: { xs: '90vh', sm: '80vh' },
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          p: '20px',
        }}
      >
        <Box
          sx={{
            width: { xs: '85vw', sm: '75vw', md: '60vw' },
            mx: 'auto',
            p: 2,
            position: 'relative',
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 0,
              color: '#000',
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Título: Encabezado h3 */}
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontFamily: 'Noto Sans',
              fontWeight: 700,
              fontSize: {
                xs: '1.5rem', // Tamaño de fuente en pantallas pequeñas
                sm: '2rem',   // Tamaño en pantallas medianas
                md: '2.5rem', // Tamaño en pantallas grandes
              },
            }}
          >
            {note.title}
          </Typography>


          {/* Descripción: Texto regular (w400) */}
          <Typography
            sx={{ mt: 2 }}
            style={{
              fontFamily: 'Noto Sans',
              fontWeight: 400,
              whiteSpace: 'pre-wrap',
              overflowY: 'auto',
              maxHeight: '300px',
            }}
          >
            {note.description}
          </Typography>

          {/* Categoría (opcional): Texto regular (w400) */}
          {note.category && (
            <Typography
              sx={{ mt: 2 }}
              style={{ fontFamily: 'Noto Sans', fontWeight: 400 }}
            >
              <strong>Categoría:</strong> {note.category}
            </Typography>
          )}

          {/* Etiquetas (opcional): Texto regular (w400) */}
          {note.tags && (
            <Typography
              sx={{ mt: 2 }}
              style={{ fontFamily: 'Noto Sans', fontWeight: 400 }}
            >
              <strong>Etiquetas:</strong> {note.tags.join(', ')}
            </Typography>
          )}

          {/* Fecha de creación */}
          {note.createdAt && (
            <Typography
              sx={{ mt: 2 }}
              style={{ fontFamily: 'Noto Sans', fontWeight: 400 }}
            >
              <strong>Fecha de creación:</strong>{' '}
              {new Date(note.createdAt).toLocaleString()}
            </Typography>
          )}

          {/* Botones de editar y eliminar */}
          <div className="modal-buttons" style={{ marginTop: '20px' }}>
            <button className="edit-btn" onClick={handleEdit}>
              <img src={iconEdit} alt="Edit" /> Editar
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              <img src={iconDelete} alt="Delete" /> Eliminar
            </button>
          </div>
        </Box>
      </Box>
    </Modal>

    </>
  );
};

export default Note;
