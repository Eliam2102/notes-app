import React, { useContext, useState } from 'react';
import Note from './Note';
import NoteForm from './NoteForm';
import { Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { NotesContext } from '../context/NoteContext';
import '../assets/styles/NoteBoard.css';
import iconAddNote from '../assets/img/add_note.png';


const NoteBoard: React.FC = () => {
  const { state } = useContext(NotesContext);
  const [showForm, setShowForm] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleEdit = (note: React.SetStateAction<null>) => {
    setNoteToEdit(note);
    setShowForm(true);
  };

  const handleAddNoteClick = () => {
    setConfirmDialogOpen(true); // Abre el diálogo de confirmación
  };

  const handleConfirmAddNote = () => {
    setConfirmDialogOpen(false);
    setNoteToEdit(null);
    setShowForm(true); // Muestra el formulario si el usuario confirma
  };

  const handleCancelAddNote = () => {
    setConfirmDialogOpen(false); // Cierra el diálogo sin hacer nada
  };

  return (
    <div className="note-board">
      <div className='btn-add'>
        <Tooltip title="Agregar una nota nueva" arrow>
          <button className="add-note-btn" onClick={handleAddNoteClick}>
            <img src={iconAddNote} alt="guardarNota" /><span>Agregar Nota</span>
          </button>
        </Tooltip>
      </div>

      <Dialog
        open={confirmDialogOpen}
        onClose={handleCancelAddNote}
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: '#fff',  
            borderRadius: '12px',      
            padding: '16px',            
          }
        }}
      >
        <DialogTitle
          sx={{
            color: '#000',            
            fontWeight: 'bold',          
            textAlign: 'center',        
          }}
        >
          Confirmación
        </DialogTitle>
        <DialogContent
          sx={{
            textAlign: 'center',    
          }}
        >
          <DialogContentText
            sx={{
              color: '#000',          
              fontSize: '16px',          
              paddingBottom: '16px',      
            }}
          >
            ¿Estás seguro de que deseas agregar una nueva nota?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',    
          }}
        >
          <Tooltip title="Continuar" arrow>
          <Button
            onClick={handleConfirmAddNote}
            sx={{
              backgroundColor: '#4CAF50',
              color: '#fff',             
              '&:hover': {
                backgroundColor: '#C5705D', 
              }
            }}
            autoFocus
          >
            Sí
          </Button>
          </Tooltip>
          <Tooltip title="Cancelar" arrow>
          <Button
            onClick={handleCancelAddNote}
            sx={{
              backgroundColor: '#F44336',
              color: '#fff',              
              '&:hover': {
                backgroundColor: '#C5705D',  
              }
            }}
          >
            No
          </Button>
          </Tooltip>
        </DialogActions>
      </Dialog>

      {showForm && (
        <NoteForm
          closeModal={() => setShowForm(false)}
          noteToEdit={noteToEdit}
        />
      )}

      <div className="notes-grid">
        {state.notes.length === 0 ? (
          <p className="no-notes-message">Aún no hay notas</p> 
        ) : (
          state.notes.map(note => (
            <Note key={note.id} note={note} onEdit={handleEdit} />
          ))
        )}
      </div>
    </div>
  );
};

export default NoteBoard;
