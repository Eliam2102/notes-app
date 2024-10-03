import React, { useContext, useState } from 'react';
import Note from './Note';
import NoteForm from './NoteForm';
import { Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { NotesContext } from '../context/NoteContext';
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import '../assets/styles/NoteBoard.css';
import iconAddNote from '../assets/img/add_note.png';

// Componente SortableNote para manejar el arrastre de notas individuales
const SortableNote = ({ note, onEdit }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: note.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Note note={note} onEdit={onEdit} />
    </div>
  );
};

const NoteBoard: React.FC = () => {
  const { state, dispatch } = useContext(NotesContext);
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

  // Definir los sensores con la restricción de distancia de 8px para el arrastre
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4, // El drag solo se activa después de mover 4px,esto para que se vea algo mas fluido el arrastre
      },
    })
  );

  // Manejar la reorganización de las notas cuando se suelta una
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      const oldIndex = state.notes.findIndex(note => note.id === active.id);
      const newIndex = state.notes.findIndex(note => note.id === over.id);

      // Reorganizar las notas usando arrayMove
      const updatedNotes = arrayMove(state.notes, oldIndex, newIndex);
      // Actualizar el contexto con las notas reorganizadas
      dispatch({ type: 'REORDER_NOTES', payload: updatedNotes });
    }
  };

  return (
    <div className="note-board">
      <div className="btn-add">
        <Tooltip title="Agregar una nota nueva" arrow>
          <button
            className="add-note-btn"
            onClick={handleAddNoteClick}
          >
            <img src={iconAddNote} alt="guardarNota" />
            <span>Agregar Nota</span>
          </button>
        </Tooltip>
      </div>

      {/* Diálogo de confirmación */}
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

      {/* Mostrar el formulario para crear o editar notas */}
      {showForm && (
        <NoteForm
          closeModal={() => setShowForm(false)}
          noteToEdit={noteToEdit}
        />
      )}

      {/* Implementar DndContext para manejo de arrastrar y soltar */}
      <DndContext
        sensors={sensors} 
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={state.notes.map(note => note.id)}
        >
          <div className="notes-grid">
            {state.notes.length === 0 ? (
              <p className="no-notes-message">Aún no hay notas</p>
            ) : (
              state.notes.map(note => (
                <SortableNote key={note.id} note={note} onEdit={handleEdit} />
              ))
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default NoteBoard;