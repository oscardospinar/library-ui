import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Css/SearchCss.css';

const NoResultsPopup: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-content">
          <p>No se encontraron resultados para los parámetros especificados.</p>
          <button onClick={() => navigate('/')}>Ok</button>
        </div>
      </div>
    </div>
  );
};

export default NoResultsPopup;
