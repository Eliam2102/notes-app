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
  | { type: 'REORDER_NOTES'; payload: Note[] };

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
    case 'REORDER_NOTES': {
      return {
        ...state,
        notes: action.payload,
      };
    }
    default:
      return state;
  }
};

const NotesProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, initialState);

  return (
    <NotesContext.Provider value={{ state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

export { NotesContext, NotesProvider };
