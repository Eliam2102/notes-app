import React from 'react';
import '../assets/styles/ConfirmDialog.css'
import iconSave from '../assets/img/save-btn.png'
import iconCancel from '../assets/img/cancel-btn.png'
import iconClose from '../assets/img/close-btns.png'

type ConfirmDialogProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ message, onConfirm, onCancel, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="confirm-dialog">
        <h3>{message}</h3>
        <div className="actions">
          <button onClick={onConfirm}><img src={iconSave} alt="Guardar" />Guardar</button>
          <button onClick={onCancel}><img src={iconCancel} alt="Cancelar" />Cancelar</button>
          <button className="close-btn" onClick={onClose}><img src={iconClose} alt="Close" /></button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;