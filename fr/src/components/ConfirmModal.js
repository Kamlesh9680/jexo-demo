import React from 'react';
import './ConfirmModal.css'; // Add styles for the modal

function ConfirmModal({ isOpen, onClose, onConfirm, rating }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Rating</h2>
        <p>Are you sure you want to give this product {rating} stars?</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="confirm-btn">Confirm</button>
          <button onClick={onClose} className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
