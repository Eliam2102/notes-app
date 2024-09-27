import React from 'react';
import AppBar from './components/AppBar';
import NoteBoard from './components/NoteBoard';
import { NotesProvider } from './context/NoteContext';
import './assets/styles/App.css';

const App: React.FC = () => {
  return (
    <NotesProvider>
      <div className="app">
        <AppBar />
        <NoteBoard />
      </div>
    </NotesProvider>
  );
};

export default App;
