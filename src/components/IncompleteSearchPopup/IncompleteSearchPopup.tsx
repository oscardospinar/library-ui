import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Mainsearch/Popups.css';

interface IncompleteSearchPopupProps {
  onClose: () => void;
}

const IncompleteSearchPopup: React.FC<IncompleteSearchPopupProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleOk = () => {
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-content">
          <p>Algunos campos no fueron llenados. Por favor llene todos los campos para poder hacer una búsqueda</p>
          <button onClick={handleOk}>Ok</button>
        </div>
      </div>
    </div>
  );
};

export default IncompleteSearchPopup;
