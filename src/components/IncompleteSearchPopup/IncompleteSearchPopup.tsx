import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Mainsearch/Popups.module.css';

interface IncompleteSearchPopupProps {
  onClose: () => void;
}

const IncompleteSearchPopup: React.FC<IncompleteSearchPopupProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleOk = () => {
    onClose();
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        <div className={styles.popupContent}>
          <p>Algunos campos no fueron llenados. Por favor llene todos los campos para poder hacer una búsqueda</p>
          <button className={styles.popupButton} onClick={handleOk}>
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncompleteSearchPopup;
