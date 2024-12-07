import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import styles from '../Mainsearch/Popups.module.css';

interface NoResultsPopupProps {
  onClose: () => void;
  clearFields: () => void;
}

const NoResultsPopup: React.FC<NoResultsPopupProps> = ({ onClose, clearFields }) => {
  const navigate = useNavigate();

  const handleOk = () => {
    clearFields();
    onClose();
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        <div className={styles.popupContent}>
          <p>No se encontraron resultados para los parámetros especificados.</p>
          <Button variant="contained" color="primary" onClick={handleOk}>
            Ok
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NoResultsPopup;
