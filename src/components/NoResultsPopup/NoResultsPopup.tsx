import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import '../Mainsearch/Popups.css';

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
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-content">
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
