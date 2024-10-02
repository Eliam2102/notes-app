import React, { createContext, useReducer } from 'react';

type Note = {
  id: number;
  title: string;
  description: string;
  category?: string;
  tags?: string[];
  createdAt: string;
};

type Collection = {
  id: number;
  notes: Note[];
};

type State = {
  notes: Note[];
  collections: Collection[];
};

type Action =
  | { type: 'ADD_NOTE'; note: Omit<Note, 'id'> }
  | { type: 'EDIT_NOTE'; note: Note }
  | { type: 'DELETE_NOTE'; id: number }
  | { type: 'ADD_TO_COLLECTION'; noteId: number; collectionId: number }
  | { type: 'REORDER_NOTES'; startId: number; endId: number };

const initialState: State = {
  notes: [],
  collections: [],
};

const NotesContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const notesReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_NOTE':
      return {
        ...state,
        notes: [...state.notes, { id: state.notes.length + 1, ...action.note }],
      };
    case 'EDIT_NOTE':
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === action.note.id ? action.note : note
        ),
      };
    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.id),
      };
    case 'ADD_TO_COLLECTION':
      { const noteToAdd = state.notes.find(note => note.id === action.noteId);
      if (!noteToAdd) return state;
      return {
        ...state,
        collections: state.collections.map(collection =>
          collection.id === action.collectionId
            ? { ...collection, notes: [...collection.notes, noteToAdd] }
            : collection
        ),
      }; }
      case 'REORDER_NOTES': {
        const updatedNotes = [...state.notes];
        
        const startIndex = updatedNotes.findIndex(note => note.id === action.startId);
        const endIndex = updatedNotes.findIndex(note => note.id === action.endId);
        
        if (startIndex === -1 || endIndex === -1) return state; // Verificación adicional
      
        const [movedNote] = updatedNotes.splice(startIndex, 1);
        updatedNotes.splice(endIndex, 0, movedNote);
      
        return {
          ...state,
          notes: updatedNotes,
        };
      }
      
    default:
      return state;
  }
};

const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, initialState);

  return (
    <NotesContext.Provider value={{ state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

export { NotesContext, NotesProvider };
