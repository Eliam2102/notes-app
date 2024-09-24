import { useState } from 'react'
import Toolbar from './components/ToolBar';
import Note from './components/Note';
import Collection from './components/Collection';
import Modal from './components/Modal';
import './App.css'


// Creamos no nuestro componente funcional o FC.
// Que sera el que contenga todo.
const App: React.FC = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [collections, setCollections] = useState<CollectionType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<NoteType | null>(null);

  const handleAddNote = () => {
    // Lógica para agregar una nota
  };

  const handleEditNote = (note: NoteType) => {
    setModalData(note);
    setIsModalOpen(true);
  };

  const handleDeleteNote = (id: string) => {
    // Lógica para eliminar una nota
  };

  return (
    <div>
      <Toolbar onAdd={handleAddNote} onSearch={() => {}} />
      <div className="notes-area">
        {/* Mostrar notas y colecciones */}
        {collections.map((collection) => (
          <Collection key={collection.id} {...collection} />
        ))}
        {notes.map((note) => (
          <Note key={note.id} {...note} onEdit={handleEditNote} onDelete={handleDeleteNote} />
        ))}
      </div>
      {isModalOpen && <Modal data={modalData} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default App;

