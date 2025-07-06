import React from "react";
import "./Modal.css";

type ModalProps = {
  title: string;
  inputValue: string;
  onInputChange: (value: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
};

const Modal: React.FC<ModalProps> = ({
  title,
  inputValue,
  onInputChange,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{title}</h3>
        <input
          type="text"
          placeholder="Cole o link aqui..."
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
        />
        <div className="modal-buttons">
          <button className="btn-primary" onClick={onConfirm}>
            Confirmar
          </button>
          <button className="btn-outline" onClick={onCancel}>
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;