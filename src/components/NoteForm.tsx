import React, { useState, useContext } from 'react';
import { NotesContext } from '../context/NoteContext';
import '../assets/styles/NoteForm.css';
import ConfirmDialog from './ConfirmDialog';
import iconSave from '../assets/img/save-btn.png';
import iconCancel from '../assets/img/cancel-btn.png';

// Almacenamos los colores ya usados para evitar duplicados
const usedColors = new Set<string>();

// Función para generar un color pastel aleatorio
const generateRandomPastelColor = (): string => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const pastelR = Math.min(255, Math.floor((r + 255) / 2));
  const pastelG = Math.min(255, Math.floor((g + 255) / 2));
  const pastelB = Math.min(255, Math.floor((b + 255) / 2));

  // creación del nuevo color
  const newColor = `#${((1 << 24) + (pastelR << 16) + (pastelG << 8) + pastelB).toString(16).slice(1).toUpperCase()}`;

  // Verificar si el color ya ha sido usado
  if (usedColors.has(newColor)) {
    return generateRandomPastelColor();
  }
  usedColors.add(newColor);
  return newColor;
};

// Colores pastel estáticos para las categorías y tags
const categoryColors = ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9'];
const tagColors = ['#BAE1FF', '#FFBAF0', '#FFABAB', '#FFC3A0'];

// propiedades del NoteForm
type NoteFormProps = {
  closeModal: () => void;
  noteToEdit?: {
    id: number;
    title: string;
    description: string;
    category?: string[];
    tags?: string[];
    createdAt?: string;
    color?: string;
  };
};

const NoteForm: React.FC<NoteFormProps> = ({ closeModal, noteToEdit }) => {
  const { dispatch } = useContext(NotesContext);
  const [title, setTitle] = useState(noteToEdit?.title || '');
  const [description, setDescription] = useState(noteToEdit?.description || '');
  const [selectedCategory, setSelectedCategory] = useState<string[]>(Array.isArray(noteToEdit?.category) ? noteToEdit.category : []);
  const [tags, setTags] = useState(noteToEdit?.tags || []);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // DECLARAMOS LOS TAGS Y CATEGORÍAS QUE HABRÁN POR DEFAULT
  const categories = ['Trabajo', 'Personal', 'Estudio', 'Hobby'];
  const predefinedTags = ['Urgente', 'Importante', 'Revisar', 'Completar'];

  // FUNCION PARA SELECCIONAR CATEGORÍA
  const handleCategorySelect = (cat: string) => {
    if (!selectedCategory.includes(cat)) {
      setSelectedCategory([...selectedCategory, cat]);
    }
  };

  // FUNCIÓN PARA SELECCIONAR TAGS
  const handleTagSelect = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  // FUNCION PARA ELIMINAR CATEGORÍA SELECCIONADA
  const handleCategoryRemove = (cat: string) => {
    setSelectedCategory(selectedCategory.filter(item => item !== cat));
  };

  // FUNCION PARA REMOVER TAGS SELECCIONADOS
  const handleTagRemove = (tag: string) => {
    setTags(tags.filter(item => item !== tag));
  };

  // ABRIR EL MODAL SI DECIDE AGREGAR NOTA
  const handleSave = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirm = () => {
    const currentTimestamp = new Date().toISOString();
    const categoriesToSave = Array.isArray(selectedCategory) ? selectedCategory : [];
  
    if (noteToEdit) {
      dispatch({
        type: 'EDIT_NOTE',
        note: {
          id: noteToEdit.id,
          title,
          description,
          category: categoriesToSave.join(', '),
          tags,
          createdAt: noteToEdit.createdAt,
          color: noteToEdit.color,
        },
      });
    } else {
      dispatch({
        type: 'ADD_NOTE',
        note: {
          title,
          description,
          category: categoriesToSave.join(', '),
          tags,
          createdAt: currentTimestamp,
          color: generateRandomPastelColor(),
        },
      });
    }
  
    closeModal();
  };
  

  // DECIDE NO AGREGAR NADA, SE CIERRA EL DIALOGO DE CONFIRMACIÓN
  const handleCancel = () => {
    setShowConfirmDialog(false); // Cierra el diálogo de confirmación
  };

  return (
    <div className="modal-overlay">
      <div className="note-form">
        <h3>{noteToEdit ? 'Editar Nota' : 'Agregar Nota'}</h3>
        <strong>Título: </strong>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <strong>Descripción: </strong>
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="category-container">
          <strong>Categoría:</strong>
          <div className="chips">
            {categories.map((cat, index) => (
              <div
                key={index}
                className={`chip ${selectedCategory.includes(cat) ? 'selected' : ''}`}
                style={{ backgroundColor: categoryColors[index] }}
                onClick={() => handleCategorySelect(cat)}
              >
                {cat}
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Categoría (Opcional)"
            value={selectedCategory.join(', ')} // Muestra todas las categorías seleccionadas
            readOnly
          />
          <div className="selected-chips">
            {selectedCategory.map((cat, index) => (
              <div key={index} className="chip">
                {cat} <span onClick={() => handleCategoryRemove(cat)} className="remove-chip">✖</span>
              </div>
            ))}
          </div>
        </div>

        <div className="tag-container">
          <strong>Tags:</strong>
          <div className="chips">
            {predefinedTags.map((tag, index) => (
              <div
                key={index}
                className={`chip ${tags.includes(tag) ? 'selected' : ''}`}
                style={{ backgroundColor: tagColors[index] }}
                onClick={() => handleTagSelect(tag)}
              >
                {tag}
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Etiquetas (Opcional)"
            value={tags.join(', ')} // Muestra todos los tags seleccionados
            readOnly
          />
          <div className="selected-chips">
            {tags.map((tag, index) => (
              <div key={index} className="chip">
                {tag} <span onClick={() => handleTagRemove(tag)} className="remove-chip">✖</span>
              </div>
            ))}
          </div>
        </div>

        <div className="actions">
          <button onClick={handleSave}><img src={iconSave} alt="guardar" />Guardar</button>
          <button onClick={closeModal}><img src={iconCancel} alt="cancelar" />Cancelar</button>
        </div>
      </div>

      {showConfirmDialog && (
        <ConfirmDialog
          message="¿Estás seguro de que deseas guardar los cambios?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          onClose={handleCancel}
        />
      )}
    </div>
  );
};

export default NoteForm;
